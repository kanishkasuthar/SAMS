import React from 'react';
import { X, User, Briefcase, Network, DollarSign, BrainCircuit } from 'lucide-react';

const NodeDetailsDrawer = ({ nodeId, onClose }) => {
  if (!nodeId) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999 }}
        className="animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div 
        style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 400, backgroundColor: 'var(--color-bg)', zIndex: 1000, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
        className="animate-in slide-in-from-right duration-300"
      >
        <div style={{ padding: '24px', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Node Details</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Engineering Department</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} className="hover:bg-slate-100 rounded-full">
            <X size={20} color="var(--color-text-muted)" />
          </button>
        </div>

        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }} className="hide-scrollbar">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
             <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
              <User size={16} color="var(--color-primary)" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>MANAGER</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>Marcus Doe</div>
            </div>
             <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
              <Briefcase size={16} color="var(--color-primary)" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>DIRECT REPORTS</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>142</div>
            </div>
             <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
              <Network size={16} color="var(--color-primary)" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>AUTHORITY SCORE</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>91%</div>
            </div>
             <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
              <DollarSign size={16} color="var(--color-primary)" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>BUDGET</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>$8.4M</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '20px', borderRadius: 12, marginBottom: '24px' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <BrainCircuit size={16} color="var(--color-primary)" />
              <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>AI Node Suggestions</h4>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5, margin: 0 }}>
              The Engineering department is currently operating at max capacity. Based on the +5 headcount addition in this snapshot, consider assigning 2 additional team leads to maintain optimal span of control.
            </p>
          </div>

          <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0' }}>Related Changes</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ padding: '12px', backgroundColor: 'white', borderRadius: 6, border: '1px solid var(--color-border)', fontSize: '13px' }}>Data Science (+1)</li>
            <li style={{ padding: '12px', backgroundColor: 'white', borderRadius: 6, border: '1px solid var(--color-border)', fontSize: '13px' }}>Product (-2)</li>
          </ul>

        </div>

        <div style={{ padding: '24px', backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}>
          <button className="btn-primary" style={{ width: '100%', padding: '14px' }}>Open Full Profile</button>
        </div>
      </div>
    </>
  );
};

export default NodeDetailsDrawer;
