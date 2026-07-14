import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Drawer = ({ isOpen, onClose, title, children, width = 450 }) => {
  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.2)', 
          backdropFilter: 'blur(2px)', 
          zIndex: 9999, 
          animation: 'fadeIn 0.2s' 
        }}
      ></div>

      {/* Drawer Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width,
        backgroundColor: 'var(--color-surface)',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{ 
          padding: 'var(--space-3)', 
          borderBottom: '1px solid var(--color-border)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>{title}</h2>
          <button 
            onClick={onClose} 
            className="hover:bg-slate-100"
            style={{ 
              background: 'transparent', border: 'none', cursor: 'pointer', 
              color: 'var(--color-text-muted)', padding: 6, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-3)' }}>
          {children}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </>
  );
};

export default Drawer;
