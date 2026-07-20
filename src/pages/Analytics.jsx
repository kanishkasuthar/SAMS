import React from 'react';
import { AnalyticsProvider } from '../contexts/AnalyticsContext';

// Components
import ExecutiveCommandHero from '../components/analytics/ExecutiveCommandHero';
import LiveOrganizationMap from '../components/analytics/LiveOrganizationMap';
import DigitalTwinSimulator from '../components/analytics/DigitalTwinSimulator';
import AIExecutiveInsights from '../components/analytics/AIExecutiveInsights';
import PredictiveForecasts from '../components/analytics/PredictiveForecasts';
import AdvancedInteractiveCharts from '../components/analytics/AdvancedInteractiveCharts';
import AIRecommendationEngine from '../components/analytics/AIRecommendationEngine';
import ExecutiveScoreboard from '../components/analytics/ExecutiveScoreboard';
import SmartTimeline from '../components/analytics/SmartTimeline';
import LiveAIAlerts from '../components/analytics/LiveAIAlerts';

// Drawers & Modals
import MasterAnalyticsDrawer from '../components/analytics/drawers/MasterAnalyticsDrawer';
import CommandPalette from '../components/analytics/drawers/CommandPalette';
import AnalyticsFilterToolbar from '../components/analytics/AnalyticsFilterToolbar';

const AnalyticsContent = () => {
  return (
    <div className="page-container">
      
      {/* Page Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--color-text-main)', margin: '0 0 8px 0' }}>AI Executive Intelligence Command Center</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '15px' }}>Live Digital Twin & Predictive Analytics Platform</p>
        </div>
        <div>
          <kbd style={{ padding: '4px 8px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', boxShadow: 'var(--shadow-sm)' }}>Ctrl+K for Command Palette</kbd>
        </div>
      </div>

      <AnalyticsFilterToolbar />

      <div className="page-content-scrollable" style={{ padding: '8px 0 24px 0', marginTop: 0 }}>
        {/* Row 1: Executive Hero */}
        <ExecutiveCommandHero />

      {/* Grid Layout for Command Center */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', marginBottom: '24px' }}>
        
        {/* Row 2: Digital Twin and Map */}
        <div style={{ gridColumn: 'span 4' }}>
          <DigitalTwinSimulator />
        </div>
        <div style={{ gridColumn: 'span 8', minHeight: '500px' }}>
          <LiveOrganizationMap />
        </div>

        {/* Row 3: Insights & Forecasts */}
        <div style={{ gridColumn: 'span 4' }}>
          <AIExecutiveInsights />
        </div>
        <div style={{ gridColumn: 'span 8' }}>
          <PredictiveForecasts />
        </div>

        {/* Row 4: Advanced Charts (Full Width internally spans 2 cols) */}
        <div style={{ gridColumn: 'span 12' }}>
          <AdvancedInteractiveCharts />
        </div>

        {/* Row 5: Intelligence & Alerting */}
        <div style={{ gridColumn: 'span 5' }}>
          <AIRecommendationEngine />
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <ExecutiveScoreboard />
        </div>
        <div style={{ gridColumn: 'span 3' }}>
          <LiveAIAlerts />
        </div>

        {/* Row 6: Timeline */}
        <div style={{ gridColumn: 'span 12', height: '400px' }}>
          <SmartTimeline />
        </div>

      </div>

      <div style={{ height: '60px' }} />
      </div>

      {/* Overlays */}
      <MasterAnalyticsDrawer />
      <CommandPalette />

    </div>
  );
};

// Wrap the page in the Context Provider
const Analytics = () => (
  <AnalyticsProvider>
    <AnalyticsContent />
  </AnalyticsProvider>
);

export default Analytics;
