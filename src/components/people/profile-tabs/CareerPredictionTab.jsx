import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, AlertTriangle, BookOpen, ChevronRight, Award, Zap } from 'lucide-react';

const CareerPredictionTab = ({ employee }) => {
  if (!employee) return null;

  const prediction = employee.aiPrediction || {
    eligiblePromotion: 'Senior Associate',
    timeline: '12-18 months',
    readiness: 75,
    missingSkills: ['Advanced Negotiation', 'Budget Management'],
    suggestedTraining: ['Leadership 101']
  };

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* AI Prediction Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 32, background: 'linear-gradient(135deg, rgba(79,70,229,0.05) 0%, rgba(59,130,246,0.05) 100%)', border: '1px solid rgba(79,70,229,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Zap size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)' }}>AI CAREER PREDICTION</h3>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: 8 }}>
              {prediction.eligiblePromotion}
            </h2>
            <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <ClockIcon size={16} /> Estimated Timeline: <strong style={{ color: 'var(--color-text-main)' }}>{prediction.timeline}</strong>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="3" />
                <motion.path 
                  initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: `${prediction.readiness}, 100` }} transition={{ duration: 1.5, delay: 0.2 }}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-primary)" strokeWidth="3" 
                />
              </svg>
              <div style={{ position: 'absolute', fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>{prediction.readiness}%</div>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginTop: 8 }}>READINESS SCORE</div>
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Missing Skills */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={18} color="var(--color-warning)" /> Skill Gaps Identified
          </h3>
          {prediction.missingSkills.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {prediction.missingSkills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <Target size={16} color="var(--color-warning)" />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{skill}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '14px', color: 'var(--color-success)', fontWeight: 600 }}>No major skill gaps identified for the next role.</div>
          )}
        </motion.div>

        {/* Suggested Training */}
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={18} color="var(--color-success)" /> Recommended Training
          </h3>
          {prediction.suggestedTraining.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {prediction.suggestedTraining.map((training, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'var(--color-surface-hover)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Award size={16} color="var(--color-success)" />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{training}</span>
                  </div>
                  <button style={{ padding: '6px 12px', borderRadius: 6, border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>No training required currently.</div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

const ClockIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default CareerPredictionTab;
