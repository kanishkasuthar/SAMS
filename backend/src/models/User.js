const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Role = require('./Role');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'full_name' // Maps the model's 'name' property to 'full_name' column to satisfy fullName requirement while keeping existing code functioning
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'email_verified'
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_login'
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'role_id',
    references: {
      model: Role,
      key: 'id'
    }
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'department_id'
  },
  reportingManagerId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'reporting_manager_id'
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true, // Enables soft deletes (deletedAt)
  tableName: 'users',
  indexes: [
    { fields: ['email'], unique: true },
    { fields: ['department_id'] },
    { fields: ['role_id'] },
    { fields: ['status'] }
  ]
});

// Associations
User.associate = (models) => {
  User.belongsTo(models.Role, { foreignKey: 'role_id' });
  User.belongsTo(models.Department, { as: 'Department', foreignKey: 'department_id' });
  User.belongsTo(models.User, { as: 'ReportingManager', foreignKey: 'reporting_manager_id' });
  User.hasMany(models.User, { as: 'DirectReports', foreignKey: 'reporting_manager_id' });
};

module.exports = User;
