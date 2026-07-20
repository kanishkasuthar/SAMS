import React, { useState, useMemo } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import NotificationSummary from '../components/notifications/NotificationSummary';
import NotificationFilterBar from '../components/notifications/NotificationFilterBar';
import NotificationList from '../components/notifications/NotificationList';
import NotificationAIPanel from '../components/notifications/NotificationAIPanel';
import NotificationDetailDrawer from '../components/notifications/NotificationDetailDrawer';
import NotificationAIChat from '../components/notifications/NotificationAIChat';
import { Search, RefreshCw, Settings, Sparkles } from 'lucide-react';

const Notifications = () => {
  const [activeFilters, setActiveFilters] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIPanelExpanded, setIsAIPanelExpanded] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { notifications, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();

  React.useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Filter Logic
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.message.toLowerCase().includes(q) || 
        n.department.toLowerCase().includes(q)
      );
    }

    // Chip filters
    if (!activeFilters.includes('All')) {
      filtered = filtered.filter(n => {
        if (activeFilters.includes('Unread') && !n.read) return true;
        if (activeFilters.includes('Critical') && n.type === 'Critical') return true;
        if (activeFilters.includes('Approvals') && n.type === 'Approval Required') return true;
        if (activeFilters.includes('AI Insights') && n.type === 'AI Suggestion') return true;
        if (activeFilters.includes('Organization Changes') && n.category === 'Organization Changes') return true;
        if (activeFilters.includes('Decision Flow') && n.category === 'Decision Flow') return true;
        if (activeFilters.includes('Security') && n.type === 'Security Alert') return true;
        if (activeFilters.includes('Reports') && n.category === 'Reports') return true;
        if (activeFilters.includes('System') && n.category === 'System') return true;
        if (activeFilters.includes('Sync') && n.category === 'Sync') return true;
        if (activeFilters.includes('Users') && n.category === 'Users') return true;
        return false;
      });
    }

    return filtered;
  }, [notifications, activeFilters, searchQuery]);

  // Handlers
  const handleToggleFilter = (filter) => {
    if (filter === 'All') {
      setActiveFilters(['All']);
      return;
    }

    setActiveFilters(prev => {
      const newFilters = prev.filter(f => f !== 'All');
      if (newFilters.includes(filter)) {
        const removed = newFilters.filter(f => f !== filter);
        return removed.length === 0 ? ['All'] : removed;
      } else {
        return [...newFilters, filter];
      }
    });
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read && !notification.isRead) {
      markAsRead(notification.id);
    }
    setSelectedNotification({ ...notification, read: true, isRead: true });
  };

  return (
    <div className="page-container" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Notification Command Center</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '14px', fontWeight: 500 }}>Monitor organization events, AI insights, approvals, security alerts, hierarchy updates, reporting changes, and system health.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="topbar-search" style={{ width: 300, backgroundColor: 'white', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search alerts, users, or departments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setIsChatOpen(true)}
            className="hover-lift"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '10px 16px', borderRadius: '12px', 
              backgroundColor: '#8b5cf6', color: 'white', 
              border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}
          >
            <Sparkles size={16} />
            Ask AI
          </button>

          <button style={{ width: 40, height: 40, borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} className="hover:bg-slate-50" onClick={() => window.location.reload()}>
            <RefreshCw size={18} color="var(--color-text-muted)" />
          </button>
          
          <button style={{ width: 40, height: 40, borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} className="hover:bg-slate-50">
            <Settings size={18} color="var(--color-text-muted)" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <NotificationSummary notifications={notifications} />

      {/* Filters */}
      <NotificationFilterBar 
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Main Layout Area */}
      <div style={{ display: 'flex', gap: '32px', flex: 1, alignItems: 'flex-start' }}>
        
        {/* Timeline List */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <NotificationList 
            notifications={filteredNotifications}
            onNotificationClick={handleNotificationClick}
          />
        </div>

        {/* Collapsible AI Panel */}
        <NotificationAIPanel 
          isExpanded={isAIPanelExpanded} 
          onToggle={() => setIsAIPanelExpanded(!isAIPanelExpanded)} 
        />
      </div>

      {/* Detail Drawer Overlay */}
      {selectedNotification && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 9998 }} onClick={() => setSelectedNotification(null)}></div>
      )}
      <NotificationDetailDrawer 
        notification={selectedNotification} 
        onClose={() => setSelectedNotification(null)} 
      />

      <NotificationAIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

    </div>
  );
};

export default Notifications;
