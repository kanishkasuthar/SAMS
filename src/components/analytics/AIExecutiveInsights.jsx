import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, FileText, Download, PlayCircle } from 'lucide-react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const AIExecutiveInsights = () => {
  const { setActiveItem } = useAnalytics();

  return (
    <div className="card" style={{ 
      padding: '32px', 
      background: 'linear-gradient(135deg, var(--color-primary) 0%, #4338ca 100%)', 
      borderRadius: '24px', 
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(79, 70, 229, 0.25)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Decorative background elements */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <Sparkles size={20} color="white" />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, letterSpacing: '-0.025em' }}>Today's Executive Summary</h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>AI-generated structural analysis based on 2.4M data points.</p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 2 }}>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', backgroundColor: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          <TrendingUp size={20} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.5 }}>
            Finance approval time reduced by 11% this week following the recent hierarchy flattening initiative.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', backgroundColor: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          <TrendingDown size={20} color="#f87171" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.5 }}>
            Engineering workload increased by 18%. Risk of manager burnout in the backend infrastructure team.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', backgroundColor: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          <AlertTriangle size={20} color="#fbbf24" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.5 }}>
            Product department is predicted to exceed optimal manager span-of-control capacity next month.
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '32px', position: 'relative', zIndex: 2, flexWrap: 'wrap' }}>
        <button className="hover-lift" style={{ flex: 1, padding: '12px 20px', borderRadius: '12px', border: 'none', backgroundColor: 'white', color: 'var(--color-primary)', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <FileText size={16} /> Generate AI Report
        </button>
        <button className="hover-lift" style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          <Download size={16} /> Brief
        </button>
        <button 
          onClick={() => setActiveItem({ type: 'insight', data: { title: 'Open Simulation' } })}
          className="hover-lift" 
          style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
        >
          <PlayCircle size={16} /> Open Simulation
        </button>
      </div>

    </div>
  );
};

export default AIExecutiveInsights;
