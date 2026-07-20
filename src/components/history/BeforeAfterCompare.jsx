import React, { useState } from 'react';
import Card from '../common/Card';
import { GitCompare, Plus, Minus, ArrowRightLeft } from 'lucide-react';

const BeforeAfterCompare = ({ version }) => {
  const [activeTab, setActiveTab] = useState('tree');

  return (
    <div style={{ marginTop: '32px' }} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <GitCompare size={20} color="var(--color-primary)" /> Topological Comparison
        </h3>
        <div style={{ display: 'flex', backgroundColor: 'var(--color-surface)', borderRadius: 8, padding: 4, border: '1px solid var(--color-border)' }}>
          <button onClick={() => setActiveTab('tree')} style={{ padding: '6px 16px', fontSize: '12px', fontWeight: 600, borderRadius: 6, border: 'none', background: activeTab === 'tree' ? 'white' : 'transparent', color: activeTab === 'tree' ? 'var(--color-primary)' : 'var(--color-text-muted)', boxShadow: activeTab === 'tree' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer' }}>Tree View</button>
          <button onClick={() => setActiveTab('table')} style={{ padding: '6px 16px', fontSize: '12px', fontWeight: 600, borderRadius: 6, border: 'none', background: activeTab === 'table' ? 'white' : 'transparent', color: activeTab === 'table' ? 'var(--color-primary)' : 'var(--color-text-muted)', boxShadow: activeTab === 'table' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer' }}>Data View</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        
        {/* Left Side: Before */}
        <Card style={{ flex: 1, padding: 0, overflow: 'hidden', border: '1px dashed var(--color-border)' }}>
          <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Baseline (Previous Version)</span>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>Version 3.1.5</div>
          </div>
          <div style={{ height: 300, backgroundColor: 'var(--color-bg)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Mock Organization Graph Nodes for Before */}
            <div className="org-node" style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)', padding: '12px 24px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 8, fontWeight: 600 }}>CEO</div>
            
            {/* Connectors */}
            <div style={{ position: 'absolute', top: 85, left: '50%', width: 2, height: 40, backgroundColor: 'var(--color-border)', transform: 'translateX(-50%)' }}></div>
            <div style={{ position: 'absolute', top: 125, left: '30%', width: '40%', height: 2, backgroundColor: 'var(--color-border)' }}></div>
            
            <div className="org-node" style={{ position: 'absolute', top: 125, left: '30%', transform: 'translateX(-50%)', padding: '12px 24px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 8, fontWeight: 600 }}>Engineering</div>
            <div className="org-node" style={{ position: 'absolute', top: 125, left: '70%', transform: 'translateX(-50%)', padding: '12px 24px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 8, fontWeight: 600 }}>Product</div>
            
            {/* Missing Node that will be added in after */}
          </div>
        </Card>

        {/* Right Side: After */}
        <Card style={{ flex: 1, padding: 0, overflow: 'hidden', border: '1px solid var(--color-primary)' }}>
           <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Target (Selected Snapshot)</span>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>{version?.id || 'v3.2.0'}</div>
          </div>
          <div style={{ height: 300, backgroundColor: 'var(--color-bg)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Mock Organization Graph Nodes for After */}
            <div className="org-node" style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)', padding: '12px 24px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 8, fontWeight: 600 }}>CEO</div>
            
            {/* Connectors */}
            <div style={{ position: 'absolute', top: 85, left: '50%', width: 2, height: 40, backgroundColor: 'var(--color-border)', transform: 'translateX(-50%)' }}></div>
            <div style={{ position: 'absolute', top: 125, left: '20%', width: '60%', height: 2, backgroundColor: 'var(--color-border)' }}></div>
            
            <div className="org-node" style={{ position: 'absolute', top: 125, left: '20%', transform: 'translateX(-50%)', padding: '12px 24px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: 8, fontWeight: 600, color: '#3b82f6' }}>Eng <span style={{fontSize:'10px'}}>(+5)</span></div>
            
            {/* New Added Node */}
            <div className="org-node" style={{ position: 'absolute', top: 125, left: '50%', transform: 'translateX(-50%)', padding: '12px 24px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-success)', borderRadius: 8, fontWeight: 600, color: 'var(--color-success)' }}>
              Data <Plus size={14} style={{display: 'inline'}} />
            </div>

            <div className="org-node" style={{ position: 'absolute', top: 125, left: '80%', transform: 'translateX(-50%)', padding: '12px 24px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed var(--color-danger)', borderRadius: 8, fontWeight: 600, color: 'var(--color-danger)', textDecoration: 'line-through' }}>
              Product <Minus size={14} style={{display: 'inline'}} />
            </div>
            
          </div>
        </Card>

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 6 }}><div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-success)'}}></div> Added</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: 6 }}><div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-danger)'}}></div> Removed</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: 6 }}><div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#3b82f6'}}></div> Modified</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-warning)', display: 'flex', alignItems: 'center', gap: 6 }}><div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-warning)'}}></div> Transferred</span>
      </div>
    </div>
  );
};

export default BeforeAfterCompare;
