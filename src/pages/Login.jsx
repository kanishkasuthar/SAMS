import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Mail, Lock, ArrowRight } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import './Dashboard.css';

const Login = () => {
  const { login, setAuthMode } = useUIStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setTimeout(() => {
      login();
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text-main)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%', zIndex: 0
      }} />

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1, padding: 32}}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card"
          style={{width: '100%', maxWidth: 420, padding: 40, backgroundColor: 'var(--color-surface)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)'}}
        >
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 24}}>
            <div style={{width: 56, height: 56, borderRadius: 16, backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)'}}>
              <Network size={28} />
            </div>
          </div>
          
          <div style={{textAlign: 'center', marginBottom: 32}}>
            <h1 style={{fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 8}}>Welcome back</h1>
            <p style={{color: 'var(--color-text-muted)', fontSize: '0.95rem'}}>Sign in to your Workspace</p>
          </div>

          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Email Address</label>
              <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', left: 14, top: 11, color: 'var(--color-text-muted)'}}>
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  required
                  style={{width: '100%', padding: '10px 16px 10px 42px', borderRadius: 10, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.95rem', transition: 'border-color 0.2s'}}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', display: 'flex', justifyContent: 'space-between'}}>
                <span>Password</span>
                <span style={{color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 500}}>Forgot?</span>
              </label>
              <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', left: 14, top: 11, color: 'var(--color-text-muted)'}}>
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  style={{width: '100%', padding: '10px 16px 10px 42px', borderRadius: 10, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.95rem', transition: 'border-color 0.2s'}}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading || !email || !password}
              style={{marginTop: 12, justifyContent: 'center', padding: '12px 24px', fontSize: '0.95rem', gap: 8, opacity: loading ? 0.7 : 1}}
            >
              {loading ? 'Signing in...' : 'Sign in'} {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p style={{textAlign: 'center', marginTop: 32, fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>
            Don't have an account? <span onClick={() => setAuthMode('signup')} style={{color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer'}}>Sign Up</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
