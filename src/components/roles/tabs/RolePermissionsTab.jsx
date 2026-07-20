import React, { useState } from 'react';
import { useOrgStore } from '../../../store/orgStore';
import { useRoleStore } from '../../../store/roleStore';
import { Search, Filter, Shield, AlertTriangle } from 'lucide-react';
import PermissionIntelligencePanelModal from '../modals/PermissionIntelligencePanelModal';

const RolePermissionsTab = ({ role }) => {
  const { permissions: allPermissions } = useRoleStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPermission, setSelectedPermission] = useState(null);

  const direct = role.directPermissions || [];
  const inherited = role.inheritedPermissions || [];

  // Group all permissions assigned to this role by module
  const groupedPermissions = {};
  
  [...direct, ...inherited].forEach(pkey => {
    const perm = allPermissions.find(p => p.key === pkey);
    if (!perm) return;
    
    if (!groupedPermissions[perm.module]) {
      groupedPermissions[perm.module] = [];
    }
    groupedPermissions[perm.module].push({
      ...perm,
      source: direct.includes(pkey) ? 'DIRECT' : 'INHERITED FROM LEVEL 2' // simplified for mock
    });
  });

  const modules = Object.keys(groupedPermissions).sort();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface-hover)', padding: '8px 12px', borderRadius: '8px', width: '300px' }}>
          <Search size={16} style={{ color: 'var(--color-text-muted)', marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search Permissions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', width: '100%', color: 'var(--color-text-main)' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select style={{ padding: '8px 12px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '14px', color: 'var(--color-text-main)', cursor: 'pointer' }}>
            <option>All Modules</option>
          </select>
          <select style={{ padding: '8px 12px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '14px', color: 'var(--color-text-main)', cursor: 'pointer' }}>
            <option>All Risks</option>
          </select>
          <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', cursor: 'pointer' }}>Show Direct</button>
          <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', cursor: 'pointer' }}>Show Inherited</button>
        </div>
      </div>

      {/* Permissions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {modules.map(moduleName => {
          const perms = groupedPermissions[moduleName].filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.key.toLowerCase().includes(searchQuery.toLowerCase()));
          if (perms.length === 0) return null;

          return (
            <div key={moduleName} style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '16px 24px', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-main)' }}>{moduleName.toUpperCase()}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', padding: '12px 24px', borderBottom: '1px solid var(--color-surface-hover)', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  <div>Permission</div>
                  <div>Source</div>
                  <div>Risk</div>
                  <div>Users</div>
                  <div>Last Used</div>
                  <div>Actions</div>
                </div>
                {perms.map((p, idx) => (
                  <div key={p.key} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', padding: '16px 24px', borderBottom: idx < perms.length - 1 ? '1px solid var(--color-surface-hover)' : 'none', alignItems: 'center', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{p.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{p.key}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px', backgroundColor: p.source === 'DIRECT' ? 'rgba(79, 70, 229, 0.1)' : 'var(--color-surface)', border: p.source === 'DIRECT' ? '1px solid rgba(79, 70, 229, 0.2)' : '1px solid var(--color-border)', color: p.source === 'DIRECT' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
                        {p.source}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: p.risk === 'CRITICAL' ? 'var(--color-danger)' : p.risk === 'HIGH' ? 'var(--color-danger)' : p.risk === 'MEDIUM' ? 'var(--color-warning)' : 'var(--color-success)' }}>
                        {p.risk}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{role.users || 0}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>3 hrs ago</div>
                    <div>
                      <button onClick={() => setSelectedPermission(p)} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'transparent', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        INTELLIGENCE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {modules.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            No permissions found.
          </div>
        )}
      </div>

      <PermissionIntelligencePanelModal isOpen={!!selectedPermission} onClose={() => setSelectedPermission(null)} permission={selectedPermission} role={role} />
    </div>
  );
};

export default RolePermissionsTab;
