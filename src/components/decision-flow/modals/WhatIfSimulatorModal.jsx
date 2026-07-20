import React from 'react';
import { X, GitBranch, ArrowRight, Zap, RefreshCw } from 'lucide-react';

const WhatIfSimulatorModal = ({ isOpen, onClose }) => {
  const [selectedScenario, setSelectedScenario] = React.useState('');

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '700px', animation: 'scale-in 0.2s ease-out', overflow: 'hidden' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(234, 179, 8, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EAB308' }}>
              <GitBranch size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>What-If Simulator</h2>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Test changes without modifying the active flow.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', gap: '24px' }}>
          
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Select Scenario</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Remove CFO Approval', 'Change Approval Threshold to $75,000', 'Route Engineering Requests to VP', 'Enable Automatic Low-Risk Approval'].map(scenario => (
                <button 
                  key={scenario}
                  onClick={() => setSelectedScenario(scenario)}
                  style={{ padding: '12px', borderRadius: '8px', border: selectedScenario === scenario ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', backgroundColor: selectedScenario === scenario ? 'rgba(79, 70, 229, 0.05)' : 'white', textAlign: 'left', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: selectedScenario === scenario ? 'var(--color-primary)' : 'var(--color-text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  {scenario}
                  {selectedScenario === scenario && <Zap size={14} />}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '12px', margin: 0 }}>Current Flow</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Average Time:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>2.4 Days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Approval Rate:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>92%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Authority Handoffs:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>4</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ArrowRight size={20} color="var(--color-text-muted)" />
            </div>

            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-success)', textTransform: 'uppercase', margin: 0 }}>Simulated Flow</h4>
                {selectedScenario && <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: 'var(--color-success)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>33% Faster</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Average Time:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{selectedScenario ? '1.6 Days' : '--'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Approval Rate:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{selectedScenario ? '91%' : '--'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Authority Handoffs:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{selectedScenario ? '3' : '--'}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 24px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Discard</button>
          <button disabled={!selectedScenario} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.05)', color: 'var(--color-primary)', fontSize: '13px', fontWeight: 700, cursor: selectedScenario ? 'pointer' : 'not-allowed' }}>Save as Scenario</button>
          <button onClick={() => { if (confirm('Are you sure you want to apply these changes to the live flow?')) onClose(); }} disabled={!selectedScenario} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '13px', fontWeight: 700, cursor: selectedScenario ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={14} /> Apply Change
          </button>
        </div>

      </div>
    </div>
  );
};

export default WhatIfSimulatorModal;
