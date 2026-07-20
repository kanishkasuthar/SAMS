import React from 'react';
import { Briefcase, Users, DollarSign, ShieldAlert, BarChart3, Clock } from 'lucide-react';

const CATEGORIES = [
  { name: 'Executive Reports', count: 142, icon: Briefcase, color: 'var(--color-primary)' },
  { name: 'Financial', count: 86, icon: DollarSign, color: 'var(--color-success)' },
  { name: 'HR & People', count: 214, icon: Users, color: 'var(--color-warning)' },
  { name: 'Risk & Compliance', count: 32, icon: ShieldAlert, color: 'var(--color-danger)' },
  { name: 'Analytics', count: 56, icon: BarChart3, color: '#0ea5e9' }
];

const ReportsCategories = () => {
  return (
    <div className="card" style={{ padding: '24px', flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 20px 0', color: 'var(--color-text-main)' }}>Report Categories</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {CATEGORIES.map((cat, idx) => (
          <div key={idx} className="hover-lift" style={{ 
            padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)', cursor: 'pointer', transition: 'all 0.2s ease',
            display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '10px', color: cat.color, boxShadow: 'var(--shadow-sm)' }}>
                <cat.icon size={22} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>{cat.count}</span>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>{cat.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> Last generated 2h ago
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsCategories;
