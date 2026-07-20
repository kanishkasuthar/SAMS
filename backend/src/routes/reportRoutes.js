const express = require('express');
const reportController = require('../controllers/reportController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
// Most reports are restricted to admins or managers, but we allow basic access control here and fine-tune in the controller if needed.
// For now, locking the entire Reports engine to Admins / HR Managers to satisfy typical business rules.
router.use(restrictTo('Super Admin', 'Admin', 'HR Manager'));

router.get('/', reportController.getAllReports);
router.get('/history', reportController.getReportHistory); // specific paths must come before /:id
router.get('/:id', reportController.getReportById);

router.post('/generate', reportController.generateReport);
router.post('/export', reportController.exportReport);
router.post('/save-filter', reportController.saveFilter);

module.exports = router;
