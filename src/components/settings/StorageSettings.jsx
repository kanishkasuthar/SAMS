import React from 'react';
import { HardDrive, Cloud, FileText, Trash2, ShieldCheck } from 'lucide-react';

const StorageSettings = ({ state, handleChange }) => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Asset Storage Config</h3>
            <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0}}>Manage where user avatars, attachments, and exports are stored.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <HardDrive size={24} color="#f43f5e" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Assets & Logs</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)' }}>1.2 TB / 5 TB</div>
            </div>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Primary Storage Provider</label>
            <select className="input-field" value={state.storageProvider || 'aws'} onChange={(e) => handleChange('storageProvider', e.target.value)}>
              <option value="aws">Amazon S3</option>
              <option value="azure">Azure Blob Storage</option>
              <option value="gcp">Google Cloud Storage</option>
              <option value="local">Local Block Storage</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Bucket Region</label>
            <select className="input-field" value={state.storageRegion || 'us-east-1'} onChange={(e) => handleChange('storageRegion', e.target.value)}>
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="us-west-2">US West (Oregon)</option>
              <option value="eu-central-1">EU (Frankfurt)</option>
            </select>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Data Lifecycle & Retention</h3>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Automatically archive or delete old files to save costs.</p>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
          <div className="card hover-lift" style={{padding: 24, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 12}}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)' }}>
              <Cloud size={20} />
            </div>
            <div>
              <h4 style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Cold Storage Transition</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 16}}>Move files to deep archive if not accessed recently.</p>
              <select className="input-field" value={state.storageCold || '90'} onChange={(e) => handleChange('storageCold', e.target.value)}>
                <option value="30">After 30 Days</option>
                <option value="90">After 90 Days</option>
                <option value="365">After 1 Year</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>

          <div className="card hover-lift" style={{padding: 24, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 12}}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(239, 68, 68, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)' }}>
              <Trash2 size={20} />
            </div>
            <div>
              <h4 style={{fontWeight: 600, color: 'var(--color-text-main)'}}>Permanent Deletion</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 16}}>Permanently delete user-uploaded attachments.</p>
              <select className="input-field" value={state.storageDelete || 'never'} onChange={(e) => handleChange('storageDelete', e.target.value)}>
                <option value="1y">After 1 Year</option>
                <option value="3y">After 3 Years</option>
                <option value="7y">After 7 Years (Compliance)</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StorageSettings;
