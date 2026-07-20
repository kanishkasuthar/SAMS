import React from 'react';
import { Zap, LayoutTemplate, Play, Check, Clock, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { generateMockPDF } from '../../utils/fileGenerators';

const ACTIONS = [
  {
    id: 1,
    title: "Hire Additional Engineering Manager",
    impact: "High", difficulty: "Medium", time: "1 Month", roi: "+12% Efficiency", confidence: "95%",
    type: "promotion", description: "Engineering manager overload detected. Span of control is 1:18 (Target: 1:12)."
  },
  {
    id: 2,
    title: "Redistribute Finance Approvals",
    impact: "Critical", difficulty: "Low", time: "2 Days", roi: "-5 days Delay", confidence: "98%",
    type: "risk", description: "Approval chain in Procurement is 4 levels deep, causing a 12-day average delay."
  },
  {
    id: 3,
    title: "Merge Product & Design Divisions",
    impact: "Medium", difficulty: "High", time: "3 Months", roi: "Cost Synergy", confidence: "82%",
    type: "restructure", description: "Significant overlap in cross-departmental project collaboration identified."
  }
];

const ActionCenter = () => {
  const { addToast } = useUIStore();

  const handleSimulate = () => {
    addToast("Loading Digital Twin Simulation...", "info");
  };

  const handleApply = (actionTitle) => {
    addToast(`Action '${actionTitle}' queued for approval.`, "success");
  };

  const generateBoardPresentation = () => {
    addToast("Generating Board Presentation...", "info");
    setTimeout(() => {
      const content = "EXECUTIVE SUMMARY\n\nBased on AI analysis, we recommend three strategic actions:\n1. Hire Additional Engineering Manager\n2. Redistribute Finance Approvals\n3. Merge Product & Design Divisions\n\nFinancial Impact: $2.4M ROI.";
      generateMockPDF("Board_Presentation_Q3", content);
      addToast("Board Presentation Ready for Download.", "success");
    }, 1500);
  };

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '400px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} color="var(--color-primary)" />
            Action Center
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>AI-prioritized organizational recommendations.</p>
        </div>
        <button 
          onClick={generateBoardPresentation}
          className="btn-primary" 
          style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LayoutTemplate size={16} /> Generate Board Presentation
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
        {ACTIONS.map(action => (
          <div key={action.id} style={{ 
            border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px',
            backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '12px',
            transition: 'all 0.2s ease', cursor: 'default'
          }} className="hover:border-primary">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                  {action.title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.4, maxWidth: '90%' }}>
                  {action.description}
                </div>
              </div>
              <div style={{ padding: '4px 8px', backgroundColor: 'var(--color-bg)', borderRadius: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)' }}>
                {action.confidence} Confidence
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '4px' }}>
              <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: action.impact === 'Critical' ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}>
                <ShieldAlert size={14} /> Impact: <strong style={{ color: 'var(--color-text-main)' }}>{action.impact}</strong>
              </span>
              <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)' }}>
                <ArrowRight size={14} /> Diff: <strong style={{ color: 'var(--color-text-main)' }}>{action.difficulty}</strong>
              </span>
              <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)' }}>
                <Clock size={14} /> Time: <strong style={{ color: 'var(--color-text-main)' }}>{action.time}</strong>
              </span>
              <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)' }}>
                <TrendingUp size={14} color="var(--color-success)" /> ROI: <strong style={{ color: 'var(--color-success)' }}>{action.roi}</strong>
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', flex: 1 }}>Review</button>
              <button onClick={handleSimulate} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--color-primary)' }}>
                <Play size={14} /> Simulate
              </button>
              <button onClick={() => handleApply(action.title)} className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Check size={14} /> Apply
              </button>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
};

export default ActionCenter;
