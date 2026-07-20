import React, { useState, useMemo } from 'react';
import NotificationCard from './NotificationCard';
import { ChevronDown, ChevronRight, Inbox, Check, Archive, Download, X } from 'lucide-react';

const NotificationList = ({ notifications, onNotificationClick }) => {
  const [collapsedGroups, setCollapsedGroups] = useState(new Set());
  const [groupingMode, setGroupingMode] = useState('timeline'); // 'timeline' or 'category'
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleGroup = (groupName) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupName)) next.delete(groupName);
      else next.add(groupName);
      return next;
    });
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  // Grouping Logic
  const grouped = useMemo(() => {
    return notifications.reduce((acc, notif) => {
      const key = groupingMode === 'timeline' 
        ? (notif.timeAgo || 'Earlier') 
        : (notif.department || 'General');
      
      if (!acc[key]) acc[key] = [];
      acc[key].push(notif);
      return acc;
    }, {});
  }, [notifications, groupingMode]);

  if (!notifications || notifications.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px', backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)', marginTop: '32px' }}>
        <div style={{ width: 80, height: 80, borderRadius: '40px', backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Inbox size={40} color="var(--color-primary)" />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>You're all caught up!</h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>There are no notifications matching your current filters.</p>
        <button className="btn-primary" style={{ padding: '8px 24px', borderRadius: '8px' }} onClick={() => window.location.reload()}>Refresh</button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Grouping Toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <div style={{ display: 'inline-flex', backgroundColor: 'var(--color-surface)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
          <button 
            onClick={() => setGroupingMode('timeline')}
            style={{ 
              padding: '6px 12px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer',
              backgroundColor: groupingMode === 'timeline' ? 'white' : 'transparent',
              color: groupingMode === 'timeline' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              boxShadow: groupingMode === 'timeline' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Timeline
          </button>
          <button 
            onClick={() => setGroupingMode('category')}
            style={{ 
              padding: '6px 12px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer',
              backgroundColor: groupingMode === 'category' ? 'white' : 'transparent',
              color: groupingMode === 'category' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              boxShadow: groupingMode === 'category' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Department
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {Object.entries(grouped).map(([groupName, items]) => {
          const isCollapsed = collapsedGroups.has(groupName);
          
          return (
            <div key={groupName}>
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer', userSelect: 'none' }}
                onClick={() => toggleGroup(groupName)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                  {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {groupName}
                </h4>
                <div style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: '12px' }}>
                  {items.length}
                </div>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)', marginLeft: '12px' }}></div>
              </div>

              {!isCollapsed && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map(notif => (
                    <NotificationCard 
                      key={notif.id} 
                      notification={notif} 
                      onClick={onNotificationClick}
                      isSelected={selectedIds.has(notif.id)}
                      onSelect={() => toggleSelect(notif.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--color-text-main)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
          zIndex: 9999,
          animation: 'slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>
            {selectedIds.size} selected
          </div>
          <div style={{ width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '6px 12px', backgroundColor: 'transparent', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }} className="hover:bg-white/10 rounded-md">
              <Check size={16} /> Mark Read
            </button>
            <button style={{ padding: '6px 12px', backgroundColor: 'transparent', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }} className="hover:bg-white/10 rounded-md">
              <Archive size={16} /> Archive
            </button>
            <button style={{ padding: '6px 12px', backgroundColor: 'transparent', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }} className="hover:bg-white/10 rounded-md">
              <Download size={16} /> Export
            </button>
          </div>
          <button onClick={clearSelection} style={{ marginLeft: '12px', padding: '6px', backgroundColor: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }} className="hover:text-white">
            <X size={18} />
          </button>
        </div>
      )}

    </div>
  );
};

export default NotificationList;
