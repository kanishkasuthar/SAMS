import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2 } from 'lucide-react';

const AddDepartmentModal = ({ isOpen, onClose, onConfirm, initialData = null }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('$1M');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setBudget(initialData.budget || '$1M');
    } else {
      setName('');
      setDescription('');
      setBudget('$1M');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!name) {
      alert("Please enter a department name.");
      return;
    }
    
    onConfirm({ name, description, budget });
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
                {initialData ? 'Edit Department' : 'Add Department'}
              </h2>
              <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: 4}}>
                {initialData ? 'Update business unit details' : 'Create a new business unit'}
              </p>
            </div>
            <button onClick={onClose} style={{color: 'var(--color-text-muted)'}} className="hover:bg-gray-100 p-2 rounded-full"><X size={20}/></button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Department Name *</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Data Science" 
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the responsibilities..." 
                rows={2}
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Annual Budget</label>
              <input 
                type="text" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $2.5M" 
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
              <Building2 size={16} /> {initialData ? 'Save Changes' : 'Create Department'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddDepartmentModal;
