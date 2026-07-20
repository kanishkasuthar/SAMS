import React, { useMemo } from 'react';
import { Network, Plus, Minus, Maximize2, GitMerge, Users, Shield, DollarSign, Activity, Settings2 } from 'lucide-react';

const NODE_W = 320;
const NODE_H = 160;
const GAP_X = 50;
const GAP_Y = 100;

const computeTree = (node, depth = 0) => {
  if (!node.children || node.children.length === 0) {
    return { ...node, depth, subtreeWidth: NODE_W, children: [] };
  }
  let subtreeWidth = 0;
  const newChildren = node.children.map((child, i) => {
    const c = computeTree(child, depth + 1);
    subtreeWidth += c.subtreeWidth + (i > 0 ? GAP_X : 0);
    return c;
  });
  subtreeWidth = Math.max(NODE_W, subtreeWidth);
  return { ...node, depth, subtreeWidth, children: newChildren };
};

const assignPositions = (node, startX = 0, startY = 0) => {
  const x = startX + (node.subtreeWidth - NODE_W) / 2;
  const y = startY;
  
  let childX = startX;
  const newChildren = node.children.map(child => {
    const c = assignPositions(child, childX, startY + NODE_H + GAP_Y);
    childX += child.subtreeWidth + GAP_X;
    return c;
  });
  
  return { ...node, x, y, children: newChildren, isVisible: true };
};

const flattenNodes = (node, list = []) => {
  if (!node.isVisible && node !== list[0]) return list; // if parent collapsed, hide children
  list.push(node);
  if (node.isExpanded !== false) {
    node.children.forEach(c => flattenNodes(c, list));
  }
  return list;
};

// Mock Tree Data Structure
const baselineTree = {
  id: 't-1', name: 'Executive Board', manager: 'Sarah (CEO)', employees: 12, score: 98, budget: '$2.5M', role: 'Executive', status: 'unchanged', children: [
    { id: 't-2', name: 'Engineering', manager: 'David (VP)', employees: 145, score: 92, budget: '$14.2M', role: 'Department', status: 'unchanged', children: [
      { id: 't-3', name: 'Frontend', manager: 'Alice (Dir)', employees: 42, score: 88, budget: '$4.1M', role: 'Team', status: 'unchanged' },
      { id: 't-4', name: 'Backend', manager: 'Bob (Dir)', employees: 68, score: 95, budget: '$6.8M', role: 'Team', status: 'unchanged' }
    ]},
    { id: 't-5', name: 'Product', manager: 'Emma (VP)', employees: 48, score: 85, budget: '$5.4M', role: 'Department', status: 'removed', children: [
      { id: 't-6', name: 'Design', manager: 'Charlie (Dir)', employees: 22, score: 90, budget: '$2.1M', role: 'Team', status: 'removed' }
    ]}
  ]
};

const targetTree = {
  id: 't-1', name: 'Executive Board', manager: 'Sarah (CEO)', employees: 12, score: 98, budget: '$2.5M', role: 'Executive', status: 'unchanged', children: [
    { id: 't-2', name: 'Engineering', manager: 'David (VP)', employees: 167, score: 94, budget: '$14.6M', role: 'Department', status: 'modified', tooltip: 'Budget +$400k, Headcount +22', children: [
      { id: 't-3', name: 'Frontend', manager: 'Alice (Dir)', employees: 42, score: 88, budget: '$4.1M', role: 'Team', status: 'unchanged' },
      { id: 't-4', name: 'Backend', manager: 'Bob (Dir)', employees: 68, score: 95, budget: '$6.8M', role: 'Team', status: 'unchanged' },
      { id: 't-6', name: 'Design', manager: 'Charlie (Dir)', employees: 22, score: 90, budget: '$2.1M', role: 'Team', status: 'transferred', tooltip: 'Transferred from Product' }
    ]},
    { id: 't-7', name: 'Data Science', manager: 'Fiona (VP)', employees: 18, score: 80, budget: '$3.2M', role: 'Department', status: 'added', children: [
      { id: 't-8', name: 'AI Labs', manager: 'George (Dir)', employees: 14, score: 85, budget: '$2.5M', role: 'Team', status: 'added' }
    ]}
  ]
};

