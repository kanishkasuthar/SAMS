import React from 'react';
import { X, Clock, Calendar, Undo2, User, ArrowRight, Activity, FileSpreadsheet } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useOrgStore } from '../../store/orgStore';

const AuditDetailDrawer = ({ isOpen, onClose, log }) => {
  const { addToast } = useUIStore();
  const { undo } = useOrgStore();

  if (!isOpen || !log) return null;

  const handleRollback = () => {
    onClose();
    undo();
    addToast('Changes rolled back successfully via audit log.', 'success');
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 600,
        backgroundColor: 'var(--color-bg)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid var(--color-border)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 32px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audit Record</span>
              <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: 12, backgroundColor: 'var(--color-surface-alt)', color: 'var(--color-text-muted)' }}>ID: #{log.id}</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
              {log.action}
            </h2>
          </div>
          <button onClick={onClose} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          <div style={{ display: 'flex', gap: 24, padding: 24, backgroundColor: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={14} /> Performed By
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>{log.user || 'System Admin'}</div>
            </div>
            <div style={{ flex: 1, borderLeft: '1px solid var(--color-border)', paddingLeft: 24 }}>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={14} /> Date & Time
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>{log.timestamp}</div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--color-text-main)' }}>Description</h3>
            <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6, padding: 16, backgroundColor: 'var(--color-surface-alt)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
              {log.details}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--color-text-main)' }}>State Diff</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', backgroundColor: 'var(--color-surface)' }}>
                <div style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderBottom: '1px solid rgba(239, 68, 68, 0.1)' }}>Old Value</div>
                <div style={{ width: 1, backgroundColor: 'var(--color-border)' }}></div>
                <div style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>New Value</div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', backgroundColor: 'var(--color-surface)' }}>
                <div style={{ padding: '16px', fontSize: '14px', fontFamily: 'monospace', color: 'var(--color-danger)', backgroundColor: 'rgba(239, 68, 68, 0.02)' }}>
                  Manager: Unassigned<br/>
                  Direct Reports: 0<br/>
                  Approval Level: Tier 1
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', color: 'var(--color-text-muted)' }}>
                  <ArrowRight size={16} />
                </div>
                <div style={{ padding: '16px', fontSize: '14px', fontFamily: 'monospace', color: 'var(--color-success)', backgroundColor: 'rgba(16, 185, 129, 0.02)' }}>
                  Manager: Assigned<br/>
                  Direct Reports: 6<br/>
                  Approval Level: Tier 2
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-alt)', display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          <button className="btn-secondary" onClick={onClose} style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600 }}>
            Close
          </button>
          <button className="btn-secondary" onClick={() => addToast('System states synced.', 'info')} style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={18} /> Verify System State
          </button>
          <button className="btn-primary" onClick={handleRollback} style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, backgroundColor: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Undo2 size={18} /> Rollback Change
          </button>
        </div>
      </div>
    </>
  );
};

export default AuditDetailDrawer;
