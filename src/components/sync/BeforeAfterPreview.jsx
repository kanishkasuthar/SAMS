import React from 'react';
import Card from '../common/Card';
import { ArrowRight, FileSpreadsheet, RefreshCw } from 'lucide-react';

const BeforeAfterPreview = ({ onStartSync, isSyncing }) => {
  return (
    <div className="animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Synchronization Preview</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', margin: '4px 0 0 0' }}>Review organizational topology shifts before committing.</p>
        </div>
        <button 
          className="sync-action-btn" 
          onClick={onStartSync}
          disabled={isSyncing}
          style={{ backgroundColor: isSyncing ? 'var(--color-text-muted)' : 'var(--color-primary)' }}
        >
          {isSyncing ? (
            <><RefreshCw className="animate-spin" size={18} /> Processing...</>
          ) : (
            <>Commit Changes <ArrowRight size={18} /></>
          )}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '16px', alignItems: 'center', marginBottom: 32 }}>
        
        {/* Current State */}
        <Card style={{ padding: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', opacity: 0.8 }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>Current State</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="flex justify-between" style={{ paddingBottom: 8, borderBottom: '1px dashed var(--color-border)' }}>
              <span style={{ fontSize: '13px' }}>Total Employees</span>
              <span style={{ fontWeight: 600 }}>14,240</span>
            </div>
            <div className="flex justify-between" style={{ paddingBottom: 8, borderBottom: '1px dashed var(--color-border)' }}>
              <span style={{ fontSize: '13px' }}>Total Departments</span>
              <span style={{ fontWeight: 600 }}>14</span>
            </div>
            <div className="flex justify-between" style={{ paddingBottom: 8, borderBottom: '1px dashed var(--color-border)' }}>
              <span style={{ fontSize: '13px' }}>Avg Span of Control</span>
              <span style={{ fontWeight: 600 }}>8.4</span>
            </div>
          </div>
        </Card>

        {/* Separator */}
        <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
          <ArrowRight size={32} />
        </div>

        {/* Incoming State */}
        <Card style={{ padding: '24px', backgroundColor: 'white', border: '1px solid var(--color-primary)', boxShadow: '0 10px 30px rgba(79, 70, 229, 0.1)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: 16 }}>Post-Sync State</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="flex justify-between" style={{ paddingBottom: 8, borderBottom: '1px dashed var(--color-border)' }}>
              <span style={{ fontSize: '13px' }}>Total Employees</span>
              <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>14,252 <span style={{fontSize: '11px'}}>(+12)</span></span>
            </div>
            <div className="flex justify-between" style={{ paddingBottom: 8, borderBottom: '1px dashed var(--color-border)' }}>
              <span style={{ fontSize: '13px' }}>Total Departments</span>
              <span style={{ fontWeight: 600 }}>14</span>
            </div>
            <div className="flex justify-between" style={{ paddingBottom: 8, borderBottom: '1px dashed var(--color-border)' }}>
              <span style={{ fontSize: '13px' }}>Avg Span of Control</span>
              <span style={{ fontWeight: 700, color: 'var(--color-warning)' }}>8.6 <span style={{fontSize: '11px'}}>(+0.2)</span></span>
            </div>
          </div>
        </Card>

      </div>

      <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg)' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: 16 }}>Change Highlights</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ padding: '6px 12px', borderRadius: 20, fontSize: '12px', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>12 New Employees</span>
          <span style={{ padding: '6px 12px', borderRadius: 20, fontSize: '12px', fontWeight: 600, backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.2)' }}>3 Managers Updated</span>
          <span style={{ padding: '6px 12px', borderRadius: 20, fontSize: '12px', fontWeight: 600, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>5 Department Transfers</span>
          <span style={{ padding: '6px 12px', borderRadius: 20, fontSize: '12px', fontWeight: 600, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>2 Deleted Records</span>
          <span style={{ padding: '6px 12px', borderRadius: 20, fontSize: '12px', fontWeight: 600, backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.2)' }}>8 Modified Roles</span>
        </div>
      </Card>

    </div>
  );
};

export default BeforeAfterPreview;
