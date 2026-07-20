const { DecisionFlow, DecisionStep } = require('../models');
const AuditLog = require('../models/AuditLog');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const flowSchema = Joi.object({
  flowName: Joi.string().required(),
  flowCode: Joi.string().optional(),
  description: Joi.string().allow('', null).optional(),
  departmentId: Joi.string().guid().optional(),
  category: Joi.string().optional(),
  status: Joi.string().valid('Draft', 'Active', 'Archived').optional(),
});

exports.getAllFlows = async (req, res, next) => {
  try {
    const flows = await DecisionFlow.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ status: 'success', results: flows.length, data: { flows } });
  } catch (error) {
    next(error);
  }
};

exports.getFlowById = async (req, res, next) => {
  try {
    const flow = await DecisionFlow.findByPk(req.params.id, {
      include: [{ model: DecisionStep, as: 'Steps' }]
    });
    if (!flow) return next(new AppError('No flow found with that ID', 404));
    res.status(200).json({ status: 'success', data: { flow } });
  } catch (error) {
    next(error);
  }
};

exports.createFlow = async (req, res, next) => {
  try {
    const { error } = flowSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const flow = await DecisionFlow.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({ status: 'success', data: { flow } });
  } catch (error) {
    next(error);
  }
};

exports.updateFlow = async (req, res, next) => {
  try {
    const { error } = flowSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const flow = await DecisionFlow.findByPk(req.params.id);
    if (!flow) return next(new AppError('No flow found with that ID', 404));

    await flow.update({ ...req.body, updatedBy: req.user.id });

    res.status(200).json({ status: 'success', data: { flow } });
  } catch (error) {
    next(error);
  }
};

exports.deleteFlow = async (req, res, next) => {
  try {
    const flow = await DecisionFlow.findByPk(req.params.id);
    if (!flow) return next(new AppError('No flow found with that ID', 404));

    const flowName = flow.flowName;
    await flow.destroy();

    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
