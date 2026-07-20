const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const NotificationTemplate = sequelize.define('NotificationTemplate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  templateName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  messageTemplate: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  }
}, {
  timestamps: true,
  tableName: 'notification_templates'
});

module.exports = NotificationTemplate;
