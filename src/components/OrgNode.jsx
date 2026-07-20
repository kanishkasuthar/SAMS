import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoreVertical, Users } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import './OrgNode.css';

const OrgNode = ({ id, data, selected }) => {
  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('orgnode-contextmenu', { 
      detail: { x: e.clientX, y: e.clientY, nodeData: data, nodeId: id } 
    }));
  };

  // Team Variant
  if (data.type === 'department' || data.name.includes('Team')) {
    return (
      <div className={`org-node-team ${selected ? 'selected' : ''}`} onContextMenu={handleContextMenu}>
        <Handle type="target" position={Position.Top} className="node-handle" />
        <Handle type="source" position={Position.Bottom} className="node-handle" />
        
        <div className="team-header-row">
          <div className="team-icon"><Users size={20} /></div>
          <div className="team-details">
            <div className="team-name">{data.name}</div>
            <div className="team-size">{data.teamSize || 10} Members</div>
          </div>
          <MoreVertical size={16} className="node-menu-icon" />
        </div>
        
        <div className="team-members-stack">
          <img src="https://i.pravatar.cc/150?u=1" className="member-avatar-sm" alt="team" />
          <img src="https://i.pravatar.cc/150?u=2" className="member-avatar-sm" alt="team" />
          <img src="https://i.pravatar.cc/150?u=3" className="member-avatar-sm" alt="team" />
          <div className="member-more-badge">+{data.teamSize > 3 ? data.teamSize - 3 : 7}</div>
        </div>
      </div>
    );
  }

  // Individual Node
  const roleType = (data.type === 'executive' || data.type === 'ceo' || data.designation?.toLowerCase().includes('chief')) ? 'Executive' : 'Manager';
  const roleClass = roleType === 'Manager' ? 'manager' : '';

  return (
    <div className={`org-node-premium ${selected ? 'selected' : ''}`} onContextMenu={handleContextMenu}>
      <Handle type="target" position={Position.Top} className="node-handle" />
      <Handle type="source" position={Position.Bottom} className="node-handle" />
      
      <div className="node-layout-row">
        {/* Avatar Left */}
        <div className="node-avatar-col">
          <img src={data.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`} alt={data.name} className="node-avatar" />
          <div className="node-status-dot"></div>
        </div>

        {/* Details Right */}
        <div className="node-details-col">
          <div className="node-name-row">
            <div className="node-name">{data.name}</div>
            <MoreVertical size={14} className="node-menu-icon" />
          </div>
          <div className="node-designation">{data.designation}</div>
          <div className={`node-badge ${roleClass}`}>{roleType}</div>
        </div>
      </div>
    </div>
  );
};

export default OrgNode;
