import React from 'react';
import { useOrgStore } from '../../../store/orgStore';
import { useRoleStore } from '../../../store/roleStore';
import { Network, Shield, ArrowDown } from 'lucide-react';

const RoleHierarchyView = () => {
  const { roles, permissions: allPermissions } = useRoleStore();

  // Find root nodes (roles without parentRoleId)
  const rootRoles = roles.filter(r => !r.parentRoleId);

  const renderRoleNode = (role, level = 0) => {
    const children = roles.filter(r => r.parentRoleId === role.id);

    return (
      <div key={role.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: level > 0 ? '24px' : '0' }}>
        {level > 0 && <div style={{ height: '24px', width: '2px', backgroundColor: 'var(--color-border)', marginBottom: '8px' }}></div>}
        
        <div style={{ 
          width: '320px', 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          border: '1px solid var(--color-border)', 
          boxShadow: 'var(--shadow-sm)', 
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          cursor: 'grab'
        }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Shield size={20} />
          </div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0', textAlign: 'center' }}>{role.name}</h3>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>{role.level}</div>
          
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <div style={{ flex: 1, backgroundColor: 'var(--color-surface-hover)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>{role.directPermissions?.length || 0}</div>
              <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>PERMISSIONS</div>
            </div>
            <div style={{ flex: 1, backgroundColor: 'var(--color-surface-hover)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>{role.users || 0}</div>
              <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>USERS</div>
            </div>
          </div>
        </div>

        {children.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: '24px', width: '2px', backgroundColor: 'var(--color-border)' }}></div>
            {children.length > 1 && (
              <div style={{ height: '2px', width: `${(children.length - 1) * 360}px`, backgroundColor: 'var(--color-border)' }}></div>
            )}
            <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
              {children.map(child => renderRoleNode(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Network size={24} color="var(--color-primary)" /> Role Inheritance Hierarchy
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Visualize how permissions cascade downwards through the organizational role structure.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', cursor: 'pointer' }}>Zoom Out</button>
          <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-primary)', border: 'none', color: 'white', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>SIMULATE HIERARCHY CHANGE</button>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '64px', overflowX: 'auto', minHeight: '600px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '80px', justifyContent: 'center' }}>
          {rootRoles.map(root => renderRoleNode(root))}
        </div>
      </div>
    </div>
  );
};

export default RoleHierarchyView;
