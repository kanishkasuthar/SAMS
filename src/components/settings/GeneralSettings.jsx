import React from 'react';

const GeneralSettings = ({ state, handleChange }) => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Organization Profile</h3>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Update your company's core details and SAMS deployment name.</p>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Company Name</label>
            <input 
              type="text" 
              value={state.companyName || ''} 
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>SAMS Instance Name</label>
            <input 
              type="text" 
              value={state.instanceName || ''} 
              onChange={(e) => handleChange('instanceName', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-2" style={{ gridColumn: 'span 2' }}>
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Organization Description</label>
            <textarea 
              rows={3}
              value={state.orgDescription || ''} 
              onChange={(e) => handleChange('orgDescription', e.target.value)}
              className="input-field"
              placeholder="Brief description of your organization..."
            />
          </div>
        </div>
      </div>
      
      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />
      
      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Session Configuration</h3>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Manage idle timeouts and active login limits.</p>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Idle Timeout (Minutes)</label>
            <select 
              value={state.idleTimeout || '30 Minutes'}
              onChange={(e) => handleChange('idleTimeout', e.target.value)}
              className="input-field"
            >
              <option value="15 Minutes">15 Minutes</option>
              <option value="30 Minutes">30 Minutes</option>
              <option value="60 Minutes">60 Minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
