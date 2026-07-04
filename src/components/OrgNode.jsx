import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoreHorizontal, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import './OrgNode.css';

const nodeColors = {
  ceo: { bg: '#F1F5F9', border: '#4F46E5', accent: '#4F46E5' },
  executive: { bg: '#F8FAFC', border: '#0EA5E9', accent: '#0EA5E9' },
  department: { bg: '#F8FAFC', border: '#14B8A6', accent: '#14B8A6' },
  manager: { bg: '#F8FAFC', border: '#F59E0B', accent: '#F59E0B' },
  employee: { bg: '#FFFFFF', border: '#E2E8F0', accent: '#94A3B8' },
};

const OrgNode = ({ data, selected }) => {
  const type = data.type || 'employee';
  const colors = nodeColors[type] || nodeColors.employee;
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`org-node ${selected ? 'selected' : ''} ${data.isVacant ? 'vacant' : ''}`} 
      style={{ 
        borderColor: selected ? colors.accent : colors.border, 
        backgroundColor: data.isVacant ? 'rgba(248, 250, 252, 0.6)' : colors.bg,
        borderStyle: data.isVacant ? 'dashed' : 'solid'
      }}
    >
      <Handle type="target" position={Position.Top} className="node-handle" />
      
      {/* Node Accent Bar */}
      <div className="node-accent-bar" style={{ backgroundColor: data.isVacant ? '#CBD5E1' : colors.accent }}></div>
      
      <div className="node-header">
        <div className="node-avatar-container">
          {data.photo && !data.isVacant ? (
            <img src={data.photo} alt={data.name} className="node-avatar" />
          ) : (
            <div className="node-avatar-placeholder" style={{
              backgroundColor: data.isVacant ? '#F1F5F9' : colors.accent,
              color: data.isVacant ? '#94A3B8' : 'white',
              border: data.isVacant ? '1px dashed #CBD5E1' : '2px solid white'
            }}>
              {data.isVacant ? '?' : data.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="node-info">
          <div className="node-name" style={{ color: data.isVacant ? 'var(--color-text-muted)' : 'var(--color-text-main)', fontStyle: data.isVacant ? 'italic' : 'normal' }}>
            {data.name}
          </div>
          <div className="node-designation">{data.designation}</div>
        </div>
        {!data.isVacant && (
          <button className="node-menu-btn">
            <MoreHorizontal size={16} />
          </button>
        )}
      </div>

      <div className="node-body">
        {data.isVacant ? (
           <div className="meta-badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#D97706', width: '100%', justifyContent: 'center' }}>
             Vacant Position - Needs Assignment
           </div>
        ) : (
          <>
            <div className="node-meta">
              <div className="meta-badge department-badge">
                <Briefcase size={12} />
                <span>{data.department}</span>
              </div>
              {data.teamSize > 0 && (
                <div className="meta-badge team-badge">
                  <Users size={12} />
                  <span>{data.teamSize} reports</span>
                </div>
              )}
            </div>
            {data.project && (
              <div className="project-badge">
                <span className="project-dot"></span>
                {data.project}
              </div>
            )}
          </>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </motion.div>
  );
};

export default OrgNode;
