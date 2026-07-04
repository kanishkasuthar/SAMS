import React from 'react';
import { Bell, Check, Trash2, Search, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../data/mockData';

const Notifications = () => {
  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Notification Center</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>System alerts and synchronization updates.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search alerts..." />
          </div>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-main)'}}>
            <Check size={16} />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      <div className="card" style={{display: 'flex', flexDirection: 'column'}}>
        {NOTIFICATIONS_DATA.map((notif, idx) => (
          <div key={notif.id} style={{
            padding: 24, 
            display: 'flex', 
            gap: 16, 
            borderBottom: idx === NOTIFICATIONS_DATA.length - 1 ? 'none' : '1px solid var(--color-border)', 
            backgroundColor: notif.read ? 'var(--color-surface)' : 'rgba(79, 70, 229, 0.03)',
            borderLeft: notif.read ? '3px solid transparent' : '3px solid var(--color-primary)'
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              backgroundColor: notif.title.includes('Warning') ? 'rgba(245, 158, 11, 0.1)' : notif.title.includes('Completed') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(79, 70, 229, 0.1)',
              color: notif.title.includes('Warning') ? 'var(--color-warning)' : notif.title.includes('Completed') ? 'var(--color-success)' : 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {notif.title.includes('Warning') ? <AlertTriangle size={20} /> : notif.title.includes('Completed') ? <CheckCircle size={20} /> : <Info size={20} />}
            </div>
            
            <div className="flex-col w-full">
              <div className="flex justify-between items-start mb-1">
                <h3 style={{fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-main)'}}>{notif.title}</h3>
                <span style={{fontSize: '0.8rem', color: 'var(--color-text-muted)'}}>{notif.time}</span>
              </div>
              <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>{notif.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
