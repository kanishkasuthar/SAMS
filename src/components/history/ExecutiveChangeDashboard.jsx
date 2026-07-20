import React from 'react';
import Card from '../common/Card';
import { Brain, ArrowUpRight, ArrowDownRight, Users, Building2, Briefcase, Network, Activity } from 'lucide-react';

const ExecutiveChangeDashboard = ({ version }) => {
  if (!version) return null;

  const kpis = [
    { label: 'Organization Health', value: '92%', trend: '+4%', icon: Activity, color: 'var(--color-success)' },
    { label: 'Authority Stability', value: 'High', trend: 'Stable', icon: Network, color: 'var(--color-primary)' },
    { label: 'AI Confidence Score', value: '98%', trend: '+1%', icon: Brain, color: 'var(--color-text-main)' }
  ];

  const quickStats = [
    { label: 'Employees Added', value: '+12', icon: Users, color: 'var(--color-success)' },
    { label: 'Depts Updated', value: '3', icon: Building2, color: 'var(--color-warning)' },
    { label: 'Promotions', value: '2', icon: ArrowUpRight, color: 'var(--color-info)' },
    { label: 'Authority Changes', value: '14', icon: Briefcase, color: 'var(--color-primary)' }
  ];

  return (
    <div className="animate-in fade-in zoom-in duration-300">
      
      {/* Top Level Version Data */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Selected Snapshot</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: 'var(--color-text-main)', letterSpacing: '-0.025em' }}>{version.id}</h2>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 8 }}>
            Created by <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{version.author}</span> on {version.date}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          {kpis.map((kpi, idx) => (
            <Card key={idx} style={{ padding: '16px 20px', width: 160, backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="flex justify-between items-start" style={{ marginBottom: 12 }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{kpi.label}</span>
                <kpi.icon size={16} color={kpi.color} />
              </div>
              <div className="flex justify-between items-end">
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)' }}>{kpi.value}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: kpi.trend.includes('+') ? 'var(--color-success)' : 'var(--color-text-muted)' }}>{kpi.trend}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <Card style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'var(--color-surface-alt)', borderLeft: '4px solid var(--color-primary)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
          <div style={{ padding: 6, backgroundColor: 'var(--color-primary)', borderRadius: 8, color: 'white' }}>
            <Brain size={16} />
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>AI Change Summary</h3>
        </div>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: 0 }}>
          "Compared with the previous baseline, this snapshot introduces Engineering expansion (+5 headcount), HR restructuring, and Finance authority redistribution. 
          Overall organization efficiency is predicted to increase by <strong>7%</strong>. The structural risk level is assessed as <strong>Low</strong>."
        </p>
      </Card>

      {/* Quick Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {quickStats.map((stat, idx) => (
          <Card key={idx} style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} className="hover-lift">
            <div style={{ width: 48, height: 48, borderRadius: '12px', backgroundColor: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <stat.icon size={24} />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default ExecutiveChangeDashboard;
