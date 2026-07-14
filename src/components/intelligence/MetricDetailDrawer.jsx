import React from 'react';
import { X, TrendingUp, BarChart, Download, Settings2, DownloadCloud } from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { useUIStore } from '../../store/uiStore';

const MetricDetailDrawer = ({ isOpen, onClose, metric }) => {
  const { addToast } = useUIStore();

  if (!isOpen || !metric) return null;

  const mockTrendData = [
    { name: 'Jan', value: metric.value - 12 },
    { name: 'Feb', value: metric.value - 5 },
    { name: 'Mar', value: metric.value + 2 },
    { name: 'Apr', value: metric.value - 1 },
    { name: 'May', value: metric.value + 4 },
    { name: 'Jun', value: metric.value },
  ];

  const handleExport = () => {
    addToast('Generating detailed PDF report...', 'info');
    setTimeout(() => {
      addToast('Report exported successfully.', 'success');
    }, 1500);
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 700,
        backgroundColor: 'var(--color-bg)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid var(--color-border)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 32px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>KPI Drill-Down</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
              {metric.title}
              <span style={{ fontSize: '16px', padding: '4px 8px', borderRadius: 6, backgroundColor: metric.status === 'Warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: metric.status === 'Warning' ? 'var(--color-warning)' : 'var(--color-success)' }}>
                {metric.trend}
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleExport} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
              <DownloadCloud size={20} />
            </button>
            <button onClick={onClose} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          
          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)', borderRadius: 16, border: '1px solid var(--color-border)', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={18} color="var(--color-primary)" /> 6-Month Historical Trend
              </h3>
            </div>
            <div style={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTrendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: 'var(--shadow-md)' }}
                    itemStyle={{ fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="value" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)', borderRadius: 16, border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0' }}>Impacted Departments</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Engineering</span>
                  <span style={{ fontSize: '14px', color: 'var(--color-danger)' }}>Needs Attention</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Sales</span>
                  <span style={{ fontSize: '14px', color: 'var(--color-success)' }}>Healthy</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8 }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Product</span>
                  <span style={{ fontSize: '14px', color: 'var(--color-success)' }}>Healthy</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)', borderRadius: 16, border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0' }}>AI Recommendations</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: 20, fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Reallocate headcount from Q4 forecast to alleviate Engineering workload.</li>
                <li>Implement weekly 1-on-1 structures for high-risk teams.</li>
                <li>Conduct a manager training session on delegation by end of month.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default MetricDetailDrawer;
