const { NotificationTemplate } = require('../models');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const templateSchema = Joi.object({
  templateName: Joi.string().required(),
  eventType: Joi.string().required(),
  subject: Joi.string().required(),
  messageTemplate: Joi.string().required(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
});

exports.getAllTemplates = async (req, res, next) => {
  try {
    const templates = await NotificationTemplate.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ status: 'success', results: templates.length, data: { templates } });
  } catch (error) {
    next(error);
  }
};

exports.createTemplate = async (req, res, next) => {
  try {
    const { error } = templateSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const template = await NotificationTemplate.create(req.body);
    res.status(201).json({ status: 'success', data: { template } });
  } catch (error) {
    next(error);
  }
};

exports.updateTemplate = async (req, res, next) => {
  try {
    const template = await NotificationTemplate.findByPk(req.params.id);
    if (!template) return next(new AppError('Template not found', 404));

    await template.update(req.body);
    res.status(200).json({ status: 'success', data: { template } });
  } catch (error) {
    next(error);
  }
};

exports.deleteTemplate = async (req, res, next) => {
  try {
    const template = await NotificationTemplate.findByPk(req.params.id);
    if (!template) return next(new AppError('Template not found', 404));

    await template.destroy();
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
