import React from 'react';
import { SlidersHorizontal, Settings2, RefreshCcw, Save } from 'lucide-react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const DigitalTwinSimulator = () => {
  const { simulationState, setSimulationState, orgHealthScore, authorityStability } = useAnalytics();

  const handleSliderChange = (key, value) => {
    setSimulationState(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  const handleReset = () => {
    setSimulationState({
      budget: 100,
      employees: 100,
      hierarchyDepth: 5,
      automationLevel: 20
    });
  };

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99,102,241,0.2)' }}>
            <SlidersHorizontal size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>What-If Digital Twin Simulator</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Adjust parameters to see live predicted impact on the organization.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleReset} className="hover-bg" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>
            <RefreshCcw size={14} /> Reset
          </button>
          <button className="hover-bg" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '12px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
            <Save size={14} /> Save Scenario
          </button>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1, overflowY: 'auto' }}>
        
        {/* Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Settings2 size={14} color="var(--color-text-muted)" /> Base Budget
              </label>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary)' }}>{simulationState.budget}%</span>
            </div>
            <input 
              type="range" 
              min="50" max="150" 
              value={simulationState.budget} 
              onChange={(e) => handleSliderChange('budget', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              <span>-50%</span><span>Current</span><span>+50%</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Settings2 size={14} color="var(--color-text-muted)" /> Total Employees
              </label>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary)' }}>{simulationState.employees}%</span>
            </div>
            <input 
              type="range" 
              min="50" max="150" 
              value={simulationState.employees} 
              onChange={(e) => handleSliderChange('employees', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Settings2 size={14} color="var(--color-text-muted)" /> Max Hierarchy Depth
              </label>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary)' }}>{simulationState.hierarchyDepth} Levels</span>
            </div>
            <input 
              type="range" 
              min="2" max="12" step="1"
              value={simulationState.hierarchyDepth} 
              onChange={(e) => handleSliderChange('hierarchyDepth', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Settings2 size={14} color="var(--color-text-muted)" /> Workflow Automation Level
              </label>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary)' }}>{simulationState.automationLevel}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={simulationState.automationLevel} 
              onChange={(e) => handleSliderChange('automationLevel', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
          </div>

        </div>

        {/* Live Predictions */}
        <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.2)', marginTop: 'auto' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>Live Predictive Impact</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '4px' }}>Predicted Health</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: orgHealthScore > 90 ? 'var(--color-success)' : orgHealthScore > 75 ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                {orgHealthScore.toFixed(1)}%
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '4px' }}>Authority Stability</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: authorityStability > 85 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                {authorityStability.toFixed(1)}%
              </div>
            </div>
          </div>
          
          <p style={{ fontSize: '12px', color: 'var(--color-text-main)', margin: '16px 0 0 0', lineHeight: 1.5 }}>
            {orgHealthScore > 90 
              ? "This configuration yields an optimal balance of resources and management depth." 
              : "Warning: These parameters may introduce bottlenecks or span-of-control issues."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DigitalTwinSimulator;
