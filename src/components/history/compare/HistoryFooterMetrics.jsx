import React from 'react';
import Card from '../../common/Card';
import { GitCompare, Clock, Repeat, BarChart3 } from 'lucide-react';

const HistoryFooterMetrics = () => {
  const metrics = [
    { label: 'Snapshots Compared', value: '2', icon: GitCompare, color: '#3b82f6' },
    { label: 'Rollback Safety', value: 'High', icon: ShieldCheckMock, color: 'var(--color-success)' },
    { label: 'Total Org Changes', value: '34', icon: Repeat, color: 'var(--color-warning)' },
    { label: 'AI Confidence', value: '98%', icon: BarChart3, color: 'var(--color-primary)' }
  ];

  function ShieldCheckMock({size, color}) {
      return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
      )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
      {metrics.map((metric, idx) => (
        <Card key={idx} style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: `${metric.color}15`, color: metric.color }}>
            <metric.icon size={24} color={metric.color} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: 2 }}>{metric.value}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>{metric.label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HistoryFooterMetrics;
