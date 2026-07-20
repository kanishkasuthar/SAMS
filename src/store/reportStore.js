import { create } from 'zustand';
import api from '../services/api';
import { useUIStore } from './uiStore';

export const useReportStore = create((set, get) => ({
  reports: [],
  history: [],
  loading: false,
  error: null,
  
  fetchReports: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/reports');
      // Map to UI expectation
      const mappedReports = res.data.data.reports.map(r => ({
        id: r.id,
        title: r.reportName,
        description: r.description || `Module: ${r.module}`,
        type: r.reportType,
        lastRun: r.updatedAt ? new Date(r.updatedAt).toLocaleString() : 'Never',
        tags: [r.module, r.status]
      }));
      set({ reports: mappedReports, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch reports', loading: false });
    }
  },

  fetchHistory: async () => {
    try {
      const res = await api.get('/reports/history');
      const mappedHistory = res.data.data.history.map(h => ({
        id: h.id,
        name: h.Report?.reportName || 'Unknown Report',
        date: new Date(h.executionTime).toLocaleDateString(),
        type: h.Report?.reportType || 'Standard',
        status: h.status,
        author: h.ExecutedBy?.name || 'System'
      }));
      set({ history: mappedHistory });
    } catch (err) {
      console.error(err);
    }
  },

  generateReport: async (reportId, filters) => {
    try {
      const res = await api.post('/reports/generate', { reportId, filters });
      useUIStore.getState().addToast('Report generated successfully', 'success');
      get().fetchHistory();
      return res.data;
    } catch (err) {
      useUIStore.getState().addToast('Failed to generate report', 'error');
      return null;
    }
  }
}));
