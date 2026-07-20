import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, 
  Treemap, ResponsiveContainer, AreaChart, Area, Legend
} from 'recharts';
import { LayoutGrid, Target, Network, Layers, BarChart2 } from 'lucide-react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const RADAR_DATA = [
  { subject: 'Agility', A: 120, B: 110, fullMark: 150 },
  { subject: 'Innovation', A: 98, B: 130, fullMark: 150 },
  { subject: 'Efficiency', A: 86, B: 130, fullMark: 150 },
  { subject: 'Delivery', A: 99, B: 100, fullMark: 150 },
  { subject: 'Stability', A: 85, B: 90, fullMark: 150 },
  { subject: 'Compliance', A: 65, B: 85, fullMark: 150 },
];

const SCATTER_DATA = [
  { name: 'Engineering', budget: 100, employees: 450, health: 75 },
  { name: 'Sales', budget: 120, employees: 320, health: 92 },
  { name: 'Marketing', budget: 50, employees: 120, health: 85 },
  { name: 'HR', budget: 30, employees: 45, health: 88 },
  { name: 'Operations', budget: 80, employees: 210, health: 85 },
  { name: 'Finance', budget: 60, employees: 60, health: 95 },
];

const TREEMAP_DATA = [
  { name: 'Engineering', size: 1200 },
  { name: 'Sales', size: 800 },
  { name: 'Operations', size: 500 },
  { name: 'Product', size: 400 },
  { name: 'Marketing', size: 300 },
  { name: 'Finance', size: 200 },
  { name: 'HR', size: 100 },
];

const AREA_DATA = [
  { name: 'Jan', current: 80, previous: 75 },
  { name: 'Feb', current: 82, previous: 78 },
  { name: 'Mar', current: 75, previous: 80 },
  { name: 'Apr', current: 88, previous: 75 },
  { name: 'May', current: 90, previous: 82 },
  { name: 'Jun', current: 95, previous: 85 },
];

const ChartWrapper = ({ title, icon: Icon, children }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '20px', display: 'flex', flexDirection: 'column', height: '350px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <Icon size={16} color="var(--color-primary)" />
      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>{title}</span>
    </div>
    <div style={{ flex: 1, width: '100%', position: 'relative' }}>
      {children}
    </div>
  </div>
);

const AdvancedInteractiveCharts = () => {
  const { setActiveItem, orgHealthScore } = useAnalytics();

  // Adjust area data based on digital twin simulation for demo effect
  const liveAreaData = AREA_DATA.map((d, i) => 
    i === AREA_DATA.length - 1 ? { ...d, current: orgHealthScore } : d
  );

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'var(--color-bg)', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
            <LayoutGrid size={20} color="var(--color-text-main)" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Advanced Interactive Charts</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Deep dive multidimensional visualizations.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', padding: '0 24px 24px 24px' }}>
        
        {/* Radar Chart */}
        <ChartWrapper title="Department Competencies" icon={Target}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar name="Engineering" dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.4} />
              <Radar name="Sales" dataKey="B" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.4} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-sm)' }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Bubble / Scatter Chart */}
        <ChartWrapper title="Budget vs Headcount vs Health" icon={Network}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="budget" type="number" name="Budget" unit="M" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="employees" type="number" name="Employees" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <ZAxis dataKey="health" type="number" range={[100, 1000]} name="Health Score" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-sm)' }} />
              <Scatter name="Departments" data={SCATTER_DATA} fill="var(--color-primary)" fillOpacity={0.6} onClick={(data) => setActiveItem({ type: 'department', data })} style={{ cursor: 'pointer' }} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Treemap */}
        <ChartWrapper title="Resource Allocation Map" icon={Layers}>
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={TREEMAP_DATA}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="white"
              fill="var(--color-primary)"
              fillOpacity={0.8}
              onClick={(data) => setActiveItem({ type: 'department', data })}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-sm)' }} />
            </Treemap>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Area Chart */}
        <ChartWrapper title="Live Organization Health Trend" icon={BarChart2}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={liveAreaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} dy={10} />
              <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-sm)' }} />
              <Area type="monotone" dataKey="current" name="Live Health" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" animationDuration={1000} />
              <Area type="monotone" dataKey="previous" name="Target Baseline" stroke="var(--color-text-muted)" strokeWidth={2} strokeDasharray="5 5" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

      </div>
    </div>
  );
};

export default AdvancedInteractiveCharts;
