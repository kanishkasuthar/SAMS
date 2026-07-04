import React from 'react';
import { FileText, Download, Search, Calendar, FileSpreadsheet } from 'lucide-react';
import { REPORTS_DATA } from '../data/mockData';

const Reports = () => {
  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Reports Archive</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Download generated organization and analytics reports.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search reports..." />
          </div>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}>
            <Calendar size={16} />
            <span>Schedule Report</span>
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24}}>
        {REPORTS_DATA.map(report => (
          <div key={report.id} className="card hover:shadow-md transition-shadow" style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
            <div className="flex items-start gap-4">
              <div style={{
                width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
                backgroundColor: report.type === 'PDF' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                color: report.type === 'PDF' ? 'var(--color-danger)' : 'var(--color-success)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {report.type === 'PDF' ? <FileText size={24} /> : <FileSpreadsheet size={24} />}
              </div>
              <div>
                <h3 style={{fontWeight: 600, fontSize: '1.1rem', marginBottom: 4, lineHeight: 1.3}}>{report.name}</h3>
                <span style={{fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500}}>{report.id}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t" style={{borderColor: 'var(--color-border)'}}>
              <div className="flex flex-col">
                 <span style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>Generated</span>
                 <span style={{fontSize: '0.85rem', fontWeight: 600}}>{report.date}</span>
              </div>
              <div className="flex items-center gap-4">
                 <span style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>{report.size}</span>
                 <button className="icon-btn" style={{backgroundColor: 'var(--color-bg)'}}><Download size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
