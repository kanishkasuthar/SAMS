import React, { useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useOrgStore } from '../store/orgStore';
import MiniOrgNode from './MiniOrgNode';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const nodeTypes = { orgNode: MiniOrgNode };

const MiniHierarchyCanvas = ({ onNodeClick, isMaximized, onMaximizeToggle }) => {
  const { nodes: storeNodes, edges: storeEdges, versions } = useOrgStore();
  const navigate = useNavigate();

  const { initialNodes, initialEdges } = useMemo(() => {
    const ceo = storeNodes.find(n => n.data.type === 'ceo');
    if (!ceo) return { initialNodes: [], initialEdges: [] };

    const executivesEdges = storeEdges.filter(e => e.source === ceo.id);
    const executives = storeNodes.filter(n => executivesEdges.some(e => e.target === n.id));

    const miniNodes = [];
    const miniEdges = [];

    // Add CEO
    miniNodes.push({
      id: ceo.id,
      type: 'orgNode',
      position: { x: 300, y: 50 },
      data: { ...ceo.data }
    });

    // Add Executives and their Department Summaries
    const spacing = 320;
    const startX = 300 - ((executives.length - 1) * spacing) / 2;

    executives.forEach((exec, idx) => {
      const execX = startX + (idx * spacing);
      
      // Executive Node
      miniNodes.push({
        id: exec.id,
        type: 'orgNode',
        position: { x: execX, y: 220 },
        data: { ...exec.data }
      });

      miniEdges.push({
        id: `e${ceo.id}-${exec.id}`,
        source: ceo.id,
        target: exec.id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#A5B4FC', strokeWidth: 2 }
      });

      // Department Summary Node
      const summaryId = `summary-${exec.id}`;
      miniNodes.push({
        id: summaryId,
        type: 'orgNode',
        position: { x: execX, y: 390 },
        data: {
          isSummary: true,
          department: `${exec.data.department} Team`,
          count: exec.data.teamSize || 0
        }
      });

      miniEdges.push({
        id: `e${exec.id}-${summaryId}`,
        source: exec.id,
        target: summaryId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#A5B4FC', strokeWidth: 2, strokeDasharray: '5, 5' }
      });
    });

    return { initialNodes: miniNodes, initialEdges: miniEdges };
  }, [storeNodes, storeEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync when store updates
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const handleNodeClick = useCallback((event, node) => {
    if (node.data.isSummary) {
      navigate('/studio', { state: { focusDepartment: node.data.department } });
    } else {
      onNodeClick(storeNodes.find(n => n.id === node.id));
    }
  }, [navigate, onNodeClick, storeNodes]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'var(--color-surface)', borderRadius: 16 }}>
      {/* Header Status Strip */}
      <div style={{ position: 'absolute', top: 16, left: 24, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: 20 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-success)', boxShadow: '0 0 0 2px rgba(16,185,129,0.2)' }}></div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)', letterSpacing: '0.05em' }}>LIVE STRUCTURE</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          Version {versions[0]?.id || 'v1.0'} • Last updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 16, right: 24, zIndex: 10, display: 'flex', gap: 12 }}>
        {onMaximizeToggle && (
          <button 
            onClick={onMaximizeToggle}
            className="btn-secondary" 
            style={{ padding: '6px', borderRadius: 8, backgroundColor: 'var(--color-bg)' }}
            title={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? <ZoomOut size={16} /> : <Maximize size={16} />}
          </button>
        )}
        <button 
          onClick={() => navigate('/studio')}
          className="btn-secondary" 
          style={{ fontSize: '0.8rem', padding: '6px 16px', borderRadius: 20, backgroundColor: 'var(--color-bg)' }}
        >
          Open Organization Studio →
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onPaneClick={onMaximizeToggle}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.5}
        maxZoom={1.5}
        elementsSelectable={true}
        nodesDraggable={false}
        panOnScroll={true}
        zoomOnScroll={false}
        preventScrolling={false}
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <Background 
          color="rgba(79, 70, 229, 0.06)" 
          gap={20} 
          size={2} 
          variant="dots" 
        />
        <Controls 
          showInteractive={false} 
          position="bottom-left"
          style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, boxShadow: 'none' }}
        >
        </Controls>
      </ReactFlow>
    </div>
  );
};

const MiniHierarchy = ({ onNodeClick, isMaximized, onMaximizeToggle }) => {
  return (
    <ReactFlowProvider>
      <MiniHierarchyCanvas 
        onNodeClick={onNodeClick} 
        isMaximized={isMaximized} 
        onMaximizeToggle={onMaximizeToggle} 
      />
    </ReactFlowProvider>
  );
};

export default MiniHierarchy;
