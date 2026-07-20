const express = require('express');
const settingsController = require('../controllers/settingsController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route Protection (Settings are extremely sensitive)
router.use(protect);
router.use(restrictTo('Super Admin', 'Admin'));

// Organization Profile
router.route('/organization')
  .get(settingsController.getOrganizationProfile)
  .put(settingsController.updateOrganizationProfile);

// Security Settings
router.route('/security')
  .get(settingsController.getSecuritySettings)
  .put(settingsController.updateSecuritySettings);

// Email Configuration
router.route('/email')
  .get(settingsController.getEmailConfiguration)
  .put(settingsController.updateEmailConfiguration);

// Generic System Settings (e.g., Notifications, Workflow, AI)
router.route('/:category')
  .get(settingsController.getSystemSettingsByCategory)
  .put(settingsController.updateSystemSetting);

module.exports = router;
