import React, { useState } from 'react';
import { useOrgStore } from '../store/orgStore';

// Header & Slider
import TimeMachineHeader from '../components/history/TimeMachineHeader';
import TimeSlider from '../components/history/TimeSlider';

// Compare Components
import TreePanel from '../components/history/compare/TreePanel';
import InteractiveLegend from '../components/history/compare/InteractiveLegend';
import ZoomControls from '../components/history/compare/ZoomControls';

// Insights Sidebar
import DetectedConflicts from '../components/history/compare/DetectedConflicts';
import RecommendedActions from '../components/history/compare/RecommendedActions';
import AIDifferencePanel from '../components/history/compare/AIDifferencePanel';
import AISummary from '../components/history/compare/AISummary';
import VersionIntelligenceDashboard from '../components/history/compare/VersionIntelligenceDashboard';
import HistoryFooterMetrics from '../components/history/compare/HistoryFooterMetrics';

// Deep Dive
import LiveChangeTimeline from '../components/history/compare/LiveChangeTimeline';
import HistoryActivityLog from '../components/history/HistoryActivityLog';
import CompareExportMenu from '../components/history/compare/CompareExportMenu';

// Globals
import NodeDetailsDrawer from '../components/history/compare/NodeDetailsDrawer';
import HistoryAIAssistant from '../components/history/HistoryAIAssistant';

const VersionHistory = () => {
  const { versions } = useOrgStore();
  const [selectedVersionId, setSelectedVersionId] = useState(versions?.[0]?.id ?? null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  
  // Interactive Canvas State
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = React.useRef({ x: 0, y: 0 });

  const selectedVersion = versions.find(v => v.id === selectedVersionId) || versions[0];

  // Panning handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0 || e.target.closest('[style*="cursor: pointer"]')) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = React.useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setTransform(t => ({ ...t, x: (t?.x ?? 0) + dx, y: (t?.y ?? 0) + dy }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
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
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Zooming
  const handleWheel = React.useCallback((e) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    setTransform(t => {
      let newScale = Math.min(Math.max((t?.scale ?? 1) + delta, 0.2), 3);
      return { ...t, scale: newScale };
    });
  }, []);

  React.useEffect(() => {
    const el = document.getElementById('vh-trees-container');
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => el.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  return (
    <div className="page-container">
      
      {/* 12-COLUMN GRID CONTAINER */}
      <div 
        style={{ 
          maxWidth: 1600, 
          margin: '0 auto', 
          padding: '32px',
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '32px', // 32px between sections
          alignItems: 'start'
        }}
      >
        
      <div className="page-content-scrollable" style={{ padding: '8px 0 24px 0', marginTop: 0 }}>
        {/* ROW 1: Executive Header & Slider (Span 12) */}
        <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <TimeMachineHeader versions={versions} />
          <TimeSlider versions={versions} selectedVersionId={selectedVersionId} onSelectVersion={setSelectedVersionId} />
        </div>

        {/* ROW 2: Header, Toolbar, Canvas, Sidebar, AI Summary */}
        <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Comparison Toolbar */}
          <InteractiveLegend />

          {/* Main Comparison Area: Trees (Flex 1) + Collapsible Sidebar */}
          <div style={{ display: 'flex', gap: '24px', width: '100%', minHeight: '800px' }}>
            
            {/* Left side: Canvas (75%) */}
            <div 
              style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <ZoomControls 
                  scale={transform?.scale ?? 1}
                  onZoomIn={() => setTransform(t => ({ ...t, scale: Math.min((t?.scale ?? 1) + 0.2, 3) }))}
                  onZoomOut={() => setTransform(t => ({ ...t, scale: Math.max((t?.scale ?? 1) - 0.2, 0.2) }))}
                  onReset={() => setTransform({ x: 0, y: 0, scale: 1 })}
                />
              </div>

              <div 
                id="vh-trees-container"
                onMouseDown={handleMouseDown}
                style={{ flex: 1, display: 'flex', gap: '24px', cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <TreePanel 
                  type="baseline" 
                  title="Version 3.1.5" 
                  transform={transform}
                />
                <TreePanel 
                  type="target" 
                  title={selectedVersion?.id ?? 'Current Workspace'} 
                  transform={transform}
                />
              </div>
            </div>

            {/* Right side: Collapsible AI Sidebar */}
            <div style={{ flexShrink: 0 }}>
              <AIDifferencePanel />
            </div>

          </div>

          {/* AI Executive Summary */}
          <AISummary />

          {/* Detected Conflicts */}
          <DetectedConflicts />

        </div>


        {/* ROW 3: Temporal Action Feed (Left 8) + Secondary Actions (Right 4) */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Change Timeline */}
          <LiveChangeTimeline />

          {/* Activity Feed (2 Column Masonry) */}
          <HistoryActivityLog />
        </div>

        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <RecommendedActions />
          <CompareExportMenu />
        </div>


        {/* ROW 4: Version Intelligence (Span 12) */}
        <div style={{ gridColumn: 'span 12' }}>
          <VersionIntelligenceDashboard />
        </div>


        {/* ROW 5: Footer Dashboard (Span 12) */}
        <div style={{ gridColumn: 'span 12' }}>
          <HistoryFooterMetrics />
        </div>

      </div>
      </div>

      {/* Slide-in Details Drawer */}
      <NodeDetailsDrawer 
        nodeId={selectedNodeId} 
        onClose={() => { setSelectedNodeId(null); }} 
      />

      {/* Floating AI Assistant */}
      <HistoryAIAssistant />

    </div>
  );
};

export default VersionHistory;
