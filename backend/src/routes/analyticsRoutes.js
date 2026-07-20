const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Analytics are globally protected and generally restricted to high-level users
router.use(protect);
router.use(restrictTo('Super Admin', 'Admin', 'HR Manager'));

router.get('/overview', analyticsController.getOverview);
router.get('/users', analyticsController.getUsers);
router.get('/departments', analyticsController.getDepartments);
router.get('/workflows', analyticsController.getWorkflows);
router.get('/responsibilities', analyticsController.getResponsibilities);
router.get('/trends', analyticsController.getTrends);

router.post('/refresh', analyticsController.refreshCache);

module.exports = router;
