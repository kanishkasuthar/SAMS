import React from 'react';
import { Trophy, TrendingUp, Users, Activity, Zap, BarChart2 } from 'lucide-react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const SCOREBOARD_DATA = [
  { id: 1, category: 'Best Performing', name: 'Finance Dept', value: '98/100', trend: '+2.4%', icon: Trophy, color: 'var(--color-primary)' },
  { id: 2, category: 'Fastest Growing', name: 'Sales Europe', value: '32% YoY', trend: '+5.1%', icon: TrendingUp, color: 'var(--color-success)' },
  { id: 3, category: 'Highest Authority', name: 'Operations', value: '94 Score', trend: '-1.2%', icon: Users, color: 'var(--color-primary)' },
  { id: 4, category: 'Best Manager', name: 'Sarah Chen (Eng)', value: '4.9/5.0', trend: '+0.2', icon: Activity, color: 'var(--color-success)' },
  { id: 5, category: 'Lowest Workload', name: 'Marketing', value: '62% Cap', trend: '-8.0%', icon: Zap, color: 'var(--color-text-main)' },
  { id: 6, category: 'Highest Collab', name: 'Product', value: '89 Syncs', trend: '+14%', icon: BarChart2, color: 'var(--color-primary)' }
];

const ExecutiveScoreboard = () => {
  const { setActiveItem } = useAnalytics();

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Executive Scoreboard</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Top organizational performers and metrics.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '24px' }}>
        {SCOREBOARD_DATA.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              className="hover-lift"
              onClick={() => setActiveItem({ type: 'department', data: { label: item.name } })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-border)', width: '24px' }}>
                #{index + 1}
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <Icon size={20} color={item.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>{item.category}</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)' }}>{item.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)' }}>{item.value}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: item.trend.includes('-') ? 'var(--color-danger)' : 'var(--color-success)' }}>{item.trend}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutiveScoreboard;
