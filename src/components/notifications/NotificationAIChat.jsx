import React, { useState } from 'react';
import { Sparkles, X, Send, User, BrainCircuit } from 'lucide-react';

const NotificationAIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your SAMS Notification Intelligence. How can I help you analyze today's alerts?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponse }]);
    }, 600);
  };

  const generateAIResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('summarize')) {
      return "Today you have 10 notifications. The most critical is a missing Engineering manager which has broken approval workflows. There is also 1 high-priority budget approval pending in Finance. I recommend addressing the Engineering manager gap immediately.";
    }
    if (lowerQuery.includes('critical') || lowerQuery.includes('first')) {
      return "You should resolve the 'Missing Engineering Manager' alert first. Without a manager, 42 employees cannot process approvals and 2 projects are at risk of stalling.";
    }
    if (lowerQuery.includes('finance')) {
      return "There is one Finance alert: A Q3 budget increase of $450k requires your approval. It is tied to hiring 3 new data scientists.";
    }
    return "I can help you prioritize issues, summarize daily activities, or explain the impact of specific organizational changes. What would you like to know?";
  };

  const suggestedPrompts = [
    "What is the most critical issue today?",
    "Summarize today's notifications.",
    "Show Finance related alerts."
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '400px',
      height: '600px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      borderRadius: '20px',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid rgba(255,255,255,0.4)',
      animation: 'slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      {/* Header */}
      <div style={{ 
        padding: '20px', 
        borderBottom: '1px solid rgba(0,0,0,0.05)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 36, height: 36, borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Ask AI</h3>
            <div style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 600 }}>SAMS Intelligence</div>
          </div>
        </div>
        <button onClick={onClose} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.05)' }}>
          <X size={18} color="var(--color-text-main)" />
        </button>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'flex-start',
            flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
          }}>
            <div style={{ 
              width: 28, 
              height: 28, 
              borderRadius: '50%', 
              backgroundColor: msg.sender === 'user' ? 'var(--color-primary)' : 'rgba(139, 92, 246, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: msg.sender === 'user' ? 'white' : '#8b5cf6',
              flexShrink: 0
            }}>
              {msg.sender === 'user' ? <User size={14} /> : <BrainCircuit size={14} />}
            </div>
            
            <div style={{ 
              padding: '12px 16px', 
              borderRadius: '16px',
              borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
              borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
              backgroundColor: msg.sender === 'user' ? 'var(--color-primary)' : 'white',
              color: msg.sender === 'user' ? 'white' : 'var(--color-text-main)',
              fontSize: '14px',
              lineHeight: 1.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              maxWidth: '80%'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      {messages.length < 3 && (
        <div style={{ padding: '0 20px', display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {suggestedPrompts.map((prompt, idx) => (
            <button 
              key={idx}
              onClick={() => { setInputValue(prompt); }}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid #8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                color: '#8b5cf6',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="hover:bg-purple-100"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'white', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--color-surface)', padding: '8px 16px', borderRadius: '999px', border: '1px solid var(--color-border)' }}>
          <input 
            type="text" 
            placeholder="Ask about your notifications..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: 'var(--color-text-main)' }}
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{ 
              width: 32, 
              height: 32, 
              borderRadius: '50%', 
              backgroundColor: inputValue.trim() ? '#8b5cf6' : 'var(--color-border)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: 'none',
              cursor: inputValue.trim() ? 'pointer' : 'default',
              transition: 'background-color 0.2s ease'
            }}
          >
            <Send size={14} color="white" style={{ marginLeft: '2px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationAIChat;
