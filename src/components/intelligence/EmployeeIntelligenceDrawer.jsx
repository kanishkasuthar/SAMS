import React, { useState, useEffect } from 'react';
import { 
  X, Edit, Maximize2, MoreVertical, Brain, Map, Briefcase, 
  History, Shield, Activity, Users, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrgStore } from '../../store/orgStore';

import IntOverviewTab from './intelligence-tabs/IntOverviewTab';
import IntOrgMapTab from './intelligence-tabs/IntOrgMapTab';
import IntProjectsTab from './intelligence-tabs/IntProjectsTab';
import IntJourneyTab from './intelligence-tabs/IntJourneyTab';
import IntIntelligenceTab from './intelligence-tabs/IntIntelligenceTab';

const EmployeeIntelligenceDrawer = ({ isOpen, onClose, employee, onFocusInStudio }) => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen]);

  if (!isOpen || !employee) return null;

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: FileText },
    { id: 'org_map', label: 'ORG MAP', icon: Map },
    { id: 'projects', label: 'PROJECTS', icon: Briefcase },
    { id: 'journey', label: 'JOURNEY', icon: History },
    { id: 'intelligence', label: 'INTELLIGENCE', icon: Brain },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Online': return 'var(--color-success)';
      case 'Busy': return 'var(--color-danger)';
      case 'Meeting': return 'var(--color-warning)';
      case 'Leave': return 'var(--color-text-muted)';
      case 'Offline': default: return 'var(--color-border)';
    }
  };

  return (
    <AnimatePresence>
      <div 
        style={{ 
          position: 'fixed', inset: 0, zIndex: 1000, 
          display: 'flex', justifyContent: 'flex-end' 
        }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ 
            position: 'absolute', inset: 0, 
            backgroundColor: 'rgba(15, 23, 42, 0.4)', 
            backdropFilter: 'blur(2px)' 
          }}
          onClick={onClose}
        />
        
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            width: '45%', 
            minWidth: 500,
            maxWidth: 800,
            backgroundColor: 'var(--color-bg)',
            height: '100%',
            position: 'relative',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid var(--color-border)',
            overflow: 'hidden'
          }}
        >
          {/* Header Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Employee Intelligence Workspace
            </h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                onClick={onClose}
                style={{ padding: 6, borderRadius: '50%', border: 'none', backgroundColor: 'var(--color-surface-hover)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} color="var(--color-text-secondary)" />
              </button>
            </div>
          </div>

          {/* Hero Header */}
          <div style={{ padding: '32px 32px 24px', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              {/* Avatar */}
              <div style={{ position: 'relative' }}>
                {employee.photo ? (
                  <img src={employee.photo} alt={employee.name} style={{ width: 80, height: 80, borderRadius: '16px', objectFit: 'cover', boxShadow: 'var(--shadow-sm)' }} />
                ) : (
                  <div style={{ width: 80, height: 80, borderRadius: '16px', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 600 }}>
                    {employee.name.charAt(0)}
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: -4, right: -4, padding: '4px 8px', borderRadius: 12, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 6, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: getStatusColor(employee.status) }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>{employee.status}</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4 }}>
                      {employee.name}
                    </h1>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 600 }}>{employee.role}</span>
                      <span>•</span>
                      <span>{employee.department} ({employee.currentTeam || 'No Team'})</span>
                      <span>•</span>
                      <span>{employee.id}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: 4 }}>
                      {employee.location}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Edit size={14} /> Edit Employee
                    </button>
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-primary)' }}
                      onClick={() => onFocusInStudio && onFocusInStudio(employee.id)}
                    >
                      <Maximize2 size={14} /> Focus in Studio
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px 8px' }}>
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                {/* Metrics Blocks */}
                <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                  {[
                    { label: 'AI Health', value: employee.healthScore || 0, color: 'var(--color-success)' },
                    { label: 'Direct Reports', value: employee.directReports || 0, color: 'var(--color-info)' },
                    { label: 'Active Projects', value: employee.projects?.length || 0, color: 'var(--color-primary)' },
                    { label: 'Workload', value: `${employee.workload || 0}%`, color: 'var(--color-warning)' }
                  ].map((metric, i) => (
                    <div key={i} style={{ flex: 1, backgroundColor: 'var(--color-bg)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: metric.color }}>{metric.value}</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: 2 }}>{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Primary Tabs */}
          <div style={{ display: 'flex', padding: '0 32px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', gap: 32 }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  borderBottom: `2px solid ${activeTab === tab.id ? 'var(--color-primary)' : 'transparent'}`,
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: 600,
                  fontSize: '13px',
                  transition: 'all 0.2s'
                }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Area (Scrollable) */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
            <ErrorBoundary>
              {activeTab === 'overview' && <IntOverviewTab employee={employee} />}
              {activeTab === 'org_map' && <IntOrgMapTab employee={employee} onFocusInStudio={onFocusInStudio} />}
              {activeTab === 'projects' && <IntProjectsTab employee={employee} />}
              {activeTab === 'journey' && <IntJourneyTab employee={employee} />}
              {activeTab === 'intelligence' && <IntIntelligenceTab employee={employee} />}
            </ErrorBoundary>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Simple Error Boundary for Defensive Rendering
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Drawer Tab Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, backgroundColor: 'var(--color-surface-hover)', borderRadius: 8, border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
          <Shield size={32} color="var(--color-warning)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 4 }}>Unable to load this insight.</h3>
          <p style={{ fontSize: '13px' }}>The data required for this view is currently unavailable or improperly formatted.</p>
          <button onClick={() => this.setState({ hasError: false })} className="btn-secondary" style={{ marginTop: 12, fontSize: '12px' }}>Try Again</button>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default EmployeeIntelligenceDrawer;
