import React from 'react';
import { Server, Activity, Database, Clock, HardDrive, AlertOctagon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { motion } from 'framer-motion';

const METRICS = [
  { id: 1, title: 'API Response Time', value: '124ms', status: 'Healthy', trend: '-12ms', type: 'success', icon: Activity, data: [150, 140, 135, 145, 130, 128, 124] },
  { id: 2, title: 'Database Health', value: '99.8%', status: 'Optimal', trend: '+0.1%', type: 'success', icon: Database, data: [99.5, 99.6, 99.5, 99.7, 99.7, 99.8, 99.8] },
  { id: 3, title: 'System Uptime', value: '99.99%', status: 'Stable', trend: '0.00%', type: 'success', icon: Clock, data: [99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99] },
  { id: 4, title: 'Error Rate', value: '0.12%', status: 'Warning', trend: '+0.04%', type: 'warning', icon: AlertOctagon, data: [0.05, 0.06, 0.05, 0.08, 0.09, 0.11, 0.12] },
  { id: 5, title: 'Storage Usage', value: '42.8 TB', status: 'Healthy', trend: '+1.2 TB', type: 'info', icon: HardDrive, data: [40.1, 40.5, 41.0, 41.2, 41.8, 42.1, 42.8] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const getColor = (type) => {
  if (type === 'success') return 'var(--color-success)';
  if (type === 'warning') return 'var(--color-warning)';
  if (type === 'danger') return 'var(--color-danger)';
  return 'var(--color-primary)';
};

const InfrastructureMonitoring = ({ onMetricClick }) => {
  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
            <Server size={20} color="var(--color-text-main)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Infrastructure Monitoring</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Real-time system health and performance.</p>
          </div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', padding: '16px' }}
      >
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          const chartData = metric.data.map((val, i) => ({ name: i, value: val }));
          const color = getColor(metric.type);

          return (
            <motion.div 
              key={metric.id}
              variants={itemVariants}
              className="hover-lift"
              onClick={() => onMetricClick && onMetricClick(metric)}
              style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
                  <Icon size={14} />
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>{metric.title}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)' }}>{metric.value}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: color }}>{metric.trend}</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{metric.status}</span>
              </div>

              <div style={{ height: '32px', width: '100%', marginTop: '8px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <YAxis domain={['dataMin', 'dataMax']} hide />
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
    </div>
  );
};

export default InfrastructureMonitoring;
