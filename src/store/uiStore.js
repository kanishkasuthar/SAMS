import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isDarkMode: false,
  toasts: [],
  isAuthenticated: false, // Default to false for login screen
  authMode: 'login', // 'login' or 'signup'
  currentUser: {
    name: 'Kanishka Suthar',
    role: 'Super Admin',
    email: 'kanishka.suthar@company.com',
    phone: '+1 (555) 999-0000',
    department: 'Executive Board',
    photo: null,
    bio: 'Oversees the SAMS platform system architecture and organizational data integrity.'
  },

  updateCurrentUser: (userData) => set((state) => ({ currentUser: { ...state.currentUser, ...userData } })),
  setAuthMode: (mode) => set({ authMode: mode }),
  login: () => set({ isAuthenticated: true }),
  initializeAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }
    // Demo mode bypass — skip backend profile fetch
    if (token === 'demo-token-local') {
      set({ isAuthenticated: true });
      return;
    }
    try {
      const { default: api } = await import('../services/api');
      const response = await api.get('/auth/profile');
      if (response.data?.data?.user) {
        const u = response.data.data.user;
        set({
          isAuthenticated: true,
          currentUser: {
            name: u.name || u.fullName,
            role: u.Role?.name || 'User',
            email: u.email,
            phone: u.phone || '+1 (555) 000-0000',
            department: u.Department?.departmentName || 'Unassigned',
            photo: u.profileImage || null,
            bio: 'SAMS User'
          }
        });
      }
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      set({ isAuthenticated: false });
    }
  },
  logout: async () => {
    try {
      const { default: api } = await import('../services/api');
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.post('/auth/logout', { token: refreshToken }).catch(e => console.error(e));
      }
    } catch (err) {}
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    set({ isAuthenticated: false, authMode: 'login' });
  },
  
  isChatOpen: false,
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    return { isDarkMode: newMode };
  }),

  setDarkMode: (newMode) => set(() => {
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    return { isDarkMode: newMode };
  }),

  addToast: (message, type = 'info') => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));
    
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      }));
    }, 3000);
  },
  
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  })),

  // Modals
  activeModal: null, // { type: 'CREATE_USER', data: {} }
  openModal: (type, data = null) => set({ activeModal: { type, data } }),
  closeModal: () => set({ activeModal: null }),

  // Drawers
  activeDrawer: null, // { type: 'USER_DETAILS', data: {} }
  openDrawer: (type, data = null) => set({ activeDrawer: { type, data } }),
  closeDrawer: () => set({ activeDrawer: null }),

  // Global Filters
  globalFilters: {
    searchQuery: '',
    department: 'All',
    dateRange: 'YTD'
  },
  setFilter: (key, value) => set((state) => ({
    globalFilters: { ...state.globalFilters, [key]: value }
  })),
  clearFilters: () => set({
    globalFilters: { searchQuery: '', department: 'All', dateRange: 'YTD' }
  })
}));
