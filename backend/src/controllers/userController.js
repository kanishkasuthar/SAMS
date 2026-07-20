const User = require('../models/User');
const Role = require('../models/Role');
const Department = require('../models/Department');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');
const { logAudit } = require('../utils/auditLogger');
const versionService = require('../services/versionService');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, role, department, status } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    if (role) {
      whereClause.roleId = role;
    }

    if (department) {
      whereClause.departmentId = department;
    }

    if (status) {
      whereClause.status = status;
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      include: [
        { model: Role, attributes: ['id', 'name'] },
        { model: Department, as: 'Department', attributes: ['id', 'name'] }
      ],
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      results: rows.length,
      total: count,
      data: {
        users: rows
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Role, attributes: ['id', 'name'] }
      ]
    });

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { fullName, email, password, profileImage, phone, roleId, departmentId, status } = req.body;

    const existingUser = await User.findOne({ where: { email }, paranoid: false });
    if (existingUser) {
      return next(new AppError('User already exists with this email', 400));
    }

    // Hash password if provided, otherwise generate a dummy one for now (or fail)
    const initialPassword = password || 'temp123';
    const hashedPassword = await bcrypt.hash(initialPassword, 12);

    const newUser = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
      profileImage,
      phone,
      roleId,
      departmentId,
      status: status || 'Active',
      is_verified: true // Assuming admin provisioning auto-verifies
    });

    await logAudit(req.user.id, 'Create User', `Provisioned user ${newUser.email}`, req.ip);

    newUser.password = undefined; // Don't send back

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    const { fullName, phone, profileImage, departmentId, roleId } = req.body;
    
    if (fullName) user.name = fullName;
    if (phone) user.phone = phone;
    if (profileImage) user.profileImage = profileImage;
    if (departmentId) user.departmentId = departmentId;
    if (roleId) user.roleId = roleId;

    await user.save();
    
    await logAudit(req.user.id, 'Update User', `Updated profile for user ${user.id}`, req.ip);
    await versionService.createVersion('Users', 'User', user.id, user.toJSON(), req.user.id, 'Profile Update');

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    // Soft delete due to paranoid: true
    await user.destroy();
    
    await logAudit(req.user.id, 'Delete User', `Soft deleted user ${user.id}`, req.ip);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    const { status } = req.body;
    if (!['Active', 'Inactive'].includes(status)) {
      return next(new AppError('Invalid status value', 400));
    }

    user.status = status;
    await user.save();
    
    await logAudit(req.user.id, 'Update User Status', `Changed status for user ${user.id} to ${status}`, req.ip);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    const { roleId } = req.body;
    
    const role = await Role.findByPk(roleId);
    if (!role) {
      return next(new AppError('Invalid Role ID', 400));
    }

    user.roleId = roleId;
    await user.save();
    
    await logAudit(req.user.id, 'Assign Role', `Assigned role ${role.name} to user ${user.id}`, req.ip);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserDepartment = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    const { departmentId } = req.body;
    
    // const dept = await Department.findByPk(departmentId);
    // if (!dept) {
    //   return next(new AppError('Invalid Department ID', 400));
    // }

    user.departmentId = departmentId;
    await user.save();
    
    await logAudit(req.user.id, 'Assign Department', `Assigned department to user ${user.id}`, req.ip);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserReportingManager = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    const { reportingManagerId } = req.body;
    
    // Prevent self-reporting
    if (reportingManagerId === user.id) {
      return next(new AppError('User cannot report to themselves', 400));
    }

    user.reportingManagerId = reportingManagerId || null;
    await user.save();
    
    await logAudit(req.user.id, 'Update Manager', `Updated reporting manager for user ${user.id}`, req.ip);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrgChart = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'profileImage', 'phone', 'status', 'designation', 'reportingManagerId', 'departmentId', 'roleId'],
      include: [
        { model: Role, attributes: ['id', 'name'] },
        { model: Department, as: 'Department', attributes: ['id', 'departmentName', 'color'] }
      ]
    });

    // Derive hierarchy for users without reportingManagerId
    // 1. Find CEO / Super Admin (top level)
    const ceo = users.find(u => u.Role && (u.Role.name.toLowerCase().includes('ceo') || u.Role.name === 'Super Admin'));
    
    // 2. Find Department Heads (Managers)
    const departmentHeads = {};
    users.forEach(u => {
      if (u.Role && u.Role.name === 'Manager' && u.departmentId) {
        departmentHeads[u.departmentId] = u.id;
      }
    });

    const derivedUsers = users.map(u => {
      let rId = u.reportingManagerId;
      
      if (!rId && u.id !== ceo?.id) {
        // If it's a Manager, report to CEO
        if (u.Role && u.Role.name === 'Manager') {
          rId = ceo ? ceo.id : null;
        } 
        // If it's a regular employee, report to Department Head
        else if (u.departmentId && departmentHeads[u.departmentId]) {
          rId = departmentHeads[u.departmentId];
        } 
        // Default fallback to CEO
        else {
          rId = ceo ? ceo.id : null;
        }
      }
      
      return {
        ...u.toJSON(),
        reportingManagerId: rId
      };
    });

    res.status(200).json({
      status: 'success',
      data: {
        users: derivedUsers
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.importUsers = async (req, res, next) => {
  try {
    const { employees } = req.body;
    if (!employees || !Array.isArray(employees)) {
      return next(new AppError('No employees data provided', 400));
    }

    const defaultRole = await Role.findOne({ where: { name: 'Employee' } });
    const defaultRoleId = defaultRole ? defaultRole.id : null;

    const emailToUserMap = new Map();
    const importStats = { imported: 0, errors: 0, skipped: 0 };

    for (const emp of employees) {
      try {
        if (!emp.name || !emp.email) {
          importStats.errors++;
          continue;
        }

        let departmentId = null;
        if (emp.department) {
          const [dept] = await Department.findOrCreate({
            where: { departmentName: emp.department },
            defaults: { color: '#' + Math.floor(Math.random()*16777215).toString(16) }
          });
          departmentId = dept.id;
        }

        let roleId = defaultRoleId;
        if (emp.role) {
          const [role] = await Role.findOrCreate({
            where: { name: emp.role },
            defaults: { level: 'Level 3' }
          });
          roleId = role.id;
        }

        let user = await User.findOne({ where: { email: emp.email }, paranoid: false });
        const hashedPassword = await bcrypt.hash('temp123', 12);
        
        if (!user) {
          user = await User.create({
            name: emp.name,
            email: emp.email,
            password: hashedPassword,
            phone: emp.phone || null,
            designation: emp.designation || null,
            departmentId,
            roleId,
            status: emp.status || 'Active',
            is_verified: true
          });
          importStats.imported++;
        } else {
          user.name = emp.name;
          user.phone = emp.phone || user.phone;
          user.designation = emp.designation || user.designation;
          user.departmentId = departmentId || user.departmentId;
          user.roleId = roleId || user.roleId;
          user.status = emp.status || user.status;
          await user.save();
          importStats.imported++;
        }

        emailToUserMap.set(emp.email, user.id);
        if (emp.employeeId) {
          emailToUserMap.set(emp.employeeId, user.id);
        }
      } catch (err) {
        console.error('Import error for employee:', emp.email, err);
        importStats.errors++;
      }
    }

    for (const emp of employees) {
      try {
        if (!emp.email) continue;
        const userId = emailToUserMap.get(emp.email);
        if (!userId) continue;

        let managerId = null;
        if (emp.managerId) {
          managerId = emailToUserMap.get(emp.managerId);
        }
        if (!managerId && emp.managerEmail) {
          managerId = emailToUserMap.get(emp.managerEmail);
        }
        if (!managerId && emp.managerName) {
          const mgr = await User.findOne({ where: { name: emp.managerName } });
          if (mgr) managerId = mgr.id;
        }

        if (managerId && managerId !== userId) {
          await User.update(
            { reportingManagerId: managerId },
            { where: { id: userId } }
          );
        }
      } catch (err) {
        console.error('Failed to link manager for:', emp.email, err);
      }
    }

    await logAudit(req.user.id, 'Import Users', `Bulk imported ${importStats.imported} users`, req.ip);
    await versionService.createVersion('Users', 'Bulk', 'import', employees, req.user.id, 'Bulk Import via Excel');

    res.status(200).json({
      status: 'success',
      data: importStats
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrgStats = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'reportingManagerId', 'status', 'designation']
    });

    const activeCount = users.filter(u => u.status === 'Active').length;
    const totalCount = users.length;

    const managerMap = new Map();
    users.forEach(u => managerMap.set(u.id, u.reportingManagerId));

    let maxDepth = 0;
    users.forEach(u => {
      let depth = 1;
      let curr = u.id;
      let visited = new Set();
      while (managerMap.get(curr) && !visited.has(curr)) {
        visited.add(curr);
        depth++;
        curr = managerMap.get(curr);
      }
      if (depth > maxDepth) maxDepth = depth;
    });

    res.status(200).json({
      status: 'success',
      data: {
        activeCount,
        totalCount,
        maxDepth,
        vacantCount: users.filter(u => u.designation?.toLowerCase().includes('vacant')).length || 0,
        syncStatus: 'Synced'
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    user.status = 'Inactive';
    await user.save();

    await logAudit(req.user.id, 'Deactivate User', `Deactivated user ${user.id}`, req.ip);
    await versionService.createVersion('Users', 'User', user.id, user.toJSON(), req.user.id, 'Deactivate User');

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

exports.bulkDeleteUsers = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return next(new AppError('No user IDs provided', 400));
    }
    await User.destroy({ where: { id: { [Op.in]: ids } } });

    await logAudit(req.user.id, 'Bulk Delete Users', `Deleted ${ids.length} users`, req.ip);

    res.status(200).json({
      status: 'success',
      message: `${ids.length} users successfully deleted`
    });
  } catch (err) {
    next(err);
  }
};
