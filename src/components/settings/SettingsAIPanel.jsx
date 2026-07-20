import React from 'react';
import { Sparkles, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';

const SettingsAIPanel = ({ isExpanded, onToggle }) => {
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
        
        <div style={{ padding: isExpanded ? '0' : '0 8px', display: 'flex', flexDirection: 'column', alignItems: isExpanded ? 'stretch' : 'center' }}>
          {isExpanded ? (
            <>
              <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Platform Configuration Health
              </h4>
              <hr style={{ border: 'none', borderTop: '2px solid var(--color-border)', marginBottom: '16px' }} />
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Overall Score:</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)' }}>94<span style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>/100</span></span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  { text: 'Security Configuration', icon: CheckCircle2, color: 'var(--color-success)' },
                  { text: 'AI Configuration', icon: CheckCircle2, color: 'var(--color-success)' },
                  { text: 'Database Connected', icon: CheckCircle2, color: 'var(--color-success)' },
                  { text: 'Integrations Active', icon: CheckCircle2, color: 'var(--color-success)' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={16} color={item.color} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  { text: 'Backup Schedule Missing', icon: AlertTriangle, color: 'var(--color-warning)' },
                  { text: 'MFA Recommended', icon: AlertTriangle, color: 'var(--color-warning)' },
                  { text: 'Session Timeout Too Long', icon: AlertTriangle, color: 'var(--color-warning)' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={16} color={item.color} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sparkles size={14} color="#8b5cf6" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase' }}>AI Recommendation:</span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--color-text-main)', margin: 0, fontWeight: 500 }}>
                  Enable MFA and automatic backups to improve your configuration score to 99%.
                </p>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>94</div>
              <CheckCircle2 size={20} color="var(--color-success)" />
              <AlertTriangle size={20} color="var(--color-warning)" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsAIPanel;
