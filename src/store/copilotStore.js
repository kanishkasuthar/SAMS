import { create } from 'zustand';
import api from '../services/api';

export const useCopilotStore = create((set, get) => ({
  isOpen: false,
  reportId: null,
  messages: [],
  isTyping: false,
  
  toggleCopilot: () => set(state => ({ isOpen: !state.isOpen })),
  openCopilotForReport: (reportId) => set({ isOpen: true, reportId, messages: [] }),
  closeCopilot: () => set({ isOpen: false }),
  
  clearHistory: () => set({ messages: [] }),

  sendMessage: async (text) => {
    // 1. Add user message
    const userMsg = { id: Date.now().toString(), sender: 'user', text };
    set(state => ({ messages: [...state.messages, userMsg], isTyping: true }));
    
    try {
      // 2. Fetch from backend AI insights endpoint
      const response = await api.post('/insights', { query: text });
      
      const aiData = response.data.data.insight || response.data.data.response;
      
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai',
        text: aiData.text || aiData.description || 'AI analyzed your query.',
        bullets: aiData.bullets || [],
        chart: aiData.chart || null,
        recommendations: aiData.recommendations || [],
        timestamp: new Date().toISOString()
      };
      
      set(state => ({
        messages: [...state.messages, aiMsg],
        isTyping: false
      }));
    } catch (err) {
      console.error('Failed to get AI response:', err);
      const errorMsg = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai',
        text: "I'm having trouble connecting to the intelligence server right now. Please try again later.",
        bullets: [],
        chart: null,
        recommendations: [],
        timestamp: new Date().toISOString()
      };
      set(state => ({
        messages: [...state.messages, errorMsg],
        isTyping: false
      }));
    }
  }
}));

