import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoreVertical, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import './OrgNode.css';

const OrgNode = ({ id, data, selected }) => {
  const toggleNode = useOrgStore(state => state.toggleNode);

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('orgnode-contextmenu', { 
      detail: { x: e.clientX, y: e.clientY, nodeData: data, nodeId: id } 
    }));
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    toggleNode(id);
  };

  // Resolve role tag colors
  const roleLower = data.designation?.toLowerCase() || '';
  const isCeo = roleLower.includes('ceo') || roleLower.includes('chief executive');
  const isExecutive = roleLower.includes('cfo') || roleLower.includes('cto') || roleLower.includes('coo') || roleLower.includes('cmo') || roleLower.includes('president') || roleLower.includes('chief');
  const isManager = roleLower.includes('manager') || roleLower.includes('director') || roleLower.includes('head');
  
  let roleBadgeText = 'Employee';
  let roleBadgeClass = 'employee';
  if (isCeo) {
    roleBadgeText = 'CEO';
    roleBadgeClass = 'ceo';
  } else if (isExecutive) {
    roleBadgeText = 'Executive';
    roleBadgeClass = 'executive';
  } else if (isManager) {
    roleBadgeText = 'Manager';
    roleBadgeClass = 'manager';
  }

  // Active status color
  const statusColor = data.status === 'Inactive' ? '#94A3B8' : '#10B981';

  return (
    <div 
      className={`org-node-premium ${selected ? 'selected' : ''}`} 
      onContextMenu={handleContextMenu}
    >
      {/* React Flow Handles - Perfectly Centered */}
      <Handle type="target" position={Position.Top} className="node-handle-top" />
      <Handle type="source" position={Position.Bottom} className="node-handle-bottom" />
      
      <div className="node-content-body">
        {/* Left Col: Avatar & Status Dot */}
        <div className="node-avatar-wrapper">
          <img 
            src={data.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`} 
            alt={data.name} 
            className="node-avatar-image" 
          />
          <span className="node-status-badge" style={{ backgroundColor: statusColor }} />
        </div>

        {/* Right Col: Details */}
        <div className="node-details-wrapper">
          <div className="node-title-row">
            <h3 className="node-name-text" title={data.name}>{data.name}</h3>
            <button 
              className="node-action-menu-btn" 
              onClick={(e) => { e.stopPropagation(); handleContextMenu(e); }}
            >
              <MoreVertical size={14} />
            </button>
          </div>

          <p className="node-desig-text" title={data.designation}>{data.designation}</p>
          
          <div className="node-badge-row">
            <span className="node-department-label">{data.department || 'General'}</span>
            <span className={`node-role-pill ${roleBadgeClass}`}>{roleBadgeText}</span>
          </div>
        </div>
      </div>

      {/* Expand / Collapse Circular Trigger Pill */}
      {data.hasChildren && (
        <button 
          className={`node-expand-collapse-pill ${data.isExpanded ? 'expanded' : 'collapsed'}`} 
          onClick={handleExpandClick}
          title={data.isExpanded ? 'Collapse team reports' : 'Expand team reports'}
        >
          <span className="direct-reports-count">{data.directReportsCount || ''}</span>
          {data.isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      )}
    </div>
  );
};

export default OrgNode;
