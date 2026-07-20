const Role = require('../models/Role');
const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');
const { logAudit } = require('../utils/auditLogger');

// -----------------------------------------
// Roles
// -----------------------------------------

exports.getAllRoles = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = search
      ? { name: { [Op.like]: `%${search}%` } }
      : {};

    const { count, rows } = await Role.findAndCountAll({
      where: whereClause,
      include: [{ model: Permission, through: { attributes: [] } }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      total: count,
      page: parseInt(page),
      results: rows.length,
      data: { roles: rows }
    });
  } catch (err) {
    next(err);
  }
};

exports.getRole = async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [{ model: Permission, through: { attributes: [] } }]
    });

    if (!role) {
      return next(new AppError('No role found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { role }
    });
  } catch (err) {
    next(err);
  }
};

exports.createRole = async (req, res, next) => {
  try {
    const { roleName, description, level, color, status, permissionIds } = req.body;

    const role = await Role.create({
      name: roleName,
      description,
      level,
      color,
      status
    });

    if (permissionIds && Array.isArray(permissionIds)) {
      await role.setPermissions(permissionIds);
    }

    await logAudit(req.user.id, 'Create Role', `Created role: ${roleName}`, req.ip);

    const updatedRole = await Role.findByPk(role.id, {
      include: [{ model: Permission, through: { attributes: [] } }]
    });

    res.status(201).json({
      status: 'success',
      data: { role: updatedRole }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return next(new AppError('No role found with that ID', 404));
    }

    if (role.isSystem) {
      return next(new AppError('Cannot modify a system-defined role', 403));
    }

    const { roleName, description, level, color, status, permissionIds } = req.body;

    await role.update({
      name: roleName || role.name,
      description: description !== undefined ? description : role.description,
      level: level || role.level,
      color: color || role.color,
      status: status || role.status
    });

    if (permissionIds && Array.isArray(permissionIds)) {
      await role.setPermissions(permissionIds);
    }

    await logAudit(req.user.id, 'Update Role', `Updated role: ${role.name}`, req.ip);

    const updatedRole = await Role.findByPk(role.id, {
      include: [{ model: Permission, through: { attributes: [] } }]
    });

    res.status(200).json({
      status: 'success',
      data: { role: updatedRole }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteRole = async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return next(new AppError('No role found with that ID', 404));
    }
    
    if (role.isSystem) {
      return next(new AppError('Cannot delete a system-defined role', 403));
    }

    await role.destroy();

    await logAudit(req.user.id, 'Delete Role', `Deleted role: ${role.name}`, req.ip);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

// -----------------------------------------
// Permissions
// -----------------------------------------

exports.getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await Permission.findAll({
      order: [['module', 'ASC'], ['name', 'ASC']]
    });

    res.status(200).json({
      status: 'success',
      results: permissions.length,
      data: { permissions }
    });
  } catch (err) {
    next(err);
  }
};

exports.createPermission = async (req, res, next) => {
  try {
    const { name, module, action, description, risk } = req.body;
    const permission = await Permission.create({ name, module, action, description, risk });
    
    await logAudit(req.user.id, 'Create Permission', `Created permission: ${name}`, req.ip);

    res.status(201).json({ status: 'success', data: { permission } });
  } catch (err) {
    next(err);
  }
};

exports.updatePermission = async (req, res, next) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) return next(new AppError('Permission not found', 404));

    await permission.update(req.body);
    await logAudit(req.user.id, 'Update Permission', `Updated permission: ${permission.name}`, req.ip);

    res.status(200).json({ status: 'success', data: { permission } });
  } catch (err) {
    next(err);
  }
};

exports.deletePermission = async (req, res, next) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) return next(new AppError('Permission not found', 404));

    await permission.destroy();
    await logAudit(req.user.id, 'Delete Permission', `Deleted permission: ${permission.name}`, req.ip);

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};

// -----------------------------------------
// Role Permissions Management (Directly)
// -----------------------------------------

exports.getRolePermissions = async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [{ model: Permission, through: { attributes: [] } }]
    });

    if (!role) return next(new AppError('Role not found', 404));

    res.status(200).json({ status: 'success', data: { permissions: role.Permissions } });
  } catch (err) {
    next(err);
  }
};

exports.updateRolePermissions = async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return next(new AppError('Role not found', 404));
    
    if (role.isSystem) {
      // Depending on requirements, we might allow changing permissions on system roles, 
      // but usually not for Super Admin. Let's allow it unless it's strictly requested not to.
      // We will skip this check to allow admins to customize default roles (like Manager).
    }

    const { permissionIds } = req.body;
    if (!Array.isArray(permissionIds)) {
      return next(new AppError('permissionIds must be an array', 400));
    }

    await role.setPermissions(permissionIds);
    await logAudit(req.user.id, 'Update Role Permissions', `Updated permissions for role: ${role.name}`, req.ip);

    const updatedRole = await Role.findByPk(role.id, {
      include: [{ model: Permission, through: { attributes: [] } }]
    });

    res.status(200).json({ status: 'success', data: { role: updatedRole } });
  } catch (err) {
    next(err);
  }
};
