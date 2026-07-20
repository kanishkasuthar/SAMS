const express = require('express');
const auditController = require('../controllers/auditController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Only authorized administrators can access audit logs
router.use(protect);
router.use(restrictTo('Super Admin', 'Admin'));

router.get('/', auditController.getLogs);
router.post('/export', auditController.exportLogs);
router.get('/:id', auditController.getLogById);

module.exports = router;
