import React, { useState } from 'react';
import { Users, ChevronRight } from 'lucide-react';
import EmployeeProfile from './EmployeeProfile';

const ManagerAnalysis = ({ managers }) => {
  const [selectedManager, setSelectedManager] = useState(null);

  if (!managers) return null;

  return (
    <>
      <div className="card" style={{ 
        padding: '24px', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '16px', 
        border: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <Users size={20} color="var(--color-primary)" /> Manager Workload
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {managers.map((manager, idx) => (
            <div 
              key={manager.id || idx} 
              onClick={() => setSelectedManager(manager)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 16, 
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                padding: '12px',
                borderRadius: 8,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <img src={manager.photo} alt={manager.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{manager.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{manager.department} • {manager.directReports} Reports</div>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: manager.risk === 'High' ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                    {manager.workload}% Load
                  </div>
                </div>
                
                <div style={{ height: 6, backgroundColor: 'var(--color-surface-alt)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    backgroundColor: manager.risk === 'High' ? 'var(--color-danger)' : 'var(--color-warning)',
                    width: `${Math.min(manager.workload, 100)}%`,
                    borderRadius: 3
                  }}></div>
                </div>
              </div>

              <ChevronRight size={16} color="var(--color-text-muted)" />
            </div>
          ))}
        </div>
      </div>
      
      <EmployeeProfile 
        isOpen={!!selectedManager}
        onClose={() => setSelectedManager(null)}
        employee={selectedManager}
      />
    </>
  );
};

export default ManagerAnalysis;
