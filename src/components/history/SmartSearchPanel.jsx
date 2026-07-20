import React from 'react';
import { Search, Filter } from 'lucide-react';

const SmartSearchPanel = ({ searchTerm, setSearchTerm }) => {
  return (
    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3 style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-text-main)', margin: 0 }}>Timeline Navigator</h3>
      <div className="topbar-search" style={{ width: '100%', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '8px 12px' }}>
        <Search size={16} color="var(--color-text-muted)" />
        <input 
          type="text" 
          placeholder="Search versions, departments, managers..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', marginLeft: 8, fontSize: '13px' }}
        />
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
          <Filter size={16} />
        </button>
      </div>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }} className="hide-scrollbar">
        {['Engineering', 'AI Generated', 'Q3', 'Promotions'].map(tag => (
          <span key={tag} style={{ fontSize: '10px', fontWeight: 600, padding: '4px 8px', borderRadius: '4px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', cursor: 'pointer', whiteSpace: 'nowrap' }} className="hover:bg-slate-100">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SmartSearchPanel;
