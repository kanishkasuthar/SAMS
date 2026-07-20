import React, { useState, useEffect } from 'react';
import { X, Activity, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

const DepartmentAnalysisModal = ({ isOpen, onClose, department }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !department) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '896px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'scale-in 0.2s ease-out' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', color: 'var(--color-primary)' }}>
              <Activity size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Department Analysis Workspace</h2>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Analyzing {department.name} structural health</div>
            </div>
          </div>
          <button onClick={onClose} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', color: 'var(--color-text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-surface)', padding: '24px' }}>
          {loading ? (
            <div style={{ height: '256px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Activity size={40} style={{ marginBottom: '16px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <p style={{ fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>Analyzing {department.name} structure...</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Score Header */}
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', margin: '0 0 4px 0' }}>DEPARTMENT ANALYSIS COMPLETE</h3>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)' }}>Structural Diagnostic Report</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>OVERALL HEALTH</div>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-success)', lineHeight: 1 }}>{department.healthScore || 92} <span style={{ fontSize: '18px', color: 'var(--color-text-muted)', fontWeight: 700 }}>/ 100</span></div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '16px' }}>
                {[
                  { label: 'Structural Stability', score: 86 },
                  { label: 'Authority Distribution', score: 61, alert: true },
                  { label: 'Manager Workload', score: 72 },
                  { label: 'Project Allocation', score: 94 },
                  { label: 'Cross-Dept Connectivity', score: 78 }
                ].map((m, idx) => (
                  <div key={idx} style={{ padding: '16px', borderRadius: '12px', backgroundColor: m.alert ? 'rgba(239, 68, 68, 0.05)' : 'white', border: m.alert ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px', height: '32px', lineHeight: 1.2 }}>{m.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: m.alert ? 'var(--color-danger)' : 'var(--color-text-main)' }}>{m.score} <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 700 }}>/ 100</span></div>
                  </div>
                ))}
              </div>

              {/* Critical Findings */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '16px 24px', borderBottom: '1px solid rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShieldAlert size={20} style={{ color: 'var(--color-danger)' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#7F1D1D', margin: 0 }}>CRITICAL FINDINGS</h3>
                </div>
                
                <div style={{ padding: 0 }}>
                  <div style={{ padding: '24px', borderBottom: '1px solid var(--color-surface-hover)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px', margin: '0 0 4px 0' }}>HIGH AUTHORITY CONCENTRATION</h4>
                      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>43% of {department.name} authority is concentrated in {department.head}.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', border: '1px solid rgba(79, 70, 229, 0.2)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)'}>VIEW ISSUE</button>
                      <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'white', backgroundColor: 'var(--color-danger)', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>SIMULATE FIX</button>
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px', borderBottom: '1px solid var(--color-surface-hover)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px', margin: '0 0 4px 0' }}>MANAGER OVERLOAD</h4>
                      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>{department.head} currently has 26 direct reports, exceeding the recommended max of 12.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', border: '1px solid rgba(79, 70, 229, 0.2)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)'}>VIEW ISSUE</button>
                      <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>APPLY RECOMMENDATION</button>
                    </div>
                  </div>

                  <div style={{ padding: '24px', borderBottom: '1px solid var(--color-surface-hover)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px', margin: '0 0 4px 0' }}>PROJECT DEPENDENCY</h4>
                      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Three active projects require {department.name} approval authority within the next 14 days.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', border: '1px solid rgba(79, 70, 229, 0.2)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)'}>VIEW ISSUE</button>
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px', margin: '0 0 4px 0' }}>SUCCESSION RISK</h4>
                      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>No direct backup exists for Architecture Approval responsibility.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', border: '1px solid rgba(79, 70, 229, 0.2)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)'}>VIEW ISSUE</button>
                      <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'white', backgroundColor: 'var(--color-primary)', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>SIMULATE FIX</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentAnalysisModal;
