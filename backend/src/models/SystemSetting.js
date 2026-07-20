const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SystemSetting = sequelize.define('SystemSetting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  settingKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  settingValue: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  valueType: {
    type: DataTypes.STRING, // String, Boolean, Number, JSON
    defaultValue: 'String',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isEditable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isEncrypted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: 'system_settings'
});

SystemSetting.associate = (models) => {
  if (models.User) {
    SystemSetting.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'Updater' });
  }
};

module.exports = SystemSetting;
