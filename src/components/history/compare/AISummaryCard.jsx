import React from 'react';
import Card from '../../common/Card';
import { BrainCircuit } from 'lucide-react';

const AISummaryCard = () => {
  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--color-surface-alt)', borderLeft: '4px solid var(--color-primary)' }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8, backgroundColor: 'var(--color-primary)', borderRadius: 10, color: 'white' }}>
          <BrainCircuit size={18} />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>AI Change Summary</h3>
      </div>
      
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-main)', margin: '0 0 16px 0' }}>
        Compared with Version 3.1.5, Engineering has expanded, Product has been dissolved, and Finance authority has increased. Overall hierarchy complexity has reduced by <strong style={{color: 'var(--color-success)'}}>9%</strong>.
      </p>

      <div style={{ display: 'flex', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Risk Level</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-warning)' }}>Medium</div>
        </div>
        <div style={{ width: 1, backgroundColor: 'var(--color-border)' }}></div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Rollback Safety</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-success)' }}>94%</div>
        </div>
      </div>
    </Card>
  );
};

export default AISummaryCard;
