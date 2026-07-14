import React, { useState } from 'react';
import { X, Filter, RotateCcw, Check } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const PeopleFilterDrawer = ({ isOpen, onClose }) => {
  const { addToast } = useUIStore();
  const [isApplying, setIsApplying] = useState(false);

  const [filters, setFilters] = useState({
    department: [],
    status: [],
    workload: [],
    employmentType: []
  });

  if (!isOpen) return null;

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const list = prev[category];
      if (list.includes(value)) {
        return { ...prev, [category]: list.filter(item => item !== value) };
      }
      return { ...prev, [category]: [...list, value] };
    });
  };

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      addToast('People filters applied.', 'success');
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFilters({ department: [], status: [], workload: [], employmentType: [] });
  };

  const deptOptions = ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR & Admin', 'Executive', 'Product', 'Design'];
  const statusOptions = ['Online', 'Offline', 'Busy', 'Meeting', 'Leave'];
  const workloadOptions = ['Overloaded (>90%)', 'High (75-90%)', 'Optimal (40-75%)', 'Available (<40%)'];
  const typeOptions = ['Full-time', 'Part-time', 'Contractor'];

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 450,
        backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-xl)',
        zIndex: 9999, display: 'flex', flexDirection: 'column',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid var(--color-border)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Filter size={20} color="var(--color-primary)" /> Advanced Filters
          </h2>
          <button onClick={onClose} style={{ padding: 8, borderRadius: 8, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          
          {/* Department */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Department</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {deptOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => toggleFilter('department', opt)}
                  style={{ 
                    padding: '8px 16px', borderRadius: 20, fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    backgroundColor: filters.department.includes(opt) ? 'var(--color-primary)' : 'var(--color-surface-alt)',
                    color: filters.department.includes(opt) ? 'white' : 'var(--color-text-secondary)',
                    border: filters.department.includes(opt) ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    display: 'flex', alignItems: 'center', gap: 6
                  }}
                >
                  {filters.department.includes(opt) && <Check size={14} />} {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Online Status</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {statusOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => toggleFilter('status', opt)}
                  style={{ 
                    padding: '8px 16px', borderRadius: 20, fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    backgroundColor: filters.status.includes(opt) ? 'var(--color-primary)' : 'var(--color-surface-alt)',
                    color: filters.status.includes(opt) ? 'white' : 'var(--color-text-secondary)',
                    border: filters.status.includes(opt) ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Workload */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Current Workload</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {workloadOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => toggleFilter('workload', opt)}
                  style={{ 
                    padding: '8px 16px', borderRadius: 20, fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    backgroundColor: filters.workload.includes(opt) ? 'var(--color-primary)' : 'var(--color-surface-alt)',
                    color: filters.workload.includes(opt) ? 'white' : 'var(--color-text-secondary)',
                    border: filters.workload.includes(opt) ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          
          {/* Employment Type */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 12 }}>Employment Type</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {typeOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => toggleFilter('employmentType', opt)}
                  style={{ 
                    padding: '8px 16px', borderRadius: 20, fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    backgroundColor: filters.employmentType.includes(opt) ? 'var(--color-primary)' : 'var(--color-surface-alt)',
                    color: filters.employmentType.includes(opt) ? 'white' : 'var(--color-text-secondary)',
                    border: filters.employmentType.includes(opt) ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={handleReset}
            style={{ padding: '10px 16px', borderRadius: 8, fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <RotateCcw size={16} /> Reset
          </button>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-secondary" onClick={onClose} style={{ padding: '10px 24px', borderRadius: 8, fontSize: '14px', fontWeight: 600 }}>Cancel</button>
            <button className="btn-primary" onClick={handleApply} style={{ padding: '10px 24px', borderRadius: 8, fontSize: '14px', fontWeight: 600, opacity: isApplying ? 0.7 : 1 }}>
              {isApplying ? 'Applying...' : `Show Results`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleFilterDrawer;
