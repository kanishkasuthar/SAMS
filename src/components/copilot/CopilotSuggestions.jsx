import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Users, FileBarChart, Mail } from 'lucide-react';

const SUGGESTIONS = [
  { id: 'summary', text: 'Executive Summary', icon: FileBarChart },
  { id: 'department', text: 'Department Analysis', icon: Users },
  { id: 'budget', text: 'Budget Insights', icon: TrendingUp },
  { id: 'risk', text: 'Risk Assessment', icon: AlertTriangle },
  { id: 'compare', text: 'Compare Previous Report', icon: Sparkles },
  { id: 'email', text: 'Generate Email Summary', icon: Mail },
];

export const CopilotSuggestions = ({ onSelect }) => {
  return (
    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Quick Prompts
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {SUGGESTIONS.map(s => (
          <button 
            key={s.id}
            onClick={() => onSelect(s.text)}
            className="hover:border-primary"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <s.icon size={12} color="var(--color-primary)" />
            {s.text}
          </button>
        ))}
      </div>
    </div>
  );
};
