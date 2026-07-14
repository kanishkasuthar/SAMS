import React, { useState } from 'react';
import { X, Send, Paperclip, Loader2, Maximize2, Minimize2, AtSign, Smile } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const EmailComposerModal = ({ isOpen, onClose, employeeName }) => {
  const { addToast } = useUIStore();
  const [isSending, setIsSending] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [subject, setSubject] = useState(`Following up: Structural adjustments`);
  const [body, setBody] = useState(`Hi ${employeeName ? employeeName.split(' ')[0] : 'there'},\n\nI wanted to connect regarding the upcoming organizational changes we discussed. Let me know when you have time for a quick alignment sync.\n\nBest,\nSystem Admin`);

  if (!isOpen) return null;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addToast(`Email sent to ${employeeName || 'employee'}.`, 'success');
      onClose();
    }, 1500);
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 99998 }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        bottom: isMaximized ? 0 : 24,
        right: isMaximized ? 0 : 24,
        width: isMaximized ? '100vw' : 600,
        height: isMaximized ? '100vh' : 500,
        backgroundColor: 'var(--color-surface)',
        borderRadius: isMaximized ? 0 : 16,
        boxShadow: 'var(--shadow-xl)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        border: isMaximized ? 'none' : '1px solid var(--color-border)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>New Message</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setIsMaximized(!isMaximized)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: 4 }} className="hover:text-primary">
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: 4 }} className="hover:text-danger">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ padding: '0 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 40, fontSize: '13px', color: 'var(--color-text-muted)' }}>To</div>
          <input type="text" value={employeeName || ''} readOnly style={{ flex: 1, border: 'none', padding: '12px 0', fontSize: '14px', color: 'var(--color-text-main)', outline: 'none', background: 'transparent' }} />
        </div>
        <div style={{ padding: '0 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 40, fontSize: '13px', color: 'var(--color-text-muted)' }}>Subject</div>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ flex: 1, border: 'none', padding: '12px 0', fontSize: '14px', color: 'var(--color-text-main)', outline: 'none', background: 'transparent' }} placeholder="Subject" />
        </div>

        {/* Text Area */}
        <textarea 
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ flex: 1, border: 'none', padding: '16px', fontSize: '14px', color: 'var(--color-text-main)', outline: 'none', resize: 'none', fontFamily: 'inherit', background: 'transparent' }}
        />

        {/* Footer Actions */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}><Paperclip size={18} /></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}><AtSign size={18} /></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}><Smile size={18} /></button>
          </div>
          
          <button 
            className="btn-primary" 
            onClick={handleSend}
            disabled={isSending}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 24px', borderRadius: 20, fontSize: '14px', fontWeight: 600 }}
          >
            {isSending ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</> : <><Send size={16} /> Send</>}
          </button>
        </div>
      </div>
    </>
  );
};

export default EmailComposerModal;
