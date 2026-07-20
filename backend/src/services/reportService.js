const { Op } = require('sequelize');
const ExcelJS = require('exceljs');
const { Parser } = require('json2csv');
const models = require('../models');
const AppError = require('../utils/AppError');

/**
 * Maps a module string to the actual Sequelize model and returns associations to include.
 */
const getModelConfig = (moduleName) => {
  switch (moduleName) {
    case 'Users':
      return { 
        model: models.User, 
        includes: [
          { model: models.Role, as: 'Role' },
          { model: models.Department, as: 'Department' }
        ] 
      };
    case 'Departments':
      return { 
        model: models.Department, 
        includes: [
          { model: models.User, as: 'Manager' }
        ] 
      };
    case 'Roles':
      return { model: models.Role, includes: [] };
    case 'ResponsibilityMatrix':
      return { 
        model: models.ResponsibilityAssignment, 
        includes: [
          { model: models.User, as: 'User' },
          { model: models.Role, as: 'Role' },
          { model: models.ResponsibilityMatrix, as: 'Matrix' }
        ] 
      };
    case 'DecisionFlows':
      return { 
        model: models.DecisionRequest, 
        includes: [
          { model: models.User, as: 'Requester' },
          { model: models.User, as: 'CurrentApprover' },
          { model: models.DecisionFlow, as: 'DecisionFlow' }
        ] 
      };
    case 'Notifications':
      return { model: models.Notification, includes: [] };
    case 'AuditLog':
      return { model: models.AuditLog, includes: [] };
    case 'VersionHistory':
      return { model: models.VersionHistory, includes: [] };
    default:
      throw new AppError(`Unknown module: ${moduleName}`, 400);
  }
};

/**
 * Dynamically parse JSON filters into Sequelize Where conditions
 */
const buildWhereClause = (filters) => {
  const where = {};
  if (!filters) return where;

  // Exact matches
  if (filters.departmentId) where.departmentId = filters.departmentId;
  if (filters.roleId) where.roleId = filters.roleId;
  if (filters.userId) where.userId = filters.userId;
  if (filters.status) where.status = filters.status;
  if (filters.priority) where.priority = filters.priority;
  if (filters.createdBy) where.createdBy = filters.createdBy;
  
  // Date Range (Expects { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' })
  if (filters.dateRange && filters.dateRange.startDate && filters.dateRange.endDate) {
    where.createdAt = {
      [Op.between]: [new Date(filters.dateRange.startDate), new Date(filters.dateRange.endDate)]
    };
  }

  // Text search (if query provided, attempt a basic like on common fields, this requires context so we skip generic text search here to avoid complex OR statements across varied models)

  return where;
};

/**
 * Generate Report Data (JSON)
 */
exports.generateReportData = async (moduleName, filters, limit = 500, offset = 0) => {
  const { model, includes } = getModelConfig(moduleName);
  const where = buildWhereClause(filters);

  const { count, rows } = await model.findAndCountAll({
    where,
    include: includes,
    limit,
    offset,
    order: [['createdAt', 'DESC']] // Default ordering
  });

  return { totalRecords: count, data: rows };
};

/**
 * Export to CSV
 * Returns a string (CSV payload)
 */
exports.exportToCSV = (data) => {
  if (!data || data.length === 0) return '';
  // Flatten objects or rely on json2csv standard unwinding
  const json2csvParser = new Parser();
  // Strip out full sequelize objects and get raw values
  const rawData = data.map(d => typeof d.get === 'function' ? d.get({ plain: true }) : d);
  return json2csvParser.parse(rawData);
};

/**
 * Export to Excel
 * Returns a Buffer
 */
exports.exportToExcel = async (data, reportName) => {
  if (!data || data.length === 0) throw new AppError('No data to export', 400);

  const rawData = data.map(d => typeof d.get === 'function' ? d.get({ plain: true }) : d);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(reportName || 'Report');

  // Derive columns from first object keys
  const keys = Object.keys(rawData[0]);
  worksheet.columns = keys.map(key => ({ header: key, key: key, width: 20 }));

  worksheet.addRows(rawData);

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
