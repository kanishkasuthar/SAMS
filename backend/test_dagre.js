const dagre = require('dagre');

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 80, ranksep: 120 });

  nodes.filter(n => n.type !== 'group').forEach((node) => {
    dagreGraph.setNode(node.id, { width: 280, height: 120 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    if (node.type === 'group') return node;

    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 280 / 2,
        y: nodeWithPosition.y - 120 / 2,
      },
    };
  });

  layoutedNodes.filter(n => n.type === 'group').forEach(group => {
    const children = layoutedNodes.filter(n => n.parentId === group.id);
    if (children.length > 0) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      children.forEach(c => {
        if (c.position.x < minX) minX = c.position.x;
        if (c.position.y < minY) minY = c.position.y;
        if (c.position.x + 280 > maxX) maxX = c.position.x + 280;
        if (c.position.y + 120 > maxY) maxY = c.position.y + 120;
      });
      const padding = 40;
      group.position = { x: minX - padding, y: minY - padding - 40 }; 
      group.style = { ...group.style, width: maxX - minX + padding * 2, height: maxY - minY + padding * 2 + 40 };
      
      children.forEach(c => {
        c.position.x -= group.position.x;
        c.position.y -= group.position.y;
      });
    }
  });

  return layoutedNodes;
};

const nodes = [
  { id: 'dept-1', type: 'group', position: { x: 0, y: 0 } },
  { id: '1', type: 'orgNode', parentId: 'dept-1', position: { x: 0, y: 0 } },
  { id: '2', type: 'orgNode', parentId: 'dept-1', position: { x: 0, y: 0 } }
];
const edges = [
  { source: '1', target: '2' }
];

const run1 = getLayoutedElements(nodes, edges);
console.log('Run 1 Group:', run1.find(n => n.type === 'group').position);
console.log('Run 1 Children:', run1.filter(n => n.type !== 'group').map(n => n.position));

const run2 = getLayoutedElements(run1, edges);
console.log('Run 2 Group:', run2.find(n => n.type === 'group').position);
console.log('Run 2 Children:', run2.filter(n => n.type !== 'group').map(n => n.position));
