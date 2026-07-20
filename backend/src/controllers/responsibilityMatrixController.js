const { ResponsibilityMatrix, ResponsibilityAssignment } = require('../models');
const AppError = require('../utils/AppError');
const AuditLog = require('../models/AuditLog');
const Joi = require('joi');

const matrixSchema = Joi.object({
  matrixName: Joi.string().required(),
  matrixCode: Joi.string().optional(),
  description: Joi.string().allow('', null).optional(),
  departmentId: Joi.string().guid().optional(),
  status: Joi.string().valid('Active', 'Draft', 'Archived').optional(),
});

exports.getAllMatrices = async (req, res, next) => {
  try {
    const matrices = await ResponsibilityMatrix.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ status: 'success', results: matrices.length, data: { matrices } });
  } catch (error) {
    next(error);
  }
};

exports.getMatrixById = async (req, res, next) => {
  try {
    const matrix = await ResponsibilityMatrix.findByPk(req.params.id, {
      include: [{ model: ResponsibilityAssignment, as: 'Assignments' }]
    });
    if (!matrix) return next(new AppError('No matrix found with that ID', 404));
    res.status(200).json({ status: 'success', data: { matrix } });
  } catch (error) {
    next(error);
  }
};

exports.createMatrix = async (req, res, next) => {
  try {
    const { error } = matrixSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const matrix = await ResponsibilityMatrix.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({ status: 'success', data: { matrix } });
  } catch (error) {
    next(error);
  }
};

exports.updateMatrix = async (req, res, next) => {
  try {
    const { error } = matrixSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const matrix = await ResponsibilityMatrix.findByPk(req.params.id);
    if (!matrix) return next(new AppError('No matrix found with that ID', 404));

    await matrix.update({ ...req.body, updatedBy: req.user.id });

    res.status(200).json({ status: 'success', data: { matrix } });
  } catch (error) {
    next(error);
  }
};

exports.deleteMatrix = async (req, res, next) => {
  try {
    const matrix = await ResponsibilityMatrix.findByPk(req.params.id);
    if (!matrix) return next(new AppError('No matrix found with that ID', 404));

    const matrixName = matrix.matrixName;
    await matrix.destroy(); // Soft delete

    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
