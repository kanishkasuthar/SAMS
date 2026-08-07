import React, { useState, useCallback, useRef } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, addEdge, useReactFlow, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DecisionNode from './nodes/DecisionNode';
import CanvasToolbar from './CanvasToolbar';
import NodeContextMenu from './modals/NodeContextMenu';
import dagre from 'dagre';

const nodeTypes = {
  decision: DecisionNode,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 100 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 280, height: 180 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = direction === 'TB' ? 'top' : 'left';
    node.sourcePosition = direction === 'TB' ? 'bottom' : 'right';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - 140,
      y: nodeWithPosition.y - 90,
    };
    return node;
  });

  return { nodes, edges };
};

const FlowCanvas = ({ nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange, onConnect, setSelectedNodeId, setSimulationState, isHeatmapActive, isPulseActive, onUndo, onRedo, canUndo, canRedo }) => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition, fitView, getNode } = useReactFlow();
  const [menu, setMenu] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');
      if (typeof type === 'undefined' || !type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${Date.now()}`,
        type: 'decision',
        position,
        data: {
          type,
          title: label,
          summary: 'New component added to flow',
          status: 'Active',
          metrics: [],
          heatmap: 'healthy',
          isPulsing: false,
          shadowDetected: false
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const handleAddNodeModal = (type, label) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: 'decision',
      position: { x: 250, y: 100 },
      data: {
        type,
        title: label,
        summary: 'New component added via toolbar',
        status: 'Active',
        metrics: [],
        heatmap: 'healthy',
        isPulsing: false,
        shadowDetected: false
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onAutoLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    setTimeout(() => fitView({ padding: 0.2 }), 100);
  }, [nodes, edges, setNodes, setEdges, fitView]);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const pane = reactFlowWrapper.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY - pane.top,
        left: event.clientX < pane.width - 200 && event.clientX - pane.left,
        right: event.clientX >= pane.width - 200 && pane.width - (event.clientX - pane.left),
        bottom: event.clientY >= pane.height - 200 && pane.height - (event.clientY - pane.top),
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const handleMenuClick = (action) => {
    // Select the node so the inspector opens to the right tab, or trigger an action
    setSelectedNodeId(menu.id);
    setMenu(null);
  };

  const handleDuplicate = (id) => {
    const node = getNode(id);
    if (!node) return;
    const posX = node.position?.x ?? 0;
    const posY = node.position?.y ?? 0;
    const newNode = {
      ...node,
      id: `node_${Date.now()}`,
      position: { x: posX + 50, y: posY + 50 }
    };
    setNodes(nds => nds.concat(newNode));
    setMenu(null);
  };

  const handleDelete = (id) => {
    setNodes(nds => nds.filter(n => n.id !== id));
    setEdges(eds => eds.filter(e => e.source !== id && e.target !== id));
    setMenu(null);
  };

  const handleDisable = (id) => {
    setNodes(nds => nds.map(n => n.id === id ? { ...n, data: { ...n.data, status: 'Disabled' } } : n));
    setMenu(null);
  };

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={() => setTimeout(() => fitView({ padding: 0.2 }), 100)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        onSelectionChange={(params) => {
          if (params.nodes.length > 0) {
            setSelectedNodeId(params.nodes[0].id);
          } else {
            setSelectedNodeId(null);
          }
        }}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--color-border)" gap={24} size={2} style={{ opacity: 0.5 }} />
        
        <Panel position="top-center" style={{ marginTop: '16px' }}>
          <CanvasToolbar 
            onAutoLayout={onAutoLayout}
            onFitView={() => fitView({ padding: 0.2 })}
            setSimulationState={setSimulationState}
            onAddNode={handleAddNodeModal}
            onUndo={onUndo}
            onRedo={onRedo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
        </Panel>
        {menu && <NodeContextMenu onClick={handleMenuClick} onDuplicate={handleDuplicate} onDelete={handleDelete} onDisable={handleDisable} {...menu} />}
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
