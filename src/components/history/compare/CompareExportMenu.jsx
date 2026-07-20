import React from 'react';
import Card from '../../common/Card';
import { Download, FileText, FileJson, Briefcase, FileSpreadsheet } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';

const CompareExportMenu = () => {
  const { addToast } = useUIStore();

  const handleExport = (type) => {
    addToast(`Exporting ${type} format. Check your downloads.`, 'success');
  };

  const exports = [
    { label: 'Executive PDF', icon: FileText, type: 'PDF', bg: 'var(--color-primary)' },
    { label: 'Excel', icon: FileSpreadsheet, type: 'Excel', bg: 'var(--color-success)' },
    { label: 'PowerPoint', icon: Briefcase, type: 'PowerPoint', bg: 'var(--color-warning)' },
    { label: 'JSON Payload', icon: FileJson, type: 'JSON', bg: 'var(--color-text-main)' }
  ];

  return (
    <Card style={{ padding: '20px', backgroundColor: 'var(--color-surface)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>Export Analysis</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {exports.map((exp, idx) => (
          <button 
            key={idx} 
            onClick={() => handleExport(exp.type)}
            style={{ 
              padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', 
              backgroundColor: 'white', border: '1px solid var(--color-border)', 
              borderRadius: '8px', color: 'var(--color-text-main)', fontSize: '11px', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center'
            }}
            className="hover:bg-slate-50 hover:border-indigo-200 hover-lift"
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: `${exp.bg}15`, color: exp.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <exp.icon size={16} />
            </div>
            {exp.label}
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => handleExport('AI Summary')}
        style={{ marginTop: '16px', width: '100%', padding: '12px', backgroundColor: 'transparent', border: '1px dashed var(--color-border)', borderRadius: '8px', color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        className="hover:bg-slate-50 hover-lift"
      >
        <Download size={14} style={{ display: 'inline', marginRight: 6 }} /> Download AI Executive Summary
      </button>
    </Card>
  );
};

export default CompareExportMenu;
