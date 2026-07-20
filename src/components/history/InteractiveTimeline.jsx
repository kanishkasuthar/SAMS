import React from 'react';
import { GitCommit, CheckCircle } from 'lucide-react';

const InteractiveTimeline = ({ versions, selectedVersionId, onSelectVersion }) => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', position: 'relative' }} className="hide-scrollbar">
      {/* Vertical Line */}
      <div style={{ position: 'absolute', top: 24, bottom: 24, left: 39, width: 2, backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>
      
      <div className="flex-col gap-6">
        {versions.map((version) => {
          const isSelected = selectedVersionId === version.id;
          
          let tagColor = 'var(--color-text-muted)';
          let tagBg = 'var(--color-surface-hover)';
          if (version.type === 'Excel Sync') { tagColor = 'white'; tagBg = 'var(--color-primary)'; }
          if (version.type === 'AI Generated') { tagColor = 'var(--color-text-main)'; tagBg = 'rgba(168, 85, 247, 0.2)'; }

          return (
            <div 
              key={version.id} 
              className="flex gap-4 relative z-10 hover-lift"
              style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => onSelectVersion(version.id)}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%', 
                backgroundColor: version.active ? 'var(--color-primary)' : 'var(--color-surface)',
                border: version.active ? 'none' : `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: version.active ? 'white' : (isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)'),
                flexShrink: 0,
                boxShadow: isSelected && !version.active ? '0 0 0 4px rgba(79, 70, 229, 0.1)' : 'none',
                transition: 'all 0.3s'
              }}>
                <GitCommit size={16} />
              </div>
              
              <div style={{
                flex: 1, padding: '16px', borderRadius: '12px', 
                backgroundColor: isSelected ? 'white' : 'var(--color-surface)', 
                border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                boxShadow: isSelected ? '0 10px 30px rgba(79, 70, 229, 0.1)' : 'none',
                transition: 'all 0.3s ease',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)'
              }}>
                <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
                  <h4 style={{ fontWeight: 800, color: 'var(--color-text-main)', fontSize: '15px' }}>{version.id}</h4>
                  {version.active && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase' }}>
                      <CheckCircle size={12} /> Live
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: 12 }}>
                  {version.date} • {version.author}
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: '10px', fontWeight: 700, backgroundColor: tagBg, color: tagColor, textTransform: 'uppercase' }}>
                    {version.type}
                  </span>
                  {!version.active && (
                    <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: '10px', fontWeight: 700, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', textTransform: 'uppercase' }}>
                      Rollback Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveTimeline;
