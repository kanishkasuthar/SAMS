import React from 'react';
import Card from '../common/Card';
import { Download, FileText, FileJson, Mail } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const ExportControls = () => {
  const { addToast } = useUIStore();

  const handleExport = (type) => {
    addToast(`Exporting ${type} format. Check your downloads.`, 'success');
  };

  const exports = [
    { label: 'Executive PDF', icon: FileText, type: 'PDF' },
    { label: 'Raw JSON Payload', icon: FileJson, type: 'JSON' },
    { label: 'Excel Change Log', icon: Download, type: 'Excel' },
    { label: 'Email Summary', icon: Mail, type: 'Email' }
  ];

  return (
    <Card style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--color-text-main)' }}>Export Controls</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {exports.map((exp, idx) => (
          <button 
            key={idx} 
            onClick={() => handleExport(exp.type)}
            style={{ 
              padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', 
              backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', 
              borderRadius: '8px', color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            className="hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600"
          >
            <exp.icon size={16} /> {exp.label}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default ExportControls;
