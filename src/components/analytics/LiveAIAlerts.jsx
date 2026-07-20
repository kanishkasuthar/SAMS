import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALERTS = [
  { id: 1, type: 'warning', msg: 'Engineering workload exceeded threshold.', time: 'Just now' },
  { id: 2, type: 'success', msg: 'Finance completed restructuring.', time: '2m ago' },
  { id: 3, type: 'warning', msg: 'Duplicate reporting detected in Sales EU.', time: '15m ago' },
  { id: 4, type: 'success', msg: 'Promotion approved for Marcus J.', time: '1h ago' },
  { id: 5, type: 'info', msg: 'System backup completed successfully.', time: '2h ago' },
];

const LiveAIAlerts = () => {
  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} color="var(--color-primary)" />
            <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-danger)', border: '2px solid white' }} className="pulse-anim" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Live AI Alerts</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Real-time system notifications.</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1 }}>
        <AnimatePresence>
          {ALERTS.map((alert, i) => {
            let Icon = Info;
            let color = 'var(--color-text-main)';
            let bg = 'var(--color-surface)';
            
            if (alert.type === 'warning') {
              Icon = AlertTriangle;
              color = 'var(--color-warning)';
              bg = 'rgba(245, 158, 11, 0.1)';
            } else if (alert.type === 'success') {
              Icon = CheckCircle;
              color = 'var(--color-success)';
              bg = 'rgba(16, 185, 129, 0.1)';
            }

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.4 }}>
                    {alert.msg}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    {alert.time}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default LiveAIAlerts;
