const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;

  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = `Duplicate field value: ${err.errors[0].value}. Please use another value!`;
    error = new AppError(message, 400);
  }

  // Development vs Production Error Handling
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: error.status,
      error: err,
      message: error.message,
      stack: err.stack,
    });
  } else {
    // Production Mode
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      // Programming or unknown error
      logger.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
      });
    }
  }
};

module.exports = errorHandler;
