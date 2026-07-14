import React from 'react';
import { X, AlertTriangle, ShieldAlert, FileText, UserPlus, FileOutput, Users, ArrowRight, GitMerge, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';

const AnalysisDrawer = ({ isOpen, onClose, issue }) => {
  const navigate = useNavigate();
  const { addToast } = useUIStore();

  if (!isOpen || !issue) return null;

  const handleAction = (actionName) => {
    addToast(`${actionName} action triggered successfully.`, 'success');
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
        backgroundColor: 'var(--color-surface)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid var(--color-border)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ padding: '4px 8px', borderRadius: 6, fontSize: '12px', fontWeight: 700, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', letterSpacing: '0.05em' }}>
                {issue.priority?.toUpperCase() || 'HIGH'} PRIORITY
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>• {issue.department || 'Engineering'}</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, lineHeight: 1.3 }}>
              {issue.title || issue.action}
            </h2>
          </div>
          <button onClick={onClose} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          
          <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Risk Score</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: 8 }}>
                94 <ShieldAlert size={20} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Affected Employees</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {issue.impactCount || 12}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Responsible Manager</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginTop: 8 }}>
                David Chen
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>AI Explanation</h3>
            <div style={{ padding: '16px', backgroundColor: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.2)', borderRadius: 12, fontSize: '15px', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
              Our structural analysis models have detected that this specific node has exceeded the recommended managerial span of control by 45%. Historically within your organization, teams exceeding this threshold see a 12% drop in quarterly project completion rates and a heightened flight risk.
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Root Cause Analysis</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: 20, fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Recent merger with the backend infrastructure team added 6 direct reports.</li>
              <li>Two mid-level managers left the organization last month without replacement.</li>
              <li>Approval workflows are bottlenecking at a single node.</li>
            </ul>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Proposed Solution</h3>
            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Estimated Impact</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>+4% Organization Health</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Cost Reduction</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>$14,500 / quarter (efficiency gain)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Suggested Timeline</span>
                <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>Immediate</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <button className="btn-secondary" onClick={() => handleAction('Assign Manager')} style={{ padding: '10px', borderRadius: 8, fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <UserPlus size={16} /> Assign Manager
            </button>
            <button className="btn-secondary" onClick={() => navigate('/studio')} style={{ padding: '10px', borderRadius: 8, fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <GitMerge size={16} /> Open Studio
            </button>
            <button className="btn-secondary" onClick={() => handleAction('Export PDF')} style={{ padding: '10px', borderRadius: 8, fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <FileOutput size={16} /> Export PDF
            </button>
            <button className="btn-secondary" onClick={() => navigate('/audit')} style={{ padding: '10px', borderRadius: 8, fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <FileSpreadsheet size={16} /> View Audit History
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-secondary" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 8, fontSize: '15px', fontWeight: 600 }}>
              Resolve Later
            </button>
            <button className="btn-primary" onClick={() => { onClose(); handleAction('Apply Solution Fix'); }} style={{ flex: 1, padding: '12px', borderRadius: 8, fontSize: '15px', fontWeight: 600, backgroundColor: 'var(--color-primary)' }}>
              Apply Fix Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisDrawer;
