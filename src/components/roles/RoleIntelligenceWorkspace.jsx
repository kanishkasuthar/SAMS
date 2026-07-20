import React, { useState } from 'react';
import { useOrgStore } from '../../store/orgStore';
import { useRoleStore } from '../../store/roleStore';
import { ArrowLeft, Shield, Activity, Users, Key, Network, ShieldAlert, History } from 'lucide-react';
import RoleOverviewTab from './tabs/RoleOverviewTab';
import RolePermissionsTab from './tabs/RolePermissionsTab';
import RoleUsersTab from './tabs/RoleUsersTab';
import RoleInheritanceTab from './tabs/RoleInheritanceTab';
import RoleAccessMapTab from './tabs/RoleAccessMapTab';
import RoleHistoryTab from './tabs/RoleHistoryTab';

const RoleIntelligenceWorkspace = ({ roleId, onBack, initialTab = 'OVERVIEW' }) => {
  const { roles, permissions: allPermissions } = useRoleStore();
  const role = roles.find(r => r.id === roleId);
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!role) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <h2>Role not found</h2>
        <button onClick={onBack}>Back to Roles</button>
      </div>
    );
  }

  let classColor = 'var(--color-text-muted)';
  let classBg = 'var(--color-surface-hover)';
  if (role.color === 'CRITICAL ACCESS') { classColor = 'var(--color-danger)'; classBg = 'rgba(239, 68, 68, 0.1)'; }
  else if (role.color === 'STRATEGIC ACCESS') { classColor = 'var(--color-primary)'; classBg = 'rgba(79, 70, 229, 0.1)'; }
  else if (role.color === 'SENSITIVE ACCESS') { classColor = 'var(--color-warning)'; classBg = 'rgba(245, 158, 11, 0.1)'; }
  else if (role.color === 'DEPARTMENT SCOPED') { classColor = 'var(--color-accent)'; classBg = 'rgba(20, 184, 166, 0.1)'; }
  
  const healthScore = role.accessRisks && role.accessRisks.length > 0 ? 72 : 100; // Mock calculation
  
  const coverage = Math.min(100, Math.round(((role.directPermissions?.length || 0) + (role.inheritedPermissions?.length || 0)) / 31 * 100));

  return (
    <div className="role-intelligence-layout">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-main)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
          <ArrowLeft size={16} /> Back to Roles
        </button>
        <span>/</span>
        <span style={{ color: 'var(--color-primary)' }}>{role.name}</span>
      </div>

      {/* Role Hero */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', marginBottom: '24px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Top Half: Header & Brief */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '32px', borderBottom: '1px solid var(--color-surface-hover)' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flex: 1 }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: classBg, color: classColor, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${classBg}` }}>
                <Shield size={32} />
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>{role.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{role.level}</span>
                  <span style={{ color: 'var(--color-border)' }}>|</span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: classColor, backgroundColor: classBg, padding: '4px 12px', borderRadius: '6px' }}>{role.classification}</span>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.5, margin: 0, maxWidth: '800px' }}>
                  {role.color === 'CRITICAL ACCESS' ? 'Highest platform authority with unrestricted administrative and organizational control.' :
                   role.color === 'STRATEGIC ACCESS' ? 'Strategic authority for organization design and systemic configuration.' :
                   role.color === 'SENSITIVE ACCESS' ? 'Sensitive access for managing people data and department structures.' :
                   'Standard operational access restricted to designated scopes.'}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingLeft: '32px', borderLeft: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>ACCESS HEALTH</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '48px', fontWeight: 900, color: healthScore < 80 ? 'var(--color-warning)' : 'var(--color-success)', lineHeight: 1 }}>{healthScore}</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-muted)', paddingBottom: '6px' }}>/ 100</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: healthScore < 80 ? 'var(--color-warning)' : 'var(--color-success)' }}>
                {healthScore < 80 ? 'Needs Review' : 'Healthy'}
              </div>
              {role.accessRisks && role.accessRisks.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: 'var(--color-danger)', marginTop: '8px' }}>
                  <ShieldAlert size={14} /> {role.accessRisks.length} Access Risks
                </div>
              )}
            </div>
          </div>

          {/* Bottom Half: 6 Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', backgroundColor: 'var(--color-surface-hover)' }}>
            <div style={{ padding: '20px', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{role.users || 0}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>ASSIGNED USERS</div>
            </div>
            <div style={{ padding: '20px', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{role.directPermissions?.length || 0}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>DIRECT PERMISSIONS</div>
            </div>
            <div style={{ padding: '20px', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{role.inheritedPermissions?.length || 0}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>INHERITED PERMISSIONS</div>
            </div>
            <div style={{ padding: '20px', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{coverage}%</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>PLATFORM COVERAGE</div>
            </div>
            <div style={{ padding: '20px', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-danger)' }}>{role.color === 'CRITICAL ACCESS' ? 8 : role.color === 'STRATEGIC ACCESS' ? 4 : 0}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>CRITICAL ACTIONS</div>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: role.accessRisks?.length > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>{role.accessRisks?.length || 0}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>ACCESS RISKS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '24px', gap: '32px' }}>
        {[
          { id: 'OVERVIEW', label: 'OVERVIEW', icon: Activity },
          { id: 'PERMISSIONS', label: 'PERMISSIONS', icon: Key },
          { id: 'USERS', label: 'USERS', icon: Users },
          { id: 'INHERITANCE', label: 'INHERITANCE', icon: Network },
          { id: 'ACCESS_MAP', label: 'ACCESS MAP', icon: Shield },
          { id: 'HISTORY', label: 'HISTORY', icon: History }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 0',
                borderBottom: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.05em',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Area */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {activeTab === 'OVERVIEW' && <RoleOverviewTab role={role} />}
        {activeTab === 'PERMISSIONS' && <RolePermissionsTab role={role} />}
        {activeTab === 'USERS' && <RoleUsersTab role={role} />}
        {activeTab === 'INHERITANCE' && <RoleInheritanceTab role={role} />}
        {activeTab === 'ACCESS_MAP' && <RoleAccessMapTab role={role} />}
        {activeTab === 'HISTORY' && <RoleHistoryTab role={role} />}
      </div>

    </div>
  );
};

export default RoleIntelligenceWorkspace;
