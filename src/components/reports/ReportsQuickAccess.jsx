import React, { useState } from 'react';
import { Download, Share2, Eye, Star, FileText } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const TABS = [
  { id: 'downloaded', label: 'Recently Downloaded', icon: Download },
  { id: 'shared', label: 'Recently Shared', icon: Share2 },
  { id: 'viewed', label: 'Recently Viewed', icon: Eye },
  { id: 'favorites', label: 'Favorites', icon: Star },
];

const ReportsQuickAccess = () => {
  const [activeTab, setActiveTab] = useState('downloaded');
  const { addToast } = useUIStore();

  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '20px', overflowX: 'auto' }}>
        {TABS.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s ease',
              border: 'none',
              backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--color-text-secondary)',
            }}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {/* Placeholder list based on active tab */}
        {[1, 2, 3, 4].map(item => (
          <div key={item} onClick={() => addToast(`Opening Historical Report ${item}...`, "info")} style={{ 
            padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white',
            display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'
          }} className="hover:border-primary">
            <div style={{ padding: '8px', backgroundColor: 'var(--color-bg)', borderRadius: '6px', color: 'var(--color-primary)' }}>
              <FileText size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>Historical Report {item}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>2 days ago</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsQuickAccess;
