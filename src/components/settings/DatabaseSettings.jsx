import React from 'react';
import { Database, Activity, HardDrive, Settings2, RotateCcw } from 'lucide-react';

const DatabaseSettings = ({ state, handleChange }) => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      
      {/* Database Health Overview */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Database Health</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0}}>Monitor cluster performance and storage capacity.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>Connected (Primary)</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <div className="card" style={{ padding: '16px', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4 }}>Storage Usage</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>42.8 GB</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>42% of 100 GB Quota</div>
          </div>
          <div className="card" style={{ padding: '16px', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4 }}>IOPS (Read/Write)</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>1,240 / 480</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Well within limits</div>
          </div>
          <div className="card" style={{ padding: '16px', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4 }}>Query Latency (Avg)</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-success)' }}>14ms</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Extremely healthy</div>
          </div>
          <div className="card" style={{ padding: '16px', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4 }}>Active Connections</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>42</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Max: 1000</div>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Backup Schedule</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Automated Snapshots</label>
            <select className="input-field" value={state.dbBackupSchedule || 'daily'} onChange={(e) => handleChange('dbBackupSchedule', e.target.value)}>
              <option value="hourly">Every Hour</option>
              <option value="daily">Daily (2:00 AM)</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Retention Window</label>
            <select className="input-field" value={state.dbRetention || '30'} onChange={(e) => handleChange('dbRetention', e.target.value)}>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
            </select>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Performance & Restore</h3>
        <div style={{display: 'flex', gap: 16, marginTop: 16}}>
          <button className="btn-secondary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
            <Activity size={18} /> Run Performance Diagnostic
          </button>
          <button className="btn-secondary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: 'var(--color-danger)', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
            <RotateCcw size={18} /> Restore from Snapshot
          </button>
        </div>
      </div>

    </div>
  );
};

export default DatabaseSettings;
