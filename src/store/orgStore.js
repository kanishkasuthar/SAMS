import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import dagre from 'dagre';
import { initialNodes, initialEdges } from '../data/orgData';
import { 
  DEPARTMENTS_DATA, 
  INTELLIGENCE_LOGS, 
  VERSIONS_DATA, 
  ORG_INSIGHTS, 
  PEOPLE_DIRECTORY,
  ROLES_DATA,
  REPORTS_DATA,
  SESSIONS_REPLAY_DATA,
  NOTIFICATIONS_DATA,
  USERS_DATA,
  KPI_DATA,
  ALL_PROJECTS,
  RESPONSIBILITIES_DATA,
  DECISION_FLOWS_DATA,
  SCORECARD_DATA,
  AI_SUMMARY_DATA,
  RECOMMENDATIONS_DATA,
  MANAGER_WORKLOAD_DATA,
  FORECAST_DATA,
  DEPT_HEALTH_DATA,
  PROJECT_IMPACT_DATA,
  QUALITY_CHECK_DATA,
  SIMULATOR_DATA,
  ANALYTICS_DATA
} from '../data/mockData';

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Set layout direction to Top-to-Bottom
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 80, ranksep: 120 });

  nodes.forEach((node) => {
    // We adjust height based on node type to be safe. Standard nodes are ~100px.
    const nodeHeight = node.data.type === 'department' ? 140 : 120;
    dagreGraph.setNode(node.id, { width: 280, height: nodeHeight });
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
  auditLogs: INTELLIGENCE_LOGS,
  versions: VERSIONS_DATA,
  insights: ORG_INSIGHTS,
  people: PEOPLE_DIRECTORY,
  roles: ROLES_DATA,
  reports: REPORTS_DATA,
  sessions: SESSIONS_REPLAY_DATA,
  notifications: NOTIFICATIONS_DATA,
  users: USERS_DATA,
  kpis: KPI_DATA,
  projects: ALL_PROJECTS,
  responsibilities: RESPONSIBILITIES_DATA,
  decisionFlows: DECISION_FLOWS_DATA,
  scorecardData: SCORECARD_DATA,
  aiSummaryData: AI_SUMMARY_DATA,
  recommendationsData: RECOMMENDATIONS_DATA,
  managerWorkloadData: MANAGER_WORKLOAD_DATA,
  forecastData: FORECAST_DATA,
  deptHealthData: DEPT_HEALTH_DATA,
  projectImpactData: PROJECT_IMPACT_DATA,
  qualityCheckData: QUALITY_CHECK_DATA,
  simulatorData: SIMULATOR_DATA,
  analyticsData: ANALYTICS_DATA,
  
  employeeHistory: [],
  
  // History for Undo/Redo
  pastStates: [],
  futureStates: [],

  // Analytics & KPIs for Bottom Bar
  orgScore: 88,
  excelSyncStatus: 'Synced',

  saveHistory: () => set((state) => {
    // Save only the essential structural state to history
    const snapshot = {
      nodes: state.nodes,
      edges: state.edges,
      departments: state.departments,
      employeeHistory: state.employeeHistory,
      versions: state.versions,
      auditLogs: state.auditLogs
    };
    return {
      pastStates: [snapshot, ...state.pastStates].slice(0, 50), // Keep last 50 states
      futureStates: []
    };
  }),

  undo: () => set((state) => {
    if (state.pastStates.length === 0) return state;
    
    const previous = state.pastStates[0];
    const newPast = state.pastStates.slice(1);
    
    const currentSnapshot = {
      nodes: state.nodes,
      edges: state.edges,
      departments: state.departments,
      employeeHistory: state.employeeHistory,
      versions: state.versions,
      auditLogs: state.auditLogs
    };

    return {
      ...previous,
      pastStates: newPast,
      futureStates: [currentSnapshot, ...state.futureStates]
    };
  }),

  redo: () => set((state) => {
    if (state.futureStates.length === 0) return state;
    
    const next = state.futureStates[0];
    const newFuture = state.futureStates.slice(1);
    
    const currentSnapshot = {
      nodes: state.nodes,
      edges: state.edges,
      departments: state.departments,
      employeeHistory: state.employeeHistory,
      versions: state.versions,
      auditLogs: state.auditLogs
    };

    return {
      ...next,
      pastStates: [currentSnapshot, ...state.pastStates],
      futureStates: newFuture
    };
  }),

  // React Flow handlers (Do not save history on every pixel move)
  onNodesChange: (changes) => set((state) => ({ 
    nodes: applyNodeChanges(changes, state.nodes) 
  })),
  onEdgesChange: (changes) => set((state) => ({ 
    edges: applyEdgeChanges(changes, state.edges) 
  })),
  onConnect: (connection) => {
    get().saveHistory();
    set((state) => {
      const newEdge = {
        ...connection,
        id: `e${connection.source}-${connection.target}-${Date.now()}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#4F46E5', strokeWidth: 3 }
      };
      
      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Reporting Line Added',
        user: 'System Admin',
        details: `Connected nodes in hierarchy`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };

      return {
        edges: [...state.edges, newEdge],
        auditLogs: [newAuditLog, ...state.auditLogs]
      };
    });
  },

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
    get().saveHistory();
    set((state) => {
      const newNodes = state.nodes.filter(n => n.id !== nodeId);
      const newEdges = state.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
      
      const { layoutedNodes, layoutedEdges } = getLayoutedElements(newNodes, newEdges);
      return { nodes: layoutedNodes, edges: layoutedEdges };
    });
  },

  fillPosition: (nodeId, employeeData) => {
    get().saveHistory();
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
    const state = get();
    const { nodes, edges } = state;
    const employeeNode = nodes.find(n => n.id === employeeNodeId);
    const newManagerNode = nodes.find(n => n.id === newManagerNodeId);
    
    if (!employeeNode || !newManagerNode) return;

    // Check Circular Reporting (prevent drop)
    let currentManagerId = newManagerNodeId;
    while (currentManagerId) {
      if (currentManagerId === employeeNodeId) {
        throw new Error('Circular reporting detected.');
      }
      const edgeToManager = edges.find(e => e.target === currentManagerId);
      currentManagerId = edgeToManager ? edgeToManager.source : null;
    }

    get().saveHistory();
    set((state) => {
      const { nodes, edges, auditLogs, versions, departments } = state;
      
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

  updateEmployee: (nodeId, updatedData) => {
    get().saveHistory();
    set((state) => {
      const { nodes, auditLogs, versions } = state;
      const employeeNode = nodes.find(n => n.id === nodeId);
      if (!employeeNode) return state;

      const newNodes = nodes.map(n => {
        if (n.id === nodeId) {
          return { ...n, data: { ...n.data, ...updatedData } };
        }
        return n;
      });

      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Profile Updated',
        user: 'System Admin',
        details: `Updated profile for ${updatedData.name || employeeNode.data.name}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };

      const newVersion = {
        id: `v3.2.${state.versions.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        author: 'System Admin',
        type: 'Profile Update',
        changes: `Updated profile for ${updatedData.name || employeeNode.data.name}`,
        active: true
      };
      
      const updatedVersions = versions.map(v => ({ ...v, active: false }));

      return {
        nodes: newNodes,
        auditLogs: [newAuditLog, ...auditLogs],
        versions: [newVersion, ...updatedVersions]
      };
    });
  },

  addEmployee: (employeeData, managerId) => {
    get().saveHistory();
    set((state) => {
      const { nodes, edges, auditLogs, versions } = state;
      const managerNode = nodes.find(n => n.id === managerId);
      
      const newNodeId = `emp-${Date.now()}`;
      const newNode = {
        id: newNodeId,
        type: 'orgNode',
        position: managerNode ? { x: managerNode.position.x + (Math.random() * 200 - 100), y: managerNode.position.y + 160 } : { x: 0, y: 0 },
        data: {
          ...employeeData,
          isVacant: false,
          teamSize: 0,
        }
      };

      const newNodes = [...nodes, newNode];
      const newEdges = [...edges];

      if (managerId) {
        newEdges.push({
          id: `e${managerId}-${newNodeId}`,
          source: managerId,
          target: newNodeId,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#4F46E5', strokeWidth: 3 }
        });
        
        // Update manager's team size
        const managerIndex = newNodes.findIndex(n => n.id === managerId);
        if (managerIndex !== -1) {
          newNodes[managerIndex] = {
            ...newNodes[managerIndex],
            data: {
              ...newNodes[managerIndex].data,
              teamSize: (newNodes[managerIndex].data.teamSize || 0) + 1
            }
          };
        }
      }

      const { layoutedNodes: finalNodes, layoutedEdges: finalEdges } = getLayoutedElements(newNodes, newEdges);

      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Employee Added',
        user: 'System Admin',
        details: `Added ${employeeData.name} as ${employeeData.designation}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };

      const newVersion = {
        id: `v3.2.${state.versions.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        author: 'System Admin',
        type: 'New Hire',
        changes: `Added ${employeeData.name} to hierarchy`,
        active: true
      };

      return {
        nodes: finalNodes,
        edges: finalEdges,
        auditLogs: [newAuditLog, ...auditLogs],
        versions: [newVersion, ...versions.map(v => ({...v, active: false}))]
      };
    });
    get().recalculateInsights();
  },

  archiveEmployee: (nodeId) => {
    // Check if employee has direct reports
    const state = get();
    const hasReports = state.edges.some(e => e.source === nodeId);
    if (hasReports) {
      throw new Error("Cannot archive an employee who has direct reports. Reassign the reports first.");
    }

    get().saveHistory();
    set((state) => {
      const { nodes, edges, auditLogs, versions } = state;
      const employeeNode = nodes.find(n => n.id === nodeId);
      
      const newNodes = nodes.filter(n => n.id !== nodeId);
      const newEdges = edges.filter(e => e.source !== nodeId && e.target !== nodeId);
      
      // Update former manager's team size
      const managerEdge = edges.find(e => e.target === nodeId);
      if (managerEdge) {
        const managerNode = newNodes.find(n => n.id === managerEdge.source);
        if (managerNode) {
          managerNode.data.teamSize = Math.max(0, (managerNode.data.teamSize || 1) - 1);
        }
      }

      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Employee Archived',
        user: 'System Admin',
        details: `Archived ${employeeNode?.data.name || 'Unknown'}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Warning'
      };

      const newVersion = {
        id: `v3.2.${state.versions.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        author: 'System Admin',
        type: 'Offboarding',
        changes: `Archived ${employeeNode?.data.name || 'Unknown'}`,
        active: true
      };

      const { layoutedNodes: finalNodes, layoutedEdges: finalEdges } = getLayoutedElements(newNodes, newEdges);

      return {
        nodes: finalNodes,
        edges: finalEdges,
        auditLogs: [newAuditLog, ...auditLogs],
        versions: [newVersion, ...versions.map(v => ({...v, active: false}))]
      };
    });
    get().recalculateInsights();
  },

  duplicateEmployee: (nodeId) => {
    get().saveHistory();
    set((state) => {
      const { nodes, edges, auditLogs, versions } = state;
      const nodeToCopy = nodes.find(n => n.id === nodeId);
      if (!nodeToCopy) return state;

      const managerEdge = edges.find(e => e.target === nodeId);
      const managerId = managerEdge ? managerEdge.source : null;

      const newNodeId = `emp-${Date.now()}`;
      const newNode = {
        id: newNodeId,
        type: 'orgNode',
        position: { x: nodeToCopy.position.x + 100, y: nodeToCopy.position.y },
        data: {
          ...nodeToCopy.data,
          name: `${nodeToCopy.data.name} (Copy)`,
          teamSize: 0,
        }
      };

      const newNodes = [...nodes, newNode];
      const newEdges = [...edges];

      if (managerId) {
        newEdges.push({
          id: `e${managerId}-${newNodeId}`,
          source: managerId,
          target: newNodeId,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#4F46E5', strokeWidth: 3 }
        });
        
        // Update manager's team size
        const managerNode = newNodes.find(n => n.id === managerId);
        if (managerNode) {
          managerNode.data.teamSize = (managerNode.data.teamSize || 0) + 1;
        }
      }

      const { layoutedNodes: finalNodes, layoutedEdges: finalEdges } = getLayoutedElements(newNodes, newEdges);

      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Employee Duplicated',
        user: 'System Admin',
        details: `Duplicated profile for ${nodeToCopy.data.name}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };

      return {
        nodes: finalNodes,
        edges: finalEdges,
        auditLogs: [newAuditLog, ...auditLogs]
      };
    });
  },

  revokeSession: (sessionId) => {
    set((state) => {
      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Session Revoked',
        user: 'System Admin',
        details: `Revoked session ${sessionId}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Warning'
      };
      return {
        sessions: state.sessions.filter(s => s.id !== sessionId),
        auditLogs: [newAuditLog, ...state.auditLogs]
      };
    });
  },

  addVersionAndLog: (version, auditLog) => {
    set((state) => {
      const updatedVersions = state.versions.map(v => ({...v, active: false}));
      return {
        versions: [version, ...updatedVersions],
        auditLogs: [auditLog, ...state.auditLogs]
      };
    });
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
