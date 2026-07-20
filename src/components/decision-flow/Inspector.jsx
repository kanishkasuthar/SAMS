import React, { useState } from 'react';
import { Activity, ShieldAlert, Zap, BarChart2, GitBranch, Shield, Cog, History, User, Users, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import ChangeAuthorityModal from './modals/ChangeAuthorityModal';

const Inspector = ({ selectedNodeId, nodes, setNodes }) => {
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('CONFIGURATION');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefText, setBriefText] = useState('This decision flow is operationally stable, but CFO Approval contributes 62% of the total decision delay. Routing low-risk budget requests below $75,000 through VP approval could reduce average decision time by approximately 31%.');

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const handleUpdateNode = (key, value) => {
    setNodes(nds => nds.map(n => {
      if (n.id === selectedNodeId) {
        return { ...n, data: { ...n.data, [key]: value } };
      }
      return n;
    }));
  };

  if (!selectedNodeId || !selectedNode) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)', overflowY: 'auto' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>Decision Intelligence</h2>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Global flow insights and analysis.</p>
        </div>
        
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Flow Health</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-success)' }}>86<span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>/100</span></div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Velocity</div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-text-main)' }}>2.4 <span style={{ fontSize: '12px', fontWeight: 600 }}>Days</span></div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Authority Risk</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--color-warning)' }}>Medium</div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Bottleneck</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--color-danger)' }}>CFO Approval</div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Zap size={16} color="var(--color-primary)" />
              <h3 style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>AI Flow Brief</h3>
            </div>
            <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.2)', padding: '16px', borderRadius: '12px', fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-main)' }}>
              {isGenerating ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
                  <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid var(--color-surface-hover)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  Analyzing node configurations...
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: briefText }} />
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => navigate('/analytics')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-primary)', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>View Full Analysis</button>
            <button 
              disabled={isGenerating}
              onClick={() => { 
                setIsGenerating(true);
                setTimeout(() => {
                  setBriefText('<strong>UPDATE:</strong> Based on the current node structure, there are no immediate critical risks. However, the VP Approval node is approaching its recommended capacity limit (14 active decisions).');
                  setIsGenerating(false);
                }, 1500); 
              }} 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: isGenerating ? 'var(--color-text-muted)' : 'var(--color-text-main)', fontWeight: 700, fontSize: '13px', cursor: isGenerating ? 'not-allowed' : 'pointer' }}
            >
              {isGenerating ? 'Generating...' : 'Generate New Brief'}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Node Inspector View
  const tabs = [
    { id: 'CONFIGURATION', icon: Cog, label: 'Config' },
    { id: 'AUTHORITY', icon: Shield, label: 'Authority' },
    { id: 'PERFORMANCE', icon: Activity, label: 'Perf' },
    { id: 'HISTORY', icon: History, label: 'History' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)', overflowY: 'auto' }}>
      <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Node Intelligence</h2>
          <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: 'var(--color-surface-hover)', padding: '2px 6px', borderRadius: '4px' }}>{selectedNode.data.type?.toUpperCase()}</span>
        </div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>{selectedNode.data.title}</p>
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>ID: {selectedNode.id}</p>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', padding: '0 12px' }}>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              flex: 1, 
              padding: '12px 0', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s'
            }}
          >
            <tab.icon size={16} />
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>{tab.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        {activeTab === 'CONFIGURATION' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Node Name</label>
              <input 
                type="text" 
                value={selectedNode.data.title || ''}
                onChange={(e) => handleUpdateNode('title', e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Description</label>
              <textarea 
                value={selectedNode.data.summary || ''}
                onChange={(e) => handleUpdateNode('summary', e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', resize: 'vertical', minHeight: '80px' }}
              />
            </div>
            {selectedNode.data.type === 'condition' && (
              <>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Operator</label>
                  <select style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', backgroundColor: 'white' }}>
                    <option>Equals</option>
                    <option>Greater Than</option>
                    <option>Less Than</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'AUTHORITY' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Official Authority</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{selectedNode.data.authority || 'Unassigned'}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Level 2 • VP Engineering</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Delegation:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Allowed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Backup:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Sarah Jenkins</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-warning)', textTransform: 'uppercase', marginBottom: '8px' }}>Authority Load</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '4px' }}>14 Active Decisions</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Recommended Maximum: 10</div>
            </div>

            <button onClick={() => setIsAuthModalOpen(true)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'white', color: 'var(--color-text-main)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Change Authority</button>
            <ChangeAuthorityModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSelectAuthority={(name) => handleUpdateNode('authority', name)} />
          </div>
        )}

        {activeTab === 'PERFORMANCE' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Avg Response</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-text-main)' }}>4.2 <span style={{ fontSize: '12px', fontWeight: 600 }}>Hours</span></div>
              </div>
              <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Approval Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-success)' }}>92%</div>
              </div>
              <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Escalation Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-warning)' }}>8%</div>
              </div>
              <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Current Queue</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-text-main)' }}>14</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Activity size={14} color="#3B82F6" />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#3B82F6', textTransform: 'uppercase' }}>Performance Insight</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-main)', margin: 0, lineHeight: 1.4 }}>Response time increased 18% this month due to increased engineering approval volume.</p>
            </div>
          </div>
        )}

        {activeTab === 'HISTORY' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '16px', top: '8px', bottom: '8px', width: '2px', backgroundColor: 'var(--color-border)' }}></div>
            
            <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                <Cog size={16} />
              </div>
              <div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-main)', margin: '0 0 4px 0', lineHeight: 1.4 }}>Budget threshold updated from $25,000 to $50,000</p>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Modified by Kanishka Suthar • 2 hours ago</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                <User size={16} />
              </div>
              <div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-main)', margin: '0 0 4px 0', lineHeight: 1.4 }}>Authority changed from Michael Scott to David Chen</p>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Modified by Admin System • July 12, 2026</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                <Play size={16} />
              </div>
              <div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-main)', margin: '0 0 4px 0', lineHeight: 1.4 }}>Node added to Budget Approval Flow</p>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>June 28, 2026</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Inspector;
