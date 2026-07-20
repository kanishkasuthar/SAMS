const { DecisionRequest, DecisionFlow, DecisionStep, DecisionHistory, User, sequelize } = require('../models');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const requestSchema = Joi.object({
  flowId: Joi.string().guid().required(),
  requestTitle: Joi.string().required(),
  requestDescription: Joi.string().allow('', null).optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  dueDate: Joi.date().optional(),
});

exports.createRequest = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { error } = requestSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const flow = await DecisionFlow.findByPk(req.body.flowId, { transaction });
    if (!flow || flow.status !== 'Active') {
      throw new AppError('Flow not found or not active', 400);
    }

    // Find first step
    const firstStep = await DecisionStep.findOne({
      where: { flowId: flow.id, stepNumber: 1 },
      transaction
    });

    if (!firstStep) {
      throw new AppError('Flow has no steps configured', 400);
    }

    const request = await DecisionRequest.create({
      ...req.body,
      requestedBy: req.user.id,
      currentStep: 1,
      currentApprover: firstStep.userId || null, // Simplified: In real app, resolve Role/Dept to users
      overallStatus: 'Pending'
    }, { transaction });

    await DecisionHistory.create({
      requestId: request.id,
      action: 'Created',
      performedBy: req.user.id,
      remarks: 'Request initiated'
    }, { transaction });

    await transaction.commit();
    res.status(201).json({ status: 'success', data: { request } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.getPendingRequests = async (req, res, next) => {
  try {
    const requests = await DecisionRequest.findAll({
      where: { currentApprover: req.user.id, overallStatus: 'Pending' },
      include: [{ model: DecisionFlow }]
    });
    res.status(200).json({ status: 'success', results: requests.length, data: { requests } });
  } catch (error) {
    next(error);
  }
};

exports.getCompletedRequests = async (req, res, next) => {
  try {
    // Find requests where user participated
    const histories = await DecisionHistory.findAll({
      where: { performedBy: req.user.id },
      attributes: ['requestId'],
      group: ['requestId']
    });
    
    const requestIds = histories.map(h => h.requestId);

    const requests = await DecisionRequest.findAll({
      where: { id: requestIds },
      include: [{ model: DecisionFlow }]
    });
    res.status(200).json({ status: 'success', results: requests.length, data: { requests } });
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const history = await DecisionHistory.findAll({
      where: { requestId: req.params.id },
      order: [['createdAt', 'ASC']],
      include: [{ model: User, as: 'Actor', attributes: ['id', 'name', 'email'] }]
    });
    res.status(200).json({ status: 'success', data: { history } });
  } catch (error) {
    next(error);
  }
};

// Generic helper for actions
const performAction = async (req, res, next, action, newStatus, advanceStep = false) => {
  const transaction = await sequelize.transaction();
  try {
    const request = await DecisionRequest.findByPk(req.params.id, { transaction });
    if (!request) throw new AppError('Request not found', 404);
    if (request.overallStatus !== 'Pending') throw new AppError(`Request is already ${request.overallStatus}`, 400);

    const remarks = req.body.remarks || `${action} by user`;
    
    let updates = { overallStatus: newStatus };
    
    if (advanceStep) {
      // Find next step
      const nextStep = await DecisionStep.findOne({
        where: { flowId: request.flowId, stepNumber: request.currentStep + 1 },
        transaction
      });
      
      if (nextStep) {
        updates.currentStep = nextStep.stepNumber;
        updates.currentApprover = nextStep.userId || null;
        updates.overallStatus = 'Pending'; // Keep pending for next step
      } else {
        updates.currentApprover = null;
        // If no next step, it is fully approved!
      }
    } else if (newStatus !== 'Pending') {
      updates.currentApprover = null;
    }

    // Delegation specific
    if (action === 'Delegated' && req.body.delegateTo) {
      updates.currentApprover = req.body.delegateTo;
      updates.overallStatus = 'Pending'; // Remains pending
    }

    await request.update(updates, { transaction });

    await DecisionHistory.create({
      requestId: request.id,
      stepId: null, // Should match current step in real app
      action,
      performedBy: req.user.id,
      remarks
    }, { transaction });

    await transaction.commit();
    res.status(200).json({ status: 'success', data: { request } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.approveRequest = (req, res, next) => performAction(req, res, next, 'Approved', 'Approved', true);
exports.rejectRequest = (req, res, next) => performAction(req, res, next, 'Rejected', 'Rejected');
exports.delegateRequest = (req, res, next) => {
  if (!req.body.delegateTo) return next(new AppError('delegateTo is required', 400));
  performAction(req, res, next, 'Delegated', 'Pending');
};
exports.escalateRequest = (req, res, next) => performAction(req, res, next, 'Escalated', 'Pending'); // Usually auto-assigned to manager, keeping simple
exports.returnRequest = (req, res, next) => performAction(req, res, next, 'Returned', 'Returned');
exports.cancelRequest = (req, res, next) => performAction(req, res, next, 'Cancelled', 'Cancelled');
