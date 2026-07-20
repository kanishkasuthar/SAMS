import React from 'react';
import { X, GitBranch, Target, FileText, CheckCircle2, Link2, Users, AlertCircle, Clock, Zap } from 'lucide-react';

const ProcessIntelligenceDrawer = ({ isOpen, onClose, processId }) => {
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
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', backgroundColor: 'var(--color-success)', color: 'white', borderRadius: '16px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
            <CheckCircle2 size={12} /> Active Process
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)', lineHeight: 1.2 }}>Annual Budget Approval</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>Finalize fiscal year budget allocations</p>
        </div>
        <button onClick={onClose} className="hover-bg" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Risk & Performance Cards */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <AlertCircle color="var(--color-warning)" size={24} style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)' }}>Medium</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Risk Score</div>
          </div>
          <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <Clock color="var(--color-success)" size={24} style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)' }}>4 Days</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Avg Cycle Time</div>
          </div>
        </div>

        {/* AI Insight */}
        <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
            <Zap size={16} /> Process Optimization Insight
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
            This process involves 4 departments. The approval chain currently requires serial sign-offs. Parallelizing HR and Sales consultations could reduce cycle time by 24 hours.
          </div>
        </div>

        {/* Stakeholder Network */}
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="var(--color-text-muted)" /> Stakeholder Network
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
              <div style={{ width: '28px', height: '28px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>A</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Executive Board</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Accountable / Final Approver</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
              <div style={{ width: '28px', height: '28px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>R</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Finance</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Responsible / Executing</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
              <div style={{ width: '28px', height: '28px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>C</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Engineering, Sales</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Consulted / Advisors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Linked Integrations */}
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link2 size={18} color="var(--color-text-muted)" /> Linked Integrations
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
              <GitBranch size={20} color="var(--color-primary)" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>Decision Flow</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Mapped in Studio</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
              <FileText size={20} color="#10B981" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>Policy Docs</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>3 Attached files</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', backgroundColor: 'white' }}>
        <button style={{ flex: 1, padding: '12px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          Open in Decision Studio
        </button>
      </div>
    </div>
  );
};

export default ProcessIntelligenceDrawer;
