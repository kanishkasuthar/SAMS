import React from 'react';
import { Zap, AlertTriangle, CheckCircle2, Info, ArrowRight, X } from 'lucide-react';

const INSIGHTS = [
  {
    id: 1,
    title: 'Engineering workload increased by 32%',
    priority: 'High',
    type: 'warning',
    icon: AlertTriangle,
    buttons: [
      { label: 'View Analysis', primary: true },
      { label: 'Apply Recommendation', primary: false },
      { label: 'Dismiss', icon: X }
    ]
  },
  {
    id: 2,
    title: 'HR approval cycle improved by 18%',
    priority: 'Low',
    type: 'success',
    icon: CheckCircle2,
    buttons: [
      { label: 'Open Details', primary: true }
    ]
  },
  {
    id: 3,
    title: 'Finance has pending approvals older than 7 days',
    priority: 'Medium',
    type: 'info',
    icon: Info,
    buttons: [
      { label: 'Investigate', primary: true }
    ]
  }
];

const getPriorityStyle = (priority) => {
  if (priority === 'High') return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' };
  if (priority === 'Medium') return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' };
  return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' };
};

const AIInsightsPanel = ({ onInsightClick }) => {
  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>AI Intelligence</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Automated anomalies and structural recommendations.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
        {INSIGHTS.map((insight) => {
          const Icon = insight.icon;
          const priorityStyle = getPriorityStyle(insight.priority);

          return (
            <div 
              key={insight.id} 
              style={{ 
                padding: '16px', 
                borderBottom: '1px solid var(--color-border)', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                cursor: 'pointer'
              }}
              className="hover-bg"
              onClick={() => onInsightClick && onInsightClick(insight)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Icon size={18} color={priorityStyle.color} style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px', lineHeight: 1.4 }}>
                      {insight.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: priorityStyle.color }}>
                      Priority: {insight.priority}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginLeft: '30px' }}>
                {insight.buttons.map((btn, idx) => (
                  <button 
                    key={idx}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: btn.primary ? 'none' : '1px solid var(--color-border)',
                      backgroundColor: btn.primary ? 'var(--color-primary)' : 'white',
                      color: btn.primary ? 'white' : 'var(--color-text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {btn.icon ? <btn.icon size={14} /> : null}
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsightsPanel;
