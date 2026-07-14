import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area, Brush } from 'recharts';
import { PieChart, Download, Maximize2, ZoomIn, MoreVertical, FileText, Image } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const OrganizationAnalytics = ({ analyticsData }) => {
  const [activeTab, setActiveTab] = useState('Growth');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const { addToast } = useUIStore();

  const tabs = ['Growth', 'Department Expansion', 'Promotions', 'Reporting Structure'];

  // Mock data for charts
  const growthData = [
    { month: 'Jan', employees: 120, contractors: 30 },
    { month: 'Feb', employees: 135, contractors: 35 },
    { month: 'Mar', employees: 150, contractors: 32 },
    { month: 'Apr', employees: 162, contractors: 40 },
    { month: 'May', employees: 180, contractors: 45 },
    { month: 'Jun', employees: 195, contractors: 48 },
  ];

  const deptData = [
    { name: 'Engineering', q1: 45, q2: 60, q3: 85, q4: 120 },
    { name: 'Operations', q1: 30, q2: 35, q3: 45, q4: 55 },
    { name: 'Finance', q1: 15, q2: 18, q3: 20, q4: 25 },
    { name: 'Sales', q1: 20, q2: 30, q3: 45, q4: 65 },
  ];

  const renderChart = () => {
    switch (activeTab) {
      case 'Growth':
        return (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={growthData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCont" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-text-secondary)', fontSize: 13 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 13 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontSize: 14, fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ paddingTop: 20, fontSize: 14 }} />
              <Area type="monotone" dataKey="employees" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorEmp)" />
              <Area type="monotone" dataKey="contractors" stroke="var(--color-success)" fillOpacity={1} fill="url(#colorCont)" />
              {zoomEnabled && <Brush dataKey="month" height={30} stroke="var(--color-primary)" />}
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'Department Expansion':
        return (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={deptData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-text-secondary)', fontSize: 13 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 13 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: 20, fontSize: 14 }} />
              <Bar dataKey="q1" fill="rgba(79, 70, 229, 0.4)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="q2" fill="rgba(79, 70, 229, 0.6)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="q3" fill="rgba(79, 70, 229, 0.8)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="q4" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              {zoomEnabled && <Brush dataKey="name" height={30} stroke="var(--color-primary)" />}
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 15 }}>
            Advanced analytics for {activeTab} will be available soon.
          </div>
        );
    }
  };

  return (
    <div className="card" style={{ 
      padding: '24px', 
      backgroundColor: '#FFFFFF', 
      borderRadius: '16px', 
      border: '1px solid var(--color-border)',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
    }}>
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <PieChart size={24} color="var(--color-primary)" /> Organization Analytics
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
            In-depth visualizations of structural trends and changes over time.
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
          <button 
            onClick={() => setZoomEnabled(!zoomEnabled)} 
            style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: zoomEnabled ? 'var(--color-primary)' : 'var(--color-surface-hover)', color: zoomEnabled ? 'white' : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', fontWeight: 600 }}
          >
            <ZoomIn size={16} /> {zoomEnabled ? 'Zoom On' : 'Zoom Off'}
          </button>
          
          <button 
            onClick={() => setShowExportMenu(!showExportMenu)} 
            style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', fontWeight: 600 }}
          >
            <Download size={16} /> Export
          </button>

          {showExportMenu && (
            <div style={{ position: 'absolute', top: 40, right: 0, width: 160, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, boxShadow: 'var(--shadow-lg)', zIndex: 100, padding: 8, animation: 'scaleIn 0.15s ease-out' }}>
              <button onClick={() => { setShowExportMenu(false); addToast('Exporting to PDF...', 'info'); setTimeout(() => addToast('PDF Downloaded.', 'success'), 1500); }} style={{ width: '100%', padding: '8px 12px', textAlign: 'left', fontSize: '13px', fontWeight: 500, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8 }} className="hover:bg-slate-50">
                <FileText size={16} /> Export PDF
              </button>
              <button onClick={() => { setShowExportMenu(false); addToast('Exporting to PNG...', 'info'); setTimeout(() => addToast('PNG Downloaded.', 'success'), 1500); }} style={{ width: '100%', padding: '8px 12px', textAlign: 'left', fontSize: '13px', fontWeight: 500, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8 }} className="hover:bg-slate-50">
                <Image size={16} /> Export PNG
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: '1px solid var(--color-border)' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              fontSize: '15px',
              fontWeight: 600,
              color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === tab ? '3px solid var(--color-primary)' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '-1px'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ width: '100%', minHeight: 320 }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default OrganizationAnalytics;
