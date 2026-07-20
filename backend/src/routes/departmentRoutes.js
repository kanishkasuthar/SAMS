const express = require('express');
const departmentController = require('../controllers/departmentController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

// Tree and Stats (Must be placed before /:id)
router.get('/tree', departmentController.getDepartmentTree);
router.get('/statistics', departmentController.getDepartmentStatistics);

// Standard CRUD
router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartment);

// Mutative endpoints restricted to Admins
router.use(restrictTo('Super Admin', 'Admin'));

router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
