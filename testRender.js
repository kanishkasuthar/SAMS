import React from 'react';
import { renderToString } from 'react-dom/server';
import { AnalyticsProvider } from './src/contexts/AnalyticsContext.jsx';
import AdvancedInteractiveCharts from './src/components/analytics/AdvancedInteractiveCharts.jsx';

try {
  renderToString(
    <AnalyticsProvider>
      <AdvancedInteractiveCharts />
    </AnalyticsProvider>
  );
  console.log("RENDER SUCCESS");
} catch (e) {
  console.error("RENDER ERROR:", e);
}
