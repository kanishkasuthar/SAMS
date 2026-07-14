import React from 'react';
import { X, MapPin, Navigation2, Building, Users } from 'lucide-react';

const LocationMapModal = ({ isOpen, onClose, location = "New York Office", department = "Engineering", capacity = "240/300" }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 99998, animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 500,
        backgroundColor: 'var(--color-surface)',
        borderRadius: 16,
        boxShadow: 'var(--shadow-xl)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', zIndex: 10 }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={20} color="var(--color-primary)" /> {location}
            </h2>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Floor 12 • {department} Zone</div>
          </div>
          <button onClick={onClose} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none' }}>
            <X size={20} />
          </button>
        </div>

        {/* Map Area */}
        <div style={{ flex: 1, backgroundColor: '#E2E8F0', position: 'relative', overflow: 'hidden' }}>
          {/* Mock Map Background pattern */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }}></div>
          
          {/* Mock Building Layout */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '70%', backgroundColor: 'white', borderRadius: 8, border: '2px solid #CBD5E1', display: 'flex' }}>
            {/* Zones */}
            <div style={{ flex: 2, borderRight: '2px solid #CBD5E1', position: 'relative', backgroundColor: 'rgba(79, 70, 229, 0.05)' }}>
              <div style={{ position: 'absolute', top: 16, left: 16, fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.05em' }}>ENGINEERING ZONE</div>
              
              {/* Desks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '48px 24px', height: '100%' }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ backgroundColor: i === 5 ? 'var(--color-primary)' : '#E2E8F0', borderRadius: 4, height: 40, width: '100%', position: 'relative' }}>
                    {i === 5 && (
                      <>
                        <div style={{ position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-surface)', padding: '4px 8px', borderRadius: 4, fontSize: '11px', fontWeight: 700, color: 'var(--color-text-main)', whiteSpace: 'nowrap', boxShadow: 'var(--shadow-sm)', zIndex: 20 }}>
                          Target Desk
                          <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 8, height: 8, backgroundColor: 'var(--color-surface)' }}></div>
                        </div>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 4, backgroundColor: 'var(--color-primary)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.4 }}></div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, borderBottom: '2px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontWeight: 600, fontSize: '12px', letterSpacing: '0.05em' }}>MEETING ROOM A</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontWeight: 600, fontSize: '12px', letterSpacing: '0.05em' }}>MEETING ROOM B</div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div style={{ padding: '16px 24px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: 'var(--color-text-main)' }}>
              <Building size={16} color="var(--color-text-secondary)" /> HQ Building 1
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: 'var(--color-text-main)' }}>
              <Users size={16} color="var(--color-text-secondary)" /> Capacity: {capacity}
            </div>
          </div>
          <button className="btn-primary" style={{ padding: '6px 16px', borderRadius: 8, fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Navigation2 size={16} /> Get Directions
          </button>
        </div>
      </div>
    </>
  );
};

export default LocationMapModal;
