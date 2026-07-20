import React from 'react';
import { Sparkles, AlertTriangle, ShieldAlert, Activity, Users, Network } from 'lucide-react';

const DeptOverviewTab = ({ department, employees, onAnalysisClick }) => {
  return (
    <div className="department-overview-grid">
      
      {/* LEFT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* AI Brief */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-primary)', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--shadow-sm)', padding: '32px' }}>
          <div className="label-with-icon" style={{ marginBottom: '16px', color: 'var(--color-primary)', fontSize: '18px', fontWeight: 700 }}>
            <Sparkles size={20} />
            <span>AI Department Brief</span>
          </div>
          
          <div style={{ color: 'var(--color-text-main)', lineHeight: 1.6, fontSize: '15px' }}>
            <p style={{ marginBottom: '16px' }}>
              <span style={{ fontWeight: 700, color: '#000' }}>{department.name}</span> is a highly influential technical department with strong project authority. 
              Currently classified as a <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{department.dnaType || 'STRATEGIC AUTHORITY HUB'}</span>.
            </p>
            <p style={{ marginBottom: '24px' }}>
              The department oversees <span style={{ fontWeight: 700, color: '#000' }}>{employees.length} employees</span> and directly supports <span style={{ fontWeight: 700, color: '#000' }}>{department.projectCount || 0} active projects</span> across the organization.
            </p>
            
            {(department.authorityConcentration === 'HIGH' || department.authorityConcentration === 'CRITICAL') ? (
              <div style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--color-danger)', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <ShieldAlert size={20} style={{ color: 'var(--color-danger)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontWeight: 700, color: '#7F1D1D', fontSize: '14px', marginBottom: '4px' }}>STRUCTURAL RISK DETECTED</p>
                  <p style={{ fontSize: '14px', color: '#991B1B' }}>Current structural risks are primarily related to manager workload and concentrated architecture approval authority around {department.head}.</p>
                </div>
              </div>
            ) : (
              <div style={{ padding: '16px', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--color-success)', marginBottom: '24px' }}>
                <p style={{ fontSize: '14px', color: '#065F46' }}>Authority is well distributed. The manager reporting span is within recommended limits.</p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <button onClick={onAnalysisClick} style={{ backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} /> View Full Analysis
            </button>
            <button style={{ backgroundColor: 'white', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700 }}>
              Generate New Brief
            </button>
          </div>
        </div>

        {/* Structural Overview */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>Structural Overview</h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Current department structure and organizational span.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '10px' }}>
              <div className="label-with-icon" style={{ marginBottom: '8px' }}>
                <Users size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{employees.length}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>TOTAL HEADCOUNT</div>
            </div>
            
            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '10px' }}>
              <div className="label-with-icon" style={{ marginBottom: '8px' }}>
                <Users size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{Math.floor(employees.length * 0.15) || 2}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>MANAGERS</div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '10px' }}>
              <div className="label-with-icon" style={{ marginBottom: '8px' }}>
                <Users size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{Math.floor(employees.length * 0.85) || 3}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>INDIVIDUAL CONTRIBUTORS</div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '10px' }}>
              <div className="label-with-icon" style={{ marginBottom: '8px' }}>
                <Network size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>4</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>HIERARCHY LEVELS</div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '10px' }}>
              <div className="label-with-icon" style={{ marginBottom: '8px' }}>
                <Network size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{department.projectCount || 8}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>ACTIVE PROJECTS</div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '10px' }}>
              <div className="label-with-icon" style={{ marginBottom: '8px' }}>
                <Network size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>14</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>CROSS-DEPT LINKS</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Department Pulse */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>Department Pulse</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>HEALTH</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-success)' }}>{department.healthScore || 92} / 100</span>
              </div>
              <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--color-border)', borderRadius: '9999px' }}>
                <div style={{ height: '100%', width: `${department.healthScore || 92}%`, backgroundColor: 'var(--color-success)', borderRadius: '9999px' }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>STABILITY</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-success)' }}>86 / 100</span>
              </div>
              <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--color-border)', borderRadius: '9999px' }}>
                <div style={{ height: '100%', width: '86%', backgroundColor: 'var(--color-success)', borderRadius: '9999px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>PROJECT ALLOCATION</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-success)' }}>94 / 100</span>
              </div>
              <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--color-border)', borderRadius: '9999px' }}>
                <div style={{ height: '100%', width: '94%', backgroundColor: 'var(--color-success)', borderRadius: '9999px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>MANAGER LOAD</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-warning)' }}>72 / 100</span>
              </div>
              <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--color-border)', borderRadius: '9999px' }}>
                <div style={{ height: '100%', width: '72%', backgroundColor: 'var(--color-warning)', borderRadius: '9999px' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Risks */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px' }}>
          <div className="label-with-icon" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>
            <AlertTriangle size={16} style={{ color: 'var(--color-warning)' }} />
            <span>Current Risks</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#991B1B', marginBottom: '4px' }}>HIGH</div>
              <div style={{ fontSize: '14px', color: '#7F1D1D', fontWeight: 600, marginBottom: '2px' }}>Manager Workload</div>
              <div style={{ fontSize: '12px', color: '#991B1B', marginBottom: '8px' }}>{department.head} has 26 direct reports.</div>
              <button style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>VIEW ISSUE</button>
            </div>
            
            <div style={{ padding: '12px', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#92400E', marginBottom: '4px' }}>MEDIUM</div>
              <div style={{ fontSize: '14px', color: '#78350F', fontWeight: 600, marginBottom: '2px' }}>Authority Concentration</div>
              <div style={{ fontSize: '12px', color: '#92400E', marginBottom: '8px' }}>43% of technical authority is concentrated in one role.</div>
              <button style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>VIEW ISSUE</button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', backgroundColor: 'transparent', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}>
              Open in Organization Studio
            </button>
            <button onClick={onAnalysisClick} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', backgroundColor: 'transparent', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}>
              Run Department Analysis
            </button>
            <button style={{ width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', backgroundColor: 'transparent', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}>
              Simulate Reorganization
            </button>
            <button style={{ width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', backgroundColor: 'transparent', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}>
              View Department History
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DeptOverviewTab;
