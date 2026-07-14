import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoreVertical, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useOrgStore } from '../store/orgStore';
import './OrgNode.css';

const statusColors = {
  'Online': '#10B981',
  'Offline': '#94A3B8',
  'Busy': '#EF4444',
  'In a Meeting': '#F59E0B',
  'Do Not Disturb': '#EF4444'
};

const OrgNode = ({ id, data, selected }) => {
  const updateEmployee = useOrgStore(state => state.updateEmployee);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(data.name);
  const nameInputRef = useRef(null);

  const [isEditingDesig, setIsEditingDesig] = useState(false);
  const [editDesig, setEditDesig] = useState(data.designation);
  const desigInputRef = useRef(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) nameInputRef.current.focus();
  }, [isEditingName]);

  useEffect(() => {
    if (isEditingDesig && desigInputRef.current) desigInputRef.current.focus();
  }, [isEditingDesig]);

  const handleNameSave = () => {
    setIsEditingName(false);
    if (editName !== data.name) updateEmployee(id, { name: editName });
  };

  const handleDesigSave = () => {
    setIsEditingDesig(false);
    if (editDesig !== data.designation) updateEmployee(id, { designation: editDesig });
  };

  const handleKeyDown = (e, saveFn) => {
    if (e.key === 'Enter') saveFn();
    if (e.key === 'Escape') {
      setIsEditingName(false);
      setIsEditingDesig(false);
      setEditName(data.name);
      setEditDesig(data.designation);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('orgnode-contextmenu', { 
      detail: { x: e.clientX, y: e.clientY, nodeData: data, nodeId: id } 
    }));
  };
  
  const statusColor = statusColors[data.status] || '#10B981';

  // Team Variant (Departments)
  if (data.type === 'department' || data.name.includes('Team')) {
    return (
      <motion.div 
        layout
        whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
        className={`org-node team-node ${selected ? 'selected' : ''}`} 
        onContextMenu={handleContextMenu}
      >
        <Handle type="target" position={Position.Top} className="node-handle" />
        <Handle type="source" position={Position.Bottom} className="node-handle" />
        
        <div className="team-header">
          <div className="team-icon"><Users size={18} /></div>
          <div className="team-info">
            <div className="team-name">{data.name}</div>
            <div className="team-size">{data.teamSize || 10} Members</div>
          </div>
        </div>
        
        <div className="team-members">
          <div className="member-avatar" style={{backgroundColor: '#4F46E5'}}>J</div>
          <div className="member-avatar" style={{backgroundColor: '#10B981'}}>S</div>
          <div className="member-avatar" style={{backgroundColor: '#F59E0B'}}>M</div>
          <div className="member-more">+{data.teamSize > 3 ? data.teamSize - 3 : 2}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
      className={`org-node ${selected ? 'selected' : ''} ${data.isVacant ? 'vacant' : ''}`} 
      onContextMenu={handleContextMenu}
    >
      <Handle type="target" position={Position.Top} className="node-handle" />
      <Handle type="source" position={Position.Bottom} className="node-handle" />
      
      <div className="node-content">
        <div className="node-avatar-wrapper">
          {data.photo && !data.isVacant ? (
            <img src={data.photo} alt={data.name} className="node-avatar-img" />
          ) : (
            <div className="node-avatar-initials">
              {data.isVacant ? '?' : data.name.charAt(0)}
            </div>
          )}
          {!data.isVacant && (
            <div className="status-indicator" style={{ backgroundColor: statusColor }}></div>
          )}
        </div>
        
        <div className="node-details">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {isEditingName ? (
                <input 
                  ref={nameInputRef}
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyDown={e => handleKeyDown(e, handleNameSave)}
                  className="nodrag nopan inline-edit-input"
                />
              ) : (
                <div className="node-title-name" onDoubleClick={() => { if (!data.isVacant) setIsEditingName(true); }}>
                  {data.name}
                </div>
              )}
            </div>
            
            {!data.isVacant && (
              <button className="menu-trigger-btn" onClick={handleContextMenu}>
                <MoreVertical size={14} />
              </button>
            )}
          </div>
          
          {isEditingDesig ? (
            <input 
              ref={desigInputRef}
              value={editDesig}
              onChange={e => setEditDesig(e.target.value)}
              onBlur={handleDesigSave}
              onKeyDown={e => handleKeyDown(e, handleDesigSave)}
              className="nodrag nopan inline-edit-input inline-edit-desig"
            />
          ) : (
            <div className="node-title-desig" onDoubleClick={() => { if (!data.isVacant) setIsEditingDesig(true); }}>
              {data.designation}
            </div>
          )}
          
          <div className="node-badge-wrapper">
            <span className="node-role-badge">
              {data.type === 'executive' || data.type === 'ceo' ? 'Executive' : 'Manager'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrgNode;
