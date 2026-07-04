import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

const RACI_DATA = [
  { process: 'Annual Budget Approval', eng: 'C', sales: 'C', exec: 'A', finance: 'R', hr: 'I' },
  { process: 'Hiring New VP', eng: 'I', sales: 'I', exec: 'R', finance: 'A', hr: 'C' },
  { process: 'Cloud Infrastructure Pivot', eng: 'R', sales: 'I', exec: 'A', finance: 'C', hr: 'I' },
  { process: 'Quarterly Sales Targets', eng: 'I', sales: 'R', exec: 'A', finance: 'C', hr: 'I' },
  { process: 'Enterprise Software License', eng: 'C', sales: 'C', exec: 'A', finance: 'R', hr: 'I' },
  { process: 'Performance Review Cycle', eng: 'R', sales: 'R', exec: 'A', finance: 'I', hr: 'R' },
];

const getRaciBadge = (type) => {
  switch (type) {
    case 'R': return <span style={{padding: '4px 8px', borderRadius: 4, backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem'}}>R - Responsible</span>;
    case 'A': return <span style={{padding: '4px 8px', borderRadius: 4, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', fontWeight: 700, fontSize: '0.8rem'}}>A - Accountable</span>;
    case 'C': return <span style={{padding: '4px 8px', borderRadius: 4, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', fontWeight: 700, fontSize: '0.8rem'}}>C - Consulted</span>;
    case 'I': return <span style={{padding: '4px 8px', borderRadius: 4, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', fontWeight: 700, fontSize: '0.8rem'}}>I - Informed</span>;
    default: return null;
  }
};

const ResponsibilityMatrix = () => {
  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Responsibility Matrix (RACI)</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Define cross-departmental roles and authorities for key processes.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search processes..." />
          </div>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="card" style={{overflowX: 'auto'}}>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: 'rgba(15, 23, 42, 0.02)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-main)'}}>
              <th style={{padding: '24px', fontWeight: 600, borderRight: '1px solid var(--color-border)', width: 300}}>Business Process</th>
              <th style={{padding: '24px', fontWeight: 600, textAlign: 'center'}}>Executive</th>
              <th style={{padding: '24px', fontWeight: 600, textAlign: 'center'}}>Finance</th>
              <th style={{padding: '24px', fontWeight: 600, textAlign: 'center'}}>Engineering</th>
              <th style={{padding: '24px', fontWeight: 600, textAlign: 'center'}}>Sales</th>
              <th style={{padding: '24px', fontWeight: 600, textAlign: 'center'}}>HR</th>
            </tr>
          </thead>
          <tbody>
            {RACI_DATA.map((row, idx) => (
              <tr key={idx} style={{borderBottom: idx === RACI_DATA.length - 1 ? 'none' : '1px solid var(--color-border)', backgroundColor: idx % 2 === 0 ? 'var(--color-surface)' : 'rgba(248, 250, 252, 0.5)'}}>
                <td style={{padding: '20px 24px', fontWeight: 600, color: 'var(--color-text-main)', borderRight: '1px solid var(--color-border)'}}>{row.process}</td>
                <td style={{padding: '20px 24px', textAlign: 'center'}}>{getRaciBadge(row.exec)}</td>
                <td style={{padding: '20px 24px', textAlign: 'center'}}>{getRaciBadge(row.finance)}</td>
                <td style={{padding: '20px 24px', textAlign: 'center'}}>{getRaciBadge(row.eng)}</td>
                <td style={{padding: '20px 24px', textAlign: 'center'}}>{getRaciBadge(row.sales)}</td>
                <td style={{padding: '20px 24px', textAlign: 'center'}}>{getRaciBadge(row.hr)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex gap-6 mt-8 p-4 rounded-lg bg-white border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600"><span className="font-bold text-indigo-600">R</span> Responsible (Does the work)</div>
        <div className="flex items-center gap-2 text-sm text-gray-600"><span className="font-bold text-red-500">A</span> Accountable (Final sign-off)</div>
        <div className="flex items-center gap-2 text-sm text-gray-600"><span className="font-bold text-amber-500">C</span> Consulted (Provides input)</div>
        <div className="flex items-center gap-2 text-sm text-gray-600"><span className="font-bold text-emerald-500">I</span> Informed (Kept in the loop)</div>
      </div>
    </div>
  );
};

export default ResponsibilityMatrix;
