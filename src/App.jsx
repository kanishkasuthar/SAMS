import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import ToastContainer from './components/ToastContainer';
import { useUIStore } from './store/uiStore';
import { 
  LayoutDashboard, 
  Network, 
  Briefcase, 
  Users as UsersIcon, 
  Building2, 
  Contact,
  GitBranch,
  Grid,
  LineChart,
  FileText,
  Lightbulb,
  RefreshCcw,
  History as HistoryIcon,
  ShieldAlert,
  Clock,
  Bell,
  UserCog,
  Settings as SettingsIcon,
  Search,
  Moon,
  Globe,
  MessageSquare
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import OrgStudio from './pages/OrgStudio';
import SyncCenter from './pages/SyncCenter';
import Projects from './pages/Projects';
import OrgInsights from './pages/OrgInsights';
import AuditLogs from './pages/AuditLogs';
import People from './pages/People';
import Departments from './pages/Departments';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import VersionHistory from './pages/VersionHistory';
import DecisionFlow from './pages/DecisionFlow';
import ResponsibilityMatrix from './pages/ResponsibilityMatrix';
import Roles from './pages/Roles';
import Users from './pages/Users';
import Sessions from './pages/Sessions';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';

// Placeholder Pages (None left, but keep for fallback)
const GenericPage = ({ title }) => <div className="page-container"><h2>{title}</h2><p>This module is under construction.</p></div>;

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Organization Studio', path: '/studio', icon: Network },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'People', path: '/people', icon: UsersIcon },
  { name: 'Departments', path: '/departments', icon: Building2 },
  { name: 'Roles', path: '/roles', icon: Contact },
  { name: 'Decision Flow', path: '/decision-flow', icon: GitBranch },
  { name: 'Responsibility Matrix', path: '/matrix', icon: Grid },
  { name: 'Analytics', path: '/analytics', icon: LineChart },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Organization Insights', path: '/insights', icon: Lightbulb },
  { name: 'Sync Center', path: '/sync', icon: RefreshCcw },
  { name: 'Version History', path: '/history', icon: HistoryIcon },
  { name: 'Audit Logs', path: '/audit', icon: ShieldAlert },
  { name: 'Sessions', path: '/sessions', icon: Clock },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Users', path: '/users', icon: UserCog },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

function App() {
  const location = useLocation();
  const { addToast, isDarkMode, toggleDarkMode, isAuthenticated, logout, authMode } = useUIStore();
  const currentTitle = SIDEBAR_ITEMS.find(item => item.path === location.pathname)?.name || 'SAMS';

  if (!isAuthenticated) {
    return (
      <div className={`theme-root ${isDarkMode ? 'dark-mode' : ''}`}>
        {authMode === 'login' ? <Login /> : <SignUp />}
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <ToastContainer />
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Network className="sidebar-logo" size={28} />
          <span className="sidebar-title">SAMS</span>
        </div>
        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.name} 
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        {/* TOP NAVIGATION */}
        <header className="topbar glass">
          <div className="topbar-search">
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder={`Search in ${currentTitle}...`} 
              onKeyDown={(e) => { if (e.key === 'Enter') addToast(`Searching for "${e.target.value}" in ${currentTitle}...`, 'info'); }}
            />
          </div>
          
          <div className="topbar-actions">
            <button className="icon-btn" title="Organization Selector" onClick={() => addToast('Organization selector opened', 'info')}><Globe size={20} /></button>
            <button className="icon-btn" title="Messages" onClick={() => addToast('Messages opened', 'info')}><MessageSquare size={20} /></button>
            <button className="icon-btn" title="Notifications" onClick={() => addToast('Notifications opened', 'info')}>
              <div className="relative">
                <Bell size={20} />
                <span className="absolute" style={{top: -2, right: 0, width: 8, height: 8, backgroundColor: 'var(--color-danger)', borderRadius: '50%'}}></span>
              </div>
            </button>
            <button className="icon-btn" title="Dark Mode" onClick={toggleDarkMode}>
              {isDarkMode ? <Lightbulb size={20} /> : <Moon size={20} />}
            </button>
            
            <div style={{width: 1, height: 24, backgroundColor: 'var(--color-border)', margin: '0 8px'}}></div>
            
            <button className="profile-btn" onClick={() => logout()} title="Logout">
              <div className="profile-avatar">KS</div>
              <div className="flex flex-col" style={{alignItems: 'flex-start'}}>
                <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Kanishka Suthar</span>
                <span style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>Admin Session</span>
              </div>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/studio" element={<OrgStudio />} />
          <Route path="/sync" element={<SyncCenter />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/insights" element={<OrgInsights />} />
          <Route path="/audit" element={<AuditLogs />} />
          <Route path="/people" element={<People />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<VersionHistory />} />
          <Route path="/decision-flow" element={<DecisionFlow />} />
          <Route path="/matrix" element={<ResponsibilityMatrix />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          
          {SIDEBAR_ITEMS.filter(i => !['/', '/studio', '/sync', '/projects', '/insights', '/audit', '/people', '/departments', '/analytics', '/settings', '/history', '/decision-flow', '/matrix', '/roles', '/users', '/sessions', '/notifications', '/reports'].includes(i.path)).map(item => (
             <Route key={item.path} path={item.path} element={<GenericPage title={item.name} />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default App
