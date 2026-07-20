const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { // Keeping physical column as 'name' to not break existing schema, aliasing in UI as roleName
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: 'Level 3',
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'var(--color-primary)',
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  },
  isSystem: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
  tableName: 'roles'
});

// Avoid circular dependency by deferring associations
Role.associate = (models) => {
  Role.hasMany(models.User, { foreignKey: 'role_id' });
  Role.belongsToMany(models.Permission, { through: models.RolePermission, foreignKey: 'roleId' });
};

module.exports = Role;
