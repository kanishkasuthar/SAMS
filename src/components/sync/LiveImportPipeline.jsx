import React, { useEffect, useState } from 'react';
import { Upload, Scan, BrainCircuit, Users, Building2, Network, Database, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';

const pipelineStages = [
  { id: 'upload', label: 'Upload', icon: Upload },
  { id: 'scan', label: 'Scan', icon: Scan },
  { id: 'ai', label: 'AI Validation', icon: BrainCircuit },
  { id: 'duplicate', label: 'Duplicate Detection', icon: Users },
  { id: 'hierarchy', label: 'Hierarchy Validation', icon: Building2 },
  { id: 'authority', label: 'Authority Mapping', icon: Network },
  { id: 'db', label: 'Database Sync', icon: Database },
  { id: 'done', label: 'Completed', icon: CheckCircle2 }
];

const LiveImportPipeline = ({ isSyncing, onComplete }) => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  useEffect(() => {
    if (isSyncing) {
      let currentIdx = 0;
      const interval = setInterval(() => {
        currentIdx++;
        if (currentIdx < pipelineStages.length) {
          setActiveStageIdx(currentIdx);
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 600); // 600ms per stage for animation feel

      return () => clearInterval(interval);
    } else {
      setActiveStageIdx(0);
    }
  }, [isSyncing, onComplete]);

  return (
    <Card style={{ padding: '32px', marginBottom: '24px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
        {isSyncing ? 'Live Synchronization Pipeline' : 'Synchronization Pipeline'}
      </h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        {/* Background Line */}
        <div style={{ position: 'absolute', top: 20, left: 20, right: 20, height: 2, backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>
        
        {/* Animated Progress Line */}
        <div style={{ position: 'absolute', top: 20, left: 20, height: 2, backgroundColor: 'var(--color-primary)', zIndex: 1, width: `${(activeStageIdx / (pipelineStages.length - 1)) * 100}%`, transition: 'width 0.5s ease' }}></div>

        {pipelineStages.map((stage, idx) => {
          const isActive = idx === activeStageIdx;
          const isDone = idx < activeStageIdx;
          
          let bgColor = 'white';
          let borderColor = 'var(--color-border)';
          let iconColor = 'var(--color-text-muted)';
          
          if (isActive) {
            bgColor = 'var(--color-primary)';
            borderColor = 'var(--color-primary)';
            iconColor = 'white';
          } else if (isDone) {
            bgColor = 'white';
            borderColor = 'var(--color-primary)';
            iconColor = 'var(--color-primary)';
          }

          return (
            <div key={stage.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: 80 }}>
              <div 
                style={{ 
                  width: 40, height: 40, borderRadius: '50%', backgroundColor: bgColor, border: `2px solid ${borderColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 0 0 4px rgba(79, 70, 229, 0.2)' : 'none',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                <stage.icon size={18} color={iconColor} className={isActive && idx !== pipelineStages.length - 1 ? 'animate-pulse' : ''} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: isActive || isDone ? 'var(--color-text-main)' : 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.2 }}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LiveImportPipeline;
