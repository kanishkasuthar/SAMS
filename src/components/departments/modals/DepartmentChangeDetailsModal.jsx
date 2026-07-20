import React from 'react';
import { X, History, FileText, Download, GitBranch } from 'lucide-react';

const DepartmentChangeDetailsModal = ({ isOpen, onClose, event, department, onTimeMachine }) => {
  if (!isOpen || !event) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '896px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'scale-in 0.2s ease-out' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', color: 'var(--color-primary)' }}>
              <FileText size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Department Change Details</h2>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Event {event.id} • {department.name}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', color: 'var(--color-text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-surface)', padding: '24px' }}>
          <div style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Event Info Grid */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Event Type</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{event.type}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Timestamp</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{event.date}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Changed By</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{event.author}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Org Version</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>{event.version}</div>
              </div>
            </div>

            {/* Change Summary */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Change Summary</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
                {department.name} reporting structure was reorganized to reduce manager workload and improve technical ownership.
                This change affected multiple sub-teams and redistributed authority pathways.
              </p>
            </div>

            {/* Before / After Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
              {/* BEFORE */}
              <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', margin: '0 0 16px 0' }}>Before State</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Department Head</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{event.prevHead || 'Michael Scott'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Employees</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>100</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Managers</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>6</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Hierarchy Depth</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>7</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Authority Concentration</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-danger)' }}>84%</span>
                  </div>
                </div>
              </div>

              {/* AFTER */}
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid rgba(79, 70, 229, 0.2)', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', margin: '0 0 16px 0' }}>After State</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-surface-hover)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Department Head</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#4338CA' }}>{event.newHead || department.head}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-surface-hover)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Employees</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#4338CA' }}>142</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-surface-hover)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Managers</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#4338CA' }}>9</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-surface-hover)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Hierarchy Depth</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-success)' }}>5</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Authority Concentration</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-success)' }}>76%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Strip */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Impact Analysis</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-primary)' }}>{event.affected || 42}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Employees Affected</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-primary)' }}>{event.reportingChanges || 18}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Reporting Changes</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-primary)' }}>6</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Projects Updated</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-primary)' }}>4</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Decision Flows</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--color-text-main)', cursor: 'pointer' }}>Close</button>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '8px 20px', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}>
              <FileText size={16}/> View Audit Log
            </button>
            <button style={{ padding: '8px 20px', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}>
              <GitBranch size={16}/> View Org Version
            </button>
            <button onClick={() => { onClose(); onTimeMachine(event); }} style={{ padding: '8px 20px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
              <History size={16}/> View in Time Machine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChangeDetailsModal;
