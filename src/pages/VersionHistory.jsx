import React, { useState } from 'react';
import { History, GitCommit, ArrowLeftRight, CheckCircle, Search, Filter, RotateCcw, ChevronRight } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';

const VersionHistory = () => {
  const { versions } = useOrgStore();
  const { addToast } = useUIStore();
  const [selectedVersionId, setSelectedVersionId] = useState(versions[0]?.id);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVersions = versions.filter(v => 
    v.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedVersion = versions.find(v => v.id === selectedVersionId) || versions[0];

  const handleRestore = () => {
    addToast(`Restoring version ${selectedVersion.id}...`, 'info');
    setTimeout(() => {
      addToast(`Successfully rolled back to ${selectedVersion.id}!`, 'success');
      // Actually trigger restore logic here in real app
    }, 1500);
  };

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--color-text-main)'}}>Version History</h1>
          <p style={{color: 'var(--color-text-secondary)', marginTop: 4}}>Track and restore structural snapshots over time.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search versions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{display: 'flex', gap: 24, flex: 1, minHeight: 0}}>
        {/* LEFT SIDE: TIMELINE */}
        <div className="card" style={{width: 380, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
          <div style={{padding: '20px 24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}}>
            <h3 style={{fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-main)'}}>Snapshot Timeline</h3>
          </div>
          <div style={{flex: 1, overflowY: 'auto', padding: 24, position: 'relative'}}>
            <div style={{position: 'absolute', top: 24, bottom: 24, left: 39, width: 2, backgroundColor: 'var(--color-border)', zIndex: 0}}></div>
            
            <div className="flex-col gap-6">
              {filteredVersions.map((version) => {
                const isSelected = selectedVersionId === version.id;
                return (
                  <div 
                    key={version.id} 
                    className="flex gap-4 relative z-10"
                    style={{cursor: 'pointer'}}
                    onClick={() => setSelectedVersionId(version.id)}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', 
                      backgroundColor: version.active ? 'var(--color-primary)' : 'var(--color-surface)',
                      border: version.active ? 'none' : `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: version.active ? 'white' : (isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)'),
                      flexShrink: 0,
                      boxShadow: isSelected && !version.active ? '0 0 0 4px rgba(79, 70, 229, 0.1)' : 'none',
                      transition: 'all 0.2s'
                    }}>
                      <GitCommit size={16} />
                    </div>
                    
                    <div style={{
                      flex: 1, padding: 16, borderRadius: 8, 
                      backgroundColor: isSelected ? 'rgba(79, 70, 229, 0.05)' : 'var(--color-surface)', 
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      transition: 'all 0.2s'
                    }}>
                      <div className="flex justify-between items-center" style={{marginBottom: 4}}>
                        <h4 style={{fontWeight: 700, color: 'var(--color-text-main)'}}>{version.id}</h4>
                        {version.active && (
                          <CheckCircle size={14} color="var(--color-success)" />
                        )}
                      </div>
                      <div style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: 8}}>
                        {version.date}
                      </div>
                      <span style={{padding: '2px 8px', borderRadius: 999, fontSize: '0.7rem', fontWeight: 600, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)'}}>
                        {version.type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: VERSION DETAILS */}
        {selectedVersion && (
          <div className="card" style={{flex: 1, padding: 48, display: 'flex', flexDirection: 'column'}}>
            <div className="flex justify-between items-start" style={{marginBottom: 32}}>
              <div>
                <div className="flex items-center gap-3" style={{marginBottom: 12}}>
                  <h2 style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.025em'}}>{selectedVersion.id}</h2>
                  {selectedVersion.active && (
                    <span style={{padding: '4px 12px', borderRadius: 999, fontSize: '0.85rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 6}}>
                      <CheckCircle size={14} /> Current Live Version
                    </span>
                  )}
                </div>
                <p style={{color: 'var(--color-text-secondary)', fontSize: '1rem'}}>
                  Snapshot created by <strong style={{color: 'var(--color-text-main)'}}>{selectedVersion.author}</strong> on <strong>{selectedVersion.date}</strong>
                </p>
              </div>
              
              {!selectedVersion.active && (
                <button 
                  className="btn-primary" 
                  onClick={handleRestore}
                  style={{padding: '12px 24px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8}}
                >
                  <RotateCcw size={18} /> Restore this Version
                </button>
              )}
            </div>
            
            <div style={{backgroundColor: 'var(--color-bg)', padding: 32, borderRadius: 12, border: '1px solid var(--color-border)', flex: 1}}>
              <div className="flex items-center gap-3" style={{marginBottom: 24}}>
                <div style={{width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)'}}>
                  <ArrowLeftRight size={20} />
                </div>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Summary of Changes</h3>
              </div>
              
              <div style={{backgroundColor: 'var(--color-surface)', padding: 24, borderRadius: 8, border: '1px solid var(--color-border)', marginBottom: 24}}>
                <p style={{fontSize: '1.1rem', color: 'var(--color-text-main)', lineHeight: 1.6, margin: 0}}>
                  {selectedVersion.changes}
                </p>
              </div>
              
              <h4 style={{fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 16}}>Detailed Diff</h4>
              
              {selectedVersion.type === 'Excel Sync' ? (
                <div style={{display: 'flex', gap: 24}}>
                  <div className="flex-col gap-2 flex-1" style={{padding: 20, backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 8}}>
                    <span style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)'}}>+12</span>
                    <span style={{color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.9rem'}}>Employees Added</span>
                  </div>
                  <div className="flex-col gap-2 flex-1" style={{padding: 20, backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 8}}>
                    <span style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-warning)'}}>8</span>
                    <span style={{color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.9rem'}}>Structure Changes</span>
                  </div>
                  <div className="flex-col gap-2 flex-1" style={{padding: 20, backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 8}}>
                    <span style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-danger)'}}>-2</span>
                    <span style={{color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.9rem'}}>Archived Profiles</span>
                  </div>
                </div>
              ) : (
                <div style={{padding: 24, textAlign: 'center', color: 'var(--color-text-muted)', border: '1px dashed var(--color-border)', borderRadius: 8, backgroundColor: 'var(--color-surface)'}}>
                  No detailed diff available for this manual edit.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionHistory;
