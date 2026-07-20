const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const auditRoutes = require('../src/routes/auditRoutes');
const auditService = require('../src/services/auditService');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/audit-logs', auditRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: err.status || 'error', message: err.message });
});

let token;
let adminUser;
let logId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const { User, Role, Department } = require('../src/models');
  
  const adminRole = await Role.create({ name: 'Super Admin', description: 'Administrator' });
  const dept = await Department.create({ departmentName: 'IT Operations', departmentCode: 'IT-OPS' });

  adminUser = await User.create({ email: 'admin@test.com', password: 'password', name: 'Admin User', role_id: adminRole.id, departmentId: dept.id });
  
  token = jwt.sign({ id: adminUser.id }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Audit Logs Engine', () => {

  describe('Core Features (Immutability & Manual Service)', () => {
    it('should manually log an action via service', async () => {
      const log = await auditService.logAction({
        userId: adminUser.id,
        action: 'Login',
        module: 'Authentication',
        ipAddress: '127.0.0.1'
      });
      expect(log).toBeDefined();
      expect(log.action).toBe('Login');
      logId = log.id;
    });

    it('should throw error when attempting to update an audit log', async () => {
      const { AuditLog } = require('../src/models');
      const log = await AuditLog.findByPk(logId);
      
      await expect(log.update({ action: 'Hacked' })).rejects.toThrow('Audit logs are immutable and cannot be updated');
    });

    it('should throw error when attempting to delete an audit log', async () => {
      const { AuditLog } = require('../src/models');
      const log = await AuditLog.findByPk(logId);
      
      await expect(log.destroy()).rejects.toThrow('Audit logs are immutable and cannot be deleted');
    });
  });

  describe('REST APIs & Filtering', () => {
    it('should fetch all logs with pagination', async () => {
      const res = await request(app)
        .get('/api/audit-logs')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.logs.length).toBeGreaterThan(0);
      expect(res.body.totalRecords).toBeGreaterThan(0);
    });

    it('should fetch a single log by ID', async () => {
      const res = await request(app)
        .get(`/api/audit-logs/${logId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.log.action).toBe('Login');
    });

    it('should export audit logs to CSV via reportService', async () => {
      const res = await request(app)
        .post('/api/audit-logs/export')
        .set('Authorization', `Bearer ${token}`)
        .send({ format: 'CSV' });
      
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('text/csv');
      expect(res.text).toContain('Login'); // The CSV should contain the logged action
    });
  });

});
