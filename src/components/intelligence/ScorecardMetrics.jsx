import React, { useState } from 'react';
import MetricDetailDrawer from './MetricDetailDrawer';

const ScorecardMetrics = ({ scorecards }) => {
  const [selectedMetric, setSelectedMetric] = useState(null);

  if (!scorecards) return null;

  return (
    <>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: 20 
      }}>
        {scorecards.map((card, idx) => (
          <div 
            key={idx} 
            className="card" 
            onClick={() => setSelectedMetric(card)}
            style={{ 
              padding: '24px', 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.04)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                {card.title}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: card.status === 'Warning' ? 'var(--color-warning)' : 'var(--color-success)' }}>
                {card.trend}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-main)', lineHeight: 1 }}>
                {card.value}{card.unit}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: 4 }}>
                {card.subtitle}
              </div>
            </div>

            <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-alt)', borderRadius: 3, overflow: 'hidden', marginTop: 'auto' }}>
              <div style={{ 
                height: '100%', 
                backgroundColor: card.status === 'Warning' ? 'var(--color-warning)' : 'var(--color-success)',
                width: `${card.progress || Math.random() * 40 + 60}%`, // Fake progress if not provided
                borderRadius: 3
              }}></div>
            </div>

          </div>
        ))}
      </div>
      
      <MetricDetailDrawer 
        isOpen={!!selectedMetric}
        onClose={() => setSelectedMetric(null)}
        metric={selectedMetric}
      />
    </>
  );
};

export default ScorecardMetrics;
