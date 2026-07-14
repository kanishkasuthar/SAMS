import React from 'react';
import { X, AlertTriangle, Users, Map, Clock, FileText, Share2, Activity } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';

const DepartmentRiskDrawer = ({ isOpen, onClose, department }) => {
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  if (!isOpen || !department) return null;

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
        width: 800,
        backgroundColor: 'var(--color-bg)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid var(--color-border)'
      }}>
        {/* Header */}
        <div style={{ padding: '32px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Risk Analysis</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
              {department.dept} Department
              <span style={{ fontSize: '14px', padding: '4px 12px', borderRadius: 16, backgroundColor: department.riskLevel === 'Critical' || department.riskLevel === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: department.riskLevel === 'Critical' || department.riskLevel === 'High' ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                {department.riskLevel} Risk
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { addToast('Department report shared.', 'success'); }} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
              <Share2 size={20} />
            </button>
            <button onClick={onClose} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Risk Score</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-danger)' }}>{department.score}/100</div>
            </div>
            <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Impacted Employees</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-main)' }}>{Math.floor(Math.random() * 40) + 10}</div>
            </div>
            <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Critical Factors</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-main)' }}>{department.factors.length}</div>
            </div>
          </div>

          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={20} color="var(--color-warning)" /> Risk Factors
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {department.factors.map((factor, i) => (
                <div key={i} style={{ padding: 16, backgroundColor: 'var(--color-surface-alt)', borderRadius: 12, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ padding: 8, backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 8, color: 'var(--color-danger)' }}>
                    <Activity size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 4 }}>{factor}</div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>This factor contributes significantly to the overall structural risk and manager burnout within this department. Immediate review is recommended.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Map size={20} color="var(--color-primary)" /> Department Map Preview
            </h3>
            <div style={{ width: '100%', height: 200, backgroundColor: 'var(--color-surface-alt)', borderRadius: 12, border: '1px dashed var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
              <Map size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
              <div>Interactive topology map loading...</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-alt)', display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          <button className="btn-secondary" onClick={onClose} style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600 }}>
            Close
          </button>
          <button className="btn-primary" onClick={() => { onClose(); navigate('/studio'); }} style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, backgroundColor: 'var(--color-primary)' }}>
            Open in Organization Studio
          </button>
        </div>
      </div>
    </>
  );
};

export default DepartmentRiskDrawer;
