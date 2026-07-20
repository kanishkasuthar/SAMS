import React from 'react';
import Card from '../common/Card';
import { Activity, User, Building2, ShieldAlert } from 'lucide-react';

const HistoryActivityLog = () => {
  const activities = [
    { text: 'Marcus promoted David Chen to Senior Lead.', time: '10 mins ago', type: 'user', icon: User, color: 'var(--color-info)' },
    { text: 'Engineering department merged with DevOps.', time: '1 hour ago', type: 'dept', icon: Building2, color: 'var(--color-primary)' },
    { text: 'Finance authority redistributed.', time: '3 hours ago', type: 'alert', icon: ShieldAlert, color: 'var(--color-warning)' },
    { text: 'Excel synchronization completed via API.', time: '1 day ago', type: 'sys', icon: Activity, color: 'var(--color-success)' }
  ];

  return (
    <Card style={{ padding: '24px', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={18} color="var(--color-text-muted)" /> Live Activity
        </h3>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)', cursor: 'pointer' }}>Filter</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {activities.map((act, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '16px', padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: `${act.color}15`, color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <act.icon size={18} />
            </div>
            <div>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.5, fontWeight: 500 }}>{act.text}</p>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HistoryActivityLog;
