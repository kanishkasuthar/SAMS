const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SavedReport = sequelize.define('SavedReport', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  reportId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  savedFilters: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
  tableName: 'saved_reports'
});

SavedReport.associate = (models) => {
  SavedReport.belongsTo(models.Report, { foreignKey: 'reportId', as: 'Report' });
  if (models.User) {
    SavedReport.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
  }
};

module.exports = SavedReport;
