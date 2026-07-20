const express = require('express');
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes below this middleware
router.use(protect);

// Allow all authenticated users to view users (for Org Chart details)
router.get('/org-chart', userController.getOrgChart);
router.get('/org-stats', userController.getOrgStats);
router.get('/', restrictTo('Super Admin', 'Admin', 'HR Manager', 'Manager'), userController.getAllUsers);
router.get('/:id', userController.getUser);

// Restrict modification to Admins only
router.use(restrictTo('Super Admin', 'Admin', 'HR Manager'));

router.post('/import', userController.importUsers);
router.delete('/bulk', userController.bulkDeleteUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id/status', userController.updateUserStatus);
router.patch('/:id/deactivate', userController.deactivateUser);
router.patch('/:id/role', userController.updateUserRole);
router.patch('/:id/department', userController.updateUserDepartment);
router.patch('/:id/manager', userController.updateUserReportingManager);

module.exports = router;
