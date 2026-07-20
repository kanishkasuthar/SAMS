import React from 'react';
import { Plus, Calendar, Download, Share2, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const ReportsHeader = () => {
  const { addToast } = useUIStore();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--color-text-main)', margin: '0 0 8px 0' }}>Intelligence Reports Center</h1>
        <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} color="var(--color-primary)" />
          AI-powered organizational reporting and executive insights.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => addToast("Share dialog opened.", "info")} className="icon-btn hover:bg-slate-100" style={{ padding: '8px 12px', borderRadius: '8px', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px' }}>
          <Share2 size={16} /> Share
        </button>
        <button onClick={() => addToast("Exporting report data...", "info")} className="icon-btn hover:bg-slate-100" style={{ padding: '8px 12px', borderRadius: '8px', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px' }}>
          <Download size={16} /> Export
        </button>
        <button onClick={() => addToast("Schedule modal opened.", "info")} className="icon-btn hover:bg-slate-100" style={{ padding: '8px 12px', borderRadius: '8px', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px' }}>
          <Calendar size={16} /> Schedule
        </button>
        <button onClick={() => addToast("Generating new report...", "success")} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px', border: 'none' }}>
          <Plus size={16} /> Generate Report
        </button>
      </div>
    </div>
  );
};

export default ReportsHeader;
