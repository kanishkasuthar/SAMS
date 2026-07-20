import React, { useState } from 'react';
import Card from '../common/Card';
import { MessageSquare, Sparkles, Send, X, ChevronUp, ChevronDown } from 'lucide-react';

const SUGGESTIONS = [
  "Predict import success.",
  "Why did validation fail?",
  "Show affected departments.",
  "Explain hierarchy conflicts."
];

const SyncAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: "I'm your Data Control Tower AI. I'm analyzing the current sync operation. How can I help?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add User Message
    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI Response
    setTimeout(() => {
      let aiResponse = "I've analyzed the current organizational snapshot.";
      if (text.toLowerCase().includes('fail') || text.toLowerCase().includes('conflict')) {
        aiResponse = "Validation failed primarily due to EMP-842 reporting to EMP-102, which creates a circular dependency. I recommend applying the Smart Merge resolution in the Conflict Center.";
      } else if (text.toLowerCase().includes('predict') || text.toLowerCase().includes('success')) {
        aiResponse = "Based on current data quality metrics, the import has a 96% probability of success. Fixing the 12 duplicate records will increase this to 99%.";
      } else if (text.toLowerCase().includes('department')) {
        aiResponse = "The affected departments are Engineering (+5 headcount), Product (-2 headcount), and Sales (No change).";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: aiResponse }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          backgroundColor: 'var(--color-primary)', color: 'white',
          border: 'none', boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'transform 0.2s'
        }}
        className="hover:scale-110"
      >
        <Sparkles size={24} />
      </button>
    );
  }

  return (
    <Card style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
      width: 380, height: 500, display: 'flex', flexDirection: 'column',
      boxShadow: '0 20px 50px rgba(0,0,0,0.2)', padding: 0, overflow: 'hidden'
    }} className="animate-in slide-in-from-bottom-8 fade-in duration-300">
      
      {/* Header */}
      <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Sparkles size={18} />
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Sync Assistant</h3>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }} className="hover:opacity-100">
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '16px' }} className="hide-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ 
              maxWidth: '85%', padding: '12px 16px', borderRadius: '16px', fontSize: '13px', lineHeight: 1.5,
              backgroundColor: msg.type === 'user' ? 'var(--color-primary)' : 'white',
              color: msg.type === 'user' ? 'white' : 'var(--color-text-main)',
              border: msg.type === 'user' ? 'none' : '1px solid var(--color-border)',
              borderBottomRightRadius: msg.type === 'user' ? 4 : 16,
              borderBottomLeftRadius: msg.type === 'ai' ? 4 : 16,
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div style={{ padding: '12px', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '8px', overflowX: 'auto' }} className="hide-scrollbar">
        {SUGGESTIONS.map((sug, idx) => (
          <button 
            key={idx} 
            onClick={() => handleSend(sug)}
            style={{ 
              padding: '6px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: 600, 
              backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', border: '1px solid rgba(79, 70, 229, 0.2)',
              whiteSpace: 'nowrap', cursor: 'pointer' 
            }}
            className="hover:bg-indigo-50"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '16px', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask AI about this sync..."
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', backgroundColor: 'transparent' }}
        />
        <button 
          onClick={() => handleSend(input)}
          disabled={!input.trim()}
          style={{ 
            width: 32, height: 32, borderRadius: '50%', backgroundColor: input.trim() ? 'var(--color-primary)' : 'var(--color-surface-hover)', 
            color: input.trim() ? 'white' : 'var(--color-text-muted)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'default', transition: 'all 0.2s'
          }}
        >
          <Send size={14} style={{ marginLeft: 2 }} />
        </button>
      </div>

    </Card>
  );
};

export default SyncAIChat;
