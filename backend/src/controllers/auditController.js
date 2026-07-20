const { AuditLog } = require('../models');
const reportService = require('../services/reportService');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const generateSchema = Joi.object({
  filters: Joi.object().optional(),
  limit: Joi.number().integer().min(1).max(5000).optional(),
  offset: Joi.number().integer().min(0).optional()
});

const exportSchema = Joi.object({
  filters: Joi.object().optional(),
  format: Joi.string().valid('CSV', 'Excel', 'JSON').required()
});

exports.getLogs = async (req, res, next) => {
  try {
    const { error } = generateSchema.validate(req.query);
    if (error) return next(new AppError(error.details[0].message, 400));

    // Convert query params to generic filters block (or expect them encoded as JSON string for complex filters)
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

    // Reuse the Reporting engine to fetch the logs dynamically
    const { totalRecords, data } = await reportService.generateReportData('AuditLog', filters, limit, offset);

    res.status(200).json({ status: 'success', totalRecords, results: data.length, data: { logs: data } });
  } catch (error) {
    next(error);
  }
};

exports.getLogById = async (req, res, next) => {
  try {
    const log = await AuditLog.findByPk(req.params.id);
    if (!log) return next(new AppError('Audit Log not found', 404));

    res.status(200).json({ status: 'success', data: { log } });
  } catch (error) {
    next(error);
  }
};

exports.exportLogs = async (req, res, next) => {
  try {
    const { error } = exportSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const { filters, format } = req.body;

    const { data } = await reportService.generateReportData('AuditLog', filters, 50000, 0);

    let fileBuffer;
    let contentType;
    let extension;

    if (format === 'CSV') {
      fileBuffer = reportService.exportToCSV(data);
      contentType = 'text/csv';
      extension = 'csv';
    } else if (format === 'Excel') {
      fileBuffer = await reportService.exportToExcel(data, 'Audit Logs');
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      extension = 'xlsx';
    } else {
      fileBuffer = JSON.stringify(data);
      contentType = 'application/json';
      extension = 'json';
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename=Audit_Logs_Export.${extension}`);
    res.send(fileBuffer);
  } catch (err) {
    next(err);
  }
};
