import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import Drawer from './common/Drawer';

const ProjectDrawer = ({ isOpen, onClose, onConfirm, initialData = null }) => {
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

  const handleConfirm = () => {
    if (!name || !manager) {
      alert("Please enter project name and manager.");
      return;
    }
    onConfirm({ name, manager, health, progress: Number(progress) });
  };

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'Edit Project' : 'New Project'}
      width={500}
    >
      <div className="flex flex-col gap-6 pt-4">
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: -16, marginBottom: 8}}>
          {initialData ? 'Update project details and metrics.' : 'Create a new cross-departmental project.'}
        </p>

        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Project Name *</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Q3 Marketing Launch" 
            style={{width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Project Manager *</label>
          <input 
            type="text" 
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            placeholder="e.g. Sarah Jenkins" 
            style={{width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Health Status</label>
          <select 
            value={health}
            onChange={(e) => setHealth(e.target.value)}
            style={{width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
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
            <Briefcase size={16} /> {initialData ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default ProjectDrawer;
