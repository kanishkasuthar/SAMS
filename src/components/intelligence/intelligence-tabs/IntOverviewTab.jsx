import React from 'react';
import { Briefcase, AlertTriangle, User, Calendar, MapPin, Mail, Phone, Activity } from 'lucide-react';

const IntOverviewTab = ({ employee }) => {
  if (!employee) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* AI Employee Brief */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={16} color="var(--color-primary)" />
            AI EMPLOYEE BRIEF
          </h3>
          <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
            Review Workload
          </button>
        </div>
        
        <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '14px', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
          <p>
            {employee.name.split(' ')[0]} currently leads the {employee.department} organization 
            {employee.directReports > 0 ? ` and manages ` : ' with '} 
            {employee.directReports > 0 && <strong style={{ color: 'var(--color-warning)', fontWeight: 600 }}>{employee.directReports} direct reports</strong>}.
          </p>
          <p style={{ marginTop: 12 }}>
            {employee.directReports > 15 ? 'Their reporting span exceeds the recommended manager capacity. ' : ''}
            {employee.name.split(' ')[0]} is actively involved in <strong style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{employee.projects?.length || 0} critical organizational projects</strong>.
          </p>
          {employee.workload > 85 && (
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', backgroundColor: 'var(--color-bg)', borderRadius: 8, borderLeft: '3px solid var(--color-danger)' }}>
              <AlertTriangle size={16} color="var(--color-danger)" />
              <span style={{ fontWeight: 500, color: 'var(--color-danger)' }}>Management workload requires attention ({employee.workload}%).</span>
            </div>
          )}
        </div>
      </section>

      {/* Current Work */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Current Work
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {employee.projects && employee.projects.length > 0 ? (
            employee.projects.map((proj, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '8px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={20} color="var(--color-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{proj.name}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>{proj.progress}%</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{proj.role}</div>
                  
                  {/* Progress Bar */}
                  <div style={{ height: 4, width: '100%', backgroundColor: 'var(--color-bg)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${proj.progress}%`, backgroundColor: 'var(--color-primary)', borderRadius: 2 }}></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '13px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px' }}>
              No active projects assigned.
            </div>
          )}
        </div>
      </section>

      {/* Employee Quick Information */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Employee Quick Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { label: 'Manager', value: employee.managerId ? `ID: ${employee.managerId}` : 'None', icon: User },
            { label: 'Experience', value: employee.experience || 'N/A', icon: Activity },
            { label: 'Employment Type', value: employee.employmentType || 'Full-time', icon: Briefcase },
            { label: 'Location', value: employee.location || 'Remote', icon: MapPin },
            { label: 'Join Date', value: employee.joinDate || 'Jan 2018', icon: Calendar },
            { label: 'Email', value: `${employee.name.toLowerCase().replace(' ', '.')}@indigo.com`, icon: Mail },
          ].map((info, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '6px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <info.icon size={14} color="var(--color-text-secondary)" />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{info.label}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default IntOverviewTab;
