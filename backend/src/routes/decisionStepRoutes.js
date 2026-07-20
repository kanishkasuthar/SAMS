const express = require('express');
const stepController = require('../controllers/decisionStepController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true }); // Access :flowId from parent

router.use(protect);

router.get('/', stepController.getAllSteps);

router.use(restrictTo('Super Admin', 'Admin', 'HR Manager'));

router.post('/', stepController.createStep);
router.put('/:stepId', stepController.updateStep);
router.delete('/:stepId', stepController.deleteStep);

module.exports = router;
