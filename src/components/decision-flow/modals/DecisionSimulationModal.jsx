import React, { useState, useEffect } from 'react';
import { X, Play, Activity, Clock, Zap, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Evaluating Budget Request...', node: 'Budget Request' },
  { id: 2, label: 'Checking Department...', node: 'Department Check' },
  { id: 3, label: 'Awaiting VP Authority...', node: 'VP Approval' },
  { id: 4, label: 'Routing to CFO Approval...', node: 'CFO Approval' },
];

const DecisionSimulationModal = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isRunning || isComplete) return;
    
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500); // 1.5 seconds per step
      return () => clearTimeout(timer);
    } else if (currentStep === STEPS.length) {
      setIsComplete(true);
      setIsRunning(false);
    }
  }, [isRunning, currentStep, isComplete]);

  const handleStart = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setIsComplete(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '600px', animation: 'scale-in 0.2s ease-out', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>
              <Play size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Decision Flow Simulation</h2>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Test how a decision moves through the current authority structure.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-danger)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        {!isRunning && !isComplete && (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>Simulation Input</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Decision Type</label>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Budget Request</div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Department</label>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Engineering</div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Request Amount</label>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>$125,000</div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Risk Level</label>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Medium</div>
              </div>
            </div>
            <button onClick={handleStart} style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Play size={18} /> Start Simulation
            </button>
          </div>
        )}

        {isRunning && (
          <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="spinner" style={{ width: '48px', height: '48px', border: '4px solid var(--color-surface-hover)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '24px' }}></div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '8px' }}>Step {currentStep} of {STEPS.length}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>{STEPS[currentStep - 1]?.label}</div>
            <div style={{ fontSize: '13px', color: 'var(--color-primary)', marginTop: '8px', fontWeight: 600 }}>Active Node: {STEPS[currentStep - 1]?.node}</div>
          </div>
        )}

        {isComplete && (
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'center' }}>
              <CheckCircle2 size={24} color="var(--color-success)" />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>SIMULATION COMPLETE</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: 'var(--color-surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: '32px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Predicted Decision Time</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-text-main)' }}>2.8 Days</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Approval Probability</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-success)' }}>89%</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Authority Handoffs</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-text-main)' }}>3</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Bottleneck</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--color-danger)' }}>CFO Approval</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, padding: '12px', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', borderRadius: '8px', fontSize: '13px', fontWeight: 700, border: '1px solid var(--color-border)', cursor: 'pointer' }}>View Simulation Report</button>
              <button style={{ flex: 1, padding: '12px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Apply Optimization</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DecisionSimulationModal;
