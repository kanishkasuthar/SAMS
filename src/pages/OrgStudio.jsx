import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  ReactFlow, 
  Background,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  MousePointer2, Hand, Plus, Minus, Maximize, Share, Download, Monitor,
  MoreVertical, CheckCircle, Activity, AlertTriangle, Layers,
  GitCommit, CornerDownRight, ArrowDownUp
} from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';

import OrgNode from '../components/OrgNode';
import PositionChangeModal from '../components/PositionChangeModal';
import ChangeSummaryModal from '../components/ChangeSummaryModal';
import AssignEmployeeModal from '../components/AssignEmployeeModal';
import AddEmployeeModal from '../components/AddEmployeeModal';
import EmployeeProfilePanel from '../components/EmployeeProfilePanel';
import OrgContextMenu from '../components/OrgContextMenu';

import './OrgStudio.css';

const OrgStudio = () => {
  const { 
    nodes: storeNodes, 
    edges: storeEdges, 
    fetchOrgChart, 
    moveEmployee,
    orgStats,
    fetchOrgStats,
    undo,
    redo,
    pastStates,
    futureStates,
    searchNodes
  } = useOrgStore();

  const [nodes, originalSetNodes, onNodesChange] = useNodesState([]);
  const [edges, originalSetEdges, onEdgesChange] = useEdgesState([]);

  const setNodes = useCallback((n) => originalSetNodes(n), [originalSetNodes]);
  const setEdges = useCallback((e) => originalSetEdges(e), [originalSetEdges]);

  useEffect(() => {
    if (storeNodes.length > 0) {
      setNodes(storeNodes);
      setEdges(storeEdges);
    }
  }, [storeNodes, storeEdges, setNodes, setEdges]);

  const handleNodesChange = useCallback((changes) => onNodesChange(changes), [onNodesChange]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanMode, setIsPanMode] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const { zoomIn, zoomOut, fitView, setCenter } = useReactFlow();
  
  const [draggedNode, setDraggedNode] = useState(null);
  const [targetManager, setTargetManager] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New modal & dropdown states
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const nodeTypes = useMemo(() => ({ orgNode: OrgNode }), []);

  const onNodeClick = (event, node) => setSelectedNode(node);
  const closePanel = () => setSelectedNode(null);

  const handleAssignConfirm = (employeeData) => {
    useOrgStore.getState().fillPosition(selectedNode.id, employeeData);
    setShowAssignModal(false);
    setSelectedNode(null);
    useUIStore.getState().addToast(`${employeeData.name} has been assigned.`, 'success');
  };

  const onNodeDragStop = useCallback((event, node) => {
    const target = nodes.find(n => 
      n.id !== node.id && !n.data.isVacant && 
      Math.abs(n.position.x - node.position.x) < 200 && 
      Math.abs(n.position.y - node.position.y) < 150
    );
    if (target) { setDraggedNode(node); setTargetManager(target); setShowChangeModal(true); }
  }, [nodes]);

  const handleConfirmChange = async (reason, comments) => {
    try {
      const oldManagerEdge = edges.find(e => e.target === draggedNode.id);
      const oldManager = oldManagerEdge ? nodes.find(n => n.id === oldManagerEdge.source) : null;
      await moveEmployee(draggedNode.id, targetManager.id, reason, comments);
      setShowChangeModal(false);
      setSummaryData({
        employeeName: draggedNode.data.name, reason,
        oldPosition: draggedNode.data.designation, newPosition: draggedNode.data.designation,
        oldManager: oldManager ? oldManager.data.name : 'None', newManager: targetManager.data.name,
        version: 'v3.2.1'
      });
      setShowSummaryModal(true);
    } catch (err) {
      alert(err.message);
      setShowChangeModal(false);
    }
  };

  useEffect(() => { 
    fetchOrgChart(); 
    fetchOrgStats();
  }, [fetchOrgChart, fetchOrgStats]);

  useEffect(() => {
    const handler = (e) => setContextMenu(e.detail);
    window.addEventListener('orgnode-contextmenu', handler);
    return () => window.removeEventListener('orgnode-contextmenu', handler);
  }, []);

  // Intercept global navbar search
  useEffect(() => {
    const handleGlobalSearch = (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value;
        if (query) {
          const matches = searchNodes(query);
          if (matches.length > 0) {
            const matchNode = nodes.find(n => n.id === matches[0]);
            if (matchNode) {
              setCenter(matchNode.position.x + 120, matchNode.position.y + 60, { zoom: 1.2, duration: 800 });
              setSelectedNode(matchNode);
            }
          }
        }
      }
    };

    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('keydown', handleGlobalSearch);
    }
    return () => {
      if (searchInput) {
        searchInput.removeEventListener('keydown', handleGlobalSearch);
      }
    };
  }, [nodes, searchNodes, setCenter]);

  useEffect(() => {
    if (nodes.length > 0) setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
  }, [nodes.length, fitView]);

  return (
    <div className="studio-container">
      {/* MAIN CENTER COLUMN */}
      <div className="studio-main-column">

        {/* PAGE HEADER */}
        <div className="studio-header">
          <div className="studio-title-group">
            <h1>Organization Studio</h1>
            <p>Design, visualize and manage your organization structure</p>
          </div>
          <div className="studio-header-actions">
            <button className="studio-btn-primary" onClick={() => setIsImportOpen(true)}>
              <Share size={15} /> Import Excel
            </button>
            <div style={{ position: 'relative' }}>
              <button className="studio-btn-secondary" onClick={() => setShowExportMenu(!showExportMenu)}>
                <Download size={15} /> Export
              </button>
              {showExportMenu && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: 8, padding: 8, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 50, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <button className="context-menu-item" style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, width: '100%' }} onClick={() => { setShowExportMenu(false); exportToExcel(nodes, edges); }}>Export Excel</button>
                  <button className="context-menu-item" style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, width: '100%' }} onClick={() => { setShowExportMenu(false); exportToCSV(nodes, edges); }}>Export CSV</button>
                  <button className="context-menu-item" style={{ textAlign: 'left', padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)', borderRadius: 4, width: '100%' }} onClick={() => { setShowExportMenu(false); exportToPNG('.react-flow'); }}>Export PNG</button>
                </div>
              )}
            </div>
            <button className="studio-btn-icon" onClick={() => fitView({ padding: 0.2, duration: 600 })}>
              <Monitor size={15} />
            </button>
          </div>
        </div>

        {/* HORIZONTAL TOOLBAR */}
        <div className="studio-toolbar">
          <div className="studio-toolbar-group">
            <button className={`toolbar-btn-item ${!isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(false)}>
              <MousePointer2 size={14} /> Select
            </button>
            <button className={`toolbar-btn-item ${isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(true)}>
              <Hand size={14} /> Move
            </button>
            <button className="toolbar-btn-item" onClick={() => setShowAddModal(true)}>
              <Plus size={14} /> Add Node
            </button>
            <button className="toolbar-btn-item">
              <CornerDownRight size={14} /> Connect
            </button>
            <button className="toolbar-btn-item" onClick={() => fitView({ padding: 0.2, duration: 800 })}>
              <Maximize size={14} /> Auto Layout
            </button>
            <button className="toolbar-btn-item" onClick={undo} style={{ opacity: pastStates.length > 0 ? 1 : 0.5 }} disabled={pastStates.length === 0}>
              <ArrowDownUp size={14} style={{ transform: 'rotate(90deg)' }} /> Undo
            </button>
            <button className="toolbar-btn-item" onClick={redo} style={{ opacity: futureStates.length > 0 ? 1 : 0.5 }} disabled={futureStates.length === 0}>
              <ArrowDownUp size={14} style={{ transform: 'rotate(-90deg)' }} /> Redo
            </button>
            <button className="toolbar-btn-item">
              <MoreVertical size={14} /> More
            </button>
          </div>
        </div>

        {/* REACT FLOW CANVAS */}
        <div className="studio-canvas-wrapper">

          {/* Left vertical mini-toolbar */}
          <div className="vertical-toolbar">
            <div className={`v-toolbar-btn ${!isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(false)} title="Select">
              <MousePointer2 size={15} />
            </div>
            <div className="v-toolbar-btn" onClick={() => zoomIn({ duration: 300 })} title="Zoom In">
              <Plus size={15} />
            </div>
            <div className="v-toolbar-btn" onClick={() => zoomOut({ duration: 300 })} title="Zoom Out">
              <Minus size={15} />
            </div>
            <div className="v-toolbar-btn" title="Activity">
              <Activity size={15} />
            </div>
            <div className="v-toolbar-btn" onClick={() => fitView({ padding: 0.2, duration: 600 })} title="Fit View">
              <Maximize size={15} />
            </div>
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={() => {}}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onNodeDragStop={onNodeDragStop}
            panOnDrag={isPanMode}
            panOnScroll={!isPanMode}
            selectionOnDrag={!isPanMode}
            nodesDraggable={true}
            elevateNodesOnSelect={true}
            fitView
            minZoom={0.1}
            maxZoom={2}
          >
            <Background color="#CBD5E1" gap={24} size={1} variant="dots" style={{ backgroundColor: '#F8FAFC' }} />
            <MiniMap
              nodeColor="#C7D2FE"
              maskColor="rgba(248, 250, 252, 0.85)"
              style={{
                position: 'absolute', bottom: 72, left: 24,
                border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                width: 120, height: 80
              }}
            />
          </ReactFlow>

          {/* Bottom-right zoom control */}
          <div className="zoom-control">
            <button className="zoom-btn" onClick={() => zoomOut({ duration: 300 })}><Minus size={13} /></button>
            <span className="zoom-val">100%</span>
            <button className="zoom-btn" onClick={() => zoomIn({ duration: 300 })}><Plus size={13} /></button>
          </div>
        </div>

        {/* BOTTOM INSIGHT CARDS */}
        <div className="studio-insight-cards">

          {/* Card 1: Excel Sync Status */}
          <div className="insight-card">
            <div className="insight-card-header">
              <div className="insight-card-title">
                Excel Sync Status
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#10B981', fontWeight: 600, fontSize: '0.75rem', marginLeft: 8 }}>
                  <CheckCircle size={12} /> {orgStats?.syncStatus || 'Synced'}
                </span>
              </div>
            </div>
            <div className="excel-sync-box">
              <div className="excel-icon-box" style={{ fontSize: '0.85rem', fontWeight: 800 }}>X</div>
              <div className="excel-info">
                <div className="excel-title">organization.xlsx</div>
                <div className="excel-sub">Last synced: Today, 02:35 PM</div>
                <div className="excel-sub">Version: {pastStates.length + 1}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
              <div className="excel-progress" style={{ width: '100%' }}></div>
              <div style={{ flex: 1, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2 }}></div>
            </div>
            <button className="studio-btn-primary" onClick={() => setIsImportOpen(true)} style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>Sync Now</button>
          </div>

          {/* Card 2: Recent Changes */}
          <div className="insight-card">
            <div className="insight-card-header">
              <div className="insight-card-title">Recent Changes <span style={{ color: '#94A3B8', fontWeight: 400 }}>(Last Sync)</span></div>
              <div className="insight-card-action">View Details</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
              <div className="stat-label"><span className="stat-val-green">+{orgStats?.totalCount || 0}</span> &nbsp;Employees Total</div>
              <div className="stat-label"><span className="stat-val-blue">🔁 {pastStates.length}</span> &nbsp;Recent Changes</div>
              <div className="stat-label"><span className="stat-val-orange">↑ {orgStats?.activeCount || 0}</span> &nbsp;Active Staff</div>
              <div className="stat-label"><span className="stat-val-red">−{orgStats?.vacantCount || 0}</span> &nbsp;Vacant Slots</div>
            </div>
          </div>

          {/* Card 3: Org Insights */}
          <div className="insight-card">
            <div className="insight-card-header">
              <div className="insight-card-title">Organization Insights</div>
              <div className="insight-card-action">View All</div>
            </div>
            <div className="alerts-list">
              <div className="alert-row">
                <div className="alert-icon-text"><AlertTriangle size={13} color="#F59E0B" /> CEO has 18 direct reports</div>
                <div className="alert-badge orange">High Span</div>
              </div>
              <div className="alert-row">
                <div className="alert-icon-text"><Activity size={13} color="#F59E0B" /> Finance Manager has high workload</div>
                <div className="alert-badge orange">High Workload</div>
              </div>
              <div className="alert-row">
                <div className="alert-icon-text"><Layers size={13} color="#9333EA" /> 2 departments have no manager</div>
                <div className="alert-badge purple">Needs Attention</div>
              </div>
            </div>
          </div>

          {/* Card 4: Hierarchy Depth */}
          <div className="insight-card">
            <div className="insight-card-header">
              <div className="insight-card-title">Hierarchy Depth</div>
            </div>
            <div className="depth-value">{orgStats?.maxDepth || 6} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748B' }}>Levels</span></div>
            <div className="depth-bars">
              {Array.from({ length: 5 }).map((_, idx) => {
                const level = idx + 1;
                const maxD = orgStats?.maxDepth || 6;
                const heightPercent = level <= maxD ? `${(level / maxD) * 100}%` : '15%';
                return <div key={idx} className="depth-bar" style={{ height: heightPercent }}></div>;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: PROFILE DRAWER */}
      <EmployeeProfilePanel selectedNode={selectedNode} onClose={closePanel} />

      {/* MODALS */}
      <PositionChangeModal isOpen={showChangeModal} onClose={() => setShowChangeModal(false)} employeeNode={draggedNode} newManagerNode={targetManager} onConfirm={handleConfirmChange} />
      <ChangeSummaryModal isOpen={showSummaryModal} onClose={() => setShowSummaryModal(false)} summaryData={summaryData} />
      <AssignEmployeeModal isOpen={showAssignModal} onClose={() => setShowAssignModal(false)} onConfirm={handleAssignConfirm} positionName={selectedNode?.data.designation} />
      <AddEmployeeModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      
      {/* Excel Import Modal */}
      <ExcelImportModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />

      {contextMenu && (
        <OrgContextMenu
          x={contextMenu.x} y={contextMenu.y} nodeData={contextMenu.nodeData} nodeId={contextMenu.nodeId}
          onClose={() => setContextMenu(null)}
          onEditProfile={() => setSelectedNode(nodes.find(n => n.id === contextMenu.nodeId))}
          onPromote={() => { setDraggedNode(nodes.find(n => n.id === contextMenu.nodeId)); setTargetManager(nodes.find(n => n.id === contextMenu.nodeId)); setShowChangeModal(true); }}
          onTransfer={() => { setDraggedNode(nodes.find(n => n.id === contextMenu.nodeId)); setTargetManager(nodes.find(n => n.id === contextMenu.nodeId)); setShowChangeModal(true); }}
        />
      )}
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
