import React, { useState } from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, AlertCircle, CheckCircle, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import ViewInsightModal from '../components/ViewInsightModal';

const OrganizationInsights = () => {
  const { insights: ORG_INSIGHTS } = useOrgStore();
  const [selectedInsight, setSelectedInsight] = useState(null);

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Organization Insights</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Algorithmic recommendations and structural health checks.</p>
        </div>
        <div className="flex gap-4">
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-surface)'}}>
            <Sparkles size={16} color="var(--color-primary)" />
            <span style={{fontWeight: 600}}>Run Analysis</span>
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24}}>
        {ORG_INSIGHTS.map(insight => {
          let Icon = AlertCircle;
          let iconColor = 'var(--color-primary)';
          let iconBg = 'rgba(79, 70, 229, 0.1)';
          let headerColor = 'var(--color-text-main)';

          if (insight.severity === 'high') {
            Icon = AlertTriangle;
            iconColor = 'var(--color-danger)';
            iconBg = 'rgba(239, 68, 68, 0.1)';
            headerColor = 'var(--color-danger)';
          } else if (insight.severity === 'medium' || insight.severity === 'warning') {
            Icon = AlertCircle;
            iconColor = 'var(--color-warning)';
            iconBg = 'rgba(245, 158, 11, 0.1)';
            headerColor = 'var(--color-warning)';
          } else if (insight.severity === 'success') {
            Icon = CheckCircle;
            iconColor = 'var(--color-success)';
            iconBg = 'rgba(16, 185, 129, 0.1)';
            headerColor = 'var(--color-success)';
          }

          return (
            <div key={insight.id} className="card" style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
              <div className="flex items-start gap-16 justify-between">
                <div style={{
                  width: 48, 
                  height: 48, 
                  borderRadius: '12px', 
                  backgroundColor: iconBg, 
                  color: iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={24} />
                </div>
                <div style={{
                  fontSize: '2rem', 
                  fontWeight: 700, 
                  color: headerColor,
                  lineHeight: 1
                }}>
                  {insight.count}
                </div>
              </div>
              
              <div>
                <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: 8}}>{insight.title}</h3>
                <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5}}>
                  {insight.description}
                </p>
              </div>

              <div style={{marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--color-border)'}}>
                <button 
                  onClick={() => setSelectedInsight(insight)}
                  style={{color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', padding: 0}} 
                  className="hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
      <ViewInsightModal 
        isOpen={!!selectedInsight} 
        onClose={() => setSelectedInsight(null)} 
        insight={selectedInsight} 
      />
    </div>
  );
};

export default OrganizationInsights;
