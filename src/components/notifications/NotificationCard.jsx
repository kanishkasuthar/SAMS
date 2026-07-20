import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Lightbulb, ShieldAlert, GitBranch, RefreshCw, Pin, Clock, MoreVertical, Sparkles } from 'lucide-react';
import Card from '../common/Card';

const NotificationCard = ({ notification, onClick, isSelected, onSelect }) => {
  const isUnread = !notification.read;
  const [isHovered, setIsHovered] = useState(false);

  // Determine styling based on type
  let icon = Info;
  let color = 'var(--color-primary)';
  let bg = 'rgba(79, 70, 229, 0.1)';

  switch (notification.type) {
    case 'Critical':
      icon = AlertCircle;
      color = 'var(--color-danger)';
      bg = 'rgba(239, 68, 68, 0.1)';
      break;
    case 'Warning':
    case 'Approval Required':
      icon = AlertTriangle;
      color = 'var(--color-warning)';
      bg = 'rgba(245, 158, 11, 0.1)';
      break;
    case 'Success':
      icon = CheckCircle;
      color = 'var(--color-success)';
      bg = 'rgba(16, 185, 129, 0.1)';
      break;
    case 'AI Suggestion':
      icon = Lightbulb;
      color = '#8b5cf6';
      bg = 'rgba(139, 92, 246, 0.1)';
      break;
    case 'Security Alert':
      icon = ShieldAlert;
      color = 'var(--color-danger)';
      bg = 'rgba(239, 68, 68, 0.1)';
      break;
    case 'Version Conflict':
      icon = GitBranch;
      color = 'var(--color-warning)';
      bg = 'rgba(245, 158, 11, 0.1)';
      break;
    case 'Sync':
      icon = RefreshCw;
      color = 'var(--color-primary)';
      bg = 'rgba(79, 70, 229, 0.1)';
      break;
    case 'System Update':
    case 'Information':
    default:
      icon = Info;
      color = 'var(--color-primary)';
      bg = 'rgba(79, 70, 229, 0.1)';
      break;
  }

  const Icon = icon;

  return (
    <Card 
      onClick={() => onClick(notification)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '20px 24px',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        borderLeft: isUnread ? `4px solid ${color}` : '4px solid transparent',
        backgroundColor: isSelected ? 'rgba(79, 70, 229, 0.03)' : (isUnread ? 'white' : 'var(--color-surface)'),
        cursor: 'pointer',
        boxShadow: isUnread || isHovered ? 'var(--shadow-sm)' : 'none',
        borderTop: '1px solid var(--color-border)',
        borderRight: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
        position: 'relative',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
      }}
    >
      {/* Top right status/actions */}
      <div style={{ position: 'absolute', top: 16, right: 20, display: 'flex', gap: '8px', alignItems: 'center' }}>
        {notification.isPinned && <Pin size={14} color="var(--color-text-muted)" fill="currentColor" />}
        {notification.isSnoozed && <Clock size={14} color="var(--color-text-muted)" />}
        {isUnread && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, boxShadow: `0 0 8px ${color}` }}></div>}
        
        {/* Hover Actions */}
        <div style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s ease', display: 'flex', gap: '4px' }}>
          <button style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--color-text-muted)' }} className="hover:text-slate-800" onClick={(e) => { e.stopPropagation(); }}>
            <Pin size={16} />
          </button>
          <button style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--color-text-muted)' }} className="hover:text-slate-800" onClick={(e) => { e.stopPropagation(); }}>
            <Clock size={16} />
          </button>
          <button style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--color-text-muted)' }} className="hover:text-slate-800" onClick={(e) => { e.stopPropagation(); }}>
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Checkbox Column */}
      <div 
        style={{ 
          marginTop: '2px',
          width: 20, 
          height: 20, 
          borderRadius: '6px', 
          border: isSelected ? `2px solid var(--color-primary)` : `2px solid var(--color-border)`,
          backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0
        }}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
      >
        {isSelected && <CheckCircle size={14} color="white" />}
      </div>

      <div style={{
        width: 44, 
        height: 44, 
        borderRadius: '12px', 
        flexShrink: 0,
        backgroundColor: bg,
        color: color,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <Icon size={22} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>{notification.title}</h3>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'white' }}>
            {notification.category}
          </span>
        </div>
        
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>
          {notification.message}
        </p>

        {/* Inline AI Impact Analysis */}
        {notification.aiAnalysis && notification.aiAnalysis.length > 0 && (
          <div style={{ 
            backgroundColor: 'rgba(139, 92, 246, 0.05)', 
            border: '1px solid rgba(139, 92, 246, 0.2)', 
            borderRadius: '8px', 
            padding: '12px',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={14} color="#8b5cf6" />
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase' }}>AI Impact Analysis</div>
            </div>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--color-text-main)' }}>
              {notification.aiAnalysis.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
            {notification.timeAgo}
          </div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--color-border)' }}></div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}>
            {notification.department}
          </div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--color-border)' }}></div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}>
            {notification.user}
          </div>

          <div style={{ flex: 1 }}></div>

          {/* Horizontal Quick Actions */}
          {notification.quickActions && notification.quickActions.length > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {notification.quickActions.map((action, idx) => (
                <button 
                  key={idx}
                  className={idx === 0 ? "btn-primary" : "btn-secondary"} 
                  style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px' }}
                  onClick={(e) => { e.stopPropagation(); onClick(notification); }}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NotificationCard;
