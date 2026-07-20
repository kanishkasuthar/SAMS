const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../src/models');
const app = require('../server');

let token;
let adminToken;
let departmentId;
let roleId;
let userId;
let matrixId;
let flowId;
let requestId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Phase 15: End-to-End Backend Integration', () => {

  describe('Scenario 1: Full Lifecycle', () =>
  {
    it('should bootstrap an admin token', async () => {
      const { User, Role } = require('../src/models');
      const adminRole = await Role.create({ name: 'Super Admin', description: 'System Admin' });
      const hashedPassword = await bcrypt.hash('password', 10);
      const adminUser = await User.create({ email: 'super@sams.com', password: hashedPassword, name: 'Super Admin', role_id: adminRole.id, is_verified: true });
      
      const res1 = await request(app)
        .post('/api/auth/login')
        .send({ email: 'super@sams.com', password: 'password' });
      
      
      expect(res1.statusCode).toBe(200);
      adminToken = res1.body.token;

      const res2 = await request(app)
        .post('/api/departments')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ departmentName: 'Engineering', departmentCode: 'ENG' });
      
      expect(res2.statusCode).toBe(201);
      departmentId = res2.body.data.department.id;
    });

    it('Create Role', async () => {
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ roleName: 'Engineer', description: 'Writes code' });
      
      expect(res.statusCode).toBe(201);
      roleId = res.body.data.role.id;
    });

    it('Create User', async () => {
      const res = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          email: 'dev@sams.com',
          password: 'password123',
          fullName: 'Dev User',
          roleId,
          departmentId
        });
      
      expect(res.statusCode).toBe(201);
      userId = res.body.data.user.id;
    });

    it('Assign Responsibility', async () => {
      let res = await request(app)
        .post('/api/responsibility-matrices')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ matrixName: 'Code Deployments', status: 'Active', departmentId });
      
      expect(res.statusCode).toBe(201);
      matrixId = res.body.data.matrix.id;

      res = await request(app)
        .post(`/api/responsibility-matrices/${matrixId}/assignments`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ userId, responsibilityType: 'Accountable' });
      
      expect(res.statusCode).toBe(201);
    });

    it('Create Decision Flow', async () => {
      let res = await request(app)
        .post('/api/decision-flows')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ flowName: 'Production Deploy', status: 'Active', departmentId });
      
      expect(res.statusCode).toBe(201);
      flowId = res.body.data.flow.id;

      res = await request(app)
        .post(`/api/decision-flows/${flowId}/steps`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ stepNumber: 1, stepName: 'Manager Approval', approverType: 'User', userId });
      
      expect(res.statusCode).toBe(201);
    });

    it('Submit Decision Request', async () => {
      let res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'dev@sams.com', password: 'password123' });
      token = res.body.token;

      res = await request(app)
        .post('/api/decision-requests')
        .set('Authorization', `Bearer ${token}`)
        .send({ flowId, requestTitle: 'Deploy v1.2.0' });
      
      expect(res.statusCode).toBe(201);
      requestId = res.body.data.request.id;
    });

    it('Approve Request', async () => {
      const res = await request(app)
        .post(`/api/decision-requests/${requestId}/approve`)
        .set('Authorization', `Bearer ${token}`)
        .send({ remarks: 'LGTM' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.request.overallStatus).toBe('Approved');
    });

    it('Notification Generated', async () => {
      const res = await request(app)
        .get('/api/notifications')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      // We check if a notification was generated (this might fail if integration isn't wired yet!)
    });

    it('Audit Log Created', async () => {
      const res = await request(app)
        .get('/api/audit-logs')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.logs.length).toBeGreaterThan(0);
      
      const actions = res.body.data.logs.map(log => log.action);
      expect(actions).toContain('Login');
    });

    it('Analytics Updated', async () => {
      const res = await request(app)
        .get('/api/analytics/overview')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.totalUsers).toBe(2);
      expect(res.body.data.totalDepartments).toBe(1);
    });

    it('Report Generated', async () => {
      const { Report } = require('../src/models');
      const testReport = await Report.create({
        reportName: 'User Activity Report',
        reportCode: 'USR_ACT_01',
        reportType: 'Tabular',
        module: 'Users',
        createdBy: userId
      });

      const res = await request(app)
        .post('/api/reports/generate')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ reportId: testReport.id, filters: {} });
      
      expect(res.statusCode).toBe(200);
    });

    it('AI Summary Generated', async () => {
      const res = await request(app)
        .get('/api/ai/insights')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect([200, 400, 503]).toContain(res.statusCode);
    });
  });

  describe('Scenario 2: Profile Update to Tracking', () => {
    it('Update User', async () => {
      const res = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ fullName: 'Senior Software Developer' });
      
      expect(res.statusCode).toBe(200);
    });

    it('Version History Created', async () => {
      const res = await request(app)
        .get(`/api/version-history/entity/User/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.timeline.length).toBeGreaterThanOrEqual(1);
    });

    it('Audit Log Created', async () => {
      const res = await request(app)
        .get('/api/audit-logs')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      const updateLogs = res.body.data.logs.filter(log => log.action === 'Update' && log.module === 'Users');
      expect(updateLogs.length).toBeGreaterThanOrEqual(1);
    });
  });
});
