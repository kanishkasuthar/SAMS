import React from 'react';
import { X, AlertCircle, AlertTriangle } from 'lucide-react';

const FlowValidationModal = ({ isOpen, onClose, onSaveAnyway }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '500px', animation: 'scale-in 0.2s ease-out', overflow: 'hidden' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
              <AlertCircle size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-danger)', margin: '0 0 4px 0' }}>Flow Validation</h2>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>2 Issues Detected</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', gap: '12px', padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
            <AlertTriangle size={18} color="var(--color-warning)" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>Missing Fallback Authority</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>CFO Approval has no fallback authority assigned.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
            <AlertTriangle size={18} color="var(--color-warning)" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>Disconnected Node</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Emergency Escalation is not connected to the flow.</div>
            </div>
          </div>

        </div>

        <div style={{ padding: '16px 24px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Review Issues</button>
          <button onClick={() => { onSaveAnyway(); onClose(); }} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-danger)', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Save Anyway</button>
        </div>

      </div>
    </div>
  );
};

export default FlowValidationModal;
