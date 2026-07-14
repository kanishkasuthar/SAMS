import React, { useState, useRef } from 'react';
import { X, Mail, Phone, MapPin, Edit2, Check, UserPlus, Clock } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { CUTE_AVATARS } from '../utils/avatarGenerator';
import './EmployeeProfilePanel.css';

const TABS = ['Profile', 'History', 'Projects', 'Activity', 'More'];

const EmployeeProfilePanel = ({ selectedNode, onClose }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const { updateEmployee, employeeHistory } = useOrgStore();
  const [editForm, setEditForm] = useState({});
  const fileInputRef = useRef(null);

  React.useEffect(() => {
    if (selectedNode && selectedNode.data) {
      const data = selectedNode.data;
      setEditForm({
        name: data.name,
        designation: data.designation,
        department: data.department || 'Operations Department',
        email: data.email || (data.name ? `${data.name.toLowerCase().replace(' ', '.')}@company.com` : ''),
        phone: data.phone || '+1 (555) 234-7890',
        address: data.address || 'New York, USA',
        empId: data.empId || 'EMP-1002',
        experience: data.experience || '12 Years',
        joinDate: data.joinDate || '12 Jan 2018',
        biography: data.biography || 'Oversees daily operations across all departments and ensures organizational efficiency and scalability.',
        skills: data.skills ? (Array.isArray(data.skills) ? data.skills.join(', ') : data.skills) : 'Leadership, Strategic Planning, Operations, Team Management, Process Improvement',
        status: data.status || 'Online',
        photo: data.photo || null
      });
      setIsEditing(false);
      setShowAvatarMenu(false);
      setActiveTab('Profile');
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (!selectedNode) return;
    updateEmployee(selectedNode.id, {
      ...editForm,
      skills: typeof editForm.skills === 'string' ? editForm.skills.split(',').map(s => s.trim()).filter(Boolean) : editForm.skills
    });
    setIsEditing(false);
    setShowAvatarMenu(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, photo: reader.result });
        setShowAvatarMenu(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!selectedNode) return null;
  const data = selectedNode.data;
  
  // Filter history for this employee
  const myHistory = employeeHistory.filter(h => h.employeeId === selectedNode.id);

  // Render for Vacant Nodes
  if (data.isVacant) {
    return (
      <div className="right-panel open">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 600 }}>Vacant Position</div>
          <button className="panel-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="panel-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 48 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#F1F5F9', border: '2px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
            <UserPlus size={32} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{data.designation}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Needs Assignment</div>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: 12, borderRadius: 8 }}>Assign Employee</button>
        </div>
      </div>
    );
  }

  const renderInput = (field, label, isTextArea = false) => {
    if (isEditing) {
      if (isTextArea) {
        return <textarea className="input-field" rows={3} value={editForm[field]} onChange={e => setEditForm({...editForm, [field]: e.target.value})} style={{ width: '100%', resize: 'none', marginBottom: 8 }} />;
      }
      return <input className="input-field" value={editForm[field]} onChange={e => setEditForm({...editForm, [field]: e.target.value})} style={{ width: '100%', marginBottom: 8 }} />;
    }
    return null;
  };

  const currentPhoto = isEditing ? editForm.photo : data.photo;

  return (
    <div className="right-panel open">
      
      {/* Top Header */}
      <div style={{ padding: '32px 32px 0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 12 }}>
          {isEditing ? (
            <button className="btn-primary" onClick={handleSave} style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 20 }}>
              <Check size={14} /> Save
            </button>
          ) : (
            <button className="btn-secondary" onClick={() => setIsEditing(true)} style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 20, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <Edit2 size={14} /> Edit
            </button>
          )}
          <button className="panel-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          
          <div style={{ position: 'relative' }}>
            {currentPhoto ? (
              <img src={currentPhoto} alt={data.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backgroundColor: 'var(--color-surface-alt)' }} />
            ) : (
              <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                {(editForm.name || data.name || '?').charAt(0)}
              </div>
            )}
            
            {isEditing && (
              <button 
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                style={{ position: 'absolute', bottom: 0, right: -4, width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                title="Change Photo"
              >
                <Edit2 size={14} color="var(--color-primary)" />
              </button>
            )}

            {showAvatarMenu && isEditing && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: 12, boxShadow: 'var(--shadow-lg)', zIndex: 50, width: 200 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)' }}>Select Cute Icon</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                  {CUTE_AVATARS.map((url, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setEditForm({ ...editForm, photo: url }); setShowAvatarMenu(false); }}
                      style={{ width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', border: editForm.photo === url ? '2px solid var(--color-primary)' : '2px solid transparent', backgroundColor: 'var(--color-surface-alt)' }}
                    >
                      <img src={url} alt={`Avatar ${i}`} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                    </div>
                  ))}
                </div>
                <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '8px 0' }}></div>
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 6, cursor: 'pointer' }}
                >
                  Upload Picture
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />
              </div>
            )}
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              {isEditing ? (
                <input className="input-field" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{ fontSize: '1.2rem', fontWeight: 700, padding: '4px 8px', width: '100%' }} />
              ) : (
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>{editForm.name || data.name}</h2>
              )}
              {!isEditing && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-success)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></div>
                  {editForm.status || data.status || 'Online'}
                </div>
              )}
            </div>
            
            {isEditing ? (
              <input className="input-field" value={editForm.designation || ''} onChange={e => setEditForm({...editForm, designation: e.target.value})} style={{ marginBottom: 4, width: '100%' }} />
            ) : (
              <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>{editForm.designation || data.designation}</div>
            )}

            {isEditing ? (
              <input className="input-field" value={editForm.department || ''} onChange={e => setEditForm({...editForm, department: e.target.value})} style={{ width: '100%' }} />
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{editForm.department || data.department || 'Operations Department'}</div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 24, padding: '24px 32px 0 32px', borderBottom: '1px solid var(--color-border)', overflowX: 'auto' }} className="hide-scrollbar">
        {TABS.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 12px 0',
              fontSize: '0.9rem', fontWeight: activeTab === tab ? 600 : 500,
              color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="panel-content" style={{overflowY: 'auto', flex: 1, padding: 32}}>
        {activeTab === 'Profile' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {/* About */}
            <section>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>About</h3>
              {isEditing ? (
                renderInput('biography', 'About', true)
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{editForm.biography || data.biography || 'Oversees daily operations across all departments and ensures organizational efficiency and scalability.'}</p>
              )}
            </section>

            {/* Contact Information */}
            <section>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Mail size={16} color="var(--color-text-muted)" />
                  {isEditing ? renderInput('email', 'Email') : <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>{editForm.email || data.email || 'email@company.com'}</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Phone size={16} color="var(--color-text-muted)" />
                  {isEditing ? renderInput('phone', 'Phone') : <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{editForm.phone || data.phone || '+1 (555) 234-7890'}</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <MapPin size={16} color="var(--color-text-muted)" />
                  {isEditing ? renderInput('address', 'Location') : <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{editForm.address || data.address || 'New York, USA'}</span>}
                </div>
              </div>
            </section>

            {/* Key Information */}
            <section>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Key Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>Employee ID</div>
                  {isEditing ? renderInput('empId', 'Employee ID') : <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{editForm.empId || data.empId || 'EMP-1002'}</div>}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>Experience</div>
                  {isEditing ? renderInput('experience', 'Experience') : <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{editForm.experience || data.experience || '12 Years'}</div>}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>Department</div>
                  {isEditing ? renderInput('department', 'Department') : <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{editForm.department || data.department || 'Operations'}</div>}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>Join Date</div>
                  {isEditing ? renderInput('joinDate', 'Join Date') : <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{editForm.joinDate || data.joinDate || '12 Jan 2018'}</div>}
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Skills</h3>
              {isEditing ? (
                renderInput('skills', 'Skills (comma separated)', true)
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {((typeof editForm.skills === 'string' ? editForm.skills.split(',') : editForm.skills) || ['Leadership', 'Strategic Planning']).map((skill, i) => skill && skill.trim() && (
                    <span key={i} style={{ padding: '6px 12px', backgroundColor: 'rgba(79, 70, 229, 0.05)', color: 'var(--color-primary)', border: '1px solid rgba(79, 70, 229, 0.1)', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'History' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>Placement History</h3>
            
            {myHistory.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface)', border: '1px dashed var(--color-border)', borderRadius: 8 }}>
                No structural changes recorded for this employee yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', paddingLeft: 12 }}>
                <div style={{ position: 'absolute', left: 16, top: 12, bottom: 0, width: 2, backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>
                
                {myHistory.map((history, idx) => (
                  <div key={idx} style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 16 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-primary)', marginTop: 6, outline: '4px solid var(--color-bg)' }}></div>
                    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: 16 }}>
                      <div className="flex justify-between items-start" style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '0.9rem' }}>{history.type}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12}/> {history.date}</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '0.8rem', backgroundColor: 'var(--color-surface-alt)', padding: 12, borderRadius: 6, marginBottom: 8 }}>
                        <div>
                          <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>Previous Role</div>
                          <div style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>{history.oldPosition}</div>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>Mgr: {history.oldManager}</div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>New Role</div>
                          <div style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>{history.newPosition}</div>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>Mgr: {history.newManager}</div>
                        </div>
                      </div>
                      
                      {history.comments && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', margin: 0 }}>"{history.comments}"</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(activeTab !== 'Profile' && activeTab !== 'History') && (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--color-text-muted)' }}>
            This section is under construction.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfilePanel;
