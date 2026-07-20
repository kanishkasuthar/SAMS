const ResponsibilityMatrix = require('../models/ResponsibilityMatrix');
const ResponsibilityAssignment = require('../models/ResponsibilityAssignment');
const Department = require('../models/Department');
const User = require('../models/User');
const Role = require('../models/Role');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');
const { logAudit } = require('../utils/auditLogger');

// -----------------------------------------
// Matrix CRUD
// -----------------------------------------

exports.getAllMatrices = async (req, res, next) => {
  try {
    const { search = '', limit = 100 } = req.query;

    const matrices = await ResponsibilityMatrix.findAll({
      where: search ? { processName: { [Op.like]: `%${search}%` } } : {},
      include: [
        { model: Department, as: 'Department', attributes: ['id', 'departmentName'] },
        { 
          model: ResponsibilityAssignment, 
          as: 'Assignments',
          include: [
            { model: Department, as: 'Department', attributes: ['id', 'departmentName'] },
            { model: User, as: 'User', attributes: ['id', ['full_name', 'fullName'], 'email'] },
            { model: Role, as: 'Role', attributes: ['id', 'roleName'] }
          ]
        }
      ],
      limit: parseInt(limit, 10),
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ status: 'success', data: { matrices } });
  } catch (err) {
    next(err);
  }
};

exports.getMatrix = async (req, res, next) => {
  try {
    const matrix = await ResponsibilityMatrix.findByPk(req.params.id, {
      include: [
        { model: Department, as: 'Department', attributes: ['id', 'departmentName'] },
        { 
          model: ResponsibilityAssignment, 
          as: 'Assignments',
          include: [
            { model: Department, as: 'Department', attributes: ['id', 'departmentName'] },
            { model: User, as: 'User', attributes: ['id', ['full_name', 'fullName']] },
            { model: Role, as: 'Role', attributes: ['id', 'roleName'] }
          ]
        }
      ]
    });

    if (!matrix) return next(new AppError('Matrix not found', 404));

    res.status(200).json({ status: 'success', data: { matrix } });
  } catch (err) {
    next(err);
  }
};

exports.createMatrix = async (req, res, next) => {
  try {
    const matrix = await ResponsibilityMatrix.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json({ status: 'success', data: { matrix } });
  } catch (err) {
    next(err);
  }
};

exports.updateMatrix = async (req, res, next) => {
  try {
    const matrix = await ResponsibilityMatrix.findByPk(req.params.id);
    if (!matrix) return next(new AppError('Matrix not found', 404));

    await matrix.update({
      ...req.body,
      updatedBy: req.user.id
    });
    res.status(200).json({ status: 'success', data: { matrix } });
  } catch (err) {
    next(err);
  }
};

exports.deleteMatrix = async (req, res, next) => {
  try {
    const matrix = await ResponsibilityMatrix.findByPk(req.params.id);
    if (!matrix) return next(new AppError('Matrix not found', 404));

    await matrix.destroy();
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};

// -----------------------------------------
// Assignment logic
// -----------------------------------------

exports.assignResponsibility = async (req, res, next) => {
  try {
    const { id } = req.params; // matrixId
    const { departmentId, userId, roleId, responsibilityType, priority, remarks } = req.body;

    const matrix = await ResponsibilityMatrix.findByPk(id);
    if (!matrix) return next(new AppError('Matrix not found', 404));

    // Business Rule: Only one Accountable per matrix
    if (responsibilityType === 'Accountable') {
      const existingAccountable = await ResponsibilityAssignment.findOne({
        where: { matrixId: id, responsibilityType: 'Accountable' }
      });
      if (existingAccountable) {
        return next(new AppError('Only one Accountable entity is allowed per process.', 400));
      }
    }

    // Business Rule: Prevent duplicate assignment to same entity
    const duplicateCheck = await ResponsibilityAssignment.findOne({
      where: {
        matrixId: id,
        departmentId: departmentId || null,
        userId: userId || null,
        roleId: roleId || null
      }
    });

    if (duplicateCheck) {
      // If it exists, let's update it instead or throw error? 
      // Usually RACI allows replacing, so let's update if the user sends to the same entity.
      if (responsibilityType === 'Accountable' && duplicateCheck.responsibilityType !== 'Accountable') {
        // Double check accountable again if we are switching it
         const accCheck = await ResponsibilityAssignment.findOne({
           where: { matrixId: id, responsibilityType: 'Accountable', id: { [Op.ne]: duplicateCheck.id } }
         });
         if (accCheck) return next(new AppError('Only one Accountable entity is allowed per process.', 400));
      }
      
      await duplicateCheck.update({ responsibilityType, priority, remarks });
      return res.status(200).json({ status: 'success', data: { assignment: duplicateCheck } });
    }

    const assignment = await ResponsibilityAssignment.create({
      matrixId: id,
      departmentId: departmentId || null,
      userId: userId || null,
      roleId: roleId || null,
      responsibilityType,
      priority,
      remarks
    });
    res.status(201).json({ status: 'success', data: { assignment } });
  } catch (err) {
    next(err);
  }
};

exports.removeAssignment = async (req, res, next) => {
  try {
    const { id, assignmentId } = req.params;
    const assignment = await ResponsibilityAssignment.findOne({ where: { id: assignmentId, matrixId: id } });
    if (!assignment) return next(new AppError('Assignment not found', 404));
    
    await assignment.destroy();
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};

// -----------------------------------------
// Statistics
// -----------------------------------------

exports.getStatistics = async (req, res, next) => {
  try {
    const totalProcesses = await ResponsibilityMatrix.count();
    
    // Count how many processes have an 'Accountable' owner
    const assignments = await ResponsibilityAssignment.findAll({ where: { responsibilityType: 'Accountable' } });
    const coveredProcessIds = new Set(assignments.map(a => a.matrixId));
    
    res.status(200).json({
      status: 'success',
      data: {
        totalProcesses,
        missingAccountable: totalProcesses - coveredProcessIds.size,
        completionPercentage: totalProcesses > 0 ? Math.round((coveredProcessIds.size / totalProcesses) * 100) : 0
      }
    });
  } catch (err) {
    next(err);
  }
};
