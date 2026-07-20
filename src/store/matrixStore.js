import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem('session-storage'));
  if (session && session.state && session.state.token) {
    config.headers.Authorization = `Bearer ${session.state.token}`;
  }
  return config;
});

export const useMatrixStore = create((set, get) => ({
  matrices: [],
  transformedData: [],
  statistics: null,
  loading: false,
  error: null,
  searchQuery: '',

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().fetchMatrices();
  },

  fetchMatrices: async () => {
    set({ loading: true, error: null });
    try {
      const { searchQuery } = get();
      const res = await api.get(`/responsibility-matrix?search=${searchQuery}`);
      const rawMatrices = res.data.data.matrices;
      
      // Transform data for UI table
      const transformed = rawMatrices.map(matrix => {
        const row = {
          id: matrix.id,
          process: matrix.processName,
          category: matrix.category || 'Uncategorized',
          priority: matrix.priority || 'Medium',
          status: matrix.status === 'Active' ? 'healthy' : 'high_risk',
          owner: null,
          dependencies: Math.floor(Math.random() * 15) + 1, // Mock dependencies for UI
          conflicts: {}
        };
        
        // Find accountable owner (usually the process owner)
        const accountable = matrix.Assignments.find(a => a.responsibilityType === 'Accountable');
        if (accountable && accountable.User) {
          row.owner = {
            name: accountable.User.fullName,
            role: accountable.Role ? accountable.Role.roleName : 'Manager',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(accountable.User.fullName)}&background=random`
          };
        }

        // Map assignments to dynamic department columns
        matrix.Assignments.forEach(assignment => {
          if (assignment.Department) {
            // Map the type (Responsible -> R, Accountable -> A, Consulted -> C, Informed -> I)
            const typeChar = assignment.responsibilityType.charAt(0);
            
            // If there's already an assignment for this dept, we can flag a conflict in UI
            if (row[assignment.Department.id]) {
               row.conflicts[assignment.Department.id] = 'Multiple assignments detected';
            }
            
            row[assignment.Department.id] = typeChar;
          }
        });
        
        return row;
      });

      set({ matrices: rawMatrices, transformedData: transformed, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  createMatrix: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.post('/responsibility-matrix', data);
      await get().fetchMatrices();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  updateMatrix: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/responsibility-matrix/${id}`, data);
      await get().fetchMatrices();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  deleteMatrix: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/responsibility-matrix/${id}`);
      await get().fetchMatrices();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  assignResponsibility: async (matrixId, assignmentData) => {
    set({ loading: true, error: null });
    try {
      await api.post(`/responsibility-matrix/${matrixId}/assign`, assignmentData);
      await get().fetchMatrices();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err; // Re-throw to show alert in UI for "Only one Accountable allowed"
    }
  },
  
  removeAssignment: async (matrixId, assignmentId) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/responsibility-matrix/${matrixId}/assign/${assignmentId}`);
      await get().fetchMatrices();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  fetchStatistics: async () => {
    try {
      const res = await api.get('/responsibility-matrix/statistics');
      set({ statistics: res.data.data });
    } catch (err) {
      console.error(err);
    }
  }
}));
