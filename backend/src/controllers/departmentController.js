const Department = require('../models/Department');
const User = require('../models/User');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');
const { logAudit } = require('../utils/auditLogger');

// -----------------------------------------
// Helper for Tree Building
// -----------------------------------------
function buildHierarchyTree(departments, parentId = null) {
  const node = [];
  for (const dept of departments) {
    if (dept.parentDepartmentId === parentId) {
      const children = buildHierarchyTree(departments, dept.id);
      node.push({
        ...dept.toJSON(),
        children: children.length ? children : []
      });
    }
  }
  return node;
}

// -----------------------------------------
// CRUD Operations
// -----------------------------------------

exports.getAllDepartments = async (req, res, next) => {
  try {
    const { search = '' } = req.query;

    const whereClause = search
      ? { departmentName: { [Op.like]: `%${search}%` } }
      : {};

    const departments = await Department.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'DepartmentHead', attributes: ['id', ['full_name', 'fullName'], 'email'] },
        { model: Department, as: 'ParentDepartment', attributes: ['id', 'departmentName'] }
      ],
      order: [['departmentName', 'ASC']]
    });

    res.status(200).json({
      status: 'success',
      results: departments.length,
      data: { departments }
    });
  } catch (err) {
    next(err);
  }
};

exports.getDepartmentTree = async (req, res, next) => {
  try {
    const departments = await Department.findAll({
      include: [
        { model: User, as: 'DepartmentHead', attributes: ['id', 'name'] }
      ],
      order: [['departmentName', 'ASC']]
    });

    const tree = buildHierarchyTree(departments, null);

    res.status(200).json({
      status: 'success',
      data: { tree }
    });
  } catch (err) {
    next(err);
  }
};

exports.getDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByPk(req.params.id, {
      include: [
        { model: User, as: 'DepartmentHead', attributes: ['id', 'name', 'email'] },
        { model: Department, as: 'ParentDepartment', attributes: ['id', 'departmentName'] },
        { model: Department, as: 'SubDepartments', attributes: ['id', 'departmentName'] }
      ]
    });

    if (!department) {
      return next(new AppError('No department found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { department }
    });
  } catch (err) {
    next(err);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const { departmentName, departmentCode, description, parentDepartmentId, departmentHeadId, roleId, budget, color, icon } = req.body;

    if (parentDepartmentId) {
      const parent = await Department.findByPk(parentDepartmentId);
      if (!parent) return next(new AppError('Parent department not found', 404));
    }

    const department = await Department.create({
      departmentName,
      departmentCode,
      description,
      parentDepartmentId: parentDepartmentId || null,
      departmentHeadId: departmentHeadId || null,
      roleId: roleId || null,
      budget: budget || 0,
      color,
      icon
    });

    await logAudit(req.user.id, 'Create Department', `Created department: ${departmentName}`, req.ip);

    res.status(201).json({
      status: 'success',
      data: { department }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByPk(req.params.id);

    if (!department) {
      return next(new AppError('No department found with that ID', 404));
    }

    const { parentDepartmentId } = req.body;

    // Circular dependency check
    if (parentDepartmentId) {
      if (parentDepartmentId === department.id) {
        return next(new AppError('A department cannot be its own parent', 400));
      }
      // Recursive check to ensure the new parent isn't a child of this department
      let currentParent = await Department.findByPk(parentDepartmentId);
      while (currentParent) {
        if (currentParent.id === department.id) {
          return next(new AppError('Circular hierarchy detected. Cannot set a child as a parent.', 400));
        }
        if (!currentParent.parentDepartmentId) break;
        currentParent = await Department.findByPk(currentParent.parentDepartmentId);
      }
    }

    await department.update(req.body);

    await logAudit(req.user.id, 'Update Department', `Updated department: ${department.departmentName}`, req.ip);

    res.status(200).json({
      status: 'success',
      data: { department }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByPk(req.params.id, {
      include: [{ model: Department, as: 'SubDepartments' }]
    });

    if (!department) {
      return next(new AppError('No department found with that ID', 404));
    }

    // Check if it has children
    if (department.SubDepartments && department.SubDepartments.length > 0) {
      return next(new AppError('Cannot delete a department that has sub-departments. Move or delete them first.', 400));
    }

    await department.destroy(); // Soft delete because paranoid: true

    await logAudit(req.user.id, 'Delete Department', `Deleted department: ${department.departmentName}`, req.ip);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

exports.getDepartmentStatistics = async (req, res, next) => {
  try {
    const totalDepartments = await Department.count();
    const activeDepartments = await Department.count({ where: { status: 'Active' } });
    const totalBudget = await Department.sum('budget');
    
    // Employee counts can be aggregated manually or directly from Users table
    const totalEmployeesAssigned = await User.count({ where: { department_id: { [Op.ne]: null } } });

    res.status(200).json({
      status: 'success',
      data: {
        totalDepartments,
        activeDepartments,
        totalBudget: totalBudget || 0,
        totalEmployeesAssigned
      }
    });
  } catch (err) {
    next(err);
  }
};
