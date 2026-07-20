const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const DecisionFlow = require('./DecisionFlow');
const User = require('./User');
const DecisionStep = require('./DecisionStep');

const DecisionRequest = sequelize.define('DecisionRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  flowId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: DecisionFlow,
      key: 'id'
    }
  },
  requestTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  requestedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  currentStep: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  currentApprover: { // Usually mapped to a User ID, can be null if pooled or completed
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  overallStatus: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected', 'Returned', 'Cancelled'),
    defaultValue: 'Pending',
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: 'decision_requests'
});

// Associations
DecisionFlow.hasMany(DecisionRequest, { foreignKey: 'flowId', as: 'Requests' });
DecisionRequest.belongsTo(DecisionFlow, { foreignKey: 'flowId' });

User.hasMany(DecisionRequest, { foreignKey: 'requestedBy', as: 'SubmittedRequests' });
DecisionRequest.belongsTo(User, { foreignKey: 'requestedBy', as: 'Requester' });

User.hasMany(DecisionRequest, { foreignKey: 'currentApprover', as: 'AssignedRequests' });
DecisionRequest.belongsTo(User, { foreignKey: 'currentApprover', as: 'Approver' });

module.exports = DecisionRequest;
