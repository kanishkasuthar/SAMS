const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmailConfiguration = sequelize.define('EmailConfiguration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  smtpHost: { type: DataTypes.STRING, allowNull: true },
  smtpPort: { type: DataTypes.INTEGER, allowNull: true },
  smtpUsername: { type: DataTypes.STRING, allowNull: true },
  smtpPassword: { type: DataTypes.TEXT, allowNull: true }, // Will be encrypted in service layer before saving
  fromEmail: { type: DataTypes.STRING, allowNull: true },
  fromName: { type: DataTypes.STRING, allowNull: true },
  encryptionType: { type: DataTypes.STRING, defaultValue: 'TLS' },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' }
}, {
  timestamps: true,
  tableName: 'email_configurations'
});

EmailConfiguration.associate = (models) => {};

module.exports = EmailConfiguration;
