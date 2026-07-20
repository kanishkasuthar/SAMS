import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Network, Maximize2 } from 'lucide-react';

const SmartHoverPreview = ({ employee, position, onOpenIntelligence, onFocusStudio }) => {
  if (!employee || !position) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          width: 320,
          backgroundColor: 'var(--color-bg)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px var(--color-border)',
          zIndex: 100,
          pointerEvents: 'auto',
          overflow: 'hidden'
        }}
        onMouseLeave={() => { /* Handled by parent */ }}
      >
        <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', gap: 12 }}>
          {employee.photo ? (
            <img src={employee.photo} alt={employee.name} style={{ width: 48, height: 48, borderRadius: '12px', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 600 }}>
              {employee.name.charAt(0)}
            </div>
          )}
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)' }}>{employee.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: 4 }}>{employee.role}</div>
            <div style={{ padding: '2px 8px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', fontSize: '10px', fontWeight: 700, borderRadius: '12px', display: 'inline-block' }}>
              {employee.authorityType || 'Standard'}
            </div>
          </div>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Department</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-main)' }}>{employee.department}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Manager</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-main)' }}>{employee.managerId || 'None'}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Workload</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-success)' }}>{employee.workload || 0}%</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Direct Reports</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-main)' }}>{employee.directReports || 0}</div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 12 }}>
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Top Projects</div>
            {(employee.projects || []).slice(0, 2).map((proj, i) => (
              <div key={i} style={{ fontSize: '12px', color: 'var(--color-text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>{proj.name}</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{proj.progress}%</span>
              </div>
            ))}
            {(!employee.projects || employee.projects.length === 0) && (
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>No active projects</div>
            )}
          </div>
        </div>

        <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 8 }}>
          <button 
            onClick={(e) => { e.stopPropagation(); onOpenIntelligence(); }} 
            className="btn-primary" 
            style={{ flex: 1, padding: '6px 0', fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}
          >
            <Brain size={14} /> Intelligence
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onFocusStudio(); }}
            className="btn-secondary" 
            style={{ flex: 1, padding: '6px 0', fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}
          >
            <Maximize2 size={14} /> Studio Focus
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SmartHoverPreview;
