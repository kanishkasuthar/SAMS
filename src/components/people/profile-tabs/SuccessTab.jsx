import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertTriangle, ShieldAlert } from 'lucide-react';

const SuccessionTab = ({ employee }) => {
  if (!employee) return null;

  const successors = employee.successors || [];

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Risk Alert */}
      {successors.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24, backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <ShieldAlert size={32} color="var(--color-danger)" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-danger)', margin: 0 }}>High Succession Risk</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-main)', marginTop: 8, margin: 0 }}>
              AI could not identify any immediate internal successors for {employee.name}. If this employee resigns, the role will require an external hire. It is highly recommended to initiate leadership training for junior staff immediately.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24, backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <ShieldAlert size={32} color="var(--color-success)" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)', margin: 0 }}>Succession Plan Active</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-main)', marginTop: 8, margin: 0 }}>
              AI has identified {successors.length} potential successors for this role. The top candidate has a readiness score of {successors[0].readiness}%.
            </p>
          </div>
        </motion.div>
      )}

      {/* Successors List */}
      {successors.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>AI Recommended Successors</h3>
          
          {successors.map((succ, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + (i * 0.1) }} className="card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {succ.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>{succ.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <AlertTriangle size={14} color="var(--color-warning)" /> Skill Gap: {succ.gap}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>READINESS</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: succ.readiness >= 80 ? 'var(--color-success)' : 'var(--color-warning)' }}>{succ.readiness}%</span>
                  </div>
                  <div style={{ width: 150, height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${succ.readiness}%`, height: '100%', backgroundColor: succ.readiness >= 80 ? 'var(--color-success)' : 'var(--color-warning)' }}></div>
                  </div>
                </div>
                
                <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} className="hover:bg-slate-50">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};

export default SuccessionTab;
