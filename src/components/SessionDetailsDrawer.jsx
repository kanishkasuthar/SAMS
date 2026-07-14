import React from 'react';
import { X, Play, Clock, Smartphone, Globe, Shield, Calendar, Activity, Database, Key } from 'lucide-react';

const SessionDetailsDrawer = ({ session, onClose, onReplay }) => {
  if (!session) return null;

  return (
    <>
      <div className="studio-panel-overlay visible" onClick={onClose} style={{ zIndex: 9998 }}></div>
      <div className="right-panel open" style={{ zIndex: 9999, width: 450 }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <img src={session.photo} alt={session.user} style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid var(--color-border)' }} />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>{session.user}</h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{session.role} • {session.department}</div>
            </div>
          </div>
          <button className="panel-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div style={{ padding: '0 24px 16px 24px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
          <button 
            onClick={() => onReplay(session.id)}
            className="btn-primary w-full" 
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '10px 0', fontSize: '0.95rem' }}
          >
            <Play size={16} fill="currentColor" /> Replay Session
          </button>
        </div>

        <div style={{ overflowY: 'auto', height: 'calc(100vh - 150px)', backgroundColor: 'var(--color-bg)' }}>
          
          {/* Metadata Grid */}
          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
             <div className="card" style={{ padding: 12, backgroundColor: 'var(--color-surface)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={12}/> Browser</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{session.browser}</div>
             </div>
             <div className="card" style={{ padding: 12, backgroundColor: 'var(--color-surface)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Smartphone size={12}/> Device OS</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{session.os}</div>
             </div>
             <div className="card" style={{ padding: 12, backgroundColor: 'var(--color-surface)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12}/> Duration</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{session.duration}</div>
             </div>
             <div className="card" style={{ padding: 12, backgroundColor: 'var(--color-surface)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Shield size={12}/> Auth Method</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-success)' }}>MFA Verified</div>
             </div>
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '0 24px' }}></div>

          {/* Activity Timeline */}
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={18} /> Activity Timeline
            </h3>

            <div style={{ position: 'relative', paddingLeft: 16 }}>
              {/* Timeline Line */}
              <div style={{ position: 'absolute', top: 8, bottom: 8, left: 23, width: 2, backgroundColor: 'var(--color-border)' }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {session.events.map((event, idx) => (
                  <div key={event.id} style={{ display: 'flex', gap: 16, position: 'relative', zIndex: 1 }}>
                    {/* Dot */}
                    <div style={{ 
                      width: 16, height: 16, borderRadius: '50%', marginTop: 2,
                      backgroundColor: event.type === 'org_change' ? 'var(--color-warning)' : 
                                       event.type === 'auth' ? 'var(--color-success)' :
                                       event.type === 'nav' ? 'var(--color-text-muted)' : 'var(--color-primary)',
                      border: '3px solid var(--color-bg)'
                    }}></div>
                    
                    {/* Content */}
                    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: 12, borderRadius: 8, border: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{event.time}</span>
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: 'var(--color-bg)', borderRadius: 4, color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>{event.page}</span>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 4 }}>{event.action}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        {event.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SessionDetailsDrawer;
