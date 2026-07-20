import React from 'react';
import { History, ShieldAlert, Key, Users } from 'lucide-react';

const RoleHistoryTab = ({ role }) => {
  const history = role.history || [];

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)' }}>
          <History size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Role Evolution History</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Chronological timeline of permission and assignment changes.</p>
        </div>
      </div>

      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Timeline Line */}
        <div style={{ position: 'absolute', left: '39px', top: '24px', bottom: '24px', width: '2px', backgroundColor: 'var(--color-surface-hover)' }}></div>

        {history.length > 0 ? history.map((event, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, marginTop: '4px' }}>
              {event.type === 'PERMISSION ADDED' ? <Key size={14} color="var(--color-primary)" /> : 
               event.type === 'USER ASSIGNED' ? <Users size={14} color="var(--color-primary)" /> : 
               <ShieldAlert size={14} color="var(--color-warning)" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '4px' }}>{event.date}</div>
              <div style={{ backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>{event.title}</h4>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{event.type}</span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>{event.desc}</p>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Authorized by: <span style={{ color: 'var(--color-text-main)' }}>{event.author}</span></div>
              </div>
            </div>
          </div>
        )) : (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            No history recorded for this role.
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleHistoryTab;
