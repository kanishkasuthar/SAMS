import React, { useState } from 'react';
import { X, Building2, Users, Briefcase, ShieldAlert, Share, MoreHorizontal, Edit, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useOrgStore } from '../../store/orgStore';
import DeptOverviewTab from './tabs/DeptOverviewTab';
import DeptDNATab from './tabs/DeptDNATab';
import DeptPeopleTab from './tabs/DeptPeopleTab';
import DeptProjectsTab from './tabs/DeptProjectsTab';
import DeptAuthorityTab from './tabs/DeptAuthorityTab';
import DeptHistoryTab from './tabs/DeptHistoryTab';

const DepartmentIntelligenceDrawer = ({ department, onClose, onEdit, onStudioFocus }) => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const { people } = useOrgStore();
  
  if (!department) return null;

  // Calculate dynamic data
  const deptEmployees = people.filter(p => p.department === department.name);
  const employeeCount = deptEmployees.length;

  const TABS = ['OVERVIEW', 'DNA', 'PEOPLE', 'PROJECTS', 'AUTHORITY', 'HISTORY'];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 z-[100] backdrop-blur-sm transition-opacity" 
        style={{ animation: 'fadeIn 0.2s ease-out' }}
        onClick={onClose}
      />
      <div 
        className="fixed top-0 right-0 h-full bg-white z-[110] shadow-2xl flex flex-col border-l border-slate-200"
        style={{ width: '48%', minWidth: '600px', maxWidth: '800px', animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)', backgroundColor: 'var(--color-surface)' }}
      >
        {/* HEADER & HERO */}
        <div style={{ padding: 'var(--space-6) var(--space-6) 0 var(--space-6)', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div style={{ width: 56, height: 56, borderRadius: '12px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 2 }}>{department.name}</h2>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Led by <span style={{color: 'var(--color-primary)'}}>{department.head}</span></span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--color-border)' }}></span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, padding: '2px 8px', borderRadius: 999, backgroundColor: department.authorityScore > 80 ? 'rgba(79, 70, 229, 0.1)' : 'var(--color-surface-hover)', color: department.authorityScore > 80 ? 'var(--color-primary)' : 'var(--color-text-main)' }}>
                    {department.dnaType}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="icon-btn hover:bg-slate-100" onClick={onClose} style={{ padding: 8, borderRadius: 8, color: 'var(--color-text-secondary)' }}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* METRICS BLOCKS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}><Users size={14}/> EMPLOYEES</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{employeeCount}</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}><Briefcase size={14}/> PROJECTS</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{department.projectCount || 0}</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: '12px', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: 4, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}><ShieldAlert size={14}/> AUTHORITY SCORE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{department.authorityScore || 0}</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>BUDGET</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{department.budget || '$0'}</div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <button className="btn-primary" onClick={onEdit} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '10px', borderRadius: 8, fontWeight: 600 }}>
              <Edit size={16} /> Edit Department
            </button>
            <button className="btn-secondary" onClick={() => onStudioFocus(department.id)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '10px', borderRadius: 8, backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', fontWeight: 600 }}>
              <LayoutDashboard size={16} /> Focus in Studio
            </button>
            <button className="btn-secondary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '10px', borderRadius: 8, backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', fontWeight: 600 }}>
              <Share size={16} /> Run Analysis
            </button>
            <button className="btn-secondary" style={{ padding: '10px', borderRadius: 8, backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* TABS */}
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }} className="hide-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0 0 12px 0',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  borderBottom: `2px solid ${activeTab === tab ? 'var(--color-primary)' : 'transparent'}`,
                  background: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.05em'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)', backgroundColor: 'var(--color-bg)' }}>
          <ErrorBoundary>
            {activeTab === 'OVERVIEW' && <DeptOverviewTab department={department} employees={deptEmployees} />}
            {activeTab === 'DNA' && <DeptDNATab department={department} />}
            {activeTab === 'PEOPLE' && <DeptPeopleTab department={department} employees={deptEmployees} />}
            {activeTab === 'PROJECTS' && <DeptProjectsTab department={department} />}
            {activeTab === 'AUTHORITY' && <DeptAuthorityTab department={department} employees={deptEmployees} />}
            {activeTab === 'HISTORY' && <DeptHistoryTab department={department} />}
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

// Simple Error Boundary for tabs
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
          <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Unable to load department intelligence.</h3>
          <p style={{ fontSize: '0.85rem' }}>An error occurred while visualizing this department's data.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default DepartmentIntelligenceDrawer;
