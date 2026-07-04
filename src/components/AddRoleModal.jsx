import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';

const AddRoleModal = ({ isOpen, onClose, onConfirm, initialData = null }) => {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('Standard');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setLevel(initialData.level || 'Standard');
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setLevel('Standard');
      setDescription('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!title) {
      alert("Please enter a role title.");
      return;
    }
    onConfirm({ title, level, description });
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
                {initialData ? 'Edit Role' : 'Create Role'}
              </h2>
              <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: 4}}>
                {initialData ? 'Update RBAC permissions template' : 'Define a new RBAC permissions template'}
              </p>
            </div>
            <button onClick={onClose} style={{color: 'var(--color-text-muted)'}} className="hover:bg-gray-100 p-2 rounded-full"><X size={20}/></button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Role Title *</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Content Editor" 
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Access Level</label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Standard">Standard</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the capabilities of this role..." 
                rows={3}
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button className="btn-secondary flex-1" style={{justifyContent: 'center'}} onClick={onClose}>Cancel</button>
            <button 
              className="btn-primary flex-1" 
              style={{justifyContent: 'center', gap: 8}}
              onClick={handleConfirm}
            >
              <Shield size={16} /> {initialData ? 'Save Changes' : 'Create Role'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddRoleModal;
