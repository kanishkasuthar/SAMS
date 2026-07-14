import React, { useState } from 'react';
import { Play, ArrowRight, Save, Activity, LayoutTemplate, Users, Network, XCircle } from 'lucide-react';

const WhatIfSimulator = ({ simulatorData }) => {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState(null);

  const handleSimulate = () => {
    if (!selectedScenario) return;
    setSimulating(true);
    setResults(null);
    
    setTimeout(() => {
      setSimulating(false);
      setResults(simulatorData.results);
    }, 1500);
  };

  return (
    <div className="card" style={{ 
      padding: '24px', 
      backgroundColor: '#FFFFFF', 
      borderRadius: '16px', 
      border: '1px solid var(--color-border)',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Play size={24} color="var(--color-primary)" /> What-If Organization Simulator
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
            Test organizational changes before applying them to the live hierarchy.
          </p>
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface-alt)', padding: '6px 12px', borderRadius: '16px', letterSpacing: '0.05em' }}>
          TEST ENVIRONMENT
        </div>
      </div>

      <div style={{ padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
        
        {/* Top Controls */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8 }}>Scenario</div>
            <select 
              className="input-field" 
              style={{ width: '100%', backgroundColor: '#FFFFFF', fontSize: '15px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
              value={selectedScenario}
              onChange={(e) => { setSelectedScenario(e.target.value); setResults(null); }}
            >
              <option value="">Select a scenario...</option>
              {simulatorData?.scenarios.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button 
              className="btn-primary" 
              onClick={handleSimulate}
              disabled={!selectedScenario || simulating}
              style={{ padding: '12px 32px', fontSize: '15px', fontWeight: 600, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {simulating ? 'Running...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        {/* Empty State */}
        {!simulating && !results && (
          <div style={{ padding: '64px 0', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Network size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 8px 0' }}>No Scenario Selected</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Select a scenario above and run the simulation to see projected impacts.</p>
          </div>
        )}

        {/* Loading State */}
        {simulating && (
          <div style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative', width: 64, height: 64 }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%', border: '4px solid var(--color-border)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', width: '100%', height: '100%', border: '4px solid var(--color-primary)', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-secondary)', animation: 'pulse 1.5s infinite' }}>Analyzing cascading structural effects...</div>
          </div>
        )}

        {/* Results State */}
        {!simulating && results && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 32, alignItems: 'center', marginBottom: 40 }}>
              
              {/* CURRENT */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-secondary)', letterSpacing: '0.05em', marginBottom: 24, textAlign: 'center' }}>CURRENT STRUCTURE</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Health Score</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)' }}>{results.before.health}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Manager Load</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)' }}>{results.before.load}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Hierarchy Depth</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)' }}>{results.before.depth}</div>
                  </div>
                </div>
              </div>

              {/* ARROW */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div className="simulator-arrow" style={{ position: 'relative', width: 64, height: 4, backgroundColor: 'var(--color-primary)', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                  <ArrowRight size={20} color="var(--color-primary)" style={{ position: 'absolute', right: -10 }} />
                </div>
              </div>

              {/* SIMULATED */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: 'var(--color-primary)', borderRadius: '12px 12px 0 0' }}></div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.05em', marginBottom: 24, textAlign: 'center' }}>SIMULATED STRUCTURE</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Health Score</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-success)' }}>{results.after.health}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Manager Load</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-warning)' }}>{results.after.load}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Hierarchy Depth</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-success)' }}>{results.after.depth}</div>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: 32 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 16 }}>Predicted Impact</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-success)' }}>{results.healthScoreDiff} Organization Health</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-success)' }}>{results.managerLoadDiff} Overloaded Managers</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-success)' }}>{results.hierarchyDepthDiff} Hierarchy Level</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>{results.affectedEmployees} Employees Affected</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: 600 }}>
                <XCircle size={18} /> Discard Simulation
              </button>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: 600 }}>
                Review Changes
              </button>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, backgroundColor: 'var(--color-primary)' }}>
                <Save size={18} /> Apply Changes
              </button>
            </div>
          </div>
        )}

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowArrow {
          0% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(8px); opacity: 0; }
          51% { transform: translateX(-8px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .simulator-arrow svg {
          animation: flowArrow 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default WhatIfSimulator;
