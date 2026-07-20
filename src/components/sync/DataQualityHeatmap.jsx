import React, { useState } from 'react';
import Card from '../common/Card';
import { Search } from 'lucide-react';

const DEPARTMENTS = ['Engineering', 'Product', 'Sales', 'Marketing', 'Finance', 'HR', 'Operations'];
const METRICS = ['Employee Data', 'Reporting Structure', 'Authority Mapping', 'Projects', 'Roles', 'Budget'];

// Generate mock heatmap data
const getHeatmapData = () => {
  const data = {};
  DEPARTMENTS.forEach(dept => {
    data[dept] = {};
    METRICS.forEach(metric => {
      // Create some intentional variance
      let score = 90 + (Math.random() * 10);
      if (dept === 'Engineering' && metric === 'Reporting Structure') score = 65;
      if (dept === 'Sales' && metric === 'Authority Mapping') score = 45;
      if (dept === 'Finance' && metric === 'Projects') score = 75;
      data[dept][metric] = score;
    });
  });
  return data;
};

const DataQualityHeatmap = () => {
  const [data] = useState(getHeatmapData());

  const getColor = (score) => {
    if (score >= 85) return 'var(--color-success)'; // Green
    if (score >= 60) return 'var(--color-warning)'; // Yellow
    return 'var(--color-danger)'; // Red
  };

  const getOpacity = (score) => {
    if (score >= 85) return 0.2 + (score - 85) * 0.05; // 0.2 to 0.95
    if (score >= 60) return 0.4 + (score - 60) * 0.02; 
    return 0.6 + (60 - score) * 0.01;
  };

  return (
    <Card style={{ padding: '24px', overflowX: 'auto' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Data Quality Heatmap</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>Click any cell to drill down into specific data issues.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: 12, height: 12, borderRadius: 4, backgroundColor: 'var(--color-success)', opacity: 0.8}}></div> Healthy</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: 12, height: 12, borderRadius: 4, backgroundColor: 'var(--color-warning)', opacity: 0.8}}></div> Needs Review</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: 12, height: 12, borderRadius: 4, backgroundColor: 'var(--color-danger)', opacity: 0.8}}></div> Critical</span>
        </div>
      </div>

      <div style={{ display: 'inline-block', minWidth: '100%' }}>
        {/* Header Row */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '12px' }}>
          <div style={{ width: '180px', flexShrink: 0, fontWeight: 600, fontSize: '13px', color: 'var(--color-text-muted)' }}>Department</div>
          {METRICS.map(metric => (
            <div key={metric} style={{ flex: 1, minWidth: 120, fontWeight: 600, fontSize: '13px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              {metric}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {DEPARTMENTS.map(dept => (
            <div key={dept} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '180px', flexShrink: 0, fontWeight: 600, fontSize: '14px', color: 'var(--color-text-main)' }}>
                {dept}
              </div>
              {METRICS.map(metric => {
                const score = data[dept][metric];
                const color = getColor(score);
                const opacity = getOpacity(score);
                
                return (
                  <div key={`${dept}-${metric}`} style={{ flex: 1, minWidth: 120, padding: '0 4px' }}>
                    <div 
                      style={{ 
                        height: '40px', 
                        backgroundColor: color, 
                        opacity: opacity,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      className="hover:opacity-100 hover:scale-[1.02]"
                      title={`${dept} - ${metric}: ${Math.round(score)}%`}
                    >
                      {/* Show score on hover via CSS or just keep it minimal */}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DataQualityHeatmap;
