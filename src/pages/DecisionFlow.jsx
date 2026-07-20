import React, { useState, useCallback, useEffect } from 'react';
import { Play, Save, Activity, Network, MousePointer2, AlertTriangle, HelpCircle, ChevronDown, CheckCircle2, X } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { ReactFlowProvider, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import NodeLibrary from '../components/decision-flow/NodeLibrary';
import FlowCanvas from '../components/decision-flow/FlowCanvas';
import Inspector from '../components/decision-flow/Inspector';
import DecisionSimulationModal from '../components/decision-flow/modals/DecisionSimulationModal';
import FlowValidationModal from '../components/decision-flow/modals/FlowValidationModal';
import VersionHistoryModal from '../components/decision-flow/modals/VersionHistoryModal';
import WhatIfSimulatorModal from '../components/decision-flow/modals/WhatIfSimulatorModal';

// Initial Mock Data
const initialNodes = [
  {
    id: '1',
    type: 'decision',
    position: { x: 50, y: 50 },
    data: { type: 'trigger', title: 'Budget Request', summary: 'Amount > $50,000', status: 'Active', authority: null, metrics: ['INITIATOR: DEPT HEAD'] }
  },
  {
    id: '2',
    type: 'decision',
    position: { x: 50, y: 250 },
    data: { type: 'condition', title: 'Department Check', summary: 'Department = Engineering', status: 'Active', authority: 'System', metrics: [] }
  },
  {
    id: '3',
    type: 'decision',
    position: { x: 50, y: 450 },
    data: { type: 'action', title: 'VP Approval', summary: 'Route to David Chen', status: 'Active', authority: 'David Chen', metrics: ['4.2h avg', '92% approval'], shadowDetected: true }
  },
  {
    id: '4',
    type: 'decision',
    position: { x: 50, y: 650 },
    data: { type: 'action', title: 'CFO Approval', summary: 'Route to Finance Queue', status: 'Active', authority: 'Finance Approval Queue', metrics: ['1.8d avg', 'HIGH LOAD'], heatmap: 'critical' }
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: false },
  { id: 'e2-3', source: '2', target: '3', animated: false },
  { id: 'e3-4', source: '3', target: '4', animated: false }
];

const DecisionFlow = () => {
  const { addToast } = useUIStore();
  
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  
  const [isSimModalOpen, setIsSimModalOpen] = useState(false);
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [isVersionOpen, setIsVersionOpen] = useState(false);
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [showBottleneckAlert, setShowBottleneckAlert] = useState(true);
  
  // Intelligence and Simulation states
  const [simulationState, setSimulationState] = useState({
    isPulseActive: false,
    isHeatmapActive: false,
    isRunning: false,
    currentStep: 0
  });

  const [history, setHistory] = useState({ past: [], future: [] });

  const saveHistory = useCallback((newNodes, newEdges) => {
    setHistory(h => ({
      past: [...h.past, { nodes, edges }],
      future: []
    }));
  }, [nodes, edges]);

  const onUndo = useCallback(() => {
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    setHistory(h => ({
      past: h.past.slice(0, -1),
      future: [{ nodes, edges }, ...h.future]
    }));
    setNodes(previous.nodes);
    setEdges(previous.edges);
  }, [history, nodes, edges]);

  const onRedo = useCallback(() => {
    if (history.future.length === 0) return;
    const next = history.future[0];
    setHistory(h => ({
      past: [...h.past, { nodes, edges }],
      future: h.future.slice(1)
    }));
    setNodes(next.nodes);
    setEdges(next.edges);
  }, [history, nodes, edges]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Authority Pulse Animation effect
  useEffect(() => {
    if (simulationState.isPulseActive) {
      setEdges((eds) => eds.map(e => ({ ...e, animated: true, style: { stroke: 'var(--color-primary)', strokeWidth: 2 } })));
      setNodes((nds) => nds.map((n, i) => ({ 
        ...n, 
        data: { ...n.data, isPulsing: i === (Math.floor(Date.now() / 1000) % nds.length) } 
      })));
      
      const interval = setInterval(() => {
        setNodes((nds) => {
          const activeIndex = Math.floor(Date.now() / 1000) % nds.length;
          return nds.map((n, i) => ({ ...n, data: { ...n.data, isPulsing: i === activeIndex } }));
        });
      }, 1000);
      
      return () => {
        clearInterval(interval);
        setEdges((eds) => eds.map(e => ({ ...e, animated: false, style: {} })));
        setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, isPulsing: false } })));
      };
    } else {
      setEdges((eds) => eds.map(e => ({ ...e, animated: false, style: {} })));
      setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, isPulsing: false } })));
    }
  }, [simulationState.isPulseActive]);

  const handleRunSimulation = () => {
    setIsSimModalOpen(true);
  };

  const handleSaveWorkflow = () => {
    // Validate first
    setIsValidationOpen(true);
  };

  const executeSave = () => {
    addToast('Saving workflow...', 'info');
    setTimeout(() => {
      addToast('Budget Approval Flow saved successfully as v2.5.', 'success');
    }, 500);
  };

  return (
    <div className="page-container" style={{ padding: 0 }}>
      
      {/* 1. TOP PAGE HEADER */}
      <div style={{ padding: '24px 32px 16px 32px', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1', boxShadow: 'var(--shadow-sm)' }}>
              <Network size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.025em', margin: '0 0 4px 0' }}>Decision Intelligence Studio</h1>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0' }}>Design, simulate and analyze how strategic decisions move through your organization.</p>
              
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                <span className="label-with-icon"><Activity size={14}/> 12 Active Decision Flows</span>
                <span className="label-with-icon"><CheckCircle2 size={14}/> 342 Decisions Processed</span>
                <span className="label-with-icon" style={{ color: 'var(--color-danger)' }}><AlertTriangle size={14}/> 3 Bottlenecks Detected</span>
                <span className="label-with-icon" style={{ color: 'var(--color-success)' }}><CheckCircle2 size={14}/> Live Authority Sync</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Budget Approval Flow</span>
              <ChevronDown size={14} color="var(--color-text-muted)" />
            </div>

            <div onClick={() => setIsVersionOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>v2.4</span>
              <ChevronDown size={14} color="var(--color-text-muted)" />
            </div>
            
            <div style={{ fontSize: '11px', fontWeight: 800, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', padding: '6px 10px', borderRadius: '6px', letterSpacing: '0.05em' }}>
              LIVE
            </div>

            <button onClick={handleRunSimulation} style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: '8px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
              <Play size={16} /> Run Simulation
            </button>
            <button onClick={handleSaveWorkflow} style={{ padding: '8px 16px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
              <Save size={16} /> Save Workflow
            </button>
          </div>
        </div>

        {/* 2. DECISION INTELLIGENCE SUMMARY BAR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', paddingBottom: '4px' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Avg Decision Time</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>2.4 Days</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-success)' }}>↓ 12% faster</span>
              </div>
            </div>
            
            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Approval Success</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>92%</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-success)' }}>↑ 4% success</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Authority Handoffs</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>4</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-warning)' }}>+1 handoff</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Detected Bottlenecks</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-danger)' }}>2</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-danger)' }}>2 critical points</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Automation Coverage</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>68%</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-success)' }}>↑ 8% automated</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. MAIN STUDIO LAYOUT */}
      <ReactFlowProvider>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr) 320px', minHeight: 0 }}>
          
          {/* LEFT: Node Library */}
          <NodeLibrary />

          {/* CENTER: Canvas */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            
            {showBottleneckAlert && (
              <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', zIndex: 10, backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-danger)', borderLeft: '4px solid var(--color-danger)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertTriangle size={20} color="var(--color-danger)" />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-danger)', textTransform: 'uppercase', marginBottom: '2px' }}>DECISION BOTTLENECK DETECTED</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-main)' }}><strong>CFO Approval</strong> contributes 62% of total decision processing time. 14 decisions currently waiting.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => { setSelectedNodeId('4'); }} style={{ padding: '6px 12px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Inspect Bottleneck</button>
                  <button onClick={() => setIsWhatIfOpen(true)} style={{ padding: '6px 12px', backgroundColor: 'var(--color-primary)', border: 'none', color: 'white', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Simulate Alternative</button>
                  <button onClick={() => setShowBottleneckAlert(false)} style={{ padding: '6px', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}><X size={16} /></button>
                </div>
              </div>
            )}

            <FlowCanvas 
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={(params) => {
                saveHistory(nodes, edges);
                onConnect(params);
              }}
              setSelectedNodeId={setSelectedNodeId}
              setSimulationState={setSimulationState}
              isHeatmapActive={simulationState.isHeatmapActive}
              isPulseActive={simulationState.isPulseActive}
              onUndo={onUndo}
              onRedo={onRedo}
              canUndo={history.past.length > 0}
              canRedo={history.future.length > 0}
            />
          </div>

          {/* RIGHT: Inspector */}
          <Inspector 
            selectedNodeId={selectedNodeId}
            nodes={nodes}
            setNodes={setNodes}
          />

        </div>
      </ReactFlowProvider>
      <DecisionSimulationModal isOpen={isSimModalOpen} onClose={() => setIsSimModalOpen(false)} />
      <FlowValidationModal isOpen={isValidationOpen} onClose={() => setIsValidationOpen(false)} onSaveAnyway={executeSave} />
      <VersionHistoryModal isOpen={isVersionOpen} onClose={() => setIsVersionOpen(false)} />
      <WhatIfSimulatorModal isOpen={isWhatIfOpen} onClose={() => setIsWhatIfOpen(false)} />
    </div>
  );
};

export default DecisionFlow;
