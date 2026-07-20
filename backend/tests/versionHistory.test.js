const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const versionRoutes = require('../src/routes/versionRoutes');
const versionService = require('../src/services/versionService');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/version-history', versionRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: err.status || 'error', message: err.message });
});

let token;
let adminUser;
let testDepartment;
let versionId1;
let versionId2;

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

describe('Version History Engine', () => {

  describe('Service Layer: Create and Compare', () => {
    it('should create version 1 automatically (auto-increment)', async () => {
      const snapshot = testDepartment.get({ plain: true });
      const version = await versionService.createVersion('Departments', 'Department', testDepartment.id, snapshot, adminUser.id, 'Initial Creation');
      
      expect(version.versionNumber).toBe(1);
      versionId1 = version.id;
    });

    it('should create version 2 and auto-increment properly', async () => {
      // Simulate an update
      await testDepartment.update({ departmentName: 'Global IT Operations' });
      const snapshot = testDepartment.get({ plain: true });

      const version = await versionService.createVersion('Departments', 'Department', testDepartment.id, snapshot, adminUser.id, 'Renamed Department');
      
      expect(version.versionNumber).toBe(2);
      expect(version.previousVersionId).toBe(versionId1);
      versionId2 = version.id;
    });

    it('should deep compare two versions and show diffs', async () => {
      const comparison = await versionService.compareVersions(versionId1, versionId2);
      
      expect(comparison.version1.versionNumber).toBe(1);
      expect(comparison.version2.versionNumber).toBe(2);
      expect(comparison.diff.changed.departmentName.oldValue).toBe('IT Operations');
      expect(comparison.diff.changed.departmentName.newValue).toBe('Global IT Operations');
    });
  });

  describe('Service Layer: Restore', () => {
    it('should restore an entity to a previous version and log a new version', async () => {
      const restoreLog = await versionService.restoreVersion(versionId1, adminUser.id, 'Reverting name change');
      
      // The new version should be 3
      expect(restoreLog.versionNumber).toBe(3);
      expect(restoreLog.changeType).toBe('Restore');

      // The actual model in the DB should be reverted back to V1 state
      const { Department } = require('../src/models');
      const dept = await Department.findByPk(testDepartment.id);
      expect(dept.departmentName).toBe('IT Operations'); // Reverted!
    });
  });

  describe('REST APIs', () => {
    it('should fetch the complete timeline for an entity', async () => {
      const res = await request(app)
        .get(`/api/version-history/entity/Department/${testDepartment.id}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.results).toBe(3); // V1, V2, and V3 (Restore)
      expect(res.body.data.timeline[0].versionNumber).toBe(3); // Ordered DESC
    });

    it('should compare versions via API', async () => {
      const res = await request(app)
        .get(`/api/version-history/compare?v1=${versionId1}&v2=${versionId2}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.comparison.diff.changed.departmentName).toBeDefined();
    });

    it('should trigger a restore via API', async () => {
      const res = await request(app)
        .post(`/api/version-history/restore/${versionId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ restoreReason: 'Changed my mind again' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.restoredVersionLog.versionNumber).toBe(4);
    });

    it('should prevent deleting a version history record', async () => {
      const { VersionHistory } = require('../src/models');
      const v = await VersionHistory.findByPk(versionId1);
      await expect(v.destroy()).rejects.toThrow('immutable and cannot be deleted');
    });
  });

});
