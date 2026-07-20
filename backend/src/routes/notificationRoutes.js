const express = require('express');
const notificationController = require('../controllers/notificationController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', notificationController.getNotifications);
router.get('/unread-count', notificationController.getUnreadCount);
router.get('/:id', notificationController.getNotificationById);

router.patch('/read-all', notificationController.markAllAsRead);
router.patch('/:id/read', notificationController.markAsRead);
router.delete('/:id', notificationController.deleteNotification);

// System/Admin routes
router.use(restrictTo('Super Admin', 'Admin'));
router.post('/', notificationController.createNotification);
router.put('/:id', notificationController.updateNotification);

module.exports = router;