const TreeNode = React.memo(({ node, isTarget, searchQuery, onToggleExpand, onContextMenu }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isSearched = searchQuery && (node.name.toLowerCase().includes(searchQuery.toLowerCase()) || node.manager.toLowerCase().includes(searchQuery.toLowerCase()));
  
  let borderColor = 'var(--color-border)';
  let bgColor = 'white';
  let badgeColor = 'var(--color-surface-hover)';
  let badgeText = 'var(--color-text-secondary)';
  let glow = 'none';
  
  // Base glow colors requested: Green, Red, Orange, Blue
  if (node.status === 'added') {
    borderColor = 'var(--color-success)';
    badgeColor = 'rgba(16, 185, 129, 0.1)';
    badgeText = 'var(--color-success)';
    glow = isHovered ? '0 0 16px rgba(16, 185, 129, 0.6)' : 'none';
  } else if (node.status === 'removed') {
    borderColor = 'var(--color-danger)';
    badgeColor = 'rgba(239, 68, 68, 0.1)';
    badgeText = 'var(--color-danger)';
    glow = isHovered ? '0 0 16px rgba(239, 68, 68, 0.6)' : 'none';
  } else if (node.status === 'modified') {
    borderColor = '#f97316'; // Orange
    badgeColor = 'rgba(249, 115, 22, 0.1)';
    badgeText = '#f97316';
    glow = isHovered ? '0 0 16px rgba(249, 115, 22, 0.6)' : 'none';
  } else if (node.status === 'transferred') {
    borderColor = '#3b82f6'; // Blue
    badgeColor = 'rgba(59, 130, 246, 0.1)';
    badgeText = '#3b82f6';
    glow = isHovered ? '0 0 16px rgba(59, 130, 246, 0.6)' : 'none';
  }

  if (isSearched) {
    glow = '0 0 0 4px var(--color-primary), 0 0 15px var(--color-primary)';
  } else if (isHovered && node.status === 'unchanged') {
    glow = '0 0 15px rgba(79, 70, 229, 0.2)';
    borderColor = 'var(--color-primary)';
  }

  // Use useCallback for event handlers to prevent inline creation
  const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = React.useCallback(() => setIsHovered(false), []);
  const handleDoubleClick = React.useCallback(() => onToggleExpand && onToggleExpand(node.id), [onToggleExpand, node.id]);
  const handleContextMenu = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onContextMenu) onContextMenu(e, node);
  }, [onContextMenu, node]);

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      title={node.tooltip || ''}
      style={{
        position: 'absolute',
        left: node.x,
        top: node.y,
        width: NODE_W,
        height: NODE_H,
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '12px',
        boxShadow: glow || 'var(--shadow-sm)',
        transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out, border-color 0.15s ease-out',
        cursor: 'pointer',
        zIndex: isHovered ? 100 : 10,
        opacity: node.status === 'removed' ? 0.7 : 1,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible'
      }}
    >
      {isHovered && node.tooltip && (
        <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 12, padding: '12px 16px', backgroundColor: 'var(--color-text-main)', color: 'white', borderRadius: 8, fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 1000, boxShadow: 'var(--shadow-xl)', pointerEvents: 'none' }}>
          {node.tooltip}
          <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid var(--color-text-main)' }}></div>
        </div>
      )}
      
      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-surface-hover)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: 'var(--color-surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings2 size={14} color="var(--color-text-muted)" />
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', textDecoration: node.status === 'removed' ? 'line-through' : 'none' }}>
            {node.name}
          </div>
        </div>
        <div style={{ fontSize: '10px', fontWeight: 800, color: badgeText, backgroundColor: badgeColor, padding: '2px 6px', borderRadius: 12, textTransform: 'uppercase' }}>
          {node.status}
        </div>
      </div>
      
      <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
          {node.manager}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              <Users size={14} /> {node.employees}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              <DollarSign size={14} /> {node.budget}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', color: node.score >= 90 ? 'var(--color-success)' : 'var(--color-warning)', fontWeight: 700 }}>
            <Shield size={14} /> {node.score}
          </div>
        </div>
      </div>
    </div>
  );
});

