import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import dagre from 'dagre';
import { initialNodes, initialEdges } from '../data/orgData';
import { 
  DEPARTMENTS_DATA, 
  AUDIT_LOGS, 
  VERSIONS_DATA, 
  ORG_INSIGHTS, 
  PEOPLE_DIRECTORY,
  ROLES_DATA,
  REPORTS_DATA,
  SESSIONS_DATA,
  NOTIFICATIONS_DATA,
  USERS_DATA,
  KPI_DATA,
  ALL_PROJECTS
} from '../data/mockData';

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Set layout direction to Top-to-Bottom
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 50, ranksep: 100 });

  nodes.forEach((node) => {
    // OrgNode width is ~260, height is ~140
    dagreGraph.setNode(node.id, { width: 280, height: 160 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: nodeWithPosition.x - 280 / 2,
        y: nodeWithPosition.y - 160 / 2,
      },
    };
  });

  return { layoutedNodes, layoutedEdges: edges };
};

const { layoutedNodes: initNodes, layoutedEdges: initEdges } = getLayoutedElements(initialNodes, initialEdges);

export const useOrgStore = create((set, get) => ({
  nodes: initNodes,
  edges: initEdges,
  departments: DEPARTMENTS_DATA,
  auditLogs: AUDIT_LOGS,
  versions: VERSIONS_DATA,
  insights: ORG_INSIGHTS,
  people: PEOPLE_DIRECTORY,
  roles: ROLES_DATA,
  reports: REPORTS_DATA,
  sessions: SESSIONS_DATA,
  notifications: NOTIFICATIONS_DATA,
  users: USERS_DATA,
  kpis: KPI_DATA,
  projects: ALL_PROJECTS,
  
  employeeHistory: [],

  // React Flow handlers
  onNodesChange: (changes) => set((state) => ({ 
    nodes: applyNodeChanges(changes, state.nodes) 
  })),
  onEdgesChange: (changes) => set((state) => ({ 
    edges: applyEdgeChanges(changes, state.edges) 
  })),

  addUser: (userData) => set((state) => ({
    users: [
      { id: `USR-${Date.now()}`, lastActive: 'Just now', ...userData },
      ...state.users
    ]
  })),

  updateProject: (id, projectData) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, ...projectData } : p)
  })),

  updateRole: (id, roleData) => set((state) => ({
    roles: state.roles.map(r => r.id === id ? { ...r, ...roleData } : r)
  })),

  updateDepartment: (id, deptData) => set((state) => ({
    departments: state.departments.map(d => d.id === id ? { ...d, ...deptData } : d)
  })),

  updateUser: (id, userData) => set((state) => ({
    users: state.users.map(u => u.id === id ? { ...u, ...userData } : u)
  })),

  // Core Actions
  deletePosition: (nodeId) => {
    set((state) => {
      const newNodes = state.nodes.filter(n => n.id !== nodeId);
      const newEdges = state.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
      
      const { layoutedNodes, layoutedEdges } = getLayoutedElements(newNodes, newEdges);
      return { nodes: layoutedNodes, edges: layoutedEdges };
    });
  },

  fillPosition: (nodeId, employeeData) => {
    set((state) => {
      const { nodes, auditLogs, versions } = state;
      
      const newNodes = nodes.map(n => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              isVacant: false,
              name: employeeData.name,
              department: employeeData.department,
            }
          };
        }
        return n;
      });

      const positionName = nodes.find(n => n.id === nodeId)?.data.designation || 'Position';

      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Position Filled',
        user: 'System Admin',
        details: `${employeeData.name} was assigned to ${positionName}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };

      const newVersion = {
        id: `v3.2.${state.versions.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        author: 'System Admin',
        type: 'Onboarding',
        changes: `Filled ${positionName} with ${employeeData.name}`,
        active: true
      };
      
      const updatedVersions = versions.map(v => ({ ...v, active: false }));
      
      const historyRecord = {
        employeeId: nodeId, // Treating the node ID as the employee slot for simplicity
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        type: 'Onboarding',
        oldPosition: 'External Candidate',
        newPosition: positionName,
        oldManager: 'N/A',
        newManager: 'N/A',
        comments: 'New hire assigned to position.'
      };

      return {
        nodes: newNodes,
        auditLogs: [newAuditLog, ...auditLogs],
        versions: [newVersion, ...updatedVersions],
        employeeHistory: [historyRecord, ...state.employeeHistory],
      };
    });
  },

  moveEmployee: (employeeNodeId, newManagerNodeId, reason, comments) => {
    set((state) => {
      const { nodes, edges, auditLogs, versions, departments } = state;
      
      const employeeNode = nodes.find(n => n.id === employeeNodeId);
      const newManagerNode = nodes.find(n => n.id === newManagerNodeId);
      
      if (!employeeNode || !newManagerNode) return state;

      // Check Circular Reporting (prevent drop)
      let currentManagerId = newManagerNodeId;
      while (currentManagerId) {
        if (currentManagerId === employeeNodeId) {
          throw new Error('Circular reporting detected.');
        }
        const edgeToManager = edges.find(e => e.target === currentManagerId);
        currentManagerId = edgeToManager ? edgeToManager.source : null;
      }
      
      const oldManagerEdge = edges.find(e => e.target === employeeNodeId);
      const oldManagerNode = oldManagerEdge ? nodes.find(n => n.id === oldManagerEdge.source) : null;
      
      const timestamp = new Date().toLocaleString('en-US', { hour12: false });
      const versionNumber = `v3.2.${versions.length + 1}`;
      
      // 1. POSITION LIFECYCLE: Leave a vacant node
      const vacantNodeId = `vacant-${Date.now()}`;
      const vacantNode = {
        ...employeeNode,
        id: vacantNodeId,
        data: {
          ...employeeNode.data,
          name: 'Vacant Position',
          status: 'Vacant',
          isVacant: true,
          photo: null
        }
      };
      
      // 2. MOVE EMPLOYEE: Update employee node data
      const updatedEmployeeNode = {
        ...employeeNode,
        data: {
          ...employeeNode.data,
          department: newManagerNode.data.department,
          designation: newManagerNode.data.designation.includes('Manager') ? 'Director' : 'Manager' // mock auto-promotion for demo
        }
      };
      
      // Visual placement slightly offset below new manager
      updatedEmployeeNode.position = { x: newManagerNode.position.x + (Math.random() * 100 - 50), y: newManagerNode.position.y + 150 };

      // 3. UPDATE EDGES
      const newEdges = edges.filter(e => e.id !== oldManagerEdge?.id);
      
      if (oldManagerEdge) {
        newEdges.push({
          id: `e${oldManagerNode.id}-${vacantNodeId}`,
          source: oldManagerNode.id,
          target: vacantNodeId,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#94A3B8', strokeWidth: 2, strokeDasharray: '5, 5' }
        });
      }
      
      newEdges.push({
        id: `e${newManagerNode.id}-${employeeNode.id}`,
        source: newManagerNode.id,
        target: employeeNode.id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#4F46E5', strokeWidth: 3 }
      });

      // 4. UPDATE TEAM SIZES
      const newNodes = nodes.map(n => {
        if (n.id === oldManagerNode?.id) {
          return { ...n, data: { ...n.data, teamSize: Math.max(0, (n.data.teamSize || 1) - 1) } };
        }
        if (n.id === newManagerNode.id) {
          return { ...n, data: { ...n.data, teamSize: (n.data.teamSize || 0) + 1 } };
        }
        if (n.id === employeeNode.id) {
          return updatedEmployeeNode;
        }
        return n;
      });
      newNodes.push(vacantNode);

      // 5. UPDATE DEPARTMENTS
      const newDepartments = departments.map(d => {
        if (d.name === employeeNode.data.department && d.name !== newManagerNode.data.department) {
          return { ...d, employees: Math.max(0, d.employees - 1) };
        }
        if (d.name === newManagerNode.data.department && d.name !== employeeNode.data.department) {
          return { ...d, employees: d.employees + 1 };
        }
        return d;
      });

      // 6. CREATE AUDIT LOG
      const newAuditLog = {
        id: `AL-${9000 + auditLogs.length}`,
        timestamp,
        user: 'Admin System',
        action: 'Position Changed',
        details: `${employeeNode.data.name} moved to ${newManagerNode.data.department}`,
        ip: '10.0.0.1'
      };

      // 7. CREATE VERSION
      const newVersion = {
        id: versionNumber,
        date: new Date().toISOString().split('T')[0],
        author: 'System',
        type: 'Restructure',
        changes: `${employeeNode.data.name} moved to ${newManagerNode.data.name}. Reason: ${reason}`,
        active: true
      };
      const updatedVersions = versions.map(v => ({ ...v, active: false }));
      
      // 8. RECORD HISTORY
      const historyRecord = {
        id: `H-${Date.now()}`,
        employeeId: employeeNode.id,
        date: timestamp,
        type: reason,
        oldPosition: employeeNode.data.designation,
        newPosition: updatedEmployeeNode.data.designation,
        oldDepartment: employeeNode.data.department,
        newDepartment: updatedEmployeeNode.data.department,
        oldManager: oldManagerNode?.data.name || 'None',
        newManager: newManagerNode.data.name,
        comments
      };

      const { layoutedNodes: finalNodes, layoutedEdges: finalEdges } = getLayoutedElements(newNodes, newEdges);

      return {
        nodes: finalNodes,
        edges: finalEdges,
        departments: newDepartments,
        auditLogs: [newAuditLog, ...auditLogs],
        versions: [newVersion, ...updatedVersions],
        employeeHistory: [historyRecord, ...state.employeeHistory],
      };
    });
    
    get().recalculateInsights();
  },

  recalculateInsights: () => {
    set((state) => {
      const { nodes } = state;
      const vacantCount = nodes.filter(n => n.data.isVacant).length;
      const newInsights = [...state.insights];
      
      if (vacantCount > 0) {
        const existing = newInsights.find(i => i.type === 'vacant');
        if (existing) {
          existing.count = vacantCount;
          existing.description = `${vacantCount} positions are currently vacant.`;
        } else {
          newInsights.unshift({
            id: Date.now(),
            type: 'vacant',
            title: 'Vacant Positions',
            description: `${vacantCount} positions are currently vacant.`,
            count: vacantCount,
            severity: 'warning'
          });
        }
      }
      return { insights: newInsights };
    });
  }
}));
