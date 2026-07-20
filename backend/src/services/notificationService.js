const { Notification, NotificationPreference } = require('../models');
const AppError = require('../utils/AppError');

/**
 * Trigger a system notification based on an event
 * @param {Object} payload
 * @param {String} payload.recipientId - User ID to receive the notification
 * @param {String} payload.type - Type of notification (e.g., 'Workflow Approval')
 * @param {String} payload.title - Notification title
 * @param {String} payload.message - Notification message body
 * @param {String} [payload.priority='Medium'] - Priority ('Low', 'Medium', 'High')
 * @param {String} [payload.senderId=null] - User ID who triggered this (or null for system)
 * @param {String} [payload.relatedEntity=null] - E.g., 'DecisionRequest'
 * @param {String} [payload.relatedEntityId=null] - UUID of the related entity
 * @param {String} [payload.actionUrl=null] - Frontend URL to resolve action
 */
exports.triggerNotification = async (payload) => {
  try {
    const {
      recipientId,
      type,
      title,
      message,
      priority = 'Medium',
      senderId = null,
      relatedEntity = null,
      relatedEntityId = null,
      actionUrl = null
    } = payload;

    // Check user preferences before sending
    let prefs = await NotificationPreference.findOne({ where: { userId: recipientId } });
    if (!prefs) {
      prefs = await NotificationPreference.create({ userId: recipientId });
    }

    // Business Logic: Do not create in-app notification if disabled in preferences
    // For this module, we assume we are only creating in-app notifications.
    if (!prefs.inAppEnabled) {
      return null; // Silently skip
    }

    // Specific category checks based on preference toggles
    if (type.includes('Workflow') && !prefs.workflowEnabled) return null;
    if (type.includes('System') && !prefs.systemEnabled) return null;
    if (type.includes('Reminder') && !prefs.reminderEnabled) return null;

    // Create the notification
    const notification = await Notification.create({
      recipientId,
      senderId,
      title,
      message,
      type,
      priority,
      status: 'Sent', // Assumed sent immediately for in-app
      relatedEntity,
      relatedEntityId,
      actionUrl
    });

    // Optional: Here you could trigger WebSockets (Socket.io) to push to the client in real-time

    return notification;
  } catch (error) {
    console.error('Failed to trigger notification:', error);
    // Don't throw to prevent blocking the main business transaction
    return null; 
  }
};
