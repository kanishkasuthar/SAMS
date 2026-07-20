import React, { useEffect } from 'react';
import { Edit2, Copy, Shield, Activity, History, GitBranch, Ban, Trash2 } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

const NodeContextMenu = ({ id, top, left, right, bottom, onClick, onDuplicate, onDelete, onDisable }) => {
  const { getNode } = useReactFlow();
  const node = getNode(id);

  if (!node) return null;

  return (
    <div 
      style={{ top, left, right, bottom, position: 'absolute', zIndex: 100, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: 'var(--shadow-xl)', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px', animation: 'scale-in 0.1s ease-out' }}
      className="node-context-menu"
    >
      <div style={{ padding: '4px 12px', borderBottom: '1px solid var(--color-border)', marginBottom: '4px' }}>
        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>NODE ID: {id}</span>
      </div>

      <button onClick={() => onClick('edit')} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
        <Edit2 size={14} color="var(--color-text-muted)" /> Edit Node
      </button>

      <button onClick={() => onDuplicate(id)} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
        <Copy size={14} color="var(--color-text-muted)" /> Duplicate Node
      </button>
      
      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0' }}></div>

      <button onClick={() => onClick('authority')} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
        <Shield size={14} color="var(--color-text-muted)" /> Change Authority
      </button>

      <button onClick={() => onClick('performance')} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
        <Activity size={14} color="var(--color-text-muted)" /> View Performance
      </button>

      <button onClick={() => onClick('history')} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
        <History size={14} color="var(--color-text-muted)" /> Decision History
      </button>

      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0' }}></div>

      <button onClick={() => onClick('branch')} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
        <GitBranch size={14} color="var(--color-text-muted)" /> Create Branch
      </button>

      <button onClick={() => onDisable(id)} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-warning)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
        <Ban size={14} color="var(--color-warning)" /> Disable Node
      </button>

      <button onClick={() => onDelete(id)} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-danger)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
        <Trash2 size={14} color="var(--color-danger)" /> Delete Node
      </button>
    </div>
  );
};

export default NodeContextMenu;
