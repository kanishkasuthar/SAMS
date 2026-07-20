import React from 'react';
import { Activity, FileText, Database, GitMerge, FileSpreadsheet } from 'lucide-react';

const ACTIVITIES = [
  { id: 1, action: 'Engineering Report exported', time: '2 min ago', user: 'Marcus J.', avatar: 'https://i.pravatar.cc/150?u=a', dept: 'Engineering', icon: FileText, color: 'var(--color-primary)' },
  { id: 2, action: 'Finance dashboard opened', time: '5 min ago', user: 'Sarah C.', avatar: 'https://i.pravatar.cc/150?u=b', dept: 'Finance', icon: Activity, color: 'var(--color-success)' },
  { id: 3, action: 'Excel imported', time: '12 min ago', user: 'David K.', avatar: 'https://i.pravatar.cc/150?u=c', dept: 'Operations', icon: FileSpreadsheet, color: 'var(--color-warning)' },
  { id: 4, action: 'Hierarchy recalculated', time: '20 min ago', user: 'System', avatar: 'https://i.pravatar.cc/150?u=sys', dept: 'System', icon: GitMerge, color: 'var(--color-text-muted)' },
  { id: 5, action: 'Data model updated', time: '1 hr ago', user: 'Alex M.', avatar: 'https://i.pravatar.cc/150?u=d', dept: 'Engineering', icon: Database, color: 'var(--color-primary)' },
];

const LiveActivityFeed = ({ onActivityClick }) => {
  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
            <Activity size={20} color="var(--color-text-main)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Live Activity Feed</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Real-time user actions and system events.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 24px 24px 32px', position: 'relative', overflowY: 'auto', flex: 1 }}>
        {/* Timeline track */}
        <div style={{ position: 'absolute', top: '24px', bottom: '24px', left: '44px', width: '2px', backgroundColor: 'var(--color-border)', zIndex: 1 }} />

        {ACTIVITIES.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div 
              key={activity.id}
              className="hover-lift"
              onClick={() => onActivityClick && onActivityClick(activity)}
              style={{ 
                display: 'flex', 
                gap: '16px', 
                marginBottom: '24px', 
                position: 'relative', 
                zIndex: 2,
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: 'white',
                border: '1px solid transparent',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={{ position: 'relative' }}>
                <img src={activity.avatar} alt={activity.user} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: activity.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                  <Icon size={8} color="white" />
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{activity.action}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{activity.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-main)' }}>{activity.user}</span>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-text-muted)' }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>{activity.dept}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveActivityFeed;
