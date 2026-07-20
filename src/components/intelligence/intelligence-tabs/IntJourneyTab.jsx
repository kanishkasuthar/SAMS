import React, { useState } from 'react';
import { History, Clock, ArrowRight, FileText, Settings } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';

const IntJourneyTab = ({ employee }) => {
  const { addToast } = useUIStore();
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!employee) return null;

  // Enhance career history with some mock data for the detailed panel
  const journeyEvents = (employee.careerHistory || []).map((ev, idx) => ({
    ...ev,
    id: `ev-${idx}`,
    type: ev.title.includes('Promoted') || ev.desc.includes('Promoted') ? 'PROMOTION' : 'TRANSFER',
    prevPosition: idx < employee.careerHistory.length - 1 ? employee.careerHistory[idx + 1].title : 'External Hire',
    newPosition: ev.title,
    prevDept: idx < employee.careerHistory.length - 1 ? employee.department : 'N/A',
    newDept: employee.department,
    prevManager: 'Sarah Jenkins',
    newManager: 'Sarah Jenkins',
    effectiveDate: ev.date,
    approvedBy: 'Sarah Jenkins',
    reason: ev.desc,
    hierarchyImpact: ev.title.includes('Manager') || ev.title.includes('VP') ? '12 employees moved under this position' : 'None',
    orgVersion: `ORG-V1${idx + 4}`,
    auditLogId: `AL-90${idx + 30}`
  })).reverse(); // Reverse to chronological order (assuming oldest is last)

  const handleTimeMachine = () => {
    // In a real implementation, this would trigger the OrgTimeMachine component globally
    addToast('Opening Organization Time Machine...', 'info');
    // Here we could update a global store to set the time machine to the event's date
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <History size={16} color="var(--color-primary)" />
        EMPLOYEE JOURNEY REPLAY
      </h3>

      <div style={{ display: 'flex', gap: 32, flex: 1, minHeight: 400 }}>
        {/* Timeline (Left) */}
        <div style={{ flex: 1, position: 'relative', paddingLeft: 16 }}>
          <div style={{ position: 'absolute', left: 23, top: 24, bottom: 24, width: 2, backgroundColor: 'var(--color-border)' }} />
          
          {journeyEvents.map((ev, idx) => (
            <div 
              key={ev.id} 
              style={{ display: 'flex', gap: 24, marginBottom: 32, cursor: 'pointer', opacity: selectedEvent?.id === ev.id ? 1 : 0.6, transition: 'all 0.2s' }}
              onClick={() => setSelectedEvent(ev)}
            >
              <div style={{ 
                width: 16, height: 16, borderRadius: '50%', 
                backgroundColor: selectedEvent?.id === ev.id ? 'var(--color-primary)' : 'var(--color-surface)',
                border: `2px solid ${selectedEvent?.id === ev.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                zIndex: 2,
                marginTop: 4
              }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: 4 }}>{ev.date}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{ev.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Detail Panel (Right) */}
        <div style={{ flex: 1, backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '24px' }}>
          {selectedEvent ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{ padding: '4px 10px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', fontSize: '11px', fontWeight: 700, borderRadius: '12px', letterSpacing: '0.05em' }}>
                  {selectedEvent.type}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 4 }}>Previous</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{selectedEvent.prevPosition}</div>
                </div>
                <ArrowRight size={16} color="var(--color-text-muted)" />
                <div style={{ flex: 1, textAlign: 'center', padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-primary)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 4 }}>New</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>{selectedEvent.newPosition}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', marginBottom: 32 }}>
                {[
                  { label: 'Effective Date', value: selectedEvent.effectiveDate },
                  { label: 'Approved By', value: selectedEvent.approvedBy },
                  { label: 'Reason', value: selectedEvent.reason },
                  { label: 'Hierarchy Impact', value: selectedEvent.hierarchyImpact },
                  { label: 'Organization Version', value: selectedEvent.orgVersion },
                  { label: 'Audit Log ID', value: selectedEvent.auditLogId },
                ].map((info, i) => (
                  <div key={i} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 4 }}>{info.label}</div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{info.value}</div>
                  </div>
                ))}
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                onClick={handleTimeMachine}
              >
                <Clock size={16} /> VIEW HIERARCHY AT THIS TIME
              </button>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              <History size={32} style={{ marginBottom: 16, opacity: 0.5 }} />
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Select a journey event</div>
              <div style={{ fontSize: '12px' }}>View details about promotions and transfers.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntJourneyTab;
