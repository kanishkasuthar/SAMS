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
  Mail,
  Phone,
  MapPin,
  Calendar,
  Play,
  SkipBack,
  SkipForward,
  Pause
} from 'lucide-react';
import OrgNode from '../components/OrgNode';
import PositionChangeModal from '../components/PositionChangeModal';
import ChangeSummaryModal from '../components/ChangeSummaryModal';
import AssignEmployeeModal from '../components/AssignEmployeeModal';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import './OrgStudio.css';

const OrgStudio = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, moveEmployee, versions } = useOrgStore();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanMode, setIsPanMode] = useState(false);
  
  // Modals state
  const [draggedNode, setDraggedNode] = useState(null);
  const [targetManager, setTargetManager] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  
  const [summaryData, setSummaryData] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Timeline state
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(100);
  
  const nodeTypes = useMemo(() => ({ orgNode: OrgNode }), []);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
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

  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { addToast } = useUIStore();

  const handleZoomIn = () => zoomIn({ duration: 300 });
  const handleZoomOut = () => zoomOut({ duration: 300 });
  const handleFitView = () => fitView({ padding: 0.2, duration: 800 });

  return (
    <div className="studio-container">
      {/* TOOLBAR */}
      <div className="studio-toolbar">
        <button className={`toolbar-btn ${!isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(false)} title="Select Mode"><MousePointer2 size={18} /></button>
        <button className={`toolbar-btn ${isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(true)} title="Pan Mode"><Hand size={18} /></button>
        <div className="toolbar-divider"></div>
        <button className="toolbar-btn" onClick={handleZoomIn} title="Zoom In"><Plus size={18} /></button>
        <button className="toolbar-btn" onClick={handleZoomOut} title="Zoom Out"><Minus size={18} /></button>
        <button className="toolbar-btn" onClick={handleFitView} title="Fit View"><Maximize size={18} /></button>
        <div className="toolbar-divider"></div>
        <button className="toolbar-btn" onClick={() => addToast('Search employee module opened', 'info')} title="Search"><Search size={18} /></button>
      </div>

      {/* CANVAS */}
      <div className="studio-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
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
      </div>
      
      {/* RIGHT SLIDE PANEL */}
      <div className={`studio-panel-overlay ${selectedNode ? 'visible' : ''}`} onClick={closePanel}></div>
      <div className={`right-panel ${selectedNode ? 'open' : ''}`}>
        <div className="panel-header">
          <div className="panel-title">{selectedNode?.data.isVacant ? 'Vacant Position' : 'Profile'}</div>
          <button className="panel-close" onClick={closePanel}><X size={20} /></button>
        </div>
        
        {selectedNode && selectedNode.data.isVacant && (
          <div className="panel-content">
            <div className="profile-header">
              <div className="profile-avatar" style={{backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)', border: '2px dashed var(--color-border)'}}>
                ?
              </div>
              <div>
                <div className="profile-name" style={{color: 'var(--color-text-muted)'}}>Unassigned</div>
                <div className="profile-designation">{selectedNode.data.designation}</div>
              </div>
            </div>
            
            <div className="profile-section">
              <div className="profile-section-title">Actions</div>
              <div className="flex gap-2">
                <button 
                  className="btn-primary w-full" 
                  style={{justifyContent: 'center'}}
                  onClick={() => setShowAssignModal(true)}
                >
                  Assign Employee
                </button>
                <button 
                  className="btn-secondary w-full" 
                  style={{justifyContent: 'center', color: 'var(--color-danger)', borderColor: 'var(--color-danger)'}}
                  onClick={() => {
                    useOrgStore.getState().deletePosition(selectedNode.id);
                    setSelectedNode(null);
                    addToast('Vacant position permanently removed.', 'success');
                  }}
                >
                  Delete Position
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedNode && !selectedNode.data.isVacant && (
          <div className="panel-content">
            <div className="profile-header">
              <div className="profile-avatar">
                {selectedNode.data.name.charAt(0)}
              </div>
              <div>
                <div className="profile-name">{selectedNode.data.name}</div>
                <div className="profile-designation">{selectedNode.data.designation}</div>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-title">Contact Information</div>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label flex items-center gap-1"><Mail size={14}/> Email</div>
                  <div className="info-val">{selectedNode.data.name.split(' ')[0].toLowerCase()}@sams.corp</div>
                </div>
                <div className="info-item">
                  <div className="info-label flex items-center gap-1"><Phone size={14}/> Phone</div>
                  <div className="info-val">+1 (555) 019-2834</div>
                </div>
                <div className="info-item">
                  <div className="info-label flex items-center gap-1"><MapPin size={14}/> Location</div>
                  <div className="info-val">San Francisco, CA</div>
                </div>
                <div className="info-item">
                  <div className="info-label flex items-center gap-1"><Calendar size={14}/> Joined</div>
                  <div className="info-val">March 2021</div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-title">Organizational Journey</div>
              <div className="flex flex-col gap-4 mt-4 relative">
                <div style={{ position: 'absolute', left: 16, top: 0, bottom: 0, width: 2, backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>
                
                {useOrgStore.getState().employeeHistory.filter(h => h.employeeId === selectedNode.id).map((history, idx) => (
                  <div key={idx} className="flex gap-4 relative z-10">
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'white', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, flexShrink: 0, marginTop: 4 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
                    </div>
                    <div className="card w-full" style={{ padding: 16 }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>{history.type}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{history.date}</span>
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                        Moved from <strong>{history.oldPosition}</strong> to <strong>{history.newPosition}</strong>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                        Manager: {history.oldManager} → {history.newManager}
                      </div>
                      {history.comments && (
                         <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 8, padding: 8, backgroundColor: 'var(--color-surface)', borderRadius: 4, fontStyle: 'italic' }}>
                           "{history.comments}"
                         </div>
                      )}
                    </div>
                  </div>
                ))}

                {useOrgStore.getState().employeeHistory.filter(h => h.employeeId === selectedNode.id).length === 0 && (
                  <div className="flex gap-4 relative z-10">
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'white', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, flexShrink: 0, marginTop: 4 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-border)' }}></div>
                    </div>
                    <div className="card w-full" style={{ padding: 16 }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '0.9rem' }}>Joined Company</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>March 2021</span>
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        Initial position: {selectedNode.data.designation}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-section">
              <button 
                className="btn-secondary w-full" 
                style={{justifyContent: 'center'}}
                onClick={() => addToast('Opening full timeline view...', 'info')}
              >
                View Full Timeline
              </button>
            </div>

            <div className="profile-section">
              <div className="profile-section-title">Organization Details</div>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Department</div>
                  <div className="info-val">{selectedNode.data.department}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Direct Reports</div>
                  <div className="info-val">{selectedNode.data.teamSize || 0}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Employee ID</div>
                  <div className="info-val">EMP-{selectedNode.id.padStart(4, '0')}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
