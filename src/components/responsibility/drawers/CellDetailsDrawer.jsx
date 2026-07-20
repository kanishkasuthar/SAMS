import React from 'react';
import { X, FileText, Building2, User, Activity, AlertTriangle, GitPullRequest, ShieldAlert, History, Edit2, ExternalLink } from 'lucide-react';

const getStatusColor = (status) => {
  if (status === 'Overloaded') return 'var(--color-danger)'; // Or a darker red if available in CSS
  if (status === 'Critical') return 'var(--color-danger)';
  if (status === 'High') return '#F97316';
  if (status === 'Medium') return '#F59E0B';
  return 'var(--color-success)';
};

const CellDetailsDrawer = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const statusColor = getStatusColor(data.status);
  const bgStatusColor = statusColor.replace('var(', '').replace(')', '') === '--color-danger' ? 'rgba(239,68,68,0.1)' : 'rgba(249,115,22,0.1)';

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
          <div style={{ width: '48px', height: '48px', backgroundColor: 'white', borderRadius: '12px', border: `2px solid ${statusColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: statusColor }}>{data.intensity}%</span>
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: statusColor, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              {data.status} Workload
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--color-text-main)', lineHeight: 1.2 }}>{data.processName}</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>{data.deptName} Department</p>
          </div>
        </div>
        <button onClick={onClose} className="hover-bg" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Core Attributes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={14} /> Assigned Employee
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="https://i.pravatar.cc/150?u=b" alt="Owner" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>Marcus Johnson</span>
            </div>
          </div>
          
          <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldAlert size={14} /> Responsibility Type
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>A</div>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>Accountable</span>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Activity size={14} /> Risk Score
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: statusColor }}>
              {Math.min(98, data.intensity + 5)}/100
            </div>
          </div>
          
          <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <History size={14} /> Last Updated
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Oct 24, 2026
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        {data.intensity >= 60 && (
          <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.2)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '13px', marginBottom: '8px' }}>
              <AlertTriangle size={16} /> AI Workload Recommendation
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
              This cell indicates a high bottleneck risk. We recommend delegating execution (R) tasks to a sub-department or transferring Consultation (C) duties to automated workflows to reduce the {data.intensity}% load.
            </div>
          </div>
        )}

        {/* Linked Workflow */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
            <GitPullRequest size={16} color="var(--color-text-muted)" /> Linked Workflows
          </h3>
          <div className="hover-lift" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={16} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{data.processName} Flow</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>4 active steps • Approval pending</div>
              </div>
            </div>
            <ExternalLink size={16} color="var(--color-text-muted)" />
          </div>
        </div>

        {/* Activity History */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '12px', textTransform: 'uppercase' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
              <div style={{ color: 'var(--color-text-muted)', width: '70px', fontWeight: 600 }}>Oct 24</div>
              <div style={{ color: 'var(--color-text-main)' }}>Workload spiked from 65% to {data.intensity}%.</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
              <div style={{ color: 'var(--color-text-muted)', width: '70px', fontWeight: 600 }}>Oct 15</div>
              <div style={{ color: 'var(--color-text-main)' }}>Assigned to Marcus Johnson.</div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', backgroundColor: 'white' }}>
        <button style={{ flex: 1, padding: '12px', backgroundColor: 'white', color: 'var(--color-text-main)', borderRadius: '8px', fontWeight: 700, border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <Edit2 size={16} /> Edit Assignment
        </button>
        <button style={{ flex: 1, padding: '12px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          View Process
        </button>
      </div>
    </div>
  );
};

export default CellDetailsDrawer;
