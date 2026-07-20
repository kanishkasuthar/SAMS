import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Shield, Key, Search, Plus, Filter, ShieldAlert, CheckCircle2, Users, Edit2, ShieldCheck, AlertTriangle, MoreHorizontal, Copy, Trash2, ArrowLeftRight, PowerOff } from 'lucide-react';
import { useRoleStore } from '../store/roleStore';
import { useUIStore } from '../store/uiStore';
import { Skeleton } from '../components/common/Skeleton';
import AddRoleModal from '../components/AddRoleModal';
import RoleIntelligenceWorkspace from '../components/roles/RoleIntelligenceWorkspace';
import PermissionMatrixView from '../components/roles/views/PermissionMatrixView';
import AccessRisksView from '../components/roles/views/AccessRisksView';
import RoleHierarchyView from '../components/roles/views/RoleHierarchyView';
import AccessSecuritySummaryModal from '../components/roles/modals/AccessSecuritySummaryModal';
import CompareRolesModal from '../components/roles/modals/CompareRolesModal';

const Roles = () => {
  const { roles, loading, fetchRoles, fetchPermissions, deleteRole, createRole, updateRole } = useRoleStore();
  const { addToast } = useUIStore();
  
  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);
  
  const [activeView, setActiveView] = useState('ROLE CARDS'); // 'ROLE CARDS', 'ROLE HIERARCHY', 'PERMISSION MATRIX', 'ACCESS RISKS'
  const [selectedRole, setSelectedRole] = useState(null); // When a role is clicked
  const [workspaceTab, setWorkspaceTab] = useState('OVERVIEW');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All Levels');
  const [filterRisk, setFilterRisk] = useState('All Risks');
  const [showSecuritySummary, setShowSecuritySummary] = useState(null); // Role object
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [actionMenuRoleId, setActionMenuRoleId] = useState(null);
  
  // Close action menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.action-menu-container')) {
        setActionMenuRoleId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Intelligence Metrics
  const totalRoles = roles.length;
  const totalAssignments = roles.reduce((acc, r) => acc + (r.users || 0), 0);
  const totalRisks = roles.reduce((acc, r) => acc + (r.accessRisks?.length || 0), 0);
  
  // Calculate risk counts
  const riskCounts = roles.reduce((acc, r) => {
    (r.accessRisks || []).forEach(risk => {
      acc[risk.severity] = (acc[risk.severity] || 0) + 1;
    });
    return acc;
  }, {});

  const filteredRoles = useMemo(() => {
    return roles.filter(r => {
      const matchesSearch = r.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.level?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = filterLevel === 'All Levels' || r.level === filterLevel;
      
      let matchesRisk = true;
      if (filterRisk !== 'All Risks') {
        const hasSpecificRisk = (r.accessRisks || []).some(risk => risk.severity === filterRisk.toUpperCase());
        const hasNoRisk = filterRisk === 'Low' && (r.accessRisks || []).length === 0;
        matchesRisk = hasSpecificRisk || hasNoRisk;
      }

      return matchesSearch && matchesLevel && matchesRisk;
    });
  }, [roles, searchQuery, filterLevel, filterRisk]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilterLevel('All Levels');
    setFilterRisk('All Risks');
  };

  const handleEditRole = (e, role) => {
    e.stopPropagation();
    setEditingRole(role);
    setShowAddModal(true);
  };

  const handleShieldClick = (e, role) => {
    e.stopPropagation();
    setShowSecuritySummary(role);
  };

  const getRiskColor = (risks) => {
    if (!risks || risks.length === 0) return { color: 'var(--color-success)', text: 'LOW' };
    if (risks.some(r => r.severity === 'CRITICAL' || r.severity === 'HIGH')) return { color: 'var(--color-danger)', text: 'HIGH' };
    return { color: 'var(--color-warning)', text: 'MEDIUM' };
  };

  // If a role is selected, show the workspace overlay over the main content
  if (selectedRole) {
    return (
      <RoleIntelligenceWorkspace 
        roleId={selectedRole.id} 
        onBack={() => { setSelectedRole(null); fetchRoles(); }}
        initialTab={workspaceTab}
      />
    );
  }

  if (loading && roles.length === 0) {
    return (
      <div className="page-container" style={{ padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="card" style={{ padding: 24, height: 250 }}>
              <Skeleton height="20px" width="60%" style={{ marginBottom: 16 }} />
              <Skeleton height="40px" width="100%" style={{ marginBottom: 16 }} />
              <Skeleton height="100px" width="100%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      
      {/* 1. PAGE HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', boxShadow: 'var(--shadow-sm)' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.025em', margin: '0 0 4px 0' }}>Role & Access Intelligence</h1>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0' }}>Manage organizational authority, platform permissions and access inheritance.</p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              <span className="label-with-icon"><Shield size={14}/> {totalRoles} Active Roles</span>
              <span className="label-with-icon"><Users size={14}/> {totalAssignments.toLocaleString()} Role Assignments</span>
              <span className="label-with-icon" style={{ color: totalRisks > 0 ? 'var(--color-danger)' : 'inherit' }}><AlertTriangle size={14}/> {totalRisks} Access Risks</span>
              <span className="label-with-icon" style={{ color: 'var(--color-success)' }}><CheckCircle2 size={14}/> Live Permission Sync</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
            <Search size={16} style={{ color: 'var(--color-text-muted)', marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search Roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', width: '200px', color: 'var(--color-text-main)' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
            <Filter size={16} style={{ color: 'var(--color-text-muted)', marginRight: '8px' }} />
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: 'var(--color-text-main)', cursor: 'pointer', fontWeight: 600 }}
            >
              <option value="All Levels">All Levels</option>
              <option value="Level 1">Level 1</option>
              <option value="Level 2">Level 2</option>
              <option value="Level 3">Level 3</option>
              <option value="Level 4">Level 4</option>
            </select>
          </div>

          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => { setEditingRole(null); setShowAddModal(true); }}
              style={{ padding: '8px 16px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
            >
              <Plus size={16} /> Create Role
            </button>
          </div>
        </div>
      </div>

      {/* 2. ROLE INTELLIGENCE SUMMARY STRIP */}
      <div className="role-metric-grid" style={{ marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="label-with-icon" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Shield size={14} /> TOTAL ROLES
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '4px' }}>{totalRoles}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Active organizational roles</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="label-with-icon" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Users size={14} /> ROLE ASSIGNMENTS
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '4px' }}>{totalAssignments.toLocaleString()}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Total active user accounts</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="label-with-icon" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            <AlertTriangle size={14} /> ACCESS RISKS
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: totalRisks > 0 ? 'var(--color-danger)' : 'var(--color-success)', marginBottom: '4px' }}>{totalRisks}</div>
          <div style={{ fontSize: '12px', color: totalRisks > 0 ? 'var(--color-danger)' : 'var(--color-text-secondary)', fontWeight: 600 }}>
            {totalRisks > 0 ? `${riskCounts.CRITICAL || 0} Critical · ${riskCounts.HIGH || 0} High · ${riskCounts.MEDIUM || 0} Medium` : 'No active risks detected'}
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="label-with-icon" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Key size={14} /> PERMISSION COVERAGE
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '4px' }}>96%</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Platform access mapping complete</div>
        </div>
      </div>

      {/* 3. ROLE VIEW SWITCHER */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
        {['ROLE CARDS', 'ROLE HIERARCHY', 'PERMISSION MATRIX', 'ACCESS RISKS'].map(view => (
          <button 
            key={view}
            onClick={() => setActiveView(view)}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: activeView === view ? '1px solid var(--color-primary)' : '1px solid transparent',
              backgroundColor: activeView === view ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
              color: activeView === view ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              cursor: 'pointer'
            }}
          >
            {view}
          </button>
        ))}
      </div>

      {/* 4. MAIN CONTENT AREA */}
      <div className="page-content-scrollable" style={{ padding: '8px 0 24px 0', marginTop: 0 }}>
        {activeView === 'ROLE HIERARCHY' && <RoleHierarchyView />}
        {activeView === 'PERMISSION MATRIX' && <PermissionMatrixView />}
        {activeView === 'ACCESS RISKS' && <AccessRisksView />}
        {activeView === 'ROLE CARDS' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', alignItems: 'start' }}>
          
          {/* LEFT: Role Cards */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {(searchQuery || filterLevel !== 'All Levels' || filterRisk !== 'All Risks') && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                <span>Showing {filteredRoles.length} of {roles.length} roles.</span>
                <button onClick={clearFilters} style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Clear Filters</button>
              </div>
            )}

            <div className="role-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {filteredRoles.map(role => {
                const riskInfo = getRiskColor(role.accessRisks);
                const coverage = Math.min(100, Math.round(((role.directPermissions?.length || 0) + (role.inheritedPermissions?.length || 0)) / 31 * 100)); // 31 is roughly total permissions
                
                let classColor = 'var(--color-text-muted)';
                let classBg = 'var(--color-surface-hover)';
                const classification = role.isSystem ? 'SYSTEM ROLE' : 'CUSTOM ROLE';
                if (role.isSystem) { classColor = 'var(--color-primary)'; classBg = 'rgba(79, 70, 229, 0.1)'; }
                else { classColor = 'var(--color-text-muted)'; classBg = 'var(--color-surface-hover)'; }

                return (
                  <div 
                    key={role.id} 
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', overflow: 'hidden' }}
                    onClick={() => { setSelectedRole(role); setWorkspaceTab('OVERVIEW'); }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                  >
                    <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-surface-hover)' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <button onClick={(e) => handleShieldClick(e, role)} style={{ width: '40px', height: '40px', backgroundColor: classBg, color: classColor, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${classBg}` }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                          <Shield size={20} />
                        </button>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0', textTransform: 'uppercase' }}>{role.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>{role.level}</span>
                          <span style={{ color: 'var(--color-border)' }}>|</span>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: classColor, backgroundColor: classBg, padding: '2px 6px', borderRadius: '4px' }}>{classification}</span>
                        </div>
                      </div>
                    </div>
                    <div className="action-menu-container" style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={(e) => handleEditRole(e, role)} style={{ color: 'var(--color-text-muted)', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                          <Edit2 size={16} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setActionMenuRoleId(actionMenuRoleId === role.id ? null : role.id); }} style={{ color: 'var(--color-text-muted)', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-main)'; e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      {actionMenuRoleId === role.id && (
                        <div style={{ position: 'absolute', top: '100%', right: '0', marginTop: '4px', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)', width: '220px', zIndex: 100, display: 'flex', flexDirection: 'column', padding: '8px' }}>
                          <button onClick={(e) => { e.stopPropagation(); addToast('Duplicate role confirmation opened', 'info'); setActionMenuRoleId(null); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Copy size={16} color="var(--color-text-muted)" /> Duplicate Role
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setShowCompareModal(true); setActionMenuRoleId(null); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <ArrowLeftRight size={16} color="var(--color-text-muted)" /> Compare Role
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedRole(role); setWorkspaceTab('USERS'); setActionMenuRoleId(null); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Users size={16} color="var(--color-text-muted)" /> View Assigned Users
                          </button>
                          <div style={{ height: '1px', backgroundColor: 'var(--color-surface-hover)', margin: '4px 0' }}></div>
                          <button onClick={(e) => { e.stopPropagation(); addToast('Role deactivated', 'warning'); setActionMenuRoleId(null); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-warning)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <PowerOff size={16} color="var(--color-warning)" /> Deactivate Role
                          </button>
                          <button onClick={async (e) => { 
                            e.stopPropagation(); 
                            setActionMenuRoleId(null); 
                            const success = await deleteRole(role.id);
                            if (success) addToast('Role deleted', 'success');
                          }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-danger)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Trash2 size={16} color="var(--color-danger)" /> Delete Role
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Permission Scope</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{role.access}</div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Permission Coverage</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>{coverage}%</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${coverage}%`, backgroundColor: 'var(--color-primary)' }}></div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: 'var(--color-surface-hover)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div>
                          <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-text-main)' }}>{role.directPermissions?.length || 0}</div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Direct Permissions</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-text-main)' }}>{role.inheritedPermissions?.length || 0}</div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Inherited Permissions</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '16px 24px', backgroundColor: 'var(--color-surface-alt)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Active Users</span>
                        <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>{role.users?.toLocaleString() || 0}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Access Risk</span>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: riskInfo.color }}>{riskInfo.text}</span>
                      </div>
                    </div>

                    <div style={{ padding: '12px 24px', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      VIEW ROLE INTELLIGENCE
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Access Risks & Quick Actions */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Access Risks */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, textTransform: 'uppercase' }}>Access Risks</h3>
                <button onClick={() => setActiveView('ACCESS RISKS')} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-surface-hover)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>HIGH</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Excessive Admin Access</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>12 users hold System Administrator access. Recommended maximum: 5.</p>
                  <button onClick={() => setActiveView('ACCESS RISKS')} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>View Details →</button>
                </div>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-surface-hover)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>HIGH</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Dormant Critical Permissions</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>3 users have not used Level 1 admin access in 60 days.</p>
                  <button onClick={() => setActiveView('ACCESS RISKS')} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>View Details →</button>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-warning)', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>MEDIUM</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Inheritance Expansion</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>HR Manager inherits 6 unused permissions across 82% of users.</p>
                  <button onClick={() => setActiveView('ACCESS RISKS')} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>View Details →</button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => setShowAddModal(true)} style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '13px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}>
                  <Plus size={16} color="var(--color-primary)" /> Create Custom Role
                </button>
                <button onClick={() => setShowCompareModal(true)} style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '13px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}>
                  <ArrowLeftRight size={16} color="var(--color-primary)" /> Compare Roles
                </button>
                <button onClick={() => { addToast('Scanning role assignments...', 'info'); setTimeout(() => addToast('Analysis complete. 3 risks detected.', 'warning'), 1500); }} style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '13px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}>
                  <AlertTriangle size={16} color="var(--color-primary)" /> Run Access Analysis
                </button>
                <button onClick={() => setActiveView('ROLE HIERARCHY')} style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '13px', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}>
                  <Users size={16} color="var(--color-primary)" /> Role Hierarchy Simulator
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
      </div>

      <AddRoleModal 
        isOpen={showAddModal} 
        onClose={() => { setShowAddModal(false); setEditingRole(null); }}
        initialData={editingRole}
        onConfirm={async (data) => {
          if (editingRole) {
            const success = await updateRole(editingRole.id, data);
            if (success) {
              addToast(`Updated role ${data.roleName}`, 'success');
              setShowAddModal(false);
              setEditingRole(null);
            }
          } else {
            const success = await createRole(data);
            if (success) {
              addToast(`Created role ${data.roleName}`, 'success');
              setShowAddModal(false);
            }
          }
        }}
      />
      {showSecuritySummary && <AccessSecuritySummaryModal isOpen={true} onClose={() => setShowSecuritySummary(null)} role={showSecuritySummary} />}
      {showCompareModal && <CompareRolesModal isOpen={true} onClose={() => setShowCompareModal(false)} />}

    </div>
  );
};

export default Roles;
