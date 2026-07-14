import React from 'react';

const Card = ({ children, style, className = '', noPadding = false, ...props }) => {
  return (
    <div 
      className={`card ${className}`} 
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)',
        padding: noPadding ? 0 : 'var(--space-3)',
        transition: 'all var(--transition-normal)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
