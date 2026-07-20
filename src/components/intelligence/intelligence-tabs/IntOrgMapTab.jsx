import React from 'react';
import { ArrowDown, Maximize2, Users, Network } from 'lucide-react';
import { useOrgStore } from '../../../store/orgStore';

const IntOrgMapTab = ({ employee, onFocusInStudio }) => {
  const { people } = useOrgStore();

  if (!employee) return null;

  // Resolve relationships
  const manager = employee.managerId ? people.find(p => p.id === employee.managerId) : null;
  const directReports = (employee.directReportIds || []).map(id => people.find(p => p.id === id)).filter(Boolean);
  const peers = (employee.peerIds || []).map(id => people.find(p => p.id === id)).filter(Boolean);

  const renderNode = (emp, isCenter = false) => {
    if (!emp) return null;
    return (
      <div 
        key={emp.id}
        style={{
          padding: '12px 16px',
          backgroundColor: isCenter ? 'rgba(79, 70, 229, 0.1)' : 'var(--color-surface)',
          border: `1px solid ${isCenter ? 'var(--color-primary)' : 'var(--color-border)'}`,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          minWidth: 220,
          boxShadow: isCenter ? '0 0 0 4px rgba(79, 70, 229, 0.05)' : 'var(--shadow-sm)',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        className="hover:border-primary"
      >
        <div style={{ position: 'relative' }}>
          {emp.photo ? (
            <img src={emp.photo} alt={emp.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>
              {emp.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: isCenter ? 'var(--color-primary)' : 'var(--color-text-main)' }}>{emp.name}</div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{emp.role}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Network size={16} color="var(--color-primary)" />
          PERSONAL ORGANIZATION MAP
        </h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={14} /> VIEW FULL HIERARCHY
          </button>
          <button 
            className="btn-primary" 
            style={{ fontSize: '12px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => onFocusInStudio && onFocusInStudio(employee.id)}
          >
            <Maximize2 size={14} /> FOCUS IN ORGANIZATION STUDIO
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '40px', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowX: 'auto' }}>
        
        {/* Manager */}
        {manager && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {renderNode(manager)}
            <div style={{ height: 30, width: 1, backgroundColor: 'var(--color-border)', margin: '4px 0' }} />
            <ArrowDown size={14} color="var(--color-text-muted)" style={{ marginBottom: 4 }} />
          </div>
        )}

        {/* Center Row (Employee + Peers) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {peers.slice(0, 1).map(peer => (
            <React.Fragment key={peer.id}>
              {renderNode(peer)}
              <div style={{ height: 1, width: 30, backgroundColor: 'var(--color-border)', borderTop: '1px dashed var(--color-border)' }} />
            </React.Fragment>
          ))}

          {/* Selected Employee */}
          <div style={{ zIndex: 10 }}>
            {renderNode(employee, true)}
          </div>

          {peers.slice(1, 2).map(peer => (
            <React.Fragment key={peer.id}>
              <div style={{ height: 1, width: 30, backgroundColor: 'var(--color-border)', borderTop: '1px dashed var(--color-border)' }} />
              {renderNode(peer)}
            </React.Fragment>
          ))}
        </div>

        {/* Direct Reports */}
        {directReports.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
            <ArrowDown size={14} color="var(--color-primary)" style={{ marginTop: 4, marginBottom: 4 }} />
            <div style={{ height: 20, width: 1, backgroundColor: 'var(--color-primary)', opacity: 0.5 }} />
            
            {/* Horizontal connection line for reports */}
            {directReports.length > 1 && (
              <div style={{ height: 1, width: Math.min((directReports.length - 1) * 240, 600), backgroundColor: 'var(--color-primary)', opacity: 0.5 }} />
            )}
            
            <div style={{ display: 'flex', gap: 20, marginTop: directReports.length > 1 ? 0 : -1 }}>
              {directReports.slice(0, 4).map(report => (
                <div key={report.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {directReports.length > 1 && <div style={{ height: 20, width: 1, backgroundColor: 'var(--color-primary)', opacity: 0.5 }} />}
                  {renderNode(report)}
                </div>
              ))}
              {directReports.length > 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <div style={{ height: 20, width: 1, backgroundColor: 'var(--color-primary)', opacity: 0.5 }} />
                  <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px dashed var(--color-border)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    +{directReports.length - 4} more
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntOrgMapTab;
