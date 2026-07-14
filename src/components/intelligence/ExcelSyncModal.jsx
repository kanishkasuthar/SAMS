import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, FileSpreadsheet, CheckCircle2, AlertTriangle, UserPlus, UserMinus, RefreshCw, Briefcase, ChevronRight, Activity } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const ExcelSyncModal = ({ isOpen, onClose }) => {
  const { addToast } = useUIStore();
  const [step, setStep] = useState(1); // 1: Upload, 2: Analyzing, 3: Review Diffs, 4: Applying
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleUpload = () => {
    setFile({ name: 'Workday_Export_Q3.xlsx', size: '2.4 MB' });
    setStep(2);
    
    // Simulate parsing and diff generation
    setTimeout(() => {
      setStep(3);
    }, 2500);
  };

  const handleApply = () => {
    setStep(4);
    setTimeout(() => {
      addToast('Excel Sync complete. Organization structure updated.', 'success');
      onClose();
      // Reset state for next open
      setTimeout(() => { setStep(1); setFile(null); }, 500);
    }, 2000);
  };

  const reset = () => {
    if (step === 4) return;
    setStep(1);
    setFile(null);
    onClose();
  };

  const diffs = {
    new: [
      { name: 'Michael Scott', role: 'Regional Manager', dept: 'Sales' },
      { name: 'Jim Halpert', role: 'Senior Sales', dept: 'Sales' }
    ],
    deleted: [
      { name: 'Todd Packer', role: 'Traveling Sales', dept: 'Sales' }
    ],
    changed: [
      { name: 'David Wallace', change: 'Title Update', old: 'CFO', new: 'CEO' },
      { name: 'Ryan Howard', change: 'Department Transfer', old: 'Temp', new: 'Corporate' },
      { name: 'Dwight Schrute', change: 'Manager Change', old: 'Michael Scott', new: 'Charles Miner' }
    ]
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={step !== 2 && step !== 4 ? reset : undefined}
      />
      
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 800, maxHeight: '90vh', backgroundColor: 'var(--color-surface)', borderRadius: 16,
        boxShadow: 'var(--shadow-2xl)', zIndex: 9999, display: 'flex', flexDirection: 'column',
        animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)', overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
            <FileSpreadsheet size={24} color="var(--color-success)" /> Live Excel HR Sync
          </h2>
          <button onClick={reset} disabled={step === 2 || step === 4} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', cursor: (step === 2 || step === 4) ? 'not-allowed' : 'pointer' }}>
            <X size={20} color="var(--color-text-secondary)" />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: 32, flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-bg)' }}>
          
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Upload size={32} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>Upload HR Roster</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textAlign: 'center', maxWidth: 400, marginBottom: 32 }}>
                Upload your latest Excel or CSV export from Workday, SAP, or Entra. SAMS will automatically detect hierarchy changes, new hires, and departures.
              </p>
              
              <div 
                onClick={handleUpload}
                style={{ 
                  width: '100%', maxWidth: 500, padding: 40, border: '2px dashed var(--color-primary)', 
                  borderRadius: 16, backgroundColor: 'var(--color-surface)', textAlign: 'center',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
                className="hover:bg-slate-50"
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)' }}>Click to browse or drag and drop</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: 8 }}>Supports .xlsx, .csv (Max 50MB)</div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
              <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 24 }}>
                <div style={{ position: 'absolute', inset: 0, border: '4px solid rgba(79, 70, 229, 0.2)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', inset: 0, border: '4px solid var(--color-primary)', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
                <Activity size={32} color="var(--color-primary)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>Analyzing Organization Diffs...</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Comparing {file?.name} against current SAMS hierarchy.</p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)', padding: 16, borderRadius: 8, border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FileSpreadsheet size={20} color="var(--color-success)" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{file?.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Analyzed in 2.4s • 1,426 rows matched</div>
                  </div>
                </div>
                <div style={{ padding: '6px 12px', borderRadius: 16, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', fontSize: '12px', fontWeight: 700 }}>
                  6 Changes Detected
                </div>
              </div>

              {/* Diffs Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                
                {/* Additions / Deletions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  
                  <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--color-success)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                      <UserPlus size={16} color="var(--color-success)" />
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>NEW EMPLOYEES (2)</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {diffs.new.map((emp, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: i === diffs.new.length - 1 ? 'none' : '1px solid var(--color-border)' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600 }}>{emp.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{emp.role}</div>
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-success)' }}>+ Add</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--color-danger)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                      <UserMinus size={16} color="var(--color-danger)" />
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>DEPARTURES (1)</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {diffs.deleted.map((emp, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600 }}>{emp.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{emp.role}</div>
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-danger)' }}>- Archive</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Structure Changes */}
                <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--color-warning)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <RefreshCw size={16} color="var(--color-warning)" />
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>STRUCTURAL CHANGES (3)</h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {diffs.changed.map((emp, i) => (
                      <div key={i} style={{ paddingBottom: 16, borderBottom: i === diffs.changed.length - 1 ? 'none' : '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: 4 }}>{emp.name}</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-warning)', marginBottom: 8 }}>{emp.change.toUpperCase()}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'var(--color-surface-hover)', borderRadius: 4 }}>{emp.old}</span>
                          <ChevronRight size={14} color="var(--color-text-muted)" />
                          <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', fontWeight: 600, borderRadius: 4 }}>{emp.new}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 16, borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 12, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <AlertTriangle size={18} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                  <strong>Audit Log Notice:</strong> Applying these changes will create a new immutable organization snapshot. You can roll back to the current version at any time using the Organization Time Machine.
                </div>
              </div>

            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
                style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}
              >
                <CheckCircle2 size={40} color="var(--color-success)" />
              </motion.div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>Sync Successful</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Organization hierarchy and profiles have been updated.</p>
            </motion.div>
          )}

        </div>

        {/* Footer */}
        {step === 3 && (
          <div style={{ padding: '16px 32px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button className="btn-secondary" onClick={reset} style={{ padding: '10px 24px', fontSize: '14px' }}>Cancel</button>
            <button className="btn-primary" onClick={handleApply} style={{ padding: '10px 24px', fontSize: '14px' }}>Apply Changes</button>
          </div>
        )}

      </div>
    </>
  );
};

export default ExcelSyncModal;
