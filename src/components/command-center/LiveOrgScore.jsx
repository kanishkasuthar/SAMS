import React from 'react';
import { TrendingUp, Activity, CheckCircle2 } from 'lucide-react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const LiveOrgScore = () => {
  const { orgHealthScore } = useAnalytics();
  
  // Calculate stroke dasharray for the circular progress (circumference = 2 * pi * r)
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (orgHealthScore / 100) * circumference;
  
  const getScoreColor = (score) => {
    if (score >= 90) return 'var(--color-success)';
    if (score >= 75) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const color = getScoreColor(orgHealthScore);

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>Organization Health</h3>
        <span style={{ padding: '4px 8px', backgroundColor: 'var(--color-bg)', borderRadius: '12px', fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Activity size={12} /> LIVE
        </span>
      </div>

      <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background Circle */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--color-bg)" strokeWidth="12" />
          <circle 
            cx="80" cy="80" r={radius} fill="none" stroke={color} strokeWidth="12"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
          />
        </svg>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--color-text-main)', lineHeight: 1 }}>
            {Math.round(orgHealthScore)}<span style={{ fontSize: '20px', color: 'var(--color-text-muted)' }}>%</span>
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
            {orgHealthScore >= 90 ? 'Excellent' : orgHealthScore >= 75 ? 'Healthy' : 'Critical'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', marginTop: '32px' }}>
        <div style={{ backgroundColor: 'var(--color-bg)', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>PREV MONTH</span>
          <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> +4%
          </span>
        </div>
        <div style={{ backgroundColor: 'var(--color-bg)', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>AI CONFIDENCE</span>
          <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={14} /> 97%
          </span>
        </div>
      </div>

      <div style={{ width: '100%', marginTop: '16px', padding: '12px', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '12px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        <strong>Prediction:</strong> Will remain stable for next 30 days.
      </div>
    </div>
  );
};

export default LiveOrgScore;
