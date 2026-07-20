import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Mail, Lock, User, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import api from '../services/api';
import './Dashboard.css';

const SignUp = () => {
  const { login, setAuthMode, addToast } = useUIStore();
  const [step, setStep] = useState('form'); // 'form' or 'otp'
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setLoading(true);
    try {
      const response = await api.post('/auth/signup', { name, email, password, passwordConfirm: password });
      
      if (response.data.devMode) {
        addToast(response.data.message, 'success');
        setAuthMode('login');
      } else {
        setStep('otp');
        addToast(`OTP sent to ${email}`, 'success');
      }
    } catch (error) {
      const serverError = error.response?.data?.message || error.message || 'Signup failed';
      alert(`Signup failed: ${serverError}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    
    setLoading(true);
    try {
      await api.post('/auth/verify-otp', { email, code: enteredOTP });
      addToast('Email verified successfully! Please log in.', 'success');
      setAuthMode('login'); // Switch to login screen
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await api.post('/auth/send-otp', { email });
      addToast(`New OTP sent to ${email}`, 'success');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to resend OTP');
    }
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
        position: 'absolute', top: '-10%', right: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%', zIndex: 0
      }} />

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1, padding: 32}}>
        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="card"
              style={{width: '100%', maxWidth: 420, padding: 40, backgroundColor: 'var(--color-surface)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)'}}
            >
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: 24}}>
                <div style={{width: 56, height: 56, borderRadius: 16, backgroundColor: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.25)'}}>
                  <Network size={28} />
                </div>
              </div>
              
              <div style={{textAlign: 'center', marginBottom: 32}}>
                <h1 style={{fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 8}}>Create Account</h1>
                <p style={{color: 'var(--color-text-muted)', fontSize: '0.95rem'}}>Request access to your organization</p>
              </div>

              <form onSubmit={handleSignUp} style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                <div className="flex flex-col gap-2">
                  <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Full Name</label>
                  <div style={{position: 'relative'}}>
                    <div style={{position: 'absolute', left: 14, top: 11, color: 'var(--color-text-muted)'}}>
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera" 
                      style={{width: '100%', padding: '10px 16px 10px 42px', borderRadius: 10, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.95rem', transition: 'border-color 0.2s'}}
                    />
                  </div>
                </div>

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
                      style={{width: '100%', padding: '10px 16px 10px 42px', borderRadius: 10, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.95rem', transition: 'border-color 0.2s'}}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)'}}>Password</label>
                  <div style={{position: 'relative'}}>
                    <div style={{position: 'absolute', left: 14, top: 11, color: 'var(--color-text-muted)'}}>
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      style={{width: '100%', padding: '10px 16px 10px 42px', borderRadius: 10, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.95rem', transition: 'border-color 0.2s'}}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={loading}
                  style={{marginTop: 12, justifyContent: 'center', padding: '12px 24px', fontSize: '0.95rem', gap: 8, opacity: loading ? 0.7 : 1}}
                >
                  {loading ? 'Processing...' : 'Sign Up'} {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <p style={{textAlign: 'center', marginTop: 32, fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>
                Already have an account? <span onClick={() => setAuthMode('login')} style={{color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer'}}>Sign In</span>
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="card"
              style={{width: '100%', maxWidth: 420, padding: 40, backgroundColor: 'var(--color-surface)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)'}}
            >
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: 24}}>
                <div style={{width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)'}}>
                  <ShieldCheck size={28} />
                </div>
              </div>
              
              <div style={{textAlign: 'center', marginBottom: 32}}>
                <h1 style={{fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 8}}>Verify your email</h1>
                <p style={{color: 'var(--color-text-muted)', fontSize: '0.95rem'}}>
                  We've sent a 6-digit verification code to <br/>
                  <strong style={{color: 'var(--color-text-main)'}}>{email}</strong>
                </p>
              </div>

              <form onSubmit={verifyOtp} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: 8}}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        borderRadius: 12,
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        color: 'var(--color-text-main)',
                      }}
                    />
                  ))}
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={loading}
                  style={{justifyContent: 'center', padding: '12px 24px', fontSize: '0.95rem', gap: 8, opacity: loading ? 0.7 : 1}}
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>

              <div style={{textAlign: 'center', marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12}}>
                <p style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>
                  Didn't receive the code? <br/>
                  <span onClick={handleResendOTP} style={{color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4}}>
                    <RefreshCw size={14} /> Resend OTP
                  </span>
                </p>
                <p style={{fontSize: '0.85rem', color: 'var(--color-text-muted)', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => setStep('form')}>
                  Change email address
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignUp;
