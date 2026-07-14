import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Video, Phone, User, Activity } from 'lucide-react';

const CallSimulationModal = ({ isOpen, onClose, employeeName, employeePhoto }) => {
  const [callState, setCallState] = useState('connecting'); // connecting, connected, ended
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setCallState('connecting');
      setCallDuration(0);
      
      // Simulate connecting delay
      setTimeout(() => {
        setCallState('connected');
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', zIndex: 99998, animation: 'fadeIn 0.2s' }}
      />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 380,
        backgroundColor: 'var(--color-surface)',
        borderRadius: 24,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px',
        animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1px solid var(--color-border)'
      }}>
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            {employeePhoto ? (
              <img src={employeePhoto} alt={employeeName} style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--color-surface-alt)' }} />
            ) : (
              <div style={{ width: 96, height: 96, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 700, border: '4px solid var(--color-surface-alt)' }}>
                {employeeName ? employeeName.charAt(0) : <User size={40} />}
              </div>
            )}
            {callState === 'connecting' && (
              <div style={{ position: 'absolute', top: -4, left: -4, right: -4, bottom: -4, border: '2px solid var(--color-primary)', borderRadius: '50%', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.5 }}></div>
            )}
          </div>
          
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 8px 0' }}>{employeeName || 'Unknown Caller'}</h2>
          
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            {callState === 'connecting' && 'Connecting...'}
            {callState === 'connected' && (
              <>
                <Activity size={14} color="var(--color-success)" style={{ animation: 'pulse 1s infinite' }} />
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{formatTime(callDuration)}</span>
              </>
            )}
            {callState === 'ended' && 'Call ended'}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            disabled={callState !== 'connected'}
            style={{ 
              width: 56, height: 56, borderRadius: '50%', 
              backgroundColor: isMuted ? 'var(--color-surface-hover)' : 'rgba(255,255,255,0.1)', 
              border: isMuted ? '1px solid var(--color-border)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: callState === 'connected' ? 'pointer' : 'not-allowed',
              color: isMuted ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
              transition: 'all 0.2s',
              opacity: callState !== 'connected' ? 0.5 : 1
            }}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <button 
            onClick={handleEndCall}
            style={{ 
              width: 72, height: 72, borderRadius: '50%', 
              backgroundColor: 'var(--color-danger)', 
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: 'pointer',
              color: 'white',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <PhoneOff size={32} />
          </button>
          
          <button 
            disabled={true}
            style={{ 
              width: 56, height: 56, borderRadius: '50%', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: 'not-allowed',
              color: 'var(--color-text-secondary)',
              opacity: 0.5
            }}
          >
            <Video size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CallSimulationModal;
