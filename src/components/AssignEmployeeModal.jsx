import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';

const AssignEmployeeModal = ({ isOpen, onClose, onConfirm, positionName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Engineering');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!name || !email) {
      alert("Please enter all required fields.");
      return;
    }
    onConfirm({ name, email, department });
    setName('');
    setEmail('');
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
              <h2 style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.025em'}}>Assign Employee</h2>
              <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: 4}}>
                Filling vacant position: <strong style={{color: 'var(--color-primary)'}}>{positionName}</strong>
              </p>
            </div>
            <button onClick={onClose} style={{color: 'var(--color-text-muted)'}} className="hover:bg-gray-100 p-2 rounded-full"><X size={20}/></button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Employee Name *</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe" 
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Email Address *</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@company.com" 
                style={{width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)'}}
              />
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
                <option value="HR & Admin">HR & Admin</option>
                <option value="Executive">Executive</option>
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
              <UserPlus size={16} /> Confirm Assignment
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AssignEmployeeModal;
