import React from 'react';
import { X, History, User, ShieldAlert, FileText, ArrowRight, RotateCcw, AlertCircle, FileSearch } from 'lucide-react';

const TimelineEventDrawer = ({ isOpen, onClose, eventId }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: isOpen ? 0 : '-500px',
      bottom: 0,
      width: '480px',
      backgroundColor: 'white',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
      transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid var(--color-border)'
    }}>
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <History size={24} color="#8B5CF6" />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#8B5CF6', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              Responsibility Transfer
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--color-text-main)', lineHeight: 1.2 }}>Quarterly Reporting</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Oct 24, 2026 at 10:42 AM</p>
          </div>
        </div>
        <button onClick={onClose} className="hover-bg" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Ownership Change */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img src="https://i.pravatar.cc/150?u=a" alt="Old Owner" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>Sarah Chen</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Finance</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--color-text-muted)' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Accountable</span>
            <ArrowRight size={20} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>EB</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>Exec Board</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Executive</div>
            </div>
          </div>
        </div>

        {/* Change Reason & Audit */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '12px', textTransform: 'uppercase' }}>Change Details</h3>
          <div style={{ fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.5, backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <strong>Reason for change:</strong> Realigned accountability to match new SEC compliance guidelines requiring board-level sign-off for all quarterly disclosures.
          </div>
        </div>

        {/* AI Analysis */}
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)', fontWeight: 800, fontSize: '13px', marginBottom: '8px' }}>
            <ShieldAlert size={16} /> Impact Analysis
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
            This change resolves a previously flagged compliance risk. The Executive Board now has final authority, adding approximately 2 days to the overall cycle time but removing regulatory liability from the Finance department.
          </div>
        </div>

        {/* Audit Log */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '12px', textTransform: 'uppercase' }}>System Audit Log</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
              <span style={{ width: '60px' }}>10:42 AM</span>
              <span style={{ color: 'var(--color-text-main)' }}>Change committed to DB.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
              <span style={{ width: '60px' }}>10:41 AM</span>
              <span style={{ color: 'var(--color-text-main)' }}>Approved by Compliance Bot.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
              <span style={{ width: '60px' }}>10:30 AM</span>
              <span style={{ color: 'var(--color-text-main)' }}>Requested by Sarah Chen.</span>
            </div>
          </div>
        </div>

        {/* Linked Documents */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '12px', textTransform: 'uppercase' }}>Supporting Documents</h3>
          <div className="hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
            <FileSearch size={18} color="var(--color-primary)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>SEC Guideline Review Q3.pdf</span>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', backgroundColor: 'white' }}>
        <button style={{ flex: 1, padding: '12px', backgroundColor: 'white', color: 'var(--color-danger)', borderRadius: '8px', fontWeight: 700, border: '1px solid var(--color-danger)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
          <RotateCcw size={16} /> Rollback Change
        </button>
      </div>
    </div>
  );
};

export default TimelineEventDrawer;
