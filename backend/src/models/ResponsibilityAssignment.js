const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ResponsibilityAssignment = sequelize.define('ResponsibilityAssignment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  matrixId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  responsibilityType: {
    type: DataTypes.ENUM('Responsible', 'Accountable', 'Consulted', 'Informed'),
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
    defaultValue: 'Medium',
  },
  effectiveFrom: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  effectiveTo: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  }
}, {
  timestamps: true,
  tableName: 'responsibility_assignments'
});

ResponsibilityAssignment.associate = (models) => {
  ResponsibilityAssignment.belongsTo(models.ResponsibilityMatrix, { foreignKey: 'matrixId', as: 'Matrix' });
  
  if (models.User) {
    ResponsibilityAssignment.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
  }
  if (models.Role) {
    ResponsibilityAssignment.belongsTo(models.Role, { foreignKey: 'roleId', as: 'Role' });
  }
  if (models.Department) {
    ResponsibilityAssignment.belongsTo(models.Department, { foreignKey: 'departmentId', as: 'Department' });
  }

  ResponsibilityAssignment.hasMany(models.ResponsibilityHistory, { foreignKey: 'assignmentId', as: 'History', onDelete: 'CASCADE' });
};

module.exports = ResponsibilityAssignment;
