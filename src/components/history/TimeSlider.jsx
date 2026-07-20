import React, { useState } from 'react';
import Card from '../common/Card';
import { FastForward, Rewind } from 'lucide-react';

const TimeSlider = ({ versions, selectedVersionId, onSelectVersion }) => {
  const [sliderValue, setSliderValue] = useState(0);

  // For this mock, we map the slider 0-100 to the versions array length.
  // We assume versions is sorted newest to oldest.
  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    setSliderValue(val);
    if (versions && versions.length > 0) {
      // Invert index: 0 is oldest (last in array), 100 is newest (first in array)
      const index = Math.floor(((100 - val) / 100) * (versions.length - 1));
      const targetVersion = versions[index];
      if (targetVersion && targetVersion.id !== selectedVersionId) {
        onSelectVersion(targetVersion.id);
      }
    }
  };

  // Update slider if version selected from elsewhere
  React.useEffect(() => {
    if (versions && versions.length > 0) {
      const index = versions.findIndex(v => v.id === selectedVersionId);
      if (index !== -1) {
        const val = 100 - (index / (versions.length - 1)) * 100;
        setSliderValue(val);
      }
    }
  }, [selectedVersionId, versions]);

  return (
    <Card style={{ padding: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px', backgroundColor: 'var(--color-surface-alt)' }}>
      <button className="icon-btn hover:bg-slate-200" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent' }} title="Rewind 1 Year">
        <Rewind size={20} color="var(--color-text-muted)" />
      </button>

      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="flex justify-between" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
          <span>2023 (Q1)</span>
          <span style={{ color: 'var(--color-primary)' }}>Time Machine Active</span>
          <span>Present</span>
        </div>
        
        <input 
          type="range" 
          min="0" max="100" 
          value={sliderValue} 
          onChange={handleSliderChange}
          style={{
            width: '100%',
            accentColor: 'var(--color-primary)',
            cursor: 'grab'
          }}
        />
        
        {/* Mock ticks */}
        <div style={{ position: 'absolute', bottom: -8, left: 0, right: 0, height: 4, display: 'flex', justifyContent: 'space-between', padding: '0 4px', pointerEvents: 'none' }}>
           {[...Array(12)].map((_, i) => (
             <div key={i} style={{ width: 2, height: 4, backgroundColor: 'var(--color-border)' }}></div>
           ))}
        </div>
      </div>

      <button className="icon-btn hover:bg-slate-200" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent' }} title="Fast Forward">
        <FastForward size={20} color="var(--color-text-muted)" />
      </button>
    </Card>
  );
};

export default TimeSlider;
