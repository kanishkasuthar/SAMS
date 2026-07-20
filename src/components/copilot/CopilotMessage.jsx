import React from 'react';
import { Bot, User, CheckCircle2, ChevronRight, AlertCircle, Zap } from 'lucide-react';
import { CopilotInlineCharts } from './CopilotInlineCharts';

export const CopilotMessage = ({ message }) => {
  const isAI = message.sender === 'ai';

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '20px',
      flexDirection: isAI ? 'row' : 'row-reverse',
      alignItems: 'flex-start'
    }}>
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        backgroundColor: isAI ? 'var(--color-primary)' : 'var(--color-surface)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: isAI ? 'none' : '1px solid var(--color-border)',
        color: isAI ? 'white' : 'var(--color-text-main)'
      }}>
        {isAI ? <Bot size={18} /> : <User size={18} />}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '85%',
        backgroundColor: isAI ? 'var(--color-bg)' : 'var(--color-primary)',
        color: isAI ? 'var(--color-text-main)' : 'white',
        padding: '14px 16px',
        borderRadius: isAI ? '2px 16px 16px 16px' : '16px 2px 16px 16px',
        border: isAI ? '1px solid var(--color-border)' : 'none',
        boxShadow: isAI ? 'var(--shadow-sm)' : '0 4px 12px rgba(139, 92, 246, 0.25)',
        fontSize: '14px',
        lineHeight: 1.5
      }}>
        <div style={{ whiteSpace: 'pre-wrap' }}>{message.text}</div>

        {/* Bullets */}
        {message.bullets && (
          <ul style={{ marginTop: '12px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {message.bullets.map((b, i) => (
              <li key={i} style={{ color: 'var(--color-text-secondary)' }}>{b}</li>
            ))}
          </ul>
        )}

        {/* Inline Charts */}
        {message.chart && <CopilotInlineCharts chart={message.chart} />}

        {/* Actionable Recommendations */}
        {message.recommendations && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
              Actionable Recommendations
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {message.recommendations.map(rec => (
                <div key={rec.id} style={{ 
                  backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '10px 12px',
                  display: 'flex', flexDirection: 'column', gap: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '13px' }}>{rec.text}</div>
                    <button className="icon-btn" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4px', borderRadius: '6px' }} title="Apply Action">
                      <Zap size={14} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: rec.priority === 'Critical' ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                      <AlertCircle size={12} /> {rec.priority} Priority
                    </span>
                    <span style={{ color: 'var(--color-text-muted)' }}>⏱ {rec.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
