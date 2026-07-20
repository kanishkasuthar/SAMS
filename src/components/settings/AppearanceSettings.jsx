import React from 'react';

const AppearanceSettings = ({ state, handleChange }) => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32 }}>
        
        {/* Left Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Theme Settings</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Customize the visual appearance of the platform.</p>
            
            <div style={{display: 'flex', gap: 16}}>
              {['Light', 'Dark', 'System'].map(t => (
                <button 
                  key={t}
                  onClick={() => handleChange('theme', t)}
                  style={{
                    padding: '12px 24px', borderRadius: 8, fontWeight: 600,
                    border: state.theme === t ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    backgroundColor: state.theme === t ? 'rgba(79, 70, 229, 0.05)' : 'var(--color-surface)',
                    color: state.theme === t ? 'var(--color-primary)' : 'var(--color-text-main)',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />
          
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Accent Color</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Choose the primary color used throughout the UI.</p>
            
            <div style={{display: 'flex', gap: 16}}>
              {['#4F46E5', '#10B981', '#0EA5E9', '#F43F5E', '#8B5CF6'].map(color => (
                <button 
                  key={color}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', backgroundColor: color,
                    border: state.accentColor === color ? '3px solid white' : 'none',
                    boxShadow: state.accentColor === color ? `0 0 0 2px ${color}` : 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  className="hover:scale-110"
                  onClick={() => handleChange('accentColor', color)}
                />
              ))}
            </div>
          </div>

          <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Layout Preferences</h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
              <div className="flex flex-col gap-2">
                <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Rounded Corner Style</label>
                <select className="input-field" value={state.appCornerRadius || 'rounded'} onChange={(e) => handleChange('appCornerRadius', e.target.value)}>
                  <option value="rounded">Rounded (Modern)</option>
                  <option value="sharp">Sharp (Classic)</option>
                  <option value="pill">Pill (Playful)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Card Density</label>
                <select className="input-field" value={state.appDensity || 'comfortable'} onChange={(e) => handleChange('appDensity', e.target.value)}>
                  <option value="comfortable">Comfortable</option>
                  <option value="compact">Compact</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Preview */}
        <div>
          <div style={{ position: 'sticky', top: 100 }}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, color: 'var(--color-text-main)'}}>Live Preview</h3>
            <div style={{ 
              width: '100%', 
              aspectRatio: '4/3', 
              backgroundColor: state.theme === 'Dark' ? '#1e293b' : '#f8fafc', 
              border: '1px solid var(--color-border)', 
              borderRadius: state.appCornerRadius === 'sharp' ? 4 : (state.appCornerRadius === 'pill' ? 24 : 12),
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ height: 24, backgroundColor: state.theme === 'Dark' ? '#0f172a' : 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }}></div>
              </div>
              <div style={{ flex: 1, padding: 16, display: 'flex', gap: 12 }}>
                <div style={{ width: '30%', height: '100%', backgroundColor: state.theme === 'Dark' ? '#334155' : '#e2e8f0', borderRadius: state.appCornerRadius === 'sharp' ? 2 : 6, opacity: 0.5 }}></div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ width: '100%', height: 24, backgroundColor: state.accentColor || 'var(--color-primary)', borderRadius: state.appCornerRadius === 'sharp' ? 2 : 6 }}></div>
                  <div style={{ width: '100%', flex: 1, backgroundColor: state.theme === 'Dark' ? '#334155' : 'white', border: state.theme === 'Dark' ? 'none' : '1px solid var(--color-border)', borderRadius: state.appCornerRadius === 'sharp' ? 4 : (state.appCornerRadius === 'pill' ? 16 : 8), padding: 12 }}>
                    <div style={{ width: '60%', height: 8, backgroundColor: state.theme === 'Dark' ? '#475569' : '#cbd5e1', borderRadius: 4, marginBottom: 8 }}></div>
                    <div style={{ width: '80%', height: 8, backgroundColor: state.theme === 'Dark' ? '#475569' : '#cbd5e1', borderRadius: 4 }}></div>
                  </div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 12, textAlign: 'center' }}>Changes are previewed instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
