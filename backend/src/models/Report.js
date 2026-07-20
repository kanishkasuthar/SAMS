const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  reportName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reportCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  reportType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'reports'
});

Report.associate = (models) => {
  if (models.User) {
    Report.belongsTo(models.User, { foreignKey: 'createdBy', as: 'Creator' });
  }
  Report.hasMany(models.ReportExecution, { foreignKey: 'reportId', as: 'Executions' });
  Report.hasMany(models.SavedReport, { foreignKey: 'reportId', as: 'SavedFilters' });
};

module.exports = Report;
