import React, { useState } from 'react';
import { UploadCloud, Check } from 'lucide-react';
import './SyncCenter.css';

import DataHealthDashboard from '../components/sync/DataHealthDashboard';
import DataQualityHeatmap from '../components/sync/DataQualityHeatmap';
import AIPreUploadAnalysis from '../components/sync/AIPreUploadAnalysis';
import AIRecommendations from '../components/sync/AIRecommendations';
import SmartConflictCenter from '../components/sync/SmartConflictCenter';
import BeforeAfterPreview from '../components/sync/BeforeAfterPreview';
import LiveImportPipeline from '../components/sync/LiveImportPipeline';
import ActivityStream from '../components/sync/ActivityStream';
import ExecutiveSummary from '../components/sync/ExecutiveSummary';
import SyncAIChat from '../components/sync/SyncAIChat';
import Card from '../components/common/Card';

const STEPS = [
  { id: 1, label: 'Upload' },
  { id: 2, label: 'AI Validation' },
  { id: 3, label: 'Conflict Resolution' },
  { id: 4, label: 'Live Sync' },
];

const SyncCenter = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncCompleted, setSyncCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const startSync = () => {
    setIsSyncing(true);
  };

  const handleSyncComplete = () => {
    setIsSyncing(false);
    setSyncCompleted(true);
  };

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)', position: 'relative'}}>
      <div className="sync-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER & STEPS */}
        {!syncCompleted && (
          <div className="sync-header" style={{ marginBottom: 32 }}>
            <div>
              <h1 style={{fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: 12}}>
                Data Control Tower
              </h1>
              <p style={{color: 'var(--color-text-muted)', marginTop: 4, fontSize: '15px'}}>Enterprise AI Synchronization & Conflict Resolution.</p>
            </div>
            <div className="sync-steps">
              {STEPS.map((step) => (
                <div key={step.id} className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                  <div className="step-circle" style={{ transition: 'all 0.3s' }}>
                    {currentStep > step.id ? <Check size={16} /> : step.id}
                  </div>
                  <span className="step-label" style={{ fontWeight: currentStep === step.id ? 700 : 600 }}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT AREA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: 64 }}>
          
          {/* STEP 1: UPLOAD & HEALTH */}
          {currentStep === 1 && (
            <div className="animate-in fade-in zoom-in duration-300">
              <DataHealthDashboard />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
                <DataQualityHeatmap />
                
                <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div 
                    className="upload-zone w-full hover:border-indigo-400 hover:bg-indigo-50/50" 
                    onClick={handleNext} 
                    style={{ cursor: 'pointer', border: '2px dashed var(--color-border)', borderRadius: '12px', padding: '32px 16px', textAlign: 'center', transition: 'all 0.2s' }}
                  >
                    <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <UploadCloud size={32} />
                    </div>
                    <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: 8}}>Upload Dataset</h3>
                    <p style={{color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: 24}}>Drop Excel or CSV file here to begin AI Analysis.</p>
                    <button className="btn-primary" style={{ padding: '8px 24px' }}>Browse Files</button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* STEP 2: AI ANALYSIS */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right duration-300">
              <AIPreUploadAnalysis onProceed={handleNext} />
              <AIRecommendations />
            </div>
          )}

          {/* STEP 3: SMART CONFLICT */}
          {currentStep === 3 && (
            <SmartConflictCenter onProceed={handleNext} />
          )}

          {/* STEP 4: PREVIEW & LIVE SYNC */}
          {currentStep === 4 && !syncCompleted && (
            <div className="animate-in fade-in slide-in-from-right duration-300">
              {!isSyncing ? (
                <BeforeAfterPreview onStartSync={startSync} isSyncing={isSyncing} />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                  <LiveImportPipeline isSyncing={isSyncing} onComplete={handleSyncComplete} />
                  <ActivityStream isSyncing={isSyncing} />
                </div>
              )}
            </div>
          )}

          {/* POST-SYNC SUMMARY */}
          {syncCompleted && (
            <ExecutiveSummary />
          )}

        </div>
      </div>

      <SyncAIChat />
    </div>
  );
};

export default SyncCenter;
