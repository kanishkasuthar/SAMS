import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ReferenceLine } from 'recharts';
import { Calendar } from 'lucide-react';

const MOCK_DATA = {
  Weekly: [
    { name: 'Executive', R: 1, A: 4, C: 8, I: 12 },
    { name: 'Finance', R: 7, A: 3, C: 11, I: 20 },
    { name: 'Engineering', R: 9, A: 2, C: 6, I: 15 },
    { name: 'Sales', R: 6, A: 1, C: 9, I: 22 },
    { name: 'HR & Admin', R: 5, A: 2, C: 8, I: 17 },
  ],
  Monthly: [
    { name: 'Executive', R: 2, A: 8, C: 15, I: 25 },
    { name: 'Finance', R: 14, A: 6, C: 22, I: 40 },
    { name: 'Engineering', R: 18, A: 4, C: 12, I: 30 },
    { name: 'Sales', R: 12, A: 2, C: 18, I: 45 },
    { name: 'HR & Admin', R: 10, A: 3, C: 16, I: 35 },
  ],
  Quarterly: [
    { name: 'Executive', R: 6, A: 24, C: 45, I: 75 },
    { name: 'Finance', R: 42, A: 18, C: 66, I: 120 },
    { name: 'Engineering', R: 54, A: 12, C: 36, I: 90 },
    { name: 'Sales', R: 36, A: 6, C: 54, I: 135 },
    { name: 'HR & Admin', R: 30, A: 9, C: 48, I: 105 },
  ]
};

const COLORS = {
  R: '#6366F1', // Primary
  A: '#EF4444', // Danger
  C: '#F59E0B', // Warning
  I: '#10B981', // Success
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    return (
      <div style={{ backgroundColor: 'white', padding: '16px', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', minWidth: '200px' }}>
        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
          {label} Department
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {payload.map((entry, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: entry.color }} />
                <span style={{ fontSize: '13px', color: 'var(--color-text-main)', fontWeight: 600 }}>{entry.name}</span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)' }}>{entry.value}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total Tasks</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-primary)' }}>{total}</span>
        </div>
      </div>
    );
  }
  return null;
};

const ResponsibilityDistributionCharts = ({ onDepartmentClick }) => {
  const [timeframe, setTimeframe] = useState('Monthly');
  const data = MOCK_DATA[timeframe];
  
  // Calculate average for benchmark line
  const totalTasks = data.reduce((sum, dept) => sum + dept.R + dept.A + dept.C + dept.I, 0);
  const average = Math.round(totalTasks / data.length);

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Responsibility Distribution</h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>Allocation of RACI roles across the organization.</p>
        </div>
        
        {/* Toggle */}
        <div style={{ display: 'flex', backgroundColor: 'var(--color-surface)', padding: '4px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          {['Weekly', 'Monthly', 'Quarterly'].map(t => (
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
      <div style={{ padding: '24px', flex: 1, minHeight: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} onClick={(state) => {
            if (state && state.activePayload && onDepartmentClick) {
              const deptName = state.activePayload[0].payload.name;
              // Map name to ID
              const idMap = { 'Executive': 'exec', 'Finance': 'finance', 'Engineering': 'eng', 'Sales': 'sales', 'HR & Admin': 'hr' };
              onDepartmentClick(idMap[deptName]);
            }
          }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            
            <ReferenceLine y={average} stroke="var(--color-text-muted)" strokeDasharray="3 3" label={{ position: 'top', value: 'Avg Load', fill: 'var(--color-text-muted)', fontSize: 12, fontWeight: 600 }} />

            <Bar dataKey="R" name="Responsible" stackId="a" fill={COLORS.R} radius={[0, 0, 8, 8]} animationDuration={1000} cursor="pointer" />
            <Bar dataKey="A" name="Accountable" stackId="a" fill={COLORS.A} animationDuration={1000} cursor="pointer" />
            <Bar dataKey="C" name="Consulted" stackId="a" fill={COLORS.C} animationDuration={1000} cursor="pointer" />
            <Bar dataKey="I" name="Informed" stackId="a" fill={COLORS.I} radius={[8, 8, 0, 0]} animationDuration={1000} cursor="pointer" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponsibilityDistributionCharts;
