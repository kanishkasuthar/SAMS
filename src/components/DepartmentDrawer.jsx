import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import Drawer from './common/Drawer';

const DepartmentDrawer = ({ isOpen, onClose, onConfirm, initialData = null }) => {
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

  const handleConfirm = () => {
    if (!name) {
      alert("Please enter a department name.");
      return;
    }
    
    onConfirm({ name, description, budget });
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Department' : 'Add Department'}
      width={450}
    >
      <div className="flex flex-col gap-6 pt-4">
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: -16, marginBottom: 8}}>
          {initialData ? 'Update business unit details.' : 'Create a new business unit.'}
        </p>

        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Department Name *</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Data Science" 
            style={{width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe the responsibilities..." 
            rows={4}
            style={{width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', resize: 'vertical'}}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Annual Budget</label>
          <input 
            type="text" 
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g. $2.5M" 
            style={{width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
          />
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
      </div>
    </Drawer>
  );
};

export default DepartmentDrawer;
