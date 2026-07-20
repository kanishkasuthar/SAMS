import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Zap, AlertCircle, Shield, Cog, CheckCircle2, User, Activity, AlertTriangle } from 'lucide-react';

const DecisionNode = ({ data, selected }) => {
  const { type, title, summary, authority, status, metrics, heatmap, isPulsing, shadowDetected } = data;

  let borderColor = 'var(--color-border)';
  let accentColor = 'var(--color-primary)';
  let bgColor = 'white';
  let Icon = Cog;
  let categoryLabel = 'COMPONENT';

  switch (type) {
    case 'trigger':
      accentColor = '#6366F1'; // Indigo
      Icon = Zap;
      categoryLabel = 'TRIGGER';
      break;
    case 'condition':
      accentColor = '#F59E0B'; // Amber
      Icon = AlertCircle;
      categoryLabel = 'CONDITION';
      break;
    case 'action':
    case 'authority':
      accentColor = '#14B8A6'; // Teal
      Icon = Shield;
      categoryLabel = 'AUTHORITY';
      break;
    case 'escalation':
      accentColor = '#EF4444'; // Red
      Icon = AlertTriangle;
      categoryLabel = 'ESCALATION';
      break;
    case 'automation':
      accentColor = '#3B82F6'; // Blue
      Icon = Cog;
      categoryLabel = 'AUTOMATION';
      break;
    case 'completed':
      accentColor = '#10B981'; // Green
      Icon = CheckCircle2;
      categoryLabel = 'COMPLETED';
      break;
    default:
      break;
  }

  // Handle Selection and Pulse
  if (selected) {
    borderColor = accentColor;
  }

  let boxStyles = {
    backgroundColor: bgColor,
    borderRadius: '12px',
    border: `1px solid ${borderColor}`,
    boxShadow: selected ? `0 0 0 2px ${accentColor}33, var(--shadow-md)` : 'var(--shadow-sm)',
    width: '280px',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    position: 'relative'
  };

  if (isPulsing) {
    boxStyles.boxShadow = `0 0 15px ${accentColor}, inset 0 0 10px ${accentColor}33`;
    boxStyles.borderColor = accentColor;
  }

  // Heatmap overriding styles
  if (heatmap === 'moderate') {
    boxStyles.borderColor = '#EAB308';
    boxStyles.boxShadow = '0 0 10px rgba(234, 179, 8, 0.3)';
  } else if (heatmap === 'high') {
    boxStyles.borderColor = '#F97316';
    boxStyles.boxShadow = '0 0 10px rgba(249, 115, 22, 0.3)';
  } else if (heatmap === 'critical') {
    boxStyles.borderColor = '#EF4444';
    boxStyles.boxShadow = '0 0 10px rgba(239, 68, 68, 0.5)';
  }

  return (
    <div style={boxStyles} className="decision-node">
      <Handle type="target" position={Position.Top} style={{ background: accentColor, width: 10, height: 10 }} />
      
      {/* Top accent bar */}
      <div style={{ height: '4px', backgroundColor: accentColor, width: '100%' }}></div>
      
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: accentColor }}>
            <Icon size={14} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{categoryLabel}</span>
          </div>
          {status === 'Active' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></div>}
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 6px 0', lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>{summary}</p>

        {authority && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-surface-hover)', padding: '8px', borderRadius: '6px', marginBottom: '12px' }}>
            <User size={14} color="var(--color-text-muted)" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Authority Owner</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-main)', fontWeight: 600 }}>{authority}</span>
            </div>
          </div>
        )}

        {/* Intelligence Indicators */}
        {(metrics || heatmap || shadowDetected) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
            {metrics?.map((m, idx) => (
              <span key={idx} style={{ fontSize: '10px', fontWeight: 700, backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                {m}
              </span>
            ))}
            {heatmap === 'critical' && (
              <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={10} /> BOTTLENECK
              </span>
            )}
            {shadowDetected && (
              <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={10} /> SHADOW
              </span>
            )}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: accentColor, width: 10, height: 10 }} />
      {/* Support parallel nodes with extra handles if needed */}
      {data.isParallel && (
        <>
          <Handle type="source" position={Position.Left} id="left" style={{ background: accentColor, width: 10, height: 10, top: 'auto', bottom: 20 }} />
          <Handle type="source" position={Position.Right} id="right" style={{ background: accentColor, width: 10, height: 10, top: 'auto', bottom: 20 }} />
        </>
      )}
    </div>
  );
};

export default DecisionNode;
