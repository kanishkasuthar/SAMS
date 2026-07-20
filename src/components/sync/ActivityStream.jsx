import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';

const MOCK_EVENTS = [
  "✔ 142 employees imported.",
  "✔ 3 departments updated.",
  "✔ Authority recalculated.",
  "✔ Projects reassigned.",
  "✔ Duplicate removed.",
  "✔ Finance hierarchy fixed.",
  "✔ Roles normalized."
];

const ActivityStream = ({ isSyncing }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (isSyncing) {
      setEvents([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < MOCK_EVENTS.length) {
          setEvents(prev => [...prev, MOCK_EVENTS[i]]);
          i++;
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSyncing]);

  return (
    <Card style={{ padding: '24px', height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 16 }}>Live Activity Stream</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }} className="hide-scrollbar">
        {events.length === 0 && !isSyncing && (
          <div style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontStyle: 'italic' }}>Waiting for synchronization to begin...</div>
        )}
        
        {events.map((evt, idx) => (
          <div key={idx} className="animate-in slide-in-from-bottom-2 fade-in duration-300" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <CheckCircle2 size={16} color="var(--color-success)" />
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{evt.replace('✔ ', '')}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityStream;
