import React, { useState } from 'react';
import { 
  Building2, Users, Briefcase, ShieldAlert, Share, MoreHorizontal, Edit, 
  LayoutDashboard, ChevronRight, Activity, ArrowLeft, Network, Download 
} from 'lucide-react';
import { useOrgStore } from '../../store/orgStore';
import DeptOverviewTab from './tabs/DeptOverviewTab';
import DeptDNATab from './tabs/DeptDNATab';
import DeptPeopleTab from './tabs/DeptPeopleTab';
import DeptProjectsTab from './tabs/DeptProjectsTab';
import DeptAuthorityTab from './tabs/DeptAuthorityTab';
import DeptHistoryTab from './tabs/DeptHistoryTab';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-danger)', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: 12, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <ShieldAlert size={32} style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Unable to load department visualization.</h3>
          <p style={{ fontSize: '0.85rem' }}>An error occurred while rendering this tab.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const DepartmentIntelligenceWorkspace = ({ department, onClose, onEdit, onStudioFocus, onRunAnalysis }) => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const { people } = useOrgStore();
  
  if (!department) return null;

  const deptEmployees = people.filter(p => p.department === department.name);
  const employeeCount = deptEmployees.length;

  const TABS = [
    { id: 'OVERVIEW', label: 'Overview' },
    { id: 'DNA', label: 'DNA' },
    { id: 'PEOPLE', label: 'People' },
    { id: 'PROJECTS', label: 'Projects' },
    { id: 'AUTHORITY', label: 'Authority' },
    { id: 'HISTORY', label: 'History' }
  ];

  return (
    <div className="department-intelligence-page">
      
      {/* Top Header / Back navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 32px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', marginBottom: '24px', borderRadius: '12px' }}>
        <button 
          onClick={onClose} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '14px', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} /> Back to Directory
        </button>
        <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--color-border)' }}></div>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Department Intelligence</span>
      </div>

      {/* HERO SECTION */}
      <div className="department-hero">
        <div className="department-hero-left">
          <div className="department-hero-icon">
            <Building2 size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 700, lineHeight: 1.2, color: 'var(--color-text-main)', marginBottom: '8px' }}>{department.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Led by <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{department.head}</span></span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }}></span>
              <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {department.dnaType || 'STRATEGIC AUTHORITY HUB'}
              </span>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.5, maxWidth: '600px' }}>
              {department.description || `${department.name} department leads the core strategic initiatives and cross-functional delivery within the organization.`}
            </p>
          </div>
        </div>
        
        <div className="department-health-card">
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Department Health</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-success)', lineHeight: 1 }}>{department.healthScore || 92}</span>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: 700 }}>/ 100</span>
          </div>
          <div className="label-with-icon" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-success)' }}>
            <Activity size={14}/> LIVE SYNCED
          </div>
        </div>
      </div>

      {/* METRICS STRIP */}
      <div className="department-metrics-grid">
        <div className="department-metric-card">
          <div className="department-metric-value">{employeeCount}</div>
          <div className="department-metric-label"><Users size={14}/> Employees</div>
        </div>
        <div className="department-metric-card">
          <div className="department-metric-value">{department.projectCount || 8}</div>
          <div className="department-metric-label"><Briefcase size={14}/> Active Projects</div>
        </div>
        <div className="department-metric-card" style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', borderColor: 'rgba(79, 70, 229, 0.2)' }}>
          <div className="department-metric-value" style={{ color: 'var(--color-primary)' }}>{department.authorityScore || 92}</div>
          <div className="department-metric-label" style={{ color: 'var(--color-primary)' }}><ShieldAlert size={14}/> Authority Score</div>
        </div>
        <div className="department-metric-card">
          <div className="department-metric-value">{department.budget || '$24.5M'}</div>
          <div className="department-metric-label">Budget</div>
        </div>
        <div className="department-metric-card">
          <div className="department-metric-value">
            {department.authorityConcentration === 'HIGH' || department.authorityConcentration === 'CRITICAL' ? '76%' : '32%'}
          </div>
          <div className="department-metric-label"><Activity size={14}/> Authority Concentration</div>
        </div>
        <div className="department-metric-card">
          <div className="department-metric-value">4</div>
          <div className="department-metric-label"><Network size={14}/> Cross-Dept Links</div>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="department-action-bar">
        <div className="department-action-group">
          <button onClick={() => onEdit(department)} className="department-action-btn" style={{ backgroundColor: 'var(--color-primary)', color: 'white', border: 'none' }}>
            <Edit size={16} /> Edit Department
          </button>
          <button onClick={() => onStudioFocus(department.id)} className="department-action-btn" style={{ backgroundColor: 'white', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
            <LayoutDashboard size={16} /> Focus in Studio
          </button>
          <button onClick={() => onRunAnalysis(department)} className="department-action-btn" style={{ backgroundColor: 'white', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
            <Activity size={16} /> Run Analysis
          </button>
        </div>
        
        <div className="department-action-group">
          <button className="department-action-btn" style={{ backgroundColor: 'white', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
            <Share size={16} /> Simulate Change
          </button>
          <button className="department-action-btn" style={{ backgroundColor: 'white', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
            <Download size={16} /> Export
          </button>
          <button className="department-action-btn" style={{ backgroundColor: 'white', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '0 10px' }}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="department-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`department-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="department-tab-content">
        <ErrorBoundary>
          {activeTab === 'OVERVIEW' && <DeptOverviewTab department={department} employees={deptEmployees} onAnalysisClick={() => onRunAnalysis(department)} />}
          {activeTab === 'DNA' && <DeptDNATab department={department} />}
          {activeTab === 'PEOPLE' && <DeptPeopleTab department={department} employees={deptEmployees} />}
          {activeTab === 'PROJECTS' && <DeptProjectsTab department={department} />}
          {activeTab === 'AUTHORITY' && <DeptAuthorityTab department={department} employees={deptEmployees} />}
          {activeTab === 'HISTORY' && <DeptHistoryTab department={department} />}
        </ErrorBoundary>
      </div>
      
    </div>
  );
};

export default DepartmentIntelligenceWorkspace;
