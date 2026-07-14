import React, { useState } from 'react';
import { 
  X, Briefcase, Network, Clock, Shield, Calendar, Edit3, Save, FileText, Settings, Key, ShieldCheck, 
  Users, MoreVertical, MapPin, Mail, Phone, TrendingUp, Laptop, Globe, FileOutput, CheckCircle, File, Download, Search, AlertCircle, LayoutGrid, LayoutList, History, Upload
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const ProjectDetailsDrawer = ({ isOpen, onClose, project }) => {
  const { addToast } = useUIStore();
  const [activeTab, setActiveTab] = useState('Overview');
  const [showQuickActions, setShowQuickActions] = useState(false);

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'Overview', icon: Briefcase },
    { id: 'Team', icon: Users },
    { id: 'Hierarchy', icon: Network },
    { id: 'Tasks', icon: LayoutGrid },
    { id: 'Files', icon: FileText },
    { id: 'Timeline', icon: Clock },
    { id: 'Analytics', icon: TrendingUp },
    { id: 'Audit Logs', icon: ShieldCheck },
    { id: 'Version History', icon: History },
    { id: 'AI Insights', icon: AlertCircle },
    { id: 'Excel Sync', icon: FileOutput }
  ];

  const handleAction = (action) => {
    setShowQuickActions(false);
    addToast(`Action '${action}' triggered for ${project.name}`, 'info');
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Overview':
        return (
          <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32, animation: 'fadeIn 0.3s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 16 }}>Project Description</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Strategic cross-functional initiative aiming to unify departmental data silos into a single cloud-based repository. Ensures compliance and accelerates enterprise reporting.
                </p>
                <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>START DATE</div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>Jan 15, 2026</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>DUE DATE</div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>Dec 31, 2026</div>
                  </div>
                </div>
              </div>
              <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)' }}><CheckCircle size={16} /> Status</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{project.status || 'Active'}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)' }}><TrendingUp size={16} /> Budget Used</div>
                  <div style={{ fontWeight: 600 }}>$75,000 / $100,000</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)' }}><AlertCircle size={16} /> AI Health</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-success)' }}>94% (Healthy)</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Tasks':
        return (
          <div style={{ padding: 32, animation: 'fadeIn 0.3s', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Kanban Board</h3>
              <button className="btn-primary" style={{ padding: '6px 16px', fontSize: '13px' }}>+ New Task</button>
            </div>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', flex: 1, paddingBottom: 16 }}>
              {['To Do', 'In Progress', 'Testing', 'Completed'].map(col => (
                <div key={col} style={{ width: 280, minWidth: 280, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-muted)' }}>{col.toUpperCase()}</div>
                  {[1,2].map(i => (
                    <div key={i} style={{ padding: 16, backgroundColor: '#FFF', borderRadius: 8, border: '1px solid var(--color-border)', cursor: 'grab', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: 8 }}>Task Description {i}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', padding: '2px 8px', backgroundColor: 'var(--color-surface-hover)', borderRadius: 12 }}>ENG-00{i}</span>
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="" style={{ width: 20, height: 20, borderRadius: '50%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'Hierarchy':
        return (
          <div style={{ padding: 32, animation: 'fadeIn 0.3s' }}>
            <div className="card" style={{ padding: 32, textAlign: 'center', backgroundColor: '#F8FAFC' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 16 }}>EXECUTIVE SPONSOR</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 24px', backgroundColor: '#FFF', borderRadius: 8, border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '12px' }}>CEO</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Michael Scott</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Chief Executive Officer</div>
                </div>
              </div>
              
              <div style={{ width: 2, height: 40, backgroundColor: 'var(--color-border)', margin: '0 auto' }}></div>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 24px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 8, border: '1px solid var(--color-primary)' }}>
                <img src={`https://ui-avatars.com/api/?name=${project.manager}&background=random`} alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{project.manager}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>Project Manager</div>
                </div>
              </div>

              <div style={{ width: 2, height: 40, backgroundColor: 'var(--color-border)', margin: '0 auto' }}></div>
              
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 16 }}>PROJECT TEAM (DRAG TO REASSIGN)</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ padding: '12px 16px', backgroundColor: '#FFF', borderRadius: 8, border: '1px solid var(--color-border)', cursor: 'grab' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Team Lead {i}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Engineering</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Team':
      case 'Files':
      case 'Timeline':
      case 'Analytics':
      case 'Audit Logs':
      case 'Version History':
      case 'AI Insights':
      case 'Excel Sync':
        return (
          <div style={{ padding: 64, textAlign: 'center', color: 'var(--color-text-muted)', animation: 'fadeIn 0.3s' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <LayoutGrid size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 8 }}>{activeTab} Module</h3>
            <p style={{ fontSize: '14px', maxWidth: 400, margin: '0 auto' }}>
              Detailed {activeTab.toLowerCase()} data for {project.name} is securely synced and actively monitored by the SAMS engine.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '45vw',
        minWidth: '700px',
        maxWidth: '1000px',
        backgroundColor: 'var(--color-bg)',
        boxShadow: 'var(--shadow-2xl)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid var(--color-border)'
      }}>
        {/* Header Section */}
        <div style={{ padding: '32px 32px 0 32px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Briefcase size={32} />
              </div>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>{project.name}</h2>
                <div style={{ display: 'flex', gap: 16, fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 12, backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--color-success)' }}>{project.status || 'Active'}</span>
                  <span>ID: PRJ-{project.id || '9912'}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={14} /> 18 Members</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
              <button className="btn-secondary" onClick={() => handleAction('Sync Excel')} style={{ padding: '8px 16px', borderRadius: 6, fontSize: '13px', fontWeight: 600 }}>
                <FileOutput size={16} style={{ marginRight: 6 }} /> Sync Excel
              </button>
              <button 
                className="btn-primary" 
                onClick={() => setShowQuickActions(!showQuickActions)} 
                style={{ padding: '8px', borderRadius: 6, display: 'flex', alignItems: 'center' }}
              >
                <MoreVertical size={16} />
              </button>
              
              {showQuickActions && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 220, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', zIndex: 10000, overflow: 'hidden' }}>
                  <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>PROJECT ACTIONS</div>
                  <div className="dropdown-item" onClick={() => handleAction('Edit Project')} style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', gap: 8 }}><Edit3 size={16} /> Edit Project</div>
                  <div className="dropdown-item" onClick={() => handleAction('Assign Team')} style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', gap: 8 }}><Users size={16} /> Assign Team</div>
                  <div className="dropdown-item" onClick={() => handleAction('Open Studio')} style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', gap: 8 }}><Network size={16} /> Open in Studio</div>
                  <div style={{ height: 1, backgroundColor: 'var(--color-border)' }}></div>
                  <div className="dropdown-item" onClick={() => handleAction('Archive')} style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', gap: 8, color: 'var(--color-warning)' }}><Server size={16} /> Archive</div>
                </div>
              )}
              
              <button onClick={onClose} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', overflowX: 'auto', gap: 8 }} className="hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 20px',
                  border: 'none',
                  background: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  borderBottom: activeTab === tab.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                <tab.icon size={14} /> {tab.id}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsDrawer;
