import React from 'react';
import Card from '../../common/Card';
import { Clock, User, Briefcase, Lock, Database } from 'lucide-react';

const LiveChangeTimeline = () => {
  const events = [
    { time: '11:15 AM', user: 'Marcus', text: 'Promoted David Chen to Director', icon: User, color: 'var(--color-primary)' },
    { time: '11:20 AM', user: 'System', text: 'Finance authority scores recalculated', icon: Lock, color: 'var(--color-warning)' },
    { time: '11:45 AM', user: 'Sarah', text: 'Engineering merged with DevOps', icon: Briefcase, color: '#3b82f6' },
    { time: '12:10 PM', user: 'API', text: 'Batch payload successfully imported', icon: Database, color: 'var(--color-success)' },
  ];

  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
        <Clock size={16} color="var(--color-text-muted)" />
        <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>Chronological Change Log</h3>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }} className="hide-scrollbar">
        {events.map((ev, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ padding: '12px 16px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', minWidth: 220, cursor: 'pointer' }} className="hover-lift">
              <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>{ev.time} • {ev.user}</span>
                <ev.icon size={14} color={ev.color} />
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-main)', fontWeight: 600, lineHeight: 1.4 }}>{ev.text}</p>
            </div>
            
            {idx < events.length - 1 && (
              <div style={{ width: 24, height: 2, backgroundColor: 'var(--color-border)' }}></div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LiveChangeTimeline;
