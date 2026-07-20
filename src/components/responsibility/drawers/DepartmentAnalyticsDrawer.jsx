import React from 'react';
import { X, Building2, BarChart2, Users, Network, TrendingUp, AlertTriangle, Briefcase, Zap, GitCommit } from 'lucide-react';

const DepartmentAnalyticsDrawer = ({ isOpen, onClose, departmentId }) => {
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
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-danger)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>
            <Building2 size={24} color="white" />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-danger)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              Critical Load
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)', lineHeight: 1.2 }}>Finance Department</h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>Collaboration & Authority Analytics</p>
          </div>
        </div>
        <button onClick={onClose} className="hover-bg" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Authority & Load Scores */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Authority Score</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-main)' }}>82</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-muted)' }}>/100</span>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-danger)', textTransform: 'uppercase', marginBottom: '8px' }}>Responsibility Load</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-danger)' }}>95</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-danger)' }}>%</span>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.2)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '13px', marginBottom: '8px' }}>
            <Zap size={16} /> Load Balancing Insight
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
            Finance is operating at 95% capacity on accountability tasks. Recommend shifting "Consulted" (C) tasks to Engineering where collaboration is highest (88% overlap).
          </div>
        </div>

        {/* RACI Distribution Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Responsible (R)</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>14 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-muted)' }}>Procs</span></div>
          </div>
          <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Accountable (A)</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-danger)' }}>6 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-muted)' }}>Procs</span></div>
          </div>
          <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Consulted (C)</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-warning)' }}>22 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-muted)' }}>Procs</span></div>
          </div>
          <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Avg Cycle Time</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)' }}>2.4 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-muted)' }}>Days</span></div>
          </div>
        </div>

        {/* Linked Projects */}
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
            <Briefcase size={16} color="var(--color-text-muted)" /> Active Initiatives
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="hover-lift" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: '10px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Q4 Budget Planning</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Due: Nov 15</span>
            </div>
            <div className="hover-lift" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: '10px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-warning)' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Multi-Cloud Cost Audit</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Due: Dec 01</span>
            </div>
          </div>
        </div>

        {/* Organizational Hierarchy Context */}
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
            <GitCommit size={16} color="var(--color-text-muted)" /> Hierarchy Context
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '8px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
              <div style={{ width: '2px', height: '24px', backgroundColor: 'var(--color-border)', position: 'absolute', left: '15px', top: '32px' }} />
              <img src="https://i.pravatar.cc/150?u=exec1" alt="CEO" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 0 1px var(--color-border)' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Amanda Vance</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Chief Executive Officer (Reports To)</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
              <div style={{ width: '2px', height: '24px', backgroundColor: 'var(--color-border)', position: 'absolute', left: '15px', top: '32px' }} />
              <img src="https://i.pravatar.cc/150?u=a" alt="CFO" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--color-primary)' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)' }}>Sarah Chen</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Chief Financial Officer (Dept Head)</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src="https://i.pravatar.cc/150?u=c" alt="VP" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 0 1px var(--color-border)' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Michael Chang</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>VP Finance (Direct Report)</div>
              </div>
            </div>

          </div>
        </div>

      </div>
      
      {/* Footer */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', backgroundColor: 'white' }}>
        <button style={{ flex: 1, padding: '12px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          Open Organization Studio
        </button>
      </div>
    </div>
  );
};

export default DepartmentAnalyticsDrawer;
