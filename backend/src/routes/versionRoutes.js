const express = require('express');
const versionController = require('../controllers/versionController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route Protection (Version History is highly sensitive)
router.use(protect);
router.use(restrictTo('Super Admin', 'Admin', 'HR Manager'));

router.get('/', versionController.getVersions);
router.get('/compare', versionController.compareVersions); // Must precede /:id
router.get('/:id', versionController.getVersionById);
router.get('/entity/:entityType/:entityId', versionController.getEntityTimeline);
router.post('/restore/:versionId', versionController.restoreVersion);

module.exports = router;
