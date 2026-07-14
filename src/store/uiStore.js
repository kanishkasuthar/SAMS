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
  logout: () => set({ isAuthenticated: false, authMode: 'login' }),
  
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
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      }));
    }, 3000);
  },
  
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  }))
}));
