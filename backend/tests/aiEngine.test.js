const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const aiRoutes = require('../src/routes/aiRoutes');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/ai', aiRoutes);

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

describe('AI Intelligence Engine', () => {

  describe('Prompt Builder & Mock Provider Abstraction', () => {
    it('should generate a summary utilizing the Mock Provider', async () => {
      const res = await request(app)
        .post('/api/ai/generate-summary')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.summary).toContain('Mock Summary'); // Verifies the MockProvider intercepted it
      expect(res.body.data.metadata.provider).toBe('MockProvider');
    });

    it('should generate a prediction', async () => {
      const res = await request(app)
        .get('/api/ai/predictions')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.prediction).toContain('Mock Prediction');
    });
  });

  describe('Natural Language Chat', () => {
    it('should process a chat query and save to AIConversation', async () => {
      const res = await request(app)
        .post('/api/ai/query')
        .set('Authorization', `Bearer ${token}`)
        .send({ query: 'Summarize the delayed workflows' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.response).toContain('Mock Summary');
      expect(res.body.data.conversationId).toBeDefined();

      const { AIConversation } = require('../src/models');
      const conv = await AIConversation.findByPk(res.body.data.conversationId);
      expect(conv.prompt).toBe('Summarize the delayed workflows');
      expect(conv.tokensUsed).toBeGreaterThan(0);
    });
  });

  describe('Massive Report Generation (Orchestration)', () => {
    it('should orchestrate generating Insights and Recommendations to DB', async () => {
      const res = await request(app)
        .post('/api/ai/generate-report')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.insightsGenerated).toBeGreaterThan(0);
      expect(res.body.data.recommendationsGenerated).toBeGreaterThan(0);

      // Verify they are saved in DB
      const resGet = await request(app)
        .get('/api/ai/overview')
        .set('Authorization', `Bearer ${token}`);
      
      expect(resGet.body.data.insights.length).toBeGreaterThan(0);
      expect(resGet.body.data.recommendations.length).toBeGreaterThan(0);
      
      // Verify parsing of the structured JSON from MockProvider
      expect(resGet.body.data.recommendations[0].recommendationType).toBe('Optimization');
    });
  });

});
