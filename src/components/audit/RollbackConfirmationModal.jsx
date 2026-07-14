import React, { useState } from 'react';
import { X, AlertTriangle, History, ArrowLeft, Loader2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const RollbackConfirmationModal = ({ isOpen, onClose }) => {
  const { addToast } = useUIStore();
  const [confirmText, setConfirmText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleRollback = () => {
    if (confirmText !== 'ROLLBACK') return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      addToast('Global state successfully rolled back to selected point.', 'success');
      onClose();
    }, 2000);
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={!isProcessing ? onClose : undefined}
      />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 500, backgroundColor: 'var(--color-surface)', borderRadius: 16,
        boxShadow: 'var(--shadow-xl)', zIndex: 9999, display: 'flex', flexDirection: 'column',
        animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)', border: '1px solid var(--color-danger)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-danger)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertTriangle size={24} /> Global State Rollback
            </h2>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <History size={16} /> Rewinding to Oct 24, 2026 - 14:30 EST
            </div>
          </div>
          <button onClick={onClose} disabled={isProcessing} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: 24, fontSize: '14px', color: 'var(--color-danger)', lineHeight: 1.5 }}>
            <strong>WARNING:</strong> This is a destructive action. Rolling back will undo <strong>12</strong> structural changes made after this point. All affected employees will be reassigned to their previous managers and 3 active projects will lose their resource allocation.
          </div>

          <div style={{ marginBottom: 8, fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>
            Please type <span style={{ fontFamily: 'monospace', backgroundColor: 'var(--color-surface-hover)', padding: '2px 6px', borderRadius: 4, color: 'var(--color-danger)' }}>ROLLBACK</span> to confirm.
          </div>
          
          <input 
            type="text" 
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            disabled={isProcessing}
            placeholder="Type ROLLBACK"
            style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: 8, border: '1px solid var(--color-border)', outline: 'none', transition: 'all 0.2s', borderColor: confirmText === 'ROLLBACK' ? 'var(--color-success)' : 'var(--color-border)' }}
          />
        </div>

        {/* Footer */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: 12, backgroundColor: 'var(--color-surface-alt)' }}>
          <button 
            className="btn-secondary" 
            onClick={onClose} 
            disabled={isProcessing}
            style={{ padding: '10px 20px', borderRadius: 8, fontSize: '14px', fontWeight: 600 }}
          >
            Cancel
          </button>
          <button 
            onClick={handleRollback} 
            disabled={confirmText !== 'ROLLBACK' || isProcessing}
            style={{ 
              padding: '10px 24px', borderRadius: 8, fontSize: '14px', fontWeight: 600, 
              display: 'flex', alignItems: 'center', gap: 8, border: 'none',
              backgroundColor: confirmText === 'ROLLBACK' ? 'var(--color-danger)' : 'var(--color-surface-hover)', 
              color: confirmText === 'ROLLBACK' ? 'white' : 'var(--color-text-muted)',
              cursor: confirmText === 'ROLLBACK' && !isProcessing ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
          >
            {isProcessing ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</> : <><ArrowLeft size={16} /> Execute Rollback</>}
          </button>
        </div>
      </div>
    </>
  );
};

export default RollbackConfirmationModal;
