const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const reportRoutes = require('../src/routes/reportRoutes');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/reports', reportRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: err.status || 'error', message: err.message });
});

let token;
let adminUser;
let reportId;
let departmentId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const { User, Role, Department, Report } = require('../src/models');
  
  const adminRole = await Role.create({ name: 'Admin', description: 'Administrator' });
  const dept = await Department.create({ departmentName: 'IT Operations', departmentCode: 'IT-OPS' });
  departmentId = dept.id;

  adminUser = await User.create({ email: 'admin@test.com', password: 'password', name: 'Admin User', role_id: adminRole.id, departmentId: dept.id });
  
  token = jwt.sign({ id: adminUser.id }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });

  // Create a base report configuration
  const report = await Report.create({
    reportName: 'Users by Department',
    reportCode: 'USR-DEPT-001',
    reportType: 'Detailed',
    module: 'Users',
    createdBy: adminUser.id
  });
  reportId = report.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Reports Engine', () => {

  describe('Report Generation & Dynamic Service', () => {
    it('should list available reports', async () => {
      const res = await request(app)
        .get('/api/reports')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.reports.length).toBe(1);
    });

    it('should generate report data in JSON format dynamically', async () => {
      const res = await request(app)
        .post('/api/reports/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({
          reportId,
          filters: { departmentId }
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.totalRecords).toBe(1);
      expect(res.body.data[0].name).toBe('Admin User');
    });

    it('should log execution history automatically', async () => {
      const res = await request(app)
        .get('/api/reports/history')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.history.length).toBe(1);
      expect(res.body.data.history[0].fileFormat).toBe('JSON');
      expect(res.body.data.history[0].status).toBe('Success');
    });
  });

  describe('File Export Generators', () => {
    it('should export report as CSV string', async () => {
      const res = await request(app)
        .post('/api/reports/export')
        .set('Authorization', `Bearer ${token}`)
        .send({
          reportId,
          format: 'CSV'
        });
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('text/csv');
      // The CSV body should contain standard headers and the Admin User data
      expect(res.text).toContain('Admin User');
    });

    it('should export report as Excel buffer', async () => {
      const res = await request(app)
        .post('/api/reports/export')
        .set('Authorization', `Bearer ${token}`)
        .send({
          reportId,
          format: 'Excel'
        });
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('spreadsheetml.sheet');
    });
  });

  describe('Saved Filters', () => {
    it('should save a filter configuration for a report', async () => {
      const res = await request(app)
        .post('/api/reports/save-filter')
        .set('Authorization', `Bearer ${token}`)
        .send({
          reportId,
          savedFilters: { departmentId, status: 'Active' },
          isDefault: true
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.saved.isDefault).toBe(true);
    });
  });

});
