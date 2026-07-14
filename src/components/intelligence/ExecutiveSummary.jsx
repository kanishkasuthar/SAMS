import React, { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';

const ExecutiveSummary = ({ summaryData }) => {
  const navigate = useNavigate();
  const { addToast } = useUIStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const [summaryText, setSummaryText] = useState('"Your organization is structurally healthy with a 94% health score. Three departments require attention due to manager workload and reporting depth. Engineering has the highest structural risk."');

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setSummaryText('"Recent structural changes have optimized the Engineering department. Overall health has increased to 96%. Manager workload across the organization is now within optimal bands, though 2 minor risks remain in Marketing."');
      addToast('New executive summary generated successfully.', 'success');
    }, 2500);
  };

  return (
    <div style={{ 
      padding: '24px', 
      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(79, 70, 229, 0.08) 100%)',
      border: '1px solid rgba(79, 70, 229, 0.2)',
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
    }}>
      {/* Decorative background element */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }}></div>
      
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={20} color="var(--color-primary)" /> Today's Organization Intelligence
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
          AI analysis based on your latest hierarchy, employee and project data.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 32, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* Left Side: Summary Text */}
        <div style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
          {summaryText}
        </div>

        {/* Right Side: Indicators */}
        <div style={{ display: 'flex', gap: 24, justifyContent: 'flex-end', borderLeft: '1px solid var(--color-border)', paddingLeft: 32 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-warning)', lineHeight: 1 }}>3</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={14} /> Issues Detected</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1 }}>2</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={14} /> Recommendations</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-danger)', lineHeight: 1 }}>1</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}><ShieldAlert size={14} /> Critical Risk</div>
          </div>

        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 8, position: 'relative', zIndex: 1 }}>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/analytics')}
          style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          View Full Analysis <ArrowRight size={16} />
        </button>
        <button 
          className="btn-secondary" 
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, opacity: isGenerating ? 0.7 : 1 }}
        >
          {isGenerating ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : 'Generate New Summary'}
        </button>
      </div>

    </div>
  );
};

export default ExecutiveSummary;
