import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Network, LayoutDashboard, Briefcase, Users as UsersIcon, Building2, Contact,
  GitBranch, Grid, LineChart, FileText, Lightbulb, RefreshCcw,
  History as HistoryIcon, ShieldAlert, Clock, Bell, UserCog, Settings as SettingsIcon,
  Activity
} from 'lucide-react';

export const SIDEBAR_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Organization Studio', path: '/studio', icon: Network },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'People', path: '/people', icon: UsersIcon },
  { name: 'Departments', path: '/departments', icon: Building2 },
  { name: 'Decision Flows', path: '/decision-flow', icon: GitBranch },
  { name: 'Responsibility Matrix', path: '/matrix', icon: Grid },
];

export const SIDEBAR_INSIGHTS = [
  { name: 'Analytics', path: '/analytics', icon: LineChart },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Organization Insights', path: '/insights', icon: Lightbulb },
];

export const SIDEBAR_ACTIVITY = [
  { name: 'Notifications', path: '/notifications', icon: Bell, badge: '12' },
  { name: 'Audit Logs', path: '/audit', icon: ShieldAlert },
  { name: 'Sessions', path: '/sessions', icon: Clock },
];

export const SIDEBAR_SYSTEM = [
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
  { name: 'Role Management', path: '/roles', icon: UserCog },
];

const Sidebar = () => {
  const NavGroup = ({ title, items }) => (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748B', letterSpacing: '0.05em', marginBottom: 8, paddingLeft: 16 }}>
        {title}
      </div>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.name} to={item.path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderRadius: 8, color: '#94A3B8', textDecoration: 'none', marginBottom: 2}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Icon size={16} />
              <span style={{fontSize: '0.8rem', fontWeight: 500}}>{item.name}</span>
            </div>
            {item.badge && <span style={{backgroundColor: '#4F46E5', color: 'white', fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', borderRadius: 10}}>{item.badge}</span>}
          </NavLink>
        )
      })}
    </div>
  );

  return (
    <aside className="sidebar" style={{ backgroundColor: '#0F172A', color: 'white', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="sidebar-header" style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, backgroundColor: '#4F46E5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Network size={20} color="white" />
        </div>
        <div className="sidebar-title-container">
          <div style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.2 }}>SAMS</div>
          <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 500 }}>Strategic Authority<br/>Mapping System</div>
        </div>
      </div>
      
      <nav className="sidebar-nav" style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
        <NavGroup title="MAIN" items={SIDEBAR_ITEMS} />
        <NavGroup title="INSIGHTS" items={SIDEBAR_INSIGHTS} />
        <NavGroup title="ACTIVITY" items={SIDEBAR_ACTIVITY} />
        <NavGroup title="SYSTEM" items={SIDEBAR_SYSTEM} />
      </nav>

      {/* Organization Health Widget - Exact Image Match */}
      <div className="sidebar-widget" style={{ margin: '16px', padding: '16px', backgroundColor: '#1E293B', borderRadius: 12 }}>
        <div style={{fontSize: '0.8rem', fontWeight: 600, color: 'white', marginBottom: 12}}>Organization Health</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
          {/* Circular Progress */}
          <div style={{position: 'relative', width: 44, height: 44, borderRadius: '50%', background: 'conic-gradient(#10B981 92%, #334155 0)'}}>
            <div style={{position: 'absolute', top: 3, left: 3, right: 3, bottom: 3, backgroundColor: '#1E293B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white'}}>
              92%
            </div>
          </div>
          <div>
            <div style={{fontSize: '0.75rem', fontWeight: 600, color: '#10B981', marginBottom: 2}}>Excellent</div>
            <div style={{fontSize: '0.65rem', color: '#94A3B8', lineHeight: 1.2}}>Your organization<br/>structure looks good.</div>
          </div>
        </div>
        {/* Mock Line Graph SVG */}
        <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
          <path d="M0 20 Q 5 15, 10 18 T 20 12 T 30 16 T 40 8 T 50 14 T 60 5 T 70 12 T 80 4 T 90 10 T 100 2" fill="none" stroke="#4F46E5" strokeWidth="1.5" />
          <circle cx="0" cy="20" r="2" fill="#4F46E5" />
          <circle cx="10" cy="18" r="2" fill="#4F46E5" />
          <circle cx="20" cy="12" r="2" fill="#4F46E5" />
          <circle cx="30" cy="16" r="2" fill="#4F46E5" />
          <circle cx="40" cy="8" r="2" fill="#4F46E5" />
          <circle cx="50" cy="14" r="2" fill="#4F46E5" />
          <circle cx="60" cy="5" r="2" fill="#4F46E5" />
          <circle cx="70" cy="12" r="2" fill="#4F46E5" />
          <circle cx="80" cy="4" r="2" fill="#4F46E5" />
          <circle cx="90" cy="10" r="2" fill="#4F46E5" />
          <circle cx="100" cy="2" r="2" fill="#4F46E5" />
        </svg>
      </div>
    </aside>
  );
};

export default Sidebar;
