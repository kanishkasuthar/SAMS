import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import api from '../services/api';
import './EmployeeProfilePanel.css';

const TABS = ['Profile', 'Projects (3)', 'Reports (8)', 'Activity', 'Files', 'More'];

const EmployeeProfilePanel = ({ selectedNode, onClose }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [profileData, setProfileData] = useState(null);
  const { deactivateEmployee, deletePosition } = useOrgStore();
  const { addToast } = useUIStore();

  useEffect(() => {
    if (selectedNode && selectedNode.data && !selectedNode.data.isVacant) {
      setProfileData({
        name: selectedNode.data.name,
        designation: selectedNode.data.designation,
        department: selectedNode.data.department || 'Operations Department',
        email: `${selectedNode.data.name.toLowerCase().replace(' ', '.')}@company.com`,
        phone: '+1 (555) 234-7890',
        address: 'New York, USA',
        empId: 'EMP-1002',
        experience: '12 Years',
        joinDate: '12 Jan 2018',
        skills: ['Leadership', 'Strategic Planning', 'Operations', 'Team Management', 'Process Improvement'],
        photo: selectedNode.data.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedNode.data.name)}`
      });
    }
  }, [selectedNode]);

  if (!selectedNode || !profileData) return <div className="right-panel"></div>;

  return (
    <div className={`right-panel ${selectedNode ? 'open' : ''}`}>
      <button className="panel-close-top" onClick={onClose}><X size={18} /></button>
      
      <div className="drawer-header">
        <img src={profileData.photo} alt={profileData.name} className="drawer-avatar" />
        <div>
          <div className="drawer-name-row">
            <div className="drawer-name">{profileData.name}</div>
            <div className="drawer-status"><span style={{width: 6, height: 6, borderRadius: '50%', background: '#10B981'}}></span> Online</div>
          </div>
          <div className="drawer-desig">{profileData.designation}</div>
          <div className="drawer-dept">{profileData.department}</div>
        </div>
      </div>

      <div className="drawer-tabs">
        {TABS.map(t => (
          <button key={t} className={`drawer-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>

      <div className="drawer-content">
        {activeTab === 'Profile' && (
          <>
            <div className="drawer-section">
              <div className="drawer-section-title">About</div>
              <div className="drawer-text">
                Oversees daily operations across all departments and ensures organizational efficiency and scalability.
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">Contact Information</div>
              <div className="drawer-contact-row"><Mail size={14} className="drawer-contact-icon"/> {profileData.email}</div>
              <div className="drawer-contact-row"><Phone size={14} className="drawer-contact-icon"/> {profileData.phone}</div>
              <div className="drawer-contact-row"><MapPin size={14} className="drawer-contact-icon"/> {profileData.address}</div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">Key Information</div>
              <div className="drawer-grid">
                <div>
                  <div className="grid-item-label">Employee ID</div>
                  <div className="grid-item-val">{profileData.empId}</div>
                </div>
                <div>
                  <div className="grid-item-label">Experience</div>
                  <div className="grid-item-val">{profileData.experience}</div>
                </div>
                <div>
                  <div className="grid-item-label">Department</div>
                  <div className="grid-item-val">{profileData.department.split(' ')[0]}</div>
                </div>
                <div>
                  <div className="grid-item-label">Join Date</div>
                  <div className="grid-item-val">{profileData.joinDate}</div>
                </div>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">Skills</div>
              <div className="drawer-skills">
                {profileData.skills.map((skill, i) => (
                  <span key={i} className="drawer-skill-badge">{skill}</span>
                ))}
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">Actions</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }} onClick={() => addToast('Promote initiated. Use Drag & Drop or Edit profile to reassign reporting manager.', 'info')}>Promote</button>
                <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }} onClick={() => addToast('Transfer initiated. Use Drag & Drop or Edit profile to reassign reporting manager.', 'info')}>Transfer</button>
                <button className="btn-secondary text-warning" style={{ fontSize: '0.75rem', padding: '6px 12px' }} onClick={async () => {
                  if (window.confirm('Are you sure you want to deactivate this employee?')) {
                    try {
                      await deactivateEmployee(selectedNode.id);
                      addToast('Employee deactivated successfully.', 'success');
                      onClose();
                    } catch (err) {
                      addToast(err.message, 'error');
                    }
                  }
                }}>Deactivate</button>
                <button className="btn-secondary text-danger" style={{ fontSize: '0.75rem', padding: '6px 12px' }} onClick={() => {
                  if (window.confirm('Are you sure you want to delete this position?')) {
                    deletePosition(selectedNode.id);
                    addToast('Position deleted successfully.', 'success');
                    onClose();
                  }
                }}>Delete</button>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title" style={{marginBottom: 8}}>Reporting</div>
              <div className="reporting-label">Reports To</div>
              <div className="reporting-manager">
                <img src="https://i.pravatar.cc/150?u=a042" className="reporting-manager-avatar" alt="Manager" />
                <div>
                  <div className="reporting-manager-name">Robert Anderson</div>
                  <div className="reporting-manager-desig">Chief Executive Officer</div>
                </div>
              </div>
              
              <div className="reporting-label" style={{marginTop: 16}}>Direct Reports</div>
              <div className="reporting-directs">
                <img src="https://i.pravatar.cc/150?u=12" className="direct-avatar" alt="Direct" />
                <img src="https://i.pravatar.cc/150?u=13" className="direct-avatar" alt="Direct" />
                <img src="https://i.pravatar.cc/150?u=14" className="direct-avatar" alt="Direct" />
                <img src="https://i.pravatar.cc/150?u=15" className="direct-avatar" alt="Direct" />
                <div className="direct-more">+3</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfilePanel;
