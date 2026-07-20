import React, { useState } from 'react';
import { X, Play, Pause, RotateCcw, FastForward, Clock } from 'lucide-react';

const DecisionReplayModal = ({ isOpen, onClose }) => {
  const [selectedDecision, setSelectedDecision] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '500px', animation: 'scale-in 0.2s ease-out', overflow: 'hidden' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>
              <RotateCcw size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Decision Replay</h2>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Select a previous decision to replay its path.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {!isPlaying ? (
            <>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>Select Previous Decision</label>
              <select 
                value={selectedDecision}
                onChange={(e) => setSelectedDecision(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none', backgroundColor: 'white', marginBottom: '24px' }}
              >
                <option value="">-- Select Decision --</option>
                <option value="DEC-2026-1042">DEC-2026-1042 - Cloud Infrastructure Budget</option>
                <option value="DEC-2026-1038">DEC-2026-1038 - Engineering Hiring Expansion</option>
                <option value="DEC-2026-1029">DEC-2026-1029 - Product Launch Budget</option>
              </select>

              <button 
                disabled={!selectedDecision}
                onClick={() => setIsPlaying(true)}
                style={{ width: '100%', padding: '12px', backgroundColor: selectedDecision ? 'var(--color-primary)' : 'var(--color-surface-hover)', color: selectedDecision ? 'white' : 'var(--color-text-muted)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: selectedDecision ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Play size={18} /> Replay Decision
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '8px', bottom: '8px', width: '2px', backgroundColor: 'var(--color-border)' }}></div>
                
                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Clock size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)' }}>09:00</div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0' }}>Request Created</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Clock size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)' }}>09:12</div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0' }}>Department Validated</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Clock size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)' }}>13:20</div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0' }}>VP Approved</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1, opacity: 0.4 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                    <Clock size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)' }}>Next Day 11:45</div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0' }}>CFO Approved</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--color-surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'white', color: 'var(--color-text-main)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Pause size={16} /></button>
                  <button onClick={() => setIsPlaying(false)} style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'white', color: 'var(--color-text-main)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><RotateCcw size={16} /></button>
                </div>
                <div style={{ display: 'flex', gap: '4px', backgroundColor: 'white', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <button style={{ padding: '4px 8px', fontSize: '12px', fontWeight: 700, backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>0.5x</button>
                  <button style={{ padding: '4px 8px', fontSize: '12px', fontWeight: 700, backgroundColor: 'var(--color-surface-hover)', borderRadius: '4px', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer' }}>1x</button>
                  <button style={{ padding: '4px 8px', fontSize: '12px', fontWeight: 700, backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>2x</button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DecisionReplayModal;
