import React, { useState } from 'react';
import { useOrgStore } from '../../../store/orgStore';
import { useRoleStore } from '../../../store/roleStore';
import { Search, Filter, MoreHorizontal, ShieldAlert, Calendar } from 'lucide-react';

const RoleUsersTab = ({ role }) => {
  const { people } = useOrgStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock assigning some people to this role based on the total users count
  // In reality, this would filter people based on their assigned roleId
  const assignedUsers = people.slice(0, Math.min(role.users || 0, 10)); // Just taking a few for the mock

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface-hover)', padding: '8px 12px', borderRadius: '8px', width: '300px' }}>
          <Search size={16} style={{ color: 'var(--color-text-muted)', marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search assigned users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', width: '100%', color: 'var(--color-text-main)' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Showing {assignedUsers.length} of {role.users}</span>
          <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', cursor: 'pointer' }}>Export List</button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Employee</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Department</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Assignment Date</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Last Login</th>
              <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedUsers.map((user, idx) => (
              <tr key={idx} style={{ borderBottom: idx < assignedUsers.length - 1 ? '1px solid var(--color-surface-hover)' : 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-border)', overflow: 'hidden' }}>
                      {user.photo ? <img src={user.photo} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{user.name.charAt(0)}</div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{user.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{user.role}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--color-text-main)' }}>
                  <span style={{ backgroundColor: 'var(--color-surface)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>{user.department}</span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> 12 Jan 2025</div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  2 hours ago
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button style={{ color: 'var(--color-text-muted)', padding: '8px', borderRadius: '8px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-border)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><MoreHorizontal size={16} /></button>
                </td>
              </tr>
            ))}
            {assignedUsers.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No users assigned to this role.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleUsersTab;
