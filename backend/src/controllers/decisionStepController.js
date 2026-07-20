const { DecisionStep, DecisionFlow } = require('../models');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const stepSchema = Joi.object({
  stepNumber: Joi.number().required(),
  stepName: Joi.string().required(),
  approverType: Joi.string().valid('Role', 'User', 'Department', 'System').required(),
  roleId: Joi.string().guid().optional(),
  userId: Joi.string().guid().optional(),
  departmentId: Joi.string().guid().optional(),
  approvalMode: Joi.string().valid('Sequential', 'Parallel', 'Conditional').optional(),
  escalationTime: Joi.number().optional(),
  isMandatory: Joi.boolean().optional(),
});

exports.getAllSteps = async (req, res, next) => {
  try {
    const steps = await DecisionStep.findAll({
      where: { flowId: req.params.flowId },
      order: [['stepNumber', 'ASC']]
    });
    res.status(200).json({ status: 'success', results: steps.length, data: { steps } });
  } catch (error) {
    next(error);
  }
};

exports.createStep = async (req, res, next) => {
  try {
    const flow = await DecisionFlow.findByPk(req.params.flowId);
    if (!flow) return next(new AppError('No flow found with that ID', 404));

    const { error } = stepSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const step = await DecisionStep.create({
      ...req.body,
      flowId: req.params.flowId
    });

    res.status(201).json({ status: 'success', data: { step } });
  } catch (error) {
    next(error);
  }
};

exports.updateStep = async (req, res, next) => {
  try {
    const { error } = stepSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const step = await DecisionStep.findOne({
      where: { id: req.params.stepId, flowId: req.params.flowId }
    });
    if (!step) return next(new AppError('No step found with that ID in this flow', 404));

    await step.update(req.body);

    res.status(200).json({ status: 'success', data: { step } });
  } catch (error) {
    next(error);
  }
};

exports.deleteStep = async (req, res, next) => {
  try {
    const step = await DecisionStep.findOne({
      where: { id: req.params.stepId, flowId: req.params.flowId }
    });
    if (!step) return next(new AppError('No step found with that ID in this flow', 404));

    await step.destroy();

    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
