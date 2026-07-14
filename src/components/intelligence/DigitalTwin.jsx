import React, { useState } from 'react';
import { Network, Search, ZoomIn, ZoomOut, Maximize, GitMerge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DigitalTwin = ({ departments }) => {
  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState(null);

  const getLineStyle = (sourceNode, targetNode) => {
    const isHighlighted = hoveredNode === sourceNode || hoveredNode === targetNode || hoveredNode === 'root';
    return {
      backgroundColor: isHighlighted ? 'var(--color-primary)' : 'var(--color-border)',
      boxShadow: isHighlighted ? '0 0 8px rgba(79, 70, 229, 0.4)' : 'none',
      transition: 'all 0.3s ease',
      zIndex: isHighlighted ? 5 : 1
    };
  };

  const Node = ({ id, title, type, health, employees, depth }) => {
    const isHovered = hoveredNode === id || hoveredNode === 'root';
    let borderColor = 'var(--color-border)';
    let badgeColor = 'var(--color-text-muted)';
    let badgeBg = 'var(--color-surface-alt)';
    
    if (health === 'Healthy') {
      borderColor = 'var(--color-success)';
      badgeColor = 'var(--color-success)';
      badgeBg = 'rgba(16, 185, 129, 0.1)';
    } else if (health === 'Attention') {
      borderColor = 'var(--color-warning)';
      badgeColor = 'var(--color-warning)';
      badgeBg = 'rgba(245, 158, 11, 0.1)';
    } else if (health === 'Critical') {
      borderColor = 'var(--color-danger)';
      badgeColor = 'var(--color-danger)';
      badgeBg = 'rgba(239, 68, 68, 0.1)';
    }

    return (
      <div 
        className="twin-node"
        onMouseEnter={() => setHoveredNode(id)}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => navigate('/studio')}
        style={{
          padding: '16px 24px',
          backgroundColor: '#FFFFFF',
          border: `2px solid ${isHovered ? 'var(--color-primary)' : borderColor}`,
          borderRadius: '12px',
          boxShadow: isHovered ? '0 10px 25px -5px rgba(15, 23, 42, 0.1)' : '0 1px 3px rgba(15, 23, 42, 0.04)',
          transition: 'all 0.2s ease',
          transform: isHovered ? 'scale(1.02)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          width: '220px',
          zIndex: 10
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', textAlign: 'center' }}>{title}</div>
        
        {type !== 'root' && (
          <div style={{ fontSize: '13px', fontWeight: 600, color: badgeColor, backgroundColor: badgeBg, padding: '4px 12px', borderRadius: '16px' }}>
            {health}
          </div>
        )}
        
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          {type === 'root' ? 'Root Node' : `${employees} Employees`} • Depth {depth}
        </div>
      </div>
    );
  };

  return (
    <div className="card" style={{ 
      padding: '24px', 
      backgroundColor: '#FFFFFF', 
      borderRadius: '16px', 
      border: '1px solid var(--color-border)',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
      width: '100%'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Network size={24} color="var(--color-primary)" /> Organization Digital Twin
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
            Live structural representation of your organization.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="icon-btn" style={{ padding: 8, borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}><Search size={18} /></button>
          <button className="icon-btn" style={{ padding: 8, borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}><ZoomIn size={18} /></button>
          <button className="icon-btn" style={{ padding: 8, borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}><ZoomOut size={18} /></button>
          <button className="icon-btn" style={{ padding: 8, borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}><Maximize size={18} /></button>
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: 8, fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => navigate('/studio')}>
            <GitMerge size={16} /> Open Studio
          </button>
        </div>
      </div>

      <div style={{ 
        minHeight: '420px', 
        backgroundColor: '#F8FAFC', 
        borderRadius: '12px', 
        border: '1px dashed var(--color-border)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 24px',
        overflowX: 'auto'
      }}>
        {/* Board */}
        <Node id="board" title="Board of Directors" type="root" depth="0" />
        
        <div style={{ width: hoveredNode ? 4 : 2, height: 30, ...getLineStyle('board', 'root') }}></div>
        
        {/* CEO */}
        <Node id="root" title="CEO" type="root" depth="1" />
        
        <div style={{ width: hoveredNode ? 4 : 2, height: 40, ...getLineStyle('root', 'all') }}></div>
        <div style={{ width: '600px', height: hoveredNode ? 4 : 2, ...getLineStyle('root', 'all') }}></div>
        
        {/* Level 2 Nodes */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', marginTop: 40, position: 'relative' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div style={{ width: hoveredNode === 'eng' || hoveredNode === 'root' ? 4 : 2, height: 40, position: 'absolute', top: -40, ...getLineStyle('root', 'eng') }}></div>
            <Node id="eng" title="Engineering" type="dept" health="Critical" employees="142" depth="2" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div style={{ width: hoveredNode === 'ops' || hoveredNode === 'root' ? 4 : 2, height: 40, position: 'absolute', top: -40, ...getLineStyle('root', 'ops') }}></div>
            <Node id="ops" title="Operations" type="dept" health="Healthy" employees="86" depth="2" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div style={{ width: hoveredNode === 'fin' || hoveredNode === 'root' ? 4 : 2, height: 40, position: 'absolute', top: -40, ...getLineStyle('root', 'fin') }}></div>
            <Node id="fin" title="Finance" type="dept" health="Attention" employees="45" depth="2" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
