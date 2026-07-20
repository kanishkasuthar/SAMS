import React from 'react';
import Card from '../../common/Card';
import { Sparkles, RotateCcw, FileText, LayoutDashboard, UserPlus, Merge } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';

const RecommendedActions = () => {
  const { addToast } = useUIStore();

  const handleAction = (label) => {
    addToast(`Executing action: ${label}`, 'success');
  };

  const actions = [
    { label: 'Auto Resolve Conflicts', icon: Sparkles, primary: true },
    { label: 'Preview Rollback', icon: RotateCcw },
    { label: 'Generate AI Report', icon: FileText },
    { label: 'Open Department', icon: LayoutDashboard },
    { label: 'Assign Manager', icon: UserPlus },
    { label: 'Merge Changes', icon: Merge }
  ];

  return (
    <Card style={{ padding: '20px', backgroundColor: 'var(--color-surface)' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 16px 0', color: 'var(--color-text-main)' }}>Recommended Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {actions.map((act, idx) => (
          <button 
            key={idx}
            onClick={() => handleAction(act.label)}
            style={{ 
              padding: '10px 12px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              backgroundColor: act.primary ? 'var(--color-primary)' : 'white', 
              border: act.primary ? 'none' : '1px solid var(--color-border)', 
              borderRadius: '8px', 
              color: act.primary ? 'white' : 'var(--color-text-main)', 
              fontSize: '12px', 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              gridColumn: act.primary ? 'span 2' : 'span 1',
              justifyContent: act.primary ? 'center' : 'flex-start'
            }}
            className={act.primary ? 'hover:bg-indigo-700 hover-lift' : 'hover:bg-slate-50 hover-lift'}
          >
            <act.icon size={14} /> {act.label}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default RecommendedActions;
