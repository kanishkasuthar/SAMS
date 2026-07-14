import React from 'react';
import { X, Bell, AlertTriangle, Info, CheckCircle2, MoreVertical } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';

const NotificationCenterDrawer = ({ isOpen, onClose }) => {
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const notifications = [
    { id: 1, type: 'warning', title: 'High Manager Workload', message: 'David Chen is managing 26 direct reports across 4 projects.', time: '10 mins ago', read: false },
    { id: 2, type: 'info', title: 'System Sync Complete', message: 'Workday HRIS synchronization completed successfully.', time: '1 hour ago', read: false },
    { id: 3, type: 'success', title: 'Structural Risk Resolved', message: 'AI Recommendation applied to Engineering department.', time: '2 hours ago', read: true },
    { id: 4, type: 'warning', title: 'Project Health Dropped', message: 'Alpha Migration project health dropped to "At Risk".', time: 'Yesterday', read: true },
    { id: 5, type: 'info', title: 'New Organization Export', message: 'Q3 Organizational Structure PDF is ready for download.', time: '2 days ago', read: true }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={16} color="var(--color-warning)" />;
      case 'success': return <CheckCircle2 size={16} color="var(--color-success)" />;
      case 'info':
      default: return <Info size={16} color="var(--color-primary)" />;
    }
  };

  const handleClearAll = () => {
    addToast('All notifications cleared.', 'success');
    onClose();
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 400,
        backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-xl)',
        zIndex: 9999, display: 'flex', flexDirection: 'column',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid var(--color-border)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Bell size={20} color="var(--color-primary)" /> Notifications
            <span style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '12px' }}>2</span>
          </h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onClose} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', border: 'none', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {notifications.map(notif => (
            <div 
              key={notif.id}
              style={{ 
                padding: '16px 24px', 
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: notif.read ? 'var(--color-surface)' : 'rgba(79, 70, 229, 0.03)',
                display: 'flex', gap: 16, cursor: 'pointer', transition: 'all 0.2s'
              }}
              className="hover:bg-slate-50"
              onClick={() => {
                if (notif.title.includes('Workload')) {
                  onClose(); navigate('/intelligence');
                } else if (notif.title.includes('Project')) {
                  onClose(); navigate('/projects');
                } else {
                  addToast('Opening details...', 'info');
                }
              }}
            >
              <div style={{ marginTop: 2 }}>{getIcon(notif.type)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{notif.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{notif.time}</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {notif.message}
                </div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: notif.read ? 'transparent' : 'var(--color-primary)', alignSelf: 'center' }}></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={() => addToast('All marked as read.', 'success')}
            style={{ padding: '8px 16px', borderRadius: 8, fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Mark all read
          </button>
          <button 
            onClick={handleClearAll}
            style={{ padding: '8px 16px', borderRadius: 8, fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Clear all
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationCenterDrawer;
