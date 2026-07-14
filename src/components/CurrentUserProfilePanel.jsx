import React, { useState, useRef } from 'react';
import { X, Mail, Phone, Shield, Settings, LogOut, Check, Edit2, User } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { CUTE_AVATARS } from '../utils/avatarGenerator';

const CurrentUserProfilePanel = ({ onClose }) => {
  const { logout, addToast, currentUser, updateCurrentUser } = useUIStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const fileInputRef = useRef(null);

  const [editForm, setEditForm] = useState(currentUser);

  React.useEffect(() => {
    setEditForm(currentUser);
  }, [currentUser, isEditing]);

  const handleSave = () => {
    updateCurrentUser(editForm);
    setIsEditing(false);
    setShowAvatarMenu(false);
    addToast('Profile updated successfully', 'success');
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

  const renderInput = (field, isTextArea = false) => {
    if (isEditing) {
      if (isTextArea) {
        return <textarea className="input-field" rows={3} value={editForm[field]} onChange={e => setEditForm({...editForm, [field]: e.target.value})} style={{ width: '100%', resize: 'none', marginBottom: 8 }} />;
      }
      return <input className="input-field" value={editForm[field]} onChange={e => setEditForm({...editForm, [field]: e.target.value})} style={{ width: '100%', marginBottom: 8 }} />;
    }
    return null;
  };

  const currentPhoto = isEditing ? editForm.photo : currentUser.photo;

  return (
    <>
      <div className="studio-panel-overlay visible" onClick={onClose} style={{ zIndex: 9998 }}></div>
      <div className="right-panel open" style={{ zIndex: 9999 }}>
        {/* Top Header */}
        <div style={{ padding: '32px 32px 0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={18} /> My Profile
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {isEditing ? (
                <button className="btn-primary" onClick={handleSave} style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 20 }}>
                  <Check size={14} /> Save
                </button>
              ) : (
                <button className="btn-secondary" onClick={() => { setIsEditing(true); setEditForm(currentUser); }} style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 20, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <Edit2 size={14} /> Edit
                </button>
              )}
              <button className="panel-close" onClick={onClose}><X size={20} /></button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            
            <div style={{ position: 'relative' }}>
              {currentPhoto ? (
                <img src={currentPhoto} alt={currentUser.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backgroundColor: 'var(--color-surface-alt)' }} />
              ) : (
                <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  {(editForm.name || '?').charAt(0)}
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
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)' }}>Select Avatar</div>
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
                  <input className="input-field" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{ fontSize: '1.2rem', fontWeight: 700, padding: '4px 8px', width: '100%' }} />
                ) : (
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>{currentUser.name}</h2>
                )}
              </div>
              
              {isEditing ? (
                <input className="input-field" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} style={{ marginBottom: 4, width: '100%' }} />
              ) : (
                <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>{currentUser.role}</div>
              )}

              {isEditing ? (
                <input className="input-field" value={editForm.department} onChange={e => setEditForm({...editForm, department: e.target.value})} style={{ width: '100%' }} />
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{currentUser.department}</div>
              )}
            </div>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '24px 32px 0 32px' }}></div>

        {/* Content */}
        <div className="panel-content" style={{overflowY: 'auto', flex: 1, padding: 32}}>
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {/* About */}
            <section>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>About Me</h3>
              {isEditing ? (
                renderInput('bio', true)
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{currentUser.bio}</p>
              )}
            </section>

            {/* Contact Information */}
            <section>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Mail size={16} color="var(--color-text-muted)" />
                  {isEditing ? renderInput('email') : <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>{currentUser.email}</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Phone size={16} color="var(--color-text-muted)" />
                  {isEditing ? renderInput('phone') : <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{currentUser.phone}</span>}
                </div>
              </div>
            </section>

            {/* System Access */}
            <section>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>System Access</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Shield size={16} color="var(--color-success)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Full Administrative Access</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Settings size={16} color="var(--color-primary)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Global Settings Management</span>
                </div>
              </div>
            </section>

            {/* Logout Section */}
            <div style={{ marginTop: '32px', paddingTop: 24, borderTop: '1px solid var(--color-border)' }}>
              <button 
                onClick={logout} 
                style={{ width: '100%', padding: 12, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)' }}
              >
                <LogOut size={16} /> Sign Out of SAMS
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentUserProfilePanel;
