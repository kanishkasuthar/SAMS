import React, { useState } from 'react';
import { Search, Zap, AlertCircle, Shield, AlertTriangle, Cog, CheckCircle2, GripVertical } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'TRIGGERS',
    color: '#6366F1',
    items: [
      { type: 'trigger', label: 'Budget Request', icon: Zap },
      { type: 'trigger', label: 'Project Request', icon: Zap },
      { type: 'trigger', label: 'Hiring Request', icon: Zap },
      { type: 'trigger', label: 'Policy Change', icon: Zap },
    ]
  },
  {
    name: 'LOGIC',
    color: '#F59E0B',
    items: [
      { type: 'condition', label: 'Condition', icon: AlertCircle },
      { type: 'condition', label: 'Department Check', icon: AlertCircle },
      { type: 'condition', label: 'Budget Threshold', icon: AlertCircle },
      { type: 'condition', label: 'Priority Check', icon: AlertCircle },
    ]
  },
  {
    name: 'AUTHORITY',
    color: '#14B8A6',
    items: [
      { type: 'authority', label: 'Manager Approval', icon: Shield },
      { type: 'authority', label: 'VP Approval', icon: Shield },
      { type: 'authority', label: 'CFO Approval', icon: Shield },
      { type: 'authority', label: 'Board Approval', icon: Shield },
    ]
  },
  {
    name: 'ACTIONS',
    color: '#3B82F6',
    items: [
      { type: 'automation', label: 'Assign Owner', icon: Cog },
      { type: 'automation', label: 'Notify Team', icon: Cog },
      { type: 'automation', label: 'Export Decision', icon: Cog },
    ]
  },
  {
    name: 'ESCALATION',
    color: '#EF4444',
    items: [
      { type: 'escalation', label: 'Emergency Escalate', icon: AlertTriangle },
      { type: 'escalation', label: 'Legal Review', icon: AlertTriangle },
    ]
  }
];

const NodeLibrary = () => {
  const [search, setSearch] = useState('');

  const onDragStart = (event, type, label) => {
    event.dataTransfer.setData('application/reactflow/type', type);
    event.dataTransfer.setData('application/reactflow/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Decision Components</h2>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 16px 0' }}>Drag components onto the canvas.</p>
        
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px 12px' }}>
          <Search size={14} color="var(--color-text-muted)" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search components..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', backgroundColor: 'transparent' }} 
          />
        </div>
      </div>

      {/* Library */}
      <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {CATEGORIES.map(category => {
          const filtered = category.items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
          if (filtered.length === 0) return null;

          return (
            <div key={category.name}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                {category.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filtered.map(item => (
                  <div 
                    key={item.label}
                    onDragStart={(event) => onDragStart(event, item.type, item.label)}
                    draggable
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      backgroundColor: 'white',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      cursor: 'grab',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = category.color}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  >
                    <GripVertical size={14} color="var(--color-border)" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '6px', backgroundColor: `${category.color}1A`, color: category.color }}>
                      <item.icon size={14} />
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
  );
};

export default NodeLibrary;
