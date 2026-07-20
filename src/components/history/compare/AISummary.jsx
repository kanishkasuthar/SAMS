import React from 'react';
import Card from '../../common/Card';
import { Sparkles, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const AISummary = () => {
  return (
    <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
      <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ padding: '10px', backgroundColor: 'var(--color-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 16px rgba(79, 70, 229, 0.2)' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>AI Executive Summary</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0', fontWeight: 500 }}>Comprehensive analysis of organizational structure changes</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Organization Similarity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 64, height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '91%', height: '100%', backgroundColor: 'var(--color-success)' }}></div>
            </div>
            <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-success)', lineHeight: 1 }}>91%</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
        {/* Key Findings */}
        <div style={{ padding: '32px', borderRight: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={16} color="var(--color-primary)" />
            Key Findings
          </h4>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <li style={{ fontSize: '14px', color: 'var(--color-text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ color: 'var(--color-text-muted)' }}>•</span>
              <span style={{ fontWeight: 500, lineHeight: 1.5 }}>3 departments modified across the organization.</span>
            </li>
            <li style={{ fontSize: '14px', color: 'var(--color-text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ color: 'var(--color-text-muted)' }}>•</span>
              <span style={{ fontWeight: 500, lineHeight: 1.5 }}>Engineering lost one manager, increasing span of control for remaining directors.</span>
            </li>
            <li style={{ fontSize: '14px', color: 'var(--color-text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ color: 'var(--color-text-muted)' }}>•</span>
              <span style={{ fontWeight: 500, lineHeight: 1.5 }}>Finance approval chain changed, reducing cycle time by estimated 15%.</span>
            </li>
            <li style={{ fontSize: '14px', color: 'var(--color-text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ color: 'var(--color-text-muted)' }}>•</span>
              <span style={{ fontWeight: 500, lineHeight: 1.5 }}>12 employees added overall, driving a budget increase of $1.2M.</span>
            </li>
          </ul>
        </div>

        {/* Recommendations */}
        <div style={{ padding: '32px', backgroundColor: 'var(--color-surface-alt)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={16} color="var(--color-warning)" />
            Actionable Recommendations
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4 }}>Assign Engineering Manager</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Span of control exceeds optimal range (1:14).</div>
              </div>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Review</button>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4 }}>Review Finance Approval Workflow</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Ensure compliance checks are maintained in new chain.</div>
              </div>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Review</button>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4 }}>Validate Transferred Responsibilities</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Verify that all key roles are covered post-transfer.</div>
              </div>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Review</button>
            </div>

          </div>
        </div>
      </div>
    </Card>
  );
};

export default AISummary;
