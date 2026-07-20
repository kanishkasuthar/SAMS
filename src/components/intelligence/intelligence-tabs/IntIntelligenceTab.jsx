import React, { useState } from 'react';
import { Brain, ShieldAlert, Target, Users, Settings, Plus, Network, ChevronDown, ChevronUp } from 'lucide-react';
import { useOrgStore } from '../../../store/orgStore';

const IntIntelligenceTab = ({ employee }) => {
  const { people } = useOrgStore();
  const [expandedSection, setExpandedSection] = useState('fingerprint'); // fingerprint, impact, risk, relationship
  const [showSimulation, setShowSimulation] = useState(false);

  if (!employee) return null;

  const authScores = employee.authorityScores || { reporting: 0, decision: 0, project: 0, crossTeam: 0, approval: 0 };
  const authMetrics = [
    { label: 'Reporting Authority', value: authScores.reporting },
    { label: 'Decision Authority', value: authScores.decision },
    { label: 'Project Influence', value: authScores.project },
    { label: 'Cross-Team Influence', value: authScores.crossTeam },
    { label: 'Approval Authority', value: authScores.approval }
  ];

  const SectionHeader = ({ title, id, icon: Icon }) => (
    <div 
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: 'var(--color-surface)', borderBottom: expandedSection === id ? '1px solid var(--color-border)' : 'none', cursor: 'pointer' }}
      onClick={() => setExpandedSection(expandedSection === id ? null : id)}
    >
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={16} color="var(--color-primary)" />
        {title}
      </h3>
      {expandedSection === id ? <ChevronUp size={16} color="var(--color-text-muted)" /> : <ChevronDown size={16} color="var(--color-text-muted)" />}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      
      {/* Authority Fingerprint */}
      <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}>
        <SectionHeader title="AUTHORITY FINGERPRINT" id="fingerprint" icon={Brain} />
        {expandedSection === 'fingerprint' && (
          <div style={{ padding: '24px', backgroundColor: 'var(--color-bg)' }}>
            <div style={{ display: 'flex', gap: 40 }}>
              <div style={{ flex: 2 }}>
                {authMetrics.map((metric, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{metric.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{metric.value} / 100</span>
                    </div>
                    <div style={{ height: 6, width: '100%', backgroundColor: 'var(--color-surface-hover)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${metric.value}%`, backgroundColor: 'var(--color-primary)', borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Authority Type</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 12 }}>{employee.authorityType || 'Standard'}</div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                    {employee.name.split(' ')[0]} has significant decision and approval authority across {employee.department}. Their position creates high organizational dependency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Employee Impact Map */}
      <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}>
        <SectionHeader title="EMPLOYEE IMPACT MAP" id="impact" icon={Target} />
        {expandedSection === 'impact' && (
          <div style={{ padding: '24px', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 24 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Organizational Impact Score</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-primary)' }}>87 / 100</div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
              {employee.department.toUpperCase()} <br/>
              <span style={{ fontSize: '11px', fontWeight: 400 }}>{employee.directReports * 5 + 10} Employees</span>
            </div>
            <div style={{ height: 24, width: 1, backgroundColor: 'var(--color-border)', margin: '8px 0' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>PROJECTS</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{employee.projects?.length || 0} Active</div>
              </div>
              <div style={{ width: 40, height: 1, backgroundColor: 'var(--color-border)' }} />
              <div style={{ padding: '8px 16px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-primary)', fontWeight: 600, fontSize: '13px', color: 'var(--color-primary)' }}>
                {employee.name.toUpperCase()} <br/>
                <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-text-muted)' }}>{employee.role}</span>
              </div>
              <div style={{ width: 40, height: 1, backgroundColor: 'var(--color-border)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>DECISIONS</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{employee.decisionFlowIds?.length || 0} Flows</div>
              </div>
            </div>

            <div style={{ height: 24, width: 1, backgroundColor: 'var(--color-border)', margin: '8px 0' }} />
            <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
              DIRECT REPORTS <br/>
              <span style={{ fontSize: '11px', fontWeight: 400 }}>{employee.directReports}</span>
            </div>
          </div>
        )}
      </div>

      {/* Continuity Risk Simulation */}
      <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}>
        <SectionHeader title="CONTINUITY RISK SIMULATION" id="risk" icon={ShieldAlert} />
        {expandedSection === 'risk' && (
          <div style={{ padding: '24px', backgroundColor: 'var(--color-bg)' }}>
            {!showSimulation ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '14px', color: 'var(--color-text-main)', marginBottom: 16 }}>
                  What happens if {employee.name} becomes unavailable?
                </div>
                <button 
                  className="btn-primary" 
                  style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                  onClick={() => setShowSimulation(true)}
                >
                  <ShieldAlert size={14} /> RUN IMPACT SIMULATION
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Risk Level</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-danger)' }}>HIGH</div>
                  </div>
                  <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                    OPEN WHAT-IF SIMULATOR
                  </button>
                </div>
                
                <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                  <div style={{ flex: 1, padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-danger)', marginBottom: 12 }}>CRITICAL DEPENDENCIES</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {(employee.approvalResponsibilities || ['Budget Approval', 'Architecture Review']).map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                      <li>{employee.directReports} Direct Reports Affected</li>
                      <li>{employee.projects?.length || 0} Projects Affected</li>
                    </ul>
                  </div>
                </div>

                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>RECOMMENDED SUCCESSORS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(employee.successors || []).map((succ, i) => (
                    <div key={i} style={{ padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{succ.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: 2 }}>Match: {succ.readiness}% • Gap: {succ.gap}</div>
                      </div>
                      <div style={{ padding: '4px 8px', backgroundColor: 'var(--color-bg)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--color-success)' }}>
                        Leadership Readiness: {succ.readiness > 80 ? 'HIGH' : 'MEDIUM'}
                      </div>
                    </div>
                  ))}
                  {(!employee.successors || employee.successors.length === 0) && (
                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>No successors explicitly modeled for this role yet.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Relationship Intelligence */}
      <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}>
        <SectionHeader title="RELATIONSHIP INTELLIGENCE" id="relationship" icon={Users} />
        {expandedSection === 'relationship' && (
          <div style={{ padding: '24px', backgroundColor: 'var(--color-bg)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Manager', value: employee.managerId ? '1 Connected' : 'None' },
                { label: 'Direct Reports', value: `${employee.directReports} Connected` },
                { label: 'Peers', value: `${employee.peerIds?.length || 0} Connected` },
                { label: 'Mentors', value: '0 Connected' },
                { label: 'Project Collaborators', value: `${(employee.projects?.length || 0) * 3} Connected` },
                { label: 'HR Partner', value: 'Emma Watson' },
              ].map((rel, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{rel.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{rel.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default IntIntelligenceTab;
