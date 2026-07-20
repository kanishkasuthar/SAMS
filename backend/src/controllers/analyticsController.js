const analyticsService = require('../services/analyticsService');
const AppError = require('../utils/AppError');

exports.getOverview = async (req, res, next) => {
  try {
    const data = await analyticsService.getOverviewKPIs();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const data = await analyticsService.getUserAnalytics();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    const data = await analyticsService.getDepartmentAnalytics();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

exports.getWorkflows = async (req, res, next) => {
  try {
    const data = await analyticsService.getWorkflowAnalytics();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

exports.getResponsibilities = async (req, res, next) => {
  try {
    const data = await analyticsService.getResponsibilityAnalytics();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

exports.getTrends = async (req, res, next) => {
  try {
    const data = await analyticsService.getTrendAnalytics();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

exports.refreshCache = async (req, res, next) => {
  try {
    const { keys } = req.body; // Array of specific keys, or empty for full flush
    await analyticsService.refreshCache(keys || []);
    res.status(200).json({ status: 'success', message: 'Cache refreshed successfully' });
  } catch (error) {
    next(error);
  }
};
