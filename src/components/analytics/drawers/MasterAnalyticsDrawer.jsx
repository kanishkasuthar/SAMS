import React from 'react';
import { X, Network, Download, FileText, Settings, Users } from 'lucide-react';
import { useAnalytics } from '../../../contexts/AnalyticsContext';

const MasterAnalyticsDrawer = () => {
  const { activeItem, setActiveItem } = useAnalytics();

  if (!activeItem) return null;

  const handleClose = () => setActiveItem(null);

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1999,
          opacity: activeItem ? 1 : 0,
          transition: 'opacity 0.3s'
        }}
        onClick={handleClose}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: activeItem ? 0 : '-600px',
        bottom: 0,
        width: '600px',
        backgroundColor: 'white',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid var(--color-border)'
      }}>
        
        {/* Dynamic Header based on activeItem type */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              {activeItem.type === 'kpi' ? 'KPI Deep Dive' : 
               activeItem.type === 'department' ? 'Department Intelligence' :
               activeItem.type === 'recommendation' ? 'Strategy Analysis' : 'Detail View'}
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--color-text-main)', lineHeight: 1.2 }}>
              {activeItem.data.title || activeItem.data.label || 'Analytics Viewer'}
            </h2>
          </div>
          <button onClick={handleClose} className="hover-bg" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Content */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <p style={{ fontSize: '15px', color: 'var(--color-text-main)', lineHeight: 1.6, margin: 0 }}>
            {activeItem.data.desc || "This detailed view provides AI-driven analysis, historical context, and predictive forecasting for the selected entity. The data is synchronized in real-time with the central Digital Twin engine."}
          </p>

          {/* Quick Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Status</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-success)' }}>Active & Healthy</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Impact Score</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>High (94/100)</div>
            </div>
          </div>

          <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
             <Network size={48} color="var(--color-text-muted)" style={{ opacity: 0.5 }} />
             <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-muted)', textAlign: 'center' }}>
               Advanced visualizations require specific historical data points which are currently being aggregated.
             </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', gap: '12px' }}>
          <button style={{ flex: 1, padding: '12px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
            <FileText size={16} /> Generate Brief
          </button>
          <button style={{ flex: 1, padding: '12px', backgroundColor: 'white', color: 'var(--color-text-main)', borderRadius: '8px', fontWeight: 700, border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <Download size={16} /> Export Data
          </button>
        </div>

      </div>
    </>
  );
};

export default MasterAnalyticsDrawer;
