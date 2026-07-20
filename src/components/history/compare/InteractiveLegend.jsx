import React, { useState } from 'react';
import { ArrowLeftRight, Download, RotateCcw, Sparkles } from 'lucide-react';

const InteractiveLegend = () => {
  const [activeFilters, setActiveFilters] = useState(['added', 'removed', 'modified', 'transferred']);

  const toggleFilter = (type) => {
    setActiveFilters(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const legendItems = [
    { type: 'added', label: 'Added', color: 'var(--color-success)', bg: 'rgba(16, 185, 129, 0.1)' },
    { type: 'removed', label: 'Removed', color: 'var(--color-danger)', bg: 'rgba(239, 68, 68, 0.1)' },
    { type: 'modified', label: 'Modified', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { type: 'transferred', label: 'Transferred', color: 'var(--color-warning)', bg: 'rgba(245, 158, 11, 0.1)' }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', backgroundColor: 'white', padding: '12px 24px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%' }}>
      
      {/* Version Selectors */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <select style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', cursor: 'pointer', outline: 'none' }}>
          <option>Baseline: v3.1.5</option>
          <option>Baseline: v3.1.4</option>
        </select>
        <button className="icon-btn hover:bg-slate-100" style={{ padding: '8px', borderRadius: '50%', border: '1px solid var(--color-border)', backgroundColor: 'white', cursor: 'pointer', color: 'var(--color-text-muted)' }} title="Swap Versions">
          <ArrowLeftRight size={16} />
        </button>
        <select style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'rgba(79, 70, 229, 0.05)', fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer', outline: 'none' }}>
          <option>Target: Current Workspace</option>
          <option>Target: v3.1.6 (Draft)</option>
        </select>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {legendItems.map(item => {
          const isActive = activeFilters.includes(item.type);
          return (
            <button
              key={item.type}
              onClick={() => toggleFilter(item.type)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: `1px solid ${isActive ? item.color : 'transparent'}`,
                backgroundColor: isActive ? item.bg : 'transparent',
                color: isActive ? item.color : 'var(--color-text-muted)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              className={isActive ? '' : 'hover:bg-slate-100'}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: isActive ? item.color : 'var(--color-text-muted)' }}></div>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-purple-100">
          <Sparkles size={16} />
          AI Summary
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-surface-hover">
          <Download size={16} />
          Export
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)', backgroundColor: 'rgba(245, 158, 11, 0.05)', color: 'var(--color-warning)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-amber-100">
          <RotateCcw size={16} />
          Rollback
        </button>
      </div>

    </div>
  );
};

export default InteractiveLegend;
