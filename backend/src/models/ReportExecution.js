const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ReportExecution = sequelize.define('ReportExecution', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  reportId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  generatedBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  filters: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  totalRecords: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fileFormat: {
    type: DataTypes.ENUM('JSON', 'CSV', 'Excel', 'PDF'),
    defaultValue: 'JSON',
  },
  executionTime: {
    type: DataTypes.INTEGER, // milliseconds
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Success', 'Failed'),
    defaultValue: 'Success',
  }
}, {
  timestamps: true,
  updatedAt: false, // only need createdAt for execution log
  tableName: 'report_executions'
});

ReportExecution.associate = (models) => {
  ReportExecution.belongsTo(models.Report, { foreignKey: 'reportId', as: 'Report' });
  if (models.User) {
    ReportExecution.belongsTo(models.User, { foreignKey: 'generatedBy', as: 'Generator' });
  }
};

module.exports = ReportExecution;
