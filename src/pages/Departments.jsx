import React, { useState } from 'react';
import { Building2, Users, DollarSign, Activity, Search, Plus, Filter, MoreHorizontal, ShieldAlert, Network, Edit, Trash2 } from 'lucide-react';
import { useDepartmentStore } from '../store/departmentStore';
import { useOrgStore } from '../store/orgStore'; // Kept for people/employees mapping
import { useUIStore } from '../store/uiStore';
import DepartmentDrawer from '../components/DepartmentDrawer'; 
import DepartmentIntelligenceWorkspace from '../components/departments/DepartmentIntelligenceWorkspace';
import DepartmentAnalysisModal from '../components/departments/modals/DepartmentAnalysisModal';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import { TableSkeleton } from '../components/common/Skeleton';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
  const { departments, fetchDepartments, createDepartment, updateDepartment, deleteDepartment, loading } = useDepartmentStore();
  const { people, fetchOrgChart } = useOrgStore(); // Kept for people/employees mapping
  const { addToast, openModal } = useUIStore();
  
  React.useEffect(() => {
    fetchDepartments();
    fetchOrgChart();
  }, []);
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPerformance, setFilterPerformance] = useState('All');

  const [selectedDept, setSelectedDept] = useState(null);
  const [showIntelligenceWorkspace, setShowIntelligenceWorkspace] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleCreateOrUpdateDepartment = async (deptData) => {
    if (editingDepartment) {
      const success = await updateDepartment(editingDepartment.id, deptData);
      if (success) {
        addToast('Department updated successfully.', 'success');
        if (selectedDept && selectedDept.id === editingDepartment.id) {
          setSelectedDept({ ...selectedDept, ...deptData });
        }
        setShowModal(false);
        setEditingDepartment(null);
      } else {
        const storeError = useDepartmentStore.getState().error;
        addToast(storeError || 'Failed to update department.', 'error');
      }
    } else {
      const success = await createDepartment(deptData);
      if (success) {
        addToast('Department created successfully.', 'success');
        setShowModal(false);
        setEditingDepartment(null);
      } else {
        const storeError = useDepartmentStore.getState().error;
        addToast(storeError || 'Failed to create department.', 'error');
      }
    }
  };

  const openEditModal = (e, dept) => {
    if (e) e.stopPropagation();
    setEditingDepartment(dept);
    setShowModal(true);
    setActiveDropdown(null);
  };

  const openNewModal = () => {
    setEditingDepartment(null);
    setShowModal(true);
  };

  const openIntelligence = (dept) => {
    setSelectedDept(dept);
    setShowIntelligenceWorkspace(true);
  };

  const handleStudioFocus = (deptId) => {
    navigate('/org-studio', { state: { focusDepartmentId: deptId } });
  };

  const handleRunAnalysis = (dept) => {
    setSelectedDept(dept);
    setShowAnalysisModal(true);
  };

  const crossDeptConnections = React.useMemo(() => {
    let count = 0;
    people.forEach(p => {
      if (p.reportingManagerId || p.managerId) {
        const mgr = people.find(m => m.id === (p.reportingManagerId || p.managerId));
        if (mgr && p.department && mgr.department && p.department !== mgr.department) {
          count++;
        }
      }
    });
    return count;
  }, [people]);

  const structuralRisks = React.useMemo(() => {
    let count = 0;
    departments.forEach(d => {
      if (!d.departmentHeadId && !d.headId) count++;
    });
    people.forEach(p => {
      if (p.directReports > 8) count++;
    });
    return count;
  }, [departments, people]);

  const authorityAlerts = React.useMemo(() => {
    let count = 0;
    departments.forEach(d => {
      const deptEmployees = people.filter(p => p.department === d.departmentName || p.department === d.name);
      if (deptEmployees.length > 2) {
        deptEmployees.forEach(emp => {
          const directReports = people.filter(p => p.reportingManagerId === emp.id || p.managerId === emp.id);
          if (directReports.length / deptEmployees.length > 0.5) {
            count++;
          }
        });
      }
    });
    return count;
  }, [departments, people]);

  const departmentCoverage = React.useMemo(() => {
    if (people.length === 0) return '0%';
    const assigned = people.filter(p => p.department && p.department !== 'Unassigned').length;
    return `${Math.round((assigned / people.length) * 100)}%`;
  }, [people]);

  const enrichedDepartments = departments.map(d => {
    // Dynamic Health calculation (mocked for now, can be computed backend)
    let health = d.authorityScore || 50; 
    let healthState = 'STABLE';
    if (health >= 90) healthState = 'EXCELLENT';
    else if (health >= 80) healthState = 'HEALTHY';
    else if (health >= 70) healthState = 'STABLE';
    else if (health >= 60) healthState = 'NEEDS ATTENTION';
    else if (health >= 40) healthState = 'AT RISK';
    else healthState = 'CRITICAL';

    return {
      ...d,
      employeeCount: d.employeeCount || 0,
      healthScore: health,
      healthState: healthState
    };
  });

  const filteredDepartments = enrichedDepartments.filter(d => {
    const matchesSearch = (d.departmentName || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (d.DepartmentHead?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterPerformance === 'All' || d.healthState === filterPerformance;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    { 
      header: 'Department', 
      field: 'name',
      render: (dept) => (
        <div className="flex flex-col cursor-pointer group" onClick={() => openIntelligence(dept)} title="Open Department Intelligence">
          <div className="flex items-center gap-3">
            <div style={{width: 32, height: 32, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Building2 size={16} />
            </div>
            <span className="group-hover:text-indigo-600 group-hover:underline decoration-indigo-300" style={{ fontWeight: 600, color: 'var(--color-text-main)', transition: 'color 0.2s' }}>{dept.departmentName}</span>
          </div>
          {dept.signals && dept.signals.length > 0 && (
            <div className="flex gap-2 mt-2 ml-11">
              {dept.signals.slice(0, 2).map((sig, idx) => (
                <span key={idx} style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4, backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  {sig}
                </span>
              ))}
            </div>
          )}
        </div>
      )
    },
    { 
      header: 'Head', 
      field: 'DepartmentHead.fullName',
      render: (dept) => <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{dept.DepartmentHead?.fullName || 'Unassigned'}</span>
    },
    { 
      header: 'Headcount', 
      field: 'employeeCount',
      render: (dept) => (
        <div className="flex items-center gap-2">
          <Users size={14} color="var(--color-text-muted)" />
          <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{dept.employeeCount || 0}</span>
        </div>
      )
    },
    { 
      header: 'Budget', 
      field: 'budget',
      render: (dept) => (
        <div className="flex items-center gap-2">
          <DollarSign size={14} color="var(--color-text-muted)" />
          <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>${parseFloat(dept.budget || 0).toLocaleString()}</span>
        </div>
      )
    },
    { 
      header: 'Organization Health', 
      field: 'healthScore',
      render: (dept) => {
        let color = 'var(--color-text-muted)';
        if (dept.healthState === 'EXCELLENT' || dept.healthState === 'HEALTHY') color = 'var(--color-success)';
        if (dept.healthState === 'STABLE' || dept.healthState === 'NEEDS ATTENTION') color = 'var(--color-warning)';
        if (dept.healthState === 'AT RISK' || dept.healthState === 'CRITICAL') color = 'var(--color-danger)';
        
        return (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center" style={{ width: 120 }}>
              <span style={{fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-main)'}}>{dept.healthScore} / 100</span>
            </div>
            <div style={{ width: 120, height: 6, backgroundColor: 'var(--color-border)', borderRadius: 3, overflow: 'hidden', marginBottom: 2 }}>
              <div style={{ width: `${dept.healthScore}%`, height: '100%', backgroundColor: color, borderRadius: 3 }}></div>
            </div>
            <span style={{fontSize: '0.7rem', fontWeight: 700, color, textTransform: 'uppercase'}}>{dept.healthState}</span>
          </div>
        );
      }
    },
    {
      header: 'Actions',
      field: 'actions',
      render: (dept) => (
        <div style={{ position: 'relative' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === dept.id ? null : dept.id); }}
            className="hover:bg-slate-100" 
            style={{color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6}}
          >
            <MoreHorizontal size={16} />
          </button>
          
          {activeDropdown === dept.id && (
            <div style={{ position: 'absolute', right: 0, top: 32, backgroundColor: 'white', borderRadius: 8, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', width: 220, zIndex: 50, padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button className="context-menu-item hover:bg-slate-50" onClick={() => { setActiveDropdown(null); openIntelligence(dept); }} style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Activity size={14}/> Open Intelligence
              </button>
              <button className="context-menu-item hover:bg-slate-50" onClick={(e) => openEditModal(e, dept)} style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Edit size={14}/> Edit Department
              </button>
              <button className="context-menu-item hover:bg-slate-50" onClick={() => { setActiveDropdown(null); handleStudioFocus(dept.id); }} style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Network size={14}/> Focus in Studio
              </button>
              <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '4px 0' }}></div>
              <button className="context-menu-item hover:bg-slate-50" onClick={() => { setActiveDropdown(null); handleRunAnalysis(dept); }} style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-warning)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldAlert size={14}/> Run Continuity Sim
              </button>
              <button className="context-menu-item hover:bg-slate-50" onClick={() => { setActiveDropdown(null); openModal('CONFIRM_DELETE', { itemType: 'department', itemId: dept.id, itemName: dept.name }); }} style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-danger)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Trash2 size={14}/> Delete Department
              </button>
            </div>
          )}
        </div>
      )
    }
  ];

  // Render Intelligence Workspace if active
  if (showIntelligenceWorkspace && selectedDept) {
    const fullSelectedDept = enrichedDepartments.find(d => d.id === selectedDept.id) || selectedDept;
    return (
      <div className="w-full h-full flex flex-col">
        <DepartmentIntelligenceWorkspace 
          department={fullSelectedDept}
          onClose={() => { setShowIntelligenceWorkspace(false); setSelectedDept(null); }}
          onEdit={(dept) => { setEditingDepartment(dept); setShowModal(true); }}
          onStudioFocus={handleStudioFocus}
          onRunAnalysis={handleRunAnalysis}
        />
        <DepartmentDrawer 
          isOpen={showModal} 
          onClose={() => {setShowModal(false); setEditingDepartment(null);}}
          onConfirm={handleCreateOrUpdateDepartment}
          initialData={editingDepartment}
        />
        <DepartmentAnalysisModal 
          isOpen={showAnalysisModal}
          onClose={() => setShowAnalysisModal(false)}
          department={fullSelectedDept}
        />
      </div>
    );
  }

  // Render Default Directory Table
  return (
    <div className="page-container" onClick={() => setActiveDropdown(null)}>
      <PageHeader 
        title="Departments" 
        subtitle="Manage organizational business units and resource allocation."
        icon={Building2}
        action={
          <div className="flex gap-4">
            <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', padding: '6px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <Search size={18} color="var(--color-text-muted)" />
              <input 
                type="text" 
                placeholder="Search departments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', marginLeft: 8 }}
              />
            </div>
            <button className="btn-primary" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 'var(--radius-sm)'}} onClick={openNewModal}>
              <Plus size={16} /> Add Department
            </button>
          </div>
        }
      />

      {/* TOP INTELLIGENCE STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24, flexShrink: 0 }}>
        <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{departments.length}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Departments</div>
          </div>
          <Building2 size={24} color="var(--color-primary)" style={{ opacity: 0.5 }} />
        </div>
        <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{crossDeptConnections}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Cross-Department Connections</div>
          </div>
          <Network size={24} color="var(--color-primary)" style={{ opacity: 0.5 }} />
        </div>
        <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-danger)' }}>{structuralRisks}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Structural Risks</div>
          </div>
          <ShieldAlert size={24} color="var(--color-danger)" style={{ opacity: 0.5 }} />
        </div>
        <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warning)' }}>{authorityAlerts}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Authority Concentration Alerts</div>
          </div>
          <Activity size={24} color="var(--color-warning)" style={{ opacity: 0.5 }} />
        </div>
        <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-success)' }}>{departmentCoverage}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Department Coverage</div>
          </div>
          <Users size={24} color="var(--color-success)" style={{ opacity: 0.5 }} />
        </div>
      </div>

      <div className="table-wrapper-fill">
        {loading ? (
          <TableSkeleton rows={5} columns={6} />
        ) : (
          <DataTable columns={columns} data={filteredDepartments} />
        )}
      </div>

      <DepartmentDrawer 
        isOpen={showModal} 
        onClose={() => {setShowModal(false); setEditingDepartment(null);}}
        onConfirm={handleCreateOrUpdateDepartment}
        initialData={editingDepartment}
        loading={loading}
      />
      
      <DepartmentAnalysisModal 
        isOpen={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
        department={selectedDept}
      />
    </div>
  );
};

export default Departments;
