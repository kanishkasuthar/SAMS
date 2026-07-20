import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, AlertTriangle, PlayCircle, Lock, Layers, Network, Briefcase } from 'lucide-react';
import DepartmentSplitSimulatorModal from '../DepartmentSplitSimulatorModal';

const DeptAuthorityTab = ({ department, employees }) => {
  const [showSplitModal, setShowSplitModal] = useState(false);

  // Fake ranking for ladder
  const rankedEmployees = [...employees].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 8);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 3-COLUMN LAYOUT */}
      <div className="department-authority-grid">
        
        {/* COLUMN 1: AUTHORITY LADDER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="label-with-icon" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} /> <span>Authority Ladder</span>
            </h3>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Top 8</span>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
            {rankedEmployees.map((emp, idx) => (
              <div key={emp.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', borderBottom: idx === rankedEmployees.length - 1 ? 'none' : '1px solid var(--color-surface-hover)', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0, backgroundColor: idx === 0 ? 'var(--color-primary)' : (idx < 3 ? 'rgba(79, 70, 229, 0.1)' : 'var(--color-surface-hover)'), color: idx === 0 ? 'white' : (idx < 3 ? 'var(--color-primary)' : 'var(--color-text-secondary)'), boxShadow: idx === 0 ? 'var(--shadow-md)' : 'none' }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="truncate" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{emp.name}</div>
                  <div className="truncate" style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{emp.role}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-primary)' }}>{96 - (idx * 11)}</div>
                  <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: AUTHORITY CONCENTRATION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="label-with-icon" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              <ShieldAlert size={18} style={{ color: 'var(--color-danger)' }} /> <span>Concentration Risk</span>
            </h3>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', padding: '4px 8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#B91C1C', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '4px' }}>High</span>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '8px', backgroundColor: 'var(--color-danger)' }}></div>
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderBottom: '1px solid rgba(239, 68, 68, 0.1)', backgroundColor: 'rgba(239, 68, 68, 0.05)', flex: 1 }}>
              <div style={{ fontSize: '60px', fontWeight: 900, color: 'var(--color-danger)', marginBottom: '8px', lineHeight: 1 }}>43%</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Concentration</div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{department.head}</span> controls nearly half of all departmental authority and decision pathways.
              </p>
              
              <div style={{ width: '100%', textAlign: 'left', backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)', marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Key Bottlenecks</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  <li className="label-with-icon"><Lock size={14} style={{ color: 'rgba(239, 68, 68, 0.6)' }}/> <span>Architecture Decisions</span></li>
                  <li className="label-with-icon"><Lock size={14} style={{ color: 'rgba(239, 68, 68, 0.6)' }}/> <span>Technical Hiring</span></li>
                  <li className="label-with-icon"><Lock size={14} style={{ color: 'rgba(239, 68, 68, 0.6)' }}/> <span>Engineering Budget</span></li>
                  <li className="label-with-icon"><Lock size={14} style={{ color: 'rgba(239, 68, 68, 0.6)' }}/> <span>Project Approval</span></li>
                </ul>
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => setShowSplitModal(true)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', backgroundColor: 'var(--color-danger)', color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', border: 'none', boxShadow: 'var(--shadow-sm)' }}
              >
                <PlayCircle size={16} /> Run Continuity Simulation
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 3: DECISION DEPENDENCIES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="label-with-icon" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              <Layers size={18} style={{ color: 'var(--color-primary)' }} /> <span>Decision Dependencies</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
              <div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '4px' }}>18</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>Decision Flows</div>
              </div>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Network size={20}/>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
              <div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '4px' }}>12</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>Approval Responsibilities</div>
              </div>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={20}/>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
              <div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '4px' }}>6</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>Project Authorities</div>
              </div>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={20}/>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)', boxShadow: 'var(--shadow-sm)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
              <div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: 'var(--color-danger)', marginBottom: '4px' }}>3</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#991B1B' }}>Critical Dependencies</div>
              </div>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20}/>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <DepartmentSplitSimulatorModal 
        isOpen={showSplitModal}
        onClose={() => setShowSplitModal(false)}
        department={department}
      />
    </div>
  );
};

export default DeptAuthorityTab;
