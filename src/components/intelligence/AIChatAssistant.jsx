import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Maximize2, Minus, Search, Paperclip } from 'lucide-react';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: 'Hello! I am the SAMS AI Assistant. I can help you analyze the organization, find overloaded managers, or review recent structural changes.\n\nTry asking me to:\n- Analyze the **Engineering** department\n- Find managers with >15 direct reports\n- Show me the latest hierarchy changes' 
    }
  ]);
  const [input, setInput] = useState('');

  const formatText = (text) => {
    // Basic pseudo-markdown formatting for bold and lists
    return text.split('\n').map((line, i) => {
      if (line.startsWith('- ')) {
        return <li key={i} style={{ marginLeft: 16 }}>{line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>;
      }
      return <div key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { role: 'user', text: input };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      if (input.toLowerCase().includes('manager') || input.toLowerCase().includes('report')) {
        response = '**Manager Analysis**\n\nBased on current data, the Finance department requires attention. Manager Elena Rodriguez has 18 direct reports (Limit is 12).\n\nAction Recommended: *Reassign 6 reports to a new mid-level manager.*';
      } else if (input.toLowerCase().includes('engineering')) {
        response = '**Engineering Department**\n\n- Health Score: 92%\n- Employees: 142\n- Hierarchy Depth: 4\n- Status: Healthy, but approaching capacity limits by Q4.';
      } else {
        response = 'I found 3 relevant changes in the audit logs. The most significant was David Chen updating the Finance department responsibility matrix.\n\nWould you like me to open the Organization Studio to review these nodes?';
      }
      
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          transition: 'transform 0.2s',
        }}
        className="hover:scale-110"
      >
        <Bot size={28} />
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(2px)', zIndex: 9998, animation: 'fadeIn 0.2s' }}
        ></div>
      )}

      {/* Sliding Assistant Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 16,
          right: 16,
          width: 400,
          maxWidth: 'calc(100vw - 32px)',
          height: 'calc(100vh - 32px)',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 20,
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
          border: '1px solid var(--color-border)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '16px 20px', 
            backgroundColor: 'var(--color-surface)', 
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>SAMS Copilot</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Sparkles size={12} /> Enterprise Intelligence
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 4, borderRadius: 6 }} className="hover:bg-slate-100 dark:hover:bg-slate-800"><Minus size={16} /></button>
              <button style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 4, borderRadius: 6 }} className="hover:bg-slate-100 dark:hover:bg-slate-800"><Maximize2 size={16} /></button>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 4, borderRadius: 6 }} className="hover:bg-slate-100 dark:hover:bg-slate-800"><X size={16} /></button>
            </div>
          </div>

          {/* Quick Search Pills */}
          <div style={{ display: 'flex', gap: 8, padding: '12px 20px', overflowX: 'auto', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}>
            <span style={{ fontSize: '0.7rem', padding: '4px 10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><Search size={10} /> Employee</span>
            <span style={{ fontSize: '0.7rem', padding: '4px 10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><Search size={10} /> Department</span>
            <span style={{ fontSize: '0.7rem', padding: '4px 10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><Search size={10} /> Project</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 20, backgroundColor: 'var(--color-surface)' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '90%',
                display: 'flex',
                gap: 12
              }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                    <Bot size={14} color="white" />
                  </div>
                )}
                
                <div style={{
                  backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-surface-alt)',
                  color: msg.role === 'user' ? 'white' : 'var(--color-text-main)',
                  padding: '12px 16px',
                  borderRadius: 16,
                  borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                  borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 16,
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
                  boxShadow: msg.role === 'assistant' ? 'none' : '0 4px 12px rgba(79, 70, 229, 0.2)'
                }}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', gap: 8, backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', borderRadius: 24, padding: '8px 12px', alignItems: 'center' }}>
              <button style={{ color: 'var(--color-text-muted)', padding: 4 }}><Paperclip size={18} /></button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message Copilot..."
                style={{ 
                  flex: 1, backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-main)', fontSize: '0.9rem', outline: 'none'
                }}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                style={{ 
                  width: 32, height: 32, borderRadius: '50%', backgroundColor: input.trim() ? 'var(--color-primary)' : 'transparent', 
                  color: input.trim() ? 'white' : 'var(--color-text-muted)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'default', transition: 'all 0.2s'
                }}
              >
                <Send size={16} style={{ marginLeft: input.trim() ? 2 : 0 }} />
              </button>
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: 8 }}>
              AI can make mistakes. Verify important structural changes.
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideLeft {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />
    </>
  );
};

export default AIChatAssistant;
