import React from 'react';
import Card from '../common/Card';
import { Users, Building2, Briefcase, FileText, Download, Mail, Share2, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';

const ExecutiveSummary = () => {
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const handleAction = (action) => {
    addToast(`Executive Report ${action}.`, 'success');
  };

  const kpis = [
    { label: 'Employees Added', value: '+12', icon: Users, color: 'var(--color-success)' },
    { label: 'Departments Updated', value: '3', icon: Building2, color: 'var(--color-primary)' },
    { label: 'Authority Changes', value: '8', icon: CheckCircle2, color: 'var(--color-warning)' },
    { label: 'Hierarchy Changes', value: '5', icon: Briefcase, color: 'var(--color-info)' },
  ];

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Synchronization Complete</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>The organizational structure has been updated successfully.</p>
      </div>

      <Card style={{ padding: '32px', marginBottom: 24 }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={20} color="var(--color-primary)" /> Executive Sync Report
          </h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => handleAction('exported to PDF')} className="btn-secondary" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px' }}><Download size={14} /> Export PDF</button>
            <button onClick={() => handleAction('emailed to stakeholders')} className="btn-secondary" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px' }}><Mail size={14} /> Email</button>
            <button onClick={() => handleAction('shared link copied')} className="btn-secondary" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px' }}><Share2 size={14} /> Share</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {kpis.map((kpi, idx) => (
            <div key={idx} style={{ padding: '20px', backgroundColor: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)' }}>
              <div className="flex justify-between items-start" style={{ marginBottom: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{kpi.label}</span>
                <kpi.icon size={16} color={kpi.color} />
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-main)' }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Detected Risks</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ padding: '10px 12px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: 8, fontSize: '13px', color: 'var(--color-text-main)' }}>• Engineering Manager span of control exceeded 15.</li>
              <li style={{ padding: '10px 12px', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: 8, fontSize: '13px', color: 'var(--color-text-main)' }}>• 2 orphaned projects detected after department deletion.</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>AI Recommendations</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ padding: '10px 12px', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: 8, fontSize: '13px', color: 'var(--color-text-main)' }}>• Split Engineering department to reduce span of control.</li>
              <li style={{ padding: '10px 12px', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: 8, fontSize: '13px', color: 'var(--color-text-main)' }}>• Reassign orphaned projects to Product Head.</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <button className="btn-primary" onClick={() => navigate('/history')} style={{ padding: '12px 24px', fontSize: '14px', borderRadius: 8 }}>
          View Version History
        </button>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
