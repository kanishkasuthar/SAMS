import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, UserCheck } from 'lucide-react';

const PositionChangeModal = ({ isOpen, onClose, employeeNode, newManagerNode, onConfirm }) => {
  const [reason, setReason] = useState('Promotion');
  const [comments, setComments] = useState('');

  if (!isOpen || !employeeNode || !newManagerNode) return null;

  const handleConfirm = () => {
    onConfirm(reason, comments);
    setReason('Promotion');
    setComments('');
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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Position Change Detected</h2>
            <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}><X size={20} /></button>
          </div>
          
          <div style={{ padding: '32px' }}>
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                {employeeNode.data.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>{employeeNode.data.name}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Employee ID: {employeeNode.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 mb-8 items-center bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 8 }}>Current Position</div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{employeeNode.data.designation}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4 }}>{employeeNode.data.department}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4 }}>Reports to: Current Manager</div>
              </div>
              
              <div style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)' }}>
                <ArrowRight size={20} />
              </div>
              
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 8 }}>New Position</div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{newManagerNode.data.designation.includes('Manager') ? 'Director' : 'Manager'}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4 }}>{newManagerNode.data.department}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4 }}>Reports to: {newManagerNode.data.name}</div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 8 }}>Reason for Change <span style={{color: 'var(--color-danger)'}}>*</span></label>
              <select 
                value={reason} 
                onChange={e => setReason(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
              >
                <option value="Promotion">Promotion</option>
                <option value="Transfer">Transfer</option>
                <option value="Department Change">Department Change</option>
                <option value="Organizational Restructure">Organizational Restructure</option>
                <option value="Temporary Assignment">Temporary Assignment</option>
                <option value="Manual Adjustment">Manual Adjustment</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 8 }}>Comments</label>
              <textarea 
                value={comments}
                onChange={e => setComments(e.target.value)}
                placeholder="Optional notes for the audit log..."
                rows={3}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', resize: 'none' }}
              ></textarea>
            </div>
          </div>

          <div style={{ padding: '24px 32px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 'var(--radius-sm)', fontWeight: 600, color: 'var(--color-text-main)' }}>Cancel</button>
            <button 
              onClick={handleConfirm}
              style={{ padding: '10px 20px', borderRadius: 'var(--radius-sm)', fontWeight: 600, backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <UserCheck size={18} />
              Confirm Update
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PositionChangeModal;
