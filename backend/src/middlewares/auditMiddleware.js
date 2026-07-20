const auditService = require('../services/auditService');

/**
 * Maps standard HTTP methods to CRUD Actions
 */
const getActionFromMethod = (method) => {
  switch (method.toUpperCase()) {
    case 'POST': return 'Create';
    case 'PUT':
    case 'PATCH': return 'Update';
    case 'DELETE': return 'Delete';
    default: return 'Read';
  }
};

/**
 * Very basic module inference based on URL path
 */
const getModuleFromUrl = (url) => {
  if (url.includes('/users')) return 'Users';
  if (url.includes('/departments')) return 'Departments';
  if (url.includes('/roles')) return 'Roles';
  if (url.includes('/decision-flows') || url.includes('/decision-requests')) return 'DecisionFlows';
  if (url.includes('/responsibilities')) return 'ResponsibilityMatrix';
  if (url.includes('/notifications')) return 'Notifications';
  if (url.includes('/reports')) return 'Reports';
  if (url.includes('/analytics')) return 'Analytics';
  if (url.includes('/auth')) return 'Authentication';
  return 'System';
};

/**
 * Middleware that automatically logs POST, PUT, PATCH, DELETE actions
 * It attaches a listener to the response to only log when the request finishes.
 */
const auditMiddleware = (req, res, next) => {
  // Only log modifying requests automatically
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    
    // Capture the old value for updates/deletes if possible - usually this requires DB lookups,
    // so in a generic middleware we can only realistically capture the requested changes (newValue).
    // A robust system does this in the Service/Model hooks, but middleware is acceptable for broad coverage.
    
    const originalSend = res.send;
    
    res.send = function (body) {
      res.send = originalSend;
      
      const status = (res.statusCode >= 200 && res.statusCode < 400) ? 'Success' : 'Failed';
      
      auditService.logAction({
        userId: req.user ? req.user.id : null,
        action: getActionFromMethod(req.method),
        module: getModuleFromUrl(req.originalUrl || req.url),
        entityType: null, // Hard to infer generically
        entityId: req.params ? req.params.id : null,
        newValue: req.body ? req.body : null,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        requestMethod: req.method,
        requestUrl: req.originalUrl || req.url,
        status,
        remarks: status === 'Failed' ? `Status Code: ${res.statusCode}` : 'Auto-logged'
      });

      return res.send(body);
    };
  }
  
  next();
};

module.exports = auditMiddleware;
