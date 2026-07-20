import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Mail, Lock, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useOrgStore } from '../store/orgStore';
import api from '../services/api';

const Login = () => {
  const { login, setAuthMode } = useUIStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Save tokens
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      // Fetch profile
      await useUIStore.getState().initializeAuth();
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // RENDER LEFT SIDE (BRANDING)
  // -----------------------------------------
  const renderLeftSide = () => (
    <div style={{
      flex: 1, 
      backgroundColor: 'var(--color-sidebar)', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '48px 64px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, zIndex: 2}}>
        <Network size={32} color="var(--color-violet)" />
        <span style={{fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em'}}>SAMS</span>
      </div>
      
      <div style={{marginTop: 'auto', marginBottom: 'auto', zIndex: 2, maxWidth: 500}}>
        <h1 style={{fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, marginBottom: 24}}>
          Strategic Authority<br/>Mapping System
        </h1>
        <p style={{fontSize: '1.25rem', color: '#94A3B8', lineHeight: 1.5}}>
          Visualize structure. Map authority. Track organizational change with precision.
        </p>
      </div>

      {/* Abstract connected hierarchy visualization */}
      <div style={{position: 'absolute', bottom: -50, right: -50, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, opacity: 0.4}}>
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <circle cx="600" cy="300" r="16" fill="var(--color-violet)" />
          <circle cx="450" cy="450" r="12" fill="var(--color-primary)" />
          <circle cx="750" cy="450" r="12" fill="var(--color-primary)" />
          <circle cx="350" cy="600" r="8" fill="#94A3B8" />
          <circle cx="550" cy="600" r="8" fill="#94A3B8" />
          <circle cx="650" cy="600" r="8" fill="#94A3B8" />
          <circle cx="850" cy="600" r="8" fill="#94A3B8" />
          
          <path d="M600 316 L450 438" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
          <path d="M600 316 L750 438" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
          <path d="M450 462 L350 592" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M450 462 L550 592" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M750 462 L650 592" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M750 462 L850 592" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );

  // -----------------------------------------
  // RENDER RIGHT SIDE (LOGIN FORM)
  // -----------------------------------------
  const renderLoginForm = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
      style={{width: '100%', maxWidth: 400}}
    >
      <div style={{marginBottom: 40}}>
        <h2 style={{fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8}}>Welcome back</h2>
        <p style={{color: 'var(--color-text-secondary)'}}>Enter your details to access your workspace.</p>
      </div>

      <form onSubmit={handleLoginSubmit} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Email Address</label>
          <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', left: 14, top: 12, color: 'var(--color-text-muted)'}}><Mail size={18} /></div>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com" required
              style={{width: '100%', padding: '12px 16px 12px 44px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.95rem', outline: 'none'}}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', justifyContent: 'space-between'}}>
            <span>Password</span>
            <span style={{color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600}}>Forgot Password?</span>
          </label>
          <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', left: 14, top: 12, color: 'var(--color-text-muted)'}}><Lock size={18} /></div>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={{width: '100%', padding: '12px 16px 12px 44px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.95rem', outline: 'none'}}
            />
          </div>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <input type="checkbox" id="remember" style={{width: 16, height: 16, accentColor: 'var(--color-primary)', cursor: 'pointer'}} />
          <label htmlFor="remember" style={{fontSize: '0.9rem', color: 'var(--color-text-secondary)', cursor: 'pointer'}}>Remember Me</label>
        </div>

        <button 
          type="submit" disabled={loading || !email || !password}
          className="hover-lift"
          style={{width: '100%', padding: '14px', borderRadius: 8, backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1, transition: 'all 0.2s'}}
        >
          {loading ? 'Authenticating...' : 'Sign In'} {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <p style={{textAlign: 'center', marginTop: 32, fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>
        Don't have an account? <span onClick={() => setAuthMode('signup')} style={{color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer'}}>Sign Up</span>
      </p>
    </motion.div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: 'var(--color-bg)' }}>
      {/* LEFT SIDE: BRANDING */}
      {renderLeftSide()}

      {/* RIGHT SIDE: AUTH FORM */}
      <div style={{
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 48,
        backgroundColor: 'var(--color-surface)'
      }}>
        {renderLoginForm()}
      </div>
    </div>
  );
};

export default Login;
