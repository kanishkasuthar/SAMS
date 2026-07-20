const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Department = require('./Department');

const DecisionFlow = sequelize.define('DecisionFlow', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  flowName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flowCode: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Department,
      key: 'id'
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Active', 'Archived'),
    defaultValue: 'Draft',
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  updatedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  paranoid: true, // adds deletedAt
  tableName: 'decision_flows'
});

// Associations
User.hasMany(DecisionFlow, { foreignKey: 'createdBy', as: 'CreatedFlows' });
DecisionFlow.belongsTo(User, { foreignKey: 'createdBy', as: 'Creator' });

User.hasMany(DecisionFlow, { foreignKey: 'updatedBy', as: 'UpdatedFlows' });
DecisionFlow.belongsTo(User, { foreignKey: 'updatedBy', as: 'Updater' });

Department.hasMany(DecisionFlow, { foreignKey: 'departmentId' });
DecisionFlow.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = DecisionFlow;
