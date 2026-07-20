const bcrypt = require('bcryptjs');
const User = require('../models/User');
const OTP = require('../models/OTP');
const Session = require('../models/Session');
const Role = require('../models/Role');
const auditService = require('../services/auditService');
const { signToken, signRefreshToken, generateOTP } = require('../utils/token');
const sendEmail = require('../utils/email');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const logAudit = async (userId, action, details, ip, status = 'Success') => {
  try {
    await auditService.logAction({
      userId,
      action,
      module: 'Authentication',
      remarks: details,
      ipAddress: ip,
      status
    });
  } catch (err) {
    console.error('Audit Log Error:', err);
  }
};

exports.signup = async (req, res, next) => {
  console.log(`\n[SIGNUP DIAGNOSTICS] 1. Request received for email: ${req.body?.email}`);
  try {
    const { name, email, password } = req.body;
    console.log(`[SIGNUP DIAGNOSTICS] 2. Validation passed (middleware). Name: ${name}`);

    console.log(`[SIGNUP DIAGNOSTICS] 3. Checking for duplicate email...`);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      if (existingUser.is_verified) {
        console.log(`[SIGNUP DIAGNOSTICS] 3a. Email already registered and verified.`);
        return next(new AppError('Email already in use', 400));
      } else {
        console.log(`[SIGNUP DIAGNOSTICS] 3b. Email registered but unverified. Deleting old OTPs.`);
        await OTP.destroy({ where: { email, type: 'signup' } });
      }
    }

    let user = existingUser;
    console.log(`[SIGNUP DIAGNOSTICS] 5. Creating/updating User in database...`);
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user = await User.create({ name, email, password: hashedPassword });
    } else {
      user.password = await bcrypt.hash(password, 12);
      user.name = name;
      await user.save();
    }
    console.log(`[SIGNUP DIAGNOSTICS] 5a. User saved successfully. ID: ${user.id}`);

    console.log(`[SIGNUP DIAGNOSTICS] 4. Generating secure OTP...`);
    const otpCode = generateOTP();
    await OTP.create({
      email,
      code: otpCode, 
      type: 'signup',
      expires_at: new Date(Date.now() + 5 * 60 * 1000) 
    });
    console.log(`[SIGNUP DIAGNOSTICS] 4a. OTP stored securely.`);

    // ----- DEVELOPMENT MODE OVERRIDE -----
    if (process.env.DEVELOPMENT_MODE === 'true') {
      console.log(`[SIGNUP DIAGNOSTICS] 6. DEVELOPMENT_MODE enabled. Skipping SMTP.`);
      user.is_verified = true;
      await user.save();
      await logAudit(user.id, 'Signup Completed', 'Auto-verified in dev mode', req.ip);
      
      console.log(`[SIGNUP DIAGNOSTICS] 8. Sending success response to frontend.\n`);
      return res.status(201).json({ 
        status: 'success', 
        message: 'Account created and verified automatically in development mode.',
        devMode: true 
      });
    }
    // -------------------------------------

    try {
      console.log(`[SIGNUP DIAGNOSTICS] 6. Initiating SMTP request to send Email...`);
      await sendEmail({
        email: user.email,
        subject: 'SAMS Registration - Verification Code',
        message: `Your verification code is ${otpCode}. It expires in 5 minutes.`
      });
      console.log(`[SIGNUP DIAGNOSTICS] 7. Email sent successfully.`);
    } catch (err) {
      console.log(`[SIGNUP DIAGNOSTICS] 7a. Email delivery failed: ${err.message}`);
      return next(new AppError(`Email delivery failed: ${err.message}`, 500));
    }

    await logAudit(user.id, 'Signup Initiated', 'OTP Sent', req.ip);

    console.log(`[SIGNUP DIAGNOSTICS] 8. Sending success response to frontend.\n`);
    res.status(201).json({ status: 'success', message: 'OTP sent to email. Please verify to complete registration.' });
  } catch (err) { 
    console.log(`[SIGNUP DIAGNOSTICS] Fatal error caught: ${err.message}\n`);
    next(err); 
  }
};

