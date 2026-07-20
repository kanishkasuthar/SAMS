import React from 'react';
import { useOrgStore } from '../../../store/orgStore';
import { useRoleStore } from '../../../store/roleStore';
import { Shield, Activity, AlertTriangle, Zap, ShieldAlert, Key } from 'lucide-react';

const RoleOverviewTab = ({ role }) => {
  const { permissions: allPermissions } = useRoleStore();

  const getModuleDistribution = () => {
    const dist = {};
    const rolePerms = [...(role.directPermissions || []), ...(role.inheritedPermissions || [])];
    
    rolePerms.forEach(pkey => {
      const p = allPermissions.find(ap => ap.key === pkey);
      if (p) {
        dist[p.module] = (dist[p.module] || 0) + 1;
      }
    });

    return Object.entries(dist).map(([module, count]) => ({
      module, count
    })).sort((a, b) => b.count - a.count);
  };

  const distribution = getModuleDistribution();
  const maxCount = Math.max(...distribution.map(d => d.count), 1);

  return (
    <div className="role-overview-grid">
      
      {/* LEFT COLUMN: 65% */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Role Access Brief */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '16px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)' }}>
            <Zap size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role Access Brief</h3>
          </div>
          <div style={{ padding: '24px' }}>
            <p style={{ fontSize: '16px', color: 'var(--color-text-main)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
              <span style={{ fontWeight: 700 }}>{role.name}</span> holds {role.classification.toLowerCase()} across {distribution.length} SAMS modules. 
              The role controls organizational configuration, hierarchy modification, user management and audit access depending on scope.
            </p>
            <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: '8px', padding: '16px', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>AI Access Intelligence</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Current access risk is elevated because {role.users} active users hold {role.level} privileges. 
                {role.accessRisks && role.accessRisks.length > 0 ? ' Detected risks indicate potential for excessive access rights.' : ' Role permissions align well with expected usage patterns.'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, backgroundColor: 'white', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', borderRadius: '6px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>GENERATE NEW BRIEF</button>
              <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, backgroundColor: 'var(--color-primary)', border: 'none', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>RUN ACCESS ANALYSIS</button>
            </div>
          </div>
        </div>

        {/* Permission Distribution */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--color-surface-hover)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Permission Distribution</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Active permissions mapped by SAMS module.</p>
          </div>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {distribution.map((dist, idx) => {
              const width = Math.max(5, (dist.count / maxCount) * 100);
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{dist.module}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>{dist.count} Permissions</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${width}%`, backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              );
            })}
            {distribution.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 600 }}>
                No permissions assigned to this role.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: 35% */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Access Health Summary */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px' }}>
          <div className="label-with-icon" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Activity size={16} /> ACCESS HEALTH
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Privilege Escalation Risk</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-success)' }}>Low</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Segregation of Duties</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-warning)' }}>Monitor</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Dormant Access</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: role.accessRisks?.length > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>{role.accessRisks?.length > 0 ? 'High Risk' : 'Low'}</span>
            </div>
          </div>
        </div>

        {/* Current Risks */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ backgroundColor: role.accessRisks?.length > 0 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)', padding: '16px 24px', borderBottom: role.accessRisks?.length > 0 ? '1px solid rgba(239, 68, 68, 0.1)' : '1px solid rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} style={{ color: role.accessRisks?.length > 0 ? 'var(--color-danger)' : 'var(--color-success)' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', color: role.accessRisks?.length > 0 ? '#7F1D1D' : '#064E3B' }}>Current Risks</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {role.accessRisks && role.accessRisks.length > 0 ? role.accessRisks.map((risk, idx) => (
              <div key={idx} style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: risk.severity === 'CRITICAL' || risk.severity === 'HIGH' ? 'var(--color-danger)' : 'var(--color-warning)', textTransform: 'uppercase', marginBottom: '4px' }}>{risk.type.replace('_', ' ')}</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>{risk.desc}</div>
              </div>
            )) : (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <Shield size={32} style={{ margin: '0 auto 12px auto', opacity: 0.2 }} />
                <div style={{ fontSize: '14px', fontWeight: 700 }}>No active access risks detected.</div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default RoleOverviewTab;