const SVGLinks = React.memo(({ rootNode }) => {
  const links = useMemo(() => {
    const paths = [];
    const traverse = (node) => {
      if (node.children) {
        node.children.forEach(child => {
          if (!child.isVisible) return; // don't draw links to collapsed nodes

          const startX = node.x + NODE_W / 2;
          const startY = node.y + NODE_H;
          const endX = child.x + NODE_W / 2;
          const endY = child.y;
          
          const midY = startY + (endY - startY) / 2;
          const d = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
          
          let strokeColor = 'var(--color-border)';
          let strokeDasharray = 'none';
          
          if (child.status === 'added') strokeColor = 'var(--color-success)';
          if (child.status === 'removed') strokeColor = 'var(--color-danger)';
          if (child.status === 'transferred') {
            strokeColor = 'var(--color-warning)';
            strokeDasharray = '4 4';
          }

          paths.push(
            <path 
              key={`${node.id}-${child.id}`}
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={2}
              strokeDasharray={strokeDasharray}
            />
          );
          traverse(child);
        });
      }
    };
    traverse(rootNode);
    return paths;
  }, [rootNode]);

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: 4000, height: 4000, overflow: 'visible', pointerEvents: 'none', zIndex: 1 }}>
      {links}
    </svg>
  );
});

const TreeCanvas = ({ treeData, isTarget, searchQuery, transform = { x: 0, y: 0, scale: 1 }, setContextMenu }) => {
  const [collapsedNodes, setCollapsedNodes] = React.useState(new Set());
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const rootNode = useMemo(() => {
    const applyCollapsedState = (node) => {
      const isExpanded = !collapsedNodes.has(node.id);
      return { 
        ...node, 
        isExpanded,
        children: node.children ? node.children.map(applyCollapsedState) : [] 
      };
    };
    const statefulTree = applyCollapsedState(treeData);
    return assignPositions(computeTree(statefulTree), 40, 40);
  }, [treeData, collapsedNodes]);

  const nodes = useMemo(() => flattenNodes(rootNode), [rootNode]);

  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      if (n.x < minX) minX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.x + NODE_W > maxX) maxX = n.x + NODE_W;
      if (n.y + NODE_H > maxY) maxY = n.y + NODE_H;
    });
    if (minX === Infinity) return { width: 0, height: 0, minX: 0, minY: 0 };
    return { width: maxX - minX, height: maxY - minY, minX, minY };
  }, [nodes]);

  const baseTransform = useMemo(() => {
    if (containerSize.width === 0 || bounds.width === 0) return { x: 0, y: 0, scale: 1 };
    
    const availWidth = containerSize.width * 0.90;
    const availHeight = containerSize.height * 0.90;
    
    const scaleX = availWidth / bounds.width;
    const scaleY = availHeight / bounds.height;
    
    // Clamp between 0.3 and 2.0
    const scale = Math.max(0.3, Math.min(scaleX, scaleY, 2.0)); 
    
    const scaledTreeW = bounds.width * scale;
    const scaledTreeH = bounds.height * scale;
    
    const x = (containerSize.width - scaledTreeW) / 2 - (bounds.minX * scale);
    const y = (containerSize.height - scaledTreeH) / 2 - (bounds.minY * scale);
    
    return { x, y, scale };
  }, [containerSize, bounds]);

  const handleToggleExpand = React.useCallback((id) => {
    setCollapsedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleContextMenu = React.useCallback((e, node) => {
    setContextMenu({ x: e.clientX, y: e.clientY, node });
  }, [setContextMenu]);

  const finalTransform = {
    x: baseTransform.x + (transform?.x ?? 0),
    y: baseTransform.y + (transform?.y ?? 0),
    scale: baseTransform.scale * (transform?.scale ?? 1)
  };

  return (
    <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <div style={{ 
        position: 'absolute', 
        transform: `translate(${finalTransform.x}px, ${finalTransform.y}px) scale(${finalTransform.scale})`,
        transformOrigin: '0 0',
        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        width: 0, height: 0
      }}>
        <SVGLinks rootNode={rootNode} />
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'auto' }}>
          {nodes.map(node => (
            <TreeNode 
              key={node.id} 
              node={node} 
              isTarget={isTarget} 
              searchQuery={searchQuery}
              onToggleExpand={handleToggleExpand}
              onContextMenu={handleContextMenu}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

class TreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Tree rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px', textAlign: 'center', color: 'var(--color-text-main)' }}>
          <div style={{ color: 'var(--color-danger)', marginBottom: '16px' }}>
            <Activity size={32} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Visualization Unavailable</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>We encountered an error rendering this portion of the hierarchy.</p>
          <button onClick={() => this.setState({ hasError: false })} style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const TreePanel = ({ type, title, searchQuery, transform = { x: 0, y: 0, scale: 1 } }) => {
  const isTarget = type === 'target';
  const treeData = isTarget ? targetTree : baselineTree;
  const [contextMenu, setContextMenu] = React.useState(null);

  // Close context menu on click anywhere
  React.useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div style={{ flex: 1, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: isTarget ? 'var(--color-primary)' : 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {type === 'baseline' ? 'Baseline Organization' : 'Selected Snapshot'}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>{title}</div>
        </div>
        <div style={{ padding: '8px', backgroundColor: 'var(--color-bg)', borderRadius: '8px' }}>
          <Network size={20} color={isTarget ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
        </div>
      </div>

      {/* Canvas Container */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-bg)', backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 0)', backgroundSize: `${24 * (transform?.scale ?? 1)}px ${24 * (transform?.scale ?? 1)}px`, backgroundPosition: `${transform?.x ?? 0}px ${transform?.y ?? 0}px` }}>
        <TreeErrorBoundary>
          <TreeCanvas 
            treeData={treeData} 
            isTarget={isTarget} 
            searchQuery={searchQuery}
            transform={transform}
            setContextMenu={setContextMenu}
          />
        </TreeErrorBoundary>
        
        {/* Context Menu Overlay */}
        {contextMenu && (
          <div 
            style={{ 
              position: 'fixed', 
              top: contextMenu.y, 
              left: contextMenu.x, 
              backgroundColor: 'white', 
              border: '1px solid var(--color-border)', 
              borderRadius: '8px', 
              boxShadow: 'var(--shadow-xl)', 
              zIndex: 9999,
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '200px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px', padding: '0 8px' }}>
              {contextMenu.node.name}
            </div>
            <button className="context-menu-item" style={{ padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', borderRadius: '4px' }}>Open Department</button>
            <button className="context-menu-item" style={{ padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', borderRadius: '4px' }}>View Employees</button>
            <button className="context-menu-item" style={{ padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', borderRadius: '4px' }}>View History</button>
            <div style={{ height: '1px', backgroundColor: 'var(--color-surface-hover)', margin: '4px 0' }}></div>
            <button className="context-menu-item" style={{ padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', borderRadius: '4px' }}>AI Analysis</button>
            <button className="context-menu-item" style={{ padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', borderRadius: '4px' }}>Compare Department</button>
            <div style={{ height: '1px', backgroundColor: 'var(--color-surface-hover)', margin: '4px 0' }}></div>
            <button className="context-menu-item" style={{ padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-warning)', borderRadius: '4px' }}>Rollback Department</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreePanel;
