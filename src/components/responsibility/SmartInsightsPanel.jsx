import React from 'react';
import { AlertTriangle, Clock, Target, TrendingUp, ShieldAlert, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const insights = [
  {
    id: 1,
    type: 'alert',
    title: 'Overloaded Department',
    description: 'Finance is accountable for 42 processes, exceeding the recommended limit by 15%.',
    icon: Target,
    color: '#EF4444'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Approval Bottleneck',
    description: 'Legal Review requires consultation on 86% of new enterprise contracts.',
    icon: Clock,
    color: '#F59E0B'
  },
  {
    id: 3,
    type: 'info',
    title: 'Pending Assignments',
    description: '3 new Q3 marketing workflows require responsibility assignment.',
    icon: Zap,
    color: '#6366F1'
  },
  {
    id: 4,
    type: 'success',
    title: 'Collaboration Strength',
    description: 'Engineering & Product sync increased by 14% this month.',
    icon: TrendingUp,
    color: '#10B981'
  }
];

const riskAlerts = [
  { id: 1, process: 'Data Breach Response', issue: 'Single point of failure (VP IT)', level: 'High' },
  { id: 2, process: 'Vendor Onboarding', issue: 'Missing Accountable Owner', level: 'Critical' },
];

const SmartInsightsPanel = () => {
  return (
    <div 
      style={{ 
        width: '320px', 
        backgroundColor: 'white', 
        borderLeft: '1px solid var(--color-border)', 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto'
      }}
    >
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} color="var(--color-primary)" />
          Smart Insights
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
          Real-time organizational intelligence and bottleneck detection.
        </p>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Dynamic Insights List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {insights.map(insight => {
            const Icon = insight.icon;
            return (
              <div 
                key={insight.id} 
                style={{ 
                  backgroundColor: `${insight.color}08`, 
                  border: `1px solid ${insight.color}20`, 
                  padding: '16px', 
                  borderRadius: '12px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ padding: '6px', backgroundColor: `${insight.color}15`, borderRadius: '8px', color: insight.color, flexShrink: 0 }}>
                  <Icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                    {insight.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {insight.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '8px 0' }} />

        {/* Risk Alerts */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={14} /> Risk Alerts
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {riskAlerts.map(alert => (
              <div 
                key={alert.id}
                className="hover-bg"
                style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>{alert.process}</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', backgroundColor: alert.level === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: alert.level === 'Critical' ? 'var(--color-danger)' : 'var(--color-warning)', textTransform: 'uppercase' }}>
                    {alert.level}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {alert.issue}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '8px 0' }} />
        
        {/* Recent Changes */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Recent Changes
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="https://i.pravatar.cc/150?u=a" alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-main)', lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 700 }}>Sarah Chen</span> transferred Accountability for <span style={{ fontWeight: 600 }}>Quarterly Reporting</span> to <span style={{ fontWeight: 700 }}>David Kim</span>.
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>2 hours ago</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="https://i.pravatar.cc/150?u=b" alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-main)', lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 700 }}>Marcus Johnson</span> added Engineering as <span style={{ fontWeight: 600 }}>Consulted</span> on <span style={{ fontWeight: 600 }}>Vendor Onboarding</span>.
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Yesterday</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SmartInsightsPanel;
