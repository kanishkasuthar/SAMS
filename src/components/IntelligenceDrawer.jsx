import React from 'react';
import { X, GitCommit, Play, ArrowRight, CheckCircle2, AlertTriangle, FileSpreadsheet, ShieldAlert, Zap, Network, UserPlus, FileDown, Shield, Users, ArrowUpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const IntelligenceDrawer = ({ log, insight, onClose, onReplay }) => {
  if (!log && !insight) return null;

  const renderVisualDifference = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Visual Difference</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ flex: 1, padding: 16, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>BEFORE</div>
          <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Manager</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Engineering</div>
        </div>
        <ArrowRight size={20} color="var(--color-text-muted)" />
        <div style={{ flex: 1, padding: 16, backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--color-success)', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginBottom: 8, fontWeight: 600 }}>CURRENT</div>
          <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Director</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Engineering</div>
        </div>
      </div>
    </div>
  );

  const renderEmployeeJourney = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Employee Journey</h3>
      <div style={{ position: 'relative', paddingLeft: 16 }}>
        <div style={{ position: 'absolute', top: 8, bottom: 8, left: 23, width: 2, backgroundColor: 'var(--color-border)' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {['Joined Company', 'Junior Engineer', 'Software Engineer', 'Senior Engineer', 'Current Position'].map((step, idx, arr) => (
            <div key={idx} style={{ display: 'flex', gap: 16, position: 'relative', zIndex: 1, alignItems: 'center' }}>
              <div style={{ 
                width: 16, height: 16, borderRadius: '50%', 
                backgroundColor: idx === arr.length - 1 ? 'var(--color-primary)' : 'var(--color-surface)',
                border: `3px solid ${idx === arr.length - 1 ? 'var(--color-bg)' : 'var(--color-border)'}`
              }}></div>
              <div style={{ fontSize: '0.9rem', fontWeight: idx === arr.length - 1 ? 600 : 500, color: idx === arr.length - 1 ? 'var(--color-text-main)' : 'var(--color-text-secondary)' }}>
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHierarchyUpdate = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Network size={18} color="#6366F1" /> Structural Changes
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ padding: 16, backgroundColor: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Affected Department</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{log.department}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Employees Moved</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{log.affectedEmployees}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Orphaned Nodes Resolved</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-success)' }}>2</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 12 }}>Reorganization Map</h4>
        <div style={{ height: 160, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
          <Network size={48} opacity={0.2} />
          <span style={{ marginLeft: 12, fontSize: '0.85rem' }}>Interactive map available on replay</span>
        </div>
      </div>
    </div>
  );

  const renderTransfer = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Users size={18} color="var(--color-primary)" /> Department Transfer
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Origin</div>
          <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Design Team</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Marketing</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: 4 }}>{log.affectedEmployees} Employees</div>
          <ArrowRight size={24} color="var(--color-primary)" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Destination</div>
          <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Digital Team</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Marketing</div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-danger)' }}>
        <ShieldAlert size={18} /> Critical Security Event
      </h3>
      <div style={{ padding: 16, backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 8 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <ShieldAlert size={24} color="var(--color-danger)" style={{ marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--color-danger)', marginBottom: 4 }}>Multiple Failed Authentication Attempts</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>The system detected an abnormal spike in failed login attempts from a single IP address.</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 12, backgroundColor: 'var(--color-surface)', borderRadius: 6, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Originating IP</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{log.ip}</div>
          </div>
          <div style={{ padding: 12, backgroundColor: 'var(--color-surface)', borderRadius: 6, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Target Account</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>admin@sams.local</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExcelSync = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <FileSpreadsheet size={18} color="var(--color-primary)" /> Excel Sync Pipeline
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 12, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Rows Imported</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-success)' }}>18</div>
        </div>
        <div style={{ padding: 12, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Rows Updated</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-primary)' }}>12</div>
        </div>
        <div style={{ padding: 12, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Conflicts</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-warning)' }}>0</div>
        </div>
        <div style={{ padding: 12, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Rows Failed</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-danger)' }}>0</div>
        </div>
      </div>

      <div style={{ position: 'relative', paddingLeft: 16 }}>
        <div style={{ position: 'absolute', top: 8, bottom: 8, left: 23, width: 2, backgroundColor: 'var(--color-success)' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {['Uploaded Excel', 'Validation Passed', 'Rows Imported', 'Hierarchy Updated', 'Sync Completed'].map((step, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 16, position: 'relative', zIndex: 1, alignItems: 'center' }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-success)', border: '3px solid var(--color-bg)' }}></div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-main)' }}>{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInsightDetails = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Affected Entities ({insight.count})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {insight.affectedEntities.length > 0 ? insight.affectedEntities.map((entity, idx) => (
          <div key={idx} style={{ padding: 16, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: insight.severity === 'high' ? 'var(--color-danger)' : 'var(--color-primary)' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-main)' }}>{entity}</span>
          </div>
        )) : (
           <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface-alt)', borderRadius: 8 }}>
             No specific entities affected by this insight.
           </div>
        )}
      </div>
    </div>
  );

  const renderLogContent = () => {
    switch(log.action) {
      case 'Excel Sync': return renderExcelSync();
      case 'Hierarchy Update': return renderHierarchyUpdate();
      case 'Transfer': return renderTransfer();
      case 'Security': return renderSecurity();
      case 'Promotion': return (
        <>
          {renderVisualDifference()}
          <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '0 24px' }}></div>
          {renderEmployeeJourney()}
        </>
      );
      default: return (
        <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Detailed intelligence view not available for this action type.
        </div>
      );
    }
  };

  return (
    <>
      <div className="studio-panel-overlay visible" onClick={onClose} style={{ zIndex: 9998 }}></div>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{ 
          position: 'fixed', top: 0, right: 0, bottom: 0, width: 450, 
          backgroundColor: 'var(--color-bg)', zIndex: 9999, boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-primary)', marginBottom: 8 }}>
              {insight ? 'AI Insight Deep Dive' : log.action}
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)', lineHeight: 1.3 }}>
              {insight ? insight.title : log.details}
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 8, display: 'flex', gap: 12 }}>
              {insight ? (
                 <span style={{ lineHeight: 1.5 }}>{insight.description}</span>
              ) : (
                 <>
                   <span>{log.timestamp}</span>
                   <span>•</span>
                   <span>{log.user}</span>
                 </>
              )}
            </div>
          </div>
          <button className="panel-close" onClick={onClose} style={{ marginTop: 4 }}><X size={20} /></button>
        </div>

        {log?.replayable && (
          <div style={{ padding: '16px 24px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
            <button 
              onClick={() => onReplay(log)}
              className="btn-primary w-full" 
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '10px 0', fontSize: '0.95rem', backgroundColor: 'var(--color-primary)' }}
            >
              <Play size={16} fill="currentColor" /> Replay Change
            </button>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {insight ? renderInsightDetails() : renderLogContent()}
        </div>
      </motion.div>
    </>
  );
};

export default IntelligenceDrawer;
