import { create } from 'zustand';
import api from '../services/api';

export const useAuditStore = create((set, get) => ({
  logs: [],
  total: 0,
  loading: false,
  error: null,
  
  page: 1,
  limit: 20,
  searchQuery: '',

  setPage: (page) => {
    set({ page });
    get().fetchLogs();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, page: 1 });
    get().fetchLogs();
  },

  fetchLogs: async () => {
    set({ loading: true, error: null });
    try {
      const { page, limit, searchQuery } = get();
      const params = new URLSearchParams({
        page,
        limit,
        ...(searchQuery && { action: searchQuery }),
      });
      const res = await api.get(`/audit-logs?${params.toString()}`);
      const mappedLogs = res.data.data.logs.map(log => ({
        id: log.id,
        action: log.action,
        user: log.User?.name || 'System',
        photo: log.User?.profileImage || null,
        timestamp: new Date(log.createdAt).toLocaleString(),
        department: 'System', // Backend audit logs don't directly have department
        details: log.details,
        impact: log.action.toLowerCase().includes('delete') ? 'Critical' : 'Low',
        version: 'v' + Math.floor(Math.random() * 10), // mock version for UI
        replayable: false
      }));

      set({ 
        logs: mappedLogs, 
        total: res.data.totalRecords || res.data.results,
        loading: false 
      });
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      set({ error: error.response?.data?.message || 'Failed to fetch audit logs', loading: false });
    }
  }
}));
