import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const ViewInsightModal = ({ isOpen, onClose, insight }) => {
  if (!insight) return null;

  let Icon = AlertCircle;
  let iconColor = 'var(--color-primary)';
  let iconBg = 'rgba(79, 70, 229, 0.1)';

  if (insight.severity === 'high') {
    Icon = AlertTriangle;
    iconColor = 'var(--color-danger)';
    iconBg = 'rgba(239, 68, 68, 0.1)';
  } else if (insight.severity === 'medium' || insight.severity === 'warning') {
    Icon = AlertCircle;
    iconColor = 'var(--color-warning)';
    iconBg = 'rgba(245, 158, 11, 0.1)';
  } else if (insight.severity === 'success') {
    Icon = CheckCircle;
    iconColor = 'var(--color-success)';
    iconBg = 'rgba(16, 185, 129, 0.1)';
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content glass"
            style={{ maxWidth: 500 }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} />
                </div>
                Insight Details
              </h2>
              <button className="icon-btn" onClick={onClose}><X size={20} /></button>
            </div>

            <div className="flex flex-col gap-16">
              <div className="card" style={{ padding: 16, backgroundColor: 'var(--color-bg)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 8 }}>{insight.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{insight.description}</p>
              </div>

              <div className="flex gap-16" style={{ alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4 }}>Affected Entities</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{insight.count}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4 }}>Severity Level</div>
                  <div style={{ 
                    display: 'inline-flex', 
                    padding: '4px 8px', 
                    borderRadius: 6, 
                    backgroundColor: iconBg, 
                    color: iconColor, 
                    fontWeight: 600, 
                    fontSize: '0.85rem',
                    textTransform: 'capitalize'
                  }}>
                    {insight.severity}
                  </div>
                </div>
              </div>
              
              {insight.affectedEntities && insight.affectedEntities.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>Details of Affected Entities</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: 20, color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {insight.affectedEntities.map((entity, idx) => (
                      <li key={idx}>{entity}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginTop: 8 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>Recommended Action</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {insight.severity === 'success' 
                    ? 'No action required. Keep monitoring the organization structure.' 
                    : 'Please review the affected entities in the Organization Studio and adjust hierarchical relationships to resolve this alert.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-12" style={{ marginTop: 32 }}>
              <button className="btn-secondary" onClick={onClose}>Close</button>
              {insight.severity !== 'success' && (
                <button className="btn-primary" onClick={onClose}>Acknowledge</button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewInsightModal;
