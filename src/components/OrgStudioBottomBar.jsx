import React from 'react';
import { Activity, AlertTriangle, Layers, CheckCircle } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useNavigate } from 'react-router-dom';

const OrgStudioBottomBar = () => {
  const { orgScore, excelSyncStatus } = useOrgStore();
  const navigate = useNavigate();

  return (
    <div style={{
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      backgroundColor: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      fontSize: '0.8rem',
      fontWeight: 500,
      color: 'var(--color-text-secondary)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Health */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={14} color="var(--color-success)" />
          <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>Health: 92%</span>
        </div>
        
        <div style={{ width: 1, height: 16, backgroundColor: 'var(--color-border)' }}></div>
        
        {/* Sync Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/sync')}>
          <CheckCircle size={14} color="var(--color-success)" />
          <span>Excel Synced</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>(Today, 02:35 PM)</span>
        </div>

        <div style={{ width: 1, height: 16, backgroundColor: 'var(--color-border)' }}></div>

        {/* Hierarchy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Layers size={14} />
          <span>4 Levels Deep</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Insights Alert */}
        <button 
          onClick={() => navigate('/insights')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: 6, 
            backgroundColor: 'rgba(245, 158, 11, 0.1)', 
            color: 'var(--color-warning)',
            padding: '4px 12px',
            borderRadius: 16,
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = 0.8}
          onMouseOut={(e) => e.currentTarget.style.opacity = 1}
        >
          <AlertTriangle size={14} />
          3 Structural Insights
        </button>
      </div>
    </div>
  );
};

export default OrgStudioBottomBar;
