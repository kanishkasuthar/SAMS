import React, { useState, useEffect } from 'react';
import { X, History, Activity, Calendar, LogOut } from 'lucide-react';

const OrganizationTimeMachineModal = ({ isOpen, onClose, event, department }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !event) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '1024px', height: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '4px solid #C7D2FE', animation: 'scale-in 0.2s ease-out' }}>
        
        {/* Time Machine Header */}
        <div style={{ backgroundColor: '#312E81', color: 'white', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <History size={20} style={{ color: '#C7D2FE' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.05em', color: '#EEF2FF', margin: 0 }}>TIME MACHINE</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#C7D2FE', marginTop: '4px' }}>
                <span style={{ fontWeight: 700, color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>{department.name}</span>
                <span>•</span>
                <span>Viewing state from</span>
                <span className="label-with-icon" style={{ fontWeight: 700, color: 'white' }}><Calendar size={12}/> <span>{event.date}</span></span>
                <span>•</span>
                <span style={{ fontWeight: 700, color: '#A5B4FC' }}>Version {event.version}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#EF4444', color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <LogOut size={16} /> RETURN TO CURRENT
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-surface-hover)', position: 'relative' }}>
          
          {loading ? (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(248, 250, 252, 0.8)', backdropFilter: 'blur(4px)', zIndex: 10, color: '#312E81' }}>
              <History size={48} style={{ opacity: 0.5, marginBottom: '16px', animation: 'spin 3s linear infinite' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px', margin: 0 }}>TRAVELING TO {event.date.toUpperCase()}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontWeight: 600, margin: 0 }}>Reconstructing historical organization state...</p>
            </div>
          ) : (
            <div style={{ padding: '32px', maxWidth: '896px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Fake historical content */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '24px', borderBottom: '1px solid var(--color-surface-hover)', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', margin: 0 }}>
                  <span>Historical Snapshot</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{event.date}</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px', marginBottom: '32px', marginTop: '24px' }}>
                  <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Department Head</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>{event.prevHead || 'Michael Scott'}</div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Employees</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>100</div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Active Projects</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>4</div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Authority Score</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>82</div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Budget</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>$18.5M</div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Hierarchy Depth</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>7 Levels</div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-surface)', height: '256px', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', top: '16px', left: '16px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontSize: '12px' }}>Historical Reporting Structure</div>
                   <Activity size={40} style={{ color: 'var(--color-text-muted)', marginBottom: '8px' }} />
                   <p style={{ color: 'var(--color-text-muted)', fontWeight: 700, position: 'absolute', bottom: '16px' }}>Interactive Canvas Disabled in Time Machine Mode</p>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrganizationTimeMachineModal;
