import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Grid, List, Users as UsersIcon, Globe, Monitor, UserPlus, 
  MoreVertical, CheckCircle2, ChevronRight, Activity, Cpu, Box, LayoutGrid, FileSpreadsheet,
  Brain, ShieldAlert, Network, History, Briefcase, MessageSquare, Maximize2, Trash2, Edit
} from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useUIStore } from '../store/uiStore';
import { useOrgStore } from '../store/orgStore';
import EmployeeIntelligenceDrawer from '../components/intelligence/EmployeeIntelligenceDrawer';
import EditEmployeeModal from '../components/intelligence/EditEmployeeModal';
import CompactMessagingWorkspace from '../components/common/CompactMessagingWorkspace';
import SmartHoverPreview from '../components/people/SmartHoverPreview';
import { TableSkeleton } from '../components/common/Skeleton';
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
  const { users, fetchUsers, searchQuery, setSearchQuery, totalUsers, createUser, deleteUser, updateUser, loading } = useUserStore();
  const { people, departments, fetchOrgChart } = useOrgStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    fetchUsers();
    fetchOrgChart();
  }, []);
  
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showExcelSyncModal, setShowExcelSyncModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessageWorkspace, setShowMessageWorkspace] = useState(false);
  const [hoveredEmployee, setHoveredEmployee] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  
  // Quick Actions Modals State
  const [actionEmployee, setActionEmployee] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  const getDeterministicCount = (arr, divisor) => {
    return arr.filter(item => {
      if (!item.id) return false;
      let hash = 0;
      for (let i = 0; i < item.id.length; i++) {
        hash = item.id.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash) % divisor === 0;
    }).length;
  };

  const totalEmployeesCount = people.length;
  const onlineCount = people.filter(p => p.status === 'Online').length;
  const totalManagersCount = people.filter(p => people.some(other => other.reportingManagerId === p.id) || p.role?.toLowerCase().includes('manager') || p.role?.toLowerCase().includes('director') || p.role?.toLowerCase().includes('head')).length;
  const totalDeptsCount = departments.length;
  const remoteCount = getDeterministicCount(people, 3);
  const newJoinersCount = getDeterministicCount(people, 4);
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
      case 'edit': setShowEditModal(true); break;
      case 'assign': setShowAssignModal(true); break;
      case 'move': setShowMoveModal(true); break;
      case 'org': navigate('/org-studio', { state: { focusEmployeeId: emp.id } }); break;
      case 'email': setShowEmailModal(true); break;
      case 'message': setShowMessageWorkspace(true); break;
      case 'call': setShowCallModal(true); break;
      case 'archive': setShowDeleteModal(true); break;
      case 'simulation': addToast('Continuity Risk Simulation opens in the Intelligence Workspace.', 'info'); setSelectedProfile(emp); break;
      default: addToast(`Action ${action} executed`, 'info');
    }
  };

  const handleMouseEnter = (e, emp) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = { top: rect.bottom + 8, left: rect.left };
    const timeout = setTimeout(() => {
      setHoveredEmployee(emp);
      setHoverPosition(position);
    }, 500);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredEmployee(null);
  };

  // Click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Ensure search acts locally for now or triggers backend
  // The userStore handles search via API if we call setSearchQuery, but the API handles the filtering
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="page-container" onClick={() => setActiveDropdown(null)}>
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
            { label: 'Total Employees', value: totalEmployeesCount.toLocaleString(), icon: UsersIcon, color: 'var(--color-primary)' },
            { label: 'Online Now', value: onlineCount.toLocaleString(), icon: Activity, color: 'var(--color-success)' },
            { label: 'Total Managers', value: totalManagersCount.toLocaleString(), icon: Briefcase, color: 'var(--color-warning)' },
            { label: 'Departments', value: totalDeptsCount.toString(), icon: Box, color: 'var(--color-info)' },
            { label: 'Remote Staff', value: remoteCount.toLocaleString(), icon: Globe, color: 'var(--color-primary)' },
            { label: 'New Joiners (Q3)', value: newJoinersCount.toLocaleString(), icon: UserPlus, color: 'var(--color-success)' },
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
            onChange={handleSearch}
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

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <TableSkeleton rows={8} columns={6} />
        ) : viewMode === 'table' ? (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-surface)', zIndex: 1, boxShadow: '0 1px 0 var(--color-border)' }}>
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
              {users.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50" style={{ borderBottom: '1px solid var(--color-border)', transition: 'all 0.2s', position: 'relative' }}>
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
                        <div 
                          className="employee-name-hover"
                          style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', cursor: 'pointer', display: 'inline-block' }}
                          onClick={() => setSelectedProfile(emp)}
                          onMouseEnter={(e) => handleMouseEnter(e, emp)}
                          onMouseLeave={handleMouseLeave}
                          title="Open Employee Intelligence"
                        >
                          {emp.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{emp.id.substring(0, 8)} • {emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-main)' }}>{emp.Role?.name || 'No Role'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{emp.Department?.name || 'No Department'} • {emp.phone || 'N/A'}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${emp.workload || 50}%`, backgroundColor: (emp.workload || 50) > 90 ? 'var(--color-danger)' : 'var(--color-primary)', borderRadius: 4 }}></div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: (emp.workload || 50) > 90 ? 'var(--color-danger)' : 'var(--color-text-main)', width: 40 }}>{emp.workload || 50}%</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 4 }}>{emp.assignedProjects || 0} Active Projects</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle2 size={16} color={getHealthColor(emp.healthScore || 90)} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: getHealthColor(emp.healthScore || 90) }}>{emp.healthScore || 90}/100</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <UsersIcon size={16} color="var(--color-text-secondary)" />
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>{emp.directReports || 0}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActionEmployee(emp); setShowMessageWorkspace(true); }}
                        style={{ padding: 6, borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                        className="hover-action"
                        title="Message"
                      >
                        <MessageSquare size={16} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === emp.id ? null : emp.id); }}
                        style={{ padding: 6, borderRadius: '50%', border: 'none', backgroundColor: activeDropdown === emp.id ? 'var(--color-surface-hover)' : 'transparent', cursor: 'pointer' }}
                      >
                        <MoreVertical size={16} color={activeDropdown === emp.id ? 'var(--color-text-main)' : 'var(--color-text-muted)'} />
                      </button>
                    </div>

                    {activeDropdown === emp.id && (
                      <div style={{ position: 'absolute', right: 24, top: 48, width: 260, backgroundColor: 'var(--color-surface)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px var(--color-border)', zIndex: 50, padding: 8, overflow: 'hidden' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', padding: '8px 12px', letterSpacing: '0.05em' }}>Intelligence & Studio</div>
                        <button onClick={(e) => handleQuickAction(e, 'profile', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-main)', textAlign: 'left', borderRadius: 6 }}>
                          <Brain size={14} color="var(--color-primary)" /> View Employee Intelligence
                        </button>
                        <button onClick={(e) => handleQuickAction(e, 'org', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-main)', textAlign: 'left', borderRadius: 6 }}>
                          <Maximize2 size={14} color="var(--color-text-secondary)" /> Focus in Organization Studio
                        </button>
                        <button onClick={(e) => handleQuickAction(e, 'profile', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-main)', textAlign: 'left', borderRadius: 6 }}>
                          <History size={14} color="var(--color-text-secondary)" /> View Employee Journey
                        </button>
                        <button onClick={(e) => handleQuickAction(e, 'simulation', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-warning)', textAlign: 'left', borderRadius: 6 }}>
                          <ShieldAlert size={14} color="var(--color-warning)" /> Run Impact Simulation
                        </button>
                        <button onClick={(e) => handleQuickAction(e, 'profile', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-main)', textAlign: 'left', borderRadius: 6 }}>
                          <Briefcase size={14} color="var(--color-text-secondary)" /> View Projects
                        </button>

                        <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '8px 0' }} />
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', padding: '8px 12px', letterSpacing: '0.05em' }}>Manage Employee</div>

                        <button onClick={(e) => handleQuickAction(e, 'edit', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-main)', textAlign: 'left', borderRadius: 6 }}>
                          <Edit size={14} color="var(--color-text-secondary)" /> Edit Employee
                        </button>
                        <button onClick={(e) => handleQuickAction(e, 'move', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-main)', textAlign: 'left', borderRadius: 6 }}>
                          <Network size={14} color="var(--color-text-secondary)" /> Transfer Department
                        </button>
                        <button onClick={(e) => handleQuickAction(e, 'edit', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-main)', textAlign: 'left', borderRadius: 6 }}>
                          <UsersIcon size={14} color="var(--color-text-secondary)" /> Change Manager
                        </button>
                        <button onClick={(e) => handleQuickAction(e, 'assign', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-main)', textAlign: 'left', borderRadius: 6 }}>
                          <Briefcase size={14} color="var(--color-text-secondary)" /> Assign Project
                        </button>

                        <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '8px 0' }} />

                        <button onClick={(e) => handleQuickAction(e, 'archive', emp)} className="dropdown-item" style={{ width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--color-danger)', textAlign: 'left', borderRadius: 6 }}>
                          <Trash2 size={14} color="var(--color-danger)" /> Archive Employee
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, paddingBottom: 32 }}>
          {users.map(emp => (
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
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 2 }}>{emp.Role?.name || 'No Role'}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: 4 }}>{emp.Department?.name || 'No Department'}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, padding: '16px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>WORKLOAD</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 4, backgroundColor: 'var(--color-surface-hover)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${emp.workload || 50}%`, backgroundColor: (emp.workload || 50) > 90 ? 'var(--color-danger)' : 'var(--color-primary)' }}></div>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{emp.workload || 50}%</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>AI HEALTH</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: getHealthColor(emp.healthScore || 90), display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={14} /> {emp.healthScore || 90}/100
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><UsersIcon size={14} /> {emp.directReports || 0} Reports</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Briefcase size={14} /> {emp.assignedProjects || 0} Projects</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontWeight: 600 }}>View Profile <ChevronRight size={14} /></div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* Drawers and Modals */}
      <EmployeeIntelligenceDrawer 
        isOpen={selectedProfile !== null}
        onClose={() => setSelectedProfile(null)}
        employee={selectedProfile}
        onFocusInStudio={(empId) => navigate('/org-studio', { state: { focusEmployeeId: empId } })}
      />
      
      <SmartHoverPreview 
        employee={hoveredEmployee}
        position={hoverPosition}
        onOpenIntelligence={() => setSelectedProfile(hoveredEmployee)}
        onFocusStudio={() => navigate('/org-studio', { state: { focusEmployeeId: hoveredEmployee.id } })}
      />
      
      <EditEmployeeModal 
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        employee={actionEmployee}
        onSave={async (id, data) => {
          const success = await updateUser(id, {
            fullName: data.name,
            // mapping other fields when full schema supports them
          });
          if (success) setShowEditModal(false);
        }}
      />
      
      <CompactMessagingWorkspace 
        isOpen={showMessageWorkspace}
        onClose={() => setShowMessageWorkspace(false)}
        employee={actionEmployee}
        onMessageSent={(msg) => addToast('Message sent via SAMS internal comms.', 'success')}
      />

      <PeopleFilterDrawer 
        isOpen={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
      />

      <AddUserModal 
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        initialData={actionEmployee}
        onConfirm={async (data) => {
          const success = await createUser({
            fullName: data.name,
            email: data.email,
            password: 'temp123' // default password for now
          });
          if (success) {
            setShowAddUserModal(false);
          }
        }}
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
        onConfirm={async () => {
          if (actionEmployee) {
            const success = await deleteUser(actionEmployee.id);
            if (success) {
              setShowDeleteModal(false);
            }
          }
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
