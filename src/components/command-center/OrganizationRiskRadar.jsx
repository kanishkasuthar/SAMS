import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const RISK_DATA = [
  { subject: 'Budget', A: 85, fullMark: 100 },
  { subject: 'Projects', A: 90, fullMark: 100 },
  { subject: 'Managers', A: 60, fullMark: 100 }, // High risk (lower score is worse? Let's say higher score = higher risk for radar)
];

// Let's invert it: higher score = higher risk.
const RADAR_DATA = [
  { subject: 'Budget', risk: 85, fullMark: 100 },
  { subject: 'Projects', risk: 70, fullMark: 100 },
  { subject: 'Managers', risk: 95, fullMark: 100 },
  { subject: 'Authority', risk: 88, fullMark: 100 },
  { subject: 'Compliance', risk: 30, fullMark: 100 },
  { subject: 'Hierarchy', risk: 75, fullMark: 100 },
  { subject: 'Performance', risk: 40, fullMark: 100 },
];

const OrganizationRiskRadar = () => {
  const [activeArea, setActiveArea] = useState(null);
  const { setFilter } = useUIStore();

  const handleClick = (data) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const subject = data.activePayload[0].payload.subject;
      setActiveArea(subject);
      setFilter('searchQuery', subject);
    }
  };

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '350px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} color="var(--color-danger)" />
          Organization Risk Radar
        </h3>
      </div>
      
      <div style={{ flex: 1, minHeight: '250px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA} onClick={handleClick}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar 
              name="Risk Level" 
              dataKey="risk" 
              stroke="var(--color-danger)" 
              fill="url(#riskGlow)" 
              fillOpacity={0.6} 
              dot={{ r: 4, fill: 'var(--color-danger)', strokeWidth: 2, stroke: 'white' }}
              activeDot={{ r: 6, fill: 'var(--color-danger)', strokeWidth: 2, stroke: 'white' }}
              style={{ cursor: 'pointer', filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))' }}
            />
            <defs>
              <linearGradient id="riskGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <Tooltip 
              cursor={{fill: 'rgba(239, 68, 68, 0.1)'}}
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-danger)', boxShadow: '0 4px 12px rgba(239,68,68,0.2)', fontWeight: 600 }}
              itemStyle={{ color: 'var(--color-danger)' }}
            />
          </RadarChart>
        </ResponsiveContainer>

        {activeArea && (
          <div style={{ 
            position: 'absolute', bottom: '0', left: '0', right: '0', 
            backgroundColor: 'var(--color-surface)', padding: '12px', 
            borderRadius: '12px', border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'flex-start', gap: '8px',
            animation: 'fadeIn 0.2s ease'
          }}>
            <AlertTriangle size={16} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                {activeArea} Risk Detail
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                {activeArea === 'Managers' ? 'Critical overload detected in Engineering and Finance.' :
                 activeArea === 'Authority' ? 'High concentration of decision making in C-level roles.' :
                 activeArea === 'Budget' ? 'Nearing budget ceiling for Q3 contractors.' :
                 `Standard risk monitoring for ${activeArea}. No immediate anomalies detected.`}
              </div>
            </div>
            <button onClick={() => setActiveArea(null)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--color-text-muted)' }}>&times;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationRiskRadar;
