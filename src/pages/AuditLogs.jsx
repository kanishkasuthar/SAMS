import React, { useState } from 'react';
import { Search, Filter, Download, Activity, Play, TrendingUp, Users, RefreshCcw, ShieldAlert, ArrowUpRight, Zap, Target, SlidersHorizontal, Settings2, BarChart2, CalendarDays, History, AlertTriangle } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import IntelligenceDrawer from '../components/IntelligenceDrawer';
import IntelligenceReplayOverlay from '../components/IntelligenceReplayOverlay';
import RollbackConfirmationModal from '../components/audit/RollbackConfirmationModal';

const AuditLogs = () => {
  const { auditLogs: LOGS, insights } = useOrgStore();
  const { addToast } = useUIStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [replayLog, setReplayLog] = useState(null);
  const [timeMachineValue, setTimeMachineValue] = useState(100);
  const [showRollbackModal, setShowRollbackModal] = useState(false);

  const getActionColor = (action) => {
    switch (action) {
      case 'Promotion': return 'var(--color-success)';
      case 'Transfer': return 'var(--color-primary)';
      case 'Hierarchy Update': return '#6366F1';
      case 'Role Change': return '#F59E0B';
      case 'Excel Sync': return '#8B5CF6';
      case 'Project Assignment': return '#14B8A6';
      case 'Version Restore': return '#64748B';
      case 'Deletion': return 'var(--color-danger)';
      default: return 'var(--color-primary)';
    }
  };

  const getImpactBadge = (impact) => {
    const colors = {
      Low: { bg: 'rgba(100, 116, 139, 0.1)', text: '#64748B' },
      Medium: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B' },
      High: { bg: 'rgba(99, 102, 241, 0.1)', text: '#6366F1' },
      Critical: { bg: 'rgba(239, 68, 68, 0.1)', text: 'var(--color-danger)' },
    };
    const c = colors[impact] || colors.Low;
    return (
      <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 700, backgroundColor: c.bg, color: c.text, textTransform: 'uppercase' }}>
        {impact}
      </span>
    );
  };

  const handleExport = () => {
    addToast('Executive Report exported successfully.', 'success');
  };

  const filteredLogs = (LOGS || []).filter(l => 
    (activeFilter === 'All' || 
     (activeFilter === 'Critical Events' ? l.impact === 'Critical' : l.action === activeFilter))
  );

  return (
    <div className="page-container" style={{ backgroundColor: 'var(--color-bg)' }}>
      
      {/* 1. Header & Live Monitor */}
      <div className="flex justify-between items-end" style={{ marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Activity size={28} color="var(--color-primary)" />
            Organization Intelligence Center
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: 4 }}>Monitor, analyze and replay every structural and organizational change across the enterprise.</p>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 20, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-success)', letterSpacing: '0.05em' }}>LIVE • 8 Active Users</span>
          </div>
          <button className="btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 20 }}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* 2. Top Organization Summary & Time Machine */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 24, marginBottom: 24 }}>
        
        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          <div className="card" style={{ padding: '16px', borderTop: '3px solid var(--color-primary)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Employees Updated</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>18 <TrendingUp size={16} color="var(--color-success)" /></div>
          </div>
          <div className="card" style={{ padding: '16px', borderTop: '3px solid var(--color-success)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Promotions</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>4</div>
          </div>
          <div className="card" style={{ padding: '16px', borderTop: '3px solid #6366F1' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Dept Transfers</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>3</div>
          </div>
          <div className="card" style={{ padding: '16px', borderTop: '3px solid #8B5CF6' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Excel Syncs</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>1</div>
          </div>
          <div className="card" style={{ padding: '16px', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderTop: '3px solid var(--color-success)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Org Health</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)' }}>94%</div>
          </div>
        </div>

        {/* Time Machine */}
        <div className="card" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 6 }}><History size={16} color="var(--color-primary)" /> Time Machine</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{timeMachineValue === 100 ? 'Today' : 'Past'}</div>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={timeMachineValue} 
            onChange={(e) => setTimeMachineValue(e.target.value)}
            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-primary)' }} 
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            <span>Last Month</span>
            <span>Last Week</span>
            <span>Yesterday</span>
            <span>Today</span>
          </div>
        </div>

      </div>

      {/* 3. Middle Section (Timeline, Heatmap, Insights, Live Feed) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Health Timeline & Heatmap row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Health Timeline */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><BarChart2 size={16} color="var(--color-primary)" /> Organization Health Timeline</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 12, left: 20, right: 20, height: 2, backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>
                {[ {t: '9:00 AM', v: 96}, {t: '11:30 AM', v: 95}, {t: '2:00 PM', v: 94}, {t: '4:30 PM', v: 95} ].map((point, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{point.t}</div>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-success)' }}></div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{point.v}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><Target size={16} color="var(--color-primary)" /> Most Modified Departments</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { name: 'Engineering', val: 85, color: '#4F46E5' },
                  { name: 'Operations', val: 65, color: '#6366F1' },
                  { name: 'HR', val: 40, color: '#8B5CF6' },
                  { name: 'Finance', val: 20, color: '#F59E0B' }
                ].map(dept => (
                  <div key={dept.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 80, fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{dept.name}</div>
                    <div style={{ flex: 1, height: 8, backgroundColor: 'var(--color-surface-alt)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${dept.val}%`, height: '100%', backgroundColor: dept.color, borderRadius: 4 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="card" style={{ padding: 24, backgroundColor: 'rgba(79, 70, 229, 0.03)', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)' }}><Zap size={16} /> AI Organization Insights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
               {insights.slice(0, 4).map(insight => (
                 <div 
                   key={insight.id}
                   onClick={() => setSelectedInsight(insight)}
                   style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, backgroundColor: 'var(--color-surface)', borderRadius: 8, cursor: 'pointer', transition: 'box-shadow 0.2s', border: '1px solid transparent' }}
                   className="hover:shadow-md hover:border-indigo-100"
                 >
                   <div style={{ 
                     padding: 6, borderRadius: 6, 
                     backgroundColor: insight.severity === 'high' ? 'rgba(239, 68, 68, 0.1)' : insight.severity === 'medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                     color: insight.severity === 'high' ? 'var(--color-danger)' : insight.severity === 'medium' ? '#F59E0B' : '#6366F1'
                   }}>
                     {insight.severity === 'high' ? <ShieldAlert size={16} /> : insight.severity === 'medium' ? <AlertTriangle size={16} /> : <Zap size={16} />}
                   </div>
                   <div>
                     <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 2 }}>{insight.title}</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{insight.description}</div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Feed & Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Live Activity Feed */}
          <div className="card" style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={16} color="var(--color-primary)" /> Live Activity Stream</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', maxHeight: 300, paddingRight: 8 }}>
              {LOGS.slice(0, 5).map(log => (
                <div key={log.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {log.photo ? (
                     <img src={log.photo} alt={log.user} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                  ) : (
                     <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Settings2 size={16} /></div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{log.user}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{log.timestamp}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                      <span style={{ color: getActionColor(log.action), fontWeight: 600 }}>{log.action}</span> • {log.department || 'System'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Smart Filters & Search */}
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Intelligence Categories</div>
        <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: 4 }}>
          {['All', 'Promotion', 'Transfer', 'Hierarchy Update', 'Excel Sync', 'Critical Events'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{ 
                padding: '6px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                backgroundColor: activeFilter === filter ? 'var(--color-primary)' : 'var(--color-surface)',
                color: activeFilter === filter ? 'white' : 'var(--color-text-secondary)',
                border: activeFilter === filter ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Intelligent Audit Table */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Action</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Details</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Impact</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Version</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', textAlign: 'right' }}>Replay</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => (
              <tr 
                key={log.id} 
                onClick={() => setSelectedLog(log)}
                style={{ 
                  borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid var(--color-border)', 
                  backgroundColor: 'var(--color-surface)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ padding: '4px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.5)', border: `1px solid ${getActionColor(log.action)}`, color: getActionColor(log.action) }}>
                      {log.action}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '0.9rem', marginBottom: 4 }}>{log.details}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', gap: 8 }}>
                    <span>{log.user}</span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  {getImpactBadge(log.impact)}
                </td>
                <td style={{ padding: '16px 24px', color: 'var(--color-text-secondary)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  {log.version}
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  {log.replayable ? (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setReplayLog(log); }}
                      className="btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 20, backgroundColor: 'var(--color-primary)' }}
                    >
                      <Play size={12} fill="currentColor" /> Replay
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowRollbackModal(true); }}
                      className="btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 20 }}
                    >
                      <History size={12} fill="currentColor" /> Rollback
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render unified side drawer if a log or insight is selected */}
      {(selectedLog || selectedInsight) && (
        <IntelligenceDrawer 
          log={selectedLog} 
          insight={selectedInsight}
          onClose={() => { setSelectedLog(null); setSelectedInsight(null); }} 
          onReplay={(l) => { setSelectedLog(null); setSelectedInsight(null); setReplayLog(l); }}
        />
      )}

      {/* Render Replay Overlay if replay is triggered */}
      {replayLog && (
        <IntelligenceReplayOverlay 
          log={replayLog} 
          onClose={() => setReplayLog(null)} 
        />
      )}

      <RollbackConfirmationModal 
        isOpen={showRollbackModal} 
        onClose={() => setShowRollbackModal(false)} 
      />
    </div>
  );
};

export default AuditLogs;
