import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import Drawer from './common/Drawer';

const DepartmentDrawer = ({ isOpen, onClose, onConfirm, initialData = null, loading = false }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    if (initialData) {
      setDepartmentName(initialData.departmentName || '');
      setDescription(initialData.description || '');
      setBudget(initialData.budget || 0);
    } else {
      setDepartmentName('');
      setDescription('');
      setBudget(0);
    }
  }, [initialData, isOpen]);

  const handleConfirm = () => {
    if (!departmentName) {
      alert("Please enter a department name.");
      return;
    }
    
    onConfirm({ departmentName, description, budget: parseFloat(budget) || 0 });
  };

  return (
    <>
      <style>{`
        @keyframes drawer-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
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
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="e.g. Data Science" 
              style={{width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Annual Budget ($)</label>
            <input 
              type="number" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 2500000" 
              style={{width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 mt-8">
            <button 
              className="btn-secondary flex-1" 
              style={{justifyContent: 'center'}} 
              onClick={onClose} 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              className="btn-primary flex-1" 
              style={{justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'drawer-spin 0.8s linear infinite' }} />
              ) : (
                <Building2 size={16} />
              )}
              {loading ? (initialData ? 'Saving...' : 'Creating...') : (initialData ? 'Save Changes' : 'Create Department')}
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DepartmentDrawer;
