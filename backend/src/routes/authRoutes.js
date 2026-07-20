const express = require('express');
const Joi = require('joi');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

const router = express.Router();

const schemas = {
  signup: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.any().valid(Joi.ref('password')).required().messages({ "any.only": "Passwords do not match" })
  }),
  emailOnly: Joi.object().keys({ email: Joi.string().email().required() }),
  verifyOTP: Joi.object().keys({ email: Joi.string().email().required(), code: Joi.string().length(6).required() }),
  login: Joi.object().keys({ email: Joi.string().email().required(), password: Joi.string().required() }),
  resetPassword: Joi.object().keys({ email: Joi.string().email().required(), code: Joi.string().length(6).required(), newPassword: Joi.string().min(8).required() }),
  changePassword: Joi.object().keys({ currentPassword: Joi.string().required(), newPassword: Joi.string().min(8).required() }),
  profile: Joi.object().keys({ name: Joi.string().required() }),
};

// Public Routes
router.post('/signup', validate({ body: schemas.signup }), authController.signup);
router.post('/send-otp', validate({ body: schemas.emailOnly }), authController.sendOtp);
router.post('/verify-otp', validate({ body: schemas.verifyOTP }), authController.verifyOTP);
router.post('/login', validate({ body: schemas.login }), authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', validate({ body: schemas.emailOnly }), authController.forgotPassword);
router.post('/reset-password', validate({ body: schemas.resetPassword }), authController.resetPassword);

// Protected Routes
router.use(protect);

router.get('/profile', authController.getProfile);
router.put('/profile', validate({ body: schemas.profile }), authController.updateProfile);
router.put('/change-password', validate({ body: schemas.changePassword }), authController.changePassword);

router.get('/sessions', authController.getSessions);
router.delete('/sessions/:id', authController.deleteSession);

module.exports = router;
