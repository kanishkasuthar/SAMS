import React from 'react';
import { Shield, Smartphone, Globe, Search, Filter } from 'lucide-react';
import { SESSIONS_DATA } from '../data/mockData';

const Sessions = () => {
  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Active Sessions</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Monitor and manage active logins across the platform.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search sessions..." />
          </div>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="card" style={{overflowX: 'auto'}}>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: 'rgba(15, 23, 42, 0.02)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)'}}>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>User</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Device & Browser</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>IP Address</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Activity</th>
              <th style={{padding: '16px 24px', width: 120}}></th>
            </tr>
          </thead>
          <tbody>
            {SESSIONS_DATA.map((session, idx) => (
              <tr key={session.id} style={{borderBottom: idx === SESSIONS_DATA.length - 1 ? 'none' : '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}}>
                <td style={{padding: '16px 24px', fontWeight: 600, color: 'var(--color-text-main)'}}>{session.user}</td>
                <td style={{padding: '16px 24px'}}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600"><Smartphone size={14}/> {session.device}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600"><Globe size={14}/> {session.browser}</div>
                  </div>
                </td>
                <td style={{padding: '16px 24px', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontFamily: 'monospace'}}>{session.ip}</td>
                <td style={{padding: '16px 24px'}}>
                  <span style={{color: session.time === 'Active Now' ? 'var(--color-success)' : 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500}}>
                    {session.time}
                  </span>
                </td>
                <td style={{padding: '16px 24px'}}>
                   <button style={{color: 'var(--color-danger)', fontWeight: 600, fontSize: '0.85rem', padding: '6px 12px', borderRadius: 6, backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
                     Revoke
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sessions;
