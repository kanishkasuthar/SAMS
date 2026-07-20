import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, ArrowRight, Users, Key, Network, Shield } from 'lucide-react';
import { useOrgStore } from '../../../store/orgStore';
import { useRoleStore } from '../../../store/roleStore';

const AccessBlastRadiusModal = ({ isOpen, onClose, permission, sourceRole, actionType = 'REMOVE' }) => {
  const { roles, permissions: allPermissions } = useRoleStore();
  const [simulationState, setSimulationState] = useState(0); // 0: init, 1: scanning, 2: complete

  useEffect(() => {
    if (isOpen) {
      setSimulationState(0);
      const timer1 = setTimeout(() => setSimulationState(1), 500);
      const timer2 = setTimeout(() => setSimulationState(2), 2000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [isOpen]);

  if (!isOpen || !permission || !sourceRole) return null;

  // Calculate blast radius
  // Find all child roles that inherit this
  const affectedRoles = [];
  const findChildren = (roleId) => {
    roles.filter(r => r.parentRoleId === roleId).forEach(child => {
      affectedRoles.push(child);
      findChildren(child.id);
    });
  };
  findChildren(sourceRole.id);

  const totalAffectedUsers = sourceRole.users + affectedRoles.reduce((sum, r) => sum + r.users, 0);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'scale-in 0.2s ease-out' }}>
        
        {/* Header */}
        <div style={{ backgroundColor: actionType === 'REMOVE' ? 'var(--color-danger)' : 'var(--color-primary)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>
                Impact Simulation
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', margin: '0' }}>
                Access Blast Radius
              </h2>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'rgba(255, 255, 255, 0.8)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', backgroundColor: 'var(--color-bg)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)' }}>
              Simulating {actionType.toLowerCase()} of <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{permission.name}</span> from <span style={{ fontWeight: 800 }}>{sourceRole.title}</span>
            </div>
          </div>

          {simulationState < 2 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid var(--color-surface-hover)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {simulationState === 0 ? 'Initializing Simulation...' : 'Tracing Inheritance Tree...'}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fade-in 0.3s ease-out' }}>
              
              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Users size={24} color="var(--color-text-muted)" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '32px', fontWeight: 900, color: actionType === 'REMOVE' ? 'var(--color-danger)' : 'var(--color-primary)' }}>{totalAffectedUsers}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Users Affected</div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Shield size={24} color="var(--color-text-muted)" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-warning)' }}>{affectedRoles.length}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Descendant Roles</div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Key size={24} color="var(--color-text-muted)" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-text-main)' }}>1</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Permission Revoked</div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Network size={24} color="var(--color-text-muted)" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-text-main)' }}>3</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Workflows Broken</div>
                </div>
              </div>

              {/* Propagation Tree */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>Propagation Cascade</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Origin */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-danger)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <ShieldAlert size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{sourceRole.title} <span style={{ fontSize: '12px', color: 'var(--color-danger)', fontWeight: 600 }}>(Origin)</span></div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{sourceRole.users} users directly lose access.</div>
                    </div>
                  </div>

                  {/* Children */}
                  {affectedRoles.length > 0 && affectedRoles.map((role, idx) => (
                    <div key={role.id} style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ width: '48px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '2px', backgroundColor: 'var(--color-border)', height: '100%' }}></div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)', marginTop: '8px' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-warning)' }}>
                          <ArrowRight size={16} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{role.name} <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>(Inherited)</span></div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{role.users} users lose inherited access.</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {affectedRoles.length === 0 && (
                    <div style={{ padding: '16px 48px', color: 'var(--color-text-secondary)', fontSize: '14px', fontStyle: 'italic' }}>
                      No descendant roles inherit this permission. Impact is isolated to origin role.
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        {simulationState === 2 && (
          <div style={{ padding: '24px', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Simulation complete. No changes were made.</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onClose} style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>CANCEL</button>
              <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'white', backgroundColor: 'var(--color-danger)', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>CONFIRM & APPLY REMOVAL <ArrowRight size={14}/></button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes scale-in { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AccessBlastRadiusModal;
