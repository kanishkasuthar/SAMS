import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Zap, Award, Target, BookOpen, Star } from 'lucide-react';

const SkillsTab = ({ employee }) => {
  if (!employee) return null;

  // Default radar if employee doesn't have it
  const radarDataRaw = employee.skillsRadar || { technical: 75, leadership: 60, communication: 80, management: 50, innovation: 70, problemSolving: 85 };
  
  const radarData = [
    { subject: 'Technical', A: radarDataRaw.technical, fullMark: 100 },
    { subject: 'Leadership', A: radarDataRaw.leadership, fullMark: 100 },
    { subject: 'Communication', A: radarDataRaw.communication, fullMark: 100 },
    { subject: 'Management', A: radarDataRaw.management, fullMark: 100 },
    { subject: 'Innovation', A: radarDataRaw.innovation, fullMark: 100 },
    { subject: 'Problem Solving', A: radarDataRaw.problemSolving, fullMark: 100 },
  ];

  const topSkills = [
    { name: 'Strategic Planning', type: 'Leadership' },
    { name: 'Agile Methodologies', type: 'Management' },
    { name: 'Cloud Architecture', type: 'Technical' },
    { name: 'Cross-functional Comms', type: 'Communication' },
    { name: 'System Design', type: 'Technical' },
    { name: 'Budget Forecasting', type: 'Management' }
  ];

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        {/* Radar Chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={18} color="var(--color-primary)" /> Skill Distribution
          </h3>
          <div style={{ flex: 1, minHeight: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-main)', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-lg)' }}
                  itemStyle={{ color: 'var(--color-primary)', fontWeight: 600 }}
                />
                <Radar name={employee.name} dataKey="A" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skills List & Tags */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={18} color="var(--color-warning)" /> Verified Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {topSkills.map((skill, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + (i * 0.05) }}
                  style={{ 
                    padding: '8px 16px', borderRadius: 20, fontSize: '13px', fontWeight: 600,
                    backgroundColor: skill.type === 'Technical' ? 'rgba(59, 130, 246, 0.1)' : 
                                     skill.type === 'Leadership' ? 'rgba(139, 92, 246, 0.1)' : 
                                     skill.type === 'Management' ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-surface-hover)',
                    color: skill.type === 'Technical' ? 'rgb(59, 130, 246)' : 
                           skill.type === 'Leadership' ? 'rgb(139, 92, 246)' : 
                           skill.type === 'Management' ? 'rgb(16, 185, 129)' : 'var(--color-text-main)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                  className="hover:shadow-sm"
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="card" style={{ padding: 24, flex: 1 }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={18} color="var(--color-success)" /> Certifications & Training
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { name: 'AWS Certified Solutions Architect', date: 'Oct 2025', status: 'Active' },
                { name: 'Executive Leadership Program', date: 'Mar 2024', status: 'Completed' },
                { name: 'Agile Scrum Master (CSM)', date: 'Jan 2022', status: 'Active' }
              ].map((cert, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={20} color="var(--color-text-secondary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{cert.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: 4 }}>Acquired: {cert.date}</div>
                  </div>
                  <div style={{ padding: '4px 10px', borderRadius: 12, fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}>
                    {cert.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default SkillsTab;
