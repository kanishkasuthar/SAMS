const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // e.g. 'organization.view'
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false, // e.g. 'Organization Studio'
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false, // e.g. 'View Organization'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  risk: {
    type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'),
    defaultValue: 'LOW',
  }
}, {
  timestamps: true,
  tableName: 'permissions'
});

Permission.associate = (models) => {
  Permission.belongsToMany(models.Role, { through: models.RolePermission, foreignKey: 'permissionId' });
};

module.exports = Permission;
