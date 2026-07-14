import React, { useState } from 'react';
import { X, ArrowRight, Loader2, Undo2, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useOrgStore } from '../../store/orgStore';

const ConfirmationModal = ({ isOpen, onClose, issue }) => {
  const { addToast } = useUIStore();
  const { saveHistory, undo } = useOrgStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !issue) return null;

  const handleApply = () => {
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      saveHistory(); // Save state before change for rollback
      
      // We would actually update the store data here for a real mutation
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        addToast(
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontWeight: 600 }}>Fix Applied Successfully</div>
            <div>Hierarchy and audit logs updated.</div>
            <button 
              onClick={() => { undo(); addToast('Action rolled back successfully.', 'info'); }}
              style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <Undo2 size={14} /> Undo (30s)
            </button>
          </div>,
          'success',
          10000 // Keep open longer to allow undo
        );
      }, 1500);
    }, 1500);
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={!isProcessing ? onClose : undefined}
      />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        backgroundColor: 'var(--color-surface)',
        boxShadow: 'var(--shadow-xl)',
        borderRadius: 16,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {isSuccess ? (
          <div style={{ padding: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <CheckCircle2 size={64} color="var(--color-success)" style={{ marginBottom: 24, animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Change Applied</h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', maxWidth: 400 }}>
              The organization structure has been updated. All dependent systems, analytics, and audit logs have been synchronized.
            </p>
          </div>
        ) : (
          <>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Confirm Structural Change</h2>
              <button onClick={onClose} disabled={isProcessing} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', cursor: isProcessing ? 'not-allowed' : 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ fontSize: '15px', color: 'var(--color-text-main)', marginBottom: 24 }}>
                You are about to apply the following recommended fix: <strong style={{ color: 'var(--color-primary)' }}>{issue.action}</strong>.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center', backgroundColor: '#F8FAFC', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)', marginBottom: 32 }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', letterSpacing: '0.05em', marginBottom: 12 }}>CURRENT STATE</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-danger)' }}>1 Manager</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>26 Direct Reports</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>94% Workload</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRight size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.05em', marginBottom: 12 }}>PROPOSED CHANGE</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-success)' }}>2 Managers</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>13 Direct Reports (avg)</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>65% Workload</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Affected Employees</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>13 Employees Reassigned</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Rollback Option</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-success)' }}>Available for 30 days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12 }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Audit Trail</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Will be logged to Kanishka Suthar</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-alt)', display: 'flex', justifyContent: 'flex-end', gap: 12, borderRadius: '0 0 16px 16px' }}>
              <button className="btn-secondary" onClick={onClose} disabled={isProcessing} style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, opacity: isProcessing ? 0.5 : 1 }}>
                Cancel
              </button>
              <button className="btn-secondary" disabled={isProcessing} style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, opacity: isProcessing ? 0.5 : 1 }}>
                Preview in Simulator
              </button>
              <button className="btn-primary" onClick={handleApply} disabled={isProcessing} style={{ padding: '12px 32px', borderRadius: 8, fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)' }}>
                {isProcessing ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Applying...</> : 'Apply Changes'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ConfirmationModal;
