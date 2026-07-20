const { 
  AnalyticsCache, 
  User, 
  Department, 
  Role, 
  DecisionRequest, 
  Notification, 
  ResponsibilityAssignment,
  sequelize 
} = require('../models');

const CACHE_TTL_MINUTES = 15;

/**
 * Generic caching wrapper for expensive KPI calculations
 */
const withCache = async (cacheKey, moduleName, computationFn) => {
  // Check if unexpired cache exists
  const cache = await AnalyticsCache.findOne({ where: { cacheKey } });
  
  if (cache && new Date() < new Date(cache.expiresAt)) {
    return cache.data;
  }

  // Run expensive computation
  const data = await computationFn();

  // Store in cache
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + CACHE_TTL_MINUTES);

  if (cache) {
    await cache.update({ data, expiresAt, generatedAt: new Date() });
  } else {
    await AnalyticsCache.create({
      cacheKey,
      module: moduleName,
      data,
      expiresAt
    });
  }

  return data;
};

exports.getOverviewKPIs = () => {
  return withCache('overview_kpis', 'Overview', async () => {
    const totalUsers = await User.count();
    const totalDepartments = await Department.count();
    const pendingWorkflows = await DecisionRequest.count({ where: { overallStatus: 'Pending' } });
    const unreadNotifications = await Notification.count({ where: { isRead: false } });

    return { totalUsers, totalDepartments, pendingWorkflows, unreadNotifications };
  });
};

exports.getUserAnalytics = () => {
  return withCache('user_analytics', 'Users', async () => {
    const total = await User.count();
    // Assuming status logic or just generic active counts. For SAMS, active vs inactive can be handled via paranoid/deletedAt or a status flag if it exists.
    const rolesDist = await User.findAll({
      attributes: ['role_id', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['role_id']
    });

    return { total, rolesDistribution: rolesDist };
  });
};

exports.getDepartmentAnalytics = () => {
  return withCache('dept_analytics', 'Departments', async () => {
    const total = await Department.count();
    const deptsWithUsers = await User.findAll({
      attributes: ['departmentId', [sequelize.fn('COUNT', sequelize.col('id')), 'userCount']],
      group: ['departmentId']
    });

    return { total, headcounts: deptsWithUsers };
  });
};

exports.getWorkflowAnalytics = () => {
  return withCache('workflow_analytics', 'Workflows', async () => {
    const total = await DecisionRequest.count();
    const statuses = await DecisionRequest.findAll({
      attributes: ['overallStatus', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['overallStatus']
    });

    return { total, statuses };
  });
};

exports.getResponsibilityAnalytics = () => {
  return withCache('resp_analytics', 'Responsibilities', async () => {
    const total = await ResponsibilityAssignment.count();
    const types = await ResponsibilityAssignment.findAll({
      attributes: ['responsibilityType', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['responsibilityType']
    });

    return { total, types };
  });
};

exports.getTrendAnalytics = () => {
  return withCache('trend_analytics', 'Trends', async () => {
    // Generate standard daily user growth trend (Simplified for cross-dialect compatibility)
    // In production with MySQL, you might use DATE(createdAt), but in SQLite (used for tests) it requires STRFTIME.
    // To ensure testing passes without dialect-specific raw queries, we do a basic JS aggregation for trends or use a unified approach.
    const users = await User.findAll({ attributes: ['createdAt'] });
    const monthlyGrowth = {};
    
    users.forEach(u => {
      const month = u.createdAt.toISOString().slice(0, 7); // YYYY-MM
      monthlyGrowth[month] = (monthlyGrowth[month] || 0) + 1;
    });

    return { monthlyUserGrowth: monthlyGrowth };
  });
};

exports.refreshCache = async (keys = []) => {
  if (keys.length === 0) {
    await AnalyticsCache.destroy({ where: {} }); // Clear all
  } else {
    await AnalyticsCache.destroy({ where: { cacheKey: keys } });
  }
  return true;
};
