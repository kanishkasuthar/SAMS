import React, { useState } from 'react';
import { MousePointer2, Hand, Plus, Network, Undo, Redo, Activity, Flame, ZoomIn, ZoomOut, Maximize, Play } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useReactFlow } from '@xyflow/react';
import DecisionReplayModal from './modals/DecisionReplayModal';
import AddNodeModal from './modals/AddNodeModal';

const CanvasToolbar = ({ onAutoLayout, onFitView, setSimulationState, onAddNode, onUndo, onRedo, canUndo, canRedo }) => {
  const { addToast } = useUIStore();
  const { zoomIn, zoomOut } = useReactFlow();
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);

  const handlePulse = () => {
    setSimulationState(prev => ({ ...prev, isPulseActive: !prev.isPulseActive }));
  };

  const handleHeatmap = () => {
    setSimulationState(prev => ({ ...prev, isHeatmapActive: !prev.isHeatmapActive }));
  };

  const handleAddNode = () => {
    addToast('Use the Node Library on the left to drag and drop nodes.', 'info');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '12px', padding: '8px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', gap: '16px' }}>
      
      {/* Interaction Group */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <button title="Select" style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', cursor: 'pointer' }}><MousePointer2 size={16} /></button>
        <button title="Pan" style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }}><Hand size={16} /></button>
        <button title="Add Node" onClick={() => setIsAddNodeOpen(true)} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }}><Plus size={16} /></button>
        <button title="Auto Layout" onClick={onAutoLayout} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }}><Network size={16} /></button>
      </div>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }}></div>

      {/* History Group */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <button title="Undo" disabled={!canUndo} onClick={onUndo} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: canUndo ? 'var(--color-text-main)' : 'var(--color-border)', cursor: canUndo ? 'pointer' : 'not-allowed' }}><Undo size={16} /></button>
        <button title="Redo" disabled={!canRedo} onClick={onRedo} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: canRedo ? 'var(--color-text-main)' : 'var(--color-border)', cursor: canRedo ? 'pointer' : 'not-allowed' }}><Redo size={16} /></button>
      </div>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }}></div>

      {/* Intelligence Group */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <button title="Authority Pulse" onClick={handlePulse} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
          <Activity size={16} /> Pulse
        </button>
        <button title="Decision Heatmap" onClick={handleHeatmap} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
          <Flame size={16} /> Heatmap
        </button>
      </div>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }}></div>

      {/* Viewport Group */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <button title="Zoom Out" onClick={() => zoomOut({ duration: 300 })} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }}><ZoomOut size={16} /></button>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', padding: '0 8px', display: 'flex', alignItems: 'center' }}>100%</span>
        <button title="Zoom In" onClick={() => zoomIn({ duration: 300 })} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }}><ZoomIn size={16} /></button>
        <button title="Fit View" onClick={onFitView} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }}><Maximize size={16} /></button>
      </div>
      
      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }}></div>

      {/* Replay */}
      <button title="Replay Decision" onClick={() => setIsReplayOpen(true)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700 }}>
        <Play size={14} /> Replay
      </button>

      <DecisionReplayModal isOpen={isReplayOpen} onClose={() => setIsReplayOpen(false)} />
      <AddNodeModal isOpen={isAddNodeOpen} onClose={() => setIsAddNodeOpen(false)} onAdd={onAddNode} />
    </div>
  );
};

export default CanvasToolbar;
