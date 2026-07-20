import React from 'react';
import { X, Clock, Users, Building, AlertCircle, Sparkles, Link as LinkIcon, Paperclip } from 'lucide-react';

const NotificationDetailDrawer = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '450px',
      backgroundColor: 'white',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      transform: 'translateX(0)',
      animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>

      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'var(--color-surface)' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            {notification.category}
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, lineHeight: 1.3 }}>
            {notification.title}
          </h2>
        </div>
        <button onClick={onClose} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px' }} className="hover:bg-slate-200">
          <X size={20} color="var(--color-text-main)" />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <p style={{ fontSize: '15px', color: 'var(--color-text-main)', lineHeight: 1.6, margin: '0 0 24px 0' }}>
          {notification.message}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} color="var(--color-text-secondary)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Timestamp</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{new Date(notification.timestamp).toLocaleString()}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building size={16} color="var(--color-text-secondary)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Department</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{notification.department}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} color="var(--color-text-secondary)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Responsible User</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{notification.user}</div>
            </div>
          </div>
        </div>

        {/* AI Explanation / Details */}
        <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={16} color="#8b5cf6" />
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#8b5cf6', margin: 0 }}>AI Analysis & Details</h4>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5, margin: 0, marginBottom: '12px' }}>
            {notification.details}
          </p>
          {notification.aiAnalysis && (
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
              {notification.aiAnalysis.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Timeline of Event */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Timeline</h4>
          <div style={{ borderLeft: '2px solid var(--color-border)', marginLeft: '8px', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>Issue Detected</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{notification.timeAgo}</div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }}></div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>AI Analysis Completed</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Auto-generated</div>
            </div>
          </div>
        </div>

        {/* Attachments / Linked Modules */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Attachments & Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }} className="hover-lift">
              <LinkIcon size={16} color="var(--color-text-secondary)" />
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>View in Live Structure</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }} className="hover-lift">
              <Paperclip size={16} color="var(--color-text-secondary)" />
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>System Log Report.pdf</div>
            </div>
          </div>
        </div>

        {/* Affected Users */}
        {notification.affectedUsers && notification.affectedUsers.length > 0 && (
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Affected Entities</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {notification.affectedUsers.map((user, idx) => (
                <div key={idx} style={{ padding: '6px 12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {user}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', gap: '12px' }}>
        {notification.quickActions && notification.quickActions.map((action, idx) => (
          <button key={idx} className={idx === 0 ? "btn-primary" : "btn-secondary"} style={{ flex: 1, padding: '12px', fontSize: '14px', borderRadius: '8px' }}>
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationDetailDrawer;
