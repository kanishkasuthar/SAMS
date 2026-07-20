import React from 'react';
import GlobalAICommandBar from '../components/command-center/GlobalAICommandBar';
import LiveOrgScore from '../components/command-center/LiveOrgScore';
import ExecutiveKPIGrid from '../components/command-center/ExecutiveKPIGrid';
import OrganizationRiskRadar from '../components/command-center/OrganizationRiskRadar';
import CommandCenterCopilot from '../components/command-center/CommandCenterCopilot';
import ActionCenter from '../components/command-center/ActionCenter';

// Reused components
import LiveOrganizationMap from '../components/analytics/LiveOrganizationMap';
import DigitalTwinSimulator from '../components/analytics/DigitalTwinSimulator';
import AIExecutiveInsights from '../components/analytics/AIExecutiveInsights';
import PredictiveForecasts from '../components/analytics/PredictiveForecasts';
import SmartTimeline from '../components/analytics/SmartTimeline';
import { AnalyticsProvider } from '../contexts/AnalyticsContext';

const CommandCenterContent = () => {
  return (
    <div className="page-container" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Global AI Command Bar (TOP) */}
      <div style={{ marginBottom: '32px' }}>
        <GlobalAICommandBar />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', flex: 1, paddingBottom: '40px' }}>
        
        {/* LEFT COLUMN (3/12) */}
        <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <LiveOrgScore />
          <div style={{ height: '450px' }}>
            <LiveOrganizationMap />
          </div>
        </div>

        {/* CENTER COLUMN (5/12) */}
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ExecutiveKPIGrid />
          <PredictiveForecasts />
          <AIExecutiveInsights />
        </div>

        {/* RIGHT COLUMN (4/12) */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <CommandCenterCopilot />
          <OrganizationRiskRadar />
          <div style={{ flex: 1, minHeight: '300px' }}>
            <SmartTimeline />
          </div>
        </div>

        {/* BOTTOM FULL-WIDTH STRIP */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', marginTop: '16px' }}>
          <div style={{ gridColumn: 'span 8' }}>
            <ActionCenter />
          </div>
          <div style={{ gridColumn: 'span 4' }}>
            <DigitalTwinSimulator />
          </div>
        </div>

      </div>
    </div>
  );
};

const CommandCenter = () => {
  return (
    <AnalyticsProvider>
      <CommandCenterContent />
    </AnalyticsProvider>
  );
};

export default CommandCenter;
