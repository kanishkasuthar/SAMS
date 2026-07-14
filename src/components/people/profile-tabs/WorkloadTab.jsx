import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Activity, Clock, Briefcase, Calendar, CheckSquare, AlertCircle } from 'lucide-react';

const WorkloadTab = ({ employee }) => {
  if (!employee) return null;

  // Mock data for the Area Chart (Workload over 6 months)
  const historicalData = [
    { name: 'Jan', workload: 65, capacity: 100 },
    { name: 'Feb', workload: 72, capacity: 100 },
    { name: 'Mar', workload: 78, capacity: 100 },
    { name: 'Apr', workload: 85, capacity: 100 },
    { name: 'May', workload: employee.workload > 85 ? 95 : 80, capacity: 100 },
    { name: 'Jun', workload: employee.workload, capacity: 100 },
  ];

  // Mock data for the Bar Chart (Task Distribution)
  const distributionData = [
    { name: 'Projects', hours: Math.floor(employee.workload * 0.4) },
    { name: 'Meetings', hours: Math.floor(employee.workload * 0.3) },
    { name: 'Reviews', hours: Math.floor(employee.workload * 0.2) },
    { name: 'Admin', hours: Math.floor(employee.workload * 0.1) },
  ];

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Current Workload', value: `${employee.workload}%`, icon: Activity, color: employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-primary)' },
          { label: 'Weekly Hours', value: Math.floor((employee.workload / 100) * 50) + 'h', icon: Clock, color: 'var(--color-text-main)' },
          { label: 'Active Projects', value: employee.assignedProjects || 2, icon: Briefcase, color: 'var(--color-text-main)' },
          { label: 'Meetings (Week)', value: '14', icon: Calendar, color: 'var(--color-text-main)' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={i} className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <stat.icon size={24} color={stat.color} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>{stat.label.toUpperCase()}</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        
        {/* Main Workload Trend Chart */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 24 }}>6-Month Workload Trend</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-primary)'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-primary)'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-lg)' }}
                  itemStyle={{ fontSize: 13, fontWeight: 600 }}
                  labelStyle={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}
                />
                <Area type="monotone" dataKey="workload" stroke={employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-primary)'} strokeWidth={3} fillOpacity={1} fill="url(#colorWorkload)" />
                <Area type="monotone" dataKey="capacity" stroke="var(--color-text-muted)" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Distribution */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 24 }}>Distribution</h3>
          <div style={{ flex: 1, minHeight: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-main)', fontWeight: 600 }} width={80} />
                <Tooltip cursor={{ fill: 'var(--color-surface-hover)' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="hours" fill="var(--color-primary)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

      {/* AI Recommendation */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card" style={{ padding: 20, backgroundColor: employee.workload > 85 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(79, 70, 229, 0.05)', border: employee.workload > 85 ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(79, 70, 229, 0.2)', display: 'flex', gap: 16 }}>
        <AlertCircle size={24} color={employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-primary)'} style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: employee.workload > 85 ? 'var(--color-danger)' : 'var(--color-primary)', marginBottom: 8 }}>AI Capacity Analysis</div>
          <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-main)' }}>
            {employee.workload > 85 
              ? `${employee.name}'s workload exceeds the recommended threshold by ${employee.workload - 85}%. The current distribution shows heavy time spent on meetings and reviews. AI recommends assigning a junior associate to assist with project tasks to reduce overall hours below 50/week.`
              : `${employee.name} is operating at an optimal capacity. Time distribution is well-balanced across projects and admin tasks. They have approximately 15% bandwidth remaining for new strategic initiatives.`}
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default WorkloadTab;
