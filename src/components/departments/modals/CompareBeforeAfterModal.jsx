import React from 'react';
import { X, GitCompare, Network, ArrowRight } from 'lucide-react';

const CompareBeforeAfterModal = ({ isOpen, onClose, event, department }) => {
  if (!isOpen || !event) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '1024px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'scale-in 0.2s ease-out' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', color: 'var(--color-primary)' }}>
              <GitCompare size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Structural Comparison</h2>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Comparing state before and after: {event.title}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', color: 'var(--color-text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-surface)', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>
              {/* BEFORE COLUMN */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center', margin: 0 }}>Before</h3>
                
                <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--color-surface-hover)' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      MS
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>{event.prevHead || 'Michael Scott'}</div>
                      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Department Head</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Employees</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>100</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Managers</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>6</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '8px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#991B1B', fontWeight: 500 }}>Hierarchy Depth</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-danger)' }}>7</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '8px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#991B1B', fontWeight: 500 }}>Authority Concentration</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-danger)' }}>84%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '8px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#991B1B', fontWeight: 500 }}>Avg Manager Reports</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-danger)' }}>26</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', boxShadow: 'var(--shadow-sm)' }}>
                  <ArrowRight size={20} />
                </div>
              </div>

              {/* AFTER COLUMN */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center', margin: 0 }}>After</h3>
                
                <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '2px solid rgba(79, 70, 229, 0.2)', boxShadow: 'var(--shadow-md)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(79, 70, 229, 0.1)' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {event.newHead ? event.newHead.split(' ').map(n=>n[0]).join('') : 'DC'}
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#312E81' }}>{event.newHead || department.head}</div>
                      <div style={{ fontSize: '14px', color: 'var(--color-primary)' }}>Department Head</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '8px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#065F46', fontWeight: 500 }}>Employees</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>142</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '8px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#065F46', fontWeight: 500 }}>Managers</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>9</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '8px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#065F46', fontWeight: 500 }}>Hierarchy Depth</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>5</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '8px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#065F46', fontWeight: 500 }}>Authority Concentration</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>76%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '8px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#065F46', fontWeight: 500 }}>Avg Manager Reports</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>14</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Structural Impact Summary */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '896px', margin: '0 auto', width: '100%' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', margin: 0 }}>Structural Impact Summary</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px', margin: '8px 0 24px 0' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{department.name}</span> gained 42 employees while reducing hierarchy depth by two levels. 
                Manager distribution significantly improved (reports dropped from 26 to 14) and authority concentration decreased by 8%, indicating a healthier and more scalable structure.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ flex: 1, padding: '12px 20px', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}>
                  <Network size={16} /> View Before in Studio
                </button>
                <button style={{ flex: 1, padding: '12px 20px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(79, 70, 229, 0.2)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)'}>
                  <Network size={16} /> View After in Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBeforeAfterModal;
