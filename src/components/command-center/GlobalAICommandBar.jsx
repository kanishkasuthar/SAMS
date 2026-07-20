import React, { useState, useEffect } from 'react';
import { Search, Mic, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const SUGGESTIONS = [
  "Show overloaded managers",
  "Why did Engineering costs increase?",
  "Predict next month's organization health",
  "Compare Finance with last quarter",
  "Generate restructuring strategy"
];

const PROCESSING_STEPS = [
  "Thinking...",
  "Analyzing hierarchy...",
  "Checking historical data...",
  "Generating recommendations..."
];

const GlobalAICommandBar = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { addToast } = useUIStore();

  const handleProcess = (q) => {
    if (!q) return;
    setQuery(q);
    setIsProcessing(true);
    setProcessingStep(0);
    setShowResult(false);
  };

  useEffect(() => {
    if (isProcessing) {
      if (processingStep < PROCESSING_STEPS.length) {
        const timer = setTimeout(() => {
          setProcessingStep(prev => prev + 1);
        }, 1000 + Math.random() * 500); // Realistic processing delay
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsProcessing(false);
          setShowResult(true);
          addToast("AI Analysis Complete.", "success");
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isProcessing, processingStep, addToast]);

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      {/* Search Bar Container */}
      <div className="card hover-lift" style={{ 
        display: 'flex', alignItems: 'center', padding: '16px 24px', 
        borderRadius: '24px', backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(10px)', border: '1px solid var(--color-border)',
        boxShadow: '0 8px 30px rgba(139, 92, 246, 0.12)' 
      }}>
        <Sparkles size={24} color="var(--color-primary)" style={{ marginRight: '16px' }} />
        
        <input 
          type="text" 
          placeholder="Ask SAMS AI anything..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleProcess(query);
          }}
          disabled={isProcessing}
          style={{
            flex: 1, border: 'none', background: 'transparent', outline: 'none',
            fontSize: '18px', fontWeight: 500, color: 'var(--color-text-main)'
          }}
        />
        
        {isProcessing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '16px', color: 'var(--color-primary)', fontSize: '14px', fontWeight: 600 }}>
            <span className="loading-pulse">{PROCESSING_STEPS[processingStep]}</span>
            <div className="spinner" style={{ width: 16, height: 16, border: '2px solid var(--color-primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        )}

        <button className="icon-btn hover:bg-slate-100" style={{ marginLeft: '8px', color: 'var(--color-text-muted)' }} title="Voice AI">
          <Mic size={22} />
        </button>
      </div>

      {/* Suggestions Box (Only show if not processing and no result) */}
      {!isProcessing && !showResult && !query && (
        <div style={{ 
          position: 'absolute', top: '100%', left: '20px', right: '20px', 
          marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' 
        }}>
          {SUGGESTIONS.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => handleProcess(s)}
              style={{
                padding: '8px 16px', backgroundColor: 'white', border: '1px solid var(--color-border)',
                borderRadius: '20px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease'
              }}
              className="hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Result Display Box */}
      {showResult && (
        <div className="card" style={{
          position: 'absolute', top: '100%', left: '0', right: '0', marginTop: '16px', padding: '24px',
          animation: 'fadeIn 0.3s ease', borderTop: '4px solid var(--color-primary)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--color-text-main)' }}>AI Executive Summary</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: '80%' }}>
                Based on your query regarding <strong>"{query}"</strong>, SAMS AI has analyzed real-time organizational data. Engineering costs spiked 18% mainly due to unbudgeted contractor usage in Q3. Modifying approval limits in the Procurement process could save an estimated $120k monthly.
              </p>
            </div>
            <button 
              onClick={() => { setShowResult(false); setQuery(''); }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            >
              Close
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
             <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Open Detailed View <ChevronRight size={14} />
             </button>
             <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                Simulate Restructuring
             </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .loading-pulse { animation: pulseOpacity 1.5s infinite ease-in-out; }
        @keyframes pulseOpacity { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}} />
    </div>
  );
};

export default GlobalAICommandBar;
