const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const analyticsRoutes = require('../src/routes/analyticsRoutes');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/analytics', analyticsRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: err.status || 'error', message: err.message });
});

let token;
let adminUser;

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

describe('Analytics Engine', () => {

  describe('KPIs and Aggregations', () => {
    it('should fetch overview KPIs', async () => {
      const res = await request(app)
        .get('/api/analytics/overview')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.totalUsers).toBe(1);
      expect(res.body.data.totalDepartments).toBe(1);
    });

    it('should fetch user analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/users')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.total).toBe(1);
      expect(res.body.data.rolesDistribution.length).toBeGreaterThan(0);
    });

    it('should fetch department analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/departments')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.total).toBe(1);
    });

    it('should fetch trend analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/trends')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.monthlyUserGrowth).toBeDefined();
    });
  });

  describe('Caching Mechanism', () => {
    it('should have populated the cache after first hit', async () => {
      const { AnalyticsCache } = require('../src/models');
      const cache = await AnalyticsCache.findOne({ where: { cacheKey: 'overview_kpis' } });
      expect(cache).not.toBeNull();
      expect(cache.data.totalUsers).toBe(1);
    });

    it('should refresh and clear the cache', async () => {
      const res = await request(app)
        .post('/api/analytics/refresh')
        .set('Authorization', `Bearer ${token}`)
        .send({ keys: ['overview_kpis'] });
      
      expect(res.statusCode).toBe(200);

      const { AnalyticsCache } = require('../src/models');
      const cache = await AnalyticsCache.findOne({ where: { cacheKey: 'overview_kpis' } });
      expect(cache).toBeNull(); // Should be deleted
    });
  });

});
