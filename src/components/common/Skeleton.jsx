import React from 'react';

export const Skeleton = ({ width, height, borderRadius, style, variant = 'rectangular' }) => {
  const baseStyle = {
    backgroundColor: 'var(--color-border)',
    animation: 'pulse-skeleton 1.5s ease-in-out infinite',
    width: width || '100%',
    height: height || '100%',
    borderRadius: borderRadius || (variant === 'circular' ? '50%' : 'var(--radius-sm)'),
    ...style
  };

  return <div style={baseStyle} aria-hidden="true" />;
};

export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {Array(columns).fill(0).map((_, i) => (
              <th key={`th-${i}`}><Skeleton height="16px" width="80%" /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(rows).fill(0).map((_, r) => (
            <tr key={`tr-${r}`}>
              {Array(columns).fill(0).map((_, c) => (
                <td key={`td-${r}-${c}`}>
                  <Skeleton height="20px" width={c === 0 ? "40%" : "80%"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
