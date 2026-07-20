import React, { useState } from 'react';
import { X, Send, Paperclip, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CompactMessagingWorkspace = ({ isOpen, onClose, employee, onMessageSent }) => {
  const [message, setMessage] = useState('');

  if (!isOpen || !employee) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    onMessageSent(message);
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(2px)' }}
          onClick={onClose}
        />
        
        <motion.div
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
          style={{
            width: 450, backgroundColor: 'var(--color-bg)', borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden',
            border: '1px solid var(--color-border)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ position: 'relative' }}>
                {employee.photo ? (
                  <img src={employee.photo} alt={employee.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                    {employee.name.charAt(0)}
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', backgroundColor: employee.status === 'Online' ? 'var(--color-success)' : 'var(--color-border)', border: '2px solid var(--color-surface)' }} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{employee.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{employee.role}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ padding: 6, borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} color="var(--color-text-secondary)" />
            </button>
          </div>

          {/* History */}
          <div style={{ height: 250, backgroundColor: 'var(--color-surface-hover)', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-text-muted)', margin: '8px 0' }}>Today</div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <img src={employee.photo} style={{ width: 28, height: 28, borderRadius: '50%' }} alt="Avatar" />
              <div style={{ backgroundColor: 'var(--color-surface)', padding: '12px 16px', borderRadius: '12px', borderTopLeftRadius: 4, border: '1px solid var(--color-border)', fontSize: '13px', color: 'var(--color-text-main)', maxWidth: '80%' }}>
                Hey, let me know when you have time to discuss the new reorg mapping for Q4.
              </div>
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', backgroundColor: 'var(--color-bg)', padding: '8px 12px', borderRadius: '24px', border: '1px solid var(--color-border)' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }} title="Attach File">
                <Paperclip size={18} color="var(--color-text-muted)" />
              </button>
              <input 
                type="text" 
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={`Message ${employee.name.split(' ')[0]}...`}
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '14px', color: 'var(--color-text-main)' }}
                autoFocus
              />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }} title="Schedule Message">
                <Clock size={18} color="var(--color-text-muted)" />
              </button>
              <button 
                onClick={handleSend}
                style={{ padding: '6px', borderRadius: '50%', backgroundColor: message.trim() ? 'var(--color-primary)' : 'var(--color-surface-hover)', color: message.trim() ? 'white' : 'var(--color-text-muted)', border: 'none', cursor: message.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CompactMessagingWorkspace;
