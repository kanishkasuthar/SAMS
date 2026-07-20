import { create } from 'zustand';
import api from '../services/api';

export const useRoleStore = create((set, get) => ({
  roles: [],
  permissions: [],
  loading: false,
  error: null,
  searchQuery: '',

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().fetchRoles();
  },

  fetchRoles: async () => {
    set({ loading: true, error: null });
    try {
      const { searchQuery } = get();
      const res = await api.get('/roles', {
        params: { search: searchQuery, limit: 100 }
      });
      const mappedRoles = res.data.data.roles.map(r => ({
        ...r,
        title: r.name,
        classification: r.isSystem ? 'SYSTEM ROLE' : 'CUSTOM ROLE',
        directPermissions: r.Permissions ? r.Permissions.map(p => p.id) : [],
        inheritedPermissions: [], // Not implemented yet
        accessRisks: [] // Not implemented natively yet
      }));
      set({ roles: mappedRoles, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  fetchPermissions: async () => {
    try {
      const res = await api.get('/roles/sys/permissions');
      set({ permissions: res.data.data.permissions });
    } catch (err) {
      console.error('Failed to fetch permissions', err);
    }
  },

  createRole: async (roleData) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        roleName: roleData.title || roleData.roleName,
        level: roleData.level,
        color: roleData.classification || roleData.color,
        permissionIds: roleData.directPermissions || roleData.permissionIds
      };
      await api.post('/roles', payload);
      await get().fetchRoles();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  updateRole: async (id, roleData) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        roleName: roleData.title || roleData.roleName,
        level: roleData.level,
        color: roleData.classification || roleData.color,
        permissionIds: roleData.directPermissions || roleData.permissionIds
      };
      await api.put(`/roles/${id}`, payload);
      await get().fetchRoles();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  deleteRole: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/roles/${id}`);
      await get().fetchRoles();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  updateRolePermissions: async (roleId, permissionIds) => {
    try {
      await api.put(`/roles/${roleId}/permissions`, { permissionIds });
      await get().fetchRoles();
      return true;
    } catch (err) {
      console.error('Failed to update role permissions', err);
      return false;
    }
  }
}));
