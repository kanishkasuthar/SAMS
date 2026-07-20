import React, { useCallback } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAnalytics } from '../../contexts/AnalyticsContext';

// Custom Node Component
const GlowingDepartmentNode = ({ data }) => {
  const { setActiveItem } = useAnalytics();

  // Size logic: base 80px + scale
  const size = 80 + (data.employees / 10);
  
  // Color logic
  let color = 'var(--color-primary)';
  let shadow = 'rgba(99, 102, 241, 0.4)';
  if (data.health < 60) {
    color = 'var(--color-danger)';
    shadow = 'rgba(239, 68, 68, 0.4)';
  } else if (data.health < 80) {
    color = 'var(--color-warning)';
    shadow = 'rgba(245, 158, 11, 0.4)';
  } else if (data.health > 90) {
    color = 'var(--color-success)';
    shadow = 'rgba(16, 185, 129, 0.4)';
  }

  return (
    <div 
      onClick={() => setActiveItem({ type: 'department', data })}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'var(--color-surface)',
        border: `3px solid ${color}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 24px ${shadow}`,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = `0 0 48px ${shadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = `0 0 24px ${shadow}`;
      }}
    >
      <div style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: color, color: 'white', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px' }}>
        {data.health}%
      </div>
      <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-main)', textAlign: 'center', lineHeight: 1.1 }}>{data.label}</div>
      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{data.employees} Emp</div>
    </div>
  );
};

const nodeTypes = {
  glowingDept: GlowingDepartmentNode,
};

const initialNodes = [
  { id: 'exec', type: 'glowingDept', position: { x: 400, y: 50 }, data: { label: 'Executive', employees: 12, health: 98 } },
  { id: 'eng', type: 'glowingDept', position: { x: 150, y: 250 }, data: { label: 'Engineering', employees: 450, health: 75 } },
  { id: 'prod', type: 'glowingDept', position: { x: 300, y: 400 }, data: { label: 'Product', employees: 85, health: 55 } }, // Critical
  { id: 'sales', type: 'glowingDept', position: { x: 650, y: 250 }, data: { label: 'Sales', employees: 320, health: 92 } },
  { id: 'ops', type: 'glowingDept', position: { x: 500, y: 450 }, data: { label: 'Operations', employees: 210, health: 85 } },
  { id: 'hr', type: 'glowingDept', position: { x: 100, y: 450 }, data: { label: 'HR', employees: 45, health: 88 } },
  { id: 'fin', type: 'glowingDept', position: { x: 750, y: 450 }, data: { label: 'Finance', employees: 60, health: 95 } },
];

const initialEdges = [
  { id: 'e1', source: 'exec', target: 'eng', animated: true, style: { stroke: 'var(--color-primary)', strokeWidth: 2 } },
  { id: 'e2', source: 'exec', target: 'sales', animated: true, style: { stroke: 'var(--color-primary)', strokeWidth: 2 } },
  { id: 'e3', source: 'eng', target: 'prod', animated: true, style: { stroke: 'var(--color-warning)', strokeWidth: 3 } },
  { id: 'e4', source: 'sales', target: 'ops', animated: true, style: { stroke: 'var(--color-primary)', strokeWidth: 2 } },
  { id: 'e5', source: 'exec', target: 'hr', animated: true, style: { stroke: 'var(--color-text-muted)', strokeWidth: 1 } },
  { id: 'e6', source: 'exec', target: 'fin', animated: true, style: { stroke: 'var(--color-text-muted)', strokeWidth: 1 } },
  { id: 'e7', source: 'ops', target: 'fin', animated: true, style: { stroke: 'var(--color-primary)', strokeWidth: 2 } },
  { id: 'e8', source: 'eng', target: 'ops', animated: true, style: { stroke: 'var(--color-danger)', strokeWidth: 4 } }, // Heavy collaboration bottleneck
];

const LiveOrganizationMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '24px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)', zIndex: 10 }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Live Organization Map</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Interactive view of departmental health, size, and collaboration bottlenecks.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-success)' }}/> <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Healthy</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-warning)' }}/> <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Warning</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-danger)' }}/> <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Critical</span></div>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', backgroundColor: 'var(--color-bg)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#ccc" gap={16} />
          <Controls />
        </ReactFlow>

        {/* Overlay pulse indicator */}
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)' }} className="pulse-anim" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>Live Collaboration Sync</span>
        </div>
      </div>
    </div>
  );
};

export default LiveOrganizationMap;
