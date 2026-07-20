import React from 'react';
import Card from '../common/Card';
import { Sparkles, Users, UserPlus, GitMerge, FileCheck } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const AIRecommendations = () => {
  const { addToast } = useUIStore();

  const handleApply = (action) => {
    addToast(`${action} applied successfully.`, 'success');
  };

  const recommendations = [
    {
      id: 1,
      title: 'Merge Duplicate Records',
      description: 'Found 12 employees with identical names but different IDs. Merge them to preserve history.',
      impact: 'High',
      confidence: '98%',
      saved: '45 mins',
      icon: GitMerge,
      color: 'var(--color-primary)'
    },
    {
      id: 2,
      title: 'Create Missing HR Manager',
      description: 'The HR department currently has no assigned manager. Create a placeholder role.',
      impact: 'Medium',
      confidence: '94%',
      saved: '15 mins',
      icon: UserPlus,
      color: 'var(--color-success)'
    },
    {
      id: 3,
      title: 'Fix Orphan Employees',
      description: 'Reassign 4 employees whose manager ID does not exist to their department head.',
      impact: 'High',
      confidence: '100%',
      saved: '30 mins',
      icon: Users,
      color: 'var(--color-warning)'
    }
  ];

  return (
    <div style={{ marginTop: '24px' }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
        <Sparkles size={18} color="var(--color-primary)" />
        <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>AI Smart Recommendations</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {recommendations.map(rec => (
          <Card key={rec.id} style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-between items-start" style={{ marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${rec.color}15`, color: rec.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <rec.icon size={20} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Confidence</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: rec.color }}>{rec.confidence}</div>
              </div>
            </div>
            
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>{rec.title}</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 20, flex: 1 }}>{rec.description}</p>
            
            <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 16 }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>TIME SAVED</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>~{rec.saved}</div>
              </div>
              <button 
                onClick={() => handleApply(rec.title)}
                style={{ 
                  padding: '6px 16px', backgroundColor: rec.color, color: 'white', 
                  border: 'none', borderRadius: 6, fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6
                }}
                className="hover-lift"
              >
                <FileCheck size={14} /> Apply
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
