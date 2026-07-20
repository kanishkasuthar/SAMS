import React from 'react';
import { Download, Share2, Sparkles, Clock } from 'lucide-react';

const ACTIVITIES = [
  { user: 'Sarah Connor', action: 'downloaded', report: 'Q3 Financial Summary', time: '10 mins ago', icon: Download, color: 'var(--color-text-main)' },
  { user: 'AI Assistant', action: 'generated', report: 'Engineering Workload Alert', time: '1 hour ago', icon: Sparkles, color: 'var(--color-primary)' },
  { user: 'Michael Scott', action: 'shared', report: 'Department Efficiency', time: '3 hours ago', icon: Share2, color: 'var(--color-success)' },
  { user: 'System', action: 'scheduled', report: 'Monthly Compliance Check', time: '5 hours ago', icon: Clock, color: 'var(--color-warning)' },
];

const ReportsActivityFeed = () => {
  return (
    <div className="card" style={{ padding: '24px', width: '350px', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 20px 0', color: 'var(--color-text-main)' }}>Recent Activity</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', flex: 1, paddingRight: '8px' }}>
        {ACTIVITIES.map((act, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: act.color }}>
                <act.icon size={16} />
              </div>
              {idx !== ACTIVITIES.length - 1 && (
                <div style={{ position: 'absolute', top: '36px', bottom: '-20px', left: '18px', width: '2px', backgroundColor: 'var(--color-border)' }} />
              )}
            </div>
            <div style={{ paddingTop: '2px' }}>
              <div style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.4 }}>
                <span style={{ fontWeight: 700 }}>{act.user}</span> {act.action} <span style={{ fontWeight: 600 }}>{act.report}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {act.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsActivityFeed;
