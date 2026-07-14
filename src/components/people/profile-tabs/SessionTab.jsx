import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, ShieldCheck, Clock, MapPin, Globe, Wifi, Activity, Smartphone, Server } from 'lucide-react';

const SessionTab = ({ employee }) => {
  if (!employee) return null;

  const session = employee.sessionData || { 
    os: 'Unknown', browser: 'Unknown', ip: 'Unknown', 
    location: 'Unknown', loginTime: 'N/A', duration: '0h 0m', security: 'Offline' 
  };

  const isOnline = session.security !== 'Offline';

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Session Status Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isOnline ? 'rgba(16, 185, 129, 0.05)' : 'rgba(100, 116, 139, 0.05)', border: isOnline ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(100, 116, 139, 0.2)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
              {session.os.includes('macOS') || session.os.includes('Windows') ? <Monitor size={24} color={isOnline ? "var(--color-success)" : "var(--color-text-muted)"} /> : <Smartphone size={24} color={isOnline ? "var(--color-success)" : "var(--color-text-muted)"} />}
            </div>
            {isOnline && (
              <span style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: '50%', backgroundColor: 'var(--color-success)', border: '2px solid var(--color-surface)', animation: 'pulse 2s infinite' }}></span>
            )}
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              {isOnline ? 'Active Login Session' : 'Currently Offline'}
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
              {isOnline ? `Session established at ${session.loginTime}` : `Last active ${employee.lastActive}`}
            </div>
          </div>
        </div>
        
        {isOnline && (
          <div style={{ padding: '8px 16px', backgroundColor: 'var(--color-surface)', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-sm)' }}>
            <ShieldCheck size={16} color="var(--color-success)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-success)' }}>{session.security}</span>
          </div>
        )}
      </motion.div>

      {/* Grid Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 20 }}>Device & Network</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
              <Monitor size={20} color="var(--color-text-secondary)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>OPERATING SYSTEM</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginTop: 2 }}>{session.os}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
              <Globe size={20} color="var(--color-text-secondary)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>BROWSER</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginTop: 2 }}>{session.browser}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Server size={20} color="var(--color-text-secondary)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>IP ADDRESS</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginTop: 2, fontFamily: 'monospace' }}>{session.ip}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 20 }}>Location & Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
              <MapPin size={20} color="var(--color-text-secondary)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>APPROXIMATE LOCATION</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginTop: 2 }}>{session.location}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
              <Clock size={20} color="var(--color-text-secondary)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>SESSION DURATION</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginTop: 2 }}>{session.duration}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Activity size={20} color="var(--color-text-secondary)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>CURRENT ACTIVITY</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginTop: 2 }}>
                  {isOnline ? 'Viewing Organization Dashboard' : 'Idle / Offline'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Live Activity Log */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Wifi size={18} color="var(--color-primary)" /> Live Activity Log
        </h3>
        
        {isOnline ? (
          <div style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px solid var(--color-border)' }}>
            {[
              { time: 'Just now', event: 'Viewing Hierarchy for Engineering Dept', type: 'page_view' },
              { time: '5 mins ago', event: 'Approved Leave Request for Marcus Johnson', type: 'action' },
              { time: '12 mins ago', event: 'Updated Project Status: Enterprise Cloud', type: 'action' },
              { time: '1h 30m ago', event: 'Downloaded Q2 Performance Review PDF', type: 'download' },
            ].map((log, i) => (
              <div key={i} style={{ marginBottom: 20, position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', left: -31, top: 4, width: 14, height: 14, borderRadius: '50%', 
                  backgroundColor: i === 0 ? 'var(--color-primary)' : 'var(--color-surface-hover)', 
                  border: '3px solid var(--color-surface)' 
                }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{log.event}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>
            No live activity detected. Employee is currently offline.
          </div>
        )}
      </motion.div>
      
    </div>
  );
};

export default SessionTab;
