import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Printer, Settings, Share2, History, GitCompare, Sparkles, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { AIReportCopilot } from '../components/copilot/AIReportCopilot';
import { useCopilotStore } from '../store/copilotStore';
import { useReportStore } from '../store/reportStore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUIStore } from '../store/uiStore';

const CHART_DATA = [
  { name: 'Jan', budget: 120, actual: 110 },
  { name: 'Feb', budget: 135, actual: 140 },
  { name: 'Mar', budget: 185, actual: 195 },
  { name: 'Apr', budget: 220, actual: 250 }
];

const ReportViewer = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { isOpen, openCopilotForReport, toggleCopilot } = useCopilotStore();
  const { reports, fetchReports } = useReportStore();
  const { addToast } = useUIStore();
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (reports.length === 0) {
      fetchReports();
    } else {
      const found = reports.find(r => r.id.toString() === reportId.toString()) || reports[0];
      setReport(found);
      if (found) openCopilotForReport(reportId);
    }
  }, [reportId, reports, fetchReports, openCopilotForReport]);

  if (!report) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading Workspace...</div>;
  }

  return (
    <div style={{
      display: 'flex', height: '100%', minHeight: 'calc(100vh - 72px)', backgroundColor: 'var(--color-bg)', overflow: 'hidden'
    }}>
      
      {/* Left Area (Premium Workspace) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        
        {/* Workspace Toolbar */}
        <div style={{
          padding: '16px 32px', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => navigate('/reports')} className="icon-btn hover:bg-slate-100" style={{ padding: '8px', borderRadius: '8px' }}>
              <ArrowLeft size={20} color="var(--color-text-muted)" />
            </button>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>{report.name}</h1>
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                <span>ID: {report.id}</span>
                <span>Generated: {report.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)' }}><Sparkles size={12} /> AI Score: 98</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => addToast("Compare mode activated.", "info")} className="icon-btn hover:bg-slate-100" style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', gap: '6px', color: 'var(--color-text-main)' }}><GitCompare size={16} /> Compare</button>
            <button onClick={() => addToast("Version history loaded.", "info")} className="icon-btn hover:bg-slate-100" style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', gap: '6px', color: 'var(--color-text-main)' }}><History size={16} /> History</button>
            <button onClick={() => addToast("Share dialog opened.", "info")} className="icon-btn hover:bg-slate-100" style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', gap: '6px', color: 'var(--color-text-main)' }}><Share2 size={16} /> Share</button>
            <button onClick={() => addToast(`Exporting ${report.name}...`, "success")} className="icon-btn hover:bg-slate-100" style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', gap: '6px', color: 'var(--color-text-main)' }}><Download size={16} /> Export</button>
            
            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)', margin: '0 8px' }} />
            
            <button 
              onClick={toggleCopilot}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                backgroundColor: isOpen ? 'var(--color-bg)' : 'var(--color-primary)',
                color: isOpen ? 'var(--color-primary)' : 'white',
                border: isOpen ? '1px solid var(--color-primary)' : 'none',
                borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontSize: '13px'
              }}
            >
              <Sparkles size={16} /> {isOpen ? 'Hide AI Panel' : 'Ask AI'}
            </button>
          </div>
        </div>

        {/* Report Document Area */}
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: '900px', backgroundColor: 'white',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)', borderRadius: '16px',
            border: '1px solid var(--color-border)', padding: '60px 80px'
          }}>
            
            <div style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '32px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Executive Intelligence Report</div>
                <h2 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 12px 0', color: 'var(--color-text-main)', letterSpacing: '-0.025em' }}>{report.name}</h2>
                <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)' }}>Prepared for the Executive Board</div>
              </div>
              <div style={{ textAlign: 'right', color: 'var(--color-text-muted)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <strong style={{ color: 'var(--color-text-main)' }}>SAMS Enterprise</strong>
                <div>Confidential Data</div>
                <div>{report.date}</div>
              </div>
            </div>

            {/* AI Summary Block */}
            <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 12px 0' }}>
                <Sparkles size={18} /> AI Executive Summary
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--color-text-main)', lineHeight: 1.6, margin: 0 }}>
                This quarter shows a strong trajectory in overall operational efficiency, up 12% from Q2. However, unexpected structural friction in the Engineering division has led to an 18% cost overrun. We predict a stabilization in Q4 provided the recommended restructuring actions are implemented immediately.
              </p>
            </div>

            {/* Key Findings */}
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 20px 0' }}>Key Findings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              <div style={{ padding: '20px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)', fontWeight: 700, marginBottom: '8px' }}>
                  <AlertTriangle size={18} /> Engineering Cost Overrun
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>Contractor expenditure exceeded Q3 budgets by $120k due to the unbudgeted cloud migration sprint.</p>
              </div>
              <div style={{ padding: '20px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)', fontWeight: 700, marginBottom: '8px' }}>
                  <TrendingUp size={18} /> Operations Efficiency
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>Automated approval workflows have reduced decision friction, saving an estimated 420 manager hours.</p>
              </div>
            </div>

            {/* Interactive Charts */}
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 20px 0' }}>Budget vs Actuals (Q1-Q4)</h3>
            <div style={{ height: '350px', marginBottom: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 13 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 13 }} />
                  <Tooltip cursor={{ fill: 'var(--color-bg)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-sm)' }} />
                  <Bar dataKey="budget" name="Budget" fill="var(--color-bg)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Actual" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recommendations */}
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 20px 0' }}>Strategic Recommendations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: "Review contractor allocation across all Tier 1 projects.", impact: "High" },
                { title: "Consolidate cloud infrastructure vendors by end of Q4.", impact: "High" },
                { title: "Implement new manager span-of-control limits (Target: 12).", impact: "Medium" }
              ].map((rec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>{i + 1}</div>
                  <div style={{ flex: 1, fontSize: '14px', fontWeight: 500, color: 'var(--color-text-main)' }}>{rec.title}</div>
                  <div style={{ padding: '4px 12px', backgroundColor: 'white', borderRadius: '12px', fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>{rec.impact} Impact</div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* Right Area (AI Copilot) */}
      <AIReportCopilot />

    </div>
  );
};

export default ReportViewer;
