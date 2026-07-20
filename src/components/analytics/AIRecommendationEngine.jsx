import React from 'react';
import { Zap, Check, X, ShieldAlert, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Flatten Engineering Hierarchy',
    desc: 'Remove one layer of middle management to improve agility and reduce approval bottlenecks.',
    priority: 'High',
    difficulty: 'Hard',
    impact: 'High',
    cost: '$0',
    time: '3 Months',
    depts: ['Engineering'],
    type: 'danger'
  },
  {
    id: 2,
    title: 'Automate Vendor Approvals',
    desc: 'Route level 1 vendor requests through the new AI approval engine.',
    priority: 'Medium',
    difficulty: 'Easy',
    impact: 'Medium',
    cost: '$12,000',
    time: '2 Weeks',
    depts: ['Finance', 'Operations'],
    type: 'warning'
  }
];

const AIRecommendationEngine = () => {
  const { setActiveItem } = useAnalytics();

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>AI Recommendation Engine</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Actionable intelligence with ROI predictions.</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        {RECOMMENDATIONS.map((rec) => (
          <div 
            key={rec.id}
            className="hover-lift"
            onClick={() => setActiveItem({ type: 'recommendation', data: rec })}
            style={{ 
              padding: '24px', 
              borderRadius: '16px', 
              border: '1px solid var(--color-border)',
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>{rec.title}</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '8px', backgroundColor: rec.type === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: rec.type === 'danger' ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                  {rec.priority} Priority
                </span>
              </div>
            </div>
            
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '0 0 20px 0' }}>{rec.desc}</p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}><ShieldAlert size={14} color="var(--color-text-muted)" /> Difficulty: {rec.difficulty}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}><TrendingUp size={14} color="var(--color-success)" /> Impact: {rec.impact}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}><Clock size={14} color="var(--color-text-muted)" /> Time: {rec.time}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}><DollarSign size={14} color="var(--color-text-muted)" /> Cost: {rec.cost}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Depts:</span>
                {rec.depts.map(d => (
                  <span key={d} style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>{d}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={(e) => e.stopPropagation()} className="hover-bg" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <X size={14} /> Ignore
                </button>
                <button onClick={(e) => e.stopPropagation()} className="hover-bg" style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                  <Check size={14} /> Apply Strategy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendationEngine;
