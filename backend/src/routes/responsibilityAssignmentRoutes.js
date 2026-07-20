const express = require('express');
const assignmentController = require('../controllers/responsibilityAssignmentController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true });

router.use(protect);

// Nested routes (must have matrixId)
router.get('/', assignmentController.getAssignmentsByMatrix);

// Specialized endpoints (mounted directly at /api/responsibility-assignments in server.js)
// But since they don't depend on matrixId dynamically via URL, we can export a separate router or mount them here.
// Let's handle standard nested first:
router.post('/', restrictTo('Super Admin', 'Admin', 'HR Manager'), assignmentController.createAssignment);
router.put('/:assignmentId', restrictTo('Super Admin', 'Admin', 'HR Manager'), assignmentController.updateAssignment);
router.delete('/:assignmentId', restrictTo('Super Admin', 'Admin', 'HR Manager'), assignmentController.deactivateAssignment);

module.exports = router;
