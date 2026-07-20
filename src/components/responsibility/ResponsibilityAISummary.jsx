import React from 'react';
import { Sparkles, FileText, Settings, ArrowRight } from 'lucide-react';

const ResponsibilityAISummary = ({ onRunAnalysis }) => {
  return (
    <div 
      className="card hover-lift"
      style={{ 
        marginBottom: '32px',
        padding: '32px',
        background: 'linear-gradient(145deg, rgba(79, 70, 229, 0.03) 0%, rgba(99, 102, 241, 0.05) 100%)',
        border: '1px solid rgba(79, 70, 229, 0.2)',
        borderRadius: '24px',
        display: 'flex',
        gap: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-50px', left: '20%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
      
      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)' }}>
        <Sparkles color="white" size={24} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 1 }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.025em', marginBottom: '8px' }}>AI Responsibility Summary</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.6, maxWidth: '800px' }}>
            <strong style={{ color: 'var(--color-primary)' }}>AI has analyzed 132 business processes.</strong><br />
            There are currently <strong style={{ color: 'var(--color-danger)' }}>7 processes</strong> containing conflicting accountability across teams, and <strong style={{ color: 'var(--color-warning)' }}>4 business processes</strong> with no designated responsible owner. 
            Finance and Engineering collaborate most frequently on critical operations, while HR handles the highest consultation workload across all departments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={onRunAnalysis}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'var(--color-primary)', 
              color: 'white', 
              borderRadius: '10px', 
              fontWeight: 700, 
              fontSize: '13px', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(79, 70, 229, 0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)'; }}
          >
            Run AI Analysis <ArrowRight size={16} />
          </button>
          
          <button 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'white', 
              color: 'var(--color-text-main)', 
              borderRadius: '10px', 
              fontWeight: 700, 
              fontSize: '13px', 
              border: '1px solid var(--color-border)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
          >
            <FileText size={16} color="var(--color-text-muted)" /> Generate Report
          </button>

          <button 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'white', 
              color: 'var(--color-text-main)', 
              borderRadius: '10px', 
              fontWeight: 700, 
              fontSize: '13px', 
              border: '1px solid var(--color-border)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
          >
            <Settings size={16} color="var(--color-text-muted)" /> Resolve Issues
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsibilityAISummary;
