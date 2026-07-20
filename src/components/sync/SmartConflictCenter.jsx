import React from 'react';
import Card from '../common/Card';
import { AlertCircle, ArrowRight, Merge, Check, X, Eye } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const SmartConflictCenter = ({ onProceed }) => {
  const { addToast } = useUIStore();

  const handleAction = (action, issue) => {
    addToast(`${action} applied to ${issue}.`, 'success');
  };

  const conflicts = [
    {
      id: 1,
      type: 'Data Mismatch',
      severity: 'Medium',
      title: 'Reporting Structure Conflict',
      current: 'Reports to: EMP-842 (John Smith)',
      incoming: 'Reports to: EMP-102 (Sarah Connor)',
      ai: 'Incoming value matches recent organizational announcement. Recommend Accept.',
      color: 'var(--color-warning)'
    },
    {
      id: 2,
      type: 'Circular Dependency',
      severity: 'High',
      title: 'Invalid Hierarchy',
      current: 'Valid hierarchy',
      incoming: 'Creates circular reporting (A -> B -> A)',
      ai: 'Critical failure if applied. Recommend Reject.',
      color: 'var(--color-danger)'
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Smart Conflict Center</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', margin: '4px 0 0 0' }}>Review and resolve discrepancies before final import.</p>
        </div>
        <button className="sync-action-btn" onClick={onProceed} style={{ backgroundColor: 'var(--color-success)' }}>
          Review Changes <Eye size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {conflicts.map(conflict => (
          <Card key={conflict.id} style={{ padding: '20px', borderLeft: `4px solid ${conflict.color}` }}>
            <div className="flex justify-between items-start" style={{ marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: 12, backgroundColor: `${conflict.color}15`, color: conflict.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'inline-block' }}>
                  {conflict.severity} Severity • {conflict.type}
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{conflict.title}</h4>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', backgroundColor: 'var(--color-surface-hover)', padding: '4px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={14} /> AI Insight
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: 16 }}>
              <div style={{ flex: 1, padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>CURRENT VALUE</div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{conflict.current}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}>
                <ArrowRight size={20} />
              </div>
              <div style={{ flex: 1, padding: '12px', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: 8, border: '1px solid rgba(79, 70, 229, 0.2)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 4 }}>INCOMING VALUE</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-primary)' }}>{conflict.incoming}</div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
              <strong>AI Recommendation:</strong> {conflict.ai}
            </p>

            <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: 16 }}>
              <button onClick={() => handleAction('Accepted', conflict.title)} style={{ flex: 1, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'var(--color-success)', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }} className="hover-lift">
                <Check size={16} /> Accept Change
              </button>
              <button onClick={() => handleAction('Rejected', conflict.title)} style={{ flex: 1, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }} className="hover:bg-slate-200">
                <X size={16} /> Reject
              </button>
              <button onClick={() => handleAction('Merged', conflict.title)} style={{ flex: 1, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }} className="hover:bg-slate-200">
                <Merge size={16} /> Merge
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartConflictCenter;
