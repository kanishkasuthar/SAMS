import React from 'react';
import { User, Briefcase, ChevronRight, CheckCircle2, Clock, MapPin, Cpu, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const OverviewTab = ({ employee }) => {
  if (!employee) return null;

  // Breadcrumb generation based on role/department
  const generateBreadcrumb = () => {
    let path = ['CEO'];
    if (employee.department !== 'Executive') {
      path.push(`VP of ${employee.department}`);
      if (!employee.role.includes('VP')) {
        path.push(`${employee.department} Director`);
        if (!employee.role.includes('Director')) {
          path.push(employee.role);
        }
      }
    } else if (employee.role !== 'Chief Executive Officer') {
      path.push(employee.role);
    }
    return path;
  };

  const breadcrumb = generateBreadcrumb();

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Animated Live Organization Path */}
      <div className="card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginRight: 12 }}>LIVE ORG PATH</div>
        {breadcrumb.map((node, i) => (
          <React.Fragment key={i}>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ 
                padding: '6px 12px', borderRadius: 16, fontSize: '13px', fontWeight: 600, 
                backgroundColor: i === breadcrumb.length - 1 ? 'var(--color-primary)' : 'var(--color-surface-hover)',
                color: i === breadcrumb.length - 1 ? 'white' : 'var(--color-text-main)',
                cursor: 'pointer'
              }}
              className="hover:opacity-80"
            >
              {node}
            </motion.div>
            {i < breadcrumb.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.05 }}
              >
                <ChevronRight size={14} color="var(--color-text-muted)" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* AI Employee Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="card" style={{ padding: 24, border: '1px solid rgba(79, 70, 229, 0.2)', backgroundColor: 'rgba(79, 70, 229, 0.02)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Cpu size={20} color="var(--color-primary)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>AI Executive Summary</h3>
        </div>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-main)', margin: 0 }}>
          {employee.name} is a highly effective {employee.role} managing {employee.directReports} direct reports within the {employee.department} division. 
          They are currently running at {employee.workload}% workload capacity, which {employee.workload > 85 ? 'exceeds the recommended threshold and poses a burnout risk.' : 'is optimal for steady growth.'} 
          With a health score of {employee.healthScore}/100, AI recommends {employee.workload > 85 ? 'assigning additional support or redistributing 1-2 active projects' : 'continuing current trajectory and engaging in leadership training'}.
        </p>
      </motion.div>

      {/* Digital Twin Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        {/* Left Column */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 20 }}>Digital Twin Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 8 }}><Briefcase size={16}/> Current Team</div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{employee.currentTeam || employee.department}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={16}/> Office Location</div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{employee.location}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 8 }}><User size={16}/> Employment Type</div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{employee.employmentType || 'Full-time'}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={16}/> Experience</div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{employee.experience || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 20 }}>Current Responsibilities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(employee.responsibilities || ['Team Management', 'Project Delivery', 'Strategy']).map((resp, i) => (
                <span key={i} style={{ padding: '6px 14px', backgroundColor: 'var(--color-surface-hover)', borderRadius: 20, fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {resp}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>Performance Snapshot</h3>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>AI Health Score</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-success)' }}>{employee.healthScore}/100</span>
              </div>
              <div style={{ height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${employee.healthScore}%` }} transition={{ duration: 1, delay: 0.5 }} style={{ height: '100%', backgroundColor: 'var(--color-success)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Current Workload</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-primary)' }}>{employee.workload}%</span>
              </div>
              <div style={{ height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${employee.workload}%` }} transition={{ duration: 1, delay: 0.6 }} style={{ height: '100%', backgroundColor: employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-primary)' }} />
              </div>
            </div>
            
            <div style={{ marginTop: 8, padding: 16, backgroundColor: 'var(--color-surface-hover)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <TrendingUp size={24} color="var(--color-primary)" />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>CONTRIBUTION SCORE</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>A+ (Top 5%)</div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default OverviewTab;
