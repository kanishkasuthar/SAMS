import { create } from 'zustand';
import dagre from 'dagre';
import api from '../services/api';

export const useDepartmentStore = create((set, get) => ({
  departments: [],
  departmentTree: [],
  reactFlowNodes: [],
  reactFlowEdges: [],
  statistics: null,
  loading: false,
  error: null,
  searchQuery: '',

  generateGraph: (tree) => {
    const nodes = [];
    const edges = [];
    
    // Flatten tree
    const traverse = (nodeList, parentId = null) => {
      nodeList.forEach(dept => {
        nodes.push({
          id: dept.id,
          type: 'orgNode',
          data: {
            ...dept,
            name: dept.departmentName,
            departmentName: dept.departmentName,
            managerName: dept.DepartmentHead ? dept.DepartmentHead.name : 'Unassigned',
            teamSize: dept.employeeCount || 0,
            type: 'department'
          },
          position: { x: 0, y: 0 }
        });
        
        if (parentId) {
          edges.push({
            id: `e${parentId}-${dept.id}`,
            source: parentId,
            target: dept.id,
            type: 'smoothstep',
            animated: true,
            style: { stroke: 'var(--color-border)', strokeWidth: 2 }
          });
        }
        
        if (dept.children && dept.children.length > 0) {
          traverse(dept.children, dept.id);
        }
      });
    };
    
    traverse(tree);

    // Apply Dagre layout
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'TB', nodesep: 150, ranksep: 200 });

    nodes.forEach(node => {
      // Approximate node size
      dagreGraph.setNode(node.id, { width: 350, height: 180 });
    });

    edges.forEach(edge => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach(node => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = 'top';
      node.sourcePosition = 'bottom';
      node.position = {
        x: nodeWithPosition.x - 350 / 2,
        y: nodeWithPosition.y - 180 / 2,
      };
    });

    set({ reactFlowNodes: nodes, reactFlowEdges: edges });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().fetchDepartments();
  },

  fetchDepartments: async () => {
    set({ loading: true, error: null });
    try {
      const { searchQuery } = get();
      const res = await api.get('/departments', { params: { search: searchQuery } });
      set({ departments: res.data.data.departments, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  fetchDepartmentTree: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/departments/tree');
      set({ departmentTree: res.data.data.tree, loading: false });
      get().generateGraph(res.data.data.tree);
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  fetchStatistics: async () => {
    try {
      const res = await api.get('/departments/statistics');
      set({ statistics: res.data.data });
    } catch (err) {
      console.error(err);
    }
  },

  createDepartment: async (deptData) => {
    set({ loading: true, error: null });
    try {
      await api.post('/departments', deptData);
      await get().fetchDepartments();
      await get().fetchDepartmentTree();
      await get().fetchStatistics();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  updateDepartment: async (id, deptData) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/departments/${id}`, deptData);
      await get().fetchDepartments();
      await get().fetchDepartmentTree();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  deleteDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/departments/${id}`);
      await get().fetchDepartments();
      await get().fetchDepartmentTree();
      await get().fetchStatistics();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  }
}));
