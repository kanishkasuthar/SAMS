import React from 'react';
import { FileText, Clock, Calendar, Sparkles, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useReportStore } from '../../store/reportStore';

const generateSparkline = () => Array.from({ length: 7 }).map(() => ({ value: Math.random() * 100 }));

const ReportsKPIGrid = () => {
  const { reports, history } = useReportStore();

  const totalReportsCount = reports.length;
  const todayReportsCount = history.filter(h => h.date === new Date().toLocaleDateString()).length;
  const scheduledCount = reports.filter(r => r.type?.toLowerCase().includes('schedule') || r.tags?.some(t => t?.toLowerCase().includes('schedule'))).length;
  const aiCount = reports.filter(r => r.type?.toLowerCase().includes('ai') || r.tags?.some(t => t?.toLowerCase().includes('ai'))).length;

  const KPIS = [
    { label: 'Total Reports', value: totalReportsCount.toLocaleString(), trend: totalReportsCount > 0 ? '+12%' : 'No data', icon: FileText, color: 'var(--color-text-main)' },
    { label: "Today's Reports", value: todayReportsCount.toLocaleString(), trend: todayReportsCount > 0 ? '+4%' : 'No data', icon: Clock, color: 'var(--color-primary)' },
    { label: 'Scheduled Reports', value: scheduledCount.toLocaleString(), trend: scheduledCount > 0 ? 'Stable' : 'No data', icon: Calendar, color: 'var(--color-success)' },
    { label: 'AI Generated Reports', value: aiCount.toLocaleString(), trend: aiCount > 0 ? '+34%' : 'No data', icon: Sparkles, color: 'var(--color-warning)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
      {KPIS.map((kpi, idx) => (
        <div key={idx} className="card hover-lift" style={{ 
          padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px',
          border: '1px solid var(--color-border)', backgroundColor: 'white', cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--color-bg)', borderRadius: '10px', color: kpi.color }}>
                <kpi.icon size={20} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{kpi.label}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--color-text-main)', lineHeight: 1 }}>{kpi.value}</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <div style={{ width: '60px', height: '24px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateSparkline()}>
                    <Line type="monotone" dataKey="value" stroke={kpi.color} strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: kpi.trend.includes('+') ? 'var(--color-success)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                {kpi.trend.includes('+') && <TrendingUp size={12} />} {kpi.trend}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsKPIGrid;
