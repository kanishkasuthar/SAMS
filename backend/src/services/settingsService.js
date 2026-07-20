const { SystemSetting, OrganizationProfile, SecuritySetting, EmailConfiguration } = require('../models');
const { encrypt, decrypt } = require('../utils/encryption');
const auditService = require('./auditService');
const versionService = require('./versionService');
const AppError = require('../utils/AppError');

// Simple in-memory cache for high-read configurations
let configCache = {
  organization: null,
  security: null,
  email: null,
  system: {}
};

/**
 * Helper to log audit and version history automatically for settings
 */
const trackConfigChange = async (moduleName, entityType, entityId, newPayload, userId, ipAddress, action = 'Update') => {
  // We manually capture versions for settings instead of relying completely on route-level middleware 
  // because we need the precise decrypted JSON snapshot for version history.
  await versionService.createVersion(
    moduleName,
    entityType,
    entityId,
    newPayload,
    userId,
    `Configuration ${action}`,
    action
  );

  await auditService.logAction({
    userId,
    action: `Configuration ${action}`,
    module: moduleName,
    entityType,
    entityId,
    newValue: newPayload,
    ipAddress,
    status: 'Success',
    remarks: 'Auto-logged by settings service'
  });
};

exports.getOrganizationProfile = async () => {
  if (configCache.organization) return configCache.organization;
  const profile = await OrganizationProfile.findOne();
  if (!profile) return null;
  configCache.organization = profile.get({ plain: true });
  return configCache.organization;
};

exports.updateOrganizationProfile = async (payload, userId, ipAddress) => {
  let profile = await OrganizationProfile.findOne();
  let action = 'Update';
  if (!profile) {
    profile = await OrganizationProfile.create(payload);
    action = 'Create';
  } else {
    await profile.update(payload);
  }

  const plainProfile = profile.get({ plain: true });
  configCache.organization = plainProfile; // Refresh Cache

  await trackConfigChange('System Settings', 'OrganizationProfile', plainProfile.id, plainProfile, userId, ipAddress, action);
  return plainProfile;
};

exports.getSecuritySettings = async () => {
  if (configCache.security) return configCache.security;
  const sec = await SecuritySetting.findOne();
  if (!sec) return null;
  configCache.security = sec.get({ plain: true });
  return configCache.security;
};

exports.updateSecuritySettings = async (payload, userId, ipAddress) => {
  let sec = await SecuritySetting.findOne();
  let action = 'Update';
  if (!sec) {
    sec = await SecuritySetting.create(payload);
    action = 'Create';
  } else {
    await sec.update(payload);
  }

  const plainSec = sec.get({ plain: true });
  configCache.security = plainSec;

  await trackConfigChange('System Settings', 'SecuritySetting', plainSec.id, plainSec, userId, ipAddress, action);
  return plainSec;
};

exports.getEmailConfiguration = async () => {
  if (configCache.email) return configCache.email;
  const config = await EmailConfiguration.findOne();
  if (!config) return null;
  const plainConfig = config.get({ plain: true });
  // Decrypt password before sending back
  if (plainConfig.smtpPassword) {
    plainConfig.smtpPassword = decrypt(plainConfig.smtpPassword);
  }
  configCache.email = plainConfig;
  return configCache.email;
};

exports.updateEmailConfiguration = async (payload, userId, ipAddress) => {
  let config = await EmailConfiguration.findOne();
  let action = 'Update';
  
  const payloadToSave = { ...payload };
  if (payloadToSave.smtpPassword) {
    payloadToSave.smtpPassword = encrypt(payloadToSave.smtpPassword);
  }

  if (!config) {
    config = await EmailConfiguration.create(payloadToSave);
    action = 'Create';
  } else {
    await config.update(payloadToSave);
  }

  const decryptedPayload = { ...config.get({ plain: true }) };
  if (decryptedPayload.smtpPassword) {
    decryptedPayload.smtpPassword = decrypt(decryptedPayload.smtpPassword); // Cache stores decrypted for use
  }
  configCache.email = decryptedPayload;

  // Mask password for Audit / Version History snapshot so it's not stored in plain text in logs
  const safeSnapshot = { ...decryptedPayload };
  if (safeSnapshot.smtpPassword) safeSnapshot.smtpPassword = '***ENCRYPTED***';

  await trackConfigChange('System Settings', 'EmailConfiguration', safeSnapshot.id, safeSnapshot, userId, ipAddress, action);
  return decryptedPayload;
};

exports.getSystemSettingsByCategory = async (category) => {
  if (configCache.system[category]) return configCache.system[category];

  const settings = await SystemSetting.findAll({ where: { category } });
  const formatted = settings.map(s => {
    const plain = s.get({ plain: true });
    if (plain.isEncrypted && plain.settingValue) {
      plain.settingValue = decrypt(plain.settingValue);
    }
    return plain;
  });

  configCache.system[category] = formatted;
  return formatted;
};

exports.updateSystemSetting = async (category, settingsArray, userId, ipAddress) => {
  const updatedSettings = [];
  
  for (const item of settingsArray) {
    const setting = await SystemSetting.findOne({ where: { category, settingKey: item.settingKey } });
    if (!setting) continue; // Skip non-existent

    let finalValue = item.settingValue;
    if (setting.isEncrypted && finalValue) {
      finalValue = encrypt(finalValue);
    }

    await setting.update({ settingValue: finalValue, updatedBy: userId });
    
    const plain = setting.get({ plain: true });
    
    // Decrypt for cache
    if (plain.isEncrypted && plain.settingValue) {
      plain.settingValue = decrypt(plain.settingValue);
    }
    updatedSettings.push(plain);

    // Snapshot
    const safeSnapshot = { ...plain };
    if (safeSnapshot.isEncrypted) safeSnapshot.settingValue = '***ENCRYPTED***';

    await trackConfigChange('System Settings', 'SystemSetting', safeSnapshot.id, safeSnapshot, userId, ipAddress, 'Update');
  }

  configCache.system[category] = updatedSettings;
  return updatedSettings;
};
