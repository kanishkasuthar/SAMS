import React from 'react';
import { Filter, Check } from 'lucide-react';

const FILTERS = [
  'All', 'Unread', 'Critical', 'Approvals', 'AI Insights', 
  'Organization Changes', 'Decision Flow', 'Security', 
  'Reports', 'System', 'Sync', 'Users'
];

const NotificationFilterBar = ({ activeFilters, onToggleFilter, onMarkAllRead }) => {
  const isAllActive = activeFilters.includes('All');

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: 600, marginRight: '8px' }}>
          <Filter size={16} />
          Filters:
        </div>
        
        {FILTERS.map(filter => {
          const isActive = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => onToggleFilter(filter)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: isActive ? 'rgba(79, 70, 229, 0.1)' : 'white',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              }}
              className="hover:bg-slate-50"
            >
              {filter}
            </button>
          );
        })}
      </div>
      
      <div style={{ marginLeft: '24px', flexShrink: 0 }}>
        <button 
          onClick={onMarkAllRead}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: '8px' }}
        >
          <Check size={16} />
          <span>Mark All Read</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationFilterBar;
