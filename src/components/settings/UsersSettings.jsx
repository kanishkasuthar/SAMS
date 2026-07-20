import React from 'react';
import { Users, Shield, Download, Settings, Server } from 'lucide-react';

const UsersSettings = ({ state, handleChange }) => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Role Management & Matrix</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0}}>Define system-wide roles and access levels.</p>
          </div>
          <button className="btn-primary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={16} /> Create Role
          </button>
        </div>
        
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Role Name</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Type</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Active Users</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Super Admin</td>
                <td style={{ padding: '16px' }}><span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: 12, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: 600 }}>System</span></td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>2</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}>View Matrix</td>
              </tr>
              <tr style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>HR Director</td>
                <td style={{ padding: '16px' }}><span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 600 }}>Custom</span></td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>5</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}>View Matrix</td>
              </tr>
              <tr style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Employee (Default)</td>
                <td style={{ padding: '16px' }}><span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: 12, backgroundColor: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-muted)', fontWeight: 600 }}>System</span></td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>1,241</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}>View Matrix</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Provisioning & Policies</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Default Role Assignment</label>
            <select className="input-field" value={state.userDefaultRole || 'employee'} onChange={(e) => handleChange('userDefaultRole', e.target.value)}>
              <option value="employee">Employee (View Only)</option>
              <option value="manager">Manager (View + Propose)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Session Concurrency</label>
            <select className="input-field" value={state.userSessionLimits || '1'} onChange={(e) => handleChange('userSessionLimits', e.target.value)}>
              <option value="1">1 Active Session</option>
              <option value="2">2 Active Sessions</option>
              <option value="unlimited">Unlimited Sessions</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Access Policy</label>
            <select className="input-field" value={state.userAccessPolicy || 'open'} onChange={(e) => handleChange('userAccessPolicy', e.target.value)}>
              <option value="open">Open (SSO & Local)</option>
              <option value="sso_only">SSO Required</option>
            </select>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Bulk Actions</h3>
        <div className="card" style={{padding: 24, backgroundColor: 'rgba(0,0,0,0.02)', border: '1px dashed var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
          <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'white', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)' }}>
            <Download size={24} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Bulk Import Users</h4>
            <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Upload a CSV to provision multiple users and roles at once.</p>
          </div>
          <button className="btn-secondary" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            Upload CSV File
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersSettings;
