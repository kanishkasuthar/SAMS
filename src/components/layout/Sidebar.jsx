import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Network, LayoutDashboard, Briefcase, Users as UsersIcon, Building2, Contact,
  GitBranch, Grid, LineChart, FileText, Lightbulb, RefreshCcw,
  History as HistoryIcon, ShieldAlert, Clock, Bell, UserCog, Settings as SettingsIcon,
  Activity
} from 'lucide-react';

export const SIDEBAR_GROUPS = [
  {
    label: 'CORE',
    items: [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Organization Studio', path: '/studio', icon: Network },
      { name: 'Projects', path: '/projects', icon: Briefcase },
      { name: 'People', path: '/people', icon: UsersIcon },
      { name: 'Departments', path: '/departments', icon: Building2 },
      { name: 'Roles', path: '/roles', icon: Contact },
      { name: 'Decision Flows', path: '/decision-flow', icon: GitBranch },
      { name: 'Responsibility Matrix', path: '/matrix', icon: Grid },
    ]
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { name: 'Analytics', path: '/analytics', icon: LineChart },
      { name: 'Reports', path: '/reports', icon: FileText },
      { name: 'Organization Insights', path: '/insights', icon: Lightbulb },
    ]
  },
  {
    label: 'DATA & CONTROL',
    items: [
      { name: 'Sync Center', path: '/sync', icon: RefreshCcw },
      { name: 'Version History', path: '/history', icon: HistoryIcon },
      { name: 'Organization Intelligence', path: '/audit', icon: ShieldAlert },
      { name: 'Session Replay', path: '/sessions', icon: Clock },
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { name: 'Notifications', path: '/notifications', icon: Bell },
      { name: 'Users', path: '/users', icon: UserCog },
      { name: 'Settings', path: '/settings', icon: SettingsIcon },
    ]
  }
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Network className="sidebar-logo" size={28} color="var(--color-primary)" />
        <div className="sidebar-title-container">
          <span className="sidebar-title">SAMS</span>
          <span className="sidebar-subtitle" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>Strategic Authority Mapping</span>
        </div>
      </div>
      
      <nav className="sidebar-nav hide-scrollbar">
        {SIDEBAR_GROUPS.map((group, idx) => (
          <div key={idx} className="sidebar-group" style={{ marginBottom: 'var(--space-2)' }}>
            <div className="sidebar-group-label" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-secondary)', padding: 'var(--space-1) var(--space-2)', letterSpacing: '0.05em' }}>{group.label}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink 
                  key={item.name} 
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Organization Health Widget - Pinned to bottom */}
      <div className="sidebar-widget" style={{ padding: 'var(--space-3)', borderTop: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'var(--color-sidebar-secondary)' }}>
        <div className="flex justify-between items-center" style={{marginBottom: 8}}>
          <span style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Organization Health</span>
          <Activity size={14} color="var(--color-success)" />
        </div>
        <div className="flex items-end gap-2" style={{marginBottom: 4}}>
          <span style={{fontSize: '1.5rem', fontWeight: 700, color: 'white', lineHeight: 1}}>94%</span>
          <span style={{fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-success)', paddingBottom: 2}}>Excellent</span>
        </div>
        <span style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>Structure Stable</span>
        <div style={{width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: 8, overflow: 'hidden'}}>
          <div style={{width: '94%', height: '100%', backgroundColor: 'var(--color-success)', borderRadius: 2}}></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
