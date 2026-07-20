import React, { useState } from 'react';
import { Search, Filter, Download, LayoutGrid, Flame, Clock, Network, Layers, ShieldAlert, UserCheck, Activity, Zap, FileText, ChevronRight, AlertTriangle, CheckCircle2, Users } from 'lucide-react';

// Components
import ResponsibilityKPICards from '../components/responsibility/ResponsibilityKPICards';
import ResponsibilityAISummary from '../components/responsibility/ResponsibilityAISummary';
import ResponsibilityMatrixView from '../components/responsibility/views/ResponsibilityMatrixView';
import ResponsibilityHeatmapView from '../components/responsibility/views/ResponsibilityHeatmapView';
import ResponsibilityTimelineView from '../components/responsibility/views/ResponsibilityTimelineView';
import ResponsibilityNetworkGraph from '../components/responsibility/views/ResponsibilityNetworkGraph';
import ResponsibilityDistributionCharts from '../components/responsibility/views/ResponsibilityDistributionCharts';

// Drawers & Modals
import CellDetailsDrawer from '../components/responsibility/drawers/CellDetailsDrawer';
import ProcessIntelligenceDrawer from '../components/responsibility/drawers/ProcessIntelligenceDrawer';
import DepartmentAnalyticsDrawer from '../components/responsibility/drawers/DepartmentAnalyticsDrawer';
import TimelineEventDrawer from '../components/responsibility/drawers/TimelineEventDrawer';
import AIAnalysisModal from '../components/responsibility/modals/AIAnalysisModal';

// --- Inline New Analytics Components --- //

const AnalyticsKPIStrip = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
    {[
      { label: 'Highest Workload', value: 'Finance', metric: '95% Load', color: 'var(--color-danger)' },
      { label: 'Lowest Workload', value: 'Sales', metric: '45% Load', color: 'var(--color-success)' },
      { label: 'Most Collaborative', value: 'Exec Board', metric: '92 Score', color: 'var(--color-primary)' },
      { label: 'Highest Risk Dept', value: 'HR & Admin', metric: '88/100', color: 'var(--color-warning)' },
      { label: 'Most Consulted', value: 'Engineering', metric: '36 Procs', color: 'var(--color-text-main)' }
    ].map((kpi, i) => (
      <div key={i} className="card hover-lift" style={{ padding: '16px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{kpi.label}</div>
        <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>{kpi.value}</div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: kpi.color }}>{kpi.metric}</div>
      </div>
    ))}
  </div>
);

