import React, { useState } from 'react';
import Card from '../common/Card';
import { RotateCcw, ShieldAlert, CheckCircle, Database, LayoutDashboard, AlertTriangle } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const STAGES = [
  { id: 1, label: 'Review Changes', icon: LayoutDashboard },
  { id: 2, label: 'AI Risk Analysis', icon: ShieldAlert },
  { id: 3, label: 'Backup Current', icon: Database },
  { id: 4, label: 'Restore Preview', icon: RotateCcw },
  { id: 5, label: 'Confirm', icon: CheckCircle }
];

const EnterpriseRestoreFlow = ({ version, onCancel }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRestored, setIsRestored] = useState(false);
  const { addToast } = useUIStore();

  const handleNext = () => {
    if (currentStage === 5) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsRestored(true);
        addToast(`Organization successfully restored to ${version.id}`, 'success');
      }, 1500);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStage(prev => prev + 1);
      }, 800);
    }
  };

  if (isRestored) {
    return (
      <Card style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-surface)' }} className="animate-in zoom-in fade-in">
        <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle size={40} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>Restoration Successful</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>The organization has been rolled back to <strong>{version.id}</strong>.</p>
        <button className="btn-secondary" onClick={onCancel}>Return to Timeline</button>
      </Card>
    );
  }

  return (
    <Card style={{ padding: '32px', backgroundColor: 'white', border: '1px solid var(--color-primary)', boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)' }} className="animate-in slide-in-from-bottom-8 fade-in">
      <div className="flex justify-between items-center" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <RotateCcw size={20} color="var(--color-primary)" /> Enterprise Restore Wizard
        </h3>
        <button onClick={onCancel} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--color-border)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Cancel</button>
      </div>

      {/* Progress Wizard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 20, left: 20, right: 20, height: 2, backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', top: 20, left: 20, height: 2, backgroundColor: 'var(--color-primary)', zIndex: 1, width: `${((currentStage - 1) / 4) * 100}%`, transition: 'width 0.3s ease' }}></div>
        
        {STAGES.map((stage) => {
          const isActive = stage.id === currentStage;
          const isDone = stage.id < currentStage;
          let bgColor = isDone ? 'var(--color-primary)' : (isActive ? 'white' : 'var(--color-surface)');
          let color = isDone ? 'white' : (isActive ? 'var(--color-primary)' : 'var(--color-text-muted)');
          let border = isActive ? '2px solid var(--color-primary)' : '2px solid var(--color-border)';
          if (isDone) border = '2px solid var(--color-primary)';

          return (
            <div key={stage.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: 80 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: bgColor, border: border, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, transition: 'all 0.3s', boxShadow: isActive && !isProcessing ? '0 0 0 4px rgba(79, 70, 229, 0.2)' : 'none' }}>
                <stage.icon size={18} className={isActive && isProcessing ? 'animate-pulse' : ''} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, textAlign: 'center', color: isActive || isDone ? 'var(--color-text-main)' : 'var(--color-text-muted)', textTransform: 'uppercase' }}>{stage.label}</span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Content based on stage */}
      <div style={{ minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 24, backgroundColor: 'var(--color-surface-alt)', borderRadius: 12, marginBottom: 32 }}>
        {currentStage === 1 && (
          <div className="animate-in fade-in">
             <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 8 }}>Reviewing Target Topology</h4>
             <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: 400 }}>You are about to restore the organization to <strong>{version.id}</strong>. This will revert all structural changes made after {version.date}.</p>
          </div>
        )}
        {currentStage === 2 && (
          <div className="animate-in fade-in">
             <AlertTriangle size={32} color="var(--color-warning)" style={{ marginBottom: 16 }} />
             <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 8 }}>AI Risk Analysis Complete</h4>
             <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: 400 }}>No critical conflicts detected. Restoring this version will orphan 2 newly created projects, which will be reassigned to the default pool.</p>
          </div>
        )}
        {currentStage === 3 && (
          <div className="animate-in fade-in">
             <Database size={32} color="var(--color-primary)" style={{ marginBottom: 16 }} />
             <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 8 }}>Creating Safety Backup</h4>
             <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: 400 }}>A snapshot of the current live environment (v3.2.0) is being saved just in case you need to revert the rollback.</p>
          </div>
        )}
        {currentStage === 4 && (
          <div className="animate-in fade-in">
             <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 8 }}>Restore Preview Generated</h4>
             <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: 400 }}>Database mapping validated. Authority scores recalculated. The system is ready to apply the topological shift.</p>
          </div>
        )}
        {currentStage === 5 && (
          <div className="animate-in fade-in">
             <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: 8, color: 'var(--color-danger)' }}>Final Confirmation</h4>
             <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: 400 }}>This action will overwrite the live production organization structure with {version.id}.</p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button 
          className="btn-primary" 
          onClick={handleNext} 
          disabled={isProcessing}
          style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: currentStage === 5 ? 'var(--color-danger)' : 'var(--color-primary)' }}
        >
          {isProcessing ? 'Processing...' : (currentStage === 5 ? 'CONFIRM RESTORE' : 'Proceed to Next Step')}
        </button>
      </div>

    </Card>
  );
};

export default EnterpriseRestoreFlow;
