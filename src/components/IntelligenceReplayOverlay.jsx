import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Building2, User } from 'lucide-react';

const IntelligenceReplayOverlay = ({ log, onClose }) => {
  const [stage, setStage] = useState(0); // 0: Before, 1: Animating, 2: After
  
  useEffect(() => {
    let timer1, timer2;
    if (stage === 0) {
      timer1 = setTimeout(() => setStage(1), 1500);
    } else if (stage === 1) {
      timer2 = setTimeout(() => setStage(2), 2000);
    }
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [stage]);

  const handleRestart = () => setStage(0);

  const getActionColor = (action) => {
    switch (action) {
      case 'Promotion': return 'var(--color-success)';
      case 'Transfer': return 'var(--color-primary)';
      case 'Hierarchy Update': return '#6366F1';
      case 'Role Change': return '#F59E0B';
      case 'Deletion': return 'var(--color-danger)';
      default: return 'var(--color-primary)';
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.98)', zIndex: 99999, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ padding: '4px 8px', borderRadius: 4, backgroundColor: getActionColor(log.action), color: 'white', fontSize: '0.75rem', fontWeight: 600 }}>
            {log.action}
          </div>
          <span style={{ color: 'white', fontWeight: 600 }}>Replay: {log.details}</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>| {log.timestamp}</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
          <X size={24} />
        </button>
      </div>

      {/* Main Stage */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        
        {/* Abstract Org Chart Representation */}
        <div style={{ width: 800, height: 500, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Top Node (CEO / Department Head) */}
          <div style={{ width: 220, padding: 16, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, zIndex: 2 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={20} color="rgba(255,255,255,0.8)" />
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Department Head</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>{log.department}</div>
            </div>
          </div>

          {/* Connectors */}
          <div style={{ width: 2, height: 60, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ width: 400, height: 2, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
             <div style={{ position: 'absolute', left: 0, top: 0, width: 2, height: 60, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
             <div style={{ position: 'absolute', right: 0, top: 0, width: 2, height: 60, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          </div>
          <div style={{ height: 60 }}></div>

          {/* Bottom Nodes Level */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: 400, position: 'absolute', top: 220 }}>
            
            {/* Left Manager */}
            <div style={{ width: 180, padding: 12, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
               <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <User size={16} color="rgba(255,255,255,0.8)" />
               </div>
               <div>
                 <div style={{ color: 'white', fontWeight: 600, fontSize: '0.8rem' }}>Manager A</div>
               </div>
            </div>

            {/* Right Manager */}
            <div style={{ width: 180, padding: 12, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
               <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <User size={16} color="rgba(255,255,255,0.8)" />
               </div>
               <div>
                 <div style={{ color: 'white', fontWeight: 600, fontSize: '0.8rem' }}>Manager B</div>
               </div>
            </div>
          </div>

          {/* The Subject Node (Animated) */}
          <AnimatePresence>
            <motion.div
              initial={false}
              animate={{
                x: stage === 0 ? -110 : (stage === 1 ? 0 : 110),
                y: stage === 0 ? 340 : (stage === 1 ? 400 : 340),
                scale: stage === 1 ? 1.1 : 1,
                borderColor: stage === 1 ? getActionColor(log.action) : 'rgba(255,255,255,0.1)',
                boxShadow: stage === 1 ? `0 0 20px ${getActionColor(log.action)}` : 'none'
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              style={{ 
                position: 'absolute', top: 0, left: 310,
                width: 180, padding: 12, backgroundColor: 'rgba(30, 41, 59, 1)', 
                border: '2px solid rgba(255,255,255,0.2)', borderRadius: 12, 
                display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 
              }}
            >
               {log.photo ? (
                 <img src={log.photo} alt={log.user} style={{ width: 32, height: 32, borderRadius: '50%' }} />
               ) : (
                 <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <User size={16} color="rgba(255,255,255,0.8)" />
                 </div>
               )}
               <div>
                 <div style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>Subject Node</div>
                 <div style={{ color: getActionColor(log.action), fontSize: '0.7rem', fontWeight: 600 }}>{stage === 2 ? 'Updated' : 'Current'}</div>
               </div>
            </motion.div>
          </AnimatePresence>

          {/* Dynamic connectors for subject node */}
          <motion.div
            animate={{
              height: stage === 0 ? 60 : 0,
              opacity: stage === 0 ? 1 : 0
            }}
            style={{ position: 'absolute', left: 200, top: 275, width: 2, backgroundColor: 'rgba(255,255,255,0.1)', transformOrigin: 'top' }}
          />
          <motion.div
            animate={{
              height: stage === 2 ? 60 : 0,
              opacity: stage === 2 ? 1 : 0
            }}
            style={{ position: 'absolute', right: 200, top: 275, width: 2, backgroundColor: getActionColor(log.action), transformOrigin: 'top' }}
          />

        </div>
      </div>

      {/* Footer Controls */}
      <div style={{ height: 80, backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={handleRestart} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
          <RotateCcw size={18} /> Restart Replay
        </button>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
          {stage === 0 ? 'Before State' : stage === 1 ? 'Applying Structural Changes...' : 'After State'}
        </div>
      </div>
    </div>
  );
};

export default IntelligenceReplayOverlay;
