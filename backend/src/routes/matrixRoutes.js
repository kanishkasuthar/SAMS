const express = require('express');
const matrixController = require('../controllers/responsibilityMatrixController');
const assignmentRoutes = require('./responsibilityAssignmentRoutes');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', matrixController.getAllMatrices);
router.get('/:id', matrixController.getMatrixById);

// Mount nested assignment routes
router.use('/:matrixId/assignments', assignmentRoutes);

router.use(restrictTo('Super Admin', 'Admin', 'HR Manager'));

router.post('/', matrixController.createMatrix);
router.put('/:id', matrixController.updateMatrix);
router.delete('/:id', matrixController.deleteMatrix);

module.exports = router;
