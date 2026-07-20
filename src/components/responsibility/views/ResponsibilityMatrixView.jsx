import React, { useState, useEffect } from 'react';
import { Target, Users, Settings, Database, FileText, CheckSquare, Zap, AlertTriangle, ShieldAlert, GitBranch } from 'lucide-react';
import { useMatrixStore } from '../../../store/matrixStore';
import { useDepartmentStore } from '../../../store/departmentStore';

// Placeholder component for icon
function TrendingUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

const getBadgeConfig = (type) => {
  switch (type) {
    case 'R': return { label: 'R', full: 'Responsible', color: 'var(--color-primary)', bg: 'rgba(79, 70, 229, 0.1)', border: 'rgba(79, 70, 229, 0.3)' };
    case 'A': return { label: 'A', full: 'Accountable', color: 'var(--color-danger)', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)' };
    case 'C': return { label: 'C', full: 'Consulted', color: 'var(--color-warning)', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)' };
    case 'I': return { label: 'I', full: 'Informed', color: 'var(--color-success)', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)' };
    default: return { label: '-', full: 'Unassigned', color: 'var(--color-text-muted)', bg: 'transparent', border: 'transparent' };
  }
};

const getRowStatusStyle = (status) => {
  switch (status) {
    case 'critical': return { bg: 'rgba(239, 68, 68, 0.04)', border: 'rgba(239, 68, 68, 0.2)' };
    case 'high_risk': return { bg: 'rgba(245, 158, 11, 0.04)', border: 'rgba(245, 158, 11, 0.2)' };
    case 'ai_rec': return { bg: 'rgba(79, 70, 229, 0.04)', border: 'rgba(79, 70, 229, 0.2)' };
    default: return { bg: 'white', border: 'var(--color-border)' };
  }
};

