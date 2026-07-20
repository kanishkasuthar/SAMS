import React from 'react';
import { Target, Users, Flame, Briefcase, Zap, ShieldAlert, ArrowRight } from 'lucide-react';

const PREDICTIONS = [
  { id: 1, title: 'Forecast Hiring', metric: '+12% Q3', confidence: 92, timeline: 'Next 3 months', rec: 'Increase tech recruiting budget.', icon: Users, color: 'var(--color-primary)' },
  { id: 2, title: 'Project Completion', metric: '68% Prob', confidence: 85, timeline: 'Q4 Delivery', rec: 'Reallocate 3 engineers to Project Alpha.', icon: Target, color: 'var(--color-success)' },
  { id: 3, title: 'Budget Burn Rate', metric: '$1.2M/mo', confidence: 96, timeline: 'Runway: 18mo', rec: 'Optimize cloud infrastructure costs.', icon: Flame, color: 'var(--color-danger)' },
  { id: 4, title: 'Manager Burnout', metric: 'High Risk', confidence: 88, timeline: 'Immediate', rec: 'Flatten hierarchy in Engineering.', icon: ShieldAlert, color: 'var(--color-warning)' },
  { id: 5, title: 'Promotion Risk', metric: 'Low', confidence: 94, timeline: 'EOY Review', rec: 'Standardize performance metrics.', icon: Briefcase, color: 'var(--color-success)' },
  { id: 6, title: 'Department Expansion', metric: 'Sales EU', confidence: 78, timeline: '2027 Q1', rec: 'Initiate leadership search.', icon: Zap, color: 'var(--color-primary)' },
];

const PredictiveForecasts = ({ onPredictionClick }) => {
  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Predictive Analytics</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>AI-generated forecasting based on live organizational data.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '24px' }}>
        {PREDICTIONS.map((pred) => {
          const Icon = pred.icon;
          return (
            <div 
              key={pred.id} 
              className="hover-lift"
              onClick={() => onPredictionClick && onPredictionClick(pred)}
              style={{ 
                padding: '20px', 
                border: '1px solid var(--color-border)', 
                borderRadius: '16px', 
                backgroundColor: 'var(--color-bg)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={16} color={pred.color} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{pred.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '2px 8px', borderRadius: '8px' }}>
                  <Target size={12} /> {pred.confidence}% Conf.
                </div>
              </div>

              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>
                {pred.metric}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '4px' }}>
                <span style={{ color: 'var(--color-text-main)' }}>Timeline:</span> {pred.timeline}
              </div>

              <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px', color: 'var(--color-text-main)', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: 'auto' }}>
                <Zap size={14} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{pred.rec}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PredictiveForecasts;
