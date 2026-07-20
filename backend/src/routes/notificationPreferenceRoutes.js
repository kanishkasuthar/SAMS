const express = require('express');
const preferenceController = require('../controllers/notificationPreferenceController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', preferenceController.getPreferences);
router.put('/', preferenceController.updatePreferences);

module.exports = router;
