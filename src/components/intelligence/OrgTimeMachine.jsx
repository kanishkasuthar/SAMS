import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Play, Pause, ChevronLeft, ChevronRight, X, Clock, AlertTriangle } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const OrgTimeMachine = ({ isOpen, onClose }) => {
  const { addToast } = useUIStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(100); // 0 to 100
  const [currentDate, setCurrentDate] = useState('July 2026 (Present)');

  const dates = [
    { value: 0, label: 'Jan 2024', event: 'Initial Seed Funding' },
    { value: 20, label: 'Jul 2024', event: 'Engineering Reorg' },
    { value: 40, label: 'Jan 2025', event: 'Series A Expansion' },
    { value: 60, label: 'Jul 2025', event: 'Acquired Acme Corp' },
    { value: 80, label: 'Jan 2026', event: 'Global Restructuring' },
    { value: 100, label: 'Jul 2026 (Present)', event: 'Current State' }
  ];

  useEffect(() => {
    // Find closest date label based on slider value
    const closestDate = dates.reduce((prev, curr) => {
      return (Math.abs(curr.value - sliderValue) < Math.abs(prev.value - sliderValue) ? curr : prev);
    });
    setCurrentDate(closestDate.label);

    // Simulate re-rendering the UI when moving through time
    if (sliderValue !== 100 && !isPlaying) {
      addToast(`Time Machine active: Viewing org state as of ${closestDate.label}`, 'info');
    }
  }, [sliderValue, isPlaying]);

  useEffect(() => {
    let interval;
    if (isPlaying && sliderValue < 100) {
      interval = setInterval(() => {
        setSliderValue(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    } else if (sliderValue >= 100) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sliderValue]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          width: '80%', maxWidth: 1000, zIndex: 9999,
          backgroundColor: 'var(--color-surface)', borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px var(--color-border)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}
      >
        {/* Glow effect at top based on time */}
        <div style={{ height: 4, width: '100%', background: sliderValue === 100 ? 'var(--color-success)' : 'var(--color-warning)' }}></div>
        
        <div style={{ padding: '24px 32px', display: 'flex', gap: 32, alignItems: 'center' }}>
          
          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <History size={24} color="var(--color-primary)" />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>ORGANIZATION TIME MACHINE</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: sliderValue === 100 ? 'var(--color-text-main)' : 'var(--color-warning)' }}>
                {currentDate}
              </div>
            </div>
          </div>

          {/* Slider Area */}
          <div style={{ flex: 1, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            
            {/* Markers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
              {dates.map((date, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 2, height: 8, backgroundColor: 'var(--color-border)', marginBottom: 4 }}></div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)' }}>{date.label.replace(' (Present)', '')}</div>
                </div>
              ))}
            </div>

            {/* Slider */}
            <input 
              type="range" 
              min="0" max="100" 
              value={sliderValue}
              onChange={(e) => {
                setSliderValue(parseInt(e.target.value));
                setIsPlaying(false);
              }}
              style={{
                width: '100%', cursor: 'pointer', accentColor: 'var(--color-primary)'
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              className="hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 4 }} />}
            </button>
            <div style={{ width: 1, height: 32, backgroundColor: 'var(--color-border)' }}></div>
            <button 
              onClick={() => {
                setSliderValue(100);
                setIsPlaying(false);
                addToast('Returned to Present day.', 'success');
                onClose();
              }}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: 'var(--color-surface-hover)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <X size={16} /> Exit
            </button>
          </div>
        </div>

        {/* Warning Banner if not present */}
        {sliderValue !== 100 && (
          <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <AlertTriangle size={16} color="var(--color-warning)" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}>
              You are viewing a historical snapshot of the organization. Edits and assignments are disabled in Time Machine mode.
            </span>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
};

export default OrgTimeMachine;
