import React from 'react';
import Card from '../common/Card';
import { BrainCircuit, TrendingDown, TrendingUp, AlertCircle, Zap } from 'lucide-react';

const AIPredictionEngine = () => {
  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
        <BrainCircuit size={18} color="var(--color-primary)" />
        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>AI Restore Predictions</h3>
      </div>
      
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 20 }}>
        If this version is restored, our predictive models anticipate the following organizational impacts:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <div className="flex justify-between items-start" style={{ marginBottom: 8 }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>EXPECTED AUTHORITY SCORE</span>
            <TrendingDown size={14} color="var(--color-warning)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>84% <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-warning)' }}>(-8%)</span></div>
        </div>
        
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <div className="flex justify-between items-start" style={{ marginBottom: 8 }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>ESTIMATED BUDGET IMPACT</span>
            <TrendingUp size={14} color="var(--color-success)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>$12.4M <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>(+$1.2M)</span></div>
        </div>
      </div>

      <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>Detected Conflicts</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <AlertCircle size={16} color="var(--color-warning)" />
          <span style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>2 Active projects will be orphaned due to missing departments.</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <AlertCircle size={16} color="var(--color-warning)" />
          <span style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>14 recently promoted employees will revert to their previous titles.</span>
        </div>
      </div>

      <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>Recommended Actions</h4>
      <button style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} className="hover-lift">
        <Zap size={14} /> Auto-Reassign Orphaned Projects
      </button>

    </Card>
  );
};

export default AIPredictionEngine;
