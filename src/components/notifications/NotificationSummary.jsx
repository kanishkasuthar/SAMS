import React from 'react';
import { Bell, AlertTriangle, CheckSquare, Lightbulb, ShieldAlert, Activity } from 'lucide-react';
import Card from '../common/Card';

const NotificationSummary = ({ notifications }) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.type === 'Critical').length;
  const approvalCount = notifications.filter(n => n.type === 'Approval Required').length;
  const aiCount = notifications.filter(n => n.type === 'AI Suggestion').length;
  const securityCount = notifications.filter(n => n.type === 'Security Alert').length;

  const summaryCards = [
    { 
      id: 'unread', 
      title: 'Unread Alerts', 
      count: unreadCount, 
      trend: '+2 new', 
      trendColor: 'var(--color-primary)', 
      icon: Bell, 
      color: 'var(--color-primary)', 
      bg: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(79, 70, 229, 0.15) 100%)',
      desc: 'Pending your review'
    },
    { 
      id: 'critical', 
      title: 'Critical Issues', 
      count: criticalCount, 
      trend: '-1 resolved', 
      trendColor: 'var(--color-success)', 
      icon: AlertTriangle, 
      color: 'var(--color-danger)', 
      bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.15) 100%)',
      desc: 'Immediate action needed'
    },
    { 
      id: 'approvals', 
      title: 'Approvals Pending', 
      count: approvalCount, 
      trend: '+1 required', 
      trendColor: 'var(--color-warning)', 
      icon: CheckSquare, 
      color: 'var(--color-warning)', 
      bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.15) 100%)',
      desc: 'Awaiting your sign-off'
    },
    { 
      id: 'ai', 
      title: 'AI Insights', 
      count: aiCount, 
      trend: '+3 generated', 
      trendColor: '#8b5cf6', 
      icon: Lightbulb, 
      color: '#8b5cf6', 
      bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.15) 100%)',
      desc: 'Smart recommendations'
    },
    { 
      id: 'security', 
      title: 'Security Events', 
      count: securityCount, 
      trend: '1 detected', 
      trendColor: 'var(--color-danger)', 
      icon: ShieldAlert, 
      color: '#ef4444', 
      bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.1) 100%)',
      desc: 'Access anomalies'
    },
    { 
      id: 'health', 
      title: 'System Health', 
      count: '98%', 
      trend: '+2% today', 
      trendColor: 'var(--color-success)', 
      icon: Activity, 
      color: 'var(--color-success)', 
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.15) 100%)',
      desc: 'All services operational'
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '32px' }}>
      {summaryCards.map(card => (
        <Card 
          key={card.id} 
          className="hover-lift"
          style={{ 
            padding: '20px', 
            background: card.bg, 
            border: '1px solid var(--color-border)', 
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <card.icon size={18} color={card.color} />
            </div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: card.trendColor, backgroundColor: 'white', padding: '2px 6px', borderRadius: '12px', border: `1px solid ${card.trendColor}30` }}>
              {card.trend}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1, marginBottom: 4 }}>
              {card.count}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              {card.title}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 500, marginTop: 4 }}>
              {card.desc}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotificationSummary;
