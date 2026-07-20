import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Zap, CheckCircle, Shield, Radio, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const generateSparkline = (base, trendUp) => {
  let val = base;
  return Array.from({ length: 7 }, () => {
    val = trendUp ? val + Math.random() * 5 : val - Math.random() * 5;
    return { value: val };
  });
};

const AnimatedCounter = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (start === end) return;
    
    let totalMiliseconds = 1000;
    let incrementTime = (totalMiliseconds / end) * 2;
    
    let timer = setInterval(() => {
      start += (end / 20); // Smooth jumps
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(start);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toFixed(Number.isInteger(Number(value)) ? 0 : 1)}{suffix}</span>;
};

const ExecutiveCommandHero = () => {
  const { orgHealthScore, authorityStability, setActiveItem } = useAnalytics();

  const KPIS = [
    { id: 'health', title: 'Organization Health', value: orgHealthScore, suffix: '%', trend: '+2.4%', isPositive: true, conf: 98, icon: Activity, data: generateSparkline(80, true) },
    { id: 'conf', title: 'AI Confidence', value: 94.2, suffix: '%', trend: '+1.1%', isPositive: true, conf: 99, icon: Target, data: generateSparkline(90, true) },
    { id: 'eff', title: 'Organization Efficiency', value: 88.5, suffix: '%', trend: '-0.5%', isPositive: false, conf: 92, icon: Zap, data: generateSparkline(89, false) },
    { id: 'acc', title: 'Decision Accuracy', value: 96.8, suffix: '%', trend: '+3.2%', isPositive: true, conf: 95, icon: CheckCircle, data: generateSparkline(93, true) },
    { id: 'auth', title: 'Authority Stability', value: authorityStability, suffix: '%', trend: '0.0%', isPositive: true, conf: 97, icon: Shield, data: generateSparkline(authorityStability, true) },
    { id: 'live', title: 'Live Status', value: 'Active', suffix: '', trend: 'Optimal', isPositive: true, conf: 100, icon: Radio, data: generateSparkline(100, true), noAnim: true }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '32px' }}
    >
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        const color = kpi.isPositive ? 'var(--color-success)' : 'var(--color-danger)';
        const primary = 'var(--color-primary)';

        return (
          <motion.div 
            key={kpi.id} 
            variants={itemVariants}
            className="hover-lift"
            onClick={() => setActiveItem({ type: 'kpi', data: kpi })}
            style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '16px', 
              border: '1px solid var(--color-border)', 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {/* Glossy Top Accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${primary} 0%, transparent 100%)`, opacity: 0.5 }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={primary} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: color, fontSize: '11px', fontWeight: 800 }}>
                {kpi.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.trend}
              </div>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              {kpi.title}
            </div>
            
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-main)', display: 'flex', alignItems: 'baseline', gap: '4px', lineHeight: 1 }}>
              {kpi.noAnim ? kpi.value : <AnimatedCounter value={kpi.value} suffix={kpi.suffix} />}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                vs Prev Month <br/>
                <span style={{ color: primary, fontWeight: 700 }}>{kpi.conf}% AI Conf.</span>
              </div>
              <div style={{ height: '30px', width: '60px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpi.data}>
                    <Line type="monotone" dataKey="value" stroke={primary} strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ExecutiveCommandHero;
