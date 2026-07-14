import React, { useState } from 'react';
import { Building2, Users, DollarSign, Activity, Search, Plus, Edit2, Filter } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import DepartmentDrawer from '../components/DepartmentDrawer';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import Card from '../components/common/Card';

const Departments = () => {
  const { departments: DEPARTMENTS_DATA, addDepartment, updateDepartment } = useOrgStore();
  const { addToast } = useUIStore();
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPerformance, setFilterPerformance] = useState('All');

  const handleCreateOrUpdateDepartment = (deptData) => {
    if (editingDepartment) {
      updateDepartment(editingDepartment.id, deptData);
      addToast(`${deptData.name} department successfully updated.`, 'success');
    } else {
      addDepartment({
        ...deptData,
        performance: 'Pending'
      });
      addToast(`${deptData.name} department successfully added.`, 'success');
    }
    setShowModal(false);
    setEditingDepartment(null);
  };

  const openEditModal = (e, dept) => {
    if (e) e.stopPropagation();
    setEditingDepartment(dept);
    setShowModal(true);
  };

  const openNewModal = () => {
    setEditingDepartment(null);
    setShowModal(true);
  };

  const filteredDepartments = DEPARTMENTS_DATA.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (d.head && d.head.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Some departments might have performance as undefined initially if not properly set. We'll fallback to 'Pending'
    const perf = d.performance || 'Pending';
    const matchesFilter = filterPerformance === 'All' || perf === filterPerformance;
    
    return matchesSearch && matchesFilter;
  });

  const columns = [
    { 
      header: 'Department', 
      field: 'name',
      render: (dept) => (
        <div className="flex items-center gap-3">
          <div style={{width: 32, height: 32, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Building2 size={16} />
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{dept.name}</span>
        </div>
      )
    },
    { 
      header: 'Head', 
      field: 'head',
      render: (dept) => <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{dept.head || 'Unassigned'}</span>
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
          <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{dept.budget || '$0'}</span>
        </div>
      )
    },
    { 
      header: 'Performance', 
      field: 'performance',
      render: (dept) => {
        const perf = dept.performance || 'Pending';
        let color = 'var(--color-text-muted)';
        if (perf === 'Excellent' || perf === 'Good') color = 'var(--color-success)';
        if (perf === 'Average') color = 'var(--color-warning)';
        
        return (
          <div className="flex items-center gap-2">
            <Activity size={14} color={color} />
            <span style={{fontSize: '0.85rem', fontWeight: 600, color}}>{perf}</span>
          </div>
        );
      }
    },
    {
      header: 'Actions',
      field: 'actions',
      render: (dept) => (
        <button 
          onClick={(e) => openEditModal(e, dept)}
          className="hover:bg-slate-100" 
          style={{color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6}}
        >
          <Edit2 size={16} />
        </button>
      )
    }
  ];

  return (
    <div style={{ padding: 'var(--space-4)', height: '100%', display: 'flex', flexDirection: 'column' }}>
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

            <Card style={{padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 'var(--radius-md)'}} noPadding>
              <Filter size={16} color="var(--color-text-muted)" style={{marginLeft: 8}} />
              <select 
                value={filterPerformance}
                onChange={(e) => setFilterPerformance(e.target.value)}
                style={{backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-main)', outline: 'none', fontWeight: 500, padding: '4px 8px'}}
              >
                <option value="All">All Performance</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Pending">Pending</option>
              </select>
            </Card>

            <button 
              className="btn-primary" 
              style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 'var(--radius-sm)'}}
              onClick={openNewModal}
            >
              <Plus size={16} />
              <span>Add Department</span>
            </button>
          </div>
        }
      />

      <div style={{ flex: 1, minHeight: 0 }}>
        <DataTable columns={columns} data={filteredDepartments} />
      </div>

      <DepartmentDrawer 
        isOpen={showModal} 
        onClose={() => {setShowModal(false); setEditingDepartment(null);}}
        onConfirm={handleCreateOrUpdateDepartment}
        initialData={editingDepartment}
      />
    </div>
  );
};

export default Departments;
