import React from 'react';
import { Briefcase, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const IntProjectsTab = ({ employee }) => {
  if (!employee) return null;

  const getAuthorityBadge = (level) => {
    switch (level) {
      case 'PROJECT OWNER':
      case 'DECISION MAKER':
        return { bg: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)' };
      case 'APPROVER':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' };
      case 'REVIEWER':
      case 'CONTRIBUTOR':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' };
      case 'VIEWER':
      default:
        return { bg: 'var(--color-surface)', color: 'var(--color-text-muted)' };
    }
  };

  const getHealthIcon = (health) => {
    switch (health?.toUpperCase()) {
      case 'EXCELLENT':
      case 'GOOD':
        return <CheckCircle2 size={14} color="var(--color-success)" />;
      case 'AT RISK':
      case 'NEEDS ATTENTION':
        return <AlertCircle size={14} color="var(--color-danger)" />;
      default:
        return <Clock size={14} color="var(--color-text-muted)" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Briefcase size={16} color="var(--color-primary)" />
          PROJECT ALLOCATION & AUTHORITY
        </h3>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {employee.projects && employee.projects.length > 0 ? (
          employee.projects.map(proj => {
            const badge = getAuthorityBadge(proj.authorityLevel);
            return (
              <div key={proj.id} style={{ padding: '20px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:border-primary">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase', marginBottom: 4 }}>{proj.name}</h4>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{proj.role}</div>
                  </div>
                  <div style={{ padding: '4px 10px', backgroundColor: badge.bg, color: badge.color, fontSize: '11px', fontWeight: 700, borderRadius: '12px', letterSpacing: '0.05em' }}>
                    {proj.authorityLevel}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Allocation</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{proj.allocationPercentage}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Project Health</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {getHealthIcon(proj.health)} {proj.health}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Team Size</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{proj.teamSize} Members</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Due Date</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{proj.dueDate}</div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Progress</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>{proj.progress}%</div>
                  </div>
                  <div style={{ height: 6, width: '100%', backgroundColor: 'var(--color-bg)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${proj.progress}%`, backgroundColor: 'var(--color-primary)', borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px' }}>
            No projects assigned to this employee.
          </div>
        )}
      </div>
    </div>
  );
};

export default IntProjectsTab;
