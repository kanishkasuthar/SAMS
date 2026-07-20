import React from 'react';
import { History, ShieldAlert, CheckCircle2 } from 'lucide-react';

const AuditSettings = () => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Configuration History</h3>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Track recent changes made to platform settings and configurations.</p>
        
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Event</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Modified By</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Timestamp</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldAlert size={14} color="var(--color-warning)" /> MFA Policy Updated
                  </div>
                </td>
                <td style={{ padding: '16px', fontSize: '13px' }}>Admin (Super User)</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>Today, 08:34 AM</td>
                <td style={{ padding: '16px' }}><CheckCircle2 size={16} color="var(--color-success)" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <History size={14} color="var(--color-text-secondary)" /> Theme Configuration
                  </div>
                </td>
                <td style={{ padding: '16px', fontSize: '13px' }}>Sarah Jenkins</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>Yesterday, 14:22 PM</td>
                <td style={{ padding: '16px' }}><CheckCircle2 size={16} color="var(--color-success)" /></td>
              </tr>
              <tr>
                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <History size={14} color="var(--color-text-secondary)" /> API Key Revoked
                  </div>
                </td>
                <td style={{ padding: '16px', fontSize: '13px' }}>System Auto</td>
                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>Oct 12, 2025</td>
                <td style={{ padding: '16px' }}><CheckCircle2 size={16} color="var(--color-success)" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditSettings;
