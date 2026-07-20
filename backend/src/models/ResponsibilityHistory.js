const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ResponsibilityHistory = sequelize.define('ResponsibilityHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  assignmentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  action: {
    type: DataTypes.ENUM('Created', 'Updated', 'Deactivated', 'Transferred'),
    allowNull: false,
  },
  performedBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  oldValue: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  newValue: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
  updatedAt: false, // Only createdAt is needed
  tableName: 'responsibility_history'
});

ResponsibilityHistory.associate = (models) => {
  ResponsibilityHistory.belongsTo(models.ResponsibilityAssignment, { foreignKey: 'assignmentId', as: 'Assignment' });
  
  if (models.User) {
    ResponsibilityHistory.belongsTo(models.User, { foreignKey: 'performedBy', as: 'Actor' });
  }
};

module.exports = ResponsibilityHistory;
