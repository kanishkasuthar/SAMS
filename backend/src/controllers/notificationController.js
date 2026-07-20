const { Notification } = require('../models');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const notificationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  type: Joi.string().required(),
  priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  recipientId: Joi.string().guid().required(),
  departmentId: Joi.string().guid().optional(),
  relatedEntity: Joi.string().optional(),
  relatedEntityId: Joi.string().guid().optional(),
  actionUrl: Joi.string().optional(),
  expiresAt: Joi.date().optional()
});

exports.getNotifications = async (req, res, next) => {
  try {
    const filters = { recipientId: req.user.id };
    
    if (req.query.type) filters.type = req.query.type;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.isRead !== undefined) filters.isRead = req.query.isRead === 'true';

    const notifications = await Notification.findAll({
      where: filters,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ status: 'success', results: notifications.length, data: { notifications } });
  } catch (error) {
    next(error);
  }
};

exports.getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.count({
      where: { recipientId: req.user.id, isRead: false }
    });
    res.status(200).json({ status: 'success', data: { count } });
  } catch (error) {
    next(error);
  }
};

exports.getNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      where: { id: req.params.id, recipientId: req.user.id }
    });
    if (!notification) return next(new AppError('Notification not found', 404));
    res.status(200).json({ status: 'success', data: { notification } });
  } catch (error) {
    next(error);
  }
};

exports.createNotification = async (req, res, next) => {
  try {
    const { error } = notificationSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const notification = await Notification.create({
      ...req.body,
      senderId: req.user.id
    });

    res.status(201).json({ status: 'success', data: { notification } });
  } catch (error) {
    next(error);
  }
};

exports.updateNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return next(new AppError('Notification not found', 404));

    // Allow partial updates
    await notification.update(req.body);
    res.status(200).json({ status: 'success', data: { notification } });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      where: { id: req.params.id, recipientId: req.user.id }
    });
    if (!notification) return next(new AppError('Notification not found', 404));

    await notification.update({ isRead: true, readAt: new Date() });
    res.status(200).json({ status: 'success', data: { notification } });
  } catch (error) {
    next(error);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.update(
      { isRead: true, readAt: new Date() },
      { where: { recipientId: req.user.id, isRead: false } }
    );
    res.status(200).json({ status: 'success', message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      where: { id: req.params.id, recipientId: req.user.id }
    });
    if (!notification) return next(new AppError('Notification not found', 404));

    await notification.destroy(); // Soft delete
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
