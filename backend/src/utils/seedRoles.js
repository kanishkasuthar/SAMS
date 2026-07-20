const { sequelize } = require('../config/database');
require('../models/index');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

const ALL_PERMISSIONS = [
  { name: 'organization.view', action: 'View Organization', module: 'Organization Studio', risk: 'LOW' },
  { name: 'organization.edit', action: 'Edit Hierarchy', module: 'Organization Studio', risk: 'HIGH' },
  { name: 'organization.move_employee', action: 'Move Employee', module: 'Organization Studio', risk: 'HIGH' },
  { name: 'organization.change_manager', action: 'Change Manager', module: 'Organization Studio', risk: 'HIGH' },
  { name: 'organization.create_node', action: 'Create Node', module: 'Organization Studio', risk: 'HIGH' },
  { name: 'organization.delete_node', action: 'Delete Node', module: 'Organization Studio', risk: 'CRITICAL' },
  { name: 'organization.restore_version', action: 'Restore Version', module: 'Organization Studio', risk: 'CRITICAL' },
  { name: 'organization.run_simulation', action: 'Run Simulation', module: 'Organization Studio', risk: 'MEDIUM' },
  { name: 'organization.apply_simulation', action: 'Apply Simulation', module: 'Organization Studio', risk: 'HIGH' },
  
  { name: 'sync.upload_excel', action: 'Upload Excel', module: 'Excel Sync', risk: 'HIGH' },
  { name: 'sync.connect_live', action: 'Connect Live Excel', module: 'Excel Sync', risk: 'HIGH' },
  { name: 'sync.sync', action: 'Sync Excel', module: 'Excel Sync', risk: 'HIGH' },
  { name: 'sync.resolve_conflicts', action: 'Resolve Conflicts', module: 'Excel Sync', risk: 'HIGH' },
  { name: 'sync.override', action: 'Override Sync', module: 'Excel Sync', risk: 'CRITICAL' },

  { name: 'projects.create', action: 'Create Project', module: 'Projects', risk: 'MEDIUM' },
  { name: 'projects.edit', action: 'Edit Project', module: 'Projects', risk: 'MEDIUM' },
  { name: 'projects.archive', action: 'Archive Project', module: 'Projects', risk: 'HIGH' },
  { name: 'projects.assign', action: 'Assign Employees', module: 'Projects', risk: 'MEDIUM' },
  { name: 'projects.change_lead', action: 'Change Project Lead', module: 'Projects', risk: 'HIGH' },

  { name: 'audit.view_logs', action: 'View Audit Logs', module: 'Audit & Security', risk: 'LOW' },
  { name: 'audit.export_logs', action: 'Export Audit Logs', module: 'Audit & Security', risk: 'MEDIUM' },
  { name: 'audit.view_sessions', action: 'View Sessions', module: 'Audit & Security', risk: 'MEDIUM' },
  { name: 'audit.revoke_sessions', action: 'Revoke Sessions', module: 'Audit & Security', risk: 'CRITICAL' },
  { name: 'audit.view_login_history', action: 'View Login History', module: 'Audit & Security', risk: 'LOW' },

  { name: 'people.view', action: 'People View', module: 'People', risk: 'LOW' },
  { name: 'people.edit', action: 'Edit Employee', module: 'People', risk: 'MEDIUM' },
  { name: 'people.history', action: 'Employee History', module: 'People', risk: 'MEDIUM' },

  { name: 'departments.view', action: 'Department View', module: 'Departments', risk: 'LOW' },
  { name: 'departments.staffing', action: 'Department Staffing', module: 'Departments', risk: 'MEDIUM' },
  
  { name: 'reports.view', action: 'Report View', module: 'Reports', risk: 'LOW' },
  { name: 'reports.hr', action: 'HR Reports', module: 'Reports', risk: 'MEDIUM' },
  
  { name: 'roles.view', action: 'View Roles & Permissions', module: 'Security', risk: 'LOW' },
  { name: 'roles.edit', action: 'Manage Roles & Permissions', module: 'Security', risk: 'CRITICAL' }
];

const DEFAULT_ROLES = [
  { name: 'Super Admin', description: 'System Administrator with full access to all modules and security settings.', level: 'Level 1', color: '#ef4444', isSystem: true },
  { name: 'Admin', description: 'Administrative access for day-to-day operations and organizational changes.', level: 'Level 2', color: '#f97316', isSystem: true },
  { name: 'HR Manager', description: 'Full access to people and department structures.', level: 'Level 3', color: '#3b82f6', isSystem: true },
  { name: 'Manager', description: 'Can view organization and manage assigned projects.', level: 'Level 4', color: '#10b981', isSystem: true },
  { name: 'Department Head', description: 'Manage specific departments and related resources.', level: 'Level 3', color: '#8b5cf6', isSystem: true },
  { name: 'Team Lead', description: 'Lead project teams and view team details.', level: 'Level 4', color: '#06b6d4', isSystem: true },
  { name: 'Employee', description: 'Basic employee access to personal profile and reports.', level: 'Level 5', color: '#64748b', isSystem: true },
  { name: 'Viewer', description: 'Read-only access to organization directory.', level: 'Level 5', color: '#94a3b8', isSystem: true },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    await sequelize.sync({ alter: true });
    
    console.log('Seeding Permissions...');
    for (const p of ALL_PERMISSIONS) {
      await Permission.findOrCreate({
        where: { name: p.name },
        defaults: p
      });
    }

    console.log('Seeding Roles...');
    for (const r of DEFAULT_ROLES) {
      await Role.findOrCreate({
        where: { name: r.name },
        defaults: r
      });
    }

    const superAdmin = await Role.findOne({ where: { name: 'Super Admin' } });
    if (superAdmin) {
      const allPerms = await Permission.findAll();
      await superAdmin.setPermissions(allPerms);
    }
    
    // Admin gets everything except audit/revoke sessions/role management
    const admin = await Role.findOne({ where: { name: 'Admin' } });
    if (admin) {
      const adminPerms = await Permission.findAll({
        where: {
          name: {
            [require('sequelize').Op.notIn]: ['audit.revoke_sessions', 'roles.edit']
          }
        }
      });
      await admin.setPermissions(adminPerms);
    }

    // Manager
    const manager = await Role.findOne({ where: { name: 'Manager' } });
    if (manager) {
      const managerPerms = await Permission.findAll({
        where: {
          name: {
            [require('sequelize').Op.in]: ['organization.view', 'people.view', 'projects.view', 'projects.edit', 'reports.view']
          }
        }
      });
      await manager.setPermissions(managerPerms);
    }

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
