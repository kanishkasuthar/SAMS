const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const NotificationPreference = sequelize.define('NotificationPreference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  emailEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  inAppEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  workflowEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  systemEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  reminderEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  timestamps: true,
  tableName: 'notification_preferences'
});

NotificationPreference.associate = (models) => {
  if (models.User) {
    NotificationPreference.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
  }
};

module.exports = NotificationPreference;
