import React, { useState } from 'react';
import { Activity, Network, DollarSign, Users, Target, LayoutTemplate, Briefcase, ChevronRight, ChevronLeft } from 'lucide-react';

const AIDifferencePanel = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const diffs = [
    { label: 'Org Similarity', value: '91%', trend: 'Stable', icon: LayoutTemplate, color: 'var(--color-primary)' },
    { label: 'Authority Change', value: '-8%', trend: 'Down', icon: Network, color: 'var(--color-warning)' },
    { label: 'Budget Diff', value: '+$1.2M', trend: 'Up', icon: DollarSign, color: 'var(--color-success)' },
    { label: 'Depts Changed', value: '3', trend: 'Modified', icon: Target, color: '#3b82f6' },
    { label: 'Employees Added', value: '12', trend: 'Added', icon: Users, color: 'var(--color-success)' },
    { label: 'Employees Removed', value: '4', trend: 'Removed', icon: Users, color: 'var(--color-danger)' },
    { label: 'Reporting Changes', value: '18', trend: 'Transferred', icon: Briefcase, color: 'var(--color-warning)' },
    { label: 'Decision Flows', value: '7', trend: 'Modified', icon: Activity, color: '#3b82f6' }
  ];

  return (
    <div style={{
      width: isExpanded ? '320px' : '80px',
      backgroundColor: 'white',
      borderLeft: '1px solid var(--color-border)',
      borderRight: '1px solid var(--color-border)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
      borderRadius: '16px',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'space-between' : 'center', padding: '24px 16px', borderBottom: '1px solid var(--color-surface-hover)', backgroundColor: 'var(--color-surface)' }}>
        {isExpanded && <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>AI Insights</h3>}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ padding: '8px', background: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="hover:bg-slate-100"
        >
          {isExpanded ? <ChevronRight size={16} color="var(--color-text-muted)" /> : <ChevronLeft size={16} color="var(--color-text-muted)" />}
        </button>
      </div>

      <div style={{ padding: isExpanded ? '24px 16px' : '24px 0', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }} className="hide-scrollbar">
        {diffs.map((diff, idx) => (
          <div key={idx} style={{ padding: isExpanded ? '16px' : '12px 0', backgroundColor: 'var(--color-surface-alt)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'flex-start' : 'center', gap: '16px', border: '1px solid var(--color-border)' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <diff.icon size={20} color={diff.color} />
            </div>
            
            {isExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 2 }}>{diff.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>{diff.value}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: diff.color, backgroundColor: 'white', padding: '4px 8px', borderRadius: '12px' }}>{diff.trend}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIDifferencePanel;
