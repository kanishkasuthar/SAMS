import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Grid, List, Users as UsersIcon, Globe, Monitor, UserPlus, 
  MoreVertical, CheckCircle2, ChevronRight, Activity, Cpu, Box, LayoutGrid, FileSpreadsheet
} from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import EmployeeProfile from '../components/intelligence/EmployeeProfile';
import AddUserModal from '../components/AddUserModal';
import PeopleFilterDrawer from '../components/people/PeopleFilterDrawer';
import AssignProjectModal from '../components/people/AssignProjectModal';
import MoveEmployeeModal from '../components/intelligence/MoveEmployeeModal';
import EmailComposerModal from '../components/common/EmailComposerModal';
import CallSimulationModal from '../components/common/CallSimulationModal';
import ConfirmationModal from '../components/intelligence/ConfirmationModal';
import ExcelSyncModal from '../components/intelligence/ExcelSyncModal';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { people } = useOrgStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals / Drawers State
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showExcelSyncModal, setShowExcelSyncModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // Quick Actions Modals State
  const [actionEmployee, setActionEmployee] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Online': return 'var(--color-success)';
      case 'Busy': return 'var(--color-danger)';
      case 'Meeting': return 'var(--color-warning)';
      case 'Leave': return 'var(--color-text-muted)';
      case 'Offline': default: return 'var(--color-border)';
    }
  };

  const getHealthColor = (score) => {
    if (score >= 90) return 'var(--color-success)';
    if (score >= 70) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const handleQuickAction = (e, action, emp) => {
    e.stopPropagation();
    setActiveDropdown(null);
    setActionEmployee(emp);
    
    switch(action) {
      case 'profile': setSelectedProfile(emp); break;
      case 'edit': setShowAddUserModal(true); break;
      case 'assign': setShowAssignModal(true); break;
      case 'move': setShowMoveModal(true); break;
      case 'org': navigate('/org-studio'); break;
      case 'email': setShowEmailModal(true); break;
      case 'call': setShowCallModal(true); break;
      case 'archive': setShowDeleteModal(true); break;
      default: addToast(`Action ${action} executed`, 'info');
    }
  };

  // Click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredPeople = people.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.department.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Header & Stats */}
      <div style={{ marginBottom: 32 }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
          <div>
            <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>People Directory</h1>
            <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Manage your entire workforce and organizational structure.</p>
          </div>
          <div className="flex gap-12">
            <button 
              className="btn-secondary"
              style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}
              onClick={() => setShowExcelSyncModal(true)}
            >
              <FileSpreadsheet size={16} /> Import Excel
            </button>
            <button 
              className="btn-primary"
              style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}
              onClick={() => { setActionEmployee(null); setShowAddUserModal(true); }}
            >
              <Plus size={16} /> Add Employee
            </button>
          </div>
        </div>

        {/* Live Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
          {[
            { label: 'Total Employees', value: '14,240', icon: UsersIcon, color: 'var(--color-primary)' },
            { label: 'Online Now', value: '1,425', icon: Activity, color: 'var(--color-success)' },
            { label: 'Total Managers', value: '3,212', icon: Briefcase, color: 'var(--color-warning)' },
            { label: 'Departments', value: '14', icon: Box, color: 'var(--color-info)' },
            { label: 'Remote Staff', value: '8,420', icon: Globe, color: 'var(--color-primary)' },
            { label: 'New Joiners (Q3)', value: '142', icon: UserPlus, color: 'var(--color-success)' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{stat.label}</span>
                <stat.icon size={16} color={stat.color} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ padding: '16px 24px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* AI Natural Language Search */}
        <div style={{ position: 'relative', width: 600 }}>
          <div style={{ position: 'absolute', left: 16, top: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cpu size={16} color="var(--color-primary)" />
            <Search size={16} color="var(--color-text-muted)" />
          </div>
          <input 
            type="text"
            placeholder="Ask AI: 'Show all Engineering Managers with more than 10 direct reports...'"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', padding: '12px 16px 12px 64px', borderRadius: 24, 
              border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-hover)',
              outline: 'none', fontSize: '14px', transition: 'all 0.2s',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
            }}
          />
        </div>

        <div className="flex gap-16">
          <button 
            className="card"
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
            onClick={() => setShowFilterDrawer(true)}
          >
            <Filter size={16} color="var(--color-text-secondary)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>Advanced Filter</span>
          </button>

          {/* View Toggle */}
          <div style={{ display: 'flex', backgroundColor: 'var(--color-surface-hover)', borderRadius: 'var(--radius-md)', padding: 4 }}>
            <button 
              onClick={() => setViewMode('table')}
              style={{ padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, backgroundColor: viewMode === 'table' ? 'var(--color-surface)' : 'transparent', boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none', color: viewMode === 'table' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
            >
              <List size={16} /> <span style={{ fontSize: '13px', fontWeight: 600 }}>Table</span>
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              style={{ padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, backgroundColor: viewMode === 'grid' ? 'var(--color-surface)' : 'transparent', boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none', color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
            >
              <LayoutGrid size={16} /> <span style={{ fontSize: '13px', fontWeight: 600 }}>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'table' ? (
        <div className="card" style={{ flex: 1, overflow: 'visible', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Employee</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Role & Dept</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Workload</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>AI Health</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Reports</th>
                <th style={{ padding: '16px 24px', width: 60 }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredPeople.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50" style={{ borderBottom: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setSelectedProfile(emp)}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ position: 'relative' }}>
                        {emp.photo ? (
                          <img src={emp.photo} alt={emp.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                            {emp.name.charAt(0)}
                          </div>
                        )}
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', border: '2px solid var(--color-surface)', backgroundColor: getStatusColor(emp.status) }} title={emp.status}></div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{emp.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{emp.id} • {emp.employmentType}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-main)' }}>{emp.role}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{emp.department} • {emp.location}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${emp.workload}%`, backgroundColor: emp.workload > 90 ? 'var(--color-danger)' : 'var(--color-primary)', borderRadius: 4 }}></div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: emp.workload > 90 ? 'var(--color-danger)' : 'var(--color-text-main)', width: 40 }}>{emp.workload}%</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 4 }}>{emp.assignedProjects} Active Projects</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle2 size={16} color={getHealthColor(emp.healthScore)} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: getHealthColor(emp.healthScore) }}>{emp.healthScore}/100</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <UsersIcon size={16} color="var(--color-text-secondary)" />
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>{emp.directReports}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', position: 'relative' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === emp.id ? null : emp.id); }}
                      style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8 }}
                      className="hover:bg-slate-200"
                    >
                      <MoreVertical size={16} color="var(--color-text-secondary)" />
                    </button>

                    {/* Quick Actions Dropdown */}
                    {activeDropdown === emp.id && (
                      <div 
                        style={{ 
                          position: 'absolute', right: 40, top: 40, width: 220, backgroundColor: 'var(--color-surface)', 
                          borderRadius: 8, boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)', 
                          zIndex: 100, overflow: 'hidden', padding: 8
                        }}
                      >
                        <div style={{ padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>QUICK ACTIONS</div>
                        <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'profile', emp)}>View Profile</div>
                        <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'edit', emp)}>Edit Employee</div>
                        <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'assign', emp)}>Assign Project</div>
                        <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'move', emp)}>Move Department</div>
                        <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'org', emp)}>Open Hierarchy</div>
                        
                        <div style={{ margin: '8px 0', borderTop: '1px solid var(--color-border)' }}></div>
                        <div style={{ padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>COMMUNICATION</div>
                        <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'email', emp)}>Send Email</div>
                        <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'call', emp)}>Call via VoIP</div>
                        
                        <div style={{ margin: '8px 0', borderTop: '1px solid var(--color-border)' }}></div>
                        <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer', color: 'var(--color-danger)' }} onClick={(e) => handleQuickAction(e, 'archive', emp)}>Archive Employee</div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* GRID VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {filteredPeople.map(emp => (
            <div key={emp.id} className="card" style={{ padding: 24, cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }} onClick={() => setSelectedProfile(emp)}>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === emp.id ? null : emp.id); }}
                style={{ position: 'absolute', top: 16, right: 16, padding: 8, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8 }}
                className="hover:bg-slate-100"
              >
                <MoreVertical size={16} color="var(--color-text-secondary)" />
              </button>

              {/* Quick Actions Dropdown (Grid) */}
              {activeDropdown === emp.id && (
                <div 
                  style={{ 
                    position: 'absolute', right: 40, top: 40, width: 220, backgroundColor: 'var(--color-surface)', 
                    borderRadius: 8, boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)', 
                    zIndex: 100, overflow: 'hidden', padding: 8, textAlign: 'left'
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'profile', emp)}>View Profile</div>
                  <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'assign', emp)}>Assign Project</div>
                  <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'move', emp)}>Move Department</div>
                  <div className="dropdown-item" style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => handleQuickAction(e, 'org', emp)}>Open Hierarchy</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{ position: 'relative' }}>
                  {emp.photo ? (
                    <img src={emp.photo} alt={emp.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                      {emp.name.charAt(0)}
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: '50%', border: '3px solid var(--color-surface)', backgroundColor: getStatusColor(emp.status) }} title={emp.status}></div>
                </div>
                <div style={{ flex: 1, marginTop: 4 }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>{emp.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 2 }}>{emp.role}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: 4 }}>{emp.department}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, padding: '16px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>WORKLOAD</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 4, backgroundColor: 'var(--color-surface-hover)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${emp.workload}%`, backgroundColor: emp.workload > 90 ? 'var(--color-danger)' : 'var(--color-primary)' }}></div>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{emp.workload}%</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>AI HEALTH</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: getHealthColor(emp.healthScore), display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={14} /> {emp.healthScore}/100
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><UsersIcon size={14} /> {emp.directReports} Reports</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Briefcase size={14} /> {emp.assignedProjects} Projects</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontWeight: 600 }}>View Profile <ChevronRight size={14} /></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render Modals & Drawers */}
      <EmployeeProfile 
        isOpen={!!selectedProfile} 
        onClose={() => setSelectedProfile(null)} 
        employee={selectedProfile} 
      />
      
      <PeopleFilterDrawer 
        isOpen={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
      />

      <AddUserModal 
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        user={actionEmployee}
      />

      <AssignProjectModal 
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        employee={actionEmployee}
      />

      <MoveEmployeeModal 
        isOpen={showMoveModal}
        onClose={() => setShowMoveModal(false)}
      />

      <EmailComposerModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        employeeName={actionEmployee?.name}
      />

      <CallSimulationModal 
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        employeeName={actionEmployee?.name}
        photo={actionEmployee?.photo}
      />

      <ConfirmationModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Archive Employee"
        message={`Are you sure you want to archive ${actionEmployee?.name}? They will be removed from the active directory and all their current projects will be unassigned. This action will be logged in the audit trail.`}
        confirmText="Archive Employee"
        isDanger={true}
        onConfirm={() => {
          addToast(`${actionEmployee?.name} has been archived.`, 'success');
          setShowDeleteModal(false);
        }}
      />
      
      <ExcelSyncModal 
        isOpen={showExcelSyncModal}
        onClose={() => setShowExcelSyncModal(false)}
      />
    </div>
  );
};

export default Users;
