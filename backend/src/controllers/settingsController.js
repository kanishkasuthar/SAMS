const settingsService = require('../services/settingsService');
const AppError = require('../utils/AppError');

exports.getOrganizationProfile = async (req, res, next) => {
  try {
    const data = await settingsService.getOrganizationProfile();
    res.status(200).json({ status: 'success', data: { profile: data } });
  } catch (error) {
    next(error);
  }
};

exports.updateOrganizationProfile = async (req, res, next) => {
  try {
    const data = await settingsService.updateOrganizationProfile(req.body, req.user.id, req.ip);
    res.status(200).json({ status: 'success', data: { profile: data } });
  } catch (error) {
    next(error);
  }
};

exports.getSecuritySettings = async (req, res, next) => {
  try {
    const data = await settingsService.getSecuritySettings();
    res.status(200).json({ status: 'success', data: { settings: data } });
  } catch (error) {
    next(error);
  }
};

exports.updateSecuritySettings = async (req, res, next) => {
  try {
    const data = await settingsService.updateSecuritySettings(req.body, req.user.id, req.ip);
    res.status(200).json({ status: 'success', data: { settings: data } });
  } catch (error) {
    next(error);
  }
};

exports.getEmailConfiguration = async (req, res, next) => {
  try {
    const data = await settingsService.getEmailConfiguration();
    res.status(200).json({ status: 'success', data: { configuration: data } });
  } catch (error) {
    next(error);
  }
};

exports.updateEmailConfiguration = async (req, res, next) => {
  try {
    const data = await settingsService.updateEmailConfiguration(req.body, req.user.id, req.ip);
    res.status(200).json({ status: 'success', data: { configuration: data } });
  } catch (error) {
    next(error);
  }
};

exports.getSystemSettingsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const data = await settingsService.getSystemSettingsByCategory(category);
    res.status(200).json({ status: 'success', data: { settings: data } });
  } catch (error) {
    next(error);
  }
};

exports.updateSystemSetting = async (req, res, next) => {
  try {
    const { category } = req.params;
    // Expecting req.body to be an array of setting objects { settingKey: 'X', settingValue: 'Y' }
    if (!Array.isArray(req.body.settings)) return next(new AppError('Must provide a settings array', 400));
    
    const data = await settingsService.updateSystemSetting(category, req.body.settings, req.user.id, req.ip);
    res.status(200).json({ status: 'success', data: { settings: data } });
  } catch (error) {
    next(error);
  }
};
