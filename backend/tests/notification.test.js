const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const notificationRoutes = require('../src/routes/notificationRoutes');
const notificationPreferenceRoutes = require('../src/routes/notificationPreferenceRoutes');
const notificationTemplateRoutes = require('../src/routes/notificationTemplateRoutes');
const notificationService = require('../src/services/notificationService');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/notifications', notificationRoutes);
app.use('/api/notification-preferences', notificationPreferenceRoutes);
app.use('/api/notification-templates', notificationTemplateRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: err.status || 'error', message: err.message });
});

let token;
let adminUser;
let regularUser;
let notificationId;

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

describe('Notification Engine', () => {

  describe('Service Layer (Internal Triggers)', () => {
    it('should create a notification via service layer successfully', async () => {
      const notification = await notificationService.triggerNotification({
        recipientId: adminUser.id,
        type: 'System Announcement',
        title: 'Welcome!',
        message: 'Welcome to SAMS',
      });
      
      expect(notification).toBeDefined();
      expect(notification.title).toBe('Welcome!');
      expect(notification.isRead).toBe(false);
      notificationId = notification.id;
    });

    it('should respect user preferences and skip notification if disabled', async () => {
      // First manually update the preference
      const { NotificationPreference } = require('../src/models');
      let prefs = await NotificationPreference.findOne({ where: { userId: adminUser.id } });
      await prefs.update({ workflowEnabled: false });

      // Trigger should return null
      const skipped = await notificationService.triggerNotification({
        recipientId: adminUser.id,
        type: 'Workflow Approval',
        title: 'Skipped',
        message: 'This should not send',
      });
      
      expect(skipped).toBeNull();
    });
  });

  describe('REST APIs: Notifications', () => {
    it('should list unread notifications and filter properly', async () => {
      const res = await request(app)
        .get('/api/notifications?isRead=false')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.notifications.length).toBeGreaterThan(0);
    });

    it('should fetch unread count', async () => {
      const res = await request(app)
        .get('/api/notifications/unread-count')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.count).toBeGreaterThan(0);
    });

    it('should mark a specific notification as read', async () => {
      const res = await request(app)
        .patch(`/api/notifications/${notificationId}/read`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.notification.isRead).toBe(true);
      expect(res.body.data.notification.readAt).not.toBeNull();
    });

    it('should mark all notifications as read', async () => {
      const res = await request(app)
        .patch('/api/notifications/read-all')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);

      // Verify unread count is 0
      const countRes = await request(app)
        .get('/api/notifications/unread-count')
        .set('Authorization', `Bearer ${token}`);
      expect(countRes.body.data.count).toBe(0);
    });

    it('should soft delete a notification', async () => {
      const res = await request(app)
        .delete(`/api/notifications/${notificationId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(204);

      // Verify it's gone
      const getRes = await request(app)
        .get(`/api/notifications/${notificationId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(getRes.statusCode).toBe(404);
    });
  });

  describe('REST APIs: Templates & Preferences', () => {
    it('should fetch or create preferences', async () => {
      const res = await request(app)
        .get('/api/notification-preferences')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.preference).toBeDefined();
    });

    it('should create a notification template (Admin)', async () => {
      const res = await request(app)
        .post('/api/notification-templates')
        .set('Authorization', `Bearer ${token}`)
        .send({
          templateName: 'WelcomeTemplate',
          eventType: 'USER_CREATED',
          subject: 'Welcome to SAMS',
          messageTemplate: 'Hi {{name}}, welcome to the platform.'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.template.templateName).toBe('WelcomeTemplate');
    });
  });

});
