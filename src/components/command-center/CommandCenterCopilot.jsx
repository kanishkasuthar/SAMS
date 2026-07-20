import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { CopilotMessage } from '../copilot/CopilotMessage';
import { CopilotSuggestions } from '../copilot/CopilotSuggestions';

const MOCK_ANSWERS = {
  default: {
    text: "Here is the summary of the organization's current status.",
    bullets: [
      "Engineering workload is at 95% capacity.",
      "Overall budget utilization is 92%.",
      "Decision authority remains concentrated in the executive layer."
    ],
    recommendations: [
      { id: 10, text: "Generate Restructuring Proposal", priority: "High", impact: "High", time: "2 Mins" }
    ]
  }
};

const CommandCenterCopilot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim() || isTyping) return;
    const userMsg = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setInput('');

    // Simulate delay
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 500));

    const aiMsg = { 
      id: (Date.now() + 1).toString(), 
      sender: 'ai',
      text: MOCK_ANSWERS.default.text,
      bullets: MOCK_ANSWERS.default.bullets,
      recommendations: MOCK_ANSWERS.default.recommendations,
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '550px', backgroundColor: 'white', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ padding: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '12px', color: 'white' }}>
          <Sparkles size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>AI Executive Assistant</h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>Ask anything about the organization</p>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
        {messages.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--color-text-muted)' }}>
             <Sparkles size={32} color="var(--color-primary)" style={{ opacity: 0.5, margin: '0 auto 12px auto' }} />
             <p style={{ fontSize: '13px', maxWidth: 200, margin: '0 auto', lineHeight: 1.5 }}>
               I'm your AI Executive Assistant. How can I help you analyze the organization today?
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

      {/* Input Area */}
      <div style={{ backgroundColor: 'white', borderTop: '1px solid var(--color-border)', padding: '16px' }}>
        <form onSubmit={handleSubmit} style={{
          display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)', borderRadius: '24px', padding: '4px 8px 4px 16px',
        }} className="focus-within:border-primary">
          
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Summarize organization..."
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: 'var(--color-text-main)', padding: '8px 0' }}
          />
          
          <button type="button" style={{ padding: '8px', color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}><Mic size={18} /></button>
          <button 
            type="submit" disabled={!input.trim() || isTyping}
            style={{
              padding: '8px', borderRadius: '50%', backgroundColor: input.trim() ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'white', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default CommandCenterCopilot;
