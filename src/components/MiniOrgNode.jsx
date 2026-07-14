import React from 'react';
import { Handle, Position } from '@xyflow/react';

const MiniOrgNode = ({ data }) => {
  if (data.isSummary) {
    return (
      <div 
        className="mini-org-node summary-node"
        style={{
          width: 180,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)',
          cursor: 'pointer',
          transition: 'all 180ms ease'
        }}
      >
        <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
        
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 2 }}>{data.department}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 8 }}>{data.count} Members</div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              style={{ 
                width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-border)', 
                border: '2px solid var(--color-surface)', marginLeft: i > 1 ? -8 : 0, zIndex: 4 - i,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--color-text-muted)'
              }}
            >
              {i === 1 ? 'A' : i === 2 ? 'B' : 'C'}
            </div>
          ))}
          <div 
            style={{ 
              width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-surface-alt)', 
              border: '2px solid var(--color-surface)', marginLeft: -8, zIndex: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700, color: 'var(--color-text-secondary)'
            }}
          >
            +{Math.max(0, data.count - 3)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="mini-org-node"
      style={{
        width: 170,
        height: 75,
        background: 'var(--color-surface)',
        border: data.selected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
        borderRadius: 12,
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: data.selected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        cursor: 'pointer',
        transition: 'all 180ms ease'
      }}
    >
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
      
      <div style={{ position: 'relative' }}>
        {data.photo ? (
          <img src={data.photo} alt={data.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}>
            {data.name?.charAt(0) || '?'}
          </div>
        )}
        <div style={{ 
          position: 'absolute', bottom: -2, right: -2, width: 10, height: 10, borderRadius: '50%', 
          backgroundColor: data.status === 'Away' ? 'var(--color-warning)' : 'var(--color-success)', 
          border: '2px solid var(--color-surface)' 
        }}></div>
      </div>

      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {data.name}
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
          {data.designation}
        </div>
      </div>
    </div>
  );
};

export default MiniOrgNode;
