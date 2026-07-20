import React from 'react';

const IntegrationsSettings = ({ state, handleChange }) => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Connected Services</h3>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Integrate SAMS with your existing enterprise toolchain.</p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24}}>
          
          {[
            { id: 'google', name: 'Google Workspace', icon: 'G', color: '#EA4335', bg: '#FCE8E6', desc: 'Sync users and groups directly from Google Workspace directory.', connected: true },
            { id: 'microsoft365', name: 'Microsoft 365', icon: 'M', color: '#0078D4', bg: '#E1F0FA', desc: 'Integrate calendar, teams and active directory provisioning.', connected: false },
            { id: 'workday', name: 'Workday HRIS', icon: 'W', color: '#0288D1', bg: '#E1F5FE', desc: 'Automatically sync employee roster and department changes daily.', connected: true },
            { id: 'slack', name: 'Slack Integration', icon: 'S', color: '#7B1FA2', bg: '#F3E5F5', desc: 'Send automated structural change notifications to designated channels.', connected: false },
            { id: 'azure', name: 'Azure Active Directory', icon: 'A', color: '#3F51B5', bg: '#E8EAF6', desc: 'Sync user provisioning, roles, and access controls with Azure AD.', connected: false },
            { id: 'github', name: 'GitHub Enterprise', icon: 'G', color: '#333333', bg: '#F5F5F5', desc: 'Sync engineering teams and repository access automatically.', connected: true },
            { id: 'jira', name: 'Jira Software', icon: 'J', color: '#0052CC', bg: '#E3F2FD', desc: 'Map Jira projects to SAMS departments for velocity analytics.', connected: false },
            { id: 'storage', name: 'Cloud Storage (AWS S3)', icon: 'S3', color: '#FF9900', bg: '#FFF4E5', desc: 'Offload automated backup files and asset storage to AWS.', connected: true }
          ].map(app => (
            <div key={app.id} className="card" style={{padding: 24, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column'}}>
              <div className="flex justify-between items-start mb-4">
                <div style={{width: 48, height: 48, borderRadius: 12, backgroundColor: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: app.color, fontWeight: 700, fontSize: '1.2rem'}}>
                  {app.icon}
                </div>
                {app.connected ? (
                  <span style={{padding: '4px 8px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)'}}>Connected</span>
                ) : (
                  <span style={{padding: '4px 8px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)'}}>Not Connected</span>
                )}
              </div>
              <h4 style={{fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4}}>{app.name}</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 16, flex: 1}}>{app.desc}</p>
              {app.connected ? (
                <button style={{width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: 8, background: 'none', fontWeight: 600, color: 'var(--color-text-main)', cursor: 'pointer'}} className="hover:bg-slate-50">Configure Sync</button>
              ) : (
                <button style={{width: '100%', padding: '8px', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: 8, fontWeight: 600, color: 'white', cursor: 'pointer'}} className="hover-lift">Connect App</button>
              )}
            </div>
          ))}

        </div>
      </div>
      
      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>API & Webhooks</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0}}>Manage programmatic access to SAMS data.</p>
          </div>
          <button className="btn-secondary">Generate New Key</button>
        </div>
        
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Key Name</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Permissions</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Created</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>Production Sync API</td>
                <td style={{ padding: '16px' }}><span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: 12, backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', fontWeight: 600 }}>Read/Write</span></td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>Oct 12, 2025</td>
                <td style={{ padding: '16px' }}><button style={{ background: 'none', border: 'none', color: 'var(--color-danger)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Revoke</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSettings;
