import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, X, MousePointer2, MonitorPlay, Maximize, RotateCcw, FastForward } from 'lucide-react';

const SessionReplayPlayer = ({ session, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef(null);
  const events = session?.events || [];
  const currentEvent = events[currentIndex];

  useEffect(() => {
    if (isPlaying && currentIndex < events.length - 1) {
      const baseDelay = 3000; // 3 seconds per event base
      const delay = baseDelay / speed;
      
      timerRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setProgress(((currentIndex + 1) / (events.length - 1)) * 100);
      }, delay);
    } else if (currentIndex >= events.length - 1) {
      setIsPlaying(false);
      setProgress(100);
    }

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentIndex, speed, events.length]);

  const handlePlayPause = () => {
    if (currentIndex >= events.length - 1) {
      setCurrentIndex(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  // The visualizer component renders different abstract UI states based on the event
  const renderVisualizer = () => {
    if (!currentEvent) return null;

    return (
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentEvent.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
        >
          {/* Abstract Mock UI Background based on Page */}
          <div style={{ width: '80%', height: '80%', backgroundColor: 'var(--color-surface)', borderRadius: 16, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', position: 'relative' }}>
            
            {/* Mock Topbar */}
            <div style={{ height: 40, borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
               <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-danger)' }}></div>
               <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-warning)' }}></div>
               <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></div>
               <div style={{ marginLeft: 16, fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>SAMS / {currentEvent.page}</div>
            </div>

            {/* Mock Content Area */}
            <div style={{ padding: 32, height: 'calc(100% - 40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              
              {/* Event specific visual */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                style={{ padding: '24px 32px', backgroundColor: 'var(--color-primary)', borderRadius: 12, color: 'white', textAlign: 'center', maxWidth: 400 }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>{currentEvent.action}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{currentEvent.description}</div>
              </motion.div>

              {/* Simulated cursor */}
              <motion.div
                initial={{ x: 100, y: 100, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                style={{ position: 'absolute', zIndex: 10 }}
              >
                <MousePointer2 size={32} color="var(--color-text-main)" fill="white" />
              </motion.div>
              
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 99999, display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MonitorPlay size={20} color="var(--color-primary)" />
          <span style={{ color: 'white', fontWeight: 600 }}>Session Replay: {session.id}</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>| {session.user}</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
          <X size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* Left: Replay Stage */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ flex: 1, padding: 32 }}>
            {renderVisualizer()}
          </div>

          {/* Player Controls Bottom Bar */}
          <div style={{ height: 80, backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 24 }}>
            
            <button onClick={handlePlayPause} style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: 4 }} />}
            </button>

            <button onClick={handleRestart} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }} title="Restart">
              <RotateCcw size={20} />
            </button>

            {/* Timeline slider (visual only for now) */}
            <div style={{ flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${progress}%`, backgroundColor: 'var(--color-primary)', borderRadius: 3, transition: 'width 0.3s ease' }}></div>
              <div style={{ position: 'absolute', top: '50%', left: `${progress}%`, transform: 'translate(-50%, -50%)', width: 16, height: 16, backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.5)', transition: 'left 0.3s ease' }}></div>
            </div>

            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600, width: 80, textAlign: 'center' }}>
              {currentEvent?.time || '00:00'}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
               <button 
                 onClick={() => setSpeed(s => s === 4 ? 0.5 : s * 2)}
                 style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
               >
                 <FastForward size={14} /> {speed}x
               </button>
            </div>

            <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
              <Maximize size={20} />
            </button>
          </div>
        </div>

        {/* Right: Event Log */}
        <div style={{ width: 350, backgroundColor: 'rgba(255,255,255,0.03)', borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: 'white', margin: 0, fontSize: '1rem', fontWeight: 600 }}>Event Timeline</h3>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map((event, idx) => {
              const isActive = idx === currentIndex;
              const isPast = idx < currentIndex;
              return (
                <div 
                  key={event.id}
                  style={{ 
                    padding: 16, 
                    borderRadius: 8, 
                    backgroundColor: isActive ? 'rgba(79, 70, 229, 0.2)' : 'transparent',
                    border: isActive ? '1px solid var(--color-primary)' : '1px solid transparent',
                    opacity: isActive ? 1 : isPast ? 0.7 : 0.4,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress((idx / (events.length - 1)) * 100);
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600 }}>{event.time}</span>
                    {isActive && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></span>}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{event.action}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>{event.page}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SessionReplayPlayer;
