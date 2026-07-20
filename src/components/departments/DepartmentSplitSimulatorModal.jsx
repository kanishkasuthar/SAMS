import React, { useState } from 'react';
import { X, GitBranch, ShieldAlert, CheckCircle2, ChevronRight, Activity, Users } from 'lucide-react';

const DepartmentSplitSimulatorModal = ({ isOpen, onClose, department }) => {
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [step, setStep] = useState(1); // 1 = recommendations, 2 = review/compare

  if (!isOpen || !department) return null;

  const splitOptions = [
    {
      id: 'split-1',
      name: 'Functional Division',
      structures: [
        { name: 'Platform Engineering', size: 68 },
        { name: 'Application Engineering', size: 74 }
      ],
      metrics: { health: '+12%', workload: '-24%', concentration: '-40%' }
    },
    {
      id: 'split-2',
      name: 'Three-Pillar Division',
      structures: [
        { name: 'Core Engineering', size: 52 },
        { name: 'Product Engineering', size: 48 },
        { name: 'Cloud Engineering', size: 42 }
      ],
      metrics: { health: '+18%', workload: '-35%', concentration: '-55%' }
    }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] transition-opacity flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" style={{ animation: 'scaleIn 0.2s ease-out' }}>
          
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div style={{ padding: 8, backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: 8, color: 'var(--color-primary)' }}>
                <GitBranch size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Department Split Simulator</h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Analyzing structural optimizations for {department.name}</div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div style={{ padding: 16, backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: 12, border: '1px solid rgba(79, 70, 229, 0.2)' }}>
                  <div className="flex items-start gap-3">
                    <ShieldAlert size={20} color="var(--color-primary)" className="mt-1" />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: 4 }}>SAMS detected that {department.name} may benefit from structural division.</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                        Currently managing {department.projectCount || 8} active projects with HIGH authority concentration. 
                        Manager workload is significantly above recommended thresholds.
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 16 }}>Suggested Split Structures</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {splitOptions.map(option => (
                      <div 
                        key={option.id}
                        onClick={() => setSelectedSplit(option.id)}
                        style={{ 
                          padding: 20, 
                          backgroundColor: 'white', 
                          borderRadius: 12, 
                          border: `2px solid ${selectedSplit === option.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        className="hover:border-indigo-300"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>{option.name}</div>
                          <div className="flex gap-4">
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-success)' }}>{option.metrics.health} Health</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-success)' }}>{option.metrics.concentration} Concentration</span>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          {option.structures.map((struct, idx) => (
                            <div key={idx} style={{ flex: 1, padding: 12, backgroundColor: 'var(--color-bg)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 4 }}>{struct.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Users size={12}/> {struct.size} Employees
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && selectedSplit && (
              <div className="flex flex-col gap-6">
                {/* Simulated review */}
                <div style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 16 }}>Previewing: {splitOptions.find(o=>o.id===selectedSplit).name}</h3>
                  <div style={{ height: 200, backgroundColor: 'var(--color-bg)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--color-border)' }}>
                    <div className="text-center text-slate-500">
                      <Activity size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="font-semibold text-sm">Simulated Organization Map</p>
                      <p className="text-xs mt-1">Changes are not applied yet.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-200 bg-white flex justify-between items-center">
            <button onClick={onClose} className="btn-secondary px-6 py-2 rounded-lg font-semibold text-sm">Cancel</button>
            
            {step === 1 ? (
              <button 
                disabled={!selectedSplit}
                onClick={() => setStep(2)}
                className={`px-6 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 ${selectedSplit ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              >
                Compare & Preview <ChevronRight size={16} />
              </button>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary px-4 py-2 rounded-lg font-semibold text-sm">Back</button>
                <button onClick={() => {
                  alert("Simulated split applied (Mock)!");
                  onClose();
                }} className="px-6 py-2 rounded-lg font-semibold text-sm bg-red-600 text-white hover:bg-red-700 flex items-center gap-2">
                  <CheckCircle2 size={16} /> Apply Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentSplitSimulatorModal;
