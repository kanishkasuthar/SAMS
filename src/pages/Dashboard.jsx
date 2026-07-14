import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, Users, Building2, CheckCircle, Activity, 
  ArrowRight, Network, Clock, AlertTriangle, UserCheck, Maximize2, Minimize2,
  LayoutDashboard
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
  const { nodes, departments, auditLogs } = useOrgStore();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isGraphMaximized, setIsGraphMaximized] = useState(false);
  const [isHealthGraphMaximized, setIsHealthGraphMaximized] = useState(false);

  const totalEmployees = nodes.filter(n => !n.data.isVacant).length;
  const totalDepartments = departments.length;
  const pendingReviews = 12; 
  const orgHealth = "94%";
  const recentAudits = auditLogs.slice(0, 3);

  return (
    <div className="page-container" style={{ padding: 'var(--space-4)', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <PageHeader 
        title="Organization Command Center" 
        icon={LayoutDashboard}
        action={<button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)' }}>Export Report</button>}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', overflowY: 'auto', paddingBottom: 'var(--space-4)' }} className="hide-scrollbar">
        
        {/* ROW 1: KPI GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
          <Card>
            <div className="flex justify-between items-start">
              <div className="kpi-icon-wrapper" style={{backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', width: 32, height: 32}}>
                <Users size={16} />
              </div>
              <div className="trend-positive flex items-center gap-1"><ArrowUpRight size={14} /> <span>+2.4%</span></div>
            </div>
            <div style={{marginTop: 12}}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Total Employees</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{totalEmployees}</p>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-start">
              <div className="kpi-icon-wrapper" style={{backgroundColor: 'rgba(20, 184, 166, 0.1)', color: 'var(--color-accent)', width: 32, height: 32}}>
                <Building2 size={16} />
              </div>
              <div className="trend-neutral flex items-center gap-1"><span>Stable</span></div>
            </div>
            <div style={{marginTop: 12}}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Departments</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{totalDepartments}</p>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-start">
              <div className="kpi-icon-wrapper" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', width: 32, height: 32}}>
                <CheckCircle size={16} />
              </div>
              <div className="trend-negative flex items-center gap-1"><ArrowDownRight size={14} /> <span>-5</span></div>
            </div>
            <div style={{marginTop: 12}}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Pending Reviews</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{pendingReviews}</p>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-start">
              <div className="kpi-icon-wrapper" style={{backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', width: 32, height: 32}}>
                <Activity size={16} />
              </div>
              <div className="trend-positive flex items-center gap-1"><ArrowUpRight size={14} /> <span>+1%</span></div>
            </div>
            <div style={{marginTop: 12}}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Organization Health</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{orgHealth}</p>
            </div>
          </Card>
        </div>

        {/* ROW 2: ORGANIZATION STRUCTURE PREVIEW (Compact) */}
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          {/* Hierarchy Canvas (70%) */}
          <div style={{ 
            ...(isGraphMaximized ? {
              position: 'fixed', top: 32, left: 32, right: 32, bottom: 32, zIndex: 100, height: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            } : {
              flex: 7, height: 320, position: 'relative'
            }),
            borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <MiniHierarchy 
              onNodeClick={(node) => setSelectedNode(node)} 
              isMaximized={isGraphMaximized}
              onMaximizeToggle={() => setIsGraphMaximized(!isGraphMaximized)}
            />
          </div>

          {/* Organization Summary Panel (30%) */}
          <Card style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Structure Health</h3>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-success)', backgroundColor: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 12 }}>94% Score</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, fontSize: '0.85rem' }}>
              <div className="flex justify-between items-center" style={{ paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Hierarchy Depth</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>6 Levels</span>
              </div>
              <div className="flex justify-between items-center" style={{ paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Avg. Manager Span</span>
                <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>8.4</span>
              </div>
              <div className="flex justify-between items-center" style={{ paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={14} color="var(--color-danger)" /> Reporting Issues</span>
                <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>3</span>
              </div>
              <div className="flex justify-between items-center" style={{ paddingBottom: 8 }}>
                <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><UserCheck size={14} color="var(--color-warning)" /> Unmapped</span>
                <span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>7</span>
              </div>
            </div>

            <button onClick={() => navigate('/insights')} style={{ width: '100%', padding: '8px', borderRadius: 6, backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-warning)', cursor: 'pointer', marginTop: 8 }}>
              Review 3 Issues
            </button>
          </Card>
        </div>

        {/* ROW 3: CHARTS, SYNC & LOGS (Compact 3-column) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          
          {/* Health Trend */}
          <Card 
            style={{ 
              ...(isHealthGraphMaximized ? {
                position: 'fixed', top: 32, left: 32, right: 32, bottom: 32, zIndex: 100, height: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              } : {
                height: 220, position: 'relative'
              }),
              display: 'flex', flexDirection: 'column', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: isHealthGraphMaximized ? 'default' : 'pointer'
            }}
            onClick={(e) => {
              if (!isHealthGraphMaximized) {
                setIsHealthGraphMaximized(true);
              }
            }}
          >
            <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: isHealthGraphMaximized ? '1.25rem' : '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>Health Trend</h3>
              {isHealthGraphMaximized ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsHealthGraphMaximized(false); }}
                  className="btn-secondary" 
                  style={{ padding: '8px', borderRadius: 8, zIndex: 10 }}
                >
                  <Minimize2 size={20} />
                </button>
              ) : (
                <Maximize2 size={14} color="var(--color-text-muted)" />
              )}
            </div>
            
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HEALTH_TREND_DATA} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-secondary)', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-secondary)', fontSize: 10}} domain={[70, 100]} />
                  <Tooltip contentStyle={{borderRadius: 8, border: '1px solid var(--color-border)', fontSize: '12px'}} />
                  <Area type="monotone" dataKey="health" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorHealth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Sync Monitor */}
          <Card style={{ height: 220, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 12px 0' }}>Excel Sync Monitor</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: 12 }}>
              <CheckCircle size={18} color="var(--color-success)" />
              <div>
                <div style={{fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-text-main)'}}>Last Sync Successful</div>
                <div style={{fontSize: '0.7rem', color: 'var(--color-text-secondary)'}}>Today at 09:42 AM</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8rem' }}>
              <div className="flex justify-between border-b" style={{ paddingBottom: 6, borderColor: 'var(--color-border)' }}>
                <span color="var(--color-text-secondary)">Rows Processed</span><span style={{fontWeight: 600}}>1,402</span>
              </div>
              <div className="flex justify-between">
                <span color="var(--color-text-secondary)">Changes Applied</span><span style={{fontWeight: 600}}>45</span>
              </div>
            </div>
            <button className="btn-primary" onClick={() => navigate('/sync')} style={{width: '100%', justifyContent: 'center', marginTop: 'auto', padding: '6px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)'}}>
              Sync Center <ArrowRight size={14} style={{marginLeft: 4}} />
            </button>
          </Card>

          {/* Activity Feed */}
          <Card style={{ height: 220, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="flex justify-between items-center" style={{marginBottom: 12}}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>Recent Activity</h3>
              <button style={{color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => navigate('/audit')}>
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }} className="hide-scrollbar">
              {recentAudits.map((log, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Network size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.2 }}>{log.action}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>{log.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Maximize Backdrop overlay for Hierarchy */}
      {isGraphMaximized && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 99}} onClick={() => setIsGraphMaximized(false)}></div>
      )}

      {/* Maximize Backdrop overlay for Health Graph */}
      {isHealthGraphMaximized && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 99}} onClick={() => setIsHealthGraphMaximized(false)}></div>
      )}

      {/* Employee Profile Panel Slide-out */}
      <div className={`studio-panel-overlay ${(selectedNode && !isGraphMaximized) ? 'visible' : ''}`} onClick={() => setSelectedNode(null)}></div>
      
      <div style={{ zIndex: isGraphMaximized ? 101 : undefined, position: 'relative' }}>
        <EmployeeProfilePanel selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
    </div>
  );
};

export default Dashboard;
