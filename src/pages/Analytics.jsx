import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';
import { LOGIN_TREND_DATA, DEPT_DISTRIBUTION } from '../data/mockData';

const Analytics = () => {
  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Analytics</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Deep dive into organizational data and platform usage metrics.</p>
        </div>
        <div className="flex gap-4">
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Calendar size={16} />
            <span>Last 30 Days</span>
          </button>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="card" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}>
            <Download size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24}}>
        <div className="card" style={{padding: 24}}>
          <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: 24}}>Platform Usage (Active Sessions)</h3>
          <div style={{height: 350, width: '100%'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LOGIN_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)'}} />
                <RechartsTooltip contentStyle={{borderRadius: 12, border: 'none', boxShadow: 'var(--shadow-md)'}} cursor={{fill: 'rgba(79, 70, 229, 0.05)'}} />
                <Bar dataKey="users" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{padding: 24}}>
          <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: 24}}>Headcount by Department</h3>
          <div style={{height: 350, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={DEPT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEPT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{borderRadius: 12, border: 'none', boxShadow: 'var(--shadow-md)'}} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginTop: 16}}>
              {DEPT_DISTRIBUTION.slice(0, 4).map(dept => (
                <div key={dept.name} className="flex items-center gap-2">
                  <div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: dept.fill}}></div>
                  <span style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>{dept.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Lower section cards */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
        <div className="card" style={{padding: 24}}>
          <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: 16}}>Excel Import Accuracy</h3>
          <div className="flex items-end gap-2" style={{marginBottom: 8}}>
            <span style={{fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, color: 'var(--color-success)'}}>99.2%</span>
          </div>
          <p style={{color: 'var(--color-text-muted)', fontSize: '0.85rem'}}>Across last 45 synchronization events.</p>
        </div>
        
        <div className="card" style={{padding: 24}}>
          <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: 16}}>Average Hierarchy Depth</h3>
          <div className="flex items-end gap-2" style={{marginBottom: 8}}>
            <span style={{fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, color: 'var(--color-warning)'}}>7.4</span>
            <span style={{color: 'var(--color-text-muted)', fontWeight: 500, paddingBottom: 4}}>levels</span>
          </div>
          <p style={{color: 'var(--color-text-muted)', fontSize: '0.85rem'}}>Consider flattening to improve agility.</p>
        </div>
        
        <div className="card" style={{padding: 24}}>
          <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: 16}}>Platform API Requests</h3>
          <div className="flex items-end gap-2" style={{marginBottom: 8}}>
            <span style={{fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, color: 'var(--color-text-main)'}}>142k</span>
          </div>
          <p style={{color: 'var(--color-text-muted)', fontSize: '0.85rem'}}>+24% increase from last week.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
