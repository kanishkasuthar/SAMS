import React, { useState } from 'react';
import { LayoutGrid, TrendingUp, Clock, Users, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURES = [
  { id: 'org', name: 'Organization Studio', adoption: 78, dailyUsers: 2450, avgTime: '24m', growth: '+12%', peak: '10:00 AM' },
  { id: 'dec', name: 'Decision Flows', adoption: 64, dailyUsers: 1820, avgTime: '15m', growth: '+8%', peak: '2:30 PM' },
  { id: 'resp', name: 'Responsibility Matrix', adoption: 52, dailyUsers: 1450, avgTime: '12m', growth: '+15%', peak: '9:00 AM' },
  { id: 'rep', name: 'Reports', adoption: 38, dailyUsers: 980, avgTime: '5m', growth: '+2%', peak: '4:00 PM' },
  { id: 'sync', name: 'Sync Center', adoption: 26, dailyUsers: 640, avgTime: '8m', growth: '-4%', peak: '11:00 AM' },
];

const FeatureAdoptionWidget = ({ onFeatureClick }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutGrid size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Top Platform Features</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Adoption rate across active user base.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '12px', gap: '8px' }}>
        {FEATURES.map((feat) => (
          <div 
            key={feat.id}
            className="hover-lift"
            onMouseEnter={() => setHoveredId(feat.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onFeatureClick && onFeatureClick(feat)}
            style={{ 
              padding: '16px', 
              borderRadius: '12px', 
              border: '1px solid',
              borderColor: hoveredId === feat.id ? 'var(--color-border)' : 'transparent',
              backgroundColor: hoveredId === feat.id ? 'var(--color-surface)' : 'white',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{feat.name}</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-primary)' }}>{feat.adoption}%</span>
            </div>
            
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${feat.adoption}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}
              />
            </div>

            <AnimatePresence>
              {hoveredId === feat.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                    
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12}/> Daily Users</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)' }}>{feat.dailyUsers.toLocaleString()}</div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> Avg Time</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)' }}>{feat.avgTime}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={12}/> Growth</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: feat.growth.includes('+') ? 'var(--color-success)' : 'var(--color-danger)' }}>{feat.growth}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Activity size={12}/> Peak Usage</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-main)' }}>{feat.peak}</div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureAdoptionWidget;
