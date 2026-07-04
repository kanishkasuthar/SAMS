import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Edit2, Filter } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import AddUserModal from '../components/AddUserModal';

const Users = () => {
  const { users, addUser, updateUser } = useOrgStore();
  const { addToast } = useUIStore();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  const handleCreateOrUpdateUser = (userData) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
      addToast(`${userData.name}'s profile successfully updated.`, 'success');
    } else {
      addUser({
        ...userData,
        lastLogin: 'Just now'
      });
      addToast(`${userData.name} has been invited successfully.`, 'success');
    }
    setShowModal(false);
    setEditingUser(null);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const openNewModal = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRole === 'All' || u.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>System Users</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Manage platform logins and role assignments.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 300, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="card" style={{padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} color="var(--color-text-muted)" />
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-main)', outline: 'none', fontWeight: 500, padding: '4px'}}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <button 
            className="card" 
            style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}
            onClick={openNewModal}
          >
            <Plus size={16} />
            <span>Invite User</span>
          </button>
        </div>
      </div>

      <div className="card" style={{overflowX: 'auto'}}>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: 'rgba(15, 23, 42, 0.02)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)'}}>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>User</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Email</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Role</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Last Login</th>
              <th style={{padding: '16px 24px', width: 60}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={user.id} style={{borderBottom: idx === filteredUsers.length - 1 ? 'none' : '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}} className="hover:bg-gray-50">
                <td style={{padding: '16px 24px'}}>
                  <div className="flex items-center gap-3">
                    <div style={{width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem'}}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{fontWeight: 600, color: 'var(--color-text-main)'}}>{user.name}</span>
                  </div>
                </td>
                <td style={{padding: '16px 24px', color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>{user.email}</td>
                <td style={{padding: '16px 24px'}}>
                   <span style={{padding: '4px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(15, 23, 42, 0.05)', color: 'var(--color-text-main)'}}>
                    {user.role}
                  </span>
                </td>
                <td style={{padding: '16px 24px'}}>
                  <span style={{color: user.lastLogin === 'Active' || user.lastLogin === 'Just now' ? 'var(--color-success)' : 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500}}>
                    {user.lastLogin}
                  </span>
                </td>
                <td style={{padding: '16px 24px'}}>
                  <div className="flex items-center gap-2">
                    <button 
                      className="icon-btn" 
                      style={{width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                      onClick={() => openEditModal(user)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-btn" style={{width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><MoreHorizontal size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} style={{padding: 32, textAlign: 'center', color: 'var(--color-text-muted)'}}>
                  No users found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddUserModal 
        isOpen={showModal} 
        onClose={() => {setShowModal(false); setEditingUser(null);}}
        onConfirm={handleCreateOrUpdateUser}
        initialData={editingUser}
      />
    </div>
  );
};

export default Users;
