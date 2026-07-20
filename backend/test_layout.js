const { User, Department, Role } = require('./src/models');
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

  return { layoutedNodes, layoutedEdges: edges };
};

async function test() {
  const users = await User.findAll({
    include: [
      { model: Role },
      { model: Department, as: 'Department' }
    ]
  });

  const ceo = users.find(u => u.Role && (u.Role.name.toLowerCase().includes('ceo') || u.Role.name === 'Super Admin'));
  const departmentHeads = {};
  users.forEach(u => {
    if (u.Role && u.Role.name === 'Manager' && u.departmentId) {
      departmentHeads[u.departmentId] = u.id;
    }
  });

  const derivedUsers = users.map(u => {
    let rId = u.reportingManagerId;
    if (!rId && u.id !== ceo?.id) {
      if (u.Role && u.Role.name === 'Manager') {
        rId = ceo ? ceo.id : null;
      } else if (u.departmentId && departmentHeads[u.departmentId]) {
        rId = departmentHeads[u.departmentId];
      } else {
        rId = ceo ? ceo.id : null;
      }
    }
    return { ...u.toJSON(), reportingManagerId: rId };
  });

  const nodes = [];
  const edges = [];
  const deptsMap = new Map();

  derivedUsers.forEach(u => {
    if (u.Department) deptsMap.set(u.Department.id, u.Department);
  });

  Array.from(deptsMap.values()).forEach(dept => {
    nodes.push({ id: `dept-${dept.id}`, type: 'group', position: {x:0, y:0}, style: {} });
  });

  derivedUsers.forEach(u => {
    nodes.push({
      id: u.id,
      type: 'orgNode',
      parentId: u.Department ? `dept-${u.Department.id}` : undefined,
      position: { x: 0, y: 0 }
    });
    if (u.reportingManagerId) {
      edges.push({ source: u.reportingManagerId, target: u.id });
    }
  });

  try {
    const { layoutedNodes, layoutedEdges } = getLayoutedElements(nodes, edges);
    console.log("Success! Group count:", layoutedNodes.filter(n=>n.type==='group').length);
    console.log("OrgNode count:", layoutedNodes.filter(n=>n.type==='orgNode').length);
    console.log("Sample Group:", layoutedNodes.find(n=>n.type==='group'));
    console.log("Sample Child:", layoutedNodes.find(n=>n.type==='orgNode' && n.parentId));
  } catch (e) {
    console.error("Layout failed:", e);
  }
}
test();
