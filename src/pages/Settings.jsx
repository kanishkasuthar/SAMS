import React, { useState } from 'react';
import { User, Bell, Shield, Database, Palette, Link as LinkIcon, Download } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: User },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security & Auth', icon: Shield },
    { id: 'data', name: 'Data Management', icon: Database },
    { id: 'integrations', name: 'Integrations', icon: LinkIcon },
  ];

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div style={{marginBottom: 32}}>
        <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Platform Settings</h1>
        <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Manage system configuration, security, and preferences.</p>
      </div>

      <div className="flex gap-8" style={{alignItems: 'flex-start'}}>
        
        {/* Settings Navigation */}
        <div className="card" style={{width: 250, padding: '12px 0', flexShrink: 0}}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full text-left`}
                style={{
                  padding: '12px 24px',
                  backgroundColor: isActive ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                  borderRight: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                {tab.name}
              </button>
            )
          })}
        </div>

        {/* Settings Content Area */}
        <div className="flex-col gap-6" style={{flex: 1}}>
          
          {/* General Tab Content */}
          {activeTab === 'general' && (
            <div className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8}}>Organization Profile</h3>
                <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 24}}>Update your company's core details and SAMS deployment name.</p>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
                  <div className="flex flex-col gap-2">
                    <label style={{fontWeight: 600, fontSize: '0.9rem'}}>Company Name</label>
                    <input type="text" defaultValue="Acme Corporation" style={{padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit'}} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{fontWeight: 600, fontSize: '0.9rem'}}>SAMS Instance Name</label>
                    <input type="text" defaultValue="Acme Global Hub" style={{padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit'}} />
                  </div>
                </div>
              </div>
              
              <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />
              
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8}}>Session Configuration</h3>
                <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 24}}>Manage idle timeouts and active login limits.</p>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
                  <div className="flex flex-col gap-2">
                    <label style={{fontWeight: 600, fontSize: '0.9rem'}}>Idle Timeout (Minutes)</label>
                    <select style={{padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit', backgroundColor: 'var(--color-surface)'}}>
                      <option>15 Minutes</option>
                      <option selected>30 Minutes</option>
                      <option>60 Minutes</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button className="card" style={{padding: '10px 24px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 600}}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Data Management Tab Content */}
          {activeTab === 'data' && (
            <div className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8}}>Backup & Restore</h3>
                <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 24}}>Create manual snapshots of the organizational hierarchy.</p>
                
                <div className="card" style={{padding: 24, backgroundColor: 'rgba(79, 70, 229, 0.02)', border: '1px dashed var(--color-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                   <div>
                     <h4 style={{fontWeight: 600, color: 'var(--color-primary)'}}>Manual Snapshot</h4>
                     <p style={{fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4}}>Last backup: Today at 04:30 AM (Auto)</p>
                   </div>
                   <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 600}}>
                     <Download size={16} /> Create Backup
                   </button>
                </div>
              </div>

              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-danger)'}}>Danger Zone</h3>
                <div className="card" style={{padding: 24, border: '1px solid rgba(239, 68, 68, 0.3)'}}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 style={{fontWeight: 600}}>Purge Audit Logs</h4>
                      <p style={{fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4}}>Permanently delete audit logs older than 90 days.</p>
                    </div>
                    <button className="card" style={{padding: '8px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', fontWeight: 600, border: '1px solid rgba(239, 68, 68, 0.2)'}}>
                      Purge Logs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generic content for other tabs */}
          {activeTab !== 'general' && activeTab !== 'data' && (
            <div className="card" style={{padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400}}>
              <div style={{width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(15, 23, 42, 0.05)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16}}>
                {tabs.find(t => t.id === activeTab)?.icon({size: 32})}
              </div>
              <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8}}>{tabs.find(t => t.id === activeTab)?.name} Settings</h3>
              <p style={{color: 'var(--color-text-muted)'}}>This configuration module is currently being finalized.</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Settings;
