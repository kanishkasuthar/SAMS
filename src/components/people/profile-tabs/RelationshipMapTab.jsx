import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Network, Cpu } from 'lucide-react';

const RelationshipMapTab = ({ employee }) => {
  if (!employee) return null;

  // Mock relationships
  const relationships = [
    { name: 'Sarah Jenkins', role: 'CEO', type: 'Executive Sponsor', connection: 'Strong', dept: 'Executive' },
    { name: 'Elena Rodriguez', role: 'VP of Product', type: 'Cross-functional Peer', connection: 'Moderate', dept: 'Product' },
    { name: 'Emma Watson', role: 'HR Director', type: 'HR Business Partner', connection: 'Strong', dept: 'HR' },
    { name: 'Alex Smith', role: 'Senior UI Developer', type: 'Key Collaborator', connection: 'Very Strong', dept: 'Engineering' }
  ];

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16, backgroundColor: 'rgba(79, 70, 229, 0.02)' }}>
        <Cpu size={24} color="var(--color-primary)" />
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>AI Relationship Analysis</h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-main)', marginTop: 4, margin: 0 }}>
            {employee.name} has a highly connected network with strong ties to Executive and Product teams. They frequently collaborate outside their immediate hierarchy, indicating high organizational influence and cross-functional leadership potential.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {relationships.map((rel, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="card" style={{ padding: 24, display: 'flex', gap: 20, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            
            {/* Animated Connection Line Effect */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 4, backgroundColor: rel.connection.includes('Strong') ? 'var(--color-success)' : 'var(--color-warning)' }}></div>
            
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              {rel.name.charAt(0)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)' }}>{rel.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 2 }}>{rel.role} • {rel.dept}</div>
              
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)' }}>
                  {rel.type}
                </span>
                <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: '11px', fontWeight: 600, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
                  {rel.connection} Tie
                </span>
              </div>
            </div>
            
            <Network size={24} color="var(--color-border)" style={{ opacity: 0.5 }} />

          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default RelationshipMapTab;