const AnalyticsAIInsights = ({ onRunOptimization }) => (
  <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-primary-light)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }}>
        <Zap size={24} color="var(--color-primary)" />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 8px 0' }}>AI Structural Insights</h3>
        <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'var(--color-text-main)' }}>
          <div><strong style={{ color: 'var(--color-danger)' }}>Overloaded:</strong> Finance</div>
          <div><strong style={{ color: 'var(--color-success)' }}>Balanced:</strong> Sales</div>
          <div><strong style={{ color: 'var(--color-warning)' }}>Missing Owners:</strong> 2 Processes</div>
          <div><strong style={{ color: 'var(--color-primary)' }}>Recommendation:</strong> Shift 5 tasks from Finance to Engineering.</div>
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: '12px' }}>
      <button className="hover-bg" style={{ padding: '10px 16px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', fontWeight: 600, color: 'var(--color-text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FileText size={16} /> Generate Report
      </button>
      <button onClick={onRunOptimization} style={{ padding: '10px 16px', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: '8px', fontWeight: 700, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
        <Zap size={16} /> Run Optimization
      </button>
    </div>
  </div>
);

const TopCriticalProcesses = ({ onProcessClick }) => {
  const processes = [
    { id: 'p1', name: 'Annual Budget Approval', score: 95, owner: 'Sarah Chen', dept: 'Finance', status: 'Critical' },
    { id: 'p8', name: 'Data Breach Response', score: 92, owner: 'Amanda Vance', dept: 'Executive', status: 'High Risk' },
    { id: 'p3', name: 'Cloud Infrastructure Pivot', score: 88, owner: 'Alex Mercer', dept: 'Engineering', status: 'High Risk' },
    { id: 'p4', name: 'Quarterly Sales Targets', score: 85, owner: 'David Kim', dept: 'Sales', status: 'Medium Risk' },
    { id: 'p7', name: 'Vendor Onboarding', score: 82, owner: 'Marcus Johnson', dept: 'HR & Admin', status: 'Medium Risk' },
  ];

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={20} color="var(--color-danger)" /> Top Critical Processes
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>Highest risk workflows requiring immediate review.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '12px' }}>
        {processes.map((proc, i) => (
          <div key={proc.id} className="hover-lift" onClick={() => onProcessClick(proc.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: i < processes.length - 1 ? '1px solid var(--color-border)' : 'none', borderRadius: '12px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: proc.score >= 90 ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: proc.score >= 90 ? 'var(--color-danger)' : 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
                {proc.score}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>{proc.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{proc.owner} • {proc.dept}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', backgroundColor: proc.score >= 90 ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: proc.score >= 90 ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                {proc.status}
              </span>
              <ChevronRight size={16} color="var(--color-text-muted)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const ResponsibilityMatrix = () => {
  // Modal/Drawer states
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [activeCell, setActiveCell] = useState(null); // { processId, deptId, type }
  const [activeProcess, setActiveProcess] = useState(null); // processId
  const [activeDepartment, setActiveDepartment] = useState(null); // departmentId
  const [activeTimelineEvent, setActiveTimelineEvent] = useState(null); // eventId

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: 'var(--color-bg)', overflow: 'hidden' }}>
      
      {/* Main Content Area (Full Width) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '32px 40px', maxWidth: '1800px', margin: '0 auto', width: '100%' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--color-text-main)', margin: '0 0 8px 0' }}>Responsibility Intelligence Workspace</h1>
            <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '15px' }}>Enterprise accountability tracking, bottleneck detection, and organizational alignment.</p>
          </div>

          {/* Section 1: KPI Cards */}
          <ResponsibilityKPICards />
          
          {/* Section 2: AI Summary */}
          <ResponsibilityAISummary onRunAnalysis={() => setIsAIModalOpen(true)} />

          {/* Section 3: Filter Toolbar */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px', backgroundColor: 'white', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="topbar-search" style={{ width: '280px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <Search size={18} color="var(--color-text-muted)" />
              <input type="text" placeholder="Search processes, owners, departments..." style={{ fontSize: '14px' }} />
            </div>
            
            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)', margin: '0 8px' }} />
            
            <button className="hover-bg" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-text-main)', cursor: 'pointer', fontWeight: 600 }}>
              <Layers size={16} color="var(--color-text-muted)" /> Department
            </button>
            <button className="hover-bg" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-text-main)', cursor: 'pointer', fontWeight: 600 }}>
              <ShieldAlert size={16} color="var(--color-text-muted)" /> Risk Level
            </button>
            <button className="hover-bg" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-text-main)', cursor: 'pointer', fontWeight: 600 }}>
              <UserCheck size={16} color="var(--color-text-muted)" /> Process Owner
            </button>
            
            <div style={{ flex: 1 }} />
            
            <button className="hover-bg" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', cursor: 'pointer', fontWeight: 600, boxShadow: 'var(--shadow-sm)' }}>
              <Download size={16} color="var(--color-text-muted)" /> Export Report
            </button>
          </div>

          {/* Section 4: Main Matrix (Full Width) */}
          <div style={{ marginBottom: '48px' }}>
            <ResponsibilityMatrixView 
              onCellClick={(data) => setActiveCell(data)}
              onProcessClick={(id) => setActiveProcess(id)}
              onDepartmentClick={(id) => setActiveDepartment(id)}
            />
          </div>

          {/* --- NEW ANALYTICS WORKSPACE --- */}
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--color-border)' }}>Organizational Analytics Workspace</h2>
          
          <AnalyticsKPIStrip />
          <AnalyticsAIInsights onRunOptimization={() => setIsAIModalOpen(true)} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ResponsibilityHeatmapView onCellClick={(data) => setActiveCell(data)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <ResponsibilityDistributionCharts onDepartmentClick={(id) => setActiveDepartment(id)} />
              <TopCriticalProcesses onProcessClick={(id) => setActiveProcess(id)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
            <ResponsibilityNetworkGraph onDepartmentClick={(id) => setActiveDepartment(id)} />
            <ResponsibilityTimelineView onEventClick={(id) => setActiveTimelineEvent(id)} />
          </div>
          
          <div style={{ height: '60px' }} />
        </div>
      </div>

      {/* Overlays (Slide-over Drawers and Modals) */}
      <AIAnalysisModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
      <CellDetailsDrawer isOpen={!!activeCell} onClose={() => setActiveCell(null)} data={activeCell} />
      <ProcessIntelligenceDrawer isOpen={!!activeProcess} onClose={() => setActiveProcess(null)} processId={activeProcess} />
      <DepartmentAnalyticsDrawer isOpen={!!activeDepartment} onClose={() => setActiveDepartment(null)} departmentId={activeDepartment} />
      <TimelineEventDrawer isOpen={!!activeTimelineEvent} onClose={() => setActiveTimelineEvent(null)} eventId={activeTimelineEvent} />

    </div>
  );
};

export default ResponsibilityMatrix;
