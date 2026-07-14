import React from 'react';
import { Search, Bell, MessageSquare, Moon, Sun, RefreshCw, Zap, Settings, Command } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useOrgStore } from '../store/orgStore';

const OrgStudioTopNav = () => {
  const { isDarkMode, toggleDarkMode, addToast, currentUser } = useUIStore();
  const { excelSyncStatus, versions } = useOrgStore();

  const currentVersion = versions.find(v => v.active)?.id || 'v1.0.0';

  return (
    <div style={{
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40
    }}>
      <div className="flex items-center gap-6">
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--color-text-main)', lineHeight: 1.2 }}>Organization Studio</h1>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Strategic Authority Mapping System</div>
        </div>

        <div style={{ width: 1, height: 24, backgroundColor: 'var(--color-border)' }}></div>

        {/* Global Search */}
        <div style={{ position: 'relative', width: 300 }}>
          <div style={{ position: 'absolute', left: 12, top: 10, color: 'var(--color-text-muted)' }}><Search size={16} /></div>
          <input 
            type="text" 
            placeholder="Search employees, skills, IDs..." 
            style={{ 
              width: '100%', 
              padding: '8px 12px 8px 36px', 
              borderRadius: 8, 
              border: '1px solid var(--color-border)', 
              backgroundColor: 'var(--color-surface)',
              fontSize: '0.85rem'
            }} 
          />
          <div style={{ position: 'absolute', right: 8, top: 8, display: 'flex', gap: 4 }}>
            <span style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: 'var(--color-bg)', borderRadius: 4, border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 }}>⌘</span>
            <span style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: 'var(--color-bg)', borderRadius: 4, border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 }}>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Sync Status */}
        <div className="flex items-center gap-2" style={{ padding: '6px 12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 20 }}>
          <RefreshCw size={14} color="var(--color-success)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-success)' }}>{excelSyncStatus}</span>
        </div>

        {/* Version */}
        <div className="flex items-center gap-2" style={{ padding: '6px 12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 20 }}>
          <Zap size={14} color="var(--color-primary)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{currentVersion}</span>
        </div>

        <div style={{ width: 1, height: 24, backgroundColor: 'var(--color-border)', margin: '0 8px' }}></div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="icon-btn" title="Toggle Theme" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn" title="Messages"><MessageSquare size={18} /></button>
          <button className="icon-btn" title="Notifications">
            <div style={{position: 'relative'}}>
              <Bell size={18} />
              <span style={{position: 'absolute', top: -2, right: -2, width: 8, height: 8, backgroundColor: 'var(--color-danger)', borderRadius: '50%'}}></span>
            </div>
          </button>
        </div>

        {/* Profile */}
        <div 
          onClick={() => document.getElementById('profile-trigger')?.click()}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 8, cursor: 'pointer', padding: '4px 12px', borderRadius: 8, transition: 'background-color 0.2s' }} 
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{currentUser?.name || 'System Admin'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{currentUser?.role || 'SAMS Superuser'}</div>
          </div>
          
          {currentUser?.photo ? (
            <img src={currentUser.photo} alt="Profile" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }} />
          ) : (
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1rem' }}>
              {currentUser?.name ? currentUser.name.charAt(0) : 'SA'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgStudioTopNav;
