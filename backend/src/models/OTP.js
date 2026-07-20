const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const OTP = sequelize.define('OTP', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('signup', 'reset_password'),
    allowNull: false,
  },
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  resend_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'otps',
  hooks: {
    beforeCreate: async (otp) => {
      otp.code = await bcrypt.hash(otp.code, 12);
    }
  }
});

OTP.prototype.verifyCode = async function(candidateCode) {
  return await bcrypt.compare(candidateCode, this.code);
};

module.exports = OTP;
