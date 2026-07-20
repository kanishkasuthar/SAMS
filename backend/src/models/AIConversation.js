const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AIConversation = sequelize.define('AIConversation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING, // e.g., 'Mock', 'OpenAI', 'Azure'
    allowNull: false,
  },
  tokensUsed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  responseTime: {
    type: DataTypes.INTEGER, // in milliseconds
    defaultValue: 0,
  }
}, {
  timestamps: true,
  tableName: 'ai_conversations'
});

AIConversation.associate = (models) => {
  if (models.User) {
    AIConversation.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
  }
};

module.exports = AIConversation;
