import React, { useState, useEffect } from 'react';
import { Sparkles, X, AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

const AIAnalysisModal = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      setScanProgress(0);
      
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsScanning(false), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        width: '90%',
        maxWidth: '720px',
        maxHeight: '90vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'modalSlideUp 0.3s ease-out'
      }}>
        
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
          {isScanning && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', backgroundColor: 'var(--color-primary)', width: `${scanProgress}%`, transition: 'width 0.1s linear' }} />
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)' }}>
              <Sparkles color="white" size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)', letterSpacing: '-0.025em' }}>
                {isScanning ? 'Running Organizational Intelligence Scan...' : 'AI Responsibility Analysis'}
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>
                {isScanning ? `Analyzing 132 business processes... ${scanProgress}%` : 'Analysis complete. 4 critical issues detected.'}
              </p>
            </div>
          </div>
          
          <button onClick={onClose} disabled={isScanning} className="hover-bg" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: isScanning ? 'not-allowed' : 'pointer', color: 'var(--color-text-muted)', zIndex: 1, opacity: isScanning ? 0.5 : 1 }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {isScanning ? (
            <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
              <div className="pulse-ring" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--color-primary)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
              <div style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 600 }}>Scanning accountability matrices...</div>
            </div>
          ) : (
            <>
              {/* Summary blocks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '20px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)', fontWeight: 800, fontSize: '14px', marginBottom: '8px' }}>
                    <ShieldAlert size={18} /> Structural Risks (2)
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                    <li><strong style={{ color: 'var(--color-danger)' }}>Missing Accountability</strong> in 'Vendor Onboarding'.</li>
                    <li><strong style={{ color: 'var(--color-danger)' }}>Single point of failure</strong> detected on VP Operations.</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '20px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warning)', fontWeight: 800, fontSize: '14px', marginBottom: '8px' }}>
                    <AlertTriangle size={18} /> Process Overlaps (2)
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                    <li><strong style={{ color: 'var(--color-warning)' }}>Duplicate Responsibility</strong> in 'Quarterly Sales Targets'.</li>
                    <li><strong style={{ color: 'var(--color-warning)' }}>Approval Bottleneck</strong> in 'Cloud Infrastructure Pivot'.</li>
                  </ul>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="var(--color-primary)" /> AI Recommendations
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="hover-lift" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>Assign Accountable Owner</div>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>'Vendor Onboarding' requires an Accountable (A) assignee. Suggested: Head of Procurement.</div>
                      </div>
                    </div>
                    <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Apply Fix</button>
                  </div>

                  <div className="hover-lift" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>Resolve Duplicate Responsibility</div>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Sales and HR both have 'R' for 'Performance Review Cycle'. Convert HR to 'A'.</div>
                      </div>
                    </div>
                    <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Apply Fix</button>
                  </div>
                </div>
              </div>

            </>
          )}

        </div>
        
        {/* Footer */}
        {!isScanning && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-success)" /> Analysis securely logged.
            </div>
            <button onClick={onClose} style={{ padding: '10px 24px', backgroundColor: 'white', color: 'var(--color-text-main)', borderRadius: '8px', fontWeight: 700, border: '1px solid var(--color-border)', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIAnalysisModal;
