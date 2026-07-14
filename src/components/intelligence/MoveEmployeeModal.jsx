import React, { useState } from 'react';
import { X, Network, GitBranch, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { useOrgStore } from '../../store/orgStore';
import { useUIStore } from '../../store/uiStore';

const MoveEmployeeModal = ({ isOpen, onClose, employee }) => {
  const { addToast } = useUIStore();
  const [selectedManager, setSelectedManager] = useState('');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !employee) return null;

  // Mock list of potential managers
  const managers = [
    { id: 'Sarah Jenkins', role: 'VP of Engineering' },
    { id: 'Michael Chen', role: 'VP of Product' },
    { id: 'David Lee', role: 'Director of Ops' },
    { id: 'Elena Rodriguez', role: 'CTO' }
  ].filter(m => m.id !== employee.name);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      addToast(`${employee.name} moved to report to ${selectedManager}`, 'success');
      onClose();
    }, 1500);
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 10000, animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 600, backgroundColor: 'var(--color-bg)', borderRadius: 16,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', zIndex: 10001,
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Network size={24} color="var(--color-primary)" /> Move Employee in Hierarchy
          </h2>
          <button onClick={onClose} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '32px' }}>
          {step === 1 ? (
            <div style={{ animation: 'fadeIn 0.3s' }}>
              <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: 24 }}>
                Select a new reporting manager for <strong>{employee.name}</strong> ({employee.title || 'Employee'}).
              </p>

              <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 32 }}>
                <div style={{ flex: 1, padding: 16, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 8 }}>CURRENT MANAGER</div>
                  <div style={{ fontWeight: 600 }}>Sarah Jenkins</div>
                </div>
                <ArrowRight size={24} color="var(--color-text-muted)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 8 }}>NEW MANAGER</div>
                  <select 
                    className="input-field" 
                    style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                  >
                    <option value="">Select Manager...</option>
                    {managers.map(m => (
                      <option key={m.id} value={m.id}>{m.id} - {m.role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                <button className="btn-secondary" onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, fontWeight: 600 }}>Cancel</button>
                <button 
                  className="btn-primary" 
                  onClick={() => setStep(2)}
                  disabled={!selectedManager}
                  style={{ padding: '10px 24px', borderRadius: 8, fontWeight: 600 }}
                >
                  Continue to Preview
                </button>
              </div>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.3s' }}>
              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--color-warning)', borderRadius: 8, padding: 16, marginBottom: 24, display: 'flex', gap: 12 }}>
                <AlertTriangle color="var(--color-warning)" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: 'var(--color-warning)' }}>Review Impact</h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>This move will affect 4 direct reports and alter the span of control for both managers.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                <div style={{ padding: 16, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 12 }}>ORGANIZATION HEALTH</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-success)' }}>+2%</span>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Projected increase</span>
                  </div>
                </div>
                <div style={{ padding: 16, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 12 }}>AFFECTED EMPLOYEES</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '24px', fontWeight: 700 }}>5</span>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>in reporting chain</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                <button className="btn-secondary" onClick={() => setStep(1)} disabled={isProcessing} style={{ padding: '10px 20px', borderRadius: 8, fontWeight: 600 }}>Back</button>
                <button 
                  className="btn-primary" 
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  style={{ padding: '10px 24px', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-success)' }}
                >
                  {isProcessing ? 'Updating...' : <><CheckCircle size={18} /> Confirm Move</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MoveEmployeeModal;
