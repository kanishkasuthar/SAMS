const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ResponsibilityMatrix = sequelize.define('ResponsibilityMatrix', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  matrixName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  matrixCode: {
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
  },
  status: {
    type: DataTypes.ENUM('Active', 'Draft', 'Archived'),
    defaultValue: 'Draft',
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  timestamps: true,
  paranoid: true, // adds deletedAt
  tableName: 'responsibility_matrices'
});

ResponsibilityMatrix.associate = (models) => {
  ResponsibilityMatrix.belongsTo(models.Department, { foreignKey: 'departmentId', as: 'Department' });
  ResponsibilityMatrix.hasMany(models.ResponsibilityAssignment, { foreignKey: 'matrixId', as: 'Assignments', onDelete: 'CASCADE' });
  
  if (models.User) {
    ResponsibilityMatrix.belongsTo(models.User, { foreignKey: 'createdBy', as: 'Creator' });
    ResponsibilityMatrix.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'Updater' });
  }
};

module.exports = ResponsibilityMatrix;
