import React, { useState } from 'react';
import { History, UserPlus, Shield, Activity, FileText, ChevronRight, Zap, CheckCircle2, ArrowRightLeft } from 'lucide-react';

const TIMELINE_DATA = [
  {
    id: 1,
    date: 'Oct 24, 2026',
    time: '10:42 AM',
    user: { name: 'Sarah Chen', role: 'Chief Financial Officer', avatar: 'https://i.pravatar.cc/150?u=a', dept: 'Finance' },
    type: 'Transfer',
    action: 'transferred Accountability',
    target: 'Quarterly Reporting',
    detail: 'Transferred accountability from Finance Dept to Executive Board.',
    impact: 'High Impact: Shifts final sign-off authority.',
    icon: ArrowRightLeft,
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.1)'
  },
  {
    id: 2,
    date: 'Oct 23, 2026',
    time: '02:15 PM',
    user: { name: 'Marcus Johnson', role: 'CHRO', avatar: 'https://i.pravatar.cc/150?u=b', dept: 'HR' },
    type: 'Responsibility Change',
    action: 'added Engineering',
    target: 'Vendor Onboarding',
    detail: 'Added as Consulted (C) due to new technical review requirements for IT vendors.',
    impact: 'Medium Impact: May increase cycle time.',
    icon: UserPlus,
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.1)'
  },
  {
    id: 3,
    date: 'Oct 20, 2026',
    time: '09:00 AM',
    user: { name: 'AI Assistant', role: 'System Bot', avatar: null, dept: 'System' },
    type: 'AI Alert',
    action: 'flagged a bottleneck',
    target: 'Performance Review Cycle',
    detail: 'HR department has 95% responsibility load on this process. Risk of delay detected.',
    impact: 'Critical Alert: Intervention recommended.',
    icon: Zap,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)'
  },
  {
    id: 4,
    date: 'Oct 15, 2026',
    time: '11:30 AM',
    user: { name: 'David Kim', role: 'VP Sales', avatar: 'https://i.pravatar.cc/150?u=d', dept: 'Sales' },
    type: 'Approval Update',
    action: 'created new process',
    target: 'Cloud Infrastructure Pivot',
    detail: 'Assigned Engineering as Responsible (R) and Executive Board as Accountable (A).',
    impact: 'Low Impact: Standard mapping.',
    icon: CheckCircle2,
    color: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.1)'
  }
];

const FILTERS = ['All', 'Today', 'Week', 'Month', 'AI Events', 'Manual Changes'];

const ResponsibilityTimelineView = ({ onEventClick }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="card" style={{ height: '650px', padding: 0, border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      
      {/* Header & Filters */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <History size={18} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>Activity Feed</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Recent changes to organizational accountability.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: `1px solid ${activeFilter === filter ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: activeFilter === filter ? 'var(--color-primary-light)' : 'var(--color-surface)',
                color: activeFilter === filter ? 'var(--color-primary)' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Feed */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', position: 'relative' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: '42px', top: '32px', bottom: '32px', width: '2px', backgroundColor: 'var(--color-border)', borderRadius: '2px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {TIMELINE_DATA.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                
                {/* Timeline dot */}
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'white', border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, flexShrink: 0, boxShadow: `0 0 0 4px white, 0 4px 12px ${item.bg}` }}>
                  <Icon size={16} color={item.color} />
                </div>
                
                {/* Content card */}
                <div 
                  className="hover-lift" 
                  onClick={() => onEventClick && onEventClick(item.id)}
                  style={{ 
                    flex: 1, 
                    backgroundColor: 'white', 
                    border: '1px solid var(--color-border)', 
                    borderRadius: '16px', 
                    padding: '20px', 
                    transition: 'all 0.2s', 
                    cursor: 'pointer' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = `0 8px 24px ${item.bg}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {item.user.avatar ? (
                        <img src={item.user.avatar} alt={item.user.name} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--color-border)' }} />
                      ) : (
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Zap size={16} color={item.color} />
                        </div>
                      )}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{item.user.name}</span>
                          <span style={{ fontSize: '10px', padding: '2px 8px', backgroundColor: item.bg, borderRadius: '12px', color: item.color, fontWeight: 700, textTransform: 'uppercase' }}>{item.type}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{item.user.role} • {item.user.dept}</div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>{item.date}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{item.time}</div>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div style={{ fontSize: '15px', color: 'var(--color-text-main)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {item.action} <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{item.target}</span>.
                  </div>
                  
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface)', padding: '12px 16px', borderRadius: '8px', borderLeft: `3px solid ${item.color}`, marginBottom: '16px' }}>
                    {item.detail}
                  </div>

                  {/* Card Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: item.impact.includes('High') || item.impact.includes('Critical') ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>
                      {item.impact}
                    </span>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResponsibilityTimelineView;
