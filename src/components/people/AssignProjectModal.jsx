import React, { useState } from 'react';
import { X, Briefcase, Check, Search } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useOrgStore } from '../../store/orgStore';

const AssignProjectModal = ({ isOpen, onClose, employee }) => {
  const { addToast } = useUIStore();
  const { projects } = useOrgStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [role, setRole] = useState('Contributor');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !employee) return null;

  const handleAssign = () => {
    if (!selectedProject) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      addToast(`${employee.name} assigned to ${selectedProject.name} as ${role}.`, 'success');
      onClose();
    }, 1200);
  };

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={!isProcessing ? onClose : undefined}
      />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 550, backgroundColor: 'var(--color-surface)', borderRadius: 16,
        boxShadow: 'var(--shadow-xl)', zIndex: 9999, display: 'flex', flexDirection: 'column',
        animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Briefcase size={20} color="var(--color-primary)" /> Assign Project to {employee.name}
          </h2>
          <button onClick={onClose} disabled={isProcessing} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 8 }}>Select Project</div>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input 
                type="text" 
                placeholder="Search active projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none' }}
              />
            </div>
            
            <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8 }}>
              {filteredProjects.length === 0 ? (
                <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '13px' }}>No projects found.</div>
              ) : (
                filteredProjects.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => setSelectedProject(p)}
                    style={{ 
                      padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                      borderBottom: '1px solid var(--color-border)',
                      backgroundColor: selectedProject?.id === p.id ? 'rgba(79, 70, 229, 0.05)' : 'transparent'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: selectedProject?.id === p.id ? 'var(--color-primary)' : 'var(--color-text-main)' }}>{p.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{p.department}</div>
                    </div>
                    {selectedProject?.id === p.id && <Check size={18} color="var(--color-primary)" />}
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 8 }}>Project Role</div>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none', backgroundColor: 'var(--color-surface)' }}
            >
              <option value="Lead">Lead / Manager</option>
              <option value="Contributor">Contributor</option>
              <option value="Reviewer">Reviewer / Approver</option>
              <option value="Stakeholder">Stakeholder</option>
            </select>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="btn-secondary" onClick={onClose} disabled={isProcessing} style={{ padding: '8px 16px', borderRadius: 8, fontSize: '14px', fontWeight: 600 }}>Cancel</button>
          <button className="btn-primary" onClick={handleAssign} disabled={!selectedProject || isProcessing} style={{ padding: '8px 16px', borderRadius: 8, fontSize: '14px', fontWeight: 600, opacity: (!selectedProject || isProcessing) ? 0.6 : 1 }}>
            {isProcessing ? 'Assigning...' : 'Assign Project'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignProjectModal;
