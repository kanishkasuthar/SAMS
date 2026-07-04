import React from 'react';
import { GitBranch, Plus, Play, Settings, Save, Check } from 'lucide-react';

const DecisionFlow = () => {
  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)', padding: 0}}>
      
      {/* Header Area */}
      <div style={{padding: '32px 32px 0 32px', marginBottom: 24}}>
        <div className="flex justify-between items-center" style={{marginBottom: 24}}>
          <div>
            <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Decision Flow Designer</h1>
            <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Visually map and automate organizational approval chains.</p>
          </div>
          <div className="flex gap-4">
            <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
              <Play size={16} />
              <span>Simulate Flow</span>
            </button>
            <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}>
              <Save size={16} />
              <span>Save Workflow</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mock Flow Canvas */}
      <div style={{flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.02)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 64}}>
         {/* Background Grid Pattern */}
         <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5}}></div>
         
         {/* Mock Nodes */}
         <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, position: 'relative', zIndex: 10}}>
            
            <div className="card" style={{padding: '16px 24px', width: 300, borderTop: '4px solid var(--color-primary)'}}>
              <div className="flex justify-between items-center mb-4">
                <span style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary)'}}>Trigger</span>
                <Settings size={14} color="var(--color-text-muted)" />
              </div>
              <h3 style={{fontWeight: 700, fontSize: '1.1rem', marginBottom: 4}}>Budget Request</h3>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>When amount &gt; $50,000</p>
            </div>
            
            <div style={{width: 2, height: 32, backgroundColor: 'var(--color-border)'}}></div>

            <div className="card" style={{padding: '16px 24px', width: 300, borderTop: '4px solid var(--color-warning)'}}>
              <div className="flex justify-between items-center mb-4">
                <span style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-warning)'}}>Condition</span>
                <Settings size={14} color="var(--color-text-muted)" />
              </div>
              <h3 style={{fontWeight: 700, fontSize: '1.1rem', marginBottom: 4}}>Check Department</h3>
              <select style={{width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--color-border)', fontSize: '0.85rem', marginTop: 8}}>
                <option>Engineering</option>
                <option>Sales</option>
              </select>
            </div>

            <div className="flex gap-16">
              <div className="flex-col items-center">
                <div style={{width: 2, height: 32, backgroundColor: 'var(--color-border)'}}></div>
                <div className="card" style={{padding: '16px 24px', width: 220, borderTop: '4px solid var(--color-accent)'}}>
                  <div className="flex justify-between items-center mb-4">
                    <span style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-accent)'}}>Action</span>
                  </div>
                  <h3 style={{fontWeight: 700, fontSize: '1rem', marginBottom: 4}}>VP Approval</h3>
                  <p style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>Route to David Chen</p>
                </div>
              </div>
              <div className="flex-col items-center">
                <div style={{width: 2, height: 32, backgroundColor: 'var(--color-border)'}}></div>
                <div className="card" style={{padding: '16px 24px', width: 220, borderTop: '4px solid var(--color-accent)'}}>
                  <div className="flex justify-between items-center mb-4">
                    <span style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-accent)'}}>Action</span>
                  </div>
                  <h3 style={{fontWeight: 700, fontSize: '1rem', marginBottom: 4}}>CFO Approval</h3>
                  <p style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>Route to Finance Queue</p>
                </div>
              </div>
            </div>
            
            <button className="card" style={{width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginTop: 16}}>
              <Plus size={24} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default DecisionFlow;
