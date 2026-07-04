import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

const ToastContainer = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      zIndex: 9999,
      pointerEvents: 'none'
    }}>
      <AnimatePresence>
        {toasts.map(toast => {
          let Icon = Info;
          let color = 'var(--color-primary)';
          let bg = 'rgba(79, 70, 229, 0.1)';
          
          if (toast.type === 'success') {
            Icon = CheckCircle;
            color = 'var(--color-success)';
            bg = 'rgba(16, 185, 129, 0.1)';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            color = 'var(--color-danger)';
            bg = 'rgba(239, 68, 68, 0.1)';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="card"
              style={{
                pointerEvents: 'auto',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                minWidth: 300,
                backgroundColor: 'var(--color-surface)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', backgroundColor: bg, color }}>
                <Icon size={14} />
              </div>
              <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-main)' }}>
                {toast.message}
              </div>
              <button onClick={() => removeToast(toast.id)} style={{ color: 'var(--color-text-muted)', padding: 4 }}>
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
