import React, { useState } from 'react';
import { Building2, Users, DollarSign, Activity, Search, Plus, Edit2, Filter } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import AddDepartmentModal from '../components/AddDepartmentModal';

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
    e.stopPropagation();
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

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Departments</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Manage organizational business units and resource allocation.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search departments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="card" style={{padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} color="var(--color-text-muted)" />
            <select 
              value={filterPerformance}
              onChange={(e) => setFilterPerformance(e.target.value)}
              style={{backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-main)', outline: 'none', fontWeight: 500, padding: '4px'}}
            >
              <option value="All">All Performance</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <button 
            className="card" 
            style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}
            onClick={openNewModal}
          >
            <Plus size={16} />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24}}>
        {filteredDepartments.map(dept => (
           <div key={dept.id} className="card" style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', overflow: 'hidden'}}>
             <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: 'var(--color-primary)'}}></div>
             
             <div style={{position: 'absolute', top: 24, right: 24, display: 'flex', gap: 8}}>
               <button 
                 onClick={(e) => openEditModal(e, dept)}
                 className="hover:bg-gray-100 p-1.5 rounded-md" 
                 style={{color: 'var(--color-text-muted)', zIndex: 10}}
               >
                 <Edit2 size={16} />
               </button>
             </div>

             <div className="flex justify-between items-start" style={{paddingRight: 40}}>
               <div>
                 <h3 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: 4}}>{dept.name}</h3>
                 <span style={{fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500}}>Head: {dept.head || 'Unassigned'}</span>
               </div>
               <div style={{width: 40, height: 40, borderRadius: '12px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 <Building2 size={20} />
               </div>
             </div>

             <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '16px 0', borderTop: '1px solid var(--color-border)'}}>
               <div className="flex items-center gap-3">
                 <div style={{width: 32, height: 32, borderRadius: '8px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                   <Users size={16} color="var(--color-text-muted)" />
                 </div>
                 <div className="flex flex-col">
                   <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600}}>Headcount</span>
                   <span style={{fontWeight: 600, fontSize: '0.9rem'}}>{dept.employeeCount || 0}</span>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div style={{width: 32, height: 32, borderRadius: '8px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                   <DollarSign size={16} color="var(--color-text-muted)" />
                 </div>
                 <div className="flex flex-col">
                   <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600}}>Budget</span>
                   <span style={{fontWeight: 600, fontSize: '0.9rem'}}>{dept.budget || '$0'}</span>
                 </div>
               </div>
             </div>

             <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <Activity size={16} color="var(--color-success)" />
                  <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-success)'}}>Performance: {dept.performance || 'Pending'}</span>
                </div>
                <button style={{color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem'}}>View Details →</button>
             </div>
           </div>
        ))}
      </div>

      <AddDepartmentModal 
        isOpen={showModal} 
        onClose={() => {setShowModal(false); setEditingDepartment(null);}}
        onConfirm={handleCreateOrUpdateDepartment}
        initialData={editingDepartment}
      />
    </div>
  );
};

export default Departments;
