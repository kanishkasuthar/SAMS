import React, { useState } from 'react';
import { Calendar, Filter, Users, Building2, Briefcase, MapPin, Download, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterButton = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className="hover-bg"
    style={{ 
      padding: '8px 16px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      borderRadius: '8px', 
      border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`, 
      backgroundColor: active ? 'var(--color-primary-light)' : 'transparent', 
      color: active ? 'var(--color-primary)' : 'var(--color-text-main)', 
      cursor: 'pointer', 
      fontWeight: 600,
      fontSize: '13px',
      transition: 'all 0.2s'
    }}
  >
    <Icon size={16} color={active ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
    {label}
  </button>
);

const AnalyticsFilterToolbar = () => {
  const [activeFilters, setActiveFilters] = useState({
    date: 'Last 30 Days',
    dept: null,
    manager: null,
    role: null,
    project: null,
    region: null,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleReset = () => {
    setActiveFilters({ date: 'Last 30 Days', dept: null, manager: null, role: null, project: null, region: null });
  };

  return (
    <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Primary Toolbar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', backgroundColor: 'white', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        
        <FilterButton 
          icon={Calendar} 
          label={activeFilters.date} 
          active={true} 
          onClick={() => {}} 
        />
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)', margin: '0 4px' }} />
        
        <FilterButton icon={Building2} label="Department" active={!!activeFilters.dept} onClick={() => setIsExpanded(!isExpanded)} />
        <FilterButton icon={Users} label="Manager" active={!!activeFilters.manager} onClick={() => setIsExpanded(!isExpanded)} />
        <FilterButton icon={Briefcase} label="Role" active={!!activeFilters.role} onClick={() => setIsExpanded(!isExpanded)} />
        <FilterButton icon={MapPin} label="Region" active={!!activeFilters.region} onClick={() => setIsExpanded(!isExpanded)} />
        
        <div style={{ flex: 1 }} />
        
        <button 
          onClick={handleReset}
          className="hover-bg" 
          style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '8px', border: '1px solid transparent', backgroundColor: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
        >
          <RotateCcw size={16} /> Reset
        </button>
        
        <button 
          className="hover-bg" 
          style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '13px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}
        >
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Expanded Filter Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Department</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Finance</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Manager</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  <option>All Managers</option>
                  <option>Sarah Chen</option>
                  <option>Amanda Vance</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Region</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  <option>Global</option>
                  <option>North America</option>
                  <option>EMEA</option>
                  <option>APAC</option>
                </select>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsFilterToolbar;
