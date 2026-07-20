import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, Palette, Bell, Shield, Users, Sparkles, Building2, 
  Database, Server, ShieldCheck, Activity, Link as LinkIcon, 
  DownloadCloud, UploadCloud, RotateCcw, Save, Settings as SettingsIcon, History, HardDrive, Sliders
} from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { useUIStore } from '../store/uiStore';
import SettingsAIPanel from '../components/settings/SettingsAIPanel';
import GeneralSettings from '../components/settings/GeneralSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import AISettings from '../components/settings/AISettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationsSettings from '../components/settings/NotificationsSettings';
import OrganizationSettings from '../components/settings/OrganizationSettings';
import IntegrationsSettings from '../components/settings/IntegrationsSettings';
import DataManagementSettings from '../components/settings/DataManagementSettings';
import AuditSettings from '../components/settings/AuditSettings';
import UsersSettings from '../components/settings/UsersSettings';
import DatabaseSettings from '../components/settings/DatabaseSettings';
import StorageSettings from '../components/settings/StorageSettings';
import AdvancedSettings from '../components/settings/AdvancedSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isAIPanelExpanded, setIsAIPanelExpanded] = useState(true);
  
  const globalSettings = useSettingsStore(s => s);
  const { updateSettings } = useSettingsStore();
  const { addToast, setDarkMode } = useUIStore();
  
  // Local draft state for the Save Experience
  const [draftState, setDraftState] = useState({});
  const [lastSaved, setLastSaved] = useState(new Date().toLocaleTimeString());

  // Initialize draft state from global store on mount
  useEffect(() => {
    setDraftState({
      companyName: globalSettings.companyName,
      instanceName: globalSettings.instanceName,
      idleTimeout: globalSettings.idleTimeout,
      theme: globalSettings.theme,
      accentColor: globalSettings.accentColor,
      
      // Defaults for new AI/Security/Org settings (since they might not exist in global store yet)
      aiEnabled: globalSettings.aiEnabled ?? true,
      aiRecommendations: globalSettings.aiRecommendations ?? true,
      aiPredictive: globalSettings.aiPredictive ?? false,
      aiAutoRisk: globalSettings.aiAutoRisk ?? true,
      aiSmartReports: globalSettings.aiSmartReports ?? true,
      
      secMfa: globalSettings.secMfa ?? true,
      secSso: globalSettings.secSso ?? false,
      secLoginAlerts: globalSettings.secLoginAlerts ?? true,
      
      notifEmail: globalSettings.notifEmail ?? true,
      notifPush: globalSettings.notifPush ?? false,
      notifSms: globalSettings.notifSms ?? false,
      notifCritical: globalSettings.notifCritical ?? true,
      notifApprovals: globalSettings.notifApprovals ?? true,
      notifAI: globalSettings.notifAI ?? true
    });
  }, [
    globalSettings.companyName, 
    globalSettings.instanceName, 
    globalSettings.idleTimeout, 
    globalSettings.theme, 
    globalSettings.accentColor
  ]);

  const handleChange = (key, value) => {
    setDraftState(prev => ({ ...prev, [key]: value }));
  };

  // Check if draftState differs from globalSettings
  const isDirty = useMemo(() => {
    // Basic check for the primary fields
    if (draftState.companyName !== globalSettings.companyName) return true;
    if (draftState.instanceName !== globalSettings.instanceName) return true;
    if (draftState.idleTimeout !== globalSettings.idleTimeout) return true;
    if (draftState.theme !== globalSettings.theme) return true;
    if (draftState.accentColor !== globalSettings.accentColor) return true;
    
    // Check new toggles
    if (draftState.aiEnabled !== (globalSettings.aiEnabled ?? true)) return true;
    if (draftState.secMfa !== (globalSettings.secMfa ?? true)) return true;
    if (draftState.notifEmail !== (globalSettings.notifEmail ?? true)) return true;
    if (draftState.notifPush !== (globalSettings.notifPush ?? false)) return true;

    return false;
  }, [draftState, globalSettings]);

  const handleSave = () => {
    updateSettings(draftState);
    setLastSaved(new Date().toLocaleTimeString());
    addToast('Platform configuration saved successfully.', 'success');
    
    // Apply immediate theme effects
    if (draftState.theme === 'Dark') setDarkMode(true);
    else if (draftState.theme === 'Light') setDarkMode(false);
    else setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  };

  const handleReset = () => {
    // Reset draftState back to globalSettings
    setDraftState({
      companyName: globalSettings.companyName,
      instanceName: globalSettings.instanceName,
      idleTimeout: globalSettings.idleTimeout,
      theme: globalSettings.theme,
      accentColor: globalSettings.accentColor,
      aiEnabled: globalSettings.aiEnabled ?? true,
      secMfa: globalSettings.secMfa ?? true,
      notifEmail: globalSettings.notifEmail ?? true
    });
    addToast('Configuration reset to last saved state.', 'info');
  };
  
  const navGroups = [
    {
      title: "Core Configuration",
      items: [
        { id: 'general', name: 'General', icon: User, desc: 'Company & session details' },
        { id: 'appearance', name: 'Appearance', icon: Palette, desc: 'Themes & UI scaling' },
        { id: 'notifications', name: 'Notifications', icon: Bell, desc: 'Alert channels & rules' }
      ]
    },
    {
      title: "Access & Intelligence",
      items: [
        { id: 'security', name: 'Security & Authentication', icon: Shield, desc: 'MFA, SSO, passwords' },
        { id: 'users', name: 'Users & Roles', icon: Users, desc: 'Roles & provisioning' },
        { id: 'ai', name: 'AI Configuration', icon: Sparkles, desc: 'Models & thresholds' }
      ]
    },
    {
      title: "Platform Setup",
      items: [
        { id: 'organization', name: 'Organization', icon: Building2, desc: 'Regions & defaults' },
        { id: 'database', name: 'Database', icon: Database, desc: 'Schemas & connection' },
        { id: 'storage', name: 'Storage', icon: HardDrive, desc: 'Asset & file storage' },
        { id: 'integrations', name: 'API & Integrations', icon: LinkIcon, desc: 'Connected apps' }
      ]
    },
    {
      title: "Compliance",
      items: [
        { id: 'data', name: 'Backup & Recovery', icon: Server, desc: 'Snapshots & retention' },
        { id: 'audit', name: 'Audit & Compliance', icon: ShieldCheck, desc: 'Activity logs' },
        { id: 'advanced', name: 'Advanced', icon: Sliders, desc: 'Developer settings' }
      ]
    }
  ];

  return (
    <div className="page-container">
      
      {/* Premium Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--color-text-main)', margin: '0 0 4px 0'}}>Platform Control Center</h1>
          <p style={{color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px', fontWeight: 500}}>Configure security, AI preferences, integrations, users, notifications, organization settings and platform behaviour.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 16 }}>
            {isDirty ? (
              <>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-warning)', textTransform: 'uppercase' }}>Unsaved Changes</span>
                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Auto-save paused</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>Saved</span>
                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Last saved: {lastSaved}</span>
              </>
            )}
          </div>

          <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600 }}>
            <History size={16} /> History
          </button>
          
          <button onClick={handleReset} disabled={!isDirty} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8, cursor: isDirty ? 'pointer' : 'not-allowed', opacity: isDirty ? 1 : 0.5, fontWeight: 600 }}>
            <RotateCcw size={16} /> Reset
          </button>
          <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600 }}>
            <DownloadCloud size={16} /> Export
          </button>
          <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600 }}>
            <UploadCloud size={16} /> Import
          </button>
          
          <button 
            onClick={handleSave}
            disabled={!isDirty}
            style={{ 
              padding: '10px 24px', borderRadius: '8px', border: 'none', 
              backgroundColor: isDirty ? 'var(--color-primary)' : 'var(--color-border)', 
              color: isDirty ? 'white' : 'var(--color-text-muted)', 
              display: 'flex', alignItems: 'center', gap: 8, 
              cursor: isDirty ? 'pointer' : 'not-allowed', 
              fontWeight: 700,
              boxShadow: isDirty ? '0 4px 12px rgba(79, 70, 229, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className="page-content-scrollable" style={{ padding: '8px 0 24px 0', marginTop: 0 }}>
        {/* System Status Ribbon */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 32, flexShrink: 0 }}>
        {[
          { label: 'Platform Health', value: 'Excellent', icon: Activity, color: 'var(--color-success)' },
          { label: 'Config Score', value: '94/100', icon: SettingsIcon, color: 'var(--color-primary)' },
          { label: 'Security Score', value: '92/100', icon: ShieldCheck, color: 'var(--color-warning)' },
          { label: 'Online Users', value: '1,248', icon: Users, color: '#8b5cf6' },
          { label: 'Integrations', value: '4 Active', icon: LinkIcon, color: '#0ea5e9' },
          { label: 'Storage Usage', value: '42.8 GB', icon: HardDrive, color: '#f43f5e' }
        ].map((stat, idx) => (
          <div key={idx} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, backgroundColor: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={16} color={stat.color} />
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: stat.color }}></div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        
        {/* Rich Left Navigation */}
        <div style={{ width: 280, flexShrink: 0, position: 'sticky', top: '100px', height: 'calc(100vh - 120px)', overflowY: 'auto' }} className="hide-scrollbar">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, paddingLeft: 12 }}>
                {group.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {group.items.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        padding: '12px',
                        backgroundColor: isActive ? 'white' : 'transparent',
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                        borderRadius: 12,
                        border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                        boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        transition: 'all 0.2s ease'
                      }}
                      className="hover-lift"
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: isActive ? 'rgba(79, 70, 229, 0.1)' : 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={16} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: isActive ? 700 : 600 }}>{tab.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 2 }}>{tab.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Settings Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'general' && <GeneralSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'appearance' && <AppearanceSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'ai' && <AISettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'security' && <SecuritySettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'notifications' && <NotificationsSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'organization' && <OrganizationSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'database' && <DatabaseSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'storage' && <StorageSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'integrations' && <IntegrationsSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'data' && <DataManagementSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'audit' && <AuditSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'advanced' && <AdvancedSettings state={draftState} handleChange={handleChange} />}
          {activeTab === 'users' && <UsersSettings state={draftState} handleChange={handleChange} />}
        </div>

        {/* AI Assistant Right Panel */}
        <SettingsAIPanel 
          isExpanded={isAIPanelExpanded}
          onToggle={() => setIsAIPanelExpanded(!isAIPanelExpanded)}
        />
        
      </div>
      </div>
    </div>
  );
};

export default Settings;
