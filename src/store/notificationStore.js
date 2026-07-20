import { create } from 'zustand';
import api from '../services/api';

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/notifications');
      const data = res.data.data.notifications || [];
      const mapped = data.map(n => ({
        id: n.id,
        title: n.title,
        message: n.message,
        type: n.type,
        time: n.createdAt ? new Date(n.createdAt).toLocaleString() : 'Just now',
        read: n.isRead,
        isRead: n.isRead,
        actionLink: n.link || null
      }));
      set({ 
        notifications: mapped, 
        unreadCount: mapped.filter(n => !n.read).length,
        loading: false 
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to load notifications', loading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      get().fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  },

  markAllAsRead: async () => {
    try {
      await api.post('/notifications/mark-all-read');
      get().fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  }
}));
