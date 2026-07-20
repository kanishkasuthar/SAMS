import React from 'react';
import { Users, Clock, Eye, Target, TrendingDown, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const KPI_DATA = [
  { id: 1, title: 'Active Users', value: '4,892', trend: '+18.6%', isPositive: true, icon: Users, data: [40, 45, 55, 65, 50, 75, 90] },
  { id: 2, title: 'Active Sessions', value: '12,450', trend: '+24.1%', isPositive: true, icon: Activity, data: [30, 40, 35, 50, 45, 60, 80] },
  { id: 3, title: 'Avg Session', value: '4m 12s', trend: '+5.2%', isPositive: true, icon: Clock, data: [10, 12, 15, 14, 18, 20, 22] },
  { id: 4, title: 'Page Views', value: '842k', trend: '+12.4%', isPositive: true, icon: Eye, data: [100, 120, 110, 140, 150, 180, 210] },
  { id: 5, title: 'Goal Completion', value: '68.4%', trend: '-2.1%', isPositive: false, icon: Target, data: [80, 75, 78, 70, 72, 65, 68] },
  { id: 6, title: 'Bounce Rate', value: '24.1%', trend: '-4.5%', isPositive: true, icon: TrendingDown, data: [40, 35, 38, 30, 28, 25, 24] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const ExecutiveKPIDashboard = ({ onKpiClick }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', marginBottom: '24px' }}
    >
      {KPI_DATA.map((kpi) => {
        const Icon = kpi.icon;
        const chartData = kpi.data.map((val, i) => ({ name: i, value: val }));
        const color = kpi.isPositive ? 'var(--color-success)' : 'var(--color-danger)';
        const TrendIcon = kpi.isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <motion.div 
            key={kpi.id} 
            variants={itemVariants}
            className="hover-lift"
            onClick={() => onKpiClick && onKpiClick(kpi)}
            style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '16px', 
              border: '1px solid var(--color-border)', 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color="var(--color-primary)" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: color, backgroundColor: `${color}15`, padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                <TrendIcon size={12} />
                {kpi.trend}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600, marginTop: '4px' }}>{kpi.title}</div>
            </div>

            {/* Sparkline */}
            <div style={{ height: '40px', width: '100%', marginTop: 'auto', marginLeft: '-10px', marginBottom: '-10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={color} 
                    strokeWidth={2} 
                    dot={false} 
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ExecutiveKPIDashboard;
