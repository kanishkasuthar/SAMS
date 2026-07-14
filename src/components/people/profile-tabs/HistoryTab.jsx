import React from 'react';
import { motion } from 'framer-motion';
import { History, Award, Briefcase, RefreshCw, FileSignature, BookOpen, Star } from 'lucide-react';

const HistoryTab = ({ employee }) => {
  if (!employee) return null;

  const history = employee.careerHistory || [
    { title: 'Joined Company', date: 'Jan 2020', desc: 'Hired as initial employee.' }
  ];

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('promot') || t.includes('chief') || t.includes('vp')) return Award;
    if (t.includes('transfer') || t.includes('moved')) return RefreshCw;
    if (t.includes('certif') || t.includes('train')) return BookOpen;
    if (t.includes('join') || t.includes('hire')) return FileSignature;
    if (t.includes('salary') || t.includes('bonus')) return Star;
    return Briefcase;
  };

  const getColor = (title) => {
    const t = title.toLowerCase();
    if (t.includes('promot') || t.includes('chief') || t.includes('vp')) return 'var(--color-success)';
    if (t.includes('transfer') || t.includes('moved')) return 'var(--color-warning)';
    if (t.includes('join') || t.includes('hire')) return 'var(--color-primary)';
    return 'var(--color-text-secondary)';
  };

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      <div className="card" style={{ padding: 32 }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
          <History size={20} color="var(--color-primary)" /> Immutable Career Timeline
        </h3>
        
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, backgroundColor: 'var(--color-border)' }}></div>

          {history.map((event, i) => {
            const IconComponent = getIcon(event.title);
            const color = getColor(event.title);

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.15 }}
                style={{ position: 'relative', marginBottom: 40 }}
              >
                {/* Node Marker */}
                <div style={{ 
                  position: 'absolute', left: -32, top: 0, width: 24, height: 24, borderRadius: '50%', 
                  backgroundColor: 'var(--color-surface)', border: `2px solid ${color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }}></div>
                </div>

                <div className="card" style={{ padding: 20, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
                  {/* Subtle Background Icon */}
                  <IconComponent size={120} color={color} style={{ position: 'absolute', right: -20, top: -20, opacity: 0.03, transform: 'rotate(-15deg)' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>{event.title}</span>
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{event.desc}</div>
                    </div>
                    <div style={{ padding: '4px 12px', backgroundColor: 'var(--color-surface-hover)', borderRadius: 16, fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <History size={14} /> {event.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* End Node */}
          <div style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', left: -25, top: 0, width: 12, height: 12, borderRadius: '50%', 
              backgroundColor: 'var(--color-border)', zIndex: 2
            }}></div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HistoryTab;
