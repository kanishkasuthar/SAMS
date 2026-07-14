import React, { useState } from 'react';
import { Sparkles, BrainCircuit, Lightbulb, AlertTriangle } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';

// Import Intelligence Components
import ScorecardMetrics from '../components/intelligence/ScorecardMetrics';
import ExecutiveSummary from '../components/intelligence/ExecutiveSummary';
import DigitalTwin from '../components/intelligence/DigitalTwin';
import SmartRecommendations from '../components/intelligence/SmartRecommendations';
import ManagerAnalysis from '../components/intelligence/ManagerAnalysis';
import RiskHeatmap from '../components/intelligence/RiskHeatmap';
import WhatIfSimulator from '../components/intelligence/WhatIfSimulator';
import TimelineAndAnalytics from '../components/intelligence/TimelineAndAnalytics';
import OrganizationAnalytics from '../components/intelligence/OrganizationAnalytics';

const OrganizationInsights = () => {
  const { 
    scorecardData, 
    aiSummaryData, 
    recommendationsData, 
    managerWorkloadData,
    deptHealthData,
    simulatorData,
    auditLogs,
    analyticsData
  } = useOrgStore();

  const [isScanning, setIsScanning] = useState(false);

  const handleRunAnalysis = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div style={{ 
      padding: '32px 36px 48px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 32,
      minHeight: '100vh',
      backgroundColor: '#F7F9FC'
    }}>
      
      {/* Scanning Overlay */}
      {isScanning && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(15, 23, 42, 0.8)', zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '4px solid rgba(79, 70, 229, 0.2)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '4px solid var(--color-primary)', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1.5s linear infinite' }}></div>
            <BrainCircuit size={64} color="var(--color-primary)" style={{ animation: 'pulse 1.5s infinite' }} />
          </div>
          <h2 style={{ color: 'white', marginTop: 32, fontSize: '1.75rem', fontWeight: 600 }}>Analyzing Organization Data...</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '1.1rem' }}>Running deep structural heuristics and predictive models.</p>
        </div>
      )}

      {/* SECTION 1 - CLEAN PAGE HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <BrainCircuit size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2 }}>Organization Insights</h1>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>AI-powered structural analysis, optimization recommendations and organizational health monitoring.</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            <span style={{ display: 'flex', width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-success)', position: 'relative' }}>
              <span style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--color-success)', animation: 'ping 1.5s infinite', opacity: 0.7 }}></span>
            </span>
            Live Analysis • Last analyzed 2 min ago
          </div>
          <button className="btn-primary" onClick={handleRunAnalysis} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>
            <Sparkles size={16} /> Run Full Analysis
          </button>
        </div>
      </div>

      {/* SECTION 2 - AI EXECUTIVE SUMMARY */}
      <section>
        <ExecutiveSummary summaryData={aiSummaryData} />
      </section>

      {/* SECTION 3 - ORGANIZATION HEALTH OVERVIEW */}
      <section>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Organization Health Overview</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Key structural health indicators across your organization.</p>
        </div>
        <ScorecardMetrics data={scorecardData} />
      </section>

      {/* SECTION 4 - AI ATTENTION CENTER */}
      <section>
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <AlertTriangle size={24} color="var(--color-danger)" />
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>AI Attention Center</h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Important structural issues that may require action.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <SmartRecommendations recommendations={recommendationsData} />
          <ManagerAnalysis managers={managerWorkloadData} />
        </div>
      </section>

      {/* SECTION 5 - ORGANIZATION DIGITAL TWIN */}
      <section>
        <DigitalTwin departments={deptHealthData} />
      </section>

      {/* SECTION 6 - ORGANIZATION RISK MAP */}
      <section>
        <RiskHeatmap departments={deptHealthData || []} />
      </section>

      {/* SECTION 7 - WHAT-IF SIMULATOR */}
      <section>
        <WhatIfSimulator simulatorData={simulatorData} />
      </section>

      {/* SECTION 8 - ORGANIZATION ACTIVITY TIMELINE */}
      <section>
        <TimelineAndAnalytics auditLogs={auditLogs} />
      </section>

      {/* SECTION 9 - ORGANIZATION ANALYTICS */}
      <section>
        <OrganizationAnalytics analyticsData={analyticsData} />
      </section>

    </div>
  );
};

export default OrganizationInsights;
