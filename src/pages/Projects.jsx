import React, { useState } from 'react';
import { Briefcase, Search, Filter, LayoutGrid, List } from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import PremiumProjectCard from '../components/projects/PremiumProjectCard';
import ProjectDetailsDrawer from '../components/projects/ProjectDetailsDrawer';
import AdvancedFilterDrawer from '../components/projects/AdvancedFilterDrawer';
import ProjectDrawer from '../components/ProjectDrawer';
import './Dashboard.css';

const Projects = () => {
  const { projects, addProject, updateProject } = useOrgStore();
  const { addToast, openModal } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHealth, setFilterHealth] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  
  // Drawer & Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const handleAction = (action, project) => {
    if (action === 'Edit') {
      openModal('EDIT_PROJECT', project);
    } else if (action === 'Delete') {
      openModal('CONFIRM_DELETE', { itemType: 'project', itemId: project.id, itemName: project.name });
    } else {
      addToast(`Action ${action} executed.`, 'success');
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.manager.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterHealth === 'All' || p.health === filterHealth;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container" style={{ padding: 'var(--space-4)' }}>
      <PageHeader 
        title="Projects Portfolio" 
        subtitle="Manage all organizational projects and track cross-departmental health."
        icon={Briefcase}
        action={
          <div className="flex gap-4">
            <div className="topbar-search" style={{ width: 250, backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', padding: '6px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <Search size={18} color="var(--color-text-muted)" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', marginLeft: 8 }}
              />
            </div>
            
            <Card style={{padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 'var(--radius-md)', cursor: 'pointer'}} noPadding onClick={() => setShowAdvancedFilter(true)}>
              <Filter size={16} color="var(--color-text-muted)" style={{marginLeft: 8}} />
              <span style={{color: 'var(--color-text-main)', fontWeight: 500, padding: '4px 8px', fontSize: '14px'}}>Advanced Filter</span>
            </Card>

            <div style={{display: 'flex', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden'}}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{padding: '8px 12px', border: 'none', background: viewMode === 'grid' ? 'var(--color-surface-hover)' : 'transparent', color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-text-muted)', cursor: 'pointer'}}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{padding: '8px 12px', border: 'none', background: viewMode === 'list' ? 'var(--color-surface-hover)' : 'transparent', color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-muted)', cursor: 'pointer'}}
              >
                <List size={18} />
              </button>
            </div>
            
            <button className="btn-primary" onClick={() => openModal('CREATE_PROJECT')}>
              + New Project
            </button>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto' }} className="hide-scrollbar">
        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px', paddingBottom: 32 }}>
            {filteredProjects.map(proj => (
              <PremiumProjectCard 
                key={proj.id} 
                project={proj} 
                onOpenDetails={setSelectedProject}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: 32 }}>
            {filteredProjects.map(proj => (
              <PremiumProjectCard 
                key={proj.id} 
                project={proj} 
                onOpenDetails={setSelectedProject}
                onAction={handleAction}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Details Drawer */}
      <ProjectDetailsDrawer 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />

      <AdvancedFilterDrawer 
        isOpen={showAdvancedFilter} 
        onClose={() => setShowAdvancedFilter(false)} 
      />

    </div>
  );
};

export default Projects;
