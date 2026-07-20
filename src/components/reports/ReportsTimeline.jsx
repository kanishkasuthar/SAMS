import React from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const TIMELINE_EVENTS = [
  { id: 1, type: 'upcoming', title: 'Q3 Financial Review', time: 'Today, 2:00 PM', status: 'Pending Generation' },
  { id: 2, type: 'recurring', title: 'Weekly Engineering Sync', time: 'Tomorrow, 9:00 AM', status: 'Scheduled' },
  { id: 3, type: 'approval', title: 'Board Presentation Draft', time: 'Oct 24, 10:00 AM', status: 'Awaiting Approval' },
  { id: 4, type: 'recurring', title: 'Monthly HR Pulse', time: 'Nov 1, 8:00 AM', status: 'Scheduled' },
];

const ReportsTimeline = () => {
  const { addToast } = useUIStore();

  return (
    <div className="card" style={{ padding: '24px', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <CalendarIcon size={20} color="var(--color-primary)" />
        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>Scheduled Reports Timeline</h3>
      </div>
      
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        {TIMELINE_EVENTS.map(event => (
          <div key={event.id} onClick={() => addToast(`Opening timeline event: ${event.title}`, "info")} className="hover-lift" style={{ 
            minWidth: '250px', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '12px',
            cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{event.title}</div>
               {event.type === 'upcoming' ? <Clock size={16} color="var(--color-primary)" /> : 
                event.type === 'approval' ? <AlertCircle size={16} color="var(--color-warning)" /> : 
                <CheckCircle2 size={16} color="var(--color-success)" />}
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CalendarIcon size={12} /> {event.time}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '6px' }}>
                {event.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsTimeline;
