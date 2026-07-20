const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const DecisionRequest = require('./DecisionRequest');
const DecisionStep = require('./DecisionStep');
const User = require('./User');

const DecisionHistory = sequelize.define('DecisionHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  requestId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: DecisionRequest,
      key: 'id'
    }
  },
  stepId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: DecisionStep,
      key: 'id'
    }
  },
  action: {
    type: DataTypes.ENUM('Created', 'Approved', 'Rejected', 'Delegated', 'Escalated', 'Returned', 'Cancelled'),
    allowNull: false,
  },
  performedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
  updatedAt: false, // Only need createdAt (timestamp)
  tableName: 'decision_history'
});

// Alias createdAt as timestamp for easier consumption
DecisionHistory.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values.timestamp = values.createdAt;
  return values;
};

// Associations
DecisionRequest.hasMany(DecisionHistory, { foreignKey: 'requestId', as: 'History', onDelete: 'CASCADE' });
DecisionHistory.belongsTo(DecisionRequest, { foreignKey: 'requestId' });

DecisionStep.hasMany(DecisionHistory, { foreignKey: 'stepId' });
DecisionHistory.belongsTo(DecisionStep, { foreignKey: 'stepId' });

User.hasMany(DecisionHistory, { foreignKey: 'performedBy' });
DecisionHistory.belongsTo(User, { foreignKey: 'performedBy', as: 'Actor' });

module.exports = DecisionHistory;
