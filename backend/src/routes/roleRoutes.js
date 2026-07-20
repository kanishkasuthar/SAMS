const express = require('express');
const roleController = require('../controllers/roleController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

// Everyone can view roles and permissions (or just authenticated users)
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRole);
router.get('/:id/permissions', roleController.getRolePermissions);
router.get('/sys/permissions', roleController.getAllPermissions);

// Only Admins can modify roles and permissions
router.use(restrictTo('Super Admin', 'Admin'));

// Roles
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.put('/:id/permissions', roleController.updateRolePermissions);

// Permissions
router.post('/sys/permissions', roleController.createPermission);
router.put('/sys/permissions/:id', roleController.updatePermission);
router.delete('/sys/permissions/:id', roleController.deletePermission);

module.exports = router;
