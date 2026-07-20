const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
  });
};

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
