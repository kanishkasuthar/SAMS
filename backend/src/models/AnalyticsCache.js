const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AnalyticsCache = sequelize.define('AnalyticsCache', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cacheKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  generatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'analytics_cache'
});

// No direct associations typically needed for a KV cache table
AnalyticsCache.associate = (models) => {};

module.exports = AnalyticsCache;
