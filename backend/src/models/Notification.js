const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(
      'Workflow Approval', 
      'Workflow Rejection', 
      'Responsibility Assignment', 
      'Department Updates', 
      'Role Changes', 
      'System Announcement', 
      'Reminder', 
      'Deadline Alert', 
      'Escalation', 
      'General Notification'
    ),
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Sent', 'Failed'),
    defaultValue: 'Sent',
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  recipientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  relatedEntity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  relatedEntityId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  actionUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  readAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  timestamps: true,
  paranoid: true, // enables soft deletes (deletedAt)
  tableName: 'notifications'
});

Notification.associate = (models) => {
  if (models.User) {
    Notification.belongsTo(models.User, { foreignKey: 'senderId', as: 'Sender' });
    Notification.belongsTo(models.User, { foreignKey: 'recipientId', as: 'Recipient' });
  }
  if (models.Department) {
    Notification.belongsTo(models.Department, { foreignKey: 'departmentId', as: 'Department' });
  }
};

module.exports = Notification;
