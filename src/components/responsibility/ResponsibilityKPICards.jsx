import React from 'react';
import { LayoutList, Building2, AlertTriangle, UserMinus, Network, ShieldAlert } from 'lucide-react';

const kpiData = [
  { id: 1, title: 'Total Business Processes', value: '132', trend: '+12 this quarter', trendPositive: true, icon: LayoutList, color: '#6366F1' },
  { id: 2, title: 'Departments Covered', value: '18', trend: 'Fully integrated', trendPositive: true, icon: Building2, color: '#8B5CF6' },
  { id: 3, title: 'Responsibility Conflicts', value: '7', trend: '-2 since last month', trendPositive: true, icon: AlertTriangle, color: '#F59E0B' },
  { id: 4, title: 'Unassigned Responsibilities', value: '4', trend: 'Requires attention', trendPositive: false, icon: UserMinus, color: '#EF4444' },
  { id: 5, title: 'Average Collaboration Score', value: '91%', trend: '+3% vs company avg', trendPositive: true, icon: Network, color: '#10B981' },
  { id: 6, title: 'Critical Processes', value: '14', trend: 'Zero active bottlenecks', trendPositive: true, icon: ShieldAlert, color: '#0EA5E9' },
];

const ResponsibilityKPICards = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
      {kpiData.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div 
            key={kpi.id} 
            className="kpi-card hover-lift"
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '20px', 
              padding: '24px', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.borderColor = kpi.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
            }}
          >
            {/* Soft background glow */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: `radial-gradient(circle, ${kpi.color}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{kpi.title}</span>
              <div style={{ backgroundColor: `${kpi.color}15`, padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={kpi.color} />
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.025em', marginBottom: '4px' }}>{kpi.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: kpi.trendPositive ? 'var(--color-success)' : 'var(--color-danger)' 
                }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{kpi.trend}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResponsibilityKPICards;
