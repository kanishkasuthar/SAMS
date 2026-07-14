import React from 'react';
import Card from './Card';

const DataTable = ({ columns, data, keyField = 'id', onRowClick, style }) => {
  return (
    <Card noPadding style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', ...style }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-surface)', zIndex: 1, boxShadow: '0 1px 0 var(--color-border)' }}>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} style={{ 
                  padding: '16px 24px', 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase', 
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  letterSpacing: '0.05em'
                }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr 
                key={row[keyField]} 
                onClick={() => onRowClick && onRowClick(row)}
                style={{ 
                  borderBottom: '1px solid var(--color-border)',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background-color 0.2s',
                  backgroundColor: 'var(--color-surface)'
                }}
                onMouseEnter={(e) => { if (onRowClick) e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)' }}
                onMouseLeave={(e) => { if (onRowClick) e.currentTarget.style.backgroundColor = 'var(--color-surface)' }}
              >
                {columns.map((col, idx) => (
                  <td key={idx} style={{ padding: '16px 24px', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                    {col.render ? col.render(row) : row[col.field]}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DataTable;
