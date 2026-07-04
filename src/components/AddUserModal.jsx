import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus } from 'lucide-react';

const AddUserModal = ({ isOpen, onClose, onConfirm, initialData = null }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Viewer');
  const [department, setDepartment] = useState('Engineering');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setRole(initialData.role || 'Viewer');
      setDepartment(initialData.department || 'Engineering');
    } else {
      setName('');
      setEmail('');
      setRole('Viewer');
      setDepartment('Engineering');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!name || !email) {
      alert("Please enter a name and email.");
      return;
    }
    
    onConfirm({ name, email, role, department });
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 999
    }}>
      <AnimatePresence>
        <motion.div 
          className="modal-content card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{ width: 500, padding: 32, backgroundColor: 'var(--color-surface)', borderRadius: 24, boxShadow: 'var(--shadow-lg)' }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.025em'}}>
                {initialData ? 'Edit User' : 'Invite User'}
              </h2>
              <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: 4}}>
                {initialData ? 'Update system user details' : 'Provision a new system user'}
              </p>
            </div>
            <button onClick={onClose} style={{color: 'var(--color-text-muted)'}} className="hover:bg-gray-100 p-2 rounded-full"><X size={20}/></button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Full Name *</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera" 
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Email Address *</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com" 
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>System Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Department</label>
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              >
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button className="btn-secondary flex-1" style={{justifyContent: 'center'}} onClick={onClose}>Cancel</button>
            <button 
              className="btn-primary flex-1" 
              style={{justifyContent: 'center', gap: 8}}
              onClick={handleConfirm}
            >
              <UserPlus size={16} /> {initialData ? 'Save Changes' : 'Send Invite'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddUserModal;
