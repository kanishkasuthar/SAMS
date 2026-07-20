const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const DecisionFlow = require('./DecisionFlow');
const Role = require('./Role');
const User = require('./User');
const Department = require('./Department');

const DecisionStep = sequelize.define('DecisionStep', {
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
  stepNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stepName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approverType: {
    type: DataTypes.ENUM('Role', 'User', 'Department', 'System'),
    allowNull: false,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Role,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Department,
      key: 'id'
    }
  },
  approvalMode: {
    type: DataTypes.ENUM('Sequential', 'Parallel', 'Conditional'),
    defaultValue: 'Sequential',
  },
  escalationTime: {
    type: DataTypes.INTEGER, // in hours
    allowNull: true,
  },
  isMandatory: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  timestamps: true,
  tableName: 'decision_steps'
});

// Associations
DecisionFlow.hasMany(DecisionStep, { foreignKey: 'flowId', as: 'Steps', onDelete: 'CASCADE' });
DecisionStep.belongsTo(DecisionFlow, { foreignKey: 'flowId' });

Role.hasMany(DecisionStep, { foreignKey: 'roleId' });
DecisionStep.belongsTo(Role, { foreignKey: 'roleId' });

User.hasMany(DecisionStep, { foreignKey: 'userId' });
DecisionStep.belongsTo(User, { foreignKey: 'userId' });

Department.hasMany(DecisionStep, { foreignKey: 'departmentId' });
DecisionStep.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = DecisionStep;
