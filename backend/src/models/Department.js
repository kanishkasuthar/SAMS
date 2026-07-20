const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  departmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  parentDepartmentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  departmentHeadId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  budget: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.00,
  },
  employeeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#3b82f6',
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: 'Network',
  }
}, {
  timestamps: true,
  paranoid: true,
  tableName: 'departments'
});

Department.associate = (models) => {
  // Self referencing
  Department.hasMany(models.Department, { as: 'SubDepartments', foreignKey: 'parentDepartmentId' });
  Department.belongsTo(models.Department, { as: 'ParentDepartment', foreignKey: 'parentDepartmentId' });
  
  // User associations
  Department.belongsTo(models.User, { as: 'DepartmentHead', foreignKey: 'departmentHeadId' });
  Department.hasMany(models.User, { foreignKey: 'department_id' });
  
  // Role association (Optional default role for this dept)
  if (models.Role) {
    Department.belongsTo(models.Role, { as: 'DefaultRole', foreignKey: 'roleId' });
  }
};

module.exports = Department;