const ResponsibilityMatrixView = ({ onProcessClick, onDepartmentClick, onCellClick }) => {
  const { transformedData: RACI_DATA, fetchMatrices, loading: matrixLoading } = useMatrixStore();
  const { departments: DEPARTMENTS, fetchDepartments, loading: deptLoading } = useDepartmentStore();

  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);

  useEffect(() => {
    fetchMatrices();
    fetchDepartments();
  }, []);

  if (matrixLoading || deptLoading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading Responsibility Matrix...</div>;
  if (!DEPARTMENTS || DEPARTMENTS.length === 0) return <div style={{ padding: 40, textAlign: 'center' }}>No departments found.</div>;

  return (
    <div className="card" style={{ overflow: 'hidden', padding: 0, border: '1px solid var(--color-border)', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', backgroundColor: 'white' }}>
      
      <div style={{ overflowX: 'auto', overflowY: 'visible', paddingBottom: '16px' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'separate', borderSpacing: 0, minWidth: '1200px' }}>
          <thead>
            <tr>
              <th 
                style={{ 
                  padding: '24px 32px', 
                  fontWeight: 800, 
                  backgroundColor: 'white', 
                  borderBottom: '2px solid var(--color-border)', 
                  borderRight: '1px solid var(--color-border)', 
                  width: '450px',
                  minWidth: '450px',
                  position: 'sticky',
                  left: 0,
                  zIndex: 20,
                  boxShadow: '4px 0 12px rgba(0,0,0,0.03)',
                  color: 'var(--color-text-main)',
                  textTransform: 'uppercase',
                  fontSize: '13px',
                  letterSpacing: '0.05em'
                }}
              >
                Business Process Overview
              </th>
              {DEPARTMENTS.map(dept => (
                <th 
                  key={dept.id}
                  onClick={() => onDepartmentClick(dept.id)}
                  onMouseEnter={() => setHoveredCol(dept.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                  style={{ 
                    padding: '24px 16px', 
                    fontWeight: 800, 
                    textAlign: 'center', 
                    backgroundColor: hoveredCol === dept.id ? 'var(--color-surface-hover)' : 'white',
                    borderBottom: '2px solid var(--color-border)',
                    color: 'var(--color-text-main)',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    position: 'relative',
                    minWidth: '160px',
                    textTransform: 'uppercase',
                    fontSize: '13px',
                    letterSpacing: '0.05em'
                  }}
                >
                  {dept.departmentName}
                  {hoveredCol === dept.id && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', backgroundColor: 'var(--color-primary)' }} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RACI_DATA.map((row, idx) => {
              const isRowHovered = hoveredRow === row.id;
              const rowStyle = getRowStatusStyle(row.status);
              
              return (
                <tr 
                  key={row.id} 
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ 
                    backgroundColor: isRowHovered ? 'var(--color-surface-hover)' : rowStyle.bg,
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {/* Rich Process Column */}
                  <td 
                    onClick={() => onProcessClick(row.id)}
                    style={{ 
                      padding: '24px 32px', 
                      borderBottom: `1px solid ${rowStyle.border}`, 
                      borderRight: '1px solid var(--color-border)',
                      position: 'sticky',
                      left: 0,
                      backgroundColor: isRowHovered ? 'white' : (row.status === 'healthy' ? 'white' : rowStyle.bg),
                      zIndex: 10,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s, box-shadow 0.2s',
                      boxShadow: isRowHovered ? '4px 0 24px rgba(0,0,0,0.06)' : '4px 0 12px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      
                      {/* Icon */}
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Target size={24} color="var(--color-text-main)" />
                      </div>
                      
                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <div style={{ fontWeight: 800, color: 'var(--color-text-main)', fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {row.process}
                          </div>
                          {row.priority === 'Critical' && (
                            <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: '12px', textTransform: 'uppercase' }}>Critical</span>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                          <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{row.category}</span>
                          <span style={{ color: 'var(--color-border)' }}>|</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GitBranch size={14} /> {row.dependencies} Deps</span>
                        </div>
                      </div>
                      
                      {/* Owner */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        {row.owner ? (
                          <>
                            <img src={row.owner.avatar} alt={row.owner.name} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-border)' }} />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{row.owner.role}</span>
                          </>
                        ) : (
                          <>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <AlertTriangle size={14} />
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-danger)' }}>Unassigned</span>
                          </>
                        )}
                      </div>

                    </div>
                  </td>
                  
                  {/* Department Cells */}
                  {DEPARTMENTS.map(dept => {
                    const type = row[dept.id];
                    const config = getBadgeConfig(type);
                    const isColHovered = hoveredCol === dept.id;
                    const isActiveCell = isRowHovered && isColHovered;
                    const conflictMsg = row.conflicts[dept.id];
                    
                    return (
                      <td 
                        key={dept.id}
                        onClick={() => type && onCellClick({ processId: row.id, deptId: dept.id, type })}
                        onMouseEnter={() => setHoveredCol(dept.id)}
                        onMouseLeave={() => setHoveredCol(null)}
                        style={{ 
                          padding: '16px', 
                          textAlign: 'center',
                          borderBottom: `1px solid ${rowStyle.border}`,
                          backgroundColor: isActiveCell ? 'white' : (isColHovered ? 'rgba(255,255,255,0.5)' : 'transparent'),
                          cursor: type ? 'pointer' : 'default',
                          transition: 'all 0.2s ease',
                          boxShadow: isActiveCell ? '0 10px 25px -5px rgba(0,0,0,0.1)' : 'none',
                          transform: isActiveCell ? 'scale(1.02)' : 'scale(1)',
                          position: isActiveCell ? 'relative' : 'static',
                          zIndex: isActiveCell ? 15 : 1
                        }}
                      >
                        {type ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div 
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: '24px',
                                backgroundColor: isActiveCell ? config.color : config.bg,
                                color: isActiveCell ? 'white' : config.color,
                                fontWeight: 800,
                                fontSize: '13px',
                                border: `1px solid ${isActiveCell ? config.color : config.border}`,
                                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                boxShadow: isActiveCell ? `0 8px 16px ${config.bg}` : 'none'
                              }}
                            >
                              {config.full}
                            </div>
                            
                            {/* AI Conflict Indicator */}
                            {conflictMsg && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-warning)', fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                                <Zap size={12} /> AI Alert
                              </div>
                            )}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--color-border)', fontSize: '20px' }}>-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default ResponsibilityMatrixView;
