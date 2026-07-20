import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { X, User, Briefcase, Mail, Phone, Calendar } from 'lucide-react';

// We can import the full complex components here if needed, 
// but for the sake of global interactivity, we'll render a standard detail view if it's not a complex one.
import EmployeeIntelligenceDrawer from '../intelligence/EmployeeIntelligenceDrawer';
import DepartmentIntelligenceDrawer from '../departments/DepartmentIntelligenceDrawer';

const GlobalDrawerProvider = () => {
  const { activeDrawer, closeDrawer } = useUIStore();

  if (!activeDrawer) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={closeDrawer}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)', zIndex: 9998
        }}
      />

      {/* Sliding Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '600px',
        backgroundColor: 'white', zIndex: 9999, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
        transform: 'translateX(0)', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column'
      }}>
        
        {/* Render specific complex drawers if they exist, otherwise fallback to simple view */}
        {activeDrawer.type === 'EMPLOYEE_DETAILS' ? (
           <EmployeeIntelligenceDrawer 
              isOpen={true}
              employee={activeDrawer.data} 
              onClose={closeDrawer} 
           />
        ) : activeDrawer.type === 'DEPARTMENT_DETAILS' ? (
           <DepartmentIntelligenceDrawer 
              department={activeDrawer.data} 
              onClose={closeDrawer} 
           />
        ) : (
          // Generic fallback drawer
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Details</h2>
              <button onClick={closeDrawer} className="icon-btn hover:bg-slate-100" style={{ padding: '8px', borderRadius: '50%', border: 'none' }}><X size={20} /></button>
            </div>
            <pre style={{ backgroundColor: 'var(--color-bg)', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
              {JSON.stringify(activeDrawer.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalDrawerProvider;
