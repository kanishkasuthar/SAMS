import React from 'react';
import { ToggleRight, ToggleLeft } from 'lucide-react';

const AISettings = ({ state, handleChange }) => {
  const toggle = (key) => handleChange(key, !state[key]);

  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>AI Assistant Capabilities</h3>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Configure the intelligence level and proactive features of SAMS.</p>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          {[
            { id: 'aiEnabled', label: 'Enable AI Assistant', desc: 'Global toggle for all AI-powered features.' },
            { id: 'aiRecommendations', label: 'AI Recommendations', desc: 'Receive intelligent suggestions for structural optimizations.' },
            { id: 'aiPredictive', label: 'Predictive Analytics', desc: 'Forecast structural risks before they happen.' },
            { id: 'aiAutoRisk', label: 'Auto Risk Detection', desc: 'Automatically scan the hierarchy for compliance violations.' },
            { id: 'aiSmartReports', label: 'Smart Reports', desc: 'Generate natural language executive summaries.' }
          ].map(setting => (
            <div key={setting.id} className="flex justify-between items-center" style={{padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 12, backgroundColor: 'var(--color-surface)'}}>
              <div>
                <div style={{fontWeight: 600, color: 'var(--color-text-main)'}}>{setting.label}</div>
                <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>{setting.desc}</div>
              </div>
              <button onClick={() => toggle(setting.id)} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                {state[setting.id] ? <ToggleRight size={32} color="#8b5cf6" /> : <ToggleLeft size={32} color="var(--color-text-muted)" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>AI Model Preferences</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Primary Model</label>
            <select className="input-field" value={state.aiModel || 'gemini'} onChange={(e) => handleChange('aiModel', e.target.value)}>
              <option value="gemini">Gemini 1.5 Pro</option>
              <option value="gemini-flash">Gemini 1.5 Flash</option>
              <option value="custom">Custom Enterprise Model</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Confidence Threshold</label>
            <select className="input-field" value={state.aiConfidence || 'high'} onChange={(e) => handleChange('aiConfidence', e.target.value)}>
              <option value="high">High (Fewer, more accurate alerts)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="low">Low (More proactive suggestions)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettings;
