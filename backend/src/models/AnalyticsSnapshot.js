const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AnalyticsSnapshot = sequelize.define('AnalyticsSnapshot', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  snapshotName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  snapshotType: {
    type: DataTypes.STRING, // e.g., 'Daily', 'Weekly', 'Monthly'
    allowNull: false,
  },
  generatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  generatedBy: {
    type: DataTypes.UUID,
    allowNull: true, // Null means system generated
  },
  status: {
    type: DataTypes.ENUM('Success', 'Failed'),
    defaultValue: 'Success',
  }
}, {
  timestamps: true,
  tableName: 'analytics_snapshots'
});

AnalyticsSnapshot.associate = (models) => {
  if (models.User) {
    AnalyticsSnapshot.belongsTo(models.User, { foreignKey: 'generatedBy', as: 'Generator' });
  }
};

module.exports = AnalyticsSnapshot;
