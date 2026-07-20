import React from 'react';
import { Terminal, Code, Cpu, Activity, Zap } from 'lucide-react';

const AdvancedSettings = ({ state, handleChange }) => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      
      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Developer Console</h3>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Advanced configuration for performance tuning and experimental features.</p>
        
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Terminal size={20} color="var(--color-text-main)" />
            <h4 style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Debug Mode</h4>
          </div>
          <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 16}}>Enable detailed logging in the browser console and append performance metrics to network payloads.</p>
          <div style={{ display: 'flex', gap: 16 }}>
            <button className="btn-secondary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
              <Code size={16} /> Enable Debug Logging
            </button>
            <button className="btn-secondary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
              <Activity size={16} /> Download Diagnostic Bundle
            </button>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Rendering Engine</h3>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Tree Layout Algorithm</label>
            <select className="input-field" value={state.advLayoutEngine || 'dagre'} onChange={(e) => handleChange('advLayoutEngine', e.target.value)}>
              <option value="dagre">Dagre (Default, Balanced)</option>
              <option value="elk">ELK (Enterprise, Heavy)</option>
              <option value="d3">D3 Tidy Tree (Compact)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Hardware Acceleration</label>
            <select className="input-field" value={state.advHardwareAccel || 'auto'} onChange={(e) => handleChange('advHardwareAccel', e.target.value)}>
              <option value="auto">Auto-detect GPU</option>
              <option value="force">Force WebGL Rendering</option>
              <option value="off">Software Only (Canvas 2D)</option>
            </select>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Zap size={20} color="#f59e0b" />
          <h3 style={{fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--color-text-main)'}}>Experimental Features</h3>
        </div>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>These features are in beta and may cause platform instability.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" id="exp1" checked={state.expRealtimeSync || false} onChange={(e) => handleChange('expRealtimeSync', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--color-primary)' }} />
            <label htmlFor="exp1" style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Real-time WebSockets synchronization (Beta)</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" id="exp2" checked={state.expMultiTenancy || false} onChange={(e) => handleChange('expMultiTenancy', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--color-primary)' }} />
            <label htmlFor="exp2" style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Enable experimental multi-tenant routing</label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdvancedSettings;
