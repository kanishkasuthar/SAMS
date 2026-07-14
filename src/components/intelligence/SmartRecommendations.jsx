import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnalysisDrawer from './AnalysisDrawer';
import ConfirmationModal from './ConfirmationModal';

const SmartRecommendations = ({ recommendations }) => {
  const navigate = useNavigate();
  const [activeIssue, setActiveIssue] = useState(null);
  const [modalType, setModalType] = useState(null); // 'drawer' or 'modal'

  if (!recommendations) return null;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'var(--color-danger)';
      case 'Medium': return 'var(--color-warning)';
      default: return 'var(--color-success)';
    }
  };

  return (
    <div className="card" style={{ 
      padding: '24px', 
      backgroundColor: '#FFFFFF', 
      borderRadius: '16px', 
      border: '1px solid var(--color-border)',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <Sparkles size={20} color="var(--color-primary)" /> Smart Recommendations
        </h3>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
          {recommendations.length} Suggestions
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        {recommendations.slice(0, 4).map(rec => (
          <div key={rec.id} style={{ 
            display: 'flex', flexDirection: 'column', gap: 12,
            padding: '16px', backgroundColor: '#F8FAFC', 
            borderRadius: '12px', border: '1px solid var(--color-border)',
            borderLeft: `4px solid ${getPriorityColor(rec.priority)}`,
            transition: 'all 0.2s'
          }} className="hover:shadow-md">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: getPriorityColor(rec.priority), marginBottom: 4, letterSpacing: '0.05em' }}>
                  {rec.priority.toUpperCase()} PRIORITY
                </div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '15px', lineHeight: 1.4 }}>
                  {rec.action}
                </div>
              </div>
            </div>
            
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              This action targets {rec.target} and will impact 12 employees currently misaligned.
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button 
                className="btn-primary" 
                style={{ padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, backgroundColor: 'white', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }}
                onClick={() => { setActiveIssue(rec); setModalType('drawer'); }}
              >
                Review Issue
              </button>
              <button 
                className="btn-primary" 
                style={{ padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600 }}
                onClick={() => { setActiveIssue(rec); setModalType('modal'); }}
              >
                Apply Fix
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <AnalysisDrawer 
        isOpen={modalType === 'drawer'} 
        onClose={() => { setModalType(null); setActiveIssue(null); }} 
        issue={activeIssue} 
      />
      <ConfirmationModal 
        isOpen={modalType === 'modal'} 
        onClose={() => { setModalType(null); setActiveIssue(null); }} 
        issue={activeIssue} 
      />
    </div>
  );
};

export default SmartRecommendations;
