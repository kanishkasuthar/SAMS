import React, { useState } from 'react';
import { X, Search, Shield, User } from 'lucide-react';
import { useOrgStore } from '../../../store/orgStore';

const ChangeAuthorityModal = ({ isOpen, onClose, onSelectAuthority }) => {
  const { employees } = useOrgStore();
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '500px', animation: 'scale-in 0.2s ease-out', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(20, 184, 166, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6' }}>
              <Shield size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Change Authority</h2>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Select a new authority owner for this node.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '10px 12px' }}>
            <Search size={16} color="var(--color-text-muted)" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search employees..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', backgroundColor: 'transparent' }} 
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredEmployees.map(emp => (
            <div 
              key={emp.id}
              onClick={() => {
                onSelectAuthority(emp.name);
                onClose();
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'border-color 0.2s', backgroundColor: 'white' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{emp.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{emp.role}</div>
              </div>
            </div>
          ))}
          {filteredEmployees.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
              No employees found matching "{search}"
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChangeAuthorityModal;
