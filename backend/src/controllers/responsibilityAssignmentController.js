const { ResponsibilityAssignment, ResponsibilityHistory, ResponsibilityMatrix, sequelize } = require('../models');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const assignmentSchema = Joi.object({
  userId: Joi.string().guid().optional(),
  roleId: Joi.string().guid().optional(),
  departmentId: Joi.string().guid().optional(),
  responsibilityType: Joi.string().valid('Responsible', 'Accountable', 'Consulted', 'Informed').required(),
  priority: Joi.string().valid('Low', 'Medium', 'High', 'Critical').optional(),
  effectiveFrom: Joi.date().optional(),
  effectiveTo: Joi.date().optional(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
}).or('userId', 'roleId', 'departmentId');

exports.getAssignmentsByMatrix = async (req, res, next) => {
  try {
    const assignments = await ResponsibilityAssignment.findAll({
      where: { matrixId: req.params.matrixId }
    });
    res.status(200).json({ status: 'success', results: assignments.length, data: { assignments } });
  } catch (error) {
    next(error);
  }
};

exports.createAssignment = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { error } = assignmentSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const matrix = await ResponsibilityMatrix.findByPk(req.params.matrixId, { transaction });
    if (!matrix) throw new AppError('Matrix not found', 404);

    // Business Rule: Prevent duplicate active assignments for user+type in same matrix
    if (req.body.userId) {
      const existing = await ResponsibilityAssignment.findOne({
        where: {
          matrixId: req.params.matrixId,
          userId: req.body.userId,
          responsibilityType: req.body.responsibilityType,
          status: 'Active'
        },
        transaction
      });
      if (existing) {
        throw new AppError('User already has this active responsibility in the matrix', 400);
      }
    }

    const assignment = await ResponsibilityAssignment.create({
      ...req.body,
      matrixId: req.params.matrixId
    }, { transaction });

    await ResponsibilityHistory.create({
      assignmentId: assignment.id,
      action: 'Created',
      performedBy: req.user.id,
      newValue: req.body,
      remarks: 'Initial assignment creation'
    }, { transaction });

    await transaction.commit();
    res.status(201).json({ status: 'success', data: { assignment } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.updateAssignment = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    // We allow partial updates
    const assignment = await ResponsibilityAssignment.findOne({
      where: { id: req.params.assignmentId, matrixId: req.params.matrixId },
      transaction
    });
    if (!assignment) throw new AppError('Assignment not found', 404);

    const oldValue = assignment.toJSON();
    await assignment.update(req.body, { transaction });

    await ResponsibilityHistory.create({
      assignmentId: assignment.id,
      action: 'Updated',
      performedBy: req.user.id,
      oldValue,
      newValue: req.body,
      remarks: 'Assignment updated'
    }, { transaction });

    await transaction.commit();
    res.status(200).json({ status: 'success', data: { assignment } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.deactivateAssignment = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const assignment = await ResponsibilityAssignment.findOne({
      where: { id: req.params.assignmentId, matrixId: req.params.matrixId },
      transaction
    });
    if (!assignment) throw new AppError('Assignment not found', 404);

    await assignment.update({ status: 'Inactive' }, { transaction });

    await ResponsibilityHistory.create({
      assignmentId: assignment.id,
      action: 'Deactivated',
      performedBy: req.user.id,
      remarks: 'Assignment deactivated'
    }, { transaction });

    await transaction.commit();
    res.status(200).json({ status: 'success', data: { assignment } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// SPECIALIZED ENDPOINTS
exports.transferResponsibility = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { fromUserId, toUserId, matrixId } = req.body;
    if (!fromUserId || !toUserId || !matrixId) throw new AppError('fromUserId, toUserId, and matrixId are required', 400);

    const assignments = await ResponsibilityAssignment.findAll({
      where: { userId: fromUserId, matrixId, status: 'Active' },
      transaction
    });

    if (assignments.length === 0) throw new AppError('No active assignments found for fromUserId in this matrix', 404);

    const transferred = [];
    for (const assignment of assignments) {
      const oldValue = assignment.toJSON();
      await assignment.update({ userId: toUserId }, { transaction });
      
      await ResponsibilityHistory.create({
        assignmentId: assignment.id,
        action: 'Transferred',
        performedBy: req.user.id,
        oldValue,
        newValue: { userId: toUserId },
        remarks: `Transferred from User ${fromUserId} to User ${toUserId}`
      }, { transaction });
      transferred.push(assignment);
    }

    await transaction.commit();
    res.status(200).json({ status: 'success', message: `Transferred ${transferred.length} assignments`, data: { transferred } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.bulkAssign = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { matrixId, assignments } = req.body; // array of assignments
    if (!matrixId || !Array.isArray(assignments)) throw new AppError('matrixId and assignments array are required', 400);

    const matrix = await ResponsibilityMatrix.findByPk(matrixId, { transaction });
    if (!matrix) throw new AppError('Matrix not found', 404);

    const createdAssignments = [];
    for (const item of assignments) {
      const { error } = assignmentSchema.validate(item);
      if (error) throw new AppError(`Validation failed for item: ${error.details[0].message}`, 400);

      const assignment = await ResponsibilityAssignment.create({
        ...item,
        matrixId
      }, { transaction });

      await ResponsibilityHistory.create({
        assignmentId: assignment.id,
        action: 'Created',
        performedBy: req.user.id,
        newValue: item,
        remarks: 'Bulk assignment creation'
      }, { transaction });

      createdAssignments.push(assignment);
    }

    await transaction.commit();
    res.status(201).json({ status: 'success', data: { assignments: createdAssignments } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.getUserResponsibilities = async (req, res, next) => {
  try {
    const assignments = await ResponsibilityAssignment.findAll({
      where: { userId: req.params.userId },
      include: [{ model: ResponsibilityMatrix, as: 'Matrix' }]
    });
    res.status(200).json({ status: 'success', results: assignments.length, data: { assignments } });
  } catch (error) {
    next(error);
  }
};

exports.getDepartmentResponsibilities = async (req, res, next) => {
  try {
    const assignments = await ResponsibilityAssignment.findAll({
      where: { departmentId: req.params.departmentId },
      include: [{ model: ResponsibilityMatrix, as: 'Matrix' }]
    });
    res.status(200).json({ status: 'success', results: assignments.length, data: { assignments } });
  } catch (error) {
    next(error);
  }
};

exports.getAssignmentHistory = async (req, res, next) => {
  try {
    const history = await ResponsibilityHistory.findAll({
      where: { assignmentId: req.params.assignmentId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ status: 'success', data: { history } });
  } catch (error) {
    next(error);
  }
};
