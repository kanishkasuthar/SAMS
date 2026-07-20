const express = require('express');
const flowController = require('../controllers/decisionFlowController');
const stepRoutes = require('./decisionStepRoutes');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', flowController.getAllFlows);
router.get('/:id', flowController.getFlowById);

router.use('/:flowId/steps', stepRoutes);

router.use(restrictTo('Super Admin', 'Admin', 'HR Manager'));

router.post('/', flowController.createFlow);
router.put('/:id', flowController.updateFlow);
router.delete('/:id', flowController.deleteFlow);

module.exports = router;
