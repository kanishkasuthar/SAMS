import React from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, MessageSquare } from 'lucide-react';
import { PEOPLE_DIRECTORY } from '../data/mockData';

const People = () => {
  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>People Directory</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Browse and manage 14,205 organization members.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 300, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search by name, role, or ID..." />
          </div>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="card" style={{overflowX: 'auto'}}>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: 'rgba(15, 23, 42, 0.02)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)'}}>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Employee</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Role</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Department</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Location</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Status</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', width: 100}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {PEOPLE_DIRECTORY.map((person, index) => (
              <tr key={person.id} style={{borderBottom: index === PEOPLE_DIRECTORY.length - 1 ? 'none' : '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}} className="hover:bg-gray-50">
                <td style={{padding: '16px 24px'}}>
                  <div className="flex items-center gap-3">
                    <div style={{width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.9rem'}}>
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <span style={{fontWeight: 600, color: 'var(--color-text-main)'}}>{person.name}</span>
                      <span style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>{person.id}</span>
                    </div>
                  </div>
                </td>
                <td style={{padding: '16px 24px', color: 'var(--color-text-main)', fontSize: '0.9rem', fontWeight: 500}}>{person.role}</td>
                <td style={{padding: '16px 24px'}}>
                  <span style={{padding: '4px 10px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 500, backgroundColor: 'rgba(15, 23, 42, 0.05)', color: 'var(--color-text-main)'}}>
                    {person.department}
                  </span>
                </td>
                <td style={{padding: '16px 24px', color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>{person.location}</td>
                <td style={{padding: '16px 24px'}}>
                  <div className="flex items-center gap-2">
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      backgroundColor: person.status === 'Online' ? 'var(--color-success)' : person.status === 'Busy' ? 'var(--color-warning)' : 'var(--color-text-muted)'
                    }}></span>
                    <span style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>{person.status}</span>
                  </div>
                </td>
                <td style={{padding: '16px 24px'}}>
                  <div className="flex gap-2">
                    <button className="icon-btn" style={{width: 32, height: 32}}><MessageSquare size={16} /></button>
                    <button className="icon-btn" style={{width: 32, height: 32}}><MoreHorizontal size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default People;
