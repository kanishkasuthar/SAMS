import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, MessageSquare, Bell, User, Settings, LogOut, Check, ArrowRight, History } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import CurrentUserProfilePanel from '../CurrentUserProfilePanel';
import NotificationCenterDrawer from './NotificationCenterDrawer';
import RegionSettingsModal from './RegionSettingsModal';
import OrgTimeMachine from '../intelligence/OrgTimeMachine';
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({ currentTitle }) => {
  const { addToast, currentUser, toggleChat, isChatOpen } = useUIStore();
  const navigate = useNavigate();
  
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [showGlobeMenu, setShowGlobeMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New states for real Modals/Drawers
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showTimeMachine, setShowTimeMachine] = useState(false);

  // Close dropdowns on outside click
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGlobeMenu(false);
        setShowNotifications(false);
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      addToast(`Searching for "${searchQuery}"...`, 'info');
      setShowSearchDropdown(false);
      e.target.blur();
    }
    if (e.key === 'Escape') {
      setShowSearchDropdown(false);
      e.target.blur();
    }
  };

  return (
    <>
      <header className="topbar glass" ref={dropdownRef}>
        <div style={{ position: 'relative' }}>
          <div className="topbar-search" style={{ 
            display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface)', 
            border: showSearchDropdown ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-md)', padding: '6px 16px', width: 400, 
            boxShadow: showSearchDropdown ? '0 0 0 4px rgba(79, 70, 229, 0.1)' : 'var(--shadow-sm)',
            transition: 'all 0.2s'
          }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              id="global-search"
              type="text" 
              placeholder={`Search in ${currentTitle}... (⌘ K)`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: '4px 12px', fontSize: '0.9rem', color: 'var(--color-text-main)' }}
              onKeyDown={handleSearchSubmit}
            />
            <div className="search-shortcut" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface-hover)', padding: '2px 6px', borderRadius: 4 }}>⌘K</div>
          </div>
          
          {/* Search Dropdown */}
          {showSearchDropdown && searchQuery.trim().length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', marginTop: 8, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, boxShadow: 'var(--shadow-lg)', zIndex: 1000, overflow: 'hidden' }}>
              <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>SEARCH RESULTS</div>
              <div className="dropdown-item" style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => addToast('Opening Employee Profile', 'info')}>
                <User size={16} color="var(--color-text-secondary)" /> <span><strong>{searchQuery}</strong> in Employees</span>
              </div>
              <div className="dropdown-item" style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => navigate('/projects')}>
                <Search size={16} color="var(--color-text-secondary)" /> <span><strong>{searchQuery}</strong> in Projects</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {/* Live Sync Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 'var(--space-2)' }}>
            <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
              <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', backgroundColor: 'var(--color-success)', opacity: 0.75 }}></span>
              <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: 8, width: 8, backgroundColor: 'var(--color-success)' }}></span>
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Live Sync</span>
          </div>

          <button 
            className="icon-btn tooltip-container" 
            aria-label="Time Machine" 
            onClick={() => setShowTimeMachine(true)}
            style={{ position: 'relative', color: 'var(--color-primary)' }}
          >
            <History size={18} />
            <span className="tooltip">Time Machine</span>
          </button>

          {/* Globe Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              className="icon-btn hover:bg-slate-100" 
              style={{ padding: 8, borderRadius: 8, border: 'none', background: showGlobeMenu ? 'var(--color-surface-hover)' : 'transparent', cursor: 'pointer', color: 'var(--color-text-secondary)' }} 
              title="Language & Region" 
              onClick={() => { setShowGlobeMenu(!showGlobeMenu); setShowNotifications(false); }}
            >
              <Globe size={20} />
            </button>
            {showGlobeMenu && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 220, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', zIndex: 1000, overflow: 'hidden' }}>
                <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>LANGUAGE & REGION</div>
                <div className="dropdown-item" style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                  <span>English (US)</span> <Check size={16} color="var(--color-success)" />
                </div>
                <div className="dropdown-item" onClick={() => setShowRegionModal(true)} style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer' }}>Espanol</div>
                <div className="dropdown-item" onClick={() => setShowRegionModal(true)} style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer' }}>Français</div>
                <div style={{ borderTop: '1px solid var(--color-border)', padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="dropdown-item" onClick={() => setShowRegionModal(true)}>
                  <span>Timezone (EST)</span> <ArrowRight size={14} color="var(--color-text-muted)" />
                </div>
              </div>
            )}
          </div>

          {/* Chat Icon */}
          <button 
            className="icon-btn hover:bg-slate-100" 
            style={{ padding: 8, borderRadius: 8, border: 'none', background: isChatOpen ? 'var(--color-primary)' : 'transparent', cursor: 'pointer', color: isChatOpen ? '#FFF' : 'var(--color-text-secondary)' }} 
            title="AI Assistant" 
            onClick={toggleChat}
          >
            <MessageSquare size={20} />
          </button>

          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              className="icon-btn hover:bg-slate-100" 
              style={{ padding: 8, borderRadius: 8, border: 'none', background: showNotifications ? 'var(--color-surface-hover)' : 'transparent', cursor: 'pointer', color: 'var(--color-text-secondary)' }} 
              title="Notifications" 
              onClick={() => { setShowNotifications(!showNotifications); setShowGlobeMenu(false); }}
            >
              <div className="relative">
                <Bell size={20} />
                <span className="absolute" style={{top: -2, right: 0, width: 8, height: 8, backgroundColor: 'var(--color-danger)', borderRadius: '50%', border: '2px solid var(--color-surface)'}}></span>
              </div>
            </button>
            {showNotifications && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 320, backgroundColor: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', zIndex: 1000, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Notifications</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => addToast('All marked as read.', 'success')}>Mark all read</span>
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  <div className="dropdown-item" style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: 4 }}>System Update Complete</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>The SAMS core engine has been updated to v4.2.</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 8 }}>2 mins ago</div>
                  </div>
                  <div className="dropdown-item" style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }} onClick={() => navigate('/projects')}>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: 4 }}>Project "Titan" is at risk</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Budget usage exceeded 90% threshold.</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 8 }}>1 hour ago</div>
                  </div>
                </div>
                <div style={{ padding: '12px', textAlign: 'center', backgroundColor: 'var(--color-surface-alt)', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => setShowNotificationDrawer(true)}>
                  View All Notifications
                </div>
              </div>
            )}
          </div>
          
          <div style={{width: 1, height: 24, backgroundColor: 'var(--color-border)', margin: '0 8px'}}></div>
          
          <button 
            id="profile-trigger" 
            className="profile-btn hover:bg-slate-50" 
            style={{ display: 'flex', alignItems: 'center', gap: 12, border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}
            onClick={() => setShowMyProfile(true)} 
            title="My Profile"
          >
            {currentUser?.photo ? (
              <img src={currentUser.photo} alt="Profile" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div className="profile-avatar" style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
                {currentUser?.name ? currentUser.name.charAt(0) : 'SA'}
              </div>
            )}
            <div className="flex flex-col" style={{alignItems: 'flex-start', textAlign: 'left'}}>
              <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>{currentUser?.name || 'System Admin'}</span>
              <span style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>{currentUser?.role || 'Super Admin'}</span>
            </div>
          </button>
        </div>
      </header>
      
      {showMyProfile && <CurrentUserProfilePanel onClose={() => setShowMyProfile(false)} />}

      {showNotificationDrawer && (
        <NotificationCenterDrawer isOpen={showNotificationDrawer} onClose={() => setShowNotificationDrawer(false)} />
      )}
      
      <RegionSettingsModal isOpen={showRegionModal} onClose={() => setShowRegionModal(false)} />

      <OrgTimeMachine isOpen={showTimeMachine} onClose={() => setShowTimeMachine(false)} />
    </>
  );
};

export default TopNavbar;