exports.sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    let otpRecord = await OTP.findOne({ where: { email, type: 'signup' } });
    if (otpRecord && otpRecord.resend_count >= 3) {
      return next(new AppError('Maximum OTP resend requests exceeded. Try again later.', 429));
    }

    const otpCode = generateOTP();
    if (otpRecord) {
      otpRecord.code = otpCode; // hook hashes it
      otpRecord.resend_count += 1;
      otpRecord.expires_at = new Date(Date.now() + 5 * 60 * 1000);
      await otpRecord.save();
    } else {
      await OTP.create({
        email, code: otpCode, type: 'signup', expires_at: new Date(Date.now() + 5 * 60 * 1000)
      });
    }

    await sendEmail({
      email, subject: 'SAMS Registration - Verification Code', message: `Your new verification code is ${otpCode}. It expires in 5 minutes.`
    });

    res.status(200).json({ status: 'success', message: 'OTP resent successfully.' });
  } catch (err) { next(err); }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const otpRecord = await OTP.findOne({ where: { email, type: 'signup' } });

    if (!otpRecord) return next(new AppError('OTP not found or expired', 400));
    if (otpRecord.expires_at < new Date()) return next(new AppError('OTP expired', 400));
    if (otpRecord.attempts >= 5) {
      await otpRecord.destroy();
      return next(new AppError('Too many failed attempts. Please request a new OTP.', 400));
    }

    const isValid = await otpRecord.verifyCode(code);
    if (!isValid) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return next(new AppError('Invalid OTP', 400));
    }

    const user = await User.findOne({ where: { email } });
    user.is_verified = true;
    await user.save();
    await otpRecord.destroy();

    await logAudit(user.id, 'Signup Completed', 'Email Verified', req.ip);

    res.status(200).json({ status: 'success', message: 'Email verified successfully. You can now log in.' });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: [{ model: Role }] });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      if (user) await logAudit(user.id, 'Login Failed', 'Incorrect password', req.ip, 'Failed');
      return next(new AppError('Incorrect email or password', 401));
    }

    if (!user.is_verified) {
      return next(new AppError('Please verify your email before logging in', 403));
    }

    const token = signToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    await Session.create({
      user_id: user.id,
      refresh_token: refreshToken,
      device: req.headers['user-agent'] || 'Unknown',
      ip: req.ip || req.connection.remoteAddress,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await logAudit(user.id, 'Login', 'User authenticated via email/password', req.ip);

    res.status(200).json({
      status: 'success', token, refreshToken,
      data: { user: { id: user.id, name: user.name, email: user.email, role: user.Role ? user.Role.name : null } }
    });
  } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (token) {
      const session = await Session.findOne({ where: { refresh_token: token } });
      if (session) {
        await logAudit(session.user_id, 'Logout', 'User explicitly logged out', req.ip);
        await session.destroy();
      }
    }
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
  } catch (err) { next(err); }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return next(new AppError('User not found', 404));

    await OTP.destroy({ where: { email, type: 'reset_password' } });

    const otpCode = generateOTP();
    await OTP.create({
      email, code: otpCode, type: 'reset_password', expires_at: new Date(Date.now() + 5 * 60 * 1000)
    });

    await sendEmail({
      email, subject: 'SAMS Password Reset', message: `Your password reset code is ${otpCode}. It expires in 5 minutes.`
    });

    await logAudit(user.id, 'Password Reset Requested', 'OTP sent', req.ip);

    res.status(200).json({ status: 'success', message: 'Password reset OTP sent to email' });
  } catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;
    
    const otpRecord = await OTP.findOne({ where: { email, type: 'reset_password' } });
    if (!otpRecord || otpRecord.expires_at < new Date()) return next(new AppError('OTP expired or invalid', 400));
    
    if (otpRecord.attempts >= 5) {
      await otpRecord.destroy();
      return next(new AppError('Too many failed attempts.', 400));
    }

    if (!(await otpRecord.verifyCode(code))) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return next(new AppError('Invalid OTP', 400));
    }

    const user = await User.findOne({ where: { email } });
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    
    await otpRecord.destroy();
    
    await Session.destroy({ where: { user_id: user.id } }); // revoke all sessions

    await logAudit(user.id, 'Password Reset', 'Password changed via OTP', req.ip);

    res.status(200).json({ status: 'success', message: 'Password has been reset successfully.' });
  } catch (err) { next(err); }
};

exports.getProfile = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { user: req.user } });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    req.user.name = name || req.user.name;
    await req.user.save();

    await logAudit(req.user.id, 'Profile Update', 'User updated profile', req.ip);
    res.status(200).json({ status: 'success', data: { user: req.user } });
  } catch (err) { next(err); }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!(await bcrypt.compare(currentPassword, req.user.password))) {
      return next(new AppError('Current password is incorrect', 401));
    }

    req.user.password = await bcrypt.hash(newPassword, 12);
    await req.user.save();
    
    await logAudit(req.user.id, 'Password Change', 'User changed password from profile', req.ip);

    res.status(200).json({ status: 'success', message: 'Password changed successfully' });
  } catch (err) { next(err); }
};

exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.findAll({ where: { user_id: req.user.id } });
    res.status(200).json({ status: 'success', data: { sessions } });
  } catch (err) { next(err); }
};

exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!session) return next(new AppError('Session not found', 404));
    
    await session.destroy();
    await logAudit(req.user.id, 'Session Revoked', `Revoked session ${req.params.id}`, req.ip);
    
    res.status(204).json({ status: 'success', data: null });
  } catch (err) { next(err); }
};
