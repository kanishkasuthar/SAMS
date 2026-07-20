import React from 'react';
import { ToggleRight, ToggleLeft } from 'lucide-react';

const SecuritySettings = ({ state, handleChange }) => {
  const toggle = (key) => handleChange(key, !state[key]);

  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Authentication & Access</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0}}>Manage how users sign in and secure their accounts.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Security Score</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-success)' }}>92/100</div>
          </div>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          {[
            { id: 'secMfa', label: 'Multi-Factor Authentication (MFA)', desc: 'Require secondary verification for all admin logins.', color: 'var(--color-success)' },
            { id: 'secSso', label: 'Single Sign-On (SSO)', desc: 'Enable SAML/OIDC authentication via Okta or Azure AD.', color: 'var(--color-success)' },
            { id: 'secLoginAlerts', label: 'Login Alerts', desc: 'Notify admins of logins from new devices or locations.', color: 'var(--color-primary)' }
          ].map(setting => (
            <div key={setting.id} className="flex justify-between items-center" style={{padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 12, backgroundColor: 'var(--color-surface)'}}>
              <div>
                <div style={{fontWeight: 600, color: 'var(--color-text-main)'}}>{setting.label}</div>
                <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>{setting.desc}</div>
              </div>
              <button onClick={() => toggle(setting.id)} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                {state[setting.id] ? <ToggleRight size={32} color={setting.color} /> : <ToggleLeft size={32} color="var(--color-text-muted)" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />
      
      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Policies & Restrictions</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Password Expiry</label>
            <select className="input-field" value={state.secPasswordExpiry || '90'} onChange={(e) => handleChange('secPasswordExpiry', e.target.value)}>
              <option value="never">Never</option>
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
              <option value="180">180 Days</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>JWT Expiration</label>
            <select className="input-field" value={state.secJwtExpiry || '1h'} onChange={(e) => handleChange('secJwtExpiry', e.target.value)}>
              <option value="15m">15 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="12h">12 Hours</option>
              <option value="24h">24 Hours</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Allowed Devices</label>
            <select className="input-field" value={state.secDevices || 'any'} onChange={(e) => handleChange('secDevices', e.target.value)}>
              <option value="any">Any Device</option>
              <option value="managed">Managed Devices Only (MDM)</option>
              <option value="desktop">Desktop Only</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>IP Restrictions</label>
            <input className="input-field" placeholder="e.g., 192.168.1.0/24" value={state.secIpRestrictions || ''} onChange={(e) => handleChange('secIpRestrictions', e.target.value)} />
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Active Sessions</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0}}>Review and revoke active login sessions.</p>
          </div>
        </div>
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Device</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Location</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Last Active</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>MacBook Pro 16" (Current)</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>San Francisco, CA (192.168.1.1)</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-success)' }}>Active Now</td>
                <td style={{ padding: '16px' }}></td>
              </tr>
              <tr style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>iPhone 14 Pro</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>San Jose, CA (10.0.0.2)</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-muted)' }}>2 hours ago</td>
                <td style={{ padding: '16px' }}><button style={{ background: 'none', border: 'none', color: 'var(--color-danger)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Revoke</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
