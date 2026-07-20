import React from 'react';
import { X, TrendingUp, Calendar, Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const MOCK_DETAIL_DATA = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const DetailedAnalyticsDrawer = ({ isOpen, onClose, title = "Metric Details", value = "0", trend = "+0%" }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: isOpen ? 0 : '-500px',
      bottom: 0,
      width: '480px',
      backgroundColor: 'white',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
      transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid var(--color-border)'
    }}>
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Deep Dive Analysis</div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--color-text-main)', lineHeight: 1.2 }}>{title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>{value}</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: trend.includes('-') ? 'var(--color-danger)' : 'var(--color-success)', padding: '4px 8px', backgroundColor: trend.includes('-') ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', borderRadius: '8px' }}>
              {trend}
            </span>
          </div>
        </div>
        <button onClick={onClose} className="hover-bg" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--color-surface)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <button style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', backgroundColor: 'white', fontWeight: 600, fontSize: '12px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>7D</button>
            <button style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>30D</button>
            <button style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>90D</button>
          </div>
          <button style={{ padding: '8px 12px', border: '1px solid var(--color-border)', backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            <Calendar size={14} /> Compare
          </button>
        </div>

        {/* Detailed Chart */}
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_DETAIL_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px', textTransform: 'uppercase' }}>Key Drivers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Engineering adoption increased by 14%', 'New Vendor Onboarding flow published', 'Q3 Planning cycle started'].map((driver, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <TrendingUp size={16} color="var(--color-primary)" />
                <span style={{ fontSize: '13px', color: 'var(--color-text-main)', fontWeight: 600 }}>{driver}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', backgroundColor: 'white' }}>
        <button style={{ width: '100%', padding: '12px', backgroundColor: 'white', color: 'var(--color-text-main)', borderRadius: '8px', fontWeight: 700, border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <Download size={16} /> Download Raw CSV
        </button>
      </div>
    </div>
  );
};

export default DetailedAnalyticsDrawer;
