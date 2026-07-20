const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const AppError = require('../utils/AppError');

const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // Null for anonymous actions or failed logins without valid user
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entityType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  entityId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  oldValue: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  newValue: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  requestMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  requestUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Success', 'Failed'),
    defaultValue: 'Success',
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
  updatedAt: false, // Audit logs only have createdAt, they cannot be updated
  tableName: 'audit_logs',
  indexes: [
    { fields: ['entityType', 'entityId'] },
    { fields: ['userId'] },
    { fields: ['module'] }
  ],
  hooks: {
    beforeUpdate: () => {
      throw new AppError('Audit logs are immutable and cannot be updated', 403);
    },
    beforeDestroy: () => {
      throw new AppError('Audit logs are immutable and cannot be deleted', 403);
    }
  }
});

AuditLog.associate = (models) => {
  if (models.User) {
    AuditLog.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
  }
};

module.exports = AuditLog;
