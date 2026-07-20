const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const matrixRoutes = require('../src/routes/matrixRoutes');
const specializedAssignmentRoutes = require('../src/routes/specializedAssignmentRoutes');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/responsibility-matrices', matrixRoutes);
app.use('/api/responsibility-assignments', specializedAssignmentRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: err.status || 'error', message: err.message });
});

let token;
let adminUser;
let regularUser;
let matrixId;
let assignmentId;

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

describe('Responsibility Matrix Engine', () => {

  describe('Matrix CRUD', () => {
    it('should create a matrix', async () => {
      const res = await request(app)
        .post('/api/responsibility-matrices')
        .set('Authorization', `Bearer ${token}`)
        .send({ matrixName: 'IT Support Matrix', status: 'Active' });
      if (res.statusCode !== 201) console.log(res.body); expect(res.statusCode).toBe(201);
      expect(res.body.data.matrix.matrixName).toBe('IT Support Matrix');
      matrixId = res.body.data.matrix.id;
    });

    it('should update a matrix', async () => {
      const res = await request(app)
        .put(`/api/responsibility-matrices/${matrixId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ matrixName: 'IT Support Matrix Updated', description: 'Updated IT description' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.matrix.description).toBe('Updated IT description');
    });
  });

  describe('Assignments CRUD & History', () => {
    it('should create an assignment', async () => {
      const res = await request(app)
        .post(`/api/responsibility-matrices/${matrixId}/assignments`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: adminUser.id,
          responsibilityType: 'Accountable'
        });
      if (res.statusCode !== 201) console.log(res.body); expect(res.statusCode).toBe(201);
      expect(res.body.data.assignment.responsibilityType).toBe('Accountable');
      assignmentId = res.body.data.assignment.id;
    });

    it('should prevent identical active assignments for the same user in same matrix', async () => {
      const res = await request(app)
        .post(`/api/responsibility-matrices/${matrixId}/assignments`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: adminUser.id,
          responsibilityType: 'Accountable'
        });
      expect(res.statusCode).toBe(400); // Duplicate prevention rule
    });

    it('should fetch user responsibilities', async () => {
      const res = await request(app)
        .get(`/api/responsibility-assignments/user/${adminUser.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.assignments.length).toBe(1);
    });

    it('should log history when created', async () => {
      const res = await request(app)
        .get(`/api/responsibility-assignments/${assignmentId}/history`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.history.length).toBe(1);
      expect(res.body.data.history[0].action).toBe('Created');
    });
  });

  describe('Specialized Endpoints (Transfer & Bulk)', () => {
    it('should transfer responsibility to another user', async () => {
      const res = await request(app)
        .post('/api/responsibility-assignments/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send({
          fromUserId: adminUser.id,
          toUserId: regularUser.id,
          matrixId: matrixId
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.transferred.length).toBe(1);
      expect(res.body.data.transferred[0].userId).toBe(regularUser.id);
    });

    it('should verify transfer via history log', async () => {
      const res = await request(app)
        .get(`/api/responsibility-assignments/${assignmentId}/history`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.history.length).toBe(2);
      expect(res.body.data.history[0].action).toBe('Transferred'); // First is most recent (DESC)
    });

    it('should bulk assign responsibilities', async () => {
      const res = await request(app)
        .post('/api/responsibility-assignments/bulk-assign')
        .set('Authorization', `Bearer ${token}`)
        .send({
          matrixId: matrixId,
          assignments: [
            { userId: adminUser.id, responsibilityType: 'Consulted' },
            { userId: regularUser.id, responsibilityType: 'Informed' }
          ]
        });
      if (res.statusCode !== 201) console.log(res.body); expect(res.statusCode).toBe(201);
      expect(res.body.data.assignments.length).toBe(2);
    });
  });

});
