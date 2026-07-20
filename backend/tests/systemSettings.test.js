const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const settingsRoutes = require('../src/routes/settingsRoutes');
const { encrypt, decrypt } = require('../src/utils/encryption');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
// We attach user to req manually since authMiddleware is mocked or bypassed if needed, but it's easier to just sign a token and test the real route
app.use('/api/settings', settingsRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: err.status || 'error', message: err.message });
});

let token;
let adminUser;
let testDepartment;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const { User, Role, Department } = require('../src/models');
  
  const adminRole = await Role.create({ name: 'Super Admin', description: 'Administrator' });
  testDepartment = await Department.create({ departmentName: 'IT Operations', departmentCode: 'IT-OPS' });

  adminUser = await User.create({ email: 'admin@test.com', password: 'password', name: 'Admin User', role_id: adminRole.id, departmentId: testDepartment.id });
  
  token = jwt.sign({ id: adminUser.id }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('System Settings Engine', () => {

  describe('Encryption Utilities', () => {
    it('should correctly encrypt and decrypt strings', () => {
      const originalSecret = 'mySuperSecretPassword123!';
      const encrypted = encrypt(originalSecret);
      
      expect(encrypted).not.toBe(originalSecret);
      expect(encrypted).toContain(':'); // Should have IV and payload separated by colon
      
      const decrypted = decrypt(encrypted);
      expect(decrypted).toBe(originalSecret);
    });
  });

  describe('Email Configurations (Encryption & Audit integration)', () => {
    it('should create email config and encrypt the password in the DB', async () => {
      const res = await request(app)
        .put('/api/settings/email')
        .set('Authorization', `Bearer ${token}`)
        .send({
          smtpHost: 'smtp.test.com',
          smtpPassword: 'secretpassword'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.configuration.smtpPassword).toBe('secretpassword'); // Response should be decrypted

      // Check raw DB to ensure it was encrypted
      const { EmailConfiguration } = require('../src/models');
      const rawDbEntry = await EmailConfiguration.findOne();
      expect(rawDbEntry.smtpPassword).not.toBe('secretpassword');
      expect(rawDbEntry.smtpPassword).toContain(':');
    });

    it('should have automatically created an Audit Log and a Version History snapshot without plain text password', async () => {
      const { AuditLog, VersionHistory } = require('../src/models');
      
      const audit = await AuditLog.findOne({ where: { entityType: 'EmailConfiguration' } });
      expect(audit).toBeDefined();
      expect(audit.newValue.smtpPassword).toBe('***ENCRYPTED***');

      const version = await VersionHistory.findOne({ where: { entityType: 'EmailConfiguration' } });
      expect(version).toBeDefined();
      expect(version.versionNumber).toBe(1);
      expect(version.snapshot.smtpPassword).toBe('***ENCRYPTED***');
    });
  });

  describe('Organization Profile & Caching', () => {
    it('should create and retrieve Organization Profile', async () => {
      const res = await request(app)
        .put('/api/settings/organization')
        .set('Authorization', `Bearer ${token}`)
        .send({ organizationName: 'Global Corp' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.profile.organizationName).toBe('Global Corp');

      // Test GET (which should hit the cache internally)
      const resGet = await request(app)
        .get('/api/settings/organization')
        .set('Authorization', `Bearer ${token}`);
      
      expect(resGet.statusCode).toBe(200);
      expect(resGet.body.data.profile.organizationName).toBe('Global Corp');
    });
  });

  describe('Generic System Settings', () => {
    it('should create and encrypt specific settings in a category', async () => {
      // First manually seed the DB with an empty setting
      const { SystemSetting } = require('../src/models');
      await SystemSetting.create({
        category: 'AI',
        settingKey: 'OPENAI_API_KEY',
        settingValue: '',
        isEncrypted: true
      });

      const res = await request(app)
        .put('/api/settings/AI')
        .set('Authorization', `Bearer ${token}`)
        .send({
          settings: [
            { settingKey: 'OPENAI_API_KEY', settingValue: 'sk-123456' }
          ]
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.settings[0].settingValue).toBe('sk-123456');

      const rawDbEntry = await SystemSetting.findOne({ where: { settingKey: 'OPENAI_API_KEY' } });
      expect(rawDbEntry.settingValue).not.toBe('sk-123456');
    });
  });

});
