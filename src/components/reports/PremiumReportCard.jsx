import React, { useState } from 'react';
import { FileText, MoreHorizontal, Download, Eye, Share2, Star, History, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';

const PremiumReportCard = ({ report }) => {
  const navigate = useNavigate();
  const { addToast } = useUIStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const coverColor = report.type === 'PDF' ? 'var(--color-danger)' : 
                     report.type === 'Excel' ? 'var(--color-success)' : 'var(--color-primary)';

  return (
    <div 
      className="card hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/reports/${report.id}`)}
      style={{ 
        padding: 0, overflow: 'hidden', backgroundColor: 'white', border: '1px solid var(--color-border)',
        display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative'
      }}
    >
      {/* Cover Color Strip */}
      <div style={{ height: '6px', backgroundColor: coverColor, width: '100%' }} />

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: '8px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: coverColor }}>
              <FileText size={20} />
            </div>
            <div>
               <div style={{ padding: '2px 8px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'inline-block', marginBottom: '4px' }}>
                 {report.status || 'FINALIZED'}
               </div>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isFavorite ? '#eab308' : 'var(--color-border)' }}>
            <Star size={18} fill={isFavorite ? '#eab308' : 'none'} />
          </button>
        </div>

        {/* Title & Info */}
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px', lineHeight: 1.3 }}>{report.name}</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Shield size={14} /> {report.department || 'Enterprise'}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><strong>Owner:</strong> {report.owner || 'AI Generator'}</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
           <div>
             <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Generated</div>
             <div style={{ fontSize: '12px', fontWeight: 600 }}>{report.date}</div>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: '6px', color: 'var(--color-primary)' }}>
             <Sparkles size={14} />
             <span style={{ fontSize: '12px', fontWeight: 700 }}>AI {report.aiScore || '98'}</span>
           </div>
        </div>

        {/* Action Overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)', padding: '16px', display: 'flex', justifyContent: 'space-around',
          alignItems: 'center', borderTop: '1px solid var(--color-border)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <button onClick={(e) => { e.stopPropagation(); navigate(`/reports/${report.id}`); }} className="icon-btn hover:text-primary" style={{ padding: '6px' }} title="Preview"><Eye size={18} /></button>
          <button onClick={(e) => { e.stopPropagation(); addToast(`Downloading ${report.name}...`, "success"); }} className="icon-btn hover:text-primary" style={{ padding: '6px' }} title="Download"><Download size={18} /></button>
          <button onClick={(e) => { e.stopPropagation(); addToast("Share dialog opened.", "info"); }} className="icon-btn hover:text-primary" style={{ padding: '6px' }} title="Share"><Share2 size={18} /></button>
          <button onClick={(e) => { e.stopPropagation(); addToast("Viewing version history...", "info"); }} className="icon-btn hover:text-primary" style={{ padding: '6px' }} title="Version History"><History size={18} /></button>
          <button onClick={(e) => { e.stopPropagation(); addToast("Menu opened.", "info"); }} className="icon-btn hover:text-primary" style={{ padding: '6px' }} title="More"><MoreHorizontal size={18} /></button>
        </div>

      </div>
    </div>
  );
};

export default PremiumReportCard;
