import React from 'react';
import { History, GitCommit, ArrowLeftRight, CheckCircle, Search, Filter } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';

const VersionHistory = () => {
  const { versions: VERSIONS_DATA } = useOrgStore();

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Version History</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Track and restore structural snapshots over time.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search versions..." />
          </div>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="card" style={{padding: '32px 48px', position: 'relative'}}>
        {/* Timeline Line */}
        <div style={{position: 'absolute', top: 48, bottom: 48, left: 63, width: 2, backgroundColor: 'var(--color-border)', zIndex: 0}}></div>

        <div className="flex-col gap-8">
          {VERSIONS_DATA.map((version, idx) => (
            <div key={version.id} className="flex gap-6 relative z-10">
              <div style={{
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                backgroundColor: version.active ? 'var(--color-primary)' : 'var(--color-surface)',
                border: version.active ? 'none' : '2px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: version.active ? 'white' : 'var(--color-text-muted)',
                marginTop: 4,
                flexShrink: 0
              }}>
                <GitCommit size={16} />
              </div>
              
              <div className="card w-full" style={{padding: 24, backgroundColor: version.active ? 'rgba(79, 70, 229, 0.02)' : 'var(--color-surface)', borderColor: version.active ? 'var(--color-primary)' : 'var(--color-border)'}}>
                <div className="flex justify-between items-start" style={{marginBottom: 16}}>
                  <div>
                    <div className="flex items-center gap-3" style={{marginBottom: 4}}>
                      <h3 style={{fontSize: '1.1rem', fontWeight: 700}}>{version.id}</h3>
                      {version.active && (
                        <span style={{padding: '2px 8px', borderRadius: 999, fontSize: '0.7rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 4}}>
                          <CheckCircle size={12} /> Active Version
                        </span>
                      )}
                      <span style={{padding: '2px 8px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 500, backgroundColor: 'rgba(15, 23, 42, 0.05)'}}>
                        {version.type}
                      </span>
                    </div>
                    <p style={{color: 'var(--color-text-muted)', fontSize: '0.85rem'}}>Created by <span style={{fontWeight: 600, color: 'var(--color-text-main)'}}>{version.author}</span> on {version.date}</p>
                  </div>
                  {!version.active && (
                    <button className="card" style={{padding: '6px 12px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)'}}>
                      Restore Version
                    </button>
                  )}
                </div>
                
                <div className="flex items-start gap-3" style={{padding: 16, backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)'}}>
                  <ArrowLeftRight size={16} color="var(--color-text-muted)" style={{marginTop: 2}} />
                  <div>
                    <span style={{fontWeight: 600, fontSize: '0.9rem'}}>Summary of Changes</span>
                    <p style={{color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 4}}>{version.changes}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;
