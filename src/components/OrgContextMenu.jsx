import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit2, ArrowUpRight, ArrowRight, Briefcase, Users, Copy, Archive, Trash2 } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';

const OrgContextMenu = ({ x, y, nodeData, nodeId, onClose, onEditProfile, onPromote, onTransfer }) => {
  const menuRef = useRef(null);
  const { archiveEmployee, duplicateEmployee } = useOrgStore();
  const { addToast } = useUIStore();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!nodeData || !nodeId) return null;

  const handleArchive = () => {
    try {
      archiveEmployee(nodeId);
      addToast(`${nodeData.name} has been archived.`, 'success');
      onClose();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleDuplicate = () => {
    duplicateEmployee(nodeId);
    addToast(`${nodeData.name} duplicated.`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'fixed',
          top: y,
          left: x,
          zIndex: 1000,
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--color-border)',
          width: 220,
          padding: '8px 0',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--color-border)', marginBottom: 4 }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{nodeData.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{nodeData.designation}</div>
        </div>

        <button className="context-menu-item" onClick={() => { onEditProfile(); onClose(); }}>
          <User size={14} /> View Profile
        </button>
        <button className="context-menu-item" onClick={() => { onEditProfile(); onClose(); }}>
          <Edit2 size={14} /> Edit Employee
        </button>
        
        <div className="context-menu-divider"></div>
        
        <button className="context-menu-item" onClick={() => { onPromote(); onClose(); }}>
          <ArrowUpRight size={14} /> Promote
        </button>
        <button className="context-menu-item" onClick={() => { onTransfer(); onClose(); }}>
          <ArrowRight size={14} /> Transfer
        </button>
        <button className="context-menu-item" onClick={onClose}>
          <Briefcase size={14} /> Assign Project
        </button>
        
        <div className="context-menu-divider"></div>
        
        <button className="context-menu-item" onClick={handleDuplicate}>
          <Copy size={14} /> Duplicate
        </button>
        <button className="context-menu-item text-warning" onClick={handleArchive}>
          <Archive size={14} /> Archive Employee
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrgContextMenu;
