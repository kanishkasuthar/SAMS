const { AuditLog } = require('../models');

/**
 * Manual logging utility for critical events like Login, Logout, and complex business logic
 */
exports.logAction = async (data) => {
  try {
    const log = await AuditLog.create({
      userId: data.userId || null,
      action: data.action,
      module: data.module,
      entityType: data.entityType || null,
      entityId: data.entityId || null,
      oldValue: data.oldValue || null,
      newValue: data.newValue || null,
      ipAddress: data.ipAddress || null,
      userAgent: data.userAgent || null,
      requestMethod: data.requestMethod || null,
      requestUrl: data.requestUrl || null,
      status: data.status || 'Success',
      remarks: data.remarks || null
    });
    return log;
  } catch (error) {
    console.error('AuditLog Failed to save manually:', error);
    // We intentionally don't throw to avoid breaking the core business flow
    return null;
  }
};
