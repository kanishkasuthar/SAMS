import React from 'react';
import { ZoomIn, ZoomOut, Maximize, Target, Expand, Shrink, Map } from 'lucide-react';

const ZoomControls = ({ scale = 1, onZoomIn, onZoomOut, onReset, onToggleMinimap }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '4px' }}>
      <button onClick={onZoomIn} className="icon-btn hover:bg-slate-100" style={{ padding: '8px', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer' }} title="Zoom In">
        <ZoomIn size={16} color="var(--color-text-main)" />
      </button>
      <div style={{ padding: '0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', minWidth: 48, textAlign: 'center' }}>
        {Math.round(scale * 100)}%
      </div>
      <button onClick={onZoomOut} className="icon-btn hover:bg-slate-100" style={{ padding: '8px', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer' }} title="Zoom Out">
        <ZoomOut size={16} color="var(--color-text-main)" />
      </button>
      <div style={{ width: 1, height: 16, backgroundColor: 'var(--color-border)', margin: '0 4px' }}></div>
      <button onClick={onReset} className="icon-btn hover:bg-slate-100" style={{ padding: '8px', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer' }} title="Fit Screen / Reset">
        <Maximize size={16} color="var(--color-text-main)" />
      </button>
      <div style={{ width: 1, height: 16, backgroundColor: 'var(--color-border)', margin: '0 4px' }}></div>
      <button className="icon-btn hover:bg-slate-100" style={{ padding: '8px', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer' }} title="Center Tree">
        <Target size={16} color="var(--color-text-main)" />
      </button>
      <div style={{ width: 1, height: 16, backgroundColor: 'var(--color-border)', margin: '0 4px' }}></div>
      <button onClick={onToggleMinimap} className="icon-btn hover:bg-slate-100" style={{ padding: '8px', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer' }} title="Toggle Mini Map">
        <Map size={16} color="var(--color-text-main)" />
      </button>
    </div>
  );
};

export default ZoomControls;
