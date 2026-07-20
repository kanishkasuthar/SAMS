const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RolePermission = sequelize.define('RolePermission', {
  roleId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  permissionId: {
    type: DataTypes.UUID,
    primaryKey: true,
  }
}, {
  timestamps: false,
  tableName: 'role_permissions'
});

module.exports = RolePermission;
