import React, { useState } from 'react';
import { 
  X, User, Briefcase, Network, Clock, Calendar, FileText, Activity, 
  MapPin, Phone, ShieldCheck, Mail, History, Cpu, CheckCircle2, ChevronRight, AlertCircle, Laptop,
  Target, Award, BookOpen, Star, File, Zap, Users
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';
import MoveEmployeeModal from './MoveEmployeeModal';
import EmailComposerModal from '../common/EmailComposerModal';
import CallSimulationModal from '../common/CallSimulationModal';
import LocationMapModal from '../common/LocationMapModal';

// Import New Tab Components
import OverviewTab from '../people/profile-tabs/OverviewTab';
import WorkloadTab from '../people/profile-tabs/WorkloadTab';
import SkillsTab from '../people/profile-tabs/SkillsTab';
import SessionTab from '../people/profile-tabs/SessionTab';
import CareerPredictionTab from '../people/profile-tabs/CareerPredictionTab';
import SuccessTab from '../people/profile-tabs/SuccessTab';
import RelationshipMapTab from '../people/profile-tabs/RelationshipMapTab';
import HistoryTab from '../people/profile-tabs/HistoryTab';

const EmployeeProfile = ({ isOpen, onClose, employee }) => {
  const navigate = useNavigate();
  const { addToast } = useUIStore();
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Modals state
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  if (!isOpen || !employee) return null;

  const tabs = [
    { id: 'Overview', icon: User },
    { id: 'Hierarchy', icon: Network },
    { id: 'Projects', icon: Briefcase },
    { id: 'Skills', icon: Target },
    { id: 'Workload', icon: Activity },
    { id: 'Sessions', icon: Laptop },
    { id: 'Attendance', icon: Calendar },
    { id: 'Performance', icon: Star },
    { id: 'Activity Timeline', icon: Clock },
    { id: 'Promotion History', icon: Award },
    { id: 'Audit Logs', icon: ShieldCheck },
    { id: 'Documents', icon: FileText },
    { id: 'Training', icon: BookOpen },
    { id: 'AI Insights', icon: Cpu },
    { id: 'Career Prediction', icon: Zap },
    { id: 'Successor Planning', icon: Users },
    { id: 'Relationship Map', icon: Network }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Overview': return <OverviewTab employee={employee} />;
      case 'Workload': return <WorkloadTab employee={employee} />;
      case 'Skills': return <SkillsTab employee={employee} />;
      case 'Sessions': return <SessionTab employee={employee} />;
      case 'Career Prediction': return <CareerPredictionTab employee={employee} />;
      case 'Successor Planning': return <SuccessTab employee={employee} />;
      case 'Relationship Map': return <RelationshipMapTab employee={employee} />;
      case 'Promotion History':
      case 'Activity Timeline': return <HistoryTab employee={employee} />;

      // Tabs re-using existing logic or simple layouts
      case 'Hierarchy':
        return (
          <div style={{ padding: 32, animation: 'fadeIn 0.3s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 16 }}>Reporting Hierarchy</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderLeft: '2px solid var(--color-border)' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SJ</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>Sarah Jenkins</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>CEO</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderLeft: '2px solid var(--color-primary)', marginLeft: 24 }}>
                    <img src={employee.photo || 'https://api.dicebear.com/7.x/notionists/svg?seed=user'} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{employee.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{employee.role}</div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/org-studio')}
                  className="btn-secondary" 
                  style={{ width: '100%', marginTop: 24, padding: '10px', fontSize: '13px', fontWeight: 600 }}
                >
                  Open in Organization Studio
                </button>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 16 }}>Direct Reports ({employee.directReports || 0})</h3>
                {employee.directReports > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[...Array(Math.min(employee.directReports, 5))].map((_, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>DR</div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600 }}>Direct Report {i+1}</div>
                          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{employee.department}</div>
                        </div>
                      </div>
                    ))}
                    {employee.directReports > 5 && (
                      <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600, marginTop: 8, cursor: 'pointer' }}>View All {employee.directReports} Reports</div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>No direct reports.</div>
                )}
              </div>
            </div>
          </div>
        );

      case 'Projects':
        return (
          <div style={{ padding: 32, animation: 'fadeIn 0.3s' }}>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>Assigned Projects</h3>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Assign New</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'Enterprise Cloud Migration', role: 'Lead Architect', progress: 75, deadline: 'Q3 2026', health: 'On Track' },
                  { name: 'Security Audit Q2', role: 'Reviewer', progress: 95, deadline: 'Next Week', health: 'At Risk' },
                  { name: 'AI Integration Platform', role: 'Contributor', progress: 30, deadline: 'Q4 2026', health: 'On Track' }
                ].slice(0, employee.assignedProjects || 3).map((proj, idx) => (
                  <div key={idx} style={{ padding: 20, border: '1px solid var(--color-border)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)' }}>{proj.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Role: {proj.role}</div>
                      <div style={{ marginTop: 12, display: 'inline-block', padding: '4px 10px', borderRadius: 12, fontSize: '11px', fontWeight: 700, backgroundColor: proj.health === 'On Track' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: proj.health === 'On Track' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                        {proj.health}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', width: 200 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>Progress</span>
                        <span style={{ fontSize: '12px', fontWeight: 700 }}>{proj.progress}%</span>
                      </div>
                      <div style={{ height: 6, backgroundColor: 'var(--color-surface-hover)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
                        <div style={{ width: `${proj.progress}%`, height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Due: {proj.deadline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Attendance':
        return (
          <div style={{ padding: 32, animation: 'fadeIn 0.3s' }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 24 }}>Attendance Summary (YTD)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>98%</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 4 }}>Present Rate</div>
                </div>
                <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-warning)' }}>4</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 4 }}>Sick Days</div>
                </div>
                <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-success)' }}>12</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 4 }}>Vacation Days</div>
                </div>
                <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)' }}>8</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 4 }}>Remaining PTO</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Audit Logs':
        return (
          <div style={{ padding: 32, animation: 'fadeIn 0.3s' }}>
            <div className="card" style={{ padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Action</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Date</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { action: 'Updated Project Status', date: 'Today, 09:41 AM', ip: '192.168.1.45' },
                    { action: 'Logged In', date: 'Today, 08:00 AM', ip: '192.168.1.45' },
                    { action: 'Downloaded Report PDF', date: 'Yesterday, 04:22 PM', ip: '192.168.1.45' },
                    { action: 'Changed Password', date: 'Oct 12, 2026', ip: '172.16.0.4' }
                  ].map((log, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 500 }}>{log.action}</td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>{log.date}</td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Documents':
        return (
          <div style={{ padding: 32, animation: 'fadeIn 0.3s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { name: 'Employment Contract.pdf', size: '2.4 MB', date: 'Aug 2021' },
                { name: 'Performance Review Q1.pdf', size: '1.1 MB', date: 'Apr 2026' },
                { name: 'NDA_Signed.pdf', size: '0.4 MB', date: 'Aug 2021' },
                { name: 'AWS Certification.png', size: '3.2 MB', date: 'Nov 2025' }
              ].map((doc, i) => (
                <div key={i} className="card hover:bg-slate-50" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <File size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>{doc.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 4 }}>{doc.size} • Uploaded {doc.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'AI Insights':
        return (
          <div style={{ padding: 32, animation: 'fadeIn 0.3s' }}>
            <div className="card" style={{ padding: 24, border: '1px solid rgba(79, 70, 229, 0.2)', backgroundColor: 'rgba(79, 70, 229, 0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Cpu size={24} color="var(--color-primary)" />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)' }}>AI Behavioral & Performance Analysis</h3>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-main)', marginBottom: 24 }}>
                Based on communication patterns, project completion rates, and peer feedback over the last 6 months, {employee.name} shows high leadership potential. They are currently managing a heavy workload ({employee.workload}%), which poses a slight burnout risk.
              </p>
              
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 12 }}>RECOMMENDATIONS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ padding: 16, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', display: 'flex', gap: 12 }}>
                  <AlertCircle size={18} color="var(--color-warning)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Reduce Workload</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Consider reassigning 1 project to a junior associate to prevent burnout.</div>
                  </div>
                </div>
                <div style={{ padding: 16, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', display: 'flex', gap: 12 }}>
                  <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Leadership Training</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Enroll in the Q4 Executive Leadership program to prepare for Director track.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Performance':
      case 'Training':
      case 'Certifications':
        return (
          <div style={{ padding: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Star size={32} color="var(--color-border)" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>{activeTab} Data Loaded</h3>
              <p style={{ fontSize: '14px' }}>This section is synced and up to date.</p>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 transition-opacity"
        style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{ 
          width: '950px', maxWidth: '100vw', backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-2xl)', animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          borderLeft: '1px solid var(--color-border)'
        }}
      >
        {/* Header Section */}
        <div style={{ padding: '32px 40px', borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 100%)', opacity: 0.1 }}></div>
          
          <button onClick={onClose} style={{ position: 'absolute', top: 24, right: 24, padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', border: 'none', cursor: 'pointer', zIndex: 10 }}>
            <X size={20} color="var(--color-text-secondary)" />
          </button>

          <div style={{ display: 'flex', gap: 24, position: 'relative', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              {employee.photo ? (
                <img src={employee.photo} alt={employee.name} style={{ width: 100, height: 100, borderRadius: 16, objectFit: 'cover', boxShadow: 'var(--shadow-md)' }} />
              ) : (
                <div style={{ width: 100, height: 100, borderRadius: 16, backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 700, color: 'white', boxShadow: 'var(--shadow-md)' }}>
                  {employee.name.charAt(0)}
                </div>
              )}
              <div style={{ position: 'absolute', bottom: -6, right: -6, width: 24, height: 24, borderRadius: '50%', backgroundColor: employee.status === 'Online' ? 'var(--color-success)' : 'var(--color-border)', border: '4px solid var(--color-surface)' }} title={employee.status}></div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>{employee.name}</h2>
                <span style={{ padding: '4px 10px', backgroundColor: 'var(--color-surface-hover)', borderRadius: 12, fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{employee.id}</span>
              </div>
              <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Briefcase size={16} /> {employee.role}
              </div>
              
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={() => setShowEmailModal(true)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="hover:bg-slate-50">
                  <Mail size={16} color="var(--color-text-muted)" /> Message
                </button>
                <button onClick={() => setShowCallModal(true)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="hover:bg-slate-50">
                  <Phone size={16} color="var(--color-text-muted)" /> Call
                </button>
                <button onClick={() => setShowLocationModal(true)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="hover:bg-slate-50">
                  <MapPin size={16} color="var(--color-text-muted)" /> Location
                </button>
                <button onClick={() => setShowMoveModal(true)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  Move Dept
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Vertical Scrollable Tabs Menu */}
          <div style={{ width: '240px', backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', overflowY: 'auto', padding: '16px 0' }}>
            <div style={{ padding: '0 16px', marginBottom: 8, fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)' }}>EMPLOYEE 360° TABS</div>
            {tabs.map((tab, i) => (
              <React.Fragment key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    border: 'none',
                    background: activeTab === tab.id ? 'rgba(79, 70, 229, 0.05)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: '13px',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    borderRight: activeTab === tab.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                    textAlign: 'left',
                    transition: 'all 0.1s'
                  }}
                  className="hover:bg-slate-50"
                >
                  <tab.icon size={16} color={activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                  {tab.id}
                </button>
                {/* Visual Separators between major categories */}
                {(i === 0 || i === 4 || i === 9 || i === 12) && (
                  <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '8px 16px' }}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
            {renderTabContent()}
          </div>
        </div>
      </div>

      <MoveEmployeeModal 
        isOpen={showMoveModal}
        onClose={() => setShowMoveModal(false)}
      />
      <EmailComposerModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        employeeName={employee.name}
      />
      <CallSimulationModal 
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        employeeName={employee.name}
        photo={employee.photo}
      />
      <LocationMapModal 
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />
    </>
  );
};

export default EmployeeProfile;
