import React, { useState, useCallback, useMemo } from 'react';
import { ReactFlow, Background, Controls, MarkerType, useNodesState, useEdgesState, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Building2, Activity, Shield, Users, Network } from 'lucide-react';

const getHealthColor = (health) => {
  switch (health) {
    case 'critical': return 'var(--color-danger)';
    case 'high': return 'var(--color-warning)';
    case 'medium': return '#FDE047'; // yellow-400
    default: return 'var(--color-success)';
  }
};

const getHealthBg = (health) => {
  switch (health) {
    case 'critical': return 'rgba(239, 68, 68, 0.1)';
    case 'high': return 'rgba(245, 158, 11, 0.1)';
    case 'medium': return 'rgba(253, 224, 71, 0.2)';
    default: return 'rgba(16, 185, 129, 0.1)';
  }
};

// Custom Node Component
const DepartmentNode = ({ data, selected }) => {
  const isFaded = data.isFaded;
  const size = data.size || 100;
  const color = getHealthColor(data.health);
  const bg = getHealthBg(data.health);

  return (
    <div 
      className="hover-lift"
      style={{
        background: 'white',
        border: `3px solid ${color}`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: selected ? `0 0 0 4px white, 0 0 0 8px ${color}` : `0 10px 25px -5px ${bg}`,
        opacity: isFaded ? 0.3 : 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative'
      }}
      onMouseEnter={data.onHover}
      onMouseLeave={data.onLeave}
      onClick={data.onClick}
    >
      <div style={{ backgroundColor: bg, padding: `${size * 0.1}px`, borderRadius: '50%', marginBottom: '4px' }}>
        <Building2 size={size * 0.25} color={color} />
      </div>
      <div style={{ fontWeight: 800, fontSize: `${Math.max(10, size * 0.12)}px`, color: 'var(--color-text-main)', textAlign: 'center', lineHeight: 1.1, padding: '0 8px' }}>
        {data.label}
      </div>
      
      {/* Tooltip on Hover */}
      {!isFaded && data.isHovered && (
        <div style={{
          position: 'absolute',
          top: `calc(100% + 12px)`,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '16px',
          width: '240px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          cursor: 'default'
        }}>
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', marginBottom: '4px' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>{data.label}</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
              {data.health.charAt(0).toUpperCase() + data.health.slice(1)} Load
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Collab Score</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-primary)' }}>{data.metrics.collabScore}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Authority</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)' }}>{data.metrics.authority}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Shared Procs</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)' }}>{data.metrics.sharedProcs}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Resp Load</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: color }}>{data.metrics.load}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const nodeTypes = { department: DepartmentNode };

const initialNodesData = [
  { id: 'exec', label: 'Executive Board', size: 140, health: 'healthy', metrics: { collabScore: '92', authority: '98/100', sharedProcs: 14, load: 35 }, pos: { x: 400, y: 100 } },
  { id: 'finance', label: 'Finance', size: 160, health: 'critical', metrics: { collabScore: '85', authority: '82/100', sharedProcs: 22, load: 95 }, pos: { x: 200, y: 250 } },
  { id: 'eng', label: 'Engineering', size: 130, health: 'high', metrics: { collabScore: '88', authority: '75/100', sharedProcs: 18, load: 82 }, pos: { x: 600, y: 250 } },
  { id: 'sales', label: 'Sales', size: 120, health: 'medium', metrics: { collabScore: '76', authority: '60/100', sharedProcs: 12, load: 65 }, pos: { x: 250, y: 450 } },
  { id: 'hr', label: 'HR & Admin', size: 150, health: 'high', metrics: { collabScore: '91', authority: '65/100', sharedProcs: 19, load: 88 }, pos: { x: 550, y: 450 } }
];

const initialEdgesData = [
  { id: 'e1', source: 'exec', target: 'finance', thickness: 6, animated: true },
  { id: 'e2', source: 'exec', target: 'eng', thickness: 3, animated: false },
  { id: 'e3', source: 'finance', target: 'eng', thickness: 8, animated: true },
  { id: 'e4', source: 'finance', target: 'sales', thickness: 4, animated: false },
  { id: 'e5', source: 'hr', target: 'eng', thickness: 5, animated: true },
  { id: 'e6', source: 'exec', target: 'hr', thickness: 3, animated: false },
  { id: 'e7', source: 'finance', target: 'hr', thickness: 7, animated: true },
];

const ResponsibilityNetworkGraph = ({ onDepartmentClick }) => {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const nodes = useMemo(() => {
    return initialNodesData.map(node => ({
      id: node.id,
      type: 'department',
      position: node.pos,
      data: {
        ...node,
        isFaded: hoveredNodeId && hoveredNodeId !== node.id && !initialEdgesData.some(e => (e.source === node.id && e.target === hoveredNodeId) || (e.target === node.id && e.source === hoveredNodeId)),
        isHovered: hoveredNodeId === node.id,
        onHover: () => setHoveredNodeId(node.id),
        onLeave: () => setHoveredNodeId(null),
        onClick: () => onDepartmentClick && onDepartmentClick(node.id)
      }
    }));
  }, [hoveredNodeId, onDepartmentClick]);

  const edges = useMemo(() => {
    return initialEdgesData.map(edge => {
      const isConnected = hoveredNodeId === edge.source || hoveredNodeId === edge.target;
      const isFaded = hoveredNodeId && !isConnected;
      
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: edge.animated,
        style: {
          strokeWidth: edge.thickness,
          stroke: isConnected ? 'var(--color-primary)' : '#94A3B8',
          opacity: isFaded ? 0.1 : (isConnected ? 1 : 0.4),
          transition: 'all 0.3s'
        }
      };
    });
  }, [hoveredNodeId]);

  return (
    <div className="card" style={{ height: '650px', padding: 0, border: '1px solid var(--color-border)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* Network Summary Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Network size={20} color="var(--color-primary)" /> Responsibility Network
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Visualizing cross-department collaboration and structural health.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Active Connections</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>{initialEdgesData.length} Paths</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Highest Load</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-danger)' }}>Finance (95%)</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Central Hub</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>Executive Board</div>
          </div>
        </div>
      </div>

      {/* Graph Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Lines} color="#e2e8f0" gap={32} size={1} />
          <Controls style={{ display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }} />
        </ReactFlow>
        
        {/* Legend */}
        <div style={{ position: 'absolute', bottom: 24, left: 24, backgroundColor: 'white', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', zIndex: 10 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Department Health</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} /> Healthy</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FDE047' }} /> Medium</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-warning)' }} /> High</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-danger)' }} /> Critical</div>
          </div>
        </div>
      </div>

      <style>{`
        .react-flow__edge-path {
          transition: stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ResponsibilityNetworkGraph;
