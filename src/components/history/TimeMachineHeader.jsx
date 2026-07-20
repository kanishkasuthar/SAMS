import React from 'react';
import Card from '../common/Card';
import { History, Target, Clock, BrainCircuit } from 'lucide-react';

const TimeMachineHeader = ({ versions }) => {
  const currentVersion = versions?.find(v => v.active) || versions?.[0];

  const kpis = [
    { label: 'Current Version', value: currentVersion?.id || 'v3.2.0', icon: Target, color: 'var(--color-primary)' },
    { label: 'Total Snapshots', value: versions?.length || 0, icon: History, color: 'var(--color-text-main)' },
    { label: 'Last Sync Time', value: '2 hours ago', icon: Clock, color: 'var(--color-text-secondary)' },
    { label: 'AI Confidence', value: '98%', icon: BrainCircuit, color: 'var(--color-success)' }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: 12 }}>
          Organization Time Machine
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: 4, fontSize: '14px' }}>
          Track every structural evolution of the organization.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        {kpis.map((kpi, idx) => (
          <Card key={idx} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '16px', minWidth: '160px' }} className="animate-in slide-in-from-right fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            <div style={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: `${kpi.color}15`, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <kpi.icon size={18} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>{kpi.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>{kpi.value}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TimeMachineHeader;
