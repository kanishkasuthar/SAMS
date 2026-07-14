import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';

const AddEmployeeModal = ({ isOpen, onClose, defaultManagerId }) => {
  const { nodes, addEmployee } = useOrgStore();
  const { addToast } = useUIStore();
  
  const managers = nodes.filter(n => !n.data.isVacant);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    empId: `EMP-${Math.floor(Math.random() * 10000)}`,
    department: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    skills: '',
    managerId: defaultManagerId || (managers.length > 0 ? managers[0].id : '')
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation || !formData.managerId) {
      addToast('Name, Designation, and Manager are required.', 'error');
      return;
    }

    const newEmployeeData = {
      name: formData.name,
      designation: formData.designation,
      empId: formData.empId,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      experience: formData.experience,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      status: 'Online',
      photo: null
    };

    addEmployee(newEmployeeData, formData.managerId);
    addToast(`${formData.name} added successfully!`, 'success');
    onClose();
    
    // Reset form
    setFormData({
      ...formData,
      name: '',
      designation: '',
      empId: `EMP-${Math.floor(Math.random() * 10000)}`,
      email: '',
      phone: '',
      address: '',
      experience: '',
      skills: '',
    });
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <motion.div 
          className="modal-content card"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          style={{ width: 600, padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Add Employee</h2>
            <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}><X size={20} /></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ padding: '32px', maxHeight: '60vh', overflowY: 'auto' }}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Full Name <span className="text-danger">*</span></label>
                  <input className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Jane Doe" required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Employee ID</label>
                  <input className="input-field" value={formData.empId} onChange={e => setFormData({...formData, empId: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Designation <span className="text-danger">*</span></label>
                  <input className="input-field" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} placeholder="Product Designer" required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Department</label>
                  <input className="input-field" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} placeholder="Design" />
                </div>
              </div>

              <div className="mb-4">
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Reporting Manager <span className="text-danger">*</span></label>
                <select className="input-field" value={formData.managerId} onChange={e => setFormData({...formData, managerId: e.target.value})} required>
                  <option value="" disabled>Select Manager</option>
                  {managers.map(m => (
                    <option key={m.id} value={m.id}>{m.data.name} - {m.data.designation}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Email</label>
                  <input type="email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="jane@sams.corp" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Phone</label>
                  <input className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              
              <div className="mb-4">
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Skills (comma separated)</label>
                <input className="input-field" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="Figma, React, Node.js" />
              </div>
            </div>

            <div style={{ padding: '24px 32px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <UserPlus size={18} />
                Add Employee
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddEmployeeModal;
