import React from 'react';
import Card from '../common/Card';
import { FileSpreadsheet, Brain, CheckCircle, AlertTriangle, ArrowRight, UploadCloud } from 'lucide-react';

const AIPreUploadAnalysis = ({ onProceed }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right duration-300 flex gap-6">
      <Card style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'var(--color-surface-alt)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '16px', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <FileSpreadsheet size={32} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: 8 }}>Q3_HR_Master_Data.xlsx</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: 24 }}>Analyzed in 0.4s by AI</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', marginBottom: 32 }}>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>482</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Rows Found</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>14</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Columns</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>~1.2s</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Est. Import Time</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: 8, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-success)' }}>24</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Est. Changes</div>
          </div>
        </div>

        <button className="sync-action-btn" onClick={onProceed} style={{ width: '100%', justifyContent: 'center' }}>
          Proceed to Conflict Resolution <ArrowRight size={18} />
        </button>
      </Card>

      <Card style={{ flex: 2, padding: '32px' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
          <Brain size={24} color="var(--color-primary)" />
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>AI Import Analysis</h3>
        </div>

        <div style={{ padding: '16px', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: 8, border: '1px solid rgba(79, 70, 229, 0.1)', marginBottom: 24 }}>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-main)', margin: 0 }}>
            "Your file contains <strong>482 employees</strong>. I've detected <strong>12 duplicate employee IDs</strong> and <strong>4 departments</strong> with missing managers. Overall synchronization confidence is extremely high at <strong>96%</strong>. I recommend reviewing the duplicate records before proceeding."
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { label: 'Duplicate Employees', value: 12, status: 'warning' },
            { label: 'Missing Values', value: 34, status: 'warning' },
            { label: 'Hierarchy Issues', value: 2, status: 'danger' },
            { label: 'Potential Risks', value: 0, status: 'success' },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center" style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{item.label}</span>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '16px', fontWeight: 700, color: `var(--color-${item.status})` }}>{item.value}</span>
                {item.status === 'success' ? <CheckCircle size={16} color="var(--color-success)" /> : <AlertTriangle size={16} color={`var(--color-${item.status})`} />}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AIPreUploadAnalysis;
