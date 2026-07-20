const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const AppError = require('../utils/AppError');

const VersionHistory = sequelize.define('VersionHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entityType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entityId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  versionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  changeType: {
    type: DataTypes.STRING, // e.g., 'Create', 'Update', 'Restore'
    allowNull: false,
  },
  snapshot: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  changedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  changeReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  previousVersionId: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  timestamps: true,
  updatedAt: false, // Versions are immutable
  tableName: 'version_history',
  indexes: [
    { fields: ['entityType', 'entityId'] },
    { fields: ['module'] }
  ],
  hooks: {
    beforeUpdate: () => {
      throw new AppError('Version history records are immutable and cannot be updated', 403);
    },
    beforeDestroy: () => {
      throw new AppError('Version history records are immutable and cannot be deleted', 403);
    }
  }
});

VersionHistory.associate = (models) => {
  if (models.User) {
    VersionHistory.belongsTo(models.User, { foreignKey: 'changedBy', as: 'Changer' });
  }
  VersionHistory.belongsTo(models.VersionHistory, { foreignKey: 'previousVersionId', as: 'PreviousVersion' });
};

module.exports = VersionHistory;
