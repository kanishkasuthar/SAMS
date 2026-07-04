import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase } from 'lucide-react';

const AddProjectModal = ({ isOpen, onClose, onConfirm, initialData = null }) => {
  const [name, setName] = useState('');
  const [manager, setManager] = useState('');
  const [health, setHealth] = useState('On Track');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setManager(initialData.manager || '');
      setHealth(initialData.health || 'On Track');
      setProgress(initialData.progress || 0);
    } else {
      setName('');
      setManager('');
      setHealth('On Track');
      setProgress(0);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!name || !manager) {
      alert("Please enter project name and manager.");
      return;
    }
    onConfirm({ name, manager, health, progress: Number(progress) });
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
                {initialData ? 'Edit Project' : 'New Project'}
              </h2>
              <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: 4}}>
                {initialData ? 'Update project details' : 'Create a new cross-departmental project'}
              </p>
            </div>
            <button onClick={onClose} style={{color: 'var(--color-text-muted)'}} className="hover:bg-gray-100 p-2 rounded-full"><X size={20}/></button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Project Name *</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q3 Marketing Launch" 
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Project Manager *</label>
              <input 
                type="text" 
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                placeholder="e.g. Sarah Jenkins" 
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Health Status</label>
              <select 
                value={health}
                onChange={(e) => setHealth(e.target.value)}
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              >
                <option value="On Track">On Track</option>
                <option value="At Risk">At Risk</option>
                <option value="Needs Attention">Needs Attention</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Progress (%)</label>
              <input 
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
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
              <Briefcase size={16} /> {initialData ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddProjectModal;
