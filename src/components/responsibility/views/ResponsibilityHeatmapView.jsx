import React, { useState } from 'react';

const HEATMAP_DATA = [
  { id: 'p1', process: 'Annual Budget Approval', exec: 80, finance: 95, eng: 30, sales: 20, hr: 10 },
  { id: 'p2', process: 'Hiring New VP', exec: 75, finance: 60, eng: 15, sales: 10, hr: 85 },
  { id: 'p3', process: 'Cloud Infrastructure Pivot', exec: 70, finance: 40, eng: 90, sales: 15, hr: 5 },
  { id: 'p4', process: 'Quarterly Sales Targets', exec: 85, finance: 65, eng: 10, sales: 95, hr: 15 },
  { id: 'p5', process: 'Enterprise Software License', exec: 60, finance: 80, eng: 70, sales: 40, hr: 20 },
  { id: 'p6', process: 'Performance Review Cycle', exec: 50, finance: 10, eng: 60, sales: 60, hr: 95 },
  { id: 'p7', process: 'Vendor Onboarding', exec: 30, finance: 85, eng: 40, sales: 20, hr: 60 },
  { id: 'p8', process: 'Data Breach Response', exec: 95, finance: 20, eng: 95, sales: 10, hr: 50 },
];

const DEPARTMENTS = [
  { id: 'exec', name: 'Executive' },
  { id: 'finance', name: 'Finance' },
  { id: 'eng', name: 'Engineering' },
  { id: 'sales', name: 'Sales' },
  { id: 'hr', name: 'HR & Admin' }
];

const getHeatmapColor = (intensity) => {
  if (intensity >= 90) return { bg: '#991B1B', color: 'white', label: 'Overloaded' }; // Dark Red
  if (intensity >= 75) return { bg: '#EF4444', color: 'white', label: 'Critical' }; // Red
  if (intensity >= 50) return { bg: '#F97316', color: 'white', label: 'High' }; // Orange
  if (intensity >= 25) return { bg: '#FDE047', color: '#854D0E', label: 'Medium' }; // Yellow
  return { bg: '#10B981', color: 'white', label: 'Very Low' }; // Green
};

const ResponsibilityHeatmapView = ({ onCellClick }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);

  return (
    <div className="card" style={{ overflow: 'hidden', padding: 0, border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Responsibility Load Heatmap</h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>Identify bottlenecks and overloaded departments across key processes.</p>
      </div>

      <div style={{ overflowX: 'auto', flex: 1 }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'separate', borderSpacing: 0, minWidth: '800px' }}>
          <thead>
            <tr>
              <th style={{ padding: '20px 24px', fontWeight: 800, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', width: '280px', position: 'sticky', left: 0, zIndex: 10, fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Business Process
              </th>
              {DEPARTMENTS.map(dept => (
                <th 
                  key={dept.id} 
                  style={{ 
                    padding: '20px 16px', 
                    fontWeight: 800, 
                    textAlign: 'center', 
                    backgroundColor: hoveredCol === dept.id ? 'var(--color-surface)' : 'white', 
                    borderBottom: '1px solid var(--color-border)', 
                    color: hoveredCol === dept.id ? 'var(--color-text-main)' : 'var(--color-text-muted)', 
                    fontSize: '12px', 
                    textTransform: 'uppercase',
                    transition: 'all 0.2s'
                  }}
                >
                  {dept.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HEATMAP_DATA.map((row) => (
              <tr 
                key={row.id} 
                style={{ backgroundColor: hoveredRow === row.id ? 'var(--color-surface)' : 'white', transition: 'background-color 0.2s' }}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={{ 
                  padding: '16px 24px', 
                  fontWeight: 700, 
                  color: 'var(--color-text-main)', 
                  borderBottom: '1px solid var(--color-border)', 
                  borderRight: '1px solid var(--color-border)', 
                  position: 'sticky', 
                  left: 0, 
                  backgroundColor: hoveredRow === row.id ? 'var(--color-surface)' : 'white', 
                  zIndex: 5, 
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}>
                  {row.process}
                </td>
                
                {DEPARTMENTS.map(dept => {
                  const intensity = row[dept.id];
                  const style = getHeatmapColor(intensity);
                  const isHovered = hoveredRow === row.id || hoveredCol === dept.id;
                  const isExactHover = hoveredRow === row.id && hoveredCol === dept.id;
                  
                  return (
                    <td 
                      key={dept.id} 
                      style={{ 
                        padding: '12px 16px', 
                        borderBottom: '1px solid var(--color-border)',
                        backgroundColor: isHovered && !isExactHover ? 'rgba(0,0,0,0.02)' : 'transparent',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={() => setHoveredCol(dept.id)}
                      onMouseLeave={() => setHoveredCol(null)}
                      onClick={() => onCellClick && onCellClick({ processId: row.id, processName: row.process, deptId: dept.id, deptName: dept.name, intensity, status: style.label })}
                    >
                      <div 
                        className="hover-lift"
                        style={{ 
                          width: '100%', 
                          height: '44px', 
                          backgroundColor: style.bg, 
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 800,
                          color: style.color,
                          cursor: 'pointer',
                          opacity: (hoveredRow || hoveredCol) && !isExactHover ? 0.7 : 1,
                          transform: isExactHover ? 'scale(1.08)' : 'scale(1)',
                          boxShadow: isExactHover ? `0 8px 16px ${style.bg}40` : 'none',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {intensity}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ display: 'flex', gap: '24px', padding: '20px 24px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-main)', textTransform: 'uppercase' }}>Intensity Scale:</span>
        <div style={{ display: 'flex', gap: '16px', flex: 1, alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: '#10B981' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Very Low</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: '#FDE047' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: '#F97316' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>High</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: '#EF4444' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Critical</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: '#991B1B' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Overloaded</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResponsibilityHeatmapView;
