import React from 'react';
import { ShieldAlert, Users, Building2, Network, UserX, Activity } from 'lucide-react';
import Card from '../common/Card';

const DataHealthDashboard = () => {
  const stats = [
    { label: 'Duplicate Records', value: 12, icon: Users, color: 'var(--color-warning)', action: 'Review' },
    { label: 'Missing Managers', value: 4, icon: UserX, color: 'var(--color-danger)', action: 'Fix Now' },
    { label: 'Invalid Departments', value: 2, icon: Building2, color: 'var(--color-warning)', action: 'Review' },
    { label: 'Hierarchy Issues', value: 3, icon: Network, color: 'var(--color-danger)', action: 'Resolve' },
    { label: 'Inactive Employees', value: 48, icon: Activity, color: 'var(--color-text-muted)', action: 'Archive' },
  ];

  return (
    <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
      {/* Score Card */}
      <Card style={{ flex: '0 0 240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '24px' }}>Organization Data Health</h3>
        
        {/* Animated Circular Score */}
        <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-surface-hover)" strokeWidth="12" />
            <circle 
              cx="70" cy="70" r="60" fill="none" 
              stroke="var(--color-success)" strokeWidth="12" 
              strokeDasharray="377" 
              strokeDashoffset={377 - (377 * 0.98)} 
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </svg>
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1 }}>98<span style={{fontSize: '1.5rem'}}>%</span></span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>Excellent</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {stats.map((stat, idx) => (
          <Card key={idx} style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }} className="hover-lift">
            <div className="flex justify-between items-start" style={{ marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={18} />
              </div>
              <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)' }}>{stat.value}</span>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 12 }}>{stat.label}</h4>
              <button style={{ width: '100%', padding: '6px', fontSize: '12px', fontWeight: 600, color: stat.color, backgroundColor: 'transparent', border: `1px solid ${stat.color}30`, borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-slate-50">
                {stat.action}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DataHealthDashboard;
