import React from 'react';
import { Clock, GitMerge, TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const TIMELINE_EVENTS = [
  { id: 1, type: 'Promotion', title: 'Sarah Chen promoted to Director', time: '2 hours ago', icon: Award, color: 'var(--color-primary)' },
  { id: 2, type: 'Budget Approval', title: 'Q3 Engineering Budget Approved', time: '4 hours ago', icon: DollarSign, color: 'var(--color-success)' },
  { id: 3, type: 'Department Merge', title: 'Sales EU and Sales NA merged', time: 'Yesterday', icon: GitMerge, color: 'var(--color-warning)' },
  { id: 4, type: 'AI Recommendation', title: 'Suggested flattening Ops hierarchy', time: 'Yesterday', icon: TrendingUp, color: 'var(--color-primary)' },
  { id: 5, type: 'Role Change', title: '12 employees transferred to Product', time: '2 days ago', icon: Users, color: 'var(--color-text-main)' },
];

const SmartTimeline = () => {
  const { setActiveItem } = useAnalytics();

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Smart Timeline</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Recent organizational changes and events.</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 24px 24px 40px', position: 'relative', flex: 1, overflowY: 'auto' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', top: '24px', bottom: '24px', left: '48px', width: '2px', backgroundColor: 'var(--color-border)', zIndex: 1 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {TIMELINE_EVENTS.map((event) => {
            const Icon = event.icon;
            return (
              <div 
                key={event.id}
                className="hover-lift"
                onClick={() => setActiveItem({ type: 'timeline', data: event })}
                style={{
                  display: 'flex',
                  gap: '24px',
                  position: 'relative',
                  zIndex: 2,
                  cursor: 'pointer',
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  border: '1px solid transparent',
                  transition: 'border-color 0.2s',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                {/* Timeline Node */}
                <div style={{ position: 'absolute', left: '-30px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: event.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <Icon size={16} color="white" />
                </div>

                <div style={{ flex: 1, paddingLeft: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{event.type}</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{event.time}</span>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>{event.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmartTimeline;
