import React, { useState } from 'react';
import { X, Save, ShieldAlert } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const EditEmployeeModal = ({ isOpen, onClose, employee, onSave }) => {
  const { addToast } = useUIStore();
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    designation: employee?.role || '',
    department: employee?.department || '',
    manager: employee?.managerId || '',
    location: employee?.location || '',
    status: employee?.status || 'Online',
    employmentType: employee?.employmentType || 'Full-time'
  });

  if (!isOpen || !employee) return null;

  const handleSave = async () => {
    if (onSave) {
      await onSave(employee.id, formData);
    } else {
      addToast(`Successfully updated ${formData.name}`, 'success');
    }
    
    if (formData.manager !== employee.managerId) {
      addToast('Hierarchy updated. Journey event created.', 'info');
    }
    
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div 
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />
      
      <div
        style={{
          width: 600, backgroundColor: 'var(--color-bg)', borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden',
          border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)' }}>Edit Employee Profile</h2>
          <button onClick={onClose} style={{ padding: 6, borderRadius: '50%', border: 'none', backgroundColor: 'var(--color-surface-hover)', cursor: 'pointer', display: 'flex' }}>
            <X size={18} color="var(--color-text-secondary)" />
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Designation</label>
              <input 
                type="text" 
                value={formData.designation}
                onChange={e => setFormData({...formData, designation: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Department</label>
              <select 
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none' }}
              >
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="HR & Admin">HR & Admin</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Reporting Manager (ID)</label>
              <input 
                type="text" 
                value={formData.manager}
                onChange={e => setFormData({...formData, manager: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none' }}
                placeholder="e.g. EMP-0001"
              />
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <ShieldAlert size={18} color="var(--color-warning)" style={{ marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 4 }}>Hierarchy Changes Logged</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                Changing the Reporting Manager or Department will automatically create an immutable Audit Log entry and a new Employee Journey event.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
          <button onClick={handleSave} className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
