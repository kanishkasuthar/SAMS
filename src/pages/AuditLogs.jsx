import React from 'react';
import { Search, Filter, Download, ShieldAlert } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';

const AuditLogs = () => {
  const { auditLogs: AUDIT_LOGS } = useOrgStore();

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Audit Logs</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Track every action and modification across the platform.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 300, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search by user, action, or IP..." />
          </div>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="card" style={{overflowX: 'auto'}}>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: 'rgba(15, 23, 42, 0.02)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)'}}>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Log ID</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Timestamp</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>User / System</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Action</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Details</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {AUDIT_LOGS.map((log, index) => (
              <tr key={log.id} style={{borderBottom: index === AUDIT_LOGS.length - 1 ? 'none' : '1px solid var(--color-border)', backgroundColor: index % 2 === 0 ? 'var(--color-surface)' : 'rgba(248, 250, 252, 0.5)'}}>
                <td style={{padding: '16px 24px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem'}}>{log.id}</td>
                <td style={{padding: '16px 24px', color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>{log.timestamp}</td>
                <td style={{padding: '16px 24px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem'}}>
                  {log.user === 'Admin System' || log.user === 'System' ? (
                     <ShieldAlert size={14} color="var(--color-danger)" />
                  ) : null}
                  {log.user}
                </td>
                <td style={{padding: '16px 24px', fontSize: '0.9rem'}}>
                  <span style={{padding: '4px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(15, 23, 42, 0.05)', color: 'var(--color-text-main)'}}>
                    {log.action}
                  </span>
                </td>
                <td style={{padding: '16px 24px', color: 'var(--color-text-main)', fontSize: '0.9rem'}}>{log.details}</td>
                <td style={{padding: '16px 24px', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontFamily: 'monospace'}}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
