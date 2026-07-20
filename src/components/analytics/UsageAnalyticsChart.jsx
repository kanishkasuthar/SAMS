import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, Line, ComposedChart } from 'recharts';
import { Activity } from 'lucide-react';

const MOCK_DATA = [
  { name: 'Mon', users: 3200, sessions: 4100, prevUsers: 2800 },
  { name: 'Tue', users: 4800, sessions: 5200, prevUsers: 3900 },
  { name: 'Wed', users: 4200, sessions: 4900, prevUsers: 4000 },
  { name: 'Thu', users: 5100, sessions: 6200, prevUsers: 4500 },
  { name: 'Fri', users: 4892, sessions: 5800, prevUsers: 4200 },
  { name: 'Sat', users: 1500, sessions: 1800, prevUsers: 1400 },
  { name: 'Sun', users: 1200, sessions: 1400, prevUsers: 1100 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const users = payload.find(p => p.dataKey === 'users')?.value;
    const sessions = payload.find(p => p.dataKey === 'sessions')?.value;
    const prevUsers = payload.find(p => p.dataKey === 'prevUsers')?.value;
    const growth = (((users - prevUsers) / prevUsers) * 100).toFixed(1);

    return (
      <div style={{ backgroundColor: 'white', padding: '16px', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', minWidth: '220px' }}>
        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
          {label} (Peak: 2:00 PM)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-text-main)', fontWeight: 600 }}>Active Users</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)' }}>{users}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-text-main)', fontWeight: 600 }}>Sessions</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)' }}>{sessions}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-text-main)', fontWeight: 600 }}>Bounce Rate</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)' }}>22.4%</span>
          </div>
        </div>
        <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Growth (vs Prev)</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: growth > 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {growth > 0 ? '+' : ''}{growth}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const UsageAnalyticsChart = ({ onChartClick }) => {
  const [timeframe, setTimeframe] = useState('Daily');

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Platform Usage Analytics</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Active users and sessions compared to previous period.</p>
          </div>
        </div>
        
        {/* Toggle */}
        <div style={{ display: 'flex', backgroundColor: 'var(--color-surface)', padding: '4px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          {['Daily', 'Weekly', 'Monthly', 'Quarterly'].map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: timeframe === t ? 'white' : 'transparent',
                color: timeframe === t ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: timeframe === t ? 700 : 600,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: timeframe === t ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ padding: '24px', flex: 1, minHeight: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={MOCK_DATA} 
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            onClick={(data) => onChartClick && onChartClick(data)}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            
            <Bar dataKey="users" name="Active Users" fill="url(#colorUsers)" radius={[6, 6, 0, 0]} animationDuration={1000} barSize={40} cursor="pointer" />
            <Line type="monotone" dataKey="prevUsers" name="Previous Period" stroke="var(--color-text-muted)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-text-muted)' }} strokeDasharray="5 5" animationDuration={1000} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageAnalyticsChart;
