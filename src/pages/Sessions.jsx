import React, { useState } from 'react';
import { Search, Filter, Play, Download, Clock, Activity, Users, FileText, ChevronRight, MonitorPlay } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import SessionDetailsDrawer from '../components/SessionDetailsDrawer';
import SessionReplayPlayer from '../components/SessionReplayPlayer';

const Sessions = () => {
  const { sessions } = useOrgStore();
  const { addToast } = useUIStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [replaySessionId, setReplaySessionId] = useState(null);

  const filteredSessions = sessions.filter(session => 
    session.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    session.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeSessions = sessions.filter(s => s.status === 'Active').length;
  const completedSessions = sessions.filter(s => s.status === 'Completed').length;
  const totalEvents = sessions.reduce((acc, curr) => acc + (curr.events?.length || 0), 0);

  const handleExport = (e, session) => {
    e.stopPropagation();
    addToast(`Exporting timeline for ${session.user} (JSON)`, 'success');
  };

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      
      {/* Header */}
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 12}}>
            <MonitorPlay size={28} color="var(--color-primary)" />
            Session Replay
          </h1>
          <p style={{color: 'var(--color-text-secondary)', marginTop: 4}}>Replay complete user journeys and organizational changes across the system.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
        <div className="card animate-fade-in" style={{ padding: 24, borderBottom: '4px solid var(--color-success)' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Active Sessions</h3>
            <div style={{ padding: 8, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 8, color: 'var(--color-success)' }}><Activity size={18} /></div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{activeSessions}</div>
        </div>
        
        <div className="card animate-fade-in" style={{ padding: 24, borderBottom: '4px solid var(--color-primary)' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Completed Today</h3>
            <div style={{ padding: 8, backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: 8, color: 'var(--color-primary)' }}><Users size={18} /></div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{completedSessions}</div>
        </div>

        <div className="card animate-fade-in" style={{ padding: 24, borderBottom: '4px solid #F59E0B' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Avg Session Time</h3>
            <div style={{ padding: 8, backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: 8, color: '#F59E0B' }}><Clock size={18} /></div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>42m</div>
        </div>

        <div className="card animate-fade-in" style={{ padding: 24, borderBottom: '4px solid #8B5CF6' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Events Recorded</h3>
            <div style={{ padding: 8, backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: 8, color: '#8B5CF6' }}><FileText size={18} /></div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{totalEvents}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center" style={{marginBottom: 16}}>
        <div className="topbar-search" style={{ width: 300, backgroundColor: 'var(--color-surface)' }}>
          <Search size={18} color="var(--color-text-muted)" />
          <input 
            type="text" 
            placeholder="Search by user or session ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'}}>
            <Filter size={16} />
            <span style={{fontWeight: 600, fontSize: '0.9rem'}}>All Time</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{overflowX: 'auto'}}>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)'}}>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase'}}>Session ID</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase'}}>User</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase'}}>Duration</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase'}}>Status</th>
              <th style={{padding: '16px 24px', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session, idx) => (
              <tr 
                key={session.id} 
                onClick={() => setSelectedSession(session)}
                style={{
                  borderBottom: idx === filteredSessions.length - 1 ? 'none' : '1px solid var(--color-border)', 
                  backgroundColor: 'var(--color-surface)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td style={{padding: '16px 24px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem'}}>{session.id}</td>
                <td style={{padding: '16px 24px'}}>
                  <div className="flex items-center gap-3">
                    <img src={session.photo} alt={session.user} style={{width: 32, height: 32, borderRadius: '50%'}} />
                    <div>
                      <div style={{fontWeight: 600, color: 'var(--color-text-main)', fontSize: '0.95rem'}}>{session.user}</div>
                      <div style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>{session.role}</div>
                    </div>
                  </div>
                </td>
                <td style={{padding: '16px 24px', color: 'var(--color-text-secondary)', fontSize: '0.9rem'}}>{session.duration}</td>
                <td style={{padding: '16px 24px'}}>
                  <span style={{
                    padding: '4px 8px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                    backgroundColor: session.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-surface-alt)',
                    color: session.status === 'Active' ? 'var(--color-success)' : 'var(--color-text-muted)'
                  }}>
                    {session.status}
                  </span>
                </td>
                <td style={{padding: '16px 24px', textAlign: 'right'}}>
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setReplaySessionId(session.id); }}
                      className="btn-primary" 
                      style={{padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 20}}
                    >
                      <Play size={12} fill="currentColor" /> Replay
                    </button>
                    <button 
                      onClick={(e) => handleExport(e, session)}
                      className="btn-secondary" 
                      style={{padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 20}}
                    >
                      <Download size={12} /> Export
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Side Drawer if selected */}
      {selectedSession && (
        <SessionDetailsDrawer 
          session={selectedSession} 
          onClose={() => setSelectedSession(null)} 
          onReplay={(id) => { setSelectedSession(null); setReplaySessionId(id); }}
        />
      )}

      {/* Render Replay Player if selected */}
      {replaySessionId && (
        <SessionReplayPlayer 
          session={sessions.find(s => s.id === replaySessionId)} 
          onClose={() => setReplaySessionId(null)} 
        />
      )}

    </div>
  );
};

export default Sessions;
