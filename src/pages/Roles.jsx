import React, { useState } from 'react';
import { Shield, Key, Search, Plus, Edit2, Filter } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import AddRoleModal from '../components/AddRoleModal';

const Roles = () => {
  const { roles, addRole, updateRole } = useOrgStore();
  const { addToast } = useUIStore();
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');

  const handleCreateOrUpdateRole = (roleData) => {
    if (editingRole) {
      updateRole(editingRole.id, roleData);
      addToast(`${roleData.title} role successfully updated.`, 'success');
    } else {
      addRole({
        ...roleData,
        access: 'Custom Module Access', // Default values for new role
        users: 0
      });
      addToast(`${roleData.title} role successfully created.`, 'success');
    }
    setShowModal(false);
    setEditingRole(null);
  };

  const openEditModal = (e, role) => {
    e.stopPropagation();
    setEditingRole(role);
    setShowModal(true);
  };

  const openNewModal = () => {
    setEditingRole(null);
    setShowModal(true);
  };

  const filteredRoles = roles.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.level.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLevel === 'All' || r.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Role Management</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Configure RBAC and platform access permissions.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="card" style={{padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} color="var(--color-text-muted)" />
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              style={{backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-main)', outline: 'none', fontWeight: 500, padding: '4px'}}
            >
              <option value="All">All Levels</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Standard">Standard</option>
              <option value="Restricted">Restricted</option>
            </select>
          </div>

          <button 
            className="card" 
            style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}
            onClick={openNewModal}
          >
            <Plus size={16} />
            <span>Create Role</span>
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24}}>
        {filteredRoles.map(role => (
          <div key={role.id} className="card" style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 16, position: 'relative'}}>
            <div style={{position: 'absolute', top: 24, right: 24, display: 'flex', gap: 8}}>
              <button 
                onClick={(e) => openEditModal(e, role)}
                className="hover:bg-gray-100 p-1.5 rounded-md" 
                style={{color: 'var(--color-text-muted)'}}
              >
                <Edit2 size={16} />
              </button>
            </div>

            <div className="flex justify-between items-start" style={{paddingRight: 40}}>
              <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: 4}}>{role.title}</h3>
                <span style={{padding: '4px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)'}}>
                  {role.level}
                </span>
              </div>
              <div style={{width: 40, height: 40, borderRadius: '12px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)'}}>
                <Shield size={20} />
              </div>
            </div>

            <div style={{padding: '16px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)'}}>
               <div className="flex items-center gap-2 mb-4">
                 <Key size={16} color="var(--color-text-muted)" />
                 <span style={{fontSize: '0.9rem', color: 'var(--color-text-main)'}}>{role.access}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span style={{color: 'var(--color-text-muted)'}}>Active Users Assigned</span>
                 <span style={{fontWeight: 600, fontSize: '1rem'}}>{role.users?.toLocaleString() || 0}</span>
               </div>
            </div>

            <button style={{color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left'}}>
              View Permissions →
            </button>
          </div>
        ))}
      </div>

      <AddRoleModal 
        isOpen={showModal} 
        onClose={() => {setShowModal(false); setEditingRole(null);}}
        onConfirm={handleCreateOrUpdateRole}
        initialData={editingRole}
      />
    </div>
  );
};

export default Roles;
