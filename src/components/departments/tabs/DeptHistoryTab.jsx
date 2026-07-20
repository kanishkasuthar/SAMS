import React, { useState } from 'react';
import { History, PlayCircle, GitBranch, Users, Search, Download, Filter } from 'lucide-react';
import DepartmentChangeDetailsModal from '../modals/DepartmentChangeDetailsModal';
import OrganizationTimeMachineModal from '../modals/OrganizationTimeMachineModal';
import CompareBeforeAfterModal from '../modals/CompareBeforeAfterModal';

const DeptHistoryTab = ({ department }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showChangeDetails, setShowChangeDetails] = useState(false);
  const [showTimeMachine, setShowTimeMachine] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const events = [
    { id: 'EV-001', year: '2026', date: '15 July 2026', title: `${department.name} Reorganization`, type: 'STRUCTURE CHANGE', desc: 'Major realignment of reporting structures.', icon: GitBranch, author: 'Kanishka Suthar', version: 'v24', affected: 42, reportingChanges: 18, prevHead: 'Michael Scott', newHead: department.head },
    { id: 'EV-002', year: '2025', date: '04 March 2025', title: '42 Employees Added', type: 'WORKFORCE GROWTH', desc: 'Significant expansion following Q1 funding.', icon: Users, author: 'System', version: 'v18', affected: 42, reportingChanges: 0 },
    { id: 'EV-003', year: '2022', date: '12 Nov 2022', title: `${department.head} Appointed`, type: 'LEADERSHIP CHANGE', desc: `New Department Head took over leadership.`, icon: Users, author: 'Admin', version: 'v09', affected: 1, reportingChanges: 6 },
    { id: 'EV-004', year: '2020', date: '22 Jan 2020', title: 'Platform Team Added', type: 'STRUCTURE CHANGE', desc: 'New sub-department created.', icon: GitBranch, author: 'Admin', version: 'v04', affected: 14, reportingChanges: 2 },
    { id: 'EV-005', year: '2019', date: '01 Jan 2019', title: 'Department Created', type: 'ORIGIN', desc: `Initial formation of the ${department.name} department.`, icon: History, author: 'System', version: 'v01', affected: 0, reportingChanges: 0 },
  ];

  const handleEventClick = (ev) => {
    setSelectedEvent(ev);
    setShowChangeDetails(true);
  };

  const handleTimeMachine = (ev) => {
    setSelectedEvent(ev);
    setShowTimeMachine(true);
  };

  const handleCompare = (ev) => {
    setSelectedEvent(ev);
    setShowCompare(true);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header and Filters */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 className="label-with-icon" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              <History size={24} style={{ color: 'var(--color-primary)' }} /> <span>Department Evolution</span>
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Track structural, leadership and workforce changes across {department.name}.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
              <Search size={16} style={{ color: 'var(--color-text-muted)', marginRight: '8px' }} />
              <input type="text" placeholder="Search History..." style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', width: '192px', color: 'var(--color-text-main)' }} />
            </div>
            <button style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 700, backgroundColor: 'white', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Download size={16} /> Export History
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '24px', flexWrap: 'wrap' }}>
          <div className="label-with-icon" style={{ marginRight: '16px', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            <Filter size={16} /> <span>Filters</span>
          </div>
          {['ALL EVENTS', 'STRUCTURE', 'LEADERSHIP', 'EMPLOYEES', 'PROJECTS', 'EXCEL SYNC', 'SYSTEM'].map(f => (
            <button key={f} style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: f === 'ALL EVENTS' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: f === 'ALL EVENTS' ? 'var(--color-primary)' : 'white',
              color: f === 'ALL EVENTS' ? 'white' : 'var(--color-text-secondary)',
              cursor: 'pointer'
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ width: '100%', paddingLeft: '16px', marginTop: '16px' }}>
        {events.map((ev, idx) => {
          const Icon = ev.icon;
          return (
            <div key={idx} style={{ display: 'flex', gap: '32px', position: 'relative', paddingBottom: '48px', width: '100%' }}>
              {/* Vertical Line */}
              {idx < events.length - 1 && (
                <div style={{ position: 'absolute', left: '78px', top: '40px', bottom: 0, width: '2px', backgroundColor: 'var(--color-border)' }}></div>
              )}
              
              {/* Left Column: Year & Icon */}
              <div style={{ width: '96px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingTop: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '8px' }}>{ev.year}</div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: 'var(--shadow-sm)' }}>
                  <Icon size={18} />
                </div>
              </div>
              
              {/* Right Column: Full Width Card */}
              <div style={{ flex: 1, backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'all 0.2s', width: '100%' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', transition: 'color 0.2s' }} onClick={() => handleEventClick(ev)}>{ev.title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{ev.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, padding: '6px 12px', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', borderRadius: '4px', border: '1px solid var(--color-border)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {ev.type}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', marginBottom: '24px', borderTop: '1px solid var(--color-surface-hover)', borderBottom: '1px solid var(--color-surface-hover)', padding: '16px 0' }}>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Changed By</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{ev.author}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Date</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{ev.date}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Version</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>{ev.version}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Impact</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{ev.affected} Emp / {ev.reportingChanges} Reps</div>
                  </div>
                </div>
                
                {ev.prevHead && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: 'var(--color-surface-hover)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>PREVIOUS HEAD</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{ev.prevHead}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ color: 'var(--color-text-muted)' }}>→</div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>NEW HEAD</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#4338CA' }}>{ev.newHead}</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button onClick={() => handleEventClick(ev)} style={{ padding: '10px 20px', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
                    VIEW CHANGE DETAILS
                  </button>
                  <button onClick={() => handleTimeMachine(ev)} style={{ padding: '10px 20px', backgroundColor: 'white', color: 'var(--color-text-main)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <History size={16}/> VIEW DEPARTMENT AT THIS TIME
                  </button>
                  <button onClick={() => handleCompare(ev)} style={{ padding: '10px 20px', backgroundColor: 'white', color: 'var(--color-text-main)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--color-border)' }}>
                    COMPARE BEFORE / AFTER
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <DepartmentChangeDetailsModal isOpen={showChangeDetails} onClose={() => setShowChangeDetails(false)} event={selectedEvent} department={department} onTimeMachine={handleTimeMachine} />
      <OrganizationTimeMachineModal isOpen={showTimeMachine} onClose={() => setShowTimeMachine(false)} event={selectedEvent} department={department} />
      <CompareBeforeAfterModal isOpen={showCompare} onClose={() => setShowCompare(false)} event={selectedEvent} department={department} />
    </div>
  );
};

export default DeptHistoryTab;
