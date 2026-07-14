import React from 'react';

const PageHeader = ({ title, subtitle, icon: Icon, action, style }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)', flexShrink: 0, ...style }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-main)', margin: 0 }}>
          {Icon && <Icon size={32} color="var(--color-primary)" />}
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 8, fontSize: '1rem', maxWidth: 600, lineHeight: 1.5 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
