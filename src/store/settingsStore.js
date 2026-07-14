import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      companyName: 'Acme Corporation',
      instanceName: 'Acme Global Hub',
      idleTimeout: '30 Minutes',
      theme: 'Light',
      accentColor: '#4F46E5',
      
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'sams-settings',
    }
  )
);
