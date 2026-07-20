import React from 'react';
import { Sparkles, ChevronRight, AlertOctagon, BrainCircuit, Activity } from 'lucide-react';

const NotificationAIPanel = ({ isExpanded, onToggle }) => {
  return (
    <div style={{
      width: isExpanded ? '320px' : '64px',
      backgroundColor: 'var(--color-surface)',
      borderLeft: '1px solid var(--color-border)',
      borderRight: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
      borderTop: '1px solid var(--color-border)',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden',
      height: 'calc(100vh - 120px)',
      position: 'sticky',
      top: '100px',
      flexShrink: 0,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'space-between' : 'center', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(139, 92, 246, 0.05)' }}>
        {isExpanded && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '8px', backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Sparkles size={14} />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>AI Assistant</h3>
          </div>
        )}
        <button 
          onClick={onToggle}
          style={{ padding: '8px', background: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="hover:bg-slate-50"
        >
          {isExpanded ? <ChevronRight size={16} color="var(--color-text-muted)" /> : <Sparkles size={16} color="#8b5cf6" />}
        </button>
      </div>

      <div style={{ flex: 1, padding: isExpanded ? '24px 16px' : '24px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }} className="hide-scrollbar">
        
        {/* Today's Summary */}
        <div style={{ padding: isExpanded ? '0' : '0 8px', display: 'flex', flexDirection: 'column', alignItems: isExpanded ? 'stretch' : 'center' }}>
          {isExpanded && <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Today's Summary</h4>}
          <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', padding: isExpanded ? '16px' : '12px 8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {isExpanded ? (
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ color: 'var(--color-primary)' }}>•</span> Engineering manager missing</li>
                <li style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ color: 'var(--color-primary)' }}>•</span> 3 approvals pending</li>
                <li style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ color: 'var(--color-primary)' }}>•</span> Finance workflow changed</li>
              </ul>
            ) : (
              <Activity size={20} color="var(--color-primary)" />
            )}
          </div>
        </div>

        {/* Recommended Actions */}
        <div style={{ padding: isExpanded ? '0' : '0 8px', display: 'flex', flexDirection: 'column', alignItems: isExpanded ? 'stretch' : 'center' }}>
          {isExpanded && <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Recommended Actions</h4>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { text: 'Assign Engineering Manager', icon: AlertOctagon, color: 'var(--color-danger)' },
              { text: 'Review Finance workflow', icon: BrainCircuit, color: 'var(--color-warning)' }
            ].map((action, idx) => (
              <div key={idx} className="hover-lift" style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', padding: isExpanded ? '12px 16px' : '12px 8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <action.icon size={16} color={action.color} />
                {isExpanded && <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{action.text}</span>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationAIPanel;
