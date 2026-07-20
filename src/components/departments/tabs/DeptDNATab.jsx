import React, { useState } from 'react';
import { Activity, Network, Maximize, AlertCircle, ChevronRight, Share2, BrainCircuit } from 'lucide-react';

const DeptDNATab = ({ department }) => {
  const [selectedDNA, setSelectedDNA] = useState(null);
  const dnaScores = department.dnaScores || { people: 86, authority: 61, project: 94, decision: 89, connection: 78 };
  
  const scoreDetails = {
    people: {
      label: 'People Structure',
      desc: 'Distribution of employees across hierarchical levels.',
      issues: ['High concentration at Level 3', 'Imbalanced team sizes'],
      employees: ['Priya Patel', 'Alex Smith']
    },
    authority: {
      label: 'Authority Distribution',
      desc: 'How decision-making power is spread across the department.',
      issues: ['43% of authority is concentrated in ' + department.head, '18 decision flows depend on three employees'],
      employees: [department.head, 'Marcus Johnson']
    },
    project: {
      label: 'Project Influence',
      desc: 'The department\'s footprint across active organizational projects.',
      issues: [],
      employees: []
    },
    decision: {
      label: 'Decision Reach',
      desc: 'Impact radius of department approvals.',
      issues: ['Architecture approval bottleneck'],
      employees: [department.head]
    },
    connection: {
      label: 'Cross-Department Connection',
      desc: 'Strength of ties with other business units.',
      issues: [],
      employees: []
    }
  };

  const renderMeter = (key, score) => {
    const isSelected = selectedDNA === key;
    return (
      <div 
        key={key}
        onClick={() => setSelectedDNA(selectedDNA === key ? null : key)}
        className={`p-4 rounded-xl border transition-all cursor-pointer ${isSelected ? 'border-indigo-500 bg-indigo-50/30' : 'border-transparent hover:bg-slate-50'}`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-bold uppercase tracking-wider ${isSelected ? 'text-indigo-700' : 'text-slate-600'}`}>{scoreDetails[key].label}</span>
          <span className={`text-sm font-black ${isSelected ? 'text-indigo-700' : 'text-slate-900'}`}>{score} / 100</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${isSelected ? 'bg-indigo-600' : 'bg-slate-400'}`} style={{ width: `${score}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="department-dna-grid">
      
      {/* LEFT COLUMN: 60% */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* DNA PROFILE */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '32px' }}>
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 className="label-with-icon" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                <Activity size={24} style={{ color: 'var(--color-primary)' }} /> <span>Department DNA Profile</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                The structural identity of this department based on multi-dimensional analysis.
              </p>
            </div>
            {selectedDNA && (
              <button style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setSelectedDNA(null)}>
                CLEAR SELECTION
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.keys(dnaScores).map(key => renderMeter(key, dnaScores[key]))}
          </div>
        </div>

        {/* DETAILS PANEL (Shows when a score is clicked) */}
        {selectedDNA && (
          <div style={{ backgroundColor: '#312E81', borderRadius: '16px', border: '1px solid #3730A3', boxShadow: 'var(--shadow-lg)', padding: '32px', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <BrainCircuit size={120} style={{ position: 'absolute', bottom: '-40px', right: '-40px', color: '#3730A3', opacity: 0.5 }} />
            
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#A5B4FC', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>DNA Analysis</h3>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>{scoreDetails[selectedDNA].label}</h4>
            <p style={{ color: '#E0E7FF', marginBottom: '24px' }}>{scoreDetails[selectedDNA].desc}</p>
            
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
              <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#C7D2FE', marginBottom: '12px' }}>Why this score?</h5>
              {scoreDetails[selectedDNA].issues.length > 0 ? (
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#EEF2FF' }}>
                  {scoreDetails[selectedDNA].issues.map((iss, i) => <li key={i}>{iss}</li>)}
                </ul>
              ) : (
                <p className="label-with-icon" style={{ fontSize: '14px', color: '#6EE7B7' }}>
                  <Activity size={16}/> <span>Metric is stable and within optimal thresholds.</span>
                </p>
              )}
            </div>

            {scoreDetails[selectedDNA].employees.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#C7D2FE', marginBottom: '12px' }}>Related Key Nodes</h5>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {scoreDetails[selectedDNA].employees.map((emp, i) => (
                    <span key={i} style={{ padding: '6px 12px', backgroundColor: '#3730A3', color: '#E0E7FF', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: '1px solid #4338CA' }}>{emp}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 10 }}>
              <button style={{ padding: '10px 20px', backgroundColor: 'white', color: '#312E81', borderRadius: '8px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>View Map</button>
              <button style={{ padding: '10px 20px', backgroundColor: '#3730A3', color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: 700, border: '1px solid #4338CA', cursor: 'pointer' }}>Simulate Improvement</button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: 40% */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* DNA TYPE BADGE */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '8px', background: 'linear-gradient(to right, #6366F1, #A855F7)' }}></div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>DNA TYPE</span>
          <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-primary)', textAlign: 'center', marginBottom: '16px', lineHeight: 1.2 }}>{department.dnaType || 'STRATEGIC AUTHORITY HUB'}</span>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textAlign: 'center', lineHeight: 1.5 }}>
            This department actively influences cross-functional decisions and holds significant approval authority across multiple product streams.
          </p>

          <div style={{ width: '100%', marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'left' }}>
            <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Strengths</span>
              <ul style={{ fontSize: '12px', color: 'var(--color-text-main)', fontWeight: 500, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>• High Project Influence</li>
                <li>• Strong Decision Reach</li>
                <li>• Extensive Connectivity</li>
              </ul>
            </div>
            <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-danger)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Risks</span>
              <ul style={{ fontSize: '12px', color: 'var(--color-text-main)', fontWeight: 500, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>• Authority Concentration</li>
                <li>• Manager Overload</li>
                <li>• Succession Dependency</li>
              </ul>
            </div>
          </div>
        </div>

        {/* NERVOUS SYSTEM MAP */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 className="label-with-icon" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                <Network size={18} style={{ color: 'var(--color-primary)' }} /> <span>Nervous System</span>
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Information flow visualization</p>
            </div>
            <button style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }} title="Expand Map">
              <Maximize size={18} />
            </button>
          </div>

          <div style={{ flex: 1, minHeight: '300px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '16px' }}>
            {/* Central Node */}
            <div style={{ zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
                {department.head.split(' ').map(n=>n[0]).join('')}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{department.head}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Authority Center</span>
            </div>

            {/* Tree Branches */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px', display: 'flex', justifyContent: 'space-between' }}>
              {/* Connector horizontal line */}
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', backgroundColor: 'var(--color-primary)', opacity: 0.3 }}></div>
              {/* Vertical drops */}
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', paddingTop: '16px' }}>
                  <div style={{ position: 'absolute', top: 0, left: '50%', width: '1px', height: '16px', backgroundColor: 'var(--color-primary)', opacity: 0.3, transform: 'translateX(-50%)' }}></div>
                  <div style={{ width: '32px', height: '32px', backgroundColor: 'white', border: '2px solid rgba(99, 102, 241, 0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px', zIndex: 10, boxShadow: 'var(--shadow-sm)' }}>
                    L{i}
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                    Sub-Team {i}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'rgba(255,255,255,0.8)', padding: '8px', borderRadius: '8px', backdropFilter: 'blur(4px)', border: '1px solid var(--color-border)', fontSize: '10px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              <div className="label-with-icon"><div style={{ width: '16px', height: '2px', backgroundColor: 'rgba(99, 102, 241, 0.3)' }}></div> <span>Reporting</span></div>
              <div className="label-with-icon"><div style={{ width: '16px', height: '2px', backgroundColor: 'var(--color-warning)' }}></div> <span>Approval (Hidden)</span></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DeptDNATab;
