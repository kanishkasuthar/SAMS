import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, UserCheck, ShieldAlert, RefreshCcw, Network
} from 'lucide-react';
import { KPI_DATA, LOGIN_TREND_DATA, RECENT_ACTIVITIES, RECENT_PROJECTS } from '../data/mockData';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Enterprise Dashboard</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Overview of SAMS platform analytics and organization health.</p>
        </div>
        <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}>
          <RefreshCcw size={16} />
          <span>Sync Now</span>
        </button>
      </div>

      {/* KPI GRID */}
      <div className="dashboard-grid">
        {KPI_DATA.map((kpi) => (
          <div key={kpi.id} className="card kpi-card">
            <span className="kpi-title">{kpi.title}</span>
            <span className="kpi-value">{kpi.value}</span>
            <div className="kpi-footer">
              <div className={kpi.isPositive ? 'trend-positive flex items-center' : 'trend-negative flex items-center'}>
                {kpi.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{kpi.trend}</span>
              </div>
              <span style={{color: 'var(--color-text-muted)', fontWeight: 400}}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        {/* CHARTS SECTION */}
        <div className="flex-col gap-6">
          <div className="card" style={{padding: 24}}>
            <h3 className="section-header">Weekly Login Trend</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={LOGIN_TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: 12, border: 'none', boxShadow: 'var(--shadow-md)'}}
                  />
                  <Area type="monotone" dataKey="users" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="card" style={{padding: 24}}>
            <h3 className="section-header">Recent Projects Overview</h3>
            <div style={{overflowX: 'auto'}}>
              <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)'}}>
                    <th style={{padding: '12px 0', fontWeight: 500}}>Project Name</th>
                    <th style={{padding: '12px 0', fontWeight: 500}}>Manager</th>
                    <th style={{padding: '12px 0', fontWeight: 500}}>Status</th>
                    <th style={{padding: '12px 0', fontWeight: 500}}>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_PROJECTS.map(proj => (
                    <tr key={proj.id} style={{borderBottom: '1px solid var(--color-border)'}}>
                      <td style={{padding: '16px 0', fontWeight: 600}}>{proj.name}</td>
                      <td style={{padding: '16px 0', color: 'var(--color-text-muted)'}}>{proj.manager}</td>
                      <td style={{padding: '16px 0'}}>
                        <span style={{
                          padding: '4px 10px', 
                          borderRadius: 999, 
                          fontSize: '0.8rem', 
                          fontWeight: 600,
                          backgroundColor: proj.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : proj.status === 'Completed' ? 'rgba(79, 70, 229, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: proj.status === 'Active' ? 'var(--color-success)' : proj.status === 'Completed' ? 'var(--color-primary)' : 'var(--color-warning)'
                        }}>
                          {proj.status}
                        </span>
                      </td>
                      <td style={{padding: '16px 0'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                          <div style={{flex: 1, height: 6, backgroundColor: 'var(--color-border)', borderRadius: 999, overflow: 'hidden'}}>
                            <div style={{height: '100%', width: `${proj.progress}%`, backgroundColor: 'var(--color-primary)', borderRadius: 999}}></div>
                          </div>
                          <span style={{fontSize: '0.85rem', fontWeight: 600, width: 35}}>{proj.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="flex-col gap-6">
          <div className="card" style={{padding: 24}}>
            <h3 className="section-header">Recent Activities</h3>
            <div className="activity-list">
              {RECENT_ACTIVITIES.map(activity => {
                let Icon = Network;
                if (activity.type === 'sync') Icon = RefreshCcw;
                if (activity.type === 'security') Icon = ShieldAlert;
                if (activity.type === 'project') Icon = UserCheck;
                
                return (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon icon-${activity.status}`}>
                      <Icon size={18} />
                    </div>
                    <div className="activity-content">
                      <span className="activity-user">{activity.user}</span>
                      <span className="activity-action">{activity.action}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="card" style={{padding: 24, background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)', color: 'white'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: 8}}>Upgrade to SAMS Pro</h3>
            <p style={{opacity: 0.9, fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.5}}>Unlock advanced AI-driven organization insights, unlimited syncs, and 24/7 priority enterprise support.</p>
            <button style={{backgroundColor: 'white', color: 'var(--color-primary)', padding: '10px 20px', borderRadius: 'var(--radius-full)', fontWeight: 600, width: '100%'}}>
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
