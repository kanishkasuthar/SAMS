import React from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundaryFallback extends React.Component {
  render() {
    const { error, resetErrorBoundary } = this.props;

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
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--color-danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24
        }}>
          <AlertTriangle size={40} />
        </div>
        
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>
          Something went wrong
        </h2>
        
        <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', maxWidth: 500, marginBottom: 24 }}>
          A component crashed while rendering. The engineering team has been notified. You can try recovering the page or returning to the dashboard.
        </p>

        <div style={{
          padding: '16px',
          backgroundColor: 'var(--color-surface-alt)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          marginBottom: 32,
          maxWidth: '100%',
          overflowX: 'auto',
          textAlign: 'left'
        }}>
          <code style={{ fontSize: '13px', color: 'var(--color-danger)' }}>
            {error.toString()}
          </code>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <button 
            className="btn-primary"
            onClick={resetErrorBoundary}
            style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <RefreshCcw size={18} /> Try Again
          </button>
          
          <button 
            className="btn-secondary"
            onClick={() => window.location.href = '/'}
            style={{ padding: '12px 24px', borderRadius: 8, fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Home size={18} /> Go to Dashboard
          </button>
        </div>
      </div>
    );
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback error={this.state.error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
