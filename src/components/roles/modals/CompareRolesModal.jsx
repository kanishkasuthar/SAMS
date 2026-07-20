import React, { useState } from 'react';
import { X, Shield, Users, Key, AlertTriangle, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { useOrgStore } from '../../../store/orgStore';
import { useRoleStore } from '../../../store/roleStore';

const CompareRolesModal = ({ isOpen, onClose }) => {
  const { roles, permissions: allPermissions } = useRoleStore();
  const [roleAId, setRoleAId] = useState('');
  const [roleBId, setRoleBId] = useState('');

  if (!isOpen) return null;

  const roleA = roles.find(r => r.id === roleAId);
  const roleB = roles.find(r => r.id === roleBId);

  const renderComparison = () => {
    if (!roleA || !roleB) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', padding: '64px' }}>
        <ArrowLeftRight size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
        <p>Select two roles above to see a detailed intelligence comparison.</p>
      </div>
    );

    const aPerms = [...(roleA.directPermissions || []), ...(roleA.inheritedPermissions || [])];
    const bPerms = [...(roleB.directPermissions || []), ...(roleB.inheritedPermissions || [])];
    
    const shared = aPerms.filter(p => bPerms.includes(p));
    const uniqueA = aPerms.filter(p => !bPerms.includes(p));
    const uniqueB = bPerms.filter(p => !aPerms.includes(p));

    const getPermName = (key) => allPermissions.find(p => p.key === key)?.name || key;

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        
        {/* Core Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '16px', backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Access Level</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>{roleA.level}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', flex: 1 }}></div>
            <span style={{ fontSize: '10px', fontWeight: 800, padding: '0 12px' }}>VS</span>
            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', flex: 1 }}></div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Access Level</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>{roleB.level}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '16px', backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Users</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>{roleA.users}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', flex: 1 }}></div>
            <span style={{ fontSize: '10px', fontWeight: 800, padding: '0 12px' }}>VS</span>
            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', flex: 1 }}></div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Users</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>{roleB.users}</div>
          </div>
        </div>

        {/* Permissions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          
          <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.2)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '16px' }}>Unique to {roleA.title}</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {uniqueA.length > 0 ? uniqueA.map(p => (
                <li key={p} style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><ArrowRight size={14} color="var(--color-primary)" style={{ marginTop: '2px' }}/> {getPermName(p)}</li>
              )) : <li style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No unique permissions</li>}
            </ul>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>Shared Access ({shared.length})</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {shared.length > 0 ? shared.map(p => (
                <li key={p} style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><Key size={14} style={{ marginTop: '2px' }}/> {getPermName(p)}</li>
              )) : <li style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No shared permissions</li>}
            </ul>
          </div>

          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-danger)', textTransform: 'uppercase', marginBottom: '16px' }}>Unique to {roleB.title}</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {uniqueB.length > 0 ? uniqueB.map(p => (
                <li key={p} style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><ArrowRight size={14} color="var(--color-danger)" style={{ marginTop: '2px' }}/> {getPermName(p)}</li>
              )) : <li style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No unique permissions</li>}
            </ul>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '1000px', height: '80vh', display: 'flex', flexDirection: 'column', animation: 'scale-in 0.2s ease-out' }}>
        
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <ArrowLeftRight size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Role Comparison Workspace</h2>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Identify overlapping authorities and unique access privileges.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-danger)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px', flex: 1, backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', gap: '32px', overflow: 'hidden' }}>
          
          {/* Selectors */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Role A</label>
              <select value={roleAId} onChange={(e) => setRoleAId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-primary)', backgroundColor: 'white', color: 'var(--color-text-main)', outline: 'none', fontWeight: 600 }}>
                <option value="">Select a role...</option>
                {roles.filter(r => r.id !== roleBId).map(r => (
                  <option key={r.id} value={r.id}>{r.title}</option>
                ))}
              </select>
            </div>
            
            <div style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', marginTop: '24px' }}>
              <ArrowLeftRight size={20} />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-danger)', textTransform: 'uppercase' }}>Role B</label>
              <select value={roleBId} onChange={(e) => setRoleBId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-danger)', backgroundColor: 'white', color: 'var(--color-text-main)', outline: 'none', fontWeight: 600 }}>
                <option value="">Select a role...</option>
                {roles.filter(r => r.id !== roleAId).map(r => (
                  <option key={r.id} value={r.id}>{r.title}</option>
                ))}
              </select>
            </div>
          </div>

          {renderComparison()}

        </div>

      </div>
    </div>
  );
};

export default CompareRolesModal;
