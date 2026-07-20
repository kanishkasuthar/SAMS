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
  ALL_PERMISSIONS,
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
import api from '../services/api';

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 80, ranksep: 120 });

  // Only layout org nodes in dagre, ignore group nodes for dagre layout
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
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: nodeWithPosition.x - 280 / 2,
        y: nodeWithPosition.y - 120 / 2,
      },
    };
  });

  // Calculate bounding boxes for group nodes based on children
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
      // Add padding
      const padding = 40;
      group.position = { x: minX - padding, y: minY - padding - 40 }; // Extra top padding for label
      group.style = { ...group.style, width: maxX - minX + padding * 2, height: maxY - minY + padding * 2 + 40 };
      
      // Make children relative to group
      children.forEach(c => {
        c.position.x -= group.position.x;
        c.position.y -= group.position.y;
      });
    }
  });

  return { layoutedNodes, layoutedEdges: edges };
};

const { layoutedNodes: initNodes, layoutedEdges: initEdges } = getLayoutedElements(initialNodes, initialEdges);

export const useOrgStore = create((set, get) => ({
  nodes: initNodes,
  edges: initEdges,
  departments: [],
  auditLogs: [],
  versions: VERSIONS_DATA,
  insights: ORG_INSIGHTS,
  people: [],
  roles: ROLES_DATA,
  allPermissions: ALL_PERMISSIONS,
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
  orgStats: {
    activeCount: 0,
    totalCount: 0,
    maxDepth: 0,
    vacantCount: 0,
    syncStatus: 'Synced'
  },
  overviewKPIs: {
    totalUsers: 0,
    totalDepartments: 0,
    pendingWorkflows: 0,
    unreadNotifications: 0
  },
  loading: false,
  error: null,

  fetchOverviewKPIs: async () => {
    try {
      const res = await api.get('/analytics/overview');
      set({ overviewKPIs: res.data.data });
    } catch (err) {
      console.error('Failed to fetch overview KPIs', err);
    }
  },

  fetchOrgChart: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/users/org-chart');
      const users = res.data.data.users;

      let depts = [];
      try {
        const deptsRes = await api.get('/departments');
        depts = deptsRes.data.data.departments;
      } catch (deptErr) {
        console.error('Failed to fetch departments inside org chart', deptErr);
      }

      // Build hierarchy
      const nodes = [];
      const edges = [];
      
      // Grouping by department from the database departments list
      depts.forEach(dept => {
        nodes.push({
          id: `dept-${dept.id}`,
          type: 'group',
          data: { label: dept.departmentName },
          style: {
            backgroundColor: (dept.color || '#4F46E5') + '20',
            border: `1px solid ${dept.color || '#4F46E5'}`,
            borderRadius: '12px',
            zIndex: -1
          },
          selectable: false
        });
      });

      users.forEach(u => {
        nodes.push({
          id: u.id,
          type: 'orgNode',
          parentId: u.Department ? `dept-${u.Department.id}` : undefined,
          data: {
            id: u.id,
            name: u.name,
            designation: u.designation || (u.Role ? u.Role.name : 'Employee'),
            department: u.Department ? u.Department.departmentName : 'Unassigned',
            photo: u.profileImage,
            status: u.status,
            type: u.Role?.name?.toLowerCase().includes('ceo') ? 'ceo' : 'employee',
            isVacant: false
          },
          position: { x: 0, y: 0 }
        });

        if (u.reportingManagerId) {
          edges.push({
            id: `e${u.reportingManagerId}-${u.id}`,
            source: u.reportingManagerId,
            target: u.id,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#94A3B8', strokeWidth: 2 }
          });
        }
      });
      
      // Determine which nodes have children
      nodes.forEach(n => {
        if (n.type === 'orgNode') {
          n.data.hasChildren = edges.some(e => e.source === n.id);
          n.data.isExpanded = true;
        }
      });

      const { layoutedNodes, layoutedEdges } = getLayoutedElements(nodes, edges);

      // Map database users to people directory
      const mappedPeople = users.map(u => {
        const directReportsCount = users.filter(usr => usr.reportingManagerId === u.id).length;
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone || '',
          role: u.designation || (u.Role ? u.Role.name : 'Employee'),
          department: u.Department ? u.Department.departmentName : 'Unassigned',
          status: u.status || 'Active',
          photo: u.profileImage,
          directReports: directReportsCount,
          assignedProjects: 1,
          workload: u.workload || 65,
          healthScore: u.healthScore || 95
        };
      });

      // Map departments
      const mappedDepts = depts.map(d => ({
        id: d.id,
        name: d.departmentName,
        head: d.DepartmentHead ? d.DepartmentHead.fullName : 'No Head Assigned',
        headId: d.departmentHeadId || '',
        budget: typeof d.budget === 'number' ? `$${(d.budget / 1000000).toFixed(1)}M` : d.budget || '$0M',
        description: d.description || '',
        signals: d.parentDepartmentId ? [] : ['TOP LEVEL'],
        dnaScores: { people: 80, authority: 75, project: 80, decision: 85, connection: 80 },
        dnaType: 'ORGANIZATIONAL CELL',
        authorityConcentration: 'MEDIUM',
        projectCount: 4,
        authorityScore: 80
      }));

      set({ 
        nodes: layoutedNodes, 
        edges: layoutedEdges, 
        people: mappedPeople, 
        departments: mappedDepts, 
        loading: false 
      });

    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

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

  // Global Activity Logger
  logActivity: (action, user, details, status = 'Success') => set((state) => {
    const newAuditLog = {
      id: `AL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      user,
      details,
      date: new Date().toISOString().split('T')[0],
      status
    };
    return { auditLogs: [newAuditLog, ...state.auditLogs] };
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

  updateProject: (id, projectData) => set((state) => {
    get().logActivity('Project Updated', state.currentUser?.name || 'User', `Updated project ${projectData.name || id}`);
    return { projects: state.projects.map(p => p.id === id ? { ...p, ...projectData } : p) };
  }),

  addProject: (projectData) => set((state) => {
    get().logActivity('Project Created', state.currentUser?.name || 'User', `Created project ${projectData.name}`);
    return { projects: [{ ...projectData, id: `proj-${Date.now()}` }, ...state.projects] };
  }),

  deleteProject: (id) => set((state) => {
    const proj = state.projects.find(p => p.id === id);
    get().logActivity('Project Deleted', state.currentUser?.name || 'User', `Deleted project ${proj?.name || id}`);
    return { projects: state.projects.filter(p => p.id !== id) };
  }),

  updateRole: (id, roleData) => set((state) => ({
    roles: state.roles.map(r => r.id === id ? { ...r, ...roleData } : r)
  })),

  updateDepartment: (id, deptData) => set((state) => {
    get().logActivity('Department Updated', state.currentUser?.name || 'User', `Updated department ${deptData.name || id}`);
    return { departments: state.departments.map(d => d.id === id ? { ...d, ...deptData } : d) };
  }),

  deleteDepartment: (id) => set((state) => {
    const dept = state.departments.find(d => d.id === id);
    get().logActivity('Department Deleted', state.currentUser?.name || 'User', `Deleted department ${dept?.name || id}`);
    return { departments: state.departments.filter(d => d.id !== id) };
  }),

  updateUser: (id, userData) => set((state) => ({
    users: state.users.map(u => u.id === id ? { ...u, ...userData } : u)
  })),

  toggleNode: (nodeId) => {
    set((state) => {
      const { nodes, edges } = state;
      const targetNode = nodes.find(n => n.id === nodeId);
      if (!targetNode || !targetNode.data.hasChildren) return state;

      const isExpanded = !targetNode.data.isExpanded;
      
      // Find all descendant node IDs
      const descendants = new Set();
      const getDescendants = (id) => {
        edges.filter(e => e.source === id).forEach(e => {
          descendants.add(e.target);
          getDescendants(e.target);
        });
      };
      getDescendants(nodeId);

      const newNodes = nodes.map(n => {
        if (n.id === nodeId) {
          return { ...n, data: { ...n.data, isExpanded } };
        }
        if (descendants.has(n.id)) {
          return { ...n, hidden: !isExpanded };
        }
        return n;
      });

      const newEdges = edges.map(e => {
        if (descendants.has(e.target)) {
          return { ...e, hidden: !isExpanded };
        }
        return e;
      });

      return { nodes: newNodes, edges: newEdges };
    });
  },

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

  moveEmployee: async (employeeNodeId, newManagerNodeId, reason, comments) => {
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

    try {
      set({ loading: true });
      await api.patch(`/users/${employeeNodeId}/manager`, { reportingManagerId: newManagerNodeId });
      
      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Position Changed',
        user: 'System Admin',
        details: `${employeeNode.data.name} now reports to ${newManagerNode.data.name}. Reason: ${reason}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };

      set((s) => ({ auditLogs: [newAuditLog, ...s.auditLogs], loading: false }));
      get().fetchOrgChart();
    } catch (err) {
      set({ error: err.message, loading: false });
    }
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
  },

  importFromExcel: async (employees) => {
    set({ loading: true, error: null });
    try {
      await api.post('/users/import', { employees });
      await get().fetchOrgChart();
      await get().fetchOrgStats();
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  fetchOrgStats: async () => {
    try {
      const res = await api.get('/users/org-stats');
      set({ orgStats: res.data.data });
    } catch (err) {
      console.error('Failed to fetch org stats', err);
    }
  },

  deactivateEmployee: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.patch(`/users/${id}/deactivate`);
      await get().fetchOrgChart();
      await get().fetchOrgStats();
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  searchNodes: (query) => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return get().nodes.filter(n => 
      n.type === 'orgNode' && 
      (n.data?.name?.toLowerCase().includes(lowerQuery) ||
       n.data?.designation?.toLowerCase().includes(lowerQuery) ||
       n.data?.department?.toLowerCase().includes(lowerQuery))
    ).map(n => n.id);
  }
}));
