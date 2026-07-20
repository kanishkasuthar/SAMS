import React from 'react';

const Card = ({ children, style, className = '', noPadding = false, ...props }) => {
  return (
    <div 
      className={`card ${className}`} 
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        border: '1px solid var(--color-border)',
        padding: noPadding ? 0 : '24px',
        transition: 'all var(--transition-normal)',
        ...style,
        // Enforce the requirements if inline styles attempt to override
        borderRadius: '20px',
        padding: noPadding ? 0 : (style?.padding || '24px')
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
