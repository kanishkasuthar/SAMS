import React, { useState } from 'react';
import { 
  X, Briefcase, Calendar, Users, Layers, Activity, Search, Filter, Edit2, LayoutGrid, List, 
  MoreVertical, Network, TrendingUp, ShieldAlert, CheckCircle, Clock, AlertTriangle, FileText, 
  Download, History, Server, Eye, Trash2, ArrowRight
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';

const PremiumProjectCard = ({ project, onOpenDetails, onAction }) => {
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const healthColor = project.health === 'Healthy' || project.health === 'On Track' ? 'var(--color-success)' :
                      project.health === 'Needs Attention' || project.health === 'At Risk' ? 'var(--color-warning)' :
                      'var(--color-danger)';
  const healthBg = project.health === 'Healthy' || project.health === 'On Track' ? 'rgba(16,185,129,0.1)' :
                   project.health === 'Needs Attention' || project.health === 'At Risk' ? 'rgba(245,158,11,0.1)' :
                   'rgba(239,68,68,0.1)';

  const handleMenuClick = (e, action) => {
    e.stopPropagation();
    setShowMenu(false);
    onAction(action, project);
  };

  const handleManagerClick = (e) => {
    e.stopPropagation();
    addToast('Opening Employee 360 Drawer...', 'info');
  };

  const progress = project.progress || Math.floor(Math.random() * 40) + 40;
  const tasksTotal = project.tasksTotal || 120;
  const tasksDone = Math.floor(tasksTotal * (progress / 100));

  return (
    <div 
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(project)}
      style={{
        padding: '24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px -10px rgba(0,0,0,0.1), 0 0 0 1px var(--color-primary)' : 'var(--shadow-md)',
        overflow: 'hidden'
      }}
    >
      {/* Top Glow based on AI Health */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${healthColor}, transparent)`,
        opacity: isHovered ? 1 : 0.5,
        transition: 'opacity 0.3s'
      }}></div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>{project.name}</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>ID: PRJ-{project.id || Math.floor(Math.random() * 9000)+1000}</span>
            <span style={{ backgroundColor: healthBg, color: healthColor, padding: '2px 8px', borderRadius: 12, fontSize: '11px', fontWeight: 700 }}>
              {project.status || 'Active'}
            </span>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-btn" 
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            style={{ padding: 6, borderRadius: 6, backgroundColor: isHovered ? 'var(--color-surface-hover)' : 'transparent', color: 'var(--color-text-secondary)', border: 'none', cursor: 'pointer' }}
          >
            <MoreVertical size={18} />
          </button>
          {showMenu && (
            <div style={{ position: 'absolute', top: '100%', right: 0, width: 180, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', zIndex: 10, padding: 8 }}>
              <div className="dropdown-item" onClick={(e) => handleMenuClick(e, 'Edit')} style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}><Edit2 size={14}/> Edit Project</div>
              <div className="dropdown-item" onClick={(e) => handleMenuClick(e, 'Assign')} style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}><Users size={14}/> Assign Members</div>
              <div className="dropdown-item" onClick={(e) => handleMenuClick(e, 'Hierarchy')} style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}><Network size={14}/> Open Hierarchy</div>
              <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '4px 0' }}></div>
              <div className="dropdown-item" onClick={(e) => handleMenuClick(e, 'Delete')} style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-danger)' }}><Trash2 size={14}/> Delete</div>
            </div>
          )}
        </div>
      </div>

      {/* People & Teams */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'var(--color-surface-alt)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
        <div onClick={handleManagerClick} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <img src={`https://ui-avatars.com/api/?name=${project.manager}&background=random`} alt={project.manager} style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--color-surface)' }} />
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>MANAGER</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)' }}>{project.manager}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>TEAM ({project.teamMembers?.length || 18})</div>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', border: '2px solid var(--color-surface)', marginLeft: -8, zIndex: 0 }}>
              +14
            </div>
            {[1,2,3,4].map(i => (
              <img key={i} src={`https://i.pravatar.cc/150?u=${project.id}${i}`} alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--color-surface)', marginLeft: -8, zIndex: i }} />
            ))}
          </div>
        </div>
      </div>

      {/* Departments & Hierarchy Preview */}
      <div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {['Engineering', 'Security', 'Cloud'].map(dept => (
             <span key={dept} style={{ padding: '4px 10px', borderRadius: 12, fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(79,70,229,0.05)', color: 'var(--color-primary)', border: '1px solid rgba(79,70,229,0.1)' }}>{dept}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', color: 'var(--color-text-secondary)', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); navigate('/studio'); }}>
          <Network size={14} color="var(--color-primary)" />
          <span>CEO &rarr; Eng Director &rarr; Manager &rarr; Leads</span>
        </div>
      </div>

      {/* Progress & Budget */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>PROGRESS</span>
            <span>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: 3, transition: 'width 1s ease-out' }}></div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{tasksDone} of {tasksTotal} Tasks Completed</div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>BUDGET</span>
            <span>$75k / $100k</span>
          </div>
          <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}>
            <div style={{ width: `75%`, height: '100%', backgroundColor: 'var(--color-warning)', borderRadius: 3 }}></div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>25% Remaining</div>
        </div>
      </div>

      {/* AI Recommendation Box */}
      <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.03)', border: '1px solid rgba(79, 70, 229, 0.15)', borderRadius: 8, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)', boxShadow: '0 0 8px var(--color-primary)', animation: 'pulse 2s infinite' }}></div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>AI RECOMMENDATION</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--color-text-main)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
          Engineering workload is high. Move 2 engineers from Cloud Migration to Project Titan to improve completion by 11%.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); addToast('Previewing Impact...', 'info'); }} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600, flex: 1 }}>Preview</button>
          <button className="btn-primary" onClick={(e) => { e.stopPropagation(); addToast('Applying AI Recommendation...', 'success'); }} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600, flex: 1 }}>Apply</button>
        </div>
      </div>

      {/* Footer Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="icon-btn" title="Hierarchy" onClick={(e) => { e.stopPropagation(); onAction('Hierarchy', project); }} style={{ padding: 6, color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}><Network size={16}/></button>
          <button className="icon-btn" title="Analytics" onClick={(e) => { e.stopPropagation(); onAction('Analytics', project); }} style={{ padding: 6, color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}><TrendingUp size={16}/></button>
          <button className="icon-btn" title="Audit Logs" onClick={(e) => { e.stopPropagation(); onAction('Audit', project); }} style={{ padding: 6, color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}><History size={16}/></button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px', fontWeight: 600, color: 'var(--color-success)' }}>
          <CheckCircle size={14} /> Excel Synced
        </div>
      </div>
    </div>
  );
};

export default PremiumProjectCard;
