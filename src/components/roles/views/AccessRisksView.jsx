import React from 'react';
import { useOrgStore } from '../../../store/orgStore';
import { useRoleStore } from '../../../store/roleStore';
import { ShieldAlert, AlertTriangle, ArrowRight, Shield } from 'lucide-react';

const AccessRisksView = () => {
  const { roles, permissions: allPermissions } = useRoleStore();

  // Extract all risks
  const allRisks = [];
  roles.forEach(role => {
    if (role.accessRisks) {
      role.accessRisks.forEach(risk => {
        allRisks.push({ ...risk, role });
      });
    }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-danger)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={24} color="var(--color-danger)" /> Access Risk Intelligence
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Proactive identification of elevated privileges, toxic combinations, and dormant access.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-danger)' }}>{allRisks.filter(r => r.severity === 'CRITICAL').length}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>CRITICAL</div>
          </div>
          <div style={{ width: '1px', backgroundColor: 'var(--color-border)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-warning)' }}>{allRisks.filter(r => r.severity === 'HIGH').length}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>HIGH</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {allRisks.length > 0 ? allRisks.map((risk, idx) => (
          <div key={idx} style={{ backgroundColor: 'white', borderRadius: '16px', border: `1px solid ${risk.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.3)' : risk.severity === 'HIGH' ? 'rgba(245, 158, 11, 0.3)' : 'var(--color-border)'}`, boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} color={risk.severity === 'CRITICAL' ? 'var(--color-danger)' : risk.severity === 'HIGH' ? 'var(--color-warning)' : 'var(--color-primary)'} />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: risk.severity === 'CRITICAL' ? 'var(--color-danger)' : risk.severity === 'HIGH' ? 'var(--color-warning)' : 'var(--color-primary)', textTransform: 'uppercase' }}>{risk.type.replace('_', ' ')}</span>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface-hover)', padding: '4px 8px', borderRadius: '4px' }}>{risk.id}</span>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--color-text-main)', lineHeight: 1.5, margin: '0 0 16px 0' }}>{risk.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px' }}>
                <Shield size={16} color="var(--color-text-muted)" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>AFFECTED ROLE</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>{risk.role.name}</span>
                </div>
              </div>
            </div>
            <div style={{ padding: '16px 24px', backgroundColor: 'var(--color-surface-alt)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>IGNORE RISK</button>
              <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'white', backgroundColor: risk.severity === 'CRITICAL' ? 'var(--color-danger)' : 'var(--color-primary)', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>SIMULATE REMEDIATION <ArrowRight size={14}/></button>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', padding: '64px', textAlign: 'center', backgroundColor: 'white', borderRadius: '16px', border: '1px dashed var(--color-border)' }}>
            <Shield size={48} color="var(--color-success)" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 8px 0' }}>Organization Secure</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>No access risks detected across any active roles.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AccessRisksView;
