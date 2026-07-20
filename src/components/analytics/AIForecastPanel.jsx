import React from 'react';
import { Sparkles, TrendingUp, Users, HardDrive, ShieldAlert, Target } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const FORECAST_DATA = [
  { month: 'Current', users: 4892, storage: 42, risk: 24 },
  { month: 'Next', users: 5100, storage: 45, risk: 22 },
  { month: '+2', users: 5400, storage: 48, risk: 20 },
  { month: '+3', users: 5800, storage: 52, risk: 18 },
  { month: '+4', users: 6300, storage: 58, risk: 15 },
  { month: '+5', users: 6900, storage: 65, risk: 12 },
];

const METRICS = [
  { label: 'Expected Users (Q3)', value: '6,900', trend: '+41%', icon: Users },
  { label: 'Storage Forecast', value: '65 TB', trend: '+54%', icon: HardDrive },
  { label: 'Projected Risk Score', value: '12/100', trend: '-50%', icon: ShieldAlert },
  { label: 'AI Confidence', value: '94%', trend: 'High', icon: Target },
];

const AIForecastPanel = () => {
  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'var(--color-surface)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(99, 102, 241, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>AI Predictive Forecast</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>6-month projection based on historical trends.</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', backgroundColor: 'white' }}>
        
        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {METRICS.map((metric, idx) => (
            <div key={idx} style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                <metric.icon size={14} />
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>{metric.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>{metric.value}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: metric.trend.includes('-') ? 'var(--color-success)' : 'var(--color-primary)' }}>{metric.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1, minHeight: '200px' }}>
          {/* User Growth */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} color="var(--color-primary)" /> User Growth Projection
            </div>
            <div style={{ flex: 1, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={FORECAST_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} dy={10} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 700 }} />
                  <Line type="monotone" dataKey="users" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 6 }} animationDuration={1500} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Storage & Risk */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HardDrive size={14} color="var(--color-warning)" /> Storage vs Risk Score
            </div>
            <div style={{ flex: 1, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={FORECAST_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} dy={10} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 700 }} />
                  <Line type="monotone" dataKey="storage" name="Storage (TB)" stroke="var(--color-warning)" strokeWidth={2} dot={false} animationDuration={1500} />
                  <Line type="monotone" dataKey="risk" name="Risk Score" stroke="var(--color-success)" strokeWidth={2} dot={false} strokeDasharray="5 5" animationDuration={1500} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIForecastPanel;
