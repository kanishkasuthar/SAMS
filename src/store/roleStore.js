import { create } from 'zustand';
import { useOrgStore } from './orgStore';
import api from '../services/api';

export const useRoleStore = create((set, get) => ({
  loading: false,
  error: null,
  searchQuery: '',

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // Expose roles derived from useOrgStore people
  get roles() {
    const orgStoreState = useOrgStore.getState();
    const people = orgStoreState.people || [];
    const permissions = get().permissions || [];
    
    // Group unique designations
    const uniqueRoles = {};
    people.forEach(p => {
      const designation = p.role || 'Employee';
      if (!uniqueRoles[designation]) {
        uniqueRoles[designation] = {
          name: designation,
          users: 0,
          departments: new Set(),
          reportingManagers: new Set(),
          totalDirectReports: 0,
          totalWorkload: 0,
          healthScore: 95
        };
      }
      uniqueRoles[designation].users += 1;
      if (p.department) uniqueRoles[designation].departments.add(p.department);
      if (p.manager) uniqueRoles[designation].reportingManagers.add(p.manager);
      uniqueRoles[designation].totalDirectReports += p.directReports || 0;
      uniqueRoles[designation].totalWorkload += p.workload || 65;
    });

    const designationsList = Object.keys(uniqueRoles);

    const list = designationsList.map((name, idx) => {
      const uRole = uniqueRoles[name];
      const id = `role-derived-${idx}`;
      
      const nameLower = name.toLowerCase();
      let level = 'Level 4';
      let isSystem = false;
      let access = 'Limited Access';
      
      if (nameLower.includes('ceo') || nameLower.includes('president') || nameLower.includes('chief executive')) {
        level = 'Level 1';
        isSystem = true;
        access = 'Full Access';
      } else if (nameLower.includes('cto') || nameLower.includes('coo') || nameLower.includes('cfo') || nameLower.includes('cmo') || nameLower.includes('vp') || nameLower.includes('director')) {
        level = 'Level 1';
        isSystem = true;
        access = 'Full Access';
      } else if (nameLower.includes('manager') || nameLower.includes('head')) {
        level = 'Level 2';
        isSystem = true;
        access = 'Department Level Access';
      } else if (nameLower.includes('lead') || nameLower.includes('senior')) {
        level = 'Level 3';
        access = 'Read-Write Access';
      }
      
      // Determine parentRoleId by looking at reporting structure
      let parentRoleId = null;
      const firstEmpWithManager = people.find(p => p.role === name && p.manager && p.manager !== 'No reporting manager');
      if (firstEmpWithManager) {
        const managerEmp = people.find(m => m.name === firstEmpWithManager.manager);
        if (managerEmp && managerEmp.role && managerEmp.role !== name) {
          const parentIdx = designationsList.indexOf(managerEmp.role);
          if (parentIdx !== -1) {
            parentRoleId = `role-derived-${parentIdx}`;
          }
        }
      }

      // Mapped direct permissions
      let directPerms = [];
      if (level === 'Level 1') {
        directPerms = permissions.map(p => p.id);
      } else if (level === 'Level 2') {
        directPerms = permissions.filter(p => !p.id.includes('manage') && !p.id.includes('delete')).map(p => p.id);
      } else if (level === 'Level 3') {
        directPerms = permissions.filter(p => p.id.includes('view') || p.id.includes('edit')).map(p => p.id);
      } else {
        directPerms = permissions.filter(p => p.id.includes('view')).map(p => p.id);
      }
      
      const accessRisks = [];
      if (level === 'Level 1' && uRole.users > 5) {
        accessRisks.push({ severity: 'HIGH', type: 'Too many administrators', description: `Excessive administrators (${uRole.users}) hold Level 1 admin access.` });
      }
      if (uRole.users === 0) {
        accessRisks.push({ severity: 'MEDIUM', type: 'Unused role', description: 'This role is not currently assigned to any active employee.' });
      }
      
      const deptsArray = Array.from(uRole.departments);
      const mgrsArray = Array.from(uRole.reportingManagers);
      
      return {
        id,
        name,
        title: name,
        level,
        classification: isSystem ? 'SYSTEM ROLE' : 'CUSTOM ROLE',
        isSystem,
        access,
        users: uRole.users,
        department: deptsArray.join(', ') || 'Global',
        reportsTo: mgrsArray.join(', ') || 'Board of Directors',
        directReports: uRole.totalDirectReports,
        permissionLevel: level,
        accessLevel: access,
        description: `Responsible for managing ${deptsArray.join(' and ') || 'organizational'} objectives and operational targets.`,
        riskScore: accessRisks.length > 0 ? 75 : 15,
        accessRisks,
        directPermissions: directPerms,
        inheritedPermissions: [],
        workload: Math.round(uRole.totalWorkload / uRole.users),
        healthScore: uRole.healthScore,
        Permissions: directPerms.map(pid => permissions.find(p => p.id === pid)).filter(Boolean),
        parentRoleId
      };
    });

    const query = get().searchQuery;
    if (query) {
      return list.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));
    }
    return list;
  },

  // Permissions array corresponding to SAMS capability matrix
  permissions: [
    { id: 'dash-view', name: 'View Dashboard', module: 'Dashboard', action: 'View', risk: 'LOW' },
    { id: 'studio-view', name: 'View Studio', module: 'Organization Studio', action: 'View', risk: 'LOW' },
    { id: 'studio-edit', name: 'Edit Hierarchy', module: 'Organization Studio', action: 'Edit', risk: 'MEDIUM' },
    { id: 'studio-manage', name: 'Manage Hierarchy', module: 'Organization Studio', action: 'Manage', risk: 'HIGH' },
    { id: 'people-view', name: 'View People', module: 'People', action: 'View', risk: 'LOW' },
    { id: 'people-edit', name: 'Edit People', module: 'People', action: 'Edit', risk: 'MEDIUM' },
    { id: 'people-create', name: 'Create People', module: 'People', action: 'Create', risk: 'MEDIUM' },
    { id: 'people-delete', name: 'Delete People', module: 'People', action: 'Delete', risk: 'HIGH' },
    { id: 'depts-view', name: 'View Departments', module: 'Departments', action: 'View', risk: 'LOW' },
    { id: 'depts-edit', name: 'Edit Departments', module: 'Departments', action: 'Edit', risk: 'MEDIUM' },
    { id: 'projects-view', name: 'View Projects', module: 'Projects', action: 'View', risk: 'LOW' },
    { id: 'flows-view', name: 'View Decision Flows', module: 'Decision Flows', action: 'View', risk: 'LOW' },
    { id: 'flows-approve', name: 'Approve Scenarios', module: 'Decision Flows', action: 'Approve', risk: 'HIGH' },
    { id: 'reports-view', name: 'View Reports', module: 'Reports', action: 'View', risk: 'LOW' },
    { id: 'reports-export', name: 'Export Reports', module: 'Reports', action: 'Export', risk: 'MEDIUM' },
    { id: 'analytics-view', name: 'View Analytics', module: 'Analytics', action: 'View', risk: 'LOW' },
    { id: 'audit-view', name: 'View Audit Logs', module: 'Audit Logs', action: 'View', risk: 'LOW' },
    { id: 'settings-view', name: 'View Settings', module: 'Settings', action: 'View', risk: 'LOW' },
    { id: 'roles-view', name: 'View Roles', module: 'Role Management', action: 'View', risk: 'LOW' },
    { id: 'roles-manage', name: 'Manage Roles', module: 'Role Management', action: 'Manage', risk: 'HIGH' },
    { id: 'sessions-view', name: 'View Sessions', module: 'Sessions', action: 'View', risk: 'LOW' }
  ],

  fetchRoles: async () => {
    await useOrgStore.getState().fetchOrgChart();
  },

  fetchPermissions: async () => {
    // Already populated
  },

  createRole: async (roleData) => {
    const name = roleData.title || roleData.roleName;
    const newAuditLog = {
      id: `AL-${Date.now()}`,
      action: 'Role Created',
      user: 'System Admin',
      details: `Created new custom security role: ${name}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Success'
    };
    useOrgStore.setState(state => ({ auditLogs: [newAuditLog, ...state.auditLogs] }));
    return true;
  },

  updateRole: async (id, roleData) => {
    const name = roleData.title || roleData.roleName;
    const newAuditLog = {
      id: `AL-${Date.now()}`,
      action: 'Role Updated',
      user: 'System Admin',
      details: `Updated security parameters for role: ${name}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Success'
    };
    useOrgStore.setState(state => ({ auditLogs: [newAuditLog, ...state.auditLogs] }));
    return true;
  },

  deleteRole: async (id) => {
    const newAuditLog = {
      id: `AL-${Date.now()}`,
      action: 'Role Deleted',
      user: 'System Admin',
      details: `Archived and deleted role assignment ID: ${id}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Success'
    };
    useOrgStore.setState(state => ({ auditLogs: [newAuditLog, ...state.auditLogs] }));
    return true;
  }
}));

// Wire roleStore to reactively update when orgStore changes
useOrgStore.subscribe((state) => {
  useRoleStore.setState({ _orgUpdateTrigger: Date.now() });
});
