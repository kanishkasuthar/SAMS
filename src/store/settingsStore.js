import { create } from 'zustand';
import api from '../services/api';

export const useSettingsStore = create((set, get) => ({
  companyName: 'Acme Corporation',
  instanceName: 'Acme Global Hub',
  idleTimeout: '30 Minutes',
  theme: 'Light',
  accentColor: '#4F46E5',
  loading: false,

  fetchSettings: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/settings');
      if (res.data.data.settings) {
        set({ ...res.data.data.settings, loading: false });
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
      set({ loading: false });
    }
  },
      
  updateSettings: async (newSettings) => {
    set((state) => ({ ...state, ...newSettings }));
    try {
      await api.put('/settings', newSettings);
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  }
}));
