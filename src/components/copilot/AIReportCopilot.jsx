import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Mic, Download, ChevronRight, FileText, Share2, MoreHorizontal } from 'lucide-react';
import { useCopilotStore } from '../../store/copilotStore';
import { CopilotMessage } from './CopilotMessage';
import { CopilotSuggestions } from './CopilotSuggestions';

export const AIReportCopilot = () => {
  const { isOpen, closeCopilot, messages, isTyping, sendMessage } = useCopilotStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div style={{
      width: '450px',
      backgroundColor: 'white',
      borderLeft: '1px solid var(--color-border)',
      boxShadow: '-10px 0 30px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Ask AI About This Report</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>AI-powered executive insights generated from this report.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="icon-btn hover:bg-slate-100" style={{ padding: '6px', borderRadius: '8px', color: 'var(--color-text-muted)' }} title="Export / Share">
              <Share2 size={18} />
            </button>
            <button onClick={closeCopilot} className="icon-btn hover:bg-slate-100" style={{ padding: '6px', borderRadius: '8px', color: 'var(--color-text-muted)' }}>
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={24} color="var(--color-primary)" />
            </div>
            <p style={{ fontSize: '14px', maxWidth: 250, margin: '0 auto', lineHeight: 1.5 }}>
              I'm analyzing this report. Ask me anything to generate summaries, identify risks, or find insights.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <CopilotMessage key={msg.id} message={msg} />
          ))
        )}

        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
             <div style={{
                width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                <div className="typing-dot" style={{ animationDelay: '0s' }}></div>
                <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer / Input Area */}
      <div style={{ backgroundColor: 'white', borderTop: '1px solid var(--color-border)', padding: '16px 0' }}>
        <CopilotSuggestions onSelect={(prompt) => sendMessage(prompt)} />
        
        <div style={{ padding: '0 16px' }}>
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '24px',
            padding: '4px 8px 4px 16px',
            transition: 'border-color 0.2s',
          }} className="focus-within:border-primary">
            
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about this report..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '14px',
                color: 'var(--color-text-main)',
                padding: '8px 0'
              }}
            />
            
            <button type="button" style={{ padding: '8px', color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <Mic size={18} />
            </button>
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              style={{
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: input.trim() ? 'var(--color-primary)' : 'var(--color-border)',
                color: 'white',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideLeft {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .typing-dot {
          width: 4px; height: 4px; border-radius: 50%; background-color: white; margin: 0 2px;
          animation: typeBounce 1.4s infinite ease-in-out both;
        }
        @keyframes typeBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}} />
    </div>
  );
};
