import React from 'react';
import { Network, ArrowDown, Shield } from 'lucide-react';
import { useOrgStore } from '../../../store/orgStore';
import { useRoleStore } from '../../../store/roleStore';

const RoleInheritanceTab = ({ role }) => {
  const { roles, permissions: allPermissions } = useRoleStore();

  const getInheritanceChain = () => {
    const chain = [];
    let currentRole = role;
    while (currentRole) {
      chain.push(currentRole);
      currentRole = roles.find(r => r.id === currentRole.parentRoleId);
    }
    return chain.reverse(); // Top to bottom
  };

  const chain = getInheritanceChain();

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)' }}>
          <Network size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Role Inheritance Chain</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Visualize the hierarchical permission flow for this role.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0' }}>
        {chain.map((chainRole, idx) => {
          const isTarget = chainRole.id === role.id;
          return (
            <React.Fragment key={chainRole.id}>
              <div style={{ 
                width: '400px', 
                backgroundColor: isTarget ? 'rgba(79, 70, 229, 0.05)' : 'white', 
                border: isTarget ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: isTarget ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isTarget ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                  <Shield size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: isTarget ? 'var(--color-primary)' : 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{chainRole.level}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>{chainRole.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{chainRole.directPermissions?.length || 0} Direct Permissions</div>
                </div>
              </div>
              
              {idx < chain.length - 1 && (
                <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                  <ArrowDown size={24} />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {chain.length === 1 && (
          <div style={{ marginTop: '24px', fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            This role is a root node and does not inherit permissions.
          </div>
        )}
      </div>

    </div>
  );
};

export default RoleInheritanceTab;
