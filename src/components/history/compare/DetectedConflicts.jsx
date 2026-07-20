import React from 'react';
import Card from '../../common/Card';
import { AlertTriangle, AlertCircle, AlertOctagon, Maximize } from 'lucide-react';

const DetectedConflicts = () => {
  const conflicts = [
    { 
      severity: 'CRITICAL', 
      text: 'Engineering has no manager assigned.', 
      departments: 'Engineering',
      fix: 'Assign temporary department head',
      icon: AlertOctagon, 
      color: 'var(--color-danger)', 
      bg: 'rgba(239, 68, 68, 0.05)' 
    },
    { 
      severity: 'WARNING', 
      text: 'Finance approval chain broken.', 
      departments: 'Finance',
      fix: 'Re-route approvals to CFO',
      icon: AlertTriangle, 
      color: 'var(--color-warning)', 
      bg: 'rgba(245, 158, 11, 0.05)' 
    },
    { 
      severity: 'NOTE', 
      text: 'Authority duplication detected.', 
      departments: 'HR, Legal',
      fix: 'Review responsibility matrix',
      icon: AlertCircle, 
      color: '#3b82f6', 
      bg: 'rgba(59, 130, 246, 0.05)' 
    }
  ];

  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>Detected Conflicts</h3>
        <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}>1 Critical Issue</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {conflicts.map((conf, idx) => (
          <Card key={idx} style={{ padding: 0, backgroundColor: 'white', border: `1px solid var(--color-border)`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} className="hover-lift">
            <div style={{ padding: '16px', borderBottom: '1px solid var(--color-surface-hover)', display: 'flex', alignItems: 'center', gap: 12, backgroundColor: conf.bg }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <conf.icon size={16} color={conf.color} />
              </div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: conf.color, letterSpacing: '0.05em' }}>{conf.severity}</div>
            </div>
            <div style={{ padding: '20px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 600, lineHeight: 1.4 }}>{conf.text}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Affected:</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-main)', fontWeight: 600 }}>{conf.departments}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Action:</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-main)', fontWeight: 600 }}>{conf.fix}</span>
                </div>
              </div>
            </div>
            <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-surface-alt)', borderTop: '1px solid var(--color-surface-hover)' }}>
              <button style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '8px', backgroundColor: 'white', color: 'var(--color-text-main)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} className="hover:bg-slate-50">
                <Maximize size={14} />
                View in Hierarchy
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DetectedConflicts;
