const { Report, ReportExecution, SavedReport } = require('../models');
const reportService = require('../services/reportService');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const generateSchema = Joi.object({
  reportId: Joi.string().guid().required(),
  filters: Joi.object().optional(),
  limit: Joi.number().integer().min(1).max(5000).optional(),
  offset: Joi.number().integer().min(0).optional()
});

const exportSchema = Joi.object({
  reportId: Joi.string().guid().required(),
  filters: Joi.object().optional(),
  format: Joi.string().valid('CSV', 'Excel', 'JSON').required()
});

exports.getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.findAll({
      where: { status: 'Active' },
      order: [['reportName', 'ASC']]
    });
    res.status(200).json({ status: 'success', results: reports.length, data: { reports } });
  } catch (error) {
    next(error);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return next(new AppError('Report not found', 404));
    res.status(200).json({ status: 'success', data: { report } });
  } catch (error) {
    next(error);
  }
};

exports.generateReport = async (req, res, next) => {
  try {
    const { error } = generateSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const { reportId, filters, limit = 500, offset = 0 } = req.body;

    const report = await Report.findByPk(reportId);
    if (!report) return next(new AppError('Report not found', 404));

    const startTime = Date.now();
    const { totalRecords, data } = await reportService.generateReportData(report.module, filters, limit, offset);
    const executionTime = Date.now() - startTime;

    // Log Execution
    await ReportExecution.create({
      reportId,
      generatedBy: req.user.id,
      filters,
      totalRecords,
      fileFormat: 'JSON',
      executionTime,
      status: 'Success'
    });

    res.status(200).json({ 
      status: 'success', 
      results: data.length, 
      totalRecords,
      data 
    });
  } catch (err) {
    // Attempt to log failure
    if (req.body.reportId) {
      await ReportExecution.create({
        reportId: req.body.reportId,
        generatedBy: req.user.id,
        fileFormat: 'JSON',
        status: 'Failed'
      }).catch(e => console.error('Failed to log report execution failure', e));
    }
    next(err);
  }
};

exports.exportReport = async (req, res, next) => {
  try {
    const { error } = exportSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const { reportId, filters, format } = req.body;

    const report = await Report.findByPk(reportId);
    if (!report) return next(new AppError('Report not found', 404));

    const startTime = Date.now();
    // For export, we might bypass limit, or set a very high limit (e.g. 50000)
    const { totalRecords, data } = await reportService.generateReportData(report.module, filters, 50000, 0);
    
    let fileBuffer;
    let contentType;
    let extension;

    if (format === 'CSV') {
      fileBuffer = reportService.exportToCSV(data);
      contentType = 'text/csv';
      extension = 'csv';
    } else if (format === 'Excel') {
      fileBuffer = await reportService.exportToExcel(data, report.reportName);
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      extension = 'xlsx';
    } else {
      // JSON format is handled by generateReport normally, but included here for completeness
      fileBuffer = JSON.stringify(data);
      contentType = 'application/json';
      extension = 'json';
    }

    const executionTime = Date.now() - startTime;

    await ReportExecution.create({
      reportId,
      generatedBy: req.user.id,
      filters,
      totalRecords,
      fileFormat: format,
      executionTime,
      status: 'Success'
    });

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${report.reportCode}_export.${extension}`);
    res.send(fileBuffer);
  } catch (err) {
    if (req.body.reportId) {
      await ReportExecution.create({
        reportId: req.body.reportId,
        generatedBy: req.user.id,
        fileFormat: req.body.format || 'JSON',
        status: 'Failed'
      }).catch(e => console.error('Failed to log report execution failure', e));
    }
    next(err);
  }
};

exports.saveFilter = async (req, res, next) => {
  try {
    const { reportId, savedFilters, isDefault } = req.body;
    if (!reportId || !savedFilters) return next(new AppError('reportId and savedFilters are required', 400));

    if (isDefault) {
      // Unset previous default
      await SavedReport.update({ isDefault: false }, { where: { userId: req.user.id, reportId } });
    }

    const saved = await SavedReport.create({
      userId: req.user.id,
      reportId,
      savedFilters,
      isDefault: isDefault || false
    });

    res.status(201).json({ status: 'success', data: { saved } });
  } catch (error) {
    next(error);
  }
};

exports.getReportHistory = async (req, res, next) => {
  try {
    const history = await ReportExecution.findAll({
      where: { generatedBy: req.user.id },
      order: [['createdAt', 'DESC']],
      include: [{ model: Report, as: 'Report', attributes: ['reportName', 'module'] }],
      limit: 50
    });
    res.status(200).json({ status: 'success', data: { history } });
  } catch (error) {
    next(error);
  }
};
