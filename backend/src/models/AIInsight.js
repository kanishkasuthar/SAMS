const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AIInsight = sequelize.define('AIInsight', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING, // e.g., 'Health', 'Bottleneck', 'Workload'
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  confidenceScore: {
    type: DataTypes.FLOAT, // 0.0 to 1.0
    defaultValue: 0.9,
  },
  severity: {
    type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
    defaultValue: 'Low',
  },
  generatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  generatedBy: {
    type: DataTypes.UUID,
    allowNull: true, // System generated or specific User
  },
  status: {
    type: DataTypes.ENUM('Active', 'Archived'),
    defaultValue: 'Active',
  }
}, {
  timestamps: true,
  tableName: 'ai_insights'
});

AIInsight.associate = (models) => {
  if (models.User) {
    AIInsight.belongsTo(models.User, { foreignKey: 'generatedBy', as: 'Generator' });
  }
};

module.exports = AIInsight;
