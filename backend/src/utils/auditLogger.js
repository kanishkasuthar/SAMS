const auditService = require('../services/auditService');

const logAudit = async (userId, action, details, ip, status = 'Success') => {
  try {
    await auditService.logAction({ 
      userId: userId, 
      action, 
      module: 'System',
      remarks: details, 
      ipAddress: ip, 
      status 
    });
  } catch (err) {
    console.error('Audit Log Error:', err);
  }
};

module.exports = { logAudit };
