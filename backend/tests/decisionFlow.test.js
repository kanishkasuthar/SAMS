const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const flowRoutes = require('../src/routes/decisionFlowRoutes');
const requestRoutes = require('../src/routes/decisionRequestRoutes');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/decision-flows', flowRoutes);
app.use('/api/decision-requests', requestRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message
  });
});

let token;
let adminUser;
let regularUser;
let createdFlowId;
let createdStepId;
let createdRequestId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const { User, Role } = require('../src/models');
  
  const adminRole = await Role.create({ name: 'Admin', description: 'Administrator' });
  const userRole = await Role.create({ name: 'User', description: 'Standard User' });
  
  adminUser = await User.create({ email: 'admin@test.com', password: 'password', name: 'Admin User', role_id: adminRole.id });
  regularUser = await User.create({ email: 'user@test.com', password: 'password', name: 'Regular User', role_id: userRole.id });
  
  token = jwt.sign({ id: adminUser.id }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Decision Flow Engine', () => {
  
  // ============================================
  // FLOW TESTS
  // ============================================
  describe('Flow CRUD', () => {
    it('should create a flow', async () => {
      const res = await request(app)
        .post('/api/decision-flows')
        .set('Authorization', `Bearer ${token}`)
        .send({ flowName: 'Capital Expenditure', status: 'Active' });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.flow.flowName).toBe('Capital Expenditure');
      createdFlowId = res.body.data.flow.id;
    });

    it('should update a flow', async () => {
      const res = await request(app)
        .put(`/api/decision-flows/${createdFlowId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ flowName: 'CapEx Updated' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.flow.flowName).toBe('CapEx Updated');
    });
  });

  // ============================================
  // STEP TESTS
  // ============================================
  describe('Step CRUD', () => {
    it('should create a step', async () => {
      const res = await request(app)
        .post(`/api/decision-flows/${createdFlowId}/steps`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          stepNumber: 1,
          stepName: 'Initial Approval',
          approverType: 'User',
          userId: adminUser.id // Assigned to admin to test approval later
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.step.stepName).toBe('Initial Approval');
      createdStepId = res.body.data.step.id;
    });

    it('should create a second step', async () => {
      await request(app)
        .post(`/api/decision-flows/${createdFlowId}/steps`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          stepNumber: 2,
          stepName: 'Final Approval',
          approverType: 'User',
          userId: regularUser.id
        });
    });
  });

  // ============================================
  // REQUEST TESTS (TRANSACTIONS & BUSINESS LOGIC)
  // ============================================
  describe('Decision Requests', () => {
    it('should initiate a new request', async () => {
      const res = await request(app)
        .post('/api/decision-requests')
        .set('Authorization', `Bearer ${token}`)
        .send({
          flowId: createdFlowId,
          requestTitle: 'New Laptop',
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.request.currentStep).toBe(1);
      expect(res.body.data.request.currentApprover).toBe(adminUser.id);
      expect(res.body.data.request.overallStatus).toBe('Pending');
      createdRequestId = res.body.data.request.id;
    });

    it('should approve step 1 and advance to step 2', async () => {
      const res = await request(app)
        .post(`/api/decision-requests/${createdRequestId}/approve`)
        .set('Authorization', `Bearer ${token}`)
        .send({ remarks: 'Looks good' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.request.overallStatus).toBe('Pending');
      expect(res.body.data.request.currentStep).toBe(2);
      expect(res.body.data.request.currentApprover).toBe(regularUser.id); // Assigned to next user
    });

    it('should approve step 2 and complete the flow', async () => {
      const res = await request(app)
        .post(`/api/decision-requests/${createdRequestId}/approve`)
        .set('Authorization', `Bearer ${token}`)
        .send({ remarks: 'Final approval granted' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.request.overallStatus).toBe('Approved'); // Flow complete
      expect(res.body.data.request.currentApprover).toBeNull();
    });

    it('should fetch history and verify audit trail', async () => {
      const res = await request(app)
        .get(`/api/decision-requests/${createdRequestId}/history`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.history.length).toBe(3); // Created, Step 1, Step 2
      expect(res.body.data.history[0].action).toBe('Created');
      expect(res.body.data.history[1].action).toBe('Approved');
      expect(res.body.data.history[2].action).toBe('Approved');
    });
  });

});
