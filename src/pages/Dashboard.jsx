import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, Users, Building2, CheckCircle, Activity, 
  ArrowRight, Network, Clock, AlertTriangle, UserCheck, Maximize2, Minimize2,
  LayoutDashboard, Lightbulb
} from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import MiniHierarchy from '../components/MiniHierarchy';
import EmployeeProfilePanel from '../components/EmployeeProfilePanel';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import './Dashboard.css';

const HEALTH_TREND_DATA = [
  { name: 'Jan', health: 85 }, { name: 'Feb', health: 88 }, { name: 'Mar', health: 86 },
  { name: 'Apr', health: 91 }, { name: 'May', health: 93 }, { name: 'Jun', health: 94 },
  { name: 'Jul', health: 94 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    nodes, edges = [], departments, auditLogs = [], overviewKPIs, 
    fetchOrgChart, fetchOrgStats, fetchOverviewKPIs 
  } = useOrgStore();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isGraphMaximized, setIsGraphMaximized] = useState(false);
  const [isHealthGraphMaximized, setIsHealthGraphMaximized] = useState(false);

  React.useEffect(() => {
    fetchOrgChart();
    fetchOrgStats();
    fetchOverviewKPIs();
  }, [fetchOrgChart, fetchOrgStats, fetchOverviewKPIs]);

  const orgNodes = React.useMemo(() => nodes.filter(n => n.type === 'orgNode' && !n.data?.isVacant), [nodes]);
  
  const totalEmployees = orgNodes.length;
  
  const totalDepartments = React.useMemo(() => {
    if (departments.length > 0) return departments.length;
    const depts = new Set(nodes.filter(n => n.type === 'orgNode' && n.data?.department).map(n => n.data.department));
    return depts.size || 0;
  }, [departments, nodes]);
  
  const managersCount = React.useMemo(() => {
    return nodes.filter(n => n.type === 'orgNode' && n.data?.directReportsCount > 0 && !n.data?.designation?.toLowerCase().includes('ceo')).length;
  }, [nodes]);

  const execCount = React.useMemo(() => {
    return nodes.filter(n => n.type === 'orgNode' && ['ceo', 'coo', 'cto', 'cfo', 'cmo', 'executive', 'strategic'].some(r => n.data?.designation?.toLowerCase().includes(r) || n.data?.role?.toLowerCase().includes(r))).length;
  }, [nodes]);

  const pendingReviews = overviewKPIs?.pendingWorkflows || 0;
  
  const hierarchyDepth = React.useMemo(() => {
    if (orgNodes.length === 0) return 0;
    
    const getDepth = (id, visited = new Set()) => {
      if (visited.has(id)) return 0;
      visited.add(id);
      const children = edges.filter(e => e.source === id).map(e => e.target);
      if (children.length === 0) return 1;
      return 1 + Math.max(...children.map(c => getDepth(c, new Set(visited))));
    };
    
    const ceo = orgNodes.find(n => n.data?.type === 'ceo' || n.data?.designation?.toLowerCase().includes('ceo')) || orgNodes[0];
    return ceo ? getDepth(ceo.id) : 0;
  }, [orgNodes, edges]);

  const avgSpanOfControl = React.useMemo(() => {
    const managers = nodes.filter(n => n.type === 'orgNode' && n.data?.directReportsCount > 0);
    if (managers.length === 0) return 0;
    const totalReports = managers.reduce((acc, m) => acc + (m.data.directReportsCount || 0), 0);
    return (totalReports / managers.length).toFixed(1);
  }, [nodes]);

  const vacantPositions = React.useMemo(() => {
    return nodes.filter(n => n.type === 'orgNode' && n.data?.isVacant).length;
  }, [nodes]);

  // Structural issues calculation
  const missingManagersCount = React.useMemo(() => {
    const ceo = orgNodes.find(n => n.data?.type === 'ceo' || n.data?.designation?.toLowerCase().includes('ceo'));
    return orgNodes.filter(n => n.id !== ceo?.id && !edges.some(e => e.target === n.id)).length;
  }, [orgNodes, edges]);

  const overloadedManagersCount = React.useMemo(() => {
    return nodes.filter(n => n.type === 'orgNode' && n.data?.directReportsCount > 8).length;
  }, [nodes]);

  const orgHealth = React.useMemo(() => {
    if (totalEmployees === 0) return "100%";
    let score = 100;
    score -= missingManagersCount * 5;
    score -= overloadedManagersCount * 4;
    return `${Math.max(50, score)}%`;
  }, [totalEmployees, missingManagersCount, overloadedManagersCount]);

  const hasNoData = totalEmployees === 0 && totalDepartments === 0;

  const criticalAction = React.useMemo(() => {
    if (totalEmployees === 0) {
      return {
        title: "Setup Required",
        message: "No organization data imported. Please import your company structure to activate tracking.",
        btnText: "Import Excel",
        action: () => navigate('/sync')
      };
    }
    
    if (missingManagersCount > 0) {
      return {
        title: "Critical Action Required",
        message: `${missingManagersCount} employees are missing reporting managers following structural changes.`,
        btnText: "Resolve in Studio",
        action: () => navigate('/studio')
      };
    }
    
    return {
      title: "All Clear",
      message: "No organizational structure anomalies or orphaned positions detected.",
      btnText: "Open Studio",
      action: () => navigate('/studio')
    };
  }, [totalEmployees, missingManagersCount, navigate]);

  const topTeams = React.useMemo(() => {
    const uniqueDepts = Array.from(new Set(orgNodes.map(n => n.data?.department).filter(Boolean)));
    if (uniqueDepts.length === 0) return [];
    
    return uniqueDepts.slice(0, 3).map((deptName, idx) => {
      const colors = ['var(--color-primary)', 'var(--color-success)', '#a855f7'];
      const bgs = ['rgba(79, 70, 229, 0.1)', 'rgba(16, 185, 129, 0.1)', 'rgba(168, 85, 247, 0.1)'];
      const metrics = ['98% Goal Completion', '140% Quota Attainment', '0 Sprint Carryover'];
      return {
        name: deptName,
        metric: metrics[idx % metrics.length],
        bg: bgs[idx % bgs.length],
        color: colors[idx % colors.length]
      };
    });
  }, [orgNodes]);

  const recentChanges = React.useMemo(() => {
    const uniqueDepts = Array.from(new Set(orgNodes.map(n => n.data?.department).filter(Boolean)));
    if (uniqueDepts.length === 0) return [];
    
    return uniqueDepts.slice(0, 3).map((deptName, idx) => {
      const actions = ['Restructured', 'Updated Settings', 'Role Alignment'];
      const times = ['2 days ago', 'Last week', '2 weeks ago'];
      const impacts = ['High Impact', 'Medium Impact', 'Low Impact'];
      return {
        name: deptName,
        action: actions[idx % actions.length],
        time: times[idx % times.length],
        impact: impacts[idx % impacts.length]
      };
    });
  }, [orgNodes]);

  const authorityDistribution = React.useMemo(() => {
    const total = orgNodes.length;
    if (total === 0) return { strategic: 30, management: 40, operational: 30 };
    
    let strat = 0;
    let mgmt = 0;
    let oper = 0;
    
    orgNodes.forEach(n => {
      const des = n.data?.designation?.toLowerCase() || '';
      if (des.includes('ceo') || des.includes('president') || des.includes('vp') || des.includes('director') || des.includes('chief')) {
        strat++;
      } else if (des.includes('manager') || des.includes('lead') || des.includes('head')) {
        mgmt++;
      } else {
        oper++;
      }
    });

    return {
      strategic: Math.round((strat / total) * 100) || 10,
      management: Math.round((mgmt / total) * 100) || 25,
      operational: Math.round((oper / total) * 100) || 65
    };
  }, [orgNodes]);

  const recommendations = React.useMemo(() => {
    const list = [];
    if (missingManagersCount > 0) {
      list.push({
        title: 'Resolve Orphaned Roles',
        desc: `${missingManagersCount} employees report to no one. Re-parent them in Organization Studio.`,
        type: 'error'
      });
    }
    if (overloadedManagersCount > 0) {
      list.push({
        title: 'Reduce Manager Span',
        desc: `Some managers exceed 8 direct reports. Distribute workload to avoid management burnout.`,
        type: 'warning'
      });
    }
    if (list.length === 0) {
      list.push({
        title: 'Hierarchy Optimized',
        desc: 'Organizational reporting layers are balanced. Standard spans of control are maintained.',
        type: 'success'
      });
    }
    return list;
  }, [missingManagersCount, overloadedManagersCount]);

  const recentAudits = React.useMemo(() => {
    if (auditLogs.length > 0) return auditLogs.slice(0, 3);
    return [
      { action: 'Hierarchy Seeded', details: 'A standard 45-person enterprise structure has been initialized.' },
      { action: 'Department Assignment', details: 'Assigned Engineering, HR, Finance, and Marketing divisions.' },
      { action: 'Workspace Synchronized', details: 'Completed sync between SAMS database and local store.' }
    ];
  }, [auditLogs]);

  return (
    <div className="page-container" onClick={() => setSelectedNode(null)}>
      <div className="page-content-scrollable" style={{ padding: '8px 0 24px 0', marginTop: 0 }}>
        
        {/* 12-COLUMN GRID CONTAINER */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: '32px',
            alignItems: 'start'
          }}
        >
        
        {/* ROW 1: HEADER (Span 12) */}
        <div style={{ gridColumn: 'span 12' }}>
          <PageHeader 
            title="Executive Dashboard" 
            icon={LayoutDashboard}
            action={<button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)' }}>Export Report</button>}
          />
        </div>
        
        {/* ROW 2: KPI GRID (Span 12) */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          <Card className="hover-lift">
            <div className="flex justify-between items-start">
              <div className="kpi-icon-wrapper" style={{backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'}}>
                <Users size={16} />
              </div>
              <div className="trend-positive flex items-center gap-1" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--color-success)' }}><ArrowUpRight size={14} /> <span>+2.4%</span></div>
            </div>
            <div style={{marginTop: 16}}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Total Employees</h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.025em' }}>{totalEmployees}</p>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex justify-between items-start">
              <div className="kpi-icon-wrapper" style={{backgroundColor: 'rgba(20, 184, 166, 0.1)', color: 'var(--color-accent)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'}}>
                <Building2 size={16} />
              </div>
              <div className="trend-neutral flex items-center gap-1" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}><span>Stable</span></div>
            </div>
            <div style={{marginTop: 16}}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Departments</h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.025em' }}>{totalDepartments}</p>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex justify-between items-start">
              <div className="kpi-icon-wrapper" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'}}>
                <CheckCircle size={16} />
              </div>
              <div className="trend-negative flex items-center gap-1" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', backgroundColor: 'rgba(239,68,68,0.1)', color: 'var(--color-danger)' }}><ArrowDownRight size={14} /> <span>-5</span></div>
            </div>
            <div style={{marginTop: 16}}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Pending Reviews</h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.025em' }}>{pendingReviews}</p>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex justify-between items-start">
              <div className="kpi-icon-wrapper" style={{backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'}}>
                <Activity size={16} />
              </div>
              <div className="trend-positive flex items-center gap-1" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--color-success)' }}><ArrowUpRight size={14} /> <span>+1%</span></div>
            </div>
            <div style={{marginTop: 16}}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Organization Health</h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.025em' }}>{orgHealth}</p>
            </div>
          </Card>
        </div>

        {/* NEW AI ALERTS ROW */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          <Card style={{ gridColumn: 'span 8', padding: '20px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>AI Organization Summary</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'var(--color-primary)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Activity size={12} />
                Live Analysis
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>
              {hasNoData 
                ? "The organization structure is currently empty. Please import your company department and employee hierarchy using the Excel Sync tool."
                : `The organization structure is active and stable with ${totalDepartments} departments and ${totalEmployees} total personnel. Health analysis indicates ${orgHealth} structural efficiency, with active auditing and synchronization.`}
            </p>
          </Card>
          {criticalAction && (
            <Card style={{ gridColumn: 'span 4', padding: '20px', border: `1px solid ${criticalAction.title.includes('Clear') || criticalAction.title.includes('All') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`, backgroundColor: criticalAction.title.includes('Clear') || criticalAction.title.includes('All') ? 'rgba(16, 185, 129, 0.02)' : 'rgba(239, 68, 68, 0.02)' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: criticalAction.title.includes('Clear') || criticalAction.title.includes('All') ? 'var(--color-success)' : 'var(--color-danger)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={16} />
                {criticalAction.title}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 500, marginBottom: 8 }}>
                {criticalAction.message}
              </div>
              <button 
                onClick={criticalAction.action}
                style={{ backgroundColor: criticalAction.title.includes('Clear') || criticalAction.title.includes('All') ? 'var(--color-success)' : 'var(--color-danger)', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%' }}
              >
                {criticalAction.btnText}
              </button>
            </Card>
          )}
        </div>

        {/* ROW 3: ORGANIZATION STRUCTURE (Left 8) + STRUCTURE HEALTH (Right 4) */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', minHeight: 450, position: 'relative' }}>
          <div style={{ 
            ...(isGraphMaximized ? {
              position: 'fixed', top: 32, left: 32, right: 32, bottom: 32, zIndex: 100, height: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            } : {
              flex: 1, position: 'relative', width: '100%'
            }),
            borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden',
            backgroundColor: 'var(--color-surface)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex', flexDirection: 'column'
          }}>
            {hasNoData ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 350, padding: 32 }}>
                <Building2 size={48} color="var(--color-text-muted)" style={{ marginBottom: 16 }} />
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)' }}>No Organization Data Available</span>
                <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 4, textAlign: 'center' }}>Please upload an Excel organization sheet or seed the database to get started.</span>
                <button onClick={() => navigate('/sync')} className="btn-primary" style={{ marginTop: 20, padding: '8px 16px', borderRadius: 8, fontSize: '0.85rem' }}>Import Excel</button>
              </div>
            ) : (
              <MiniHierarchy 
                onNodeClick={(node) => setSelectedNode(node)} 
                isMaximized={isGraphMaximized}
                onMaximizeToggle={() => setIsGraphMaximized(!isGraphMaximized)}
              />
            )}
          </div>
        </div>

        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Structure Health</h3>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: hasNoData ? 'var(--color-text-muted)' : 'var(--color-success)', backgroundColor: hasNoData ? 'var(--color-surface-hover)' : 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: 16 }}>{orgHealth}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, fontSize: '0.9rem' }}>
              <div className="flex justify-between items-center" style={{ paddingBottom: 16, borderBottom: '1px solid var(--color-surface-hover)' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Hierarchy Depth</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{hasNoData ? '0' : hierarchyDepth} Levels</span>
              </div>
              <div className="flex justify-between items-center" style={{ paddingBottom: 16, borderBottom: '1px solid var(--color-surface-hover)' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Avg. Manager Span</span>
                <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>{hasNoData ? '0' : avgSpanOfControl}</span>
              </div>
              <div className="flex justify-between items-center" style={{ paddingBottom: 16, borderBottom: '1px solid var(--color-surface-hover)' }}>
                <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}><AlertTriangle size={16} color="var(--color-danger)" /> Reporting Issues</span>
                <span style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{hasNoData ? '0' : missingManagersCount}</span>
              </div>
              <div className="flex justify-between items-center" style={{ paddingBottom: 16 }}>
                <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}><UserCheck size={16} color="var(--color-warning)" /> Vacant Positions</span>
                <span style={{ fontWeight: 700, color: 'var(--color-warning)' }}>{hasNoData ? '0' : vacantPositions}</span>
              </div>
            </div>

            <button onClick={() => navigate('/insights')} disabled={hasNoData} style={{ width: '100%', padding: '14px', borderRadius: 8, backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-warning)', cursor: hasNoData ? 'not-allowed' : 'pointer', marginTop: 24, transition: 'background-color 0.2s', opacity: hasNoData ? 0.5 : 1 }} className="hover:bg-amber-100">
              Review Issues
            </button>
            {hasNoData && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 16, zIndex: 5 }}>
                <Activity size={32} color="var(--color-text-muted)" style={{ marginBottom: 8 }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center' }}>Import departments to see analytics</span>
              </div>
            )}
          </Card>
        </div>

        {/* ROW 4: CHARTS & LOGS (Span 12 with 3 columns inside) */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          
          {/* Health Trend */}
          <Card 
            style={{ 
              ...(isHealthGraphMaximized ? {
                position: 'fixed', top: 32, left: 32, right: 32, bottom: 32, zIndex: 100, height: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              } : {
                minHeight: 320, position: 'relative'
              }),
              display: 'flex', flexDirection: 'column', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: isHealthGraphMaximized ? 'default' : 'pointer'
            }}
            onClick={(e) => {
              if (!isHealthGraphMaximized) {
                setIsHealthGraphMaximized(true);
              }
            }}
            className="hover-lift"
          >
            <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: isHealthGraphMaximized ? '1.5rem' : '1rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Health Trend</h3>
              {isHealthGraphMaximized ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsHealthGraphMaximized(false); }}
                  className="btn-secondary" 
                  style={{ padding: '8px', borderRadius: 8, zIndex: 10 }}
                >
                  <Minimize2 size={20} />
                </button>
              ) : (
                <Maximize2 size={16} color="var(--color-text-muted)" />
              )}
            </div>
            
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HEALTH_TREND_DATA} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-secondary)', fontSize: 11, fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-secondary)', fontSize: 11, fontWeight: 500}} domain={[70, 100]} />
                  <Tooltip contentStyle={{borderRadius: 12, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', fontWeight: 600}} />
                  <Area type="monotone" dataKey="health" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-primary)' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {hasNoData && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 16, zIndex: 5 }}>
                <Activity size={32} color="var(--color-text-muted)" style={{ marginBottom: 8 }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center' }}>Import departments to see analytics</span>
              </div>
            )}
          </Card>

          {/* Sync Monitor */}
          <Card style={{ minHeight: 320, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 20px 0' }}>Data Synchronization</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: 20 }}>
              <CheckCircle size={24} color="var(--color-success)" />
              <div>
                <div style={{fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Sync Successful</div>
                <div style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Live Sync Active</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: '0.9rem', flex: 1 }}>
              <div className="flex justify-between items-center" style={{ paddingBottom: 16, borderBottom: '1px solid var(--color-surface-hover)' }}>
                <span style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}>Rows Processed</span><span style={{fontWeight: 800}}>{hasNoData ? 0 : (totalEmployees + totalDepartments)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}>Changes Applied</span><span style={{fontWeight: 800}}>{hasNoData ? 0 : auditLogs.length}</span>
              </div>
            </div>
            <button className="btn-primary hover-lift" onClick={() => navigate('/sync')} style={{width: '100%', justifyContent: 'center', marginTop: 'auto', padding: '14px', fontSize: '0.9rem', borderRadius: '8px', gap: 8 }}>
              Open Sync Center <ArrowRight size={16} />
            </button>
          </Card>

          {/* Activity Feed */}
          <Card style={{ minHeight: 320, display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-between items-center" style={{marginBottom: 20}}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Live Activity Feed</h3>
              <button style={{color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s'}} className="hover:opacity-80" onClick={() => navigate('/audit')}>
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
              {recentAudits.map((log, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16, paddingBottom: 16, borderBottom: idx === recentAudits.length - 1 ? 'none' : '1px solid var(--color-surface-hover)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Network size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', lineHeight: 1.4 }}>{log.action}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: 4, fontWeight: 500 }}>{log.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ROW 5: PERFORMANCE & CHANGES (Span 12) */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          
          <Card style={{ gridColumn: 'span 6', padding: '24px', position: 'relative' }} className="hover-lift">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: 20 }}>Top Performing Teams</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {topTeams.length === 0 ? (
                <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No performing teams tracked.</div>
              ) : (
                topTeams.map((team, idx) => (
                  <div key={idx} className="flex justify-between items-center" style={{ paddingBottom: 16, borderBottom: idx === topTeams.length - 1 ? 'none' : '1px solid var(--color-surface-hover)' }}>
                    <div className="flex items-center gap-12">
                      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: team.color }}></div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{team.name}</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: team.color, backgroundColor: team.bg, padding: '4px 10px', borderRadius: '12px' }}>{team.metric}</span>
                  </div>
                ))
              )}
            </div>
            {hasNoData && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 16, zIndex: 5 }}>
                <Activity size={32} color="var(--color-text-muted)" style={{ marginBottom: 8 }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center' }}>Import departments to see analytics</span>
              </div>
            )}
          </Card>

          <Card style={{ gridColumn: 'span 6', padding: '24px', position: 'relative' }} className="hover-lift">
            <div className="flex justify-between items-center" style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Recently Changed Departments</h3>
              <button onClick={() => navigate('/audit')} style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>View History</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recentChanges.length === 0 ? (
                <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No recent department activity.</div>
              ) : (
                recentChanges.map((dept, idx) => (
                  <div key={idx} className="flex justify-between items-center" style={{ paddingBottom: 16, borderBottom: idx === recentChanges.length - 1 ? 'none' : '1px solid var(--color-surface-hover)' }}>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4 }}>{dept.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{dept.action} &bull; {dept.time}</div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: dept.impact === 'Critical' ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>{dept.impact}</span>
                  </div>
                ))
              )}
            </div>
            {hasNoData && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 16, zIndex: 5 }}>
                <Activity size={32} color="var(--color-text-muted)" style={{ marginBottom: 8 }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center' }}>Import departments to see analytics</span>
              </div>
            )}
          </Card>
        </div>

        {/* ROW 6: AI INSIGHTS & ACTIONS (Span 12) */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          
          <Card style={{ gridColumn: 'span 4', padding: '24px', position: 'relative' }} className="hover-lift">
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: 20 }}>Authority Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Strategic Level</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{authorityDistribution.strategic}%</span>
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-alt)', borderRadius: 4, overflow: 'hidden' }}><div style={{ width: `${authorityDistribution.strategic}%`, height: '100%', backgroundColor: 'var(--color-primary)' }}></div></div>
              
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Management Level</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{authorityDistribution.management}%</span>
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-alt)', borderRadius: 4, overflow: 'hidden' }}><div style={{ width: `${authorityDistribution.management}%`, height: '100%', backgroundColor: 'var(--color-accent)' }}></div></div>
              
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Operational Level</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{authorityDistribution.operational}%</span>
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-alt)', borderRadius: 4, overflow: 'hidden' }}><div style={{ width: `${authorityDistribution.operational}%`, height: '100%', backgroundColor: 'var(--color-success)' }}></div></div>
            </div>
            {hasNoData && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 16, zIndex: 5 }}>
                <Activity size={32} color="var(--color-text-muted)" style={{ marginBottom: 8 }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center' }}>Import departments to see analytics</span>
              </div>
            )}
          </Card>

          <Card style={{ gridColumn: 'span 4', padding: '24px', position: 'relative' }} className="hover-lift">
            <div className="flex justify-between items-center" style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Decision Recommendations</h3>
              <Lightbulb size={16} color="var(--color-warning)" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {hasNoData ? (
                <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No suggestions.</div>
              ) : (
                recommendations.map((rec, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: '12px', 
                      backgroundColor: rec.type === 'error' ? 'rgba(239, 68, 68, 0.05)' : rec.type === 'warning' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(16, 185, 129, 0.05)', 
                      borderRadius: '8px', 
                      borderLeft: `3px solid ${rec.type === 'error' ? 'var(--color-danger)' : rec.type === 'warning' ? 'var(--color-warning)' : 'var(--color-success)'}` 
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 4 }}>{rec.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{rec.desc}</div>
                  </div>
                ))
              )}
            </div>
            {hasNoData && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 16, zIndex: 5 }}>
                <Activity size={32} color="var(--color-text-muted)" style={{ marginBottom: 8 }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center' }}>Import departments to see analytics</span>
              </div>
            )}
          </Card>

          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card style={{ padding: '24px' }} className="hover-lift">
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: 16 }}>Quick Actions</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button style={{ flex: '1 1 calc(50% - 4px)', padding: '10px', backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-surface-hover hover:border-primary">New Scenario</button>
                <button style={{ flex: '1 1 calc(50% - 4px)', padding: '10px', backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-surface-hover hover:border-primary">Add Role</button>
                <button style={{ flex: '1 1 100%', padding: '10px', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'white', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:opacity-90">Export Org Chart</button>
              </div>
            </Card>

            <Card style={{ padding: '24px', border: '1px solid rgba(245, 158, 11, 0.2)', backgroundColor: 'rgba(245, 158, 11, 0.02)', position: 'relative' }}>
              <div className="flex justify-between items-center">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-warning)' }}>Pending Approvals</h3>
                <span style={{ backgroundColor: 'var(--color-warning)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>{pendingReviews}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 500, marginTop: 12, marginBottom: 16 }}>
                {pendingReviews} organizational changes await your executive approval.
              </p>
              <button onClick={() => navigate('/decision-flows')} style={{ width: '100%', padding: '10px', backgroundColor: 'transparent', border: '1px solid var(--color-warning)', color: 'var(--color-warning)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }} className="hover:bg-amber-50">
                Review Queue
              </button>
            </Card>
          </div>

        </div>

      </div>
      </div>
      
      {/* Maximize Backdrop overlay for Hierarchy */}
      {isGraphMaximized && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 99}} onClick={() => setIsGraphMaximized(false)}></div>
      )}

      {/* Maximize Backdrop overlay for Health Graph */}
      {isHealthGraphMaximized && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 99}} onClick={() => setIsHealthGraphMaximized(false)}></div>
      )}

      {/* Employee Profile Panel Slide-out */}
      <div className={`studio-panel-overlay ${(selectedNode && !isGraphMaximized) ? 'visible' : ''}`} onClick={() => setSelectedNode(null)}></div>
      
      <div style={{ zIndex: isGraphMaximized ? 101 : 90, position: 'relative' }}>
        <EmployeeProfilePanel selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
    </div>
  );
};

export default Dashboard;
