import React from 'react';
import ReportsHeader from '../components/reports/ReportsHeader';
import ReportsKPIGrid from '../components/reports/ReportsKPIGrid';
import ReportsCategories from '../components/reports/ReportsCategories';
import ReportsActivityFeed from '../components/reports/ReportsActivityFeed';
import PremiumReportCard from '../components/reports/PremiumReportCard';
import ReportsTimeline from '../components/reports/ReportsTimeline';
import ReportsQuickAccess from '../components/reports/ReportsQuickAccess';
import { useReportStore } from '../store/reportStore';

const Reports = () => {
  const { reports, fetchReports } = useReportStore();

  React.useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="page-container">
      
      {/* 1. Header (Actions) */}
      <ReportsHeader />

      {/* 2. KPI Grid (4 Cards) */}
      <div className="page-content-scrollable" style={{ padding: '8px 0 24px 0', marginTop: 0 }}>
      <ReportsKPIGrid />

      {/* 3. Categories and Activity (Row 2) */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        <ReportsCategories />
        <ReportsActivityFeed />
      </div>

      {/* 4. Recent Reports (Premium Cards Grid) */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Recent Reports</h2>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>View All</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {reports.slice(0, 8).map(report => (
            <PremiumReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      {/* 5. Timeline (Bottom) */}
      <ReportsTimeline />

      {/* 6. Quick Access (Bottom 2) */}
      <ReportsQuickAccess />

      <div style={{ height: '60px' }} />
      </div>
    </div>
  );
};

export default Reports;
