const { VersionHistory } = require('../models');
const versionService = require('../services/versionService');
const reportService = require('../services/reportService');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const generateSchema = Joi.object({
  filters: Joi.object().optional(),
  limit: Joi.number().integer().min(1).max(5000).optional(),
  offset: Joi.number().integer().min(0).optional()
});

exports.getVersions = async (req, res, next) => {
  try {
    const { error } = generateSchema.validate(req.query);
    if (error) return next(new AppError(error.details[0].message, 400));

    let filters = {};
    if (req.query.filters) {
      try {
        filters = JSON.parse(req.query.filters);
      } catch (e) {
        return next(new AppError('Invalid JSON in filters query parameter', 400));
      }
    }

    const limit = parseInt(req.query.limit, 10) || 500;
    const offset = parseInt(req.query.offset, 10) || 0;

    const { totalRecords, data } = await reportService.generateReportData('VersionHistory', filters, limit, offset);
    res.status(200).json({ status: 'success', totalRecords, results: data.length, data: { versions: data } });
  } catch (error) {
    next(error);
  }
};

exports.getVersionById = async (req, res, next) => {
  try {
    const version = await VersionHistory.findByPk(req.params.id);
    if (!version) return next(new AppError('Version not found', 404));
    res.status(200).json({ status: 'success', data: { version } });
  } catch (error) {
    next(error);
  }
};

exports.getEntityTimeline = async (req, res, next) => {
  try {
    const { entityType, entityId } = req.params;
    const timeline = await versionService.getEntityTimeline(entityType, entityId);
    res.status(200).json({ status: 'success', results: timeline.length, data: { timeline } });
  } catch (error) {
    next(error);
  }
};

exports.compareVersions = async (req, res, next) => {
  try {
    const { v1, v2 } = req.query;
    if (!v1 || !v2) return next(new AppError('Must provide v1 and v2 query parameters', 400));
    
    const comparison = await versionService.compareVersions(v1, v2);
    res.status(200).json({ status: 'success', data: { comparison } });
  } catch (error) {
    next(error);
  }
};

exports.restoreVersion = async (req, res, next) => {
  try {
    const { versionId } = req.params;
    const { restoreReason } = req.body;
    
    const restoredVersionLog = await versionService.restoreVersion(versionId, req.user.id, restoreReason);
    res.status(200).json({ status: 'success', data: { restoredVersionLog } });
  } catch (error) {
    next(error);
  }
};
