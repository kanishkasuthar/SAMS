import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Database, Palette, Link as LinkIcon, Download, ToggleLeft, ToggleRight } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { useUIStore } from '../store/uiStore';
import { useOrgStore } from '../store/orgStore';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  
  const { companyName, instanceName, idleTimeout, theme, accentColor, updateSettings } = useSettingsStore();
  const { addToast, setDarkMode } = useUIStore();
  
  const [formData, setFormData] = useState({ companyName: '', instanceName: '', idleTimeout: '' });

  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true, critical: true });
  const [security, setSecurity] = useState({ mfa: true, sso: false, passwordExpiry: '90 Days' });

  useEffect(() => {
    setFormData({ companyName, instanceName, idleTimeout });
  }, [companyName, instanceName, idleTimeout]);

  const handleSave = () => {
    updateSettings(formData);
    addToast('Platform settings saved successfully.', 'success');
  };

  const handleThemeChange = (t) => {
    updateSettings({ theme: t });
    if (t === 'Dark') setDarkMode(true);
    else if (t === 'Light') setDarkMode(false);
    else setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  };
  
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
        <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--color-text-main)'}}>Platform Settings</h1>
        <p style={{color: 'var(--color-text-secondary)', marginTop: 4}}>Manage system configuration, security, and preferences.</p>
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
                  transition: 'all var(--transition-fast)',
                  borderTop: 'none', borderLeft: 'none', borderBottom: 'none', cursor: 'pointer', outline: 'none'
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
            <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Organization Profile</h3>
                <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Update your company's core details and SAMS deployment name.</p>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
                  <div className="flex flex-col gap-2">
                    <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Company Name</label>
                    <input 
                      type="text" 
                      value={formData.companyName} 
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>SAMS Instance Name</label>
                    <input 
                      type="text" 
                      value={formData.instanceName} 
                      onChange={(e) => setFormData({...formData, instanceName: e.target.value})}
                      className="input-field"
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
                      value={formData.idleTimeout}
                      onChange={(e) => setFormData({...formData, idleTimeout: e.target.value})}
                      className="input-field"
                    >
                      <option value="15 Minutes">15 Minutes</option>
                      <option value="30 Minutes">30 Minutes</option>
                      <option value="60 Minutes">60 Minutes</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-start pt-4">
                <button className="btn-primary" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          )}

          {/* Appearance Tab Content */}
          {activeTab === 'appearance' && (
            <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Theme Settings</h3>
                <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Customize the visual appearance of the platform.</p>
                
                <div style={{display: 'flex', gap: 16}}>
                  {['Light', 'Dark', 'System'].map(t => (
                    <button 
                      key={t}
                      onClick={() => handleThemeChange(t)}
                      style={{
                        padding: '12px 24px', borderRadius: 8, fontWeight: 600,
                        border: theme === t ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        backgroundColor: theme === t ? 'rgba(79, 70, 229, 0.05)' : 'var(--color-surface)',
                        color: theme === t ? 'var(--color-primary)' : 'var(--color-text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />
              
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Accent Color</h3>
                <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Choose the primary color used throughout the UI.</p>
                
                <div style={{display: 'flex', gap: 16}}>
                  {['#4F46E5', '#10B981', '#0EA5E9', '#F43F5E', '#8B5CF6'].map(color => (
                    <button 
                      key={color}
                      style={{
                        width: 40, height: 40, borderRadius: '50%', backgroundColor: color,
                        border: accentColor === color ? '3px solid white' : 'none',
                        boxShadow: accentColor === color ? `0 0 0 2px ${color}` : 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => updateSettings({ accentColor: color })}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab Content */}
          {activeTab === 'notifications' && (
            <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Notification Preferences</h3>
                <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Choose what updates you want to receive and how you receive them.</p>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                  <div className="flex justify-between items-center" style={{padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 8, backgroundColor: 'var(--color-surface)'}}>
                    <div>
                      <div style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Email Notifications</div>
                      <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>Receive updates directly to your inbox.</div>
                    </div>
                    <button onClick={() => setNotifications({...notifications, email: !notifications.email})} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                      {notifications.email ? <ToggleRight size={32} color="var(--color-primary)" /> : <ToggleLeft size={32} color="var(--color-text-muted)" />}
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center" style={{padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 8, backgroundColor: 'var(--color-surface)'}}>
                    <div>
                      <div style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Push Notifications</div>
                      <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>Receive instant browser push notifications.</div>
                    </div>
                    <button onClick={() => setNotifications({...notifications, push: !notifications.push})} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                      {notifications.push ? <ToggleRight size={32} color="var(--color-primary)" /> : <ToggleLeft size={32} color="var(--color-text-muted)" />}
                    </button>
                  </div>

                  <div className="flex justify-between items-center" style={{padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 8, backgroundColor: 'var(--color-surface)'}}>
                    <div>
                      <div style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Critical Alerts Only</div>
                      <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>Only notify me about critical organizational changes.</div>
                    </div>
                    <button onClick={() => setNotifications({...notifications, critical: !notifications.critical})} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                      {notifications.critical ? <ToggleRight size={32} color="var(--color-primary)" /> : <ToggleLeft size={32} color="var(--color-text-muted)" />}
                    </button>
                  </div>

                  <div className="flex justify-between items-center" style={{padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 8, backgroundColor: 'var(--color-surface)'}}>
                    <div>
                      <div style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Weekly Summary Digest</div>
                      <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>Receive a weekly rollup of structural and team changes.</div>
                    </div>
                    <button onClick={() => setNotifications({...notifications, weekly: !notifications.weekly})} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                      {notifications.weekly ? <ToggleRight size={32} color="var(--color-primary)" /> : <ToggleLeft size={32} color="var(--color-text-muted)" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab Content */}
          {activeTab === 'security' && (
            <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Authentication Methods</h3>
                <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Manage how users sign in and access the system.</p>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                  <div className="flex justify-between items-center" style={{padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 8, backgroundColor: 'var(--color-surface)'}}>
                    <div>
                      <div style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Multi-Factor Authentication (MFA)</div>
                      <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>Require secondary verification for all admin logins.</div>
                    </div>
                    <button onClick={() => setSecurity({...security, mfa: !security.mfa})} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                      {security.mfa ? <ToggleRight size={32} color="var(--color-success)" /> : <ToggleLeft size={32} color="var(--color-text-muted)" />}
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center" style={{padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 8, backgroundColor: 'var(--color-surface)'}}>
                    <div>
                      <div style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Single Sign-On (SSO)</div>
                      <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>Enable SAML/OIDC authentication via Okta or Azure AD.</div>
                    </div>
                    <button onClick={() => setSecurity({...security, sso: !security.sso})} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                      {security.sso ? <ToggleRight size={32} color="var(--color-success)" /> : <ToggleLeft size={32} color="var(--color-text-muted)" />}
                    </button>
                  </div>
                </div>
              </div>

              <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />
              
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Password Policy</h3>
                <div className="flex flex-col gap-2" style={{maxWidth: 300}}>
                  <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Require Password Reset Every:</label>
                  <select 
                    value={security.passwordExpiry}
                    onChange={(e) => setSecurity({...security, passwordExpiry: e.target.value})}
                    className="input-field"
                  >
                    <option>Never</option>
                    <option>30 Days</option>
                    <option>90 Days</option>
                    <option>180 Days</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab Content */}
          {activeTab === 'integrations' && (
            <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Connected Apps</h3>
                <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Integrate SAMS with your existing enterprise toolchain.</p>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24}}>
                  
                  <div className="card" style={{padding: 24, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}}>
                    <div className="flex justify-between items-start mb-4">
                      <div style={{width: 48, height: 48, borderRadius: 12, backgroundColor: '#E1F5FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0288D1', fontWeight: 700, fontSize: '1.2rem'}}>W</div>
                      <span style={{padding: '4px 8px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)'}}>Connected</span>
                    </div>
                    <h4 style={{fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4}}>Workday HRIS</h4>
                    <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 16}}>Automatically sync employee roster and department changes daily.</p>
                    <button style={{width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: 8, background: 'none', fontWeight: 600, color: 'var(--color-text-main)', cursor: 'pointer'}}>Configure Sync</button>
                  </div>

                  <div className="card" style={{padding: 24, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}}>
                    <div className="flex justify-between items-start mb-4">
                      <div style={{width: 48, height: 48, borderRadius: 12, backgroundColor: '#F3E5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B1FA2', fontWeight: 700, fontSize: '1.2rem'}}>S</div>
                      <span style={{padding: '4px 8px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)'}}>Not Connected</span>
                    </div>
                    <h4 style={{fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4}}>Slack Integration</h4>
                    <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 16}}>Send automated structural change notifications to designated channels.</p>
                    <button style={{width: '100%', padding: '8px', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: 8, fontWeight: 600, color: 'white', cursor: 'pointer'}} onClick={() => addToast('Connecting to Slack...', 'info')}>Connect App</button>
                  </div>

                  <div className="card" style={{padding: 24, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}}>
                    <div className="flex justify-between items-start mb-4">
                      <div style={{width: 48, height: 48, borderRadius: 12, backgroundColor: '#E8EAF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F51B5', fontWeight: 700, fontSize: '1.2rem'}}>A</div>
                      <span style={{padding: '4px 8px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)'}}>Not Connected</span>
                    </div>
                    <h4 style={{fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4}}>Active Directory</h4>
                    <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 16}}>Sync user provisioning, roles, and access controls with Azure AD.</p>
                    <button style={{width: '100%', padding: '8px', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: 8, fontWeight: 600, color: 'white', cursor: 'pointer'}} onClick={() => addToast('Connecting to Azure AD...', 'info')}>Connect App</button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Data Management Tab Content */}
          {activeTab === 'data' && (
            <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Backup & Restore</h3>
                <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Create manual snapshots of the organizational hierarchy.</p>
                
                <div className="card" style={{padding: 24, backgroundColor: 'rgba(79, 70, 229, 0.02)', border: '1px dashed var(--color-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                   <div>
                     <h4 style={{fontWeight: 600, color: 'var(--color-primary)'}}>Manual Snapshot</h4>
                     <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Export all organizational data to a JSON file.</p>
                   </div>
                   <button className="btn-primary" onClick={() => {
                     // Get current state from the store
                     const orgState = useOrgStore.getState();
                     
                     // Filter out history and UI-specific state if desired, or export everything
                     const exportData = {
                       nodes: orgState.nodes,
                       edges: orgState.edges,
                       departments: orgState.departments,
                       employeeHistory: orgState.employeeHistory,
                       versions: orgState.versions,
                       auditLogs: orgState.auditLogs
                     };
                     
                     // Create a Blob containing the JSON data
                     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
                     const downloadAnchorNode = document.createElement('a');
                     downloadAnchorNode.setAttribute("href", dataStr);
                     downloadAnchorNode.setAttribute("download", `SAMS_Backup_${new Date().toISOString().split('T')[0]}.json`);
                     document.body.appendChild(downloadAnchorNode); // required for firefox
                     downloadAnchorNode.click();
                     downloadAnchorNode.remove();
                     
                     addToast('Backup created and downloaded successfully.', 'success');
                   }} style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
                     <Download size={16} /> Create Backup
                   </button>
                </div>
              </div>

              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-danger)'}}>Danger Zone</h3>
                <div className="card" style={{padding: 24, border: '1px solid rgba(239, 68, 68, 0.3)'}}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Purge Audit Logs</h4>
                      <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Permanently delete audit logs older than 90 days.</p>
                    </div>
                    <button onClick={() => { if(window.confirm('Are you sure you want to purge audit logs?')) addToast('Audit logs purged successfully.', 'success'); }} style={{padding: '8px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', fontWeight: 600, border: '1px solid rgba(239, 68, 68, 0.2)', cursor: 'pointer', borderRadius: 8}}>
                      Purge Logs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Settings;
