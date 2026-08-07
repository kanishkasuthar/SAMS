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

const DEMO_EMPLOYEES = [
  // CEO
  {
    employeeId: 'EMP-01',
    name: 'David Chen',
    email: 'david.chen@company.com',
    phone: '+1 (555) 019-2831',
    designation: 'Chief Executive Officer',
    role: 'CEO',
    department: 'Executive',
    status: 'Active',
    experience: '15 Years',
    location: 'New York, USA'
  },
  
  // CXOs (4)
  {
    employeeId: 'EMP-02',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@company.com',
    phone: '+1 (555) 019-2832',
    designation: 'Chief Operating Officer',
    role: 'COO',
    department: 'Operations',
    status: 'Active',
    managerEmail: 'david.chen@company.com',
    experience: '12 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-03',
    name: 'Marcus Vance',
    email: 'marcus.vance@company.com',
    phone: '+1 (555) 019-2833',
    designation: 'Chief Technology Officer',
    role: 'CTO',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'david.chen@company.com',
    experience: '14 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-04',
    name: 'Elena Rostova',
    email: 'elena.rostova@company.com',
    phone: '+1 (555) 019-2834',
    designation: 'Chief Financial Officer',
    role: 'CFO',
    department: 'Finance',
    status: 'Active',
    managerEmail: 'david.chen@company.com',
    experience: '13 Years',
    location: 'London, UK'
  },
  {
    employeeId: 'EMP-05',
    name: 'Thomas Wright',
    email: 'thomas.wright@company.com',
    phone: '+1 (555) 019-2835',
    designation: 'Chief Marketing Officer',
    role: 'CMO',
    department: 'Marketing',
    status: 'Active',
    managerEmail: 'david.chen@company.com',
    experience: '11 Years',
    location: 'Paris, France'
  },

  // Managers (8)
  {
    employeeId: 'EMP-06',
    name: 'Alice Smith',
    email: 'alice.smith@company.com',
    phone: '+1 (555) 019-2836',
    designation: 'HR Manager',
    role: 'Manager',
    department: 'HR',
    status: 'Active',
    managerEmail: 'sarah.jenkins@company.com',
    experience: '8 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-07',
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    phone: '+1 (555) 019-2837',
    designation: 'Operations Manager',
    role: 'Manager',
    department: 'Operations',
    status: 'Active',
    managerEmail: 'sarah.jenkins@company.com',
    experience: '9 Years',
    location: 'Chicago, USA'
  },
  {
    employeeId: 'EMP-08',
    name: 'Charlie Brown',
    email: 'charlie.brown@company.com',
    phone: '+1 (555) 019-2838',
    designation: 'Administration Manager',
    role: 'Manager',
    department: 'Administration',
    status: 'Active',
    managerEmail: 'sarah.jenkins@company.com',
    experience: '10 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-09',
    name: 'Diana Prince',
    email: 'diana.prince@company.com',
    phone: '+1 (555) 019-2839',
    designation: 'Engineering Manager',
    role: 'Manager',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'marcus.vance@company.com',
    experience: '9 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-10',
    name: 'Evan Wright',
    email: 'evan.wright@company.com',
    phone: '+1 (555) 019-2840',
    designation: 'Product Manager',
    role: 'Manager',
    department: 'Product',
    status: 'Active',
    managerEmail: 'marcus.vance@company.com',
    experience: '7 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-11',
    name: 'Fiona Gallagher',
    email: 'fiona.gallagher@company.com',
    phone: '+1 (555) 019-2841',
    designation: 'Finance Manager',
    role: 'Manager',
    department: 'Finance',
    status: 'Active',
    managerEmail: 'elena.rostova@company.com',
    experience: '8 Years',
    location: 'London, UK'
  },
  {
    employeeId: 'EMP-12',
    name: 'George Stark',
    email: 'george.stark@company.com',
    phone: '+1 (555) 019-2842',
    designation: 'Accounts Manager',
    role: 'Manager',
    department: 'Finance',
    status: 'Active',
    managerEmail: 'elena.rostova@company.com',
    experience: '10 Years',
    location: 'London, UK'
  },
  {
    employeeId: 'EMP-13',
    name: 'Hannah Abbott',
    email: 'hannah.abbott@company.com',
    phone: '+1 (555) 019-2843',
    designation: 'Marketing Manager',
    role: 'Manager',
    department: 'Marketing',
    status: 'Active',
    managerEmail: 'thomas.wright@company.com',
    experience: '6 Years',
    location: 'Paris, France'
  },

  // Team Leads (12)
  {
    employeeId: 'EMP-14',
    name: 'Rachel Green',
    email: 'rachel.green@company.com',
    phone: '+1 (555) 019-2854',
    designation: 'Recruitment Lead',
    role: 'Employee',
    department: 'HR',
    status: 'Active',
    managerEmail: 'alice.smith@company.com',
    experience: '4 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-15',
    name: 'Samwise Gamgee',
    email: 'samwise.g@company.com',
    phone: '+1 (555) 019-2855',
    designation: 'Office Admin Lead',
    role: 'Employee',
    department: 'Administration',
    status: 'Active',
    managerEmail: 'charlie.brown@company.com',
    experience: '5 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-16',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 019-2845',
    designation: 'Frontend Lead',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'diana.prince@company.com',
    experience: '6 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-17',
    name: 'Jane Roe',
    email: 'jane.roe@company.com',
    phone: '+1 (555) 019-2846',
    designation: 'Backend Lead',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'diana.prince@company.com',
    experience: '7 Years',
    location: 'Austin, USA'
  },
  {
    employeeId: 'EMP-18',
    name: 'Kevin Bacon',
    email: 'kevin.bacon@company.com',
    phone: '+1 (555) 019-2847',
    designation: 'QA Lead',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'diana.prince@company.com',
    experience: '5 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-19',
    name: 'Oliver Queen',
    email: 'oliver.q@company.com',
    phone: '+1 (555) 019-2877',
    designation: 'DevOps Lead',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'diana.prince@company.com',
    experience: '8 Years',
    location: 'Seattle, USA'
  },
  {
    employeeId: 'EMP-20',
    name: 'Quincy Adams',
    email: 'quincy.a@company.com',
    phone: '+1 (555) 019-2853',
    designation: 'Design Lead',
    role: 'Employee',
    department: 'Product',
    status: 'Active',
    managerEmail: 'evan.wright@company.com',
    experience: '4 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-21',
    name: 'Iris West',
    email: 'iris.w@company.com',
    phone: '+1 (555) 019-2878',
    designation: 'Content Lead',
    role: 'Employee',
    department: 'Product',
    status: 'Active',
    managerEmail: 'evan.wright@company.com',
    experience: '5 Years',
    location: 'Los Angeles, USA'
  },
  {
    employeeId: 'EMP-22',
    name: 'Harvey Dent',
    email: 'harvey.d@company.com',
    phone: '+1 (555) 019-2879',
    designation: 'Audit Lead',
    role: 'Employee',
    department: 'Finance',
    status: 'Active',
    managerEmail: 'fiona.gallagher@company.com',
    experience: '6 Years',
    location: 'London, UK'
  },
  {
    employeeId: 'EMP-23',
    name: 'Bruce Wayne',
    email: 'bruce.w@company.com',
    phone: '+1 (555) 019-2880',
    designation: 'Tax Lead',
    role: 'Employee',
    department: 'Finance',
    status: 'Active',
    managerEmail: 'george.stark@company.com',
    experience: '7 Years',
    location: 'Gotham, USA'
  },
  {
    employeeId: 'EMP-24',
    name: 'Ian Malcolm',
    email: 'ian.m@company.com',
    phone: '+1 (555) 019-2881',
    designation: 'Sales Lead',
    role: 'Employee',
    department: 'Marketing',
    status: 'Active',
    managerEmail: 'hannah.abbott@company.com',
    experience: '6 Years',
    location: 'Dallas, USA'
  },
  {
    employeeId: 'EMP-25',
    name: 'Lois Lane',
    email: 'lois.l@company.com',
    phone: '+1 (555) 019-2882',
    designation: 'PR Lead',
    role: 'Employee',
    department: 'Marketing',
    status: 'Active',
    managerEmail: 'hannah.abbott@company.com',
    experience: '5 Years',
    location: 'Metropolis, USA'
  },

  // Employees (20)
  {
    employeeId: 'EMP-26',
    name: 'Wanda Maximoff',
    email: 'wanda.m@company.com',
    phone: '+1 (555) 019-2883',
    designation: 'Recruiter',
    role: 'Employee',
    department: 'HR',
    status: 'Active',
    managerEmail: 'rachel.green@company.com',
    experience: '3 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-27',
    name: 'Vision',
    email: 'vision@company.com',
    phone: '+1 (555) 019-2884',
    designation: 'HR Coordinator',
    role: 'Employee',
    department: 'HR',
    status: 'Active',
    managerEmail: 'rachel.green@company.com',
    experience: '2 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-28',
    name: 'Frodo Baggins',
    email: 'frodo.b@company.com',
    phone: '+1 (555) 019-2885',
    designation: 'Admin Assistant',
    role: 'Employee',
    department: 'Administration',
    status: 'Active',
    managerEmail: 'samwise.g@company.com',
    experience: '3 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-29',
    name: 'Pippin Took',
    email: 'pippin.t@company.com',
    phone: '+1 (555) 019-2886',
    designation: 'Facilities Coordinator',
    role: 'Employee',
    department: 'Administration',
    status: 'Active',
    managerEmail: 'samwise.g@company.com',
    experience: '2 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-30',
    name: 'Laura Croft',
    email: 'laura.croft@company.com',
    phone: '+1 (555) 019-2848',
    designation: 'Senior Frontend Developer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'john.doe@company.com',
    experience: '4 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-31',
    name: 'Mike Tyson',
    email: 'mike.tyson@company.com',
    phone: '+1 (555) 019-2849',
    designation: 'Frontend Developer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'john.doe@company.com',
    experience: '3 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-32',
    name: 'Peter Parker',
    email: 'peter.p@company.com',
    phone: '+1 (555) 019-2887',
    designation: 'Junior Frontend Developer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'john.doe@company.com',
    experience: '1 Year',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-33',
    name: 'Nancy Drew',
    email: 'nancy.drew@company.com',
    phone: '+1 (555) 019-2850',
    designation: 'Senior Backend Developer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'jane.roe@company.com',
    experience: '4 Years',
    location: 'Austin, USA'
  },
  {
    employeeId: 'EMP-34',
    name: 'Oscar Wilde',
    email: 'oscar.wilde@company.com',
    phone: '+1 (555) 019-2851',
    designation: 'Backend Developer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'jane.roe@company.com',
    experience: '3 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-35',
    name: 'Clark Kent',
    email: 'clark.k@company.com',
    phone: '+1 (555) 019-2888',
    designation: 'Junior Backend Developer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'jane.roe@company.com',
    experience: '2 Years',
    location: 'Metropolis, USA'
  },
  {
    employeeId: 'EMP-36',
    name: 'Penny Hofstadter',
    email: 'penny.h@company.com',
    phone: '+1 (555) 019-2852',
    designation: 'QA Engineer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'kevin.bacon@company.com',
    experience: '3 Years',
    location: 'San Francisco, USA'
  },
  {
    employeeId: 'EMP-37',
    name: 'Barry Allen',
    email: 'barry.a@company.com',
    phone: '+1 (555) 019-2889',
    designation: 'Automation Specialist',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'kevin.bacon@company.com',
    experience: '3 Years',
    location: 'Central City, USA'
  },
  {
    employeeId: 'EMP-38',
    name: 'Arthur Curry',
    email: 'arthur.c@company.com',
    phone: '+1 (555) 019-2890',
    designation: 'SRE Developer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'oliver.q@company.com',
    experience: '4 Years',
    location: 'Seattle, USA'
  },
  {
    employeeId: 'EMP-39',
    name: 'Victor Stone',
    email: 'victor.s@company.com',
    phone: '+1 (555) 019-2891',
    designation: 'Cloud Engineer',
    role: 'Employee',
    department: 'Engineering',
    status: 'Active',
    managerEmail: 'oliver.q@company.com',
    experience: '3 Years',
    location: 'Detroit, USA'
  },
  {
    employeeId: 'EMP-40',
    name: 'Miles Morales',
    email: 'miles.m@company.com',
    phone: '+1 (555) 019-2892',
    designation: 'UI Designer',
    role: 'Employee',
    department: 'Product',
    status: 'Active',
    managerEmail: 'quincy.a@company.com',
    experience: '2 Years',
    location: 'Brooklyn, USA'
  },
  {
    employeeId: 'EMP-41',
    name: 'Gwen Stacy',
    email: 'gwen.s@company.com',
    phone: '+1 (555) 019-2893',
    designation: 'UX Researcher',
    role: 'Employee',
    department: 'Product',
    status: 'Active',
    managerEmail: 'quincy.a@company.com',
    experience: '3 Years',
    location: 'Brooklyn, USA'
  },
  {
    employeeId: 'EMP-42',
    name: 'Tony Stark',
    email: 'tony.s@company.com',
    phone: '+1 (555) 019-2856',
    designation: 'Sales Representative',
    role: 'Employee',
    department: 'Marketing',
    status: 'Active',
    managerEmail: 'ian.m@company.com',
    experience: '6 Years',
    location: 'Chicago, USA'
  },
  {
    employeeId: 'EMP-43',
    name: 'Steve Rogers',
    email: 'steve.r@company.com',
    phone: '+1 (555) 019-2894',
    designation: 'Account Executive',
    role: 'Employee',
    department: 'Marketing',
    status: 'Active',
    managerEmail: 'ian.m@company.com',
    experience: '5 Years',
    location: 'Brooklyn, USA'
  },
  {
    employeeId: 'EMP-44',
    name: 'PR Specialist',
    email: 'natasha.r@company.com',
    phone: '+1 (555) 019-2895',
    designation: 'PR Specialist',
    role: 'Employee',
    department: 'Marketing',
    status: 'Active',
    managerEmail: 'lois.l@company.com',
    experience: '4 Years',
    location: 'New York, USA'
  },
  {
    employeeId: 'EMP-45',
    name: 'Clint Barton',
    email: 'clint.b@company.com',
    phone: '+1 (555) 019-2896',
    designation: 'Communications Assistant',
    role: 'Employee',
    department: 'Marketing',
    status: 'Active',
    managerEmail: 'lois.l@company.com',
    experience: '2 Years',
    location: 'New York, USA'
  }
];

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Set horizontal spacing (nodesep) to 240px, and vertical spacing (ranksep) to 150px!
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 240, ranksep: 150 });

  // Only layout org nodes in dagre, ignore group nodes for dagre layout
  nodes.filter(n => n.type !== 'group').forEach((node) => {
    // Sized exactly 240px width and 100px height
    dagreGraph.setNode(node.id, { width: 240, height: 100 });
  });

  edges.forEach((edge) => {
    // Only layout visible connections
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    if (sourceNode && targetNode && !sourceNode.hidden && !targetNode.hidden) {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const fallbackPosition = node.position ?? { x: 0, y: 0 };
    if (node.type === 'group') {
      return {
        ...node,
        position: fallbackPosition
      };
    }

    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: nodeWithPosition?.x ? (nodeWithPosition.x - 240 / 2) : fallbackPosition.x,
        y: nodeWithPosition?.y ? (nodeWithPosition.y - 100 / 2) : fallbackPosition.y,
      },
    };
  });

  // Calculate bounding boxes for group nodes based on children
  layoutedNodes.filter(n => n.type === 'group').forEach(group => {
    const children = layoutedNodes.filter(n => n.parentId === group.id && !n.hidden);
    if (children.length > 0) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      children.forEach(c => {
        const posX = c.position?.x ?? 0;
        const posY = c.position?.y ?? 0;
        if (posX < minX) minX = posX;
        if (posY < minY) minY = posY;
        if (posX + 240 > maxX) maxX = posX + 240;
        if (posY + 100 > maxY) maxY = posY + 100;
      });
      // Add generous margin
      const padding = 50;
      group.position = { x: minX - padding, y: minY - padding - 40 }; // Extra top padding for label
      group.style = { ...group.style, width: maxX - minX + padding * 2, height: maxY - minY + padding * 2 + 40 };
      
      // Make children relative to group
      children.forEach(c => {
        if (c.position) {
          c.position.x -= group.position.x;
          c.position.y -= group.position.y;
        }
      });
    } else {
      // Hide empty groups
      group.position = group.position ?? { x: 0, y: 0 };
      group.style = { ...group.style, width: 300, height: 200, display: 'none' };
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
      let res = await api.get('/users/org-chart');
      let users = res.data.data.users;

      if (users.length <= 1) {
        // Automatically seed demo organization in backend database!
        try {
          await api.post('/users/import', { employees: DEMO_EMPLOYEES });
          // Fetch once more with newly seeded users
          res = await api.get('/users/org-chart');
          users = res.data.data.users;
        } catch (seedErr) {
          console.error('Failed to auto-seed demo employees', seedErr);
        }
      }

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
        const deptName = dept.departmentName?.toLowerCase() || '';
        let bgColor = 'rgba(148, 163, 184, 0.04)'; // Subtle Gray
        let borderColor = 'rgba(148, 163, 184, 0.25)';
        
        if (deptName.includes('engineering') || deptName.includes('tech')) {
          bgColor = 'rgba(59, 130, 246, 0.04)'; // Subtle Blue
          borderColor = 'rgba(59, 130, 246, 0.25)';
        } else if (deptName.includes('hr') || deptName.includes('human')) {
          bgColor = 'rgba(236, 72, 153, 0.04)'; // Subtle Pink
          borderColor = 'rgba(236, 72, 153, 0.25)';
        } else if (deptName.includes('finance') || deptName.includes('account')) {
          bgColor = 'rgba(16, 185, 129, 0.04)'; // Subtle Green
          borderColor = 'rgba(16, 185, 129, 0.25)';
        } else if (deptName.includes('marketing') || deptName.includes('sales')) {
          bgColor = 'rgba(139, 92, 246, 0.04)'; // Subtle Purple
          borderColor = 'rgba(139, 92, 246, 0.25)';
        } else if (deptName.includes('operation') || deptName.includes('admin')) {
          bgColor = 'rgba(99, 102, 241, 0.04)'; // Subtle Indigo
          borderColor = 'rgba(99, 102, 241, 0.25)';
        }

        nodes.push({
          id: `dept-${dept.id}`,
          type: 'group',
          data: { label: dept.departmentName },
          style: {
            backgroundColor: bgColor,
            border: `1.5px dashed ${borderColor}`,
            borderRadius: '20px',
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
            animated: false,
            style: { stroke: '#E2E8F0', strokeWidth: 2 }
          });
        }
      });
      
      // Determine which nodes have children & set direct reports count
      nodes.forEach(n => {
        if (n.type === 'orgNode') {
          const directReports = edges.filter(e => e.source === n.id);
          n.data.hasChildren = directReports.length > 0;
          n.data.directReportsCount = directReports.length;
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
      console.warn('Backend org-chart API failed. Seeding local demo mode...', err);
      
      const mockDepts = Array.from(new Set(DEMO_EMPLOYEES.map(e => e.department).filter(Boolean))).map((deptName, idx) => ({
        id: `dept-mock-${idx}`,
        departmentName: deptName
      }));
      
      const mockUsers = DEMO_EMPLOYEES.map((e, idx) => {
        const mgr = DEMO_EMPLOYEES.find(m => m.email === e.managerEmail);
        return {
          id: `usr-mock-${idx}`,
          name: e.name,
          email: e.email,
          phone: e.phone,
          designation: e.designation,
          Department: { id: `dept-mock-${mockDepts.findIndex(d => d.departmentName === e.department)}`, departmentName: e.department },
          Role: { name: e.role },
          reportingManagerId: mgr ? `usr-mock-${DEMO_EMPLOYEES.findIndex(m => m.email === e.managerEmail)}` : null,
          status: e.status || 'Active',
          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(e.name)}&background=random`
        };
      });

      const mockNodes = [];
      const mockEdges = [];
      
      mockDepts.forEach(dept => {
        const deptName = dept.departmentName?.toLowerCase() || '';
        let bgColor = 'rgba(148, 163, 184, 0.04)';
        let borderColor = 'rgba(148, 163, 184, 0.25)';
        if (deptName.includes('engineering') || deptName.includes('tech')) {
          bgColor = 'rgba(59, 130, 246, 0.04)';
          borderColor = 'rgba(59, 130, 246, 0.25)';
        } else if (deptName.includes('hr') || deptName.includes('human')) {
          bgColor = 'rgba(236, 72, 153, 0.04)';
          borderColor = 'rgba(236, 72, 153, 0.25)';
        } else if (deptName.includes('finance') || deptName.includes('account')) {
          bgColor = 'rgba(16, 185, 129, 0.04)';
          borderColor = 'rgba(16, 185, 129, 0.25)';
        } else if (deptName.includes('marketing') || deptName.includes('sales')) {
          bgColor = 'rgba(139, 92, 246, 0.04)';
          borderColor = 'rgba(139, 92, 246, 0.25)';
        } else if (deptName.includes('operation') || deptName.includes('admin')) {
          bgColor = 'rgba(99, 102, 241, 0.04)';
          borderColor = 'rgba(99, 102, 241, 0.25)';
        }

        mockNodes.push({
          id: `dept-${dept.id}`,
          type: 'group',
          data: { label: dept.departmentName },
          style: {
            backgroundColor: bgColor,
            border: `1.5px dashed ${borderColor}`,
            borderRadius: '20px',
            zIndex: -1
          },
          selectable: false
        });
      });

      mockUsers.forEach(u => {
        mockNodes.push({
          id: u.id,
          type: 'orgNode',
          parentId: u.Department ? `dept-${u.Department.id}` : undefined,
          data: {
            id: u.id,
            name: u.name,
            designation: u.designation,
            department: u.Department ? u.Department.departmentName : 'Unassigned',
            photo: u.profileImage,
            status: u.status,
            type: u.Role?.name?.toLowerCase().includes('ceo') ? 'ceo' : 'employee',
            isVacant: false
          },
          position: { x: 0, y: 0 }
        });

        if (u.reportingManagerId) {
          mockEdges.push({
            id: `e${u.reportingManagerId}-${u.id}`,
            source: u.reportingManagerId,
            target: u.id,
            type: 'smoothstep',
            animated: false,
            style: { stroke: '#E2E8F0', strokeWidth: 2 }
          });
        }
      });

      mockNodes.forEach(n => {
        if (n.type === 'orgNode') {
          const directReports = mockEdges.filter(e => e.source === n.id);
          n.data.hasChildren = directReports.length > 0;
          n.data.directReportsCount = directReports.length;
          n.data.isExpanded = true;
        }
      });

      const { layoutedNodes, layoutedEdges } = getLayoutedElements(mockNodes, mockEdges);

      const mappedPeople = mockUsers.map(u => {
        const hash = u.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const directReportsCount = mockUsers.filter(usr => usr.reportingManagerId === u.id).length;
        const mgrNode = mockUsers.find(m => m.id === u.reportingManagerId);
        return {
          id: u.id,
          employeeId: `EMP-${u.id.substring(0, 4).toUpperCase()}`,
          name: u.name,
          email: u.email,
          phone: u.phone || `+1 (555) 019-${(1000 + (hash % 9000))}`,
          role: u.designation,
          department: u.Department ? u.Department.departmentName : 'Unassigned',
          status: u.status || 'Active',
          photo: u.profileImage,
          location: ['New York HQ, USA', 'San Francisco Office, USA', 'London Office, UK', 'Paris Office, France', 'Austin Hub, USA'][hash % 5],
          experience: `${(hash % 10) + 3} Years`,
          projects: ['SAMS Integration v3'],
          directReports: directReportsCount,
          assignedProjects: (hash % 3) + 1,
          workload: (hash % 40) + 60,
          healthScore: (hash % 15) + 85,
          employmentType: 'Full-time',
          manager: mgrNode ? mgrNode.name : 'No reporting manager'
        };
      });

      const mappedDepts = mockDepts.map((d, idx) => ({
        id: d.id,
        name: d.departmentName,
        head: 'No Head Assigned',
        headId: '',
        budget: '$4.5M',
        description: '',
        signals: [],
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

      const { layoutedNodes, layoutedEdges } = getLayoutedElements(newNodes, newEdges);
      return { nodes: layoutedNodes, edges: layoutedEdges };
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
    get().saveHistory();
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

    // Local updates to nodes and edges for responsive/fallback rendering
    const localNewEdges = edges.map(e => {
      if (e.target === employeeNodeId) {
        return { ...e, source: newManagerNodeId };
      }
      return e;
    });

    const hasIncomingEdge = edges.some(e => e.target === employeeNodeId);
    if (!hasIncomingEdge) {
      localNewEdges.push({
        id: `e${newManagerNodeId}-${employeeNodeId}`,
        source: newManagerNodeId,
        target: employeeNodeId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#E2E8F0', strokeWidth: 2 }
      });
    }

    const localNewNodes = nodes.map(n => {
      if (n.id === employeeNodeId) {
        return {
          ...n,
          parentId: newManagerNode.parentId || `dept-${newManagerNode.id}`,
          data: {
            ...n.data,
            department: newManagerNode.data.department
          }
        };
      }
      return n;
    });

    const { layoutedNodes, layoutedEdges } = getLayoutedElements(localNewNodes, localNewEdges);

    const newAuditLog = {
      id: `AL-${Date.now()}`,
      action: 'Position Changed',
      user: 'System Admin',
      details: `${employeeNode.data.name} now reports to ${newManagerNode.data.name}. Reason: ${reason || 'Drag & Drop Reorganization'}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Success'
    };

    try {
      set({ loading: true });
      await api.patch(`/users/${employeeNodeId}/manager`, { reportingManagerId: newManagerNodeId });
      
      set((s) => ({ auditLogs: [newAuditLog, ...s.auditLogs] }));
      await get().fetchOrgChart();
      await get().fetchOrgStats();
    } catch (err) {
      console.warn('Backend patch failed, proceeding with local fallback.', err);
      // Fallback local update
      set((s) => ({
        nodes: layoutedNodes,
        edges: layoutedEdges,
        auditLogs: [newAuditLog, ...s.auditLogs],
        loading: false
      }));
    }
  },
      
  updateEmployee: async (nodeId, updatedData) => {
    get().saveHistory();
    set({ loading: true });
    try {
      const state = get();
      
      // Resolve departmentId
      let departmentId = null;
      if (updatedData.department) {
        const dept = state.departments.find(d => d.name?.toLowerCase() === updatedData.department.toLowerCase());
        if (dept) departmentId = dept.id;
      }
      
      // Resolve roleId
      let roleId = null;
      if (updatedData.designation) {
        const roleObj = state.roles.find(r => r.name?.toLowerCase() === updatedData.designation.toLowerCase());
        if (roleObj) roleId = roleObj.id;
      }

      // Update in database
      await api.put(`/users/${nodeId}`, {
        fullName: updatedData.name,
        phone: updatedData.phone,
        profileImage: updatedData.photo,
        departmentId: departmentId,
        roleId: roleId
      });

      // Update status if present
      if (updatedData.status) {
        await api.patch(`/users/${nodeId}/status`, { status: updatedData.status });
      }

      await get().fetchOrgChart();
      await get().fetchOrgStats();
      set({ loading: false });
    } catch (err) {
      console.error('Failed to update employee in database', err);
      set({ error: err.message, loading: false });
    }
  },

  addEmployee: async (employeeData, managerId) => {
    get().saveHistory();
    const managerNode = get().nodes.find(n => n.id === managerId);
    
    // Build user import payload
    const payload = {
      name: employeeData.name,
      email: employeeData.email || `${employeeData.name.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      phone: employeeData.phone || '',
      designation: employeeData.designation,
      department: employeeData.department || 'Executive',
      role: 'Employee',
      status: 'Active',
      managerEmail: managerNode ? (managerNode.data.email || `${managerNode.data.name.toLowerCase().replace(/\s+/g, '.')}@company.com`) : '',
      managerName: managerNode ? managerNode.data.name : ''
    };

    set({ loading: true });
    try {
      await api.post('/users/import', { employees: [payload] });
      await get().fetchOrgChart();
      await get().fetchOrgStats();
      set({ loading: false });
    } catch (err) {
      console.error('Failed to save employee to database', err);
      set({ error: err.message, loading: false });
    }
  },

  deleteEmployee: async (nodeId, strategy, targetManagerId) => {
    get().saveHistory();
    set({ loading: true });
    try {
      const state = get();
      const directReports = state.edges.filter(e => e.source === nodeId).map(e => e.target);
      
      if (directReports.length > 0) {
        if (strategy === 'reassign' && targetManagerId) {
          // Reassign all children to targetManagerId
          for (const childId of directReports) {
            await api.patch(`/users/${childId}/manager`, { reportingManagerId: targetManagerId });
          }
        } else if (strategy === 'promote') {
          // Promote first child
          const promotedId = directReports[0];
          
          // Get the manager of the deleted employee
          const deletedUserEdge = state.edges.find(e => e.target === nodeId);
          const parentManagerId = deletedUserEdge ? deletedUserEdge.source : null;
          
          // Set promoted child's manager to parentManagerId
          await api.patch(`/users/${promotedId}/manager`, { reportingManagerId: parentManagerId });
          
          // Set all other children to report to the promoted child
          for (let i = 1; i < directReports.length; i++) {
            await api.patch(`/users/${directReports[i]}/manager`, { reportingManagerId: promotedId });
          }
        } else if (strategy === 'delete_branch') {
          // Delete recursively
          const getDescendants = (id, list = []) => {
            state.edges.filter(e => e.source === id).forEach(e => {
              list.push(e.target);
              getDescendants(e.target, list);
            });
            return list;
          };
          const descendants = getDescendants(nodeId);
          for (const descId of descendants) {
            await api.delete(`/users/${descId}`);
          }
        }
      }
      
      // Delete the employee themselves
      await api.delete(`/users/${nodeId}`);
      
      await get().fetchOrgChart();
      await get().fetchOrgStats();
      set({ loading: false });
    } catch (err) {
      console.error('Failed to delete employee from database', err);
      set({ error: err.message, loading: false });
    }
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
  },

  createDepartment: async (deptData) => {
    set({ loading: true, error: null });
    try {
      await api.post('/departments', deptData);
      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Department Created',
        user: 'System Admin',
        details: `Created department ${deptData.departmentName}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };
      set(state => ({ auditLogs: [newAuditLog, ...state.auditLogs] }));
      await get().fetchOrgChart();
      await get().fetchOrgStats();
      return true;
    } catch (err) {
      console.warn('Backend create department failed. Updating local state...', err);
      set(state => {
        const newId = `dept-mock-${Date.now()}`;
        const newDept = {
          id: newId,
          name: deptData.departmentName,
          departmentName: deptData.departmentName,
          head: deptData.head || 'No Head Assigned',
          headId: deptData.headId || '',
          budget: deptData.budget || '$0M',
          description: deptData.description || '',
          signals: deptData.parentDepartmentId ? [] : ['TOP LEVEL'],
          dnaScores: { people: 80, authority: 75, project: 80, decision: 85, connection: 80 },
          dnaType: 'ORGANIZATIONAL CELL',
          authorityConcentration: 'MEDIUM',
          projectCount: 0,
          authorityScore: 80
        };
        const newAuditLog = {
          id: `AL-${Date.now()}`,
          action: 'Department Created',
          user: 'System Admin',
          details: `Created department ${deptData.departmentName} (Local Mode)`,
          date: new Date().toISOString().split('T')[0],
          status: 'Success'
        };
        return {
          departments: [...state.departments, newDept],
          auditLogs: [newAuditLog, ...state.auditLogs],
          loading: false
        };
      });
      return true;
    }
  },

  updateDepartment: async (id, deptData) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/departments/${id}`, deptData);
      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Department Renamed',
        user: 'System Admin',
        details: `Updated department to ${deptData.departmentName}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };
      set(state => ({ auditLogs: [newAuditLog, ...state.auditLogs] }));
      await get().fetchOrgChart();
      await get().fetchOrgStats();
      return true;
    } catch (err) {
      console.warn('Backend update department failed. Updating local state...', err);
      set(state => {
        const oldDept = state.departments.find(d => d.id === id);
        const oldName = oldDept ? (oldDept.departmentName || oldDept.name) : '';
        const newName = deptData.departmentName;

        const updatedDepts = state.departments.map(d => {
          if (d.id === id) {
             return {
               ...d,
               name: deptData.departmentName,
               departmentName: deptData.departmentName,
               head: deptData.head || d.head,
               headId: deptData.headId || d.headId,
               budget: deptData.budget || d.budget,
               description: deptData.description || d.description
             };
          }
          return d;
        });

        const updatedPeople = state.people.map(p => {
          if (p.department === oldName) {
            return { ...p, department: newName };
          }
          return p;
        });

        const updatedNodes = state.nodes.map(n => {
          if (n.type === 'orgNode' && n.data?.department === oldName) {
            return {
              ...n,
              data: { ...n.data, department: newName }
            };
          }
          if (n.type === 'group' && n.data?.label === oldName) {
            return {
              ...n,
              data: { ...n.data, label: newName }
            };
          }
          return n;
        });

        const newAuditLog = {
          id: `AL-${Date.now()}`,
          action: 'Department Renamed',
          user: 'System Admin',
          details: `Renamed department from ${oldName} to ${newName} (Local Mode)`,
          date: new Date().toISOString().split('T')[0],
          status: 'Success'
        };

        return {
          departments: updatedDepts,
          people: updatedPeople,
          nodes: updatedNodes,
          auditLogs: [newAuditLog, ...state.auditLogs],
          loading: false
        };
      });
      return true;
    }
  },

  deleteDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/departments/${id}`);
      const deletedDept = get().departments.find(d => d.id === id);
      const deptName = deletedDept ? (deletedDept.departmentName || deletedDept.name) : '';
      const newAuditLog = {
        id: `AL-${Date.now()}`,
        action: 'Department Deleted',
        user: 'System Admin',
        details: `Deleted department ${deptName}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };
      set(state => ({ auditLogs: [newAuditLog, ...state.auditLogs] }));
      await get().fetchOrgChart();
      await get().fetchOrgStats();
      return true;
    } catch (err) {
      console.warn('Backend delete department failed. Updating local state...', err);
      set(state => {
        const deletedDept = state.departments.find(d => d.id === id);
        const deptName = deletedDept ? (deletedDept.departmentName || deletedDept.name) : '';

        const updatedDepts = state.departments.filter(d => d.id !== id);

        const updatedPeople = state.people.map(p => {
          if (p.department === deptName) {
            return { ...p, department: 'Unassigned' };
          }
          return p;
        });

        const updatedNodes = state.nodes.filter(n => n.id !== `dept-${id}`).map(n => {
          if (n.type === 'orgNode' && n.data?.department === deptName) {
            return {
              ...n,
              data: { ...n.data, department: 'Unassigned' }
            };
          }
          return n;
        });

        const newAuditLog = {
          id: `AL-${Date.now()}`,
          action: 'Department Deleted',
          user: 'System Admin',
          details: `Deleted department ${deptName} (Local Mode)`,
          date: new Date().toISOString().split('T')[0],
          status: 'Success'
        };

        return {
          departments: updatedDepts,
          people: updatedPeople,
          nodes: updatedNodes,
          auditLogs: [newAuditLog, ...state.auditLogs],
          loading: false
        };
      });
      return true;
    }
  }
}));
