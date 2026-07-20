import { create } from 'zustand';
import api from '../services/api';
import { useUIStore } from './uiStore';

export const useUserStore = create((set, get) => ({
  users: [],
  totalUsers: 0,
  loading: false,
  error: null,
  
  // Pagination & Filters
  page: 1,
  limit: 10,
  searchQuery: '',
  filters: {
    role: '',
    department: '',
    status: ''
  },

  setPage: (page) => {
    set({ page });
    get().fetchUsers();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, page: 1 });
    get().fetchUsers();
  },

  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters }, page: 1 }));
    get().fetchUsers();
  },

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { page, limit, searchQuery, filters } = get();
      const params = new URLSearchParams({
        page,
        limit,
        ...(searchQuery && { search: searchQuery }),
        ...(filters.role && { role: filters.role }),
        ...(filters.department && { department: filters.department }),
        ...(filters.status && { status: filters.status }),
      });

      const response = await api.get(`/users?${params.toString()}`);
      
      set({ 
        users: response.data.data.users, 
        totalUsers: response.data.total,
        loading: false 
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
      set({ error: error.response?.data?.message || 'Failed to fetch users', loading: false });
    }
  },

  createUser: async (userData) => {
    try {
      await api.post('/users', userData);
      useUIStore.getState().addToast('User created successfully', 'success');
      get().fetchUsers();
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create user';
      useUIStore.getState().addToast(msg, 'error');
      return false;
    }
  },

  updateUser: async (id, userData) => {
    try {
      await api.put(`/users/${id}`, userData);
      useUIStore.getState().addToast('User updated successfully', 'success');
      get().fetchUsers();
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update user';
      useUIStore.getState().addToast(msg, 'error');
      return false;
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      useUIStore.getState().addToast('User archived successfully', 'success');
      get().fetchUsers();
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to archive user';
      useUIStore.getState().addToast(msg, 'error');
      return false;
    }
  },

  updateUserStatus: async (id, status) => {
    try {
      await api.patch(`/users/${id}/status`, { status });
      useUIStore.getState().addToast(`User marked as ${status}`, 'success');
      get().fetchUsers();
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update status';
      useUIStore.getState().addToast(msg, 'error');
      return false;
    }
  },
  
  updateUserRole: async (id, roleId) => {
    try {
      await api.patch(`/users/${id}/role`, { roleId });
      useUIStore.getState().addToast('Role updated successfully', 'success');
      get().fetchUsers();
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update role';
      useUIStore.getState().addToast(msg, 'error');
      return false;
    }
  }
}));
