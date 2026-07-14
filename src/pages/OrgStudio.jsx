import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background,
  MiniMap,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  MousePointer2, 
  Hand, 
  Plus, 
  Minus, 
  Maximize, 
  Search, 
  X,
  Share,
  MoreHorizontal,
  SkipBack,
  SkipForward
} from 'lucide-react';
import OrgNode from '../components/OrgNode';
import PositionChangeModal from '../components/PositionChangeModal';
import ChangeSummaryModal from '../components/ChangeSummaryModal';
import AssignEmployeeModal from '../components/AssignEmployeeModal';
import AddEmployeeModal from '../components/AddEmployeeModal';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import './OrgStudio.css';

import OrgStudioBottomBar from '../components/OrgStudioBottomBar';
import EmployeeProfilePanel from '../components/EmployeeProfilePanel';
import OrgContextMenu from '../components/OrgContextMenu';

const OrgStudio = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, moveEmployee, versions, undo, redo, pastStates, futureStates } = useOrgStore();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanMode, setIsPanMode] = useState(false);
  const [isConnectMode, setIsConnectMode] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Modals state
  const [draggedNode, setDraggedNode] = useState(null);
  const [targetManager, setTargetManager] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  
  const [summaryData, setSummaryData] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Timeline state
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(100);
  
  const nodeTypes = useMemo(() => ({ orgNode: OrgNode }), []);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setContextMenu(null);
  };

  const closePanel = () => {
    setSelectedNode(null);
  };

  const handleAssignConfirm = (employeeData) => {
    useOrgStore.getState().fillPosition(selectedNode.id, employeeData);
    setShowAssignModal(false);
    setSelectedNode(null);
    addToast(`${employeeData.name} has been assigned to the position.`, 'success');
  };

  const onNodeDragStop = useCallback((event, node) => {
    // Basic collision detection to find if dropped on another node
    const target = nodes.find(n => 
      n.id !== node.id && 
      !n.data.isVacant &&
      Math.abs(n.position.x - node.position.x) < 150 && 
      Math.abs(n.position.y - node.position.y) < 100
    );

    if (target) {
      setDraggedNode(node);
      setTargetManager(target);
      setShowChangeModal(true);
    }
  }, [nodes]);

  const handleConfirmChange = (reason, comments) => {
    try {
      const oldManagerEdge = edges.find(e => e.target === draggedNode.id);
      const oldManager = oldManagerEdge ? nodes.find(n => n.id === oldManagerEdge.source) : null;
      
      moveEmployee(draggedNode.id, targetManager.id, reason, comments);
      setShowChangeModal(false);
      
      setSummaryData({
        employeeName: draggedNode.data.name,
        reason,
        oldPosition: draggedNode.data.designation,
        newPosition: targetManager.data.designation.includes('Manager') ? 'Director' : 'Manager',
        oldManager: oldManager ? oldManager.data.name : 'None',
        newManager: targetManager.data.name,
        version: `v3.2.${versions.length + 1}`
      });
      setShowSummaryModal(true);
      
    } catch (error) {
      alert(error.message); // Will catch circular reporting errors
      setShowChangeModal(false);
    }
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      setContextMenu(e.detail);
    };
    
    window.addEventListener('orgnode-contextmenu', handleContextMenu);
    return () => window.removeEventListener('orgnode-contextmenu', handleContextMenu);
  }, []);

  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { addToast } = useUIStore();

  const handleZoomIn = () => zoomIn({ duration: 300 });
  const handleZoomOut = () => zoomOut({ duration: 300 });
  const handleFitView = () => fitView({ padding: 0.2, duration: 800 });

  return (
    <div className="studio-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', flex: 1, overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>
      
      {/* PAGE HEADER */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4 }}>Organization Studio</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Design, visualize and manage your organization structure</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8 }}>
            <Share size={16} /> Share
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, backgroundColor: 'var(--color-surface)' }}>
            <Search size={16} /> Export
          </button>
          <button className="btn-secondary hover:bg-slate-100" onClick={handleZoomIn} title="Zoom In" style={{ padding: '8px', borderRadius: 8, backgroundColor: 'var(--color-surface)', cursor: 'pointer', border: '1px solid var(--color-border)' }}>
            <Plus size={16} />
          </button>
          <button className="btn-secondary hover:bg-slate-100" onClick={handleZoomOut} title="Zoom Out" style={{ padding: '8px', borderRadius: 8, backgroundColor: 'var(--color-surface)', cursor: 'pointer', border: '1px solid var(--color-border)' }}>
            <Minus size={16} />
          </button>
          <button className="btn-secondary hover:bg-slate-100" onClick={handleFitView} title="Fit Screen" style={{ padding: '8px', borderRadius: 8, backgroundColor: 'var(--color-surface)', cursor: 'pointer', border: '1px solid var(--color-border)' }}>
            <Maximize size={16} />
          </button>
        </div>
      </div>

      {/* HORIZONTAL TOOLBAR */}
      <div style={{ padding: '0 32px 16px 32px', display: 'flex', gap: 12 }}>
        <div style={{ display: 'flex', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: 4 }}>
          <button className={`toolbar-action-btn ${!isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(false)}>
            <MousePointer2 size={16} /> Select
          </button>
          <button className={`toolbar-action-btn ${isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(true)}>
            <Hand size={16} /> Move
          </button>
          <button className="toolbar-action-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Add Node
          </button>
          <button className={`toolbar-action-btn ${isConnectMode ? 'active' : ''}`} onClick={() => { setIsConnectMode(true); setIsPanMode(false); addToast("Drag from a node's bottom handle to another's top handle to connect.", "info"); }}>
            <Share size={16} style={{transform: 'rotate(90deg)'}}/> Connect
          </button>
          <button className="toolbar-action-btn" onClick={handleFitView}>
            <Maximize size={16} /> Auto Layout
          </button>
          <div style={{ width: 1, backgroundColor: 'var(--color-border)', margin: '0 4px' }}></div>
          <button className="toolbar-action-btn" onClick={undo} disabled={pastStates.length === 0} style={{ opacity: pastStates.length === 0 ? 0.5 : 1 }}>
            <SkipBack size={16} /> Undo
          </button>
          <button className="toolbar-action-btn" onClick={redo} disabled={futureStates.length === 0} style={{ opacity: futureStates.length === 0 ? 0.5 : 1 }}>
            <SkipForward size={16} /> Redo
          </button>
          <div style={{ width: 1, backgroundColor: 'var(--color-border)', margin: '0 4px' }}></div>
          <div style={{ position: 'relative' }}>
            <button className={`toolbar-action-btn ${showMoreMenu ? 'active' : ''}`} onClick={() => setShowMoreMenu(!showMoreMenu)}>
              <MoreHorizontal size={16} /> More
            </button>
            {showMoreMenu && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: 8, boxShadow: 'var(--shadow-md)', zIndex: 50, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button className="context-menu-item" onClick={() => { setShowMoreMenu(false); addToast("Exporting PDF...", "info"); }} style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, width: '100%' }}>Export PDF</button>
                <button className="context-menu-item" onClick={() => { setShowMoreMenu(false); addToast("Exporting PNG...", "info"); }} style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, width: '100%' }}>Export Image</button>
                <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '4px 0' }}></div>
                <button className="context-menu-item" onClick={() => { setShowMoreMenu(false); addToast("Opening Settings...", "info"); }} style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, width: '100%' }}>View Settings</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CANVAS AREA */}
      <div className="studio-canvas-wrapper" style={{ flex: 1, position: 'relative', margin: '0 32px 48px 32px', borderTop: '1px solid var(--color-border)', borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', borderRadius: '12px 12px 0 0', overflow: 'hidden', backgroundColor: 'var(--color-surface)' }}>
        
        {/* VERTICAL CONTROLS */}
        <div style={{ position: 'absolute', left: 24, top: 24, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: 4, boxShadow: 'var(--shadow-sm)' }}>
          <button className="canvas-control-btn"><Hand size={18} color="var(--color-primary)"/></button>
          <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '2px 0' }}></div>
          <button className="canvas-control-btn" onClick={handleZoomIn}><Plus size={18} /></button>
          <button className="canvas-control-btn" onClick={handleZoomOut}><Minus size={18} /></button>
          <button className="canvas-control-btn" onClick={handleFitView}><Maximize size={18} /></button>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onNodeDragStop={onNodeDragStop}
          panOnDrag={isPanMode}
          panOnScroll={!isPanMode}
          selectionOnDrag={!isPanMode}
          nodesDraggable={true}
          elementsSelectable={true}
          fitView
          minZoom={0.2}
          maxZoom={2}
          attributionPosition="bottom-left"
        >
          <Controls showInteractive={false} showZoom={false} showFitView={false} />
          <Background 
            color="#94A3B8" 
            gap={24} 
            size={1.5} 
            variant="dots" 
            style={{ backgroundColor: 'var(--color-bg)' }}
          />
          <MiniMap 
            nodeColor={(n) => {
              if (n.data?.isVacant) return '#CBD5E1';
              if (n.data?.department === 'Engineering') return '#4F46E5';
              if (n.data?.department === 'Product') return '#14B8A6';
              return '#94A3B8';
            }} 
            maskColor="rgba(248, 250, 252, 0.7)"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}
          />
        </ReactFlow>
        
        {/* ZOOM INDICATOR (BOTTOM RIGHT) */}
        <div style={{ position: 'absolute', right: 24, bottom: 24, zIndex: 10, display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '4px 8px', boxShadow: 'var(--shadow-sm)' }}>
          <button className="canvas-zoom-btn" onClick={handleZoomOut}><Minus size={14}/></button>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, margin: '0 12px', minWidth: 40, textAlign: 'center' }}>100%</span>
          <button className="canvas-zoom-btn" onClick={handleZoomIn}><Plus size={14}/></button>
        </div>
      </div>
      
      {/* RIGHT SLIDE PANEL */}
      <div className={`studio-panel-overlay ${selectedNode ? 'visible' : ''}`} onClick={closePanel}></div>
      <EmployeeProfilePanel selectedNode={selectedNode} onClose={closePanel} />

      {/* MODALS */}
      <PositionChangeModal 
        isOpen={showChangeModal} 
        onClose={() => setShowChangeModal(false)}
        employeeNode={draggedNode}
        newManagerNode={targetManager}
        onConfirm={handleConfirmChange}
      />
      
      <ChangeSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        summaryData={summaryData}
      />

      <AssignEmployeeModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onConfirm={handleAssignConfirm}
        positionName={selectedNode?.data.designation}
      />

      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {contextMenu && (
        <OrgContextMenu 
          x={contextMenu.x}
          y={contextMenu.y}
          nodeData={contextMenu.nodeData}
          nodeId={contextMenu.nodeId}
          onClose={() => setContextMenu(null)}
          onEditProfile={() => setSelectedNode(nodes.find(n => n.id === contextMenu.nodeId))}
          onPromote={() => { 
             setDraggedNode(nodes.find(n => n.id === contextMenu.nodeId));
             setTargetManager(nodes.find(n => n.id === contextMenu.nodeId)); // mock target
             setShowChangeModal(true);
          }}
          onTransfer={() => {
             setDraggedNode(nodes.find(n => n.id === contextMenu.nodeId));
             setTargetManager(nodes.find(n => n.id === contextMenu.nodeId)); // mock target
             setShowChangeModal(true);
          }}
        />
      )}

      <OrgStudioBottomBar />
    </div>
  );
};

export default function OrgStudioWrapper() {
  return (
    <ReactFlowProvider>
      <OrgStudio />
    </ReactFlowProvider>
  );
}
