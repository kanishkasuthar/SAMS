import React, { useState } from 'react';
import Card from '../common/Card';
import { Sparkles, Send, ChevronDown } from 'lucide-react';

const HistoryAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: "I'm your temporal AI assistant. Ask me anything about the organizational history." }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: "I've analyzed the historical logs. Based on the data, 14 people left Engineering during the v3.1 expansion, primarily transferring to the newly formed DevOps unit." }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          backgroundColor: 'var(--color-text-main)', color: 'white',
          border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
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
      
      <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-text-main)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Sparkles size={18} />
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>History Copilot</h3>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }} className="hover:opacity-100">
          <ChevronDown size={20} />
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ 
              maxWidth: '85%', padding: '12px 16px', borderRadius: '16px', fontSize: '13px', lineHeight: 1.5,
              backgroundColor: msg.type === 'user' ? 'var(--color-text-main)' : 'white',
              color: msg.type === 'user' ? 'white' : 'var(--color-text-main)',
              border: msg.type === 'user' ? 'none' : '1px solid var(--color-border)',
              borderBottomRightRadius: msg.type === 'user' ? 4 : 16,
              borderBottomLeftRadius: msg.type === 'ai' ? 4 : 16
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Who left Engineering?"
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', backgroundColor: 'transparent' }}
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim()}
          style={{ 
            width: 32, height: 32, borderRadius: '50%', backgroundColor: input.trim() ? 'var(--color-text-main)' : 'var(--color-surface-hover)', 
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

export default HistoryAIAssistant;
