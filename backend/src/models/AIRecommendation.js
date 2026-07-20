const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AIRecommendation = sequelize.define('AIRecommendation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  recommendationType: {
    type: DataTypes.STRING, // e.g., 'Optimization', 'Cleanup', 'Redistribution'
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
  relatedModule: {
    type: DataTypes.STRING, // e.g., 'Users', 'DecisionFlow'
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Implemented', 'Dismissed'),
    defaultValue: 'Pending',
  }
}, {
  timestamps: true,
  tableName: 'ai_recommendations'
});

AIRecommendation.associate = (models) => {};

module.exports = AIRecommendation;
