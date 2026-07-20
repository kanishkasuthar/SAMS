import React from 'react';
import { 
  Users, Building2, Briefcase, UserCog, Share2, Shield, 
  DollarSign, Clock, Layers, Smile, Activity, AlertCircle,
  TrendingUp, TrendingDown, Sparkles
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useUIStore } from '../../store/uiStore';

const generateSparkline = (trend) => {
  return Array.from({ length: 7 }).map((_, i) => ({ value: 50 + (i * 10 * (trend === 'up' ? 1 : -1)) + (Math.random() * 20 - 10) }));
};

const KPIS = [
  { label: 'Employees', value: '1,248', trend: 'up', change: '+2.4%', icon: Users, ai: 'Growth aligned with Q3 hiring targets.' },
  { label: 'Departments', value: '14', trend: 'up', change: '+1', icon: Building2, ai: 'New Product division created.' },
  { label: 'Projects', value: '64', trend: 'up', change: '+12%', icon: Briefcase, ai: 'Peak capacity reached.' },
  { label: 'Managers', value: '112', trend: 'up', change: '+4', icon: UserCog, ai: 'Manager ratio is currently 1:11.' },
  { label: 'Avg Span', value: '11.2', trend: 'down', change: '-0.3', icon: Share2, ai: 'Span improved in Engineering.' },
  { label: 'Authority', value: '86', trend: 'up', change: '+2', icon: Shield, ai: 'Stable decision distribution.' },
  { label: 'Budget Util.', value: '92%', trend: 'up', change: '+4%', icon: DollarSign, ai: 'Nearing Q3 budget ceiling.' },
  { label: 'Avg Approval', value: '4.2d', trend: 'down', change: '-1.1d', icon: Clock, ai: 'Procurement approvals faster.' },
  { label: 'Hierarchy', value: '5.2', trend: 'up', change: '+0.1', icon: Layers, ai: 'Slightly deeper than industry avg.' },
  { label: 'Satisfaction', value: '4.6/5', trend: 'up', change: '+0.2', icon: Smile, ai: 'Highest score in 12 months.' },
  { label: 'Avg Workload', value: '88%', trend: 'down', change: '-2%', icon: Activity, ai: 'Workload normalizing.' },
  { label: 'Pending Dec.', value: '142', trend: 'down', change: '-15%', icon: AlertCircle, ai: 'Action Center efficiency improved.' },
];

const ExecutiveKPIGrid = () => {
  const { setFilter, addToast } = useUIStore();

  const handleKpiClick = (kpi) => {
    setFilter('searchQuery', kpi.label);
    addToast(`Drilling down into ${kpi.label} metrics...`, 'info');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {KPIS.map((kpi, idx) => {
        const isUp = kpi.trend === 'up';
        const color = isUp ? 'var(--color-success)' : (kpi.change.includes('-') && kpi.label === 'Pending Dec.' ? 'var(--color-success)' : 'var(--color-primary)');
        const data = generateSparkline(kpi.trend);

        return (
          <div key={idx} className="card hover-lift" onClick={() => handleKpiClick(kpi)} style={{ 
            padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer',
            border: '1px solid var(--color-border)', backgroundColor: 'white', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ padding: '6px', backgroundColor: 'var(--color-bg)', borderRadius: '8px', color: 'var(--color-primary)' }}>
                  <kpi.icon size={16} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{kpi.label}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--color-text-main)' }}>{kpi.value}</span>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ width: '40px', height: '20px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                  {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {kpi.change}
                </span>
              </div>
            </div>
            
            {/* Hover AI Explanation (Simulated via CSS) */}
            <div className="kpi-ai-hover" style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(4px)',
              borderTop: '1px solid var(--color-border)', fontSize: '11px', color: 'var(--color-text-secondary)',
              fontWeight: 500, transform: 'translateY(100%)', transition: 'transform 0.2s ease',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <Sparkles size={12} color="var(--color-primary)" style={{ flexShrink: 0 }} />
              {kpi.ai}
            </div>
          </div>
        );
      })}

      <style dangerouslySetInnerHTML={{__html: `
        .card:hover .kpi-ai-hover {
          transform: translateY(0);
        }
      `}} />
    </div>
  );
};

export default ExecutiveKPIGrid;
