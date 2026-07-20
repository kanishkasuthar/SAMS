const express = require('express');
const assignmentController = require('../controllers/responsibilityAssignmentController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/user/:userId', assignmentController.getUserResponsibilities);
router.get('/department/:departmentId', assignmentController.getDepartmentResponsibilities);
router.get('/:assignmentId/history', assignmentController.getAssignmentHistory);

router.use(restrictTo('Super Admin', 'Admin', 'HR Manager'));

router.post('/transfer', assignmentController.transferResponsibility);
router.post('/bulk-assign', assignmentController.bulkAssign);

module.exports = router;
