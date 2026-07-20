import React, { useState, useRef, useEffect } from 'react';
import TreePanel from './TreePanel';
import ZoomControls from './ZoomControls';
import InteractiveLegend from './InteractiveLegend';
import AIDifferencePanel from './AIDifferencePanel';
import DetectedConflicts from './DetectedConflicts';
import RecommendedActions from './RecommendedActions';
import AISummaryCard from './AISummaryCard';
import LiveChangeTimeline from './LiveChangeTimeline';
import NodeDetailsDrawer from './NodeDetailsDrawer';
import CompareExportMenu from './CompareExportMenu';
import { Search, Maximize, Minimize } from 'lucide-react';

const CompareWorkspace = ({ version }) => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  
  // Interactive Canvas State
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Panning
  const handleMouseDown = (e) => {
    // Only drag on left click, ignore if clicking on a node or button
    if (e.button !== 0 || e.target.closest('[style*="cursor: pointer"]')) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Zooming
  const handleWheel = (e) => {
    // Only zoom if ctrl/cmd is pressed, to prevent normal scrolling issues if there were any,
    // or just allow natural zooming if we prevent default.
    // Let's allow natural zooming for now.
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    setTransform(t => {
      let newScale = Math.min(Math.max(t.scale + delta, 0.2), 3); // min 0.2x, max 3x
      return { ...t, scale: newScale };
    });
  };

  // Prevent default scroll when hovering over the workspace so zooming works nicely
  useEffect(() => {
    const el = document.getElementById('compare-workspace-area');
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => el.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const fullScreenStyle = isFullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    backgroundColor: 'var(--color-bg)',
    padding: '24px',
    boxSizing: 'border-box'
  } : {};

  return (
    <div className="animate-in fade-in zoom-in duration-300" style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: isFullScreen ? '100%' : '100%', ...fullScreenStyle }}>
      
      {/* Top Header / Search / Zoom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <InteractiveLegend />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '6px 12px', width: 250 }}>
            <Search size={16} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search people or depts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%', paddingLeft: '8px', fontSize: '13px' }}
            />
          </div>
          <ZoomControls 
            scale={transform.scale}
            onZoomIn={() => setTransform(t => ({ ...t, scale: Math.min(t.scale + 0.2, 3) }))}
            onZoomOut={() => setTransform(t => ({ ...t, scale: Math.max(t.scale - 0.2, 0.2) }))}
            onReset={() => setTransform({ x: 0, y: 0, scale: 1 })}
            onToggleMinimap={() => setShowMinimap(!showMinimap)}
          />
          <button 
            onClick={() => setIsFullScreen(!isFullScreen)}
            style={{ padding: '8px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-text-main)' }}
          >
            {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div 
        id="compare-workspace-area"
        onMouseDown={handleMouseDown}
        style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '800px', cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        
        {/* Minimap Overlay */}
        {showMinimap && (
          <div style={{ position: 'absolute', bottom: 24, left: 24, width: 200, height: 150, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', zIndex: 100 }}>
            <div style={{ padding: '8px', fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}>
              Minimap
            </div>
            <div style={{ position: 'relative', width: '100%', height: '120px', backgroundColor: 'var(--color-bg)' }}>
              {/* Simplified mock of the tree shape */}
              <div style={{ position: 'absolute', top: 20, left: 90, width: 20, height: 10, backgroundColor: 'var(--color-border)', borderRadius: 2 }}></div>
              <div style={{ position: 'absolute', top: 50, left: 40, width: 20, height: 10, backgroundColor: 'var(--color-border)', borderRadius: 2 }}></div>
              <div style={{ position: 'absolute', top: 50, left: 140, width: 20, height: 10, backgroundColor: 'var(--color-border)', borderRadius: 2 }}></div>
              <div style={{ position: 'absolute', top: 80, left: 20, width: 20, height: 10, backgroundColor: 'var(--color-border)', borderRadius: 2 }}></div>
              <div style={{ position: 'absolute', top: 80, left: 60, width: 20, height: 10, backgroundColor: 'var(--color-border)', borderRadius: 2 }}></div>
              <div style={{ position: 'absolute', top: 80, left: 120, width: 20, height: 10, backgroundColor: 'var(--color-border)', borderRadius: 2 }}></div>
              
              {/* Viewport Box */}
              <div style={{ 
                position: 'absolute', 
                border: '2px solid var(--color-primary)', 
                backgroundColor: 'rgba(79, 70, 229, 0.1)', 
                width: 60, height: 40, 
                left: 70 - (transform.x * 0.05), top: 10 - (transform.y * 0.05),
                cursor: 'move',
                transition: 'all 0.1s'
              }}></div>
            </div>
          </div>
        )}
        
        {/* Left Side: Trees */}
        <div style={{ flex: 3, display: 'flex', gap: '24px' }}>
          <TreePanel 
            type="baseline" 
            title="Version 3.1.5" 
            searchQuery={searchQuery}
            transform={transform}
          />
          <TreePanel 
            type="target" 
            title={version?.id || 'Version 3.2.0'} 
            searchQuery={searchQuery}
            transform={transform}
          />
        </div>

        {/* Right Side: AI Insights Sidebar */}
        {!isFullScreen && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '340px' }} onMouseDown={e => e.stopPropagation()}>
            <AIDifferencePanel />
            <AISummaryCard />
            <DetectedConflicts />
            <RecommendedActions />
            <CompareExportMenu />
          </div>
        )}
        
      </div>

      {/* Bottom Area */}
      {!isFullScreen && (
        <div style={{ marginTop: '8px' }}>
          <LiveChangeTimeline />
        </div>
      )}

      {/* Slide-in Details Drawer */}
      <NodeDetailsDrawer 
        nodeId={selectedNodeId} 
        onClose={() => setSelectedNodeId(null)} 
      />

    </div>
  );
};

export default CompareWorkspace;
