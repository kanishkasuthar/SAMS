import React, { useState } from 'react';
import { 
  UploadCloud, FileSpreadsheet, Check, AlertTriangle, XCircle, ArrowRight, Columns, RefreshCw, Eye
} from 'lucide-react';
import './SyncCenter.css';

const STEPS = [
  { id: 1, label: 'Upload' },
  { id: 2, label: 'Map Columns' },
  { id: 3, label: 'Validation' },
  { id: 4, label: 'Live Sync' },
];

const SyncCenter = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const startSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      // Would normally redirect to OrgStudio here and trigger playback
      alert('Sync Complete! Playback animation would start now.');
      setCurrentStep(1);
    }, 3000);
  };

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="sync-container">
        
        {/* HEADER & STEPS */}
        <div className="sync-header">
          <div>
            <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Organization Sync Center</h1>
            <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Enterprise Excel Synchronization Engine.</p>
          </div>
          <div className="sync-steps">
            {STEPS.map((step) => (
              <div key={step.id} className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                <div className="step-circle">
                  {currentStep > step.id ? <Check size={16} /> : step.id}
                </div>
                <span className="step-label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="card" style={{padding: 48, minHeight: 400}}>
          
          {/* STEP 1: UPLOAD */}
          {currentStep === 1 && (
            <div className="flex-col items-center justify-center h-full gap-6 animate-in fade-in zoom-in duration-300">
              <div className="upload-zone w-full" onClick={handleNext}>
                <div className="upload-icon">
                  <UploadCloud size={40} />
                </div>
                <div style={{textAlign: 'center'}}>
                  <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8}}>Drag & drop Excel file here</h3>
                  <p style={{color: 'var(--color-text-muted)'}}>Supported formats: .xlsx, .csv (Max 50MB)</p>
                </div>
                <button className="card" style={{padding: '8px 24px', fontWeight: 600}}>Browse Files</button>
              </div>
            </div>
          )}

          {/* STEP 2: MAPPING */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center" style={{marginBottom: 24}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600}}><Columns size={20} style={{display: 'inline', marginRight: 8, verticalAlign: 'text-bottom'}} /> Column Mapping</h3>
                <span style={{color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem'}}>✓ Auto-detected 9/10 columns</span>
              </div>
              
              <div className="mapping-grid">
                <div className="mapping-list">
                  <h4 style={{color: 'var(--color-text-muted)', marginBottom: 8}}>Excel Column</h4>
                  {['Employee_ID', 'Full_Name', 'Email_Address', 'Role_Title', 'Dept_Code', 'Manager_ID'].map(col => (
                    <div key={col} className="mapping-row">
                      <span style={{fontWeight: 500}}>{col}</span>
                      <ArrowRight size={16} color="var(--color-text-muted)" />
                    </div>
                  ))}
                </div>
                <div className="mapping-list">
                  <h4 style={{color: 'var(--color-text-muted)', marginBottom: 8}}>SAMS Field</h4>
                  {['Employee ID', 'Name', 'Email', 'Designation', 'Department', 'Reporting Manager'].map((col, i) => (
                    <div key={col} className="mapping-row" style={{borderColor: i === 5 ? 'var(--color-warning)' : 'var(--color-border)'}}>
                      <select className="mapping-select" defaultValue={col}>
                        <option value={col}>{col}</option>
                        <option value="ignore">Ignore</option>
                      </select>
                      {i === 5 && <AlertTriangle size={16} color="var(--color-warning)" />}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end" style={{marginTop: 32}}>
                <button className="sync-action-btn" onClick={handleNext}>Validate Data <ArrowRight size={18} /></button>
              </div>
            </div>
          )}

          {/* STEP 3: VALIDATION */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right duration-300">
               <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 24}}>Validation Dashboard</h3>
               
               <div className="grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32}}>
                 <div className="val-card success">
                    <div className="flex justify-between items-center">
                      <h4 style={{color: 'var(--color-success)', fontWeight: 600}}>Valid Records</h4>
                      <Check size={20} color="var(--color-success)" />
                    </div>
                    <span style={{fontSize: '2rem', fontWeight: 700}}>14,193</span>
                 </div>
                 
                 <div className="val-card warning">
                    <div className="flex justify-between items-center">
                      <h4 style={{color: 'var(--color-warning)', fontWeight: 600}}>Missing Managers</h4>
                      <AlertTriangle size={20} color="var(--color-warning)" />
                    </div>
                    <span style={{fontSize: '2rem', fontWeight: 700}}>8</span>
                 </div>

                 <div className="val-card error">
                    <div className="flex justify-between items-center">
                      <h4 style={{color: 'var(--color-danger)', fontWeight: 600}}>Circular Reporting</h4>
                      <XCircle size={20} color="var(--color-danger)" />
                    </div>
                    <span style={{fontSize: '2rem', fontWeight: 700}}>2</span>
                 </div>
               </div>

               <div className="card" style={{padding: 24, backgroundColor: 'var(--color-bg)'}}>
                 <h4 style={{fontWeight: 600, marginBottom: 16}}>Action Required</h4>
                 <ul style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                   <li style={{display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: 'white', borderRadius: 8}}>
                     <span style={{display: 'flex', alignItems: 'center', gap: 8}}><AlertTriangle size={16} color="var(--color-warning)"/> Row 492: Employee 'John Doe' missing manager ID.</span>
                     <button style={{color: 'var(--color-primary)', fontWeight: 600}}>Auto-Fix</button>
                   </li>
                   <li style={{display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: 'white', borderRadius: 8}}>
                     <span style={{display: 'flex', alignItems: 'center', gap: 8}}><XCircle size={16} color="var(--color-danger)"/> Row 1024: Circular dependency detected between EMP-1024 and EMP-842.</span>
                     <button style={{color: 'var(--color-primary)', fontWeight: 600}}>Resolve</button>
                   </li>
                 </ul>
               </div>

               <div className="flex justify-end" style={{marginTop: 32}}>
                <button className="sync-action-btn" onClick={handleNext} style={{backgroundColor: 'var(--color-success)'}}>Proceed to Preview <Eye size={18} /></button>
              </div>
            </div>
          )}

          {/* STEP 4: LIVE SYNC PREVIEW */}
          {currentStep === 4 && (
            <div className="animate-in fade-in zoom-in duration-300 flex-col items-center justify-center text-center py-12">
               <FileSpreadsheet size={64} color="var(--color-primary)" style={{marginBottom: 24}} />
               <h3 style={{fontSize: '1.75rem', fontWeight: 700, marginBottom: 8}}>Ready for Live Sync</h3>
               <p style={{color: 'var(--color-text-muted)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6}}>
                 This will update the organizational hierarchy. We detected <b>12 New Employees</b>, <b>3 Promotions</b>, and <b>5 Department Transfers</b>. No page refresh required.
               </p>

               <div className="flex justify-center gap-16" style={{marginBottom: 48}}>
                 <div className="flex-col gap-2">
                   <span style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)'}}>+12</span>
                   <span style={{color: 'var(--color-text-muted)', fontWeight: 500, fontSize: '0.9rem'}}>Added</span>
                 </div>
                 <div className="flex-col gap-2">
                   <span style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-warning)'}}>8</span>
                   <span style={{color: 'var(--color-text-muted)', fontWeight: 500, fontSize: '0.9rem'}}>Moved</span>
                 </div>
                 <div className="flex-col gap-2">
                   <span style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-danger)'}}>-2</span>
                   <span style={{color: 'var(--color-text-muted)', fontWeight: 500, fontSize: '0.9rem'}}>Removed</span>
                 </div>
               </div>

               <button 
                className="sync-action-btn" 
                onClick={startSync}
                disabled={isSyncing}
                style={{width: 250, margin: '0 auto', backgroundColor: isSyncing ? 'var(--color-text-muted)' : 'var(--color-primary)'}}
              >
                {isSyncing ? (
                  <><RefreshCw className="animate-spin" size={18} /> Syncing Data...</>
                ) : (
                  <><RefreshCw size={18} /> Start Live Sync</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncCenter;
