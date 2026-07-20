import React, { useState } from 'react';
import { Users, Filter, Search, MoreHorizontal, MessageSquare, User, Network, Briefcase, History } from 'lucide-react';

const DeptPeopleTab = ({ department, employees }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }} onClick={() => setActiveDropdown(null)}>
      
      {/* Search and Filters */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', maxWidth: '400px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search employees..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-hover)', fontSize: '14px', color: 'var(--color-text-main)' }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['ALL', 'LEADERS', 'MANAGERS', 'HIGH AUTHORITY', 'OVERLOADED', 'UNASSIGNED'].map(f => (
            <button 
              key={f} 
              style={{
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '8px',
                border: f === 'ALL' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: f === 'ALL' ? 'var(--color-primary)' : 'white',
                color: f === 'ALL' ? 'white' : 'var(--color-text-secondary)',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
          <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
            <Filter size={14} /> More Filters
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', width: '100%' }}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Employee</th>
                <th style={{ padding: '16px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                <th style={{ padding: '16px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manager</th>
                <th style={{ padding: '16px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Authority Type</th>
                <th style={{ padding: '16px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Workload</th>
                <th style={{ padding: '16px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Projects</th>
                <th style={{ padding: '16px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No employees match your search criteria.</td>
                </tr>
              ) : (
                filteredEmployees.map((emp, idx) => (
                  <tr key={emp.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
                          {emp.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', cursor: 'pointer' }}>{emp.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 16px', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-main)' }}>{emp.role}</td>
                    <td style={{ padding: '16px 16px', fontSize: '14px', color: 'var(--color-text-main)' }}>{idx === 0 ? 'Board' : department.head}</td>
                    <td style={{ padding: '16px 16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                        {idx === 0 ? 'STRATEGIC DECISION MAKER' : (idx < 3 ? 'TECHNICAL AUTHORITY' : 'CONTRIBUTOR')}
                      </span>
                    </td>
                    <td style={{ padding: '16px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', width: '100%' }}>
                        <div style={{ width: '64px', height: '6px', backgroundColor: 'var(--color-border)', borderRadius: '9999px', overflow: 'hidden', flexShrink: 0 }}>
                          <div style={{ height: '100%', width: `${emp.workload || Math.floor(Math.random() * 60 + 20)}%`, backgroundColor: parseInt(emp.workload || '0') > 80 ? 'var(--color-danger)' : 'var(--color-success)' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', width: '32px', textAlign: 'right' }}>{emp.workload || Math.floor(Math.random() * 60 + 20)}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 16px', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{Math.floor(Math.random() * 5) + 1}</td>
                    <td style={{ padding: '16px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>{emp.status || 'Active'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', position: 'relative' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === emp.id ? null : emp.id); }}
                        style={{ padding: '6px', color: 'var(--color-text-muted)', backgroundColor: 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      
                      {activeDropdown === emp.id && (
                        <div style={{ position: 'absolute', right: '32px', top: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)', width: '192px', zIndex: 50, padding: '4px 0', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                          <button style={{ padding: '8px 16px', backgroundColor: 'transparent', border: 'none', fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <MessageSquare size={14}/> Message
                          </button>
                          <button style={{ padding: '8px 16px', backgroundColor: 'transparent', border: 'none', fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <User size={14}/> View Profile
                          </button>
                          <button style={{ padding: '8px 16px', backgroundColor: 'transparent', border: 'none', fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Network size={14}/> View in Hierarchy
                          </button>
                          <button style={{ padding: '8px 16px', backgroundColor: 'transparent', border: 'none', fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Briefcase size={14}/> View Projects
                          </button>
                          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0', width: '100%' }}></div>
                          <button style={{ padding: '8px 16px', backgroundColor: 'transparent', border: 'none', fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <History size={14}/> View History
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeptPeopleTab;
