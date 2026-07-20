import React from 'react';
import Card from '../common/Card';
import { Maximize2, Network } from 'lucide-react';

const InteractiveOrgMap = () => {
  return (
    <Card style={{ padding: '24px', marginTop: '24px', backgroundColor: 'var(--color-surface)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Network size={18} color="var(--color-primary)" /> Interactive Organization Map
        </h3>
        <button className="icon-btn hover:bg-slate-200" style={{ padding: 6, borderRadius: '50%', border: 'none', background: 'transparent' }}>
          <Maximize2 size={16} color="var(--color-text-muted)" />
        </button>
      </div>

      <div style={{ height: 200, borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'white', position: 'relative', overflow: 'hidden', backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 0)', backgroundSize: '20px 20px', cursor: 'grab' }}>
        
        {/* Mock Map Nodes */}
        <div style={{ position: 'absolute', top: '20%', left: '45%', width: 30, height: 30, borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 800, cursor: 'pointer' }} className="hover:scale-125 transition-transform" title="Executive Board (Headcount: 5, Budget: $1.2M)">
          EX
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '30%', width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '9px', fontWeight: 800, cursor: 'pointer' }} className="hover:scale-125 transition-transform" title="Engineering (Headcount: 142, Budget: $8.4M)">
          EN
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '60%', width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '9px', fontWeight: 800, cursor: 'pointer' }} className="hover:scale-125 transition-transform" title="Marketing (Headcount: 45, Budget: $3.2M)">
          MK
        </div>

        {/* Lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <path d="M 45% 20% L 30% 50%" stroke="var(--color-border)" strokeWidth="2" fill="none" />
          <path d="M 45% 20% L 60% 50%" stroke="var(--color-border)" strokeWidth="2" fill="none" />
        </svg>

        <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.8)', padding: '2px 6px', borderRadius: 4 }}>
          Hover node for point-in-time metrics. Click to focus.
        </div>
      </div>
    </Card>
  );
};

export default InteractiveOrgMap;
