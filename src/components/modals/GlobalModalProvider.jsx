import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useOrgStore } from '../../store/orgStore';
import { X, AlertTriangle, Check, Save } from 'lucide-react';

const GlobalModalProvider = () => {
  const { activeModal, closeModal, addToast } = useUIStore();
  const { deleteProject, addProject, updateProject, deleteDepartment, updateDepartment, archiveEmployee } = useOrgStore();

  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (activeModal?.data) {
      setFormData(activeModal.data);
    } else {
      setFormData({});
    }
  }, [activeModal]);

  if (!activeModal) return null;

  const handleClose = () => {
    setFormData({});
    closeModal();
  };

  const handleConfirmDelete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const { itemType, itemId, itemName } = activeModal.data;
      if (itemType === 'project') deleteProject(itemId);
      if (itemType === 'department') deleteDepartment(itemId);
      if (itemType === 'employee') archiveEmployee(itemId);
      
      addToast(`${itemName || 'Item'} deleted successfully.`, "success");
      setIsSubmitting(false);
      handleClose();
    }, 500); // Simulate network
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      if (activeModal.type === 'CREATE_PROJECT') {
        const newProjectData = {
          ...formData,
          status: formData.status || 'Active',
          departments: formData.departments || ['Cross-Functional'],
          team: formData.team || 1,
          health: 'Excellent',
          startDate: new Date().toISOString().split('T')[0]
        };
        addProject(newProjectData);
        addToast("Project created successfully.", "success");
      } else {
        updateProject(formData.id, formData);
        addToast("Project updated successfully.", "success");
      }
      setIsSubmitting(false);
      handleClose();
    }, 500);
  };

  // -----------------------------------------------------
  // Modal Renderers
  // -----------------------------------------------------

  const renderConfirmDelete = () => (
    <div style={{ maxWidth: 400, width: '100%', backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-danger)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <AlertTriangle size={24} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 800 }}>Confirm Deletion</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            Are you sure you want to delete <strong>{activeModal.data?.itemName}</strong>? This action cannot be undone and will be recorded in the audit logs.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button onClick={handleClose} disabled={isSubmitting} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
        <button onClick={handleConfirmDelete} disabled={isSubmitting} style={{ padding: '8px 16px', backgroundColor: 'var(--color-danger)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
          {isSubmitting ? 'Deleting...' : 'Yes, Delete'}
        </button>
      </div>
    </div>
  );

  const renderProjectForm = () => (
    <div style={{ maxWidth: 500, width: '100%', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>{activeModal.type === 'CREATE_PROJECT' ? 'Create Project' : 'Edit Project'}</h3>
        <button onClick={handleClose} className="icon-btn hover:bg-slate-100" style={{ padding: '4px', borderRadius: '50%', border: 'none' }}><X size={20} /></button>
      </div>
      <form onSubmit={handleSaveProject} style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Project Name</label>
          <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Budget ($)</label>
          <input required type="number" value={formData.budget || ''} onChange={e => setFormData({...formData, budget: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Status</label>
          <select value={formData.status || 'Active'} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'white' }}>
            <option>Active</option>
            <option>At Risk</option>
            <option>Delayed</option>
            <option>Completed</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button type="button" onClick={handleClose} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
          <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none' }}>
            <Save size={16} /> {isSubmitting ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'
    }}>
      {activeModal.type === 'CONFIRM_DELETE' && renderConfirmDelete()}
      {(activeModal.type === 'CREATE_PROJECT' || activeModal.type === 'EDIT_PROJECT') && renderProjectForm()}
      {/* Additional modals (Share, Edit Dept, etc.) can be added here following the same pattern */}
    </div>
  );
};

export default GlobalModalProvider;
