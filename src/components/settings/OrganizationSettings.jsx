import React from 'react';

const OrganizationSettings = ({ state, handleChange }) => {
  return (
    <div className="card animate-fade-in" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Regional & Formatting</h3>
        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24}}>Configure defaults for dates, currencies, and time zones.</p>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Time Zone</label>
            <select className="input-field" value={state.orgTimezone || 'utc'} onChange={(e) => handleChange('orgTimezone', e.target.value)}>
              <option value="utc">UTC (Universal Coordinated Time)</option>
              <option value="est">EST (Eastern Standard Time)</option>
              <option value="pst">PST (Pacific Standard Time)</option>
              <option value="ist">IST (Indian Standard Time)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Language</label>
            <select className="input-field" value={state.orgLanguage || 'en'} onChange={(e) => handleChange('orgLanguage', e.target.value)}>
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Date Format</label>
            <select className="input-field" value={state.orgDateFormat || 'mdy'} onChange={(e) => handleChange('orgDateFormat', e.target.value)}>
              <option value="mdy">MM/DD/YYYY</option>
              <option value="dmy">DD/MM/YYYY</option>
              <option value="ymd">YYYY-MM-DD</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Currency</label>
            <select className="input-field" value={state.orgCurrency || 'usd'} onChange={(e) => handleChange('orgCurrency', e.target.value)}>
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="inr">INR (₹)</option>
            </select>
          </div>
        </div>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-main)'}}>Business Defaults</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Fiscal Year Start</label>
            <select className="input-field" value={state.orgFiscal || 'jan'} onChange={(e) => handleChange('orgFiscal', e.target.value)}>
              <option value="jan">January 1</option>
              <option value="apr">April 1</option>
              <option value="jul">July 1</option>
              <option value="oct">October 1</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)'}}>Default Department</label>
            <select className="input-field" value={state.orgDefaultDept || 'hq'} onChange={(e) => handleChange('orgDefaultDept', e.target.value)}>
              <option value="hq">Headquarters</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettings;
