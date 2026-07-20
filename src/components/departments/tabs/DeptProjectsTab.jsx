import React from 'react';
import { Briefcase, Activity, AlertTriangle, Users, Layers, ShieldAlert, FileText, Share2, MoreHorizontal } from 'lucide-react';
import { useOrgStore } from '../../../store/orgStore';

const DeptProjectsTab = ({ department }) => {
  const { projects } = useOrgStore();
  
  // Fake filter for now
  const deptProjects = projects.slice(0, department.projectCount || 6);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', width: '100%' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Active Projects</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>{deptProjects.length}</div>
          </div>
          <Briefcase size={24} style={{ color: 'var(--color-text-muted)' }} />
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Total Allocation</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-text-main)' }}>142 <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Employees</span></div>
          </div>
          <Users size={24} style={{ color: 'var(--color-text-muted)' }} />
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-danger)', textTransform: 'uppercase' }}>At Risk</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-danger)' }}>2</div>
          </div>
          <AlertTriangle size={24} style={{ color: 'rgba(239, 68, 68, 0.3)' }} />
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Approval Dependencies</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-primary)' }}>14</div>
          </div>
          <ShieldAlert size={24} style={{ color: 'rgba(79, 70, 229, 0.3)' }} />
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>Department Portfolio</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ fontSize: '12px', fontWeight: 700, padding: '6px 12px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '4px', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>Sort: Priority</button>
            <button style={{ fontSize: '12px', fontWeight: 700, padding: '6px 12px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '4px', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>Filter: All</button>
          </div>
        </div>
        
        <div className="department-projects-grid">
          {deptProjects.map((proj, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', cursor: 'pointer', overflow: 'hidden' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--color-surface-hover)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>{proj.name}</h4>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '9999px', textTransform: 'uppercase', backgroundColor: proj.status === 'On Track' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: proj.status === 'On Track' ? '#047857' : '#B91C1C', border: proj.status === 'On Track' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)' }}>
                    {proj.status === 'On Track' ? 'ON TRACK' : 'AT RISK'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--color-primary)' }}>TECHNICAL OWNER</span> <span>•</span> <span style={{ color: 'var(--color-warning)' }}>APPROVAL AUTHORITY</span>
                </div>
              </div>
              
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Project Lead</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{department.head}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Allocation</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{Math.floor(Math.random() * 40) + 10} Employees</div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Progress</span>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--color-text-main)' }}>{proj.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '9999px', backgroundColor: proj.progress > 80 ? 'var(--color-success)' : (proj.progress > 40 ? 'var(--color-primary)' : 'var(--color-warning)'), width: `${proj.progress}%` }}></div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', marginTop: 'auto' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Dependencies</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>Security, Operations, Finance</div>
                </div>
              </div>
              
              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-surface-hover)', backgroundColor: 'var(--color-surface-alt)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', border: '2px solid white', marginLeft: i > 1 ? '-8px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 700, zIndex: 4 - i }}>
                      U{i}
                    </div>
                  ))}
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', border: '2px solid white', marginLeft: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontSize: '10px', fontWeight: 700, zIndex: 1 }}>
                    +4
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '4px', color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}><FileText size={16} /></button>
                  <button style={{ padding: '4px', color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}><Share2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeptProjectsTab;
