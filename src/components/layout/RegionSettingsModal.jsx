import React, { useState } from 'react';
import { X, Globe, Clock, Check } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const RegionSettingsModal = ({ isOpen, onClose }) => {
  const { addToast } = useUIStore();
  const [activeLang, setActiveLang] = useState('English');
  const [activeTz, setActiveTz] = useState('EST');

  if (!isOpen) return null;

  const handleSave = () => {
    addToast(`Settings updated: ${activeLang}, ${activeTz}`, 'success');
    onClose();
  };

  const languages = ['English', 'Español', 'Français', 'Deutsch', '日本語'];
  const timezones = ['EST', 'PST', 'CST', 'GMT', 'CET', 'IST'];

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 500, backgroundColor: 'var(--color-surface)', borderRadius: 16,
        boxShadow: 'var(--shadow-xl)', zIndex: 9999, display: 'flex', flexDirection: 'column',
        animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Globe size={20} color="var(--color-primary)" /> Language & Region
          </h2>
          <button onClick={onClose} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              Language Selection
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {languages.map(lang => (
                <div 
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  style={{ 
                    padding: '12px 16px', borderRadius: 8, border: `1px solid ${activeLang === lang ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: activeLang === lang ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: activeLang === lang ? 600 : 500, color: activeLang === lang ? 'var(--color-primary)' : 'var(--color-text-main)' }}>{lang}</span>
                  {activeLang === lang && <Check size={16} color="var(--color-primary)" />}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={16} /> Timezone
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {timezones.map(tz => (
                <div 
                  key={tz}
                  onClick={() => setActiveTz(tz)}
                  style={{ 
                    padding: '10px 12px', borderRadius: 8, border: `1px solid ${activeTz === tz ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: activeTz === tz ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                    textAlign: 'center', cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: activeTz === tz ? 600 : 500, color: activeTz === tz ? 'var(--color-primary)' : 'var(--color-text-main)' }}>{tz}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="btn-secondary" onClick={onClose} style={{ padding: '8px 16px', borderRadius: 8, fontSize: '14px', fontWeight: 600 }}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} style={{ padding: '8px 16px', borderRadius: 8, fontSize: '14px', fontWeight: 600 }}>Save Settings</button>
        </div>
      </div>
    </>
  );
};

export default RegionSettingsModal;
