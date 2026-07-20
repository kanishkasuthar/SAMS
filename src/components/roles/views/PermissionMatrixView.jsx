import React, { useState } from 'react';
import { useRoleStore } from '../../../store/roleStore';
import { Shield, Key, Search, ChevronRight } from 'lucide-react';

const PermissionMatrixView = () => {
  const { roles, permissions: allPermissions } = useRoleStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPermissions = allPermissions.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.module.toLowerCase().includes(searchQuery.toLowerCase()));

  // Group by module
  const grouped = {};
  filteredPermissions.forEach(p => {
    if (!grouped[p.module]) grouped[p.module] = [];
    grouped[p.module].push(p);
  });

  const getAccessStatus = (role, permId) => {
    // role.Permissions contains the joined permissions from DB
    const hasPermission = role.Permissions?.some(p => p.id === permId);
    if (hasPermission) return 'DIRECT';
    return 'NONE';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Enterprise Permission Matrix</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Cross-reference all organizational roles against specific module capabilities.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface-hover)', padding: '8px 12px', borderRadius: '8px', width: '300px' }}>
          <Search size={16} style={{ color: 'var(--color-text-muted)', marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search permissions or modules..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', width: '100%', color: 'var(--color-text-main)' }}
          />
        </div>
      </div>

      <div className="permission-matrix-grid">
        {/* Header Row */}
        <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '16px', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', fontWeight: 700, color: 'var(--color-text-main)', fontSize: '12px', textTransform: 'uppercase' }}>
          Platform Capability
        </div>
        {roles.map(role => (
          <div key={role.id} style={{ backgroundColor: 'white', padding: '16px', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>{role.level}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>{role.name}</div>
          </div>
        ))}

        {/* Content Rows */}
        {Object.keys(grouped).map(module => (
          <React.Fragment key={module}>
            {/* Module Header */}
            <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', padding: '12px 16px', gridColumn: `1 / span ${roles.length + 1}`, fontSize: '12px', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--color-border)' }}>
              {module}
            </div>
            
            {grouped[module].map(perm => (
              <React.Fragment key={perm.id}>
                <div style={{ backgroundColor: 'white', padding: '16px', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>{perm.action || perm.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{perm.risk} RISK</div>
                </div>
                {roles.map(role => {
                  const status = getAccessStatus(role, perm.id);
                  return (
                    <div key={`${role.id}-${perm.id}`} style={{ backgroundColor: 'white', padding: '16px', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {status === 'DIRECT' ? (
                        <div style={{ padding: '4px 12px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '999px', fontSize: '10px', fontWeight: 800 }}>DIRECT</div>
                      ) : status === 'INHERITED' ? (
                        <div style={{ padding: '4px 12px', backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', borderRadius: '999px', fontSize: '10px', fontWeight: 800 }}>INHERITED</div>
                      ) : (
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)' }}></div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PermissionMatrixView;
