import React from 'react';
import Card from '../../common/Card';
import { BrainCircuit, ShieldCheck, Activity, Target, AlertTriangle } from 'lucide-react';

const VersionIntelligenceDashboard = () => {
  return (
    <Card style={{ padding: '32px', backgroundColor: 'var(--color-surface)' }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
        <div style={{ padding: 10, backgroundColor: 'var(--color-primary)', borderRadius: 12, color: 'white' }}>
          <BrainCircuit size={20} />
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>Version Intelligence</h3>
      </div>
      
      <div style={{ display: 'flex', gap: '32px' }}>
        
        {/* Left Side: Summary and Risks (Takes 60%) */}
        <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ padding: '24px', backgroundColor: 'var(--color-bg)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--color-text-main)' }}>AI Executive Summary</h4>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-main)', margin: 0 }}>
              Compared with Version 3.1.5, Engineering has expanded, Product has been dissolved, and Finance authority has increased. Overall hierarchy complexity has reduced by <strong style={{color: 'var(--color-success)'}}>9%</strong>. This snapshot represents a structural streamlining towards engineering output.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                <AlertTriangle size={16} color="var(--color-danger)" />
                <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--color-danger)' }}>Key Organizational Risks</h4>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: 6 }}><span style={{color: 'var(--color-danger)'}}>•</span> Engineering lacks formal manager assignment</li>
                <li style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: 6 }}><span style={{color: 'var(--color-danger)'}}>•</span> 2 orphaned projects from Product dissolution</li>
              </ul>
            </div>
            
            <div style={{ flex: 1, padding: '20px', backgroundColor: 'rgba(168, 85, 247, 0.05)', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                <Target size={16} color="var(--color-primary)" />
                <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>AI Recommendations</h4>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: 6 }}><span style={{color: 'var(--color-primary)'}}>•</span> Assign interim manager to Engineering</li>
                <li style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', gap: 6 }}><span style={{color: 'var(--color-primary)'}}>•</span> Map orphaned projects to CTO office</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Large Premium Metrics (Takes 40%) */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ flex: 1, padding: '24px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
             <div style={{ padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}>
               <ShieldCheck size={28} />
             </div>
             <div>
               <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Rollback Confidence</div>
               <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-main)' }}>94%</div>
             </div>
          </div>

          <div style={{ flex: 1, padding: '24px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
             <div style={{ padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
               <Activity size={28} />
             </div>
             <div>
               <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Organization Stability Score</div>
               <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-main)' }}>8.7 / 10</div>
             </div>
          </div>

        </div>

      </div>
    </Card>
  );
};

export default VersionIntelligenceDashboard;
