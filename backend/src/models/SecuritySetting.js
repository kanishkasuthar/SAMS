const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SecuritySetting = sequelize.define('SecuritySetting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  passwordMinLength: { type: DataTypes.INTEGER, defaultValue: 8 },
  passwordExpiryDays: { type: DataTypes.INTEGER, defaultValue: 90 },
  maxLoginAttempts: { type: DataTypes.INTEGER, defaultValue: 5 },
  accountLockDuration: { type: DataTypes.INTEGER, defaultValue: 30 }, // minutes
  sessionTimeout: { type: DataTypes.INTEGER, defaultValue: 60 }, // minutes
  twoFactorEnabled: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: true,
  tableName: 'security_settings'
});

SecuritySetting.associate = (models) => {};

module.exports = SecuritySetting;
