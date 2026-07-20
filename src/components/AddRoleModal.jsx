import React, { useState, useEffect } from 'react';
import { X, Shield, Key, Network, ArrowRight } from 'lucide-react';
import { useRoleStore } from '../store/roleStore';

const AddRoleModal = ({ isOpen, onClose, onConfirm, initialData = null }) => {
  const { permissions: allPermissions, roles } = useRoleStore();
  
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('Level 4');
  const [classification, setClassification] = useState('STANDARD ACCESS');
  const [parentRoleId, setParentRoleId] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  
  const [step, setStep] = useState(1); // 1: Details, 2: Permissions, 3: Preview

  useEffect(() => {
    if (initialData && isOpen) {
      setTitle(initialData.name || '');
      setLevel(initialData.level || 'Level 4');
      setClassification(initialData.color || 'var(--color-primary)'); // Using color for classification mapping temporarily
      // Parent role is deprecated for now unless added to DB
      setSelectedPermissions(initialData.Permissions?.map(p => p.id) || []);
      setStep(1);
    } else if (isOpen) {
      setTitle('');
      setLevel('Level 4');
      setClassification('STANDARD ACCESS');
      setParentRoleId('');
      setSelectedPermissions([]);
      setStep(1);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const togglePermission = (key) => {
    if (selectedPermissions.includes(key)) {
      setSelectedPermissions(selectedPermissions.filter(k => k !== key));
    } else {
      setSelectedPermissions([...selectedPermissions, key]);
    }
  };

  const handleConfirm = () => {
    if (!title) {
      alert("Please enter a role name.");
      return;
    }
    onConfirm({ 
      roleName: title, 
      level, 
      color: classification, 
      permissionIds: selectedPermissions
    });
  };

  const renderStep1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase' }}>Role Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Data Analyst" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', outline: 'none' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase' }}>Access Level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', outline: 'none' }}>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4">Level 4</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase' }}>Classification</label>
          <select value={classification} onChange={(e) => setClassification(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', outline: 'none' }}>
            <option value="CRITICAL ACCESS">Critical Access</option>
            <option value="STRATEGIC ACCESS">Strategic Access</option>
            <option value="SENSITIVE ACCESS">Sensitive Access</option>
            <option value="DEPARTMENT SCOPED">Department Scoped</option>
            <option value="STANDARD ACCESS">Standard Access</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase' }}>Inherits From (Parent Role)</label>
        <select value={parentRoleId} onChange={(e) => setParentRoleId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', outline: 'none' }}>
          <option value="">None (Root Role)</option>
          {roles.map(r => (
            <option key={r.id} value={r.id}>{r.title} ({r.level})</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const grouped = {};
    allPermissions.forEach(p => {
      if (!grouped[p.module]) grouped[p.module] = [];
      grouped[p.module].push(p);
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.keys(grouped).map(module => (
          <div key={module} style={{ border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '12px 16px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-main)', borderBottom: '1px solid var(--color-border)' }}>
              {module}
            </div>
            <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {grouped[module].map(p => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedPermissions.includes(p.id)} onChange={() => togglePermission(p.id)} style={{ marginTop: '4px' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{p.action || p.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{p.risk} RISK</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderStep3 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ padding: '24px', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', textAlign: 'center' }}>
        <Shield size={32} style={{ color: 'var(--color-success)', margin: '0 auto 12px auto' }} />
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-success)', margin: '0 0 8px 0' }}>Access Impact Preview</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>This new role will provision {selectedPermissions.length} direct permissions.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '12px', backgroundColor: 'var(--color-surface-hover)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Properties</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>{title || 'Unnamed Role'}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{level} · {classification}</div>
        </div>
        <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '12px', backgroundColor: 'var(--color-surface-hover)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Inheritance</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Root Role (No Parent)</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-2xl)', width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>{initialData ? 'Edit Role' : 'Create Role'}</h2>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ color: step === 1 ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>1. Details</span>
              <span style={{ color: step === 2 ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>2. Permissions</span>
              <span style={{ color: step === 3 ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>3. Preview</span>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        <div style={{ padding: '32px', flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-bg)' }}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}>BACK</button>
          ) : (
            <div></div> // empty div for flex-between spacing
          )}
          
          {step < 3 ? (
            <button onClick={() => { if(step === 1 && !title) { alert('Title required'); return; } setStep(step + 1); }} style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'white', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>CONTINUE <ArrowRight size={14}/></button>
          ) : (
            <button onClick={handleConfirm} style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'white', backgroundColor: 'var(--color-success)', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>CONFIRM & SAVE <ArrowRight size={14}/></button>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddRoleModal;
