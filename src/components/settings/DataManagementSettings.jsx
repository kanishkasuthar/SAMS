import React from 'react';
import { Download, UploadCloud, Archive, Trash2, Database } from 'lucide-react';
import { useOrgStore } from '../../store/orgStore';
import { useUIStore } from '../../store/uiStore';

const DataManagementSettings = ({ state, handleChange }) => {
  const addToast = useUIStore(s => s.addToast);

  const handleBackup = () => {
    const orgState = useOrgStore.getState();
    const exportData = {
      nodes: orgState.nodes,
      edges: orgState.edges,
      departments: orgState.departments,
      employeeHistory: orgState.employeeHistory,
      versions: orgState.versions,
      auditLogs: orgState.auditLogs
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `SAMS_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    addToast('Backup created and downloaded successfully.', 'success');
  };

  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Backup & Restore</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0}}>Create manual snapshots of the organizational hierarchy and settings.</p>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Database size={24} color="var(--color-primary)" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Storage Usage</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>42.8 GB / 100 GB</div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="card hover-lift" style={{padding: 24, backgroundColor: 'rgba(79, 70, 229, 0.02)', border: '1px dashed var(--color-primary)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16}}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Download size={20} />
            </div>
            <div>
              <h4 style={{fontWeight: 600, color: 'var(--color-primary)'}}>Manual Snapshot</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Export all organizational data to a secure JSON file.</p>
            </div>
            <button className="btn-primary" onClick={handleBackup} style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto'}}>
              Create Backup
            </button>
          </div>

          <div className="card hover-lift" style={{padding: 24, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16}}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)' }}>
              <UploadCloud size={20} />
            </div>
            <div>
              <h4 style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Restore Configuration</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Upload a previous JSON backup to restore state.</p>
            </div>
            <button className="btn-secondary" style={{padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto'}}>
              Import File
            </button>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Retention & Archiving</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Version History Retention</label>
            <select className="input-field" value={state.dataVersionRetention || '1y'} onChange={(e) => handleChange('dataVersionRetention', e.target.value)}>
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="3y">3 Years</option>
              <option value="forever">Indefinitely</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Auto-Archive Stale Data</label>
            <select className="input-field" value={state.dataAutoArchive || 'on'} onChange={(e) => handleChange('dataAutoArchive', e.target.value)}>
              <option value="on">Enabled</option>
              <option value="off">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-danger)'}}>Danger Zone</h3>
        <div className="card" style={{padding: 24, border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', flexDirection: 'column', gap: 16}}>
          <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <div>
              <h4 style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Purge Audit Logs</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Permanently delete audit logs older than 90 days.</p>
            </div>
            <button onClick={() => { if(window.confirm('Are you sure you want to purge audit logs?')) addToast('Audit logs purged successfully.', 'success'); }} style={{padding: '8px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', fontWeight: 600, border: '1px solid rgba(239, 68, 68, 0.2)', cursor: 'pointer', borderRadius: 8}}>
              Purge Logs
            </button>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div>
              <h4 style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Factory Reset Platform</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4}}>Erase all data and reset SAMS to default configuration.</p>
            </div>
            <button style={{padding: '8px 16px', backgroundColor: 'var(--color-danger)', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: 8}}>
              Reset SAMS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagementSettings;
