import React, { useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import ToastContainer from './components/ToastContainer';
import { useUIStore } from './store/uiStore';
import { useSettingsStore } from './store/settingsStore';
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
  MessageSquare,
  Activity
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
import ReportViewer from './pages/ReportViewer';
import CommandCenter from './pages/CommandCenter';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CurrentUserProfilePanel from './components/CurrentUserProfilePanel';
import Sidebar, { SIDEBAR_ITEMS } from './components/layout/Sidebar';
import TopNavbar from './components/layout/TopNavbar';
import AIChatAssistant from './components/intelligence/AIChatAssistant';
import ErrorBoundary from './components/common/ErrorBoundary';
import GlobalModalProvider from './components/modals/GlobalModalProvider';
import GlobalDrawerProvider from './components/drawers/GlobalDrawerProvider';
import NotFound from './pages/NotFound';
import './App.css';

// Placeholder Pages (None left, but keep for fallback)
const GenericPage = ({ title }) => <div className="page-container"><h2>{title}</h2><p>This module is under construction.</p></div>;



function App() {
  const location = useLocation();
  const { addToast, isDarkMode, setDarkMode, isAuthenticated, logout, authMode, currentUser } = useUIStore();
  const { theme, accentColor } = useSettingsStore();
  const [showMyProfile, setShowMyProfile] = React.useState(false);
  
  const currentTitle = SIDEBAR_ITEMS.find(item => item.path === location.pathname)?.name || 'SAMS';

  // Apply theme on mount and when it changes
  useEffect(() => {
    if (theme === 'Dark') setDarkMode(true);
    else if (theme === 'Light') setDarkMode(false);
    else setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [theme, setDarkMode]);

  // Initialize Auth & Settings
  useEffect(() => {
    useUIStore.getState().initializeAuth();
    useSettingsStore.getState().fetchSettings();
  }, []);

  // Apply accent color
  useEffect(() => {
    if (accentColor) {
      document.documentElement.style.setProperty('--color-primary', accentColor);
    }
  }, [accentColor]);

  // Keyboard shortcut for global search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search').focus();
        addToast('Global Search opened (⌘K)', 'info');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addToast]);

  if (!isAuthenticated) {
    return (
      <div className={`theme-root ${isDarkMode ? 'dark-mode' : ''}`}>
        {authMode === 'login' ? <Login /> : <SignUp />}
        {/* Global Overlays */}
        <GlobalModalProvider />
        <GlobalDrawerProvider />
      </div>
    );
  }

  return (
    <div className="app-container">
      <ToastContainer />
        <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        {/* TOP NAVIGATION */}
        <TopNavbar currentTitle={currentTitle} />

        {/* PAGE CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
          <ErrorBoundary key={location.pathname}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/studio" element={<OrgStudio />} />
              <Route path="/sync" element={<SyncCenter />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/insights" element={<OrgInsights />} />
              <Route path="/audit" element={<AuditLogs />} />
              <Route path="/people" element={<People />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/command-center" element={<CommandCenter />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/history" element={<VersionHistory />} />
              <Route path="/decision-flow" element={<DecisionFlow />} />
              <Route path="/matrix" element={<ResponsibilityMatrix />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/users" element={<Users />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/:reportId" element={<ReportViewer />} />
              
              {SIDEBAR_ITEMS.filter(i => !['/', '/dashboard', '/studio', '/sync', '/projects', '/insights', '/audit', '/people', '/departments', '/analytics', '/command-center', '/settings', '/history', '/decision-flow', '/matrix', '/roles', '/users', '/sessions', '/notifications', '/reports'].includes(i.path)).map(item => (
                 <Route key={item.path} path={item.path} element={<GenericPage title={item.name} />} />
              ))}
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </main>
      
      {/* Global AI Chat Assistant */}
      <AIChatAssistant />

      {/* Global Overlays */}
      <GlobalModalProvider />
      <GlobalDrawerProvider />
    </div>
  )
}

export default App
