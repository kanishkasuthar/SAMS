import React, { useEffect, useState } from 'react';
import { Search, X, TrendingUp, Users, Activity } from 'lucide-react';
import { useAnalytics } from '../../../contexts/AnalyticsContext';

const CommandPalette = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, setActiveItem } = useAnalytics();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const handleClose = () => {
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  const handleSelect = (type, title) => {
    setActiveItem({ type, data: { title, desc: `You searched for ${title} via the Command Palette.` } });
    handleClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh'
      }}
      onClick={handleClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Search size={20} color="var(--color-text-muted)" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search departments, people, or metrics (Ctrl+K)..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '16px', color: 'var(--color-text-main)', backgroundColor: 'transparent' }}
          />
          <button onClick={handleClose} style={{ padding: '4px', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', cursor: 'pointer' }}>ESC</button>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', padding: '8px' }}>Suggestions</div>
          
          <div onClick={() => handleSelect('department', 'Engineering Dashboard')} className="hover-lift" style={{ padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', border: '1px solid transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <Users size={16} color="var(--color-primary)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Engineering Dashboard</span>
          </div>

          <div onClick={() => handleSelect('kpi', 'Q3 Budget Utilization')} className="hover-lift" style={{ padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', border: '1px solid transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <TrendingUp size={16} color="var(--color-success)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Q3 Budget Utilization</span>
          </div>

          <div onClick={() => handleSelect('kpi', 'Platform Health Score')} className="hover-lift" style={{ padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', border: '1px solid transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <Activity size={16} color="var(--color-warning)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Platform Health Score</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommandPalette;
