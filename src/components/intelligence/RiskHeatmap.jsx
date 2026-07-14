import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, TrendingDown, Maximize2 } from 'lucide-react';
import DepartmentRiskDrawer from './DepartmentRiskDrawer';

const RiskHeatmap = ({ heatmapData }) => {
  const [selectedDept, setSelectedDept] = useState(null);

  if (!heatmapData) return null;

  return (
    <>
      <div className="card" style={{ 
        padding: '24px', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '16px', 
        border: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldAlert size={24} color="var(--color-primary)" /> Organization Risk Map
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
              Structural and operational vulnerabilities across departments.
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 20 
        }}>
          {heatmapData.map((dept, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedDept(dept)}
              style={{ 
                backgroundColor: dept.riskLevel === 'Critical' ? 'rgba(239, 68, 68, 0.03)' : 
                                dept.riskLevel === 'High' ? 'rgba(245, 158, 11, 0.03)' : '#F8FAFC',
                border: `1px solid ${
                  dept.riskLevel === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : 
                  dept.riskLevel === 'High' ? 'rgba(245, 158, 11, 0.2)' : 'var(--color-border)'
                }`,
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              
              <div style={{ position: 'absolute', top: 12, right: 12, color: 'var(--color-text-muted)' }}>
                <Maximize2 size={14} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)' }}>{dept.dept}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{dept.score} Risk Score</div>
                </div>
                <div style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '12px', 
                  fontWeight: 600,
                  backgroundColor: dept.riskLevel === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : 
                                   dept.riskLevel === 'High' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  color: dept.riskLevel === 'Critical' ? 'var(--color-danger)' : 
                         dept.riskLevel === 'High' ? 'var(--color-warning)' : 'var(--color-success)'
                }}>
                  {dept.riskLevel}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {dept.factors.slice(0, 2).map((factor, i) => (
                  <div key={i} style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--color-text-muted)' }}></div>
                    {factor}
                  </div>
                ))}
                {dept.factors.length > 2 && (
                  <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 500, marginTop: 4 }}>
                    + {dept.factors.length - 2} more factors
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 16, borderTop: '1px dashed var(--color-border)' }}>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Trend</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '13px', fontWeight: 600, color: dept.trend === 'Increasing' ? 'var(--color-danger)' : 'var(--color-success)' }}>
                  {dept.trend === 'Increasing' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {dept.trend}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
      
      <DepartmentRiskDrawer 
        isOpen={!!selectedDept}
        onClose={() => setSelectedDept(null)}
        department={selectedDept}
      />
    </>
  );
};

export default RiskHeatmap;
