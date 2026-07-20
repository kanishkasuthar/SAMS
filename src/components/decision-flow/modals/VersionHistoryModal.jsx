import React from 'react';
import { X, History, GitCompare, RotateCcw } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';

const VERSIONS = [
  { id: 'v2.4', current: true, message: 'Updated budget threshold', date: 'July 15, 2026', author: 'Kanishka Suthar' },
  { id: 'v2.3', current: false, message: 'Added CFO approval', date: 'July 10, 2026', author: 'Admin System' },
  { id: 'v2.2', current: false, message: 'Changed VP authority', date: 'July 2, 2026', author: 'Kanishka Suthar' },
];

const VersionHistoryModal = ({ isOpen, onClose }) => {
  const { addToast } = useUIStore();
  const [comparingVersion, setComparingVersion] = React.useState(null);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '600px', animation: 'scale-in 0.2s ease-out', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
              <History size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Decision Flow Versions</h2>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>View, compare, and restore previous workflow versions.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {VERSIONS.map(v => (
            <div key={v.id} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: v.current ? 'var(--color-primary)' : 'var(--color-border)', border: '2px solid white', boxShadow: '0 0 0 1px var(--color-border)' }}></div>
                <div style={{ flex: 1, width: '2px', backgroundColor: 'var(--color-border)', margin: '4px 0' }}></div>
              </div>
              <div style={{ flex: 1, backgroundColor: v.current ? 'rgba(79, 70, 229, 0.02)' : 'white', border: v.current ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)' }}>{v.id}</span>
                      {v.current && <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', padding: '2px 6px', borderRadius: '4px' }}>CURRENT</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-main)', fontWeight: 600 }}>{v.message}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{v.date} • {v.author}</div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setComparingVersion(comparingVersion === v.id ? null : v.id)} style={{ padding: '6px 12px', borderRadius: '6px', border: comparingVersion === v.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', backgroundColor: comparingVersion === v.id ? 'rgba(79, 70, 229, 0.05)' : 'white', color: comparingVersion === v.id ? 'var(--color-primary)' : 'var(--color-text-main)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <GitCompare size={14} /> {comparingVersion === v.id ? 'Comparing...' : 'Compare'}
                    </button>
                    {!v.current && (
                      <button onClick={() => { if(confirm('Restore this version?')) { addToast('Version Restored', 'success'); onClose(); } }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.05)', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <RotateCcw size={14} /> Restore
                      </button>
                    )}
                  </div>
                </div>

                {comparingVersion === v.id && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--color-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '8px' }}>CURRENT (v2.4)</div>
                      <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '12px', color: 'var(--color-text-main)' }}>
                        <del style={{ color: 'var(--color-danger)' }}>Threshold: $25,000</del><br/>
                        Authority: David Chen
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '8px' }}>VERSION ({v.id})</div>
                      <div style={{ padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '12px', color: 'var(--color-text-main)' }}>
                        <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Threshold: $50,000</span><br/>
                        Authority: David Chen
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VersionHistoryModal;
