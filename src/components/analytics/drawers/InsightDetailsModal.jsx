import React from 'react';
import { X, Zap, ArrowRight, ShieldAlert, GitPullRequest } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InsightDetailsModal = ({ isOpen, onClose, insight }) => {
  if (!isOpen || !insight) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                {insight.icon && <insight.icon size={24} color={insight.priority === 'High' ? 'var(--color-danger)' : 'var(--color-primary)'} />}
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>AI Structural Analysis</div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0', color: 'var(--color-text-main)', lineHeight: 1.2 }}>{insight.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="hover-bg" style={{ padding: '8px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-main)', marginBottom: '8px' }}>Observation</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.6, margin: 0 }}>
                Over the past 14 days, the system detected a significant bottleneck. 
                Tasks routed to this department are experiencing a 45% increase in dwell time before action is taken.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Impacted Workflows</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  <GitPullRequest size={14} color="var(--color-text-muted)" /> 12 Active Processes
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Risk Assessment</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700, color: 'var(--color-danger)' }}>
                  <ShieldAlert size={14} /> High (88/100)
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} /> Recommended Action
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                The AI engine suggests re-routing non-critical consultation (C) tasks to automated notifications, reducing manual load by an estimated 28 hours per week.
              </p>
              <button style={{ padding: '10px 16px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                Apply Re-routing Rule <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InsightDetailsModal;
