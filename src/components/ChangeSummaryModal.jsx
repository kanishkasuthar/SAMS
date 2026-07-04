import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, History, ArrowRight } from 'lucide-react';

const ChangeSummaryModal = ({ isOpen, onClose, summaryData }) => {
  if (!isOpen || !summaryData) return null;

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
          style={{ width: 500, padding: 0, overflow: 'hidden', textAlign: 'center' }}
        >
          <div style={{ padding: '32px 32px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <CheckCircle2 size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Organization Updated</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>{summaryData.employeeName} has been successfully updated.</p>
          </div>
          
          <div style={{ padding: '0 32px 32px 32px' }}>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-left">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Type</span>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{summaryData.reason}</span>
              </div>
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Position</span>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{summaryData.oldPosition}</span>
                  <ArrowRight size={14} color="var(--color-text-muted)" />
                  <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.newPosition}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Manager</span>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{summaryData.oldManager}</span>
                  <ArrowRight size={14} color="var(--color-text-muted)" />
                  <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.newManager}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              <History size={16} />
              <span>Version <strong>{summaryData.version}</strong> Created & History Recorded</span>
            </div>
          </div>

          <div style={{ padding: '24px 32px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
            <button 
              onClick={onClose}
              style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', fontWeight: 600, backgroundColor: 'var(--color-primary)', color: 'white' }}
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChangeSummaryModal;
