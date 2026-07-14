import React from 'react';
import { Map, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      padding: '32px',
      textAlign: 'center',
      backgroundColor: 'var(--color-bg)'
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        color: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32
      }}>
        <Map size={50} />
      </div>
      
      <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, lineHeight: 1 }}>
        404
      </h1>
      
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', marginTop: 8, marginBottom: 16 }}>
        Page Not Found
      </h2>
      
      <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', maxWidth: 450, marginBottom: 40, lineHeight: 1.5 }}>
        The organizational module you're looking for doesn't exist or you don't have the required permissions to view it.
      </p>

      <div style={{ display: 'flex', gap: 16 }}>
        <button 
          className="btn-secondary"
          onClick={() => navigate(-1)}
          style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <ArrowLeft size={18} /> Go Back
        </button>
        
        <button 
          className="btn-primary"
          onClick={() => navigate('/')}
          style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <Home size={18} /> Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
