import React, { useState } from 'react';
import { X, Search, Zap, AlertCircle, Shield, Cog, GripVertical, AlertTriangle } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

const CATEGORIES = [
  { name: 'TRIGGERS', color: '#6366F1', items: [{ type: 'trigger', label: 'Budget Request', icon: Zap }, { type: 'trigger', label: 'Project Request', icon: Zap }, { type: 'trigger', label: 'Hiring Request', icon: Zap }, { type: 'trigger', label: 'Policy Change', icon: Zap }] },
  { name: 'LOGIC', color: '#F59E0B', items: [{ type: 'condition', label: 'Condition', icon: AlertCircle }, { type: 'condition', label: 'Department Check', icon: AlertCircle }, { type: 'condition', label: 'Budget Threshold', icon: AlertCircle }, { type: 'condition', label: 'Priority Check', icon: AlertCircle }] },
  { name: 'AUTHORITY', color: '#14B8A6', items: [{ type: 'authority', label: 'Manager Approval', icon: Shield }, { type: 'authority', label: 'VP Approval', icon: Shield }, { type: 'authority', label: 'CFO Approval', icon: Shield }, { type: 'authority', label: 'Board Approval', icon: Shield }] },
  { name: 'ACTIONS', color: '#3B82F6', items: [{ type: 'automation', label: 'Assign Owner', icon: Cog }, { type: 'automation', label: 'Notify Team', icon: Cog }, { type: 'automation', label: 'Export Decision', icon: Cog }] },
  { name: 'ESCALATION', color: '#EF4444', items: [{ type: 'escalation', label: 'Emergency Escalate', icon: AlertTriangle }, { type: 'escalation', label: 'Legal Review', icon: AlertTriangle }] }
];

const AddNodeModal = ({ isOpen, onClose, onAdd }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '600px', animation: 'scale-in 0.2s ease-out', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>
              <GripVertical size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Add Decision Component</h2>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Select a component to add to the canvas.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '10px 12px' }}>
            <Search size={16} color="var(--color-text-muted)" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search components..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', backgroundColor: 'transparent' }} 
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {CATEGORIES.map(category => {
            const filtered = category.items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
            if (filtered.length === 0) return null;

            return (
              <div key={category.name}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  {category.name}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {filtered.map(item => (
                    <div 
                      key={item.label}
                      onClick={() => {
                        onAdd(item.type, item.label);
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 12px',
                        backgroundColor: 'white',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'border-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = category.color}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', backgroundColor: `${category.color}1A`, color: category.color }}>
                        <item.icon size={16} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AddNodeModal;
