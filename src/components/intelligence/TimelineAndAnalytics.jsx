import React, { useState } from 'react';
import { FileSpreadsheet, Clock, Calendar, ChevronDown, Maximize2 } from 'lucide-react';
import AuditDetailDrawer from './AuditDetailDrawer';

const TimelineAndAnalytics = ({ auditLogs }) => {
  const [timelineFilter, setTimelineFilter] = useState('Today');
  const [selectedLog, setSelectedLog] = useState(null);
  
  if (!auditLogs) return null;

  return (
    <>
      <div className="card" style={{ 
        padding: '24px', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '16px', 
        border: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileSpreadsheet size={24} color="var(--color-primary)" /> Organization Activity
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
              Recent structural and organizational changes.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', backgroundColor: 'var(--color-surface-alt)', borderRadius: '24px', padding: '4px' }}>
              {['Today', 'This Week', 'This Month'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setTimelineFilter(filter)}
                  style={{ 
                    padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600,
                    backgroundColor: timelineFilter === filter ? '#FFFFFF' : 'transparent',
                    color: timelineFilter === filter ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    boxShadow: timelineFilter === filter ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '0 16px' }}>
          <div style={{ position: 'relative' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 15, width: 2, backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(auditLogs || []).slice(0, 6).map((log, index) => (
                <div 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  style={{ 
                    display: 'flex', 
                    gap: 24, 
                    position: 'relative', 
                    zIndex: 1,
                    cursor: 'pointer',
                    padding: '16px',
                    borderRadius: 12,
                    transition: 'background-color 0.2s',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FFFFFF', border: '3px solid var(--color-primary)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
                  </div>

                  <div style={{ flex: 1, paddingBottom: 16, borderBottom: index < 5 ? '1px solid var(--color-border)' : 'none', position: 'relative' }}>
                    
                    <div style={{ position: 'absolute', top: 0, right: 0, color: 'var(--color-text-muted)' }}>
                      <Maximize2 size={16} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {log.timestamp.includes('ago') ? <Clock size={14} /> : <Calendar size={14} />}
                        {log.timestamp}
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', letterSpacing: '0.05em', marginBottom: 4 }}>
                      {log.action.toUpperCase()}
                    </div>
                    
                    <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 8 }}>
                      {log.details.split('\n')[0] || log.action}
                    </div>
                    
                    {log.details.split('\n').length > 1 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                        {log.details.split('\n').slice(1).map((detailLine, idx) => (
                          <div key={idx} style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                            {detailLine}
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: 12 }}>
                      Performed by {log.user || 'Kanishka Suthar'}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button style={{ 
            background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '15px', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer'
          }}>
            View Complete Audit History <ChevronDown size={16} />
          </button>
        </div>
      </div>
      
      <AuditDetailDrawer 
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
      />
    </>
  );
};

export default TimelineAndAnalytics;
