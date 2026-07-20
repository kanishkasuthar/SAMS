import React, { useState } from 'react';
import { X, Shield, Activity, Key, Users } from 'lucide-react';
import AccessBlastRadiusModal from './AccessBlastRadiusModal';

const PermissionIntelligencePanelModal = ({ isOpen, onClose, permission, role }) => {
  const [showBlastRadius, setShowBlastRadius] = useState(false);

  if (!isOpen || !permission) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'scale-in 0.2s ease-out' }}>
        
        {/* Header */}
        <div style={{ backgroundColor: 'var(--color-sidebar)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Key size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>Permission Details</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', margin: '0 0 4px 0' }}>{permission.name}</h2>
              <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{permission.key}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', backgroundColor: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Module</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{permission.module}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Risk</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: permission.risk === 'CRITICAL' ? 'var(--color-danger)' : permission.risk === 'HIGH' ? 'var(--color-danger)' : permission.risk === 'MEDIUM' ? 'var(--color-warning)' : 'var(--color-success)' }}>{permission.risk}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Access Type</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>WRITE</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Description</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Allows the user to perform actions related to {permission.name.toLowerCase()}.</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Current Access</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>12 Users through System Administrator</span>
                  <div style={{ width: '60%', height: '8px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '4px' }}>
                    <div style={{ width: '20%', height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>45 Users through Organization Architect</span>
                  <div style={{ width: '60%', height: '8px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '4px' }}>
                    <div style={{ width: '75%', height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>3 Users through custom access</span>
                  <div style={{ width: '60%', height: '8px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '4px' }}>
                    <div style={{ width: '5%', height: '100%', backgroundColor: 'var(--color-accent)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--color-surface-hover)', marginTop: '8px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase' }}>TOTAL ACCESS</span>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: 'var(--color-primary)' }}>60 Users</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Recent Usage</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>David Chen</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Used {permission.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '4px' }}>15 July 2026</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>Kanishka Suthar</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Used {permission.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '4px' }}>14 July 2026</div>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-danger)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Impact of Removal</h3>
                <ul style={{ paddingLeft: '20px', color: 'var(--color-text-main)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
                  <li>60 users lose {permission.name.toLowerCase()} access.</li>
                  <li>8 active workflows may be affected.</li>
                  <li>3 administrators require replacement access.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '24px', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>VIEW USERS WITH ACCESS</button>
          <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>VIEW AUDIT HISTORY</button>
          <button onClick={() => setShowBlastRadius(true)} style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'white', backgroundColor: 'var(--color-danger)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>SIMULATE PERMISSION REMOVAL</button>
        </div>

      </div>

      <AccessBlastRadiusModal 
        isOpen={showBlastRadius} 
        onClose={() => setShowBlastRadius(false)} 
        permission={permission} 
        sourceRole={role} 
        actionType="REMOVE" 
      />

    </div>
  );
};

export default PermissionIntelligencePanelModal;
