import React, { useState } from 'react';
import { Briefcase, Calendar, Users, Layers, Activity, Search, Filter, Edit2 } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import AddProjectModal from '../components/AddProjectModal';
import './Dashboard.css';

const Projects = () => {
  const { projects, addProject, updateProject } = useOrgStore();
  const { addToast } = useUIStore();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHealth, setFilterHealth] = useState('All');

  const handleCreateOrUpdateProject = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      addToast(`${projectData.name} has been updated.`, 'success');
    } else {
      addProject({
        ...projectData,
        team: 1, // Default values for new project
        departments: 1,
        budget: '$100k',
        spent: '$0k',
        dueDate: 'Dec 31, 2026'
      });
      addToast(`${projectData.name} has been successfully created.`, 'success');
    }
    setShowModal(false);
    setEditingProject(null);
  };

  const openEditModal = (e, proj) => {
    e.stopPropagation(); // prevent card click
    setEditingProject(proj);
    setShowModal(true);
  };

  const openNewModal = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.manager.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterHealth === 'All' || p.health === filterHealth;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="flex justify-between items-center" style={{marginBottom: 32}}>
        <div>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em'}}>Projects Portfolio</h1>
          <p style={{color: 'var(--color-text-muted)', marginTop: 4}}>Manage all organizational projects and track cross-departmental health.</p>
        </div>
        <div className="flex gap-4">
          <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="card" style={{padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8}}>
            <Filter size={16} color="var(--color-text-muted)" />
            <select 
              value={filterHealth}
              onChange={(e) => setFilterHealth(e.target.value)}
              style={{backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-main)', outline: 'none', fontWeight: 500, padding: '4px'}}
            >
              <option value="All">All Health</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Needs Attention">Needs Attention</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <button 
            className="card" 
            style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'var(--color-primary)', color: 'white'}}
            onClick={openNewModal}
          >
            <Briefcase size={16} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24}}>
        {filteredProjects.map(proj => {
           let healthColor = 'var(--color-success)';
           let healthBg = 'rgba(16, 185, 129, 0.1)';
           if (proj.health === 'At Risk' || proj.health === 'Needs Attention') {
             healthColor = 'var(--color-warning)';
             healthBg = 'rgba(245, 158, 11, 0.1)';
           }
           if (proj.health === 'Critical') {
             healthColor = 'var(--color-danger)';
             healthBg = 'rgba(239, 68, 68, 0.1)';
           }

           return (
             <div key={proj.id} className="card" style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', transition: 'all 0.2s'}}>
               <div style={{position: 'absolute', top: 24, right: 24, display: 'flex', gap: 8}}>
                 <button 
                   onClick={(e) => openEditModal(e, proj)}
                   className="hover:bg-gray-100 p-1.5 rounded-md" 
                   style={{color: 'var(--color-text-muted)'}}
                 >
                   <Edit2 size={16} />
                 </button>
               </div>
               
               <div className="flex justify-between items-start" style={{paddingRight: 40}}>
                 <div>
                   <h3 style={{fontSize: '1.2rem', fontWeight: 700, marginBottom: 4}}>{proj.name}</h3>
                   <div className="flex items-center gap-2" style={{color: 'var(--color-text-muted)', fontSize: '0.85rem'}}>
                     <div style={{width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-main)'}}>
                       {proj.manager.split(' ').map(n=>n[0]).join('')}
                     </div>
                     <span>{proj.manager}</span>
                   </div>
                 </div>
               </div>

               <div className="flex gap-4 mt-2">
                 <div style={{backgroundColor: healthBg, color: healthColor, padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600}}>
                   {proj.health}
                 </div>
               </div>

               <div className="flex gap-4" style={{marginTop: 8}}>
                 <div className="flex items-center gap-1.5" style={{color: 'var(--color-text-muted)', fontSize: '0.8rem'}}>
                   <Users size={14} />
                   <span>{proj.team} Team Members</span>
                 </div>
                 <div className="flex items-center gap-1.5" style={{color: 'var(--color-text-muted)', fontSize: '0.8rem'}}>
                   <Layers size={14} />
                   <span>{proj.departments} Departments</span>
                 </div>
               </div>

               <div style={{marginTop: 'auto'}}>
                 <div className="flex justify-between items-end mb-2">
                   <span style={{fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600}}>Progress</span>
                   <span style={{fontSize: '0.9rem', fontWeight: 700}}>{proj.progress}%</span>
                 </div>
                 <div style={{width: '100%', height: 6, backgroundColor: 'var(--color-border)', borderRadius: 3, overflow: 'hidden'}}>
                   <div style={{width: `${proj.progress}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: 3}}></div>
                 </div>
               </div>
               
               <div className="flex justify-between items-center" style={{borderTop: '1px solid var(--color-border)', paddingTop: 16, marginTop: 4}}>
                 <div className="flex flex-col">
                   <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600}}>Budget</span>
                   <span style={{fontSize: '0.9rem', fontWeight: 600}}>{proj.spent || '$0'} / {proj.budget}</span>
                 </div>
                 <div className="flex flex-col text-right">
                   <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600}}>Due Date</span>
                   <span style={{fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4}}><Calendar size={14}/> {proj.dueDate}</span>
                 </div>
               </div>
             </div>
           )
        })}
      </div>

      <AddProjectModal 
        isOpen={showModal} 
        onClose={() => {setShowModal(false); setEditingProject(null);}}
        onConfirm={handleCreateOrUpdateProject}
        initialData={editingProject}
      />
    </div>
  )
}

export default Projects;
