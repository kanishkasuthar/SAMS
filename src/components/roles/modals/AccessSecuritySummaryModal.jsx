import React from 'react';
import { X, ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

const AccessSecuritySummaryModal = ({ isOpen, onClose, role }) => {
  if (!isOpen || !role) return null;
  
  const riskCount = role.accessRisks?.length || 0;
  const healthScore = riskCount > 0 ? 72 : 100;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '600px', overflow: 'hidden', animation: 'scale-in 0.2s ease-out' }}>
        
        {/* Header */}
        <div style={{ backgroundColor: riskCount > 0 ? 'var(--color-danger)' : 'var(--color-success)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              {riskCount > 0 ? <ShieldAlert size={24} /> : <ShieldCheck size={24} />}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>Security Posture Summary</div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', margin: '0' }}>{role.name}</h2>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'rgba(255, 255, 255, 0.8)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px', backgroundColor: 'var(--color-bg)' }}>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: healthScore < 100 ? 'var(--color-warning)' : 'var(--color-success)', lineHeight: 1, marginBottom: '8px' }}>{healthScore}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Security Score</div>
            </div>
            <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: riskCount > 0 ? 'var(--color-danger)' : 'var(--color-success)', lineHeight: 1, marginBottom: '8px' }}>{riskCount}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Active Risks</div>
            </div>
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Compliance Checks</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Lock size={18} color="var(--color-text-secondary)" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Multi-Factor Authentication (MFA)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontSize: '12px', fontWeight: 700 }}>
                <CheckCircle2 size={16} /> Enforced
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Users size={18} color="var(--color-text-secondary)" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Segregation of Duties</span>
              </div>
              {riskCount > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-warning)', fontSize: '12px', fontWeight: 700 }}>
                  <AlertTriangle size={16} /> Review Recommended
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontSize: '12px', fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Compliant
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Activity size={18} color="var(--color-text-secondary)" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>Session Timeout Policies</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontSize: '12px', fontWeight: 700 }}>
                <CheckCircle2 size={16} /> 15 Minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessSecuritySummaryModal;
