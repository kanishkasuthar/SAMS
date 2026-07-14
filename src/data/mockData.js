export const KPI_DATA = [
  { id: 1, title: 'Total Employees', value: '14,205', trend: '+12%', isPositive: true },
  { id: 2, title: 'Departments', value: '48', trend: 'Stable', isPositive: true },
  { id: 3, title: 'Active Managers', value: '1,120', trend: '+5%', isPositive: true },
  { id: 4, title: 'Hierarchy Nodes', value: '15,373', trend: '+11%', isPositive: true },
  { id: 5, title: 'Decision Flows', value: '342', trend: '+22%', isPositive: true },
  { id: 6, title: 'Total Projects', value: '89', trend: '-2%', isPositive: false },
  { id: 7, title: 'Online Users', value: '3,492', trend: '+18%', isPositive: true },
  { id: 8, title: 'Pending Reviews', value: '156', trend: '-10%', isPositive: true },
  { id: 9, title: 'Organization Health', value: '94%', trend: '+1%', isPositive: true },
];

export const LOGIN_TREND_DATA = [
  { name: 'Mon', users: 12000 },
  { name: 'Tue', users: 13500 },
  { name: 'Wed', users: 14000 },
  { name: 'Thu', users: 13800 },
  { name: 'Fri', users: 14200 },
  { name: 'Sat', users: 2000 },
  { name: 'Sun', users: 1500 },
];

export const DEPT_DISTRIBUTION = [
  { name: 'Engineering', value: 4500, fill: '#4F46E5' },
  { name: 'Sales', value: 3200, fill: '#0EA5E9' },
  { name: 'Operations', value: 2800, fill: '#14B8A6' },
  { name: 'Product', value: 1500, fill: '#F59E0B' },
  { name: 'HR & Admin', value: 800, fill: '#8B5CF6' },
  { name: 'Executive', value: 120, fill: '#EF4444' },
];

export const RECENT_ACTIVITIES = [
  { id: 1, type: 'sync', user: 'Sarah Jenkins', action: 'Synced HR_Master_Q3.xlsx', time: '10 mins ago', status: 'success' },
  { id: 2, type: 'node', user: 'David Chen', action: 'Moved 12 employees to Engineering', time: '45 mins ago', status: 'success' },
  { id: 3, type: 'project', user: 'Admin System', action: 'Auto-archived Project Titan', time: '2 hours ago', status: 'info' },
  { id: 4, type: 'security', user: 'Unknown IP', action: 'Failed login attempt (Admin)', time: '3 hours ago', status: 'danger' },
];

export const RECENT_PROJECTS = [
  { id: 1, name: 'Project Titan', progress: 85, status: 'Active', manager: 'Alex Rodriguez' },
  { id: 2, name: 'Q4 Reorg', progress: 100, status: 'Completed', manager: 'Sarah Jenkins' },
  { id: 3, name: 'Cloud Migration', progress: 32, status: 'Delayed', manager: 'David Chen' },
];

export const ALL_PROJECTS = [
  { id: 1, name: 'Project Titan', progress: 85, status: 'Active', manager: 'Alex Rodriguez', members: 142, departments: ['Engineering', 'Design'], health: 'Good', deadline: '2026-11-01' },
  { id: 2, name: 'Q4 Reorg', progress: 100, status: 'Completed', manager: 'Sarah Jenkins', members: 45, departments: ['Executive', 'HR'], health: 'Excellent', deadline: '2026-07-01' },
  { id: 3, name: 'Cloud Migration', progress: 32, status: 'Delayed', manager: 'David Chen', members: 89, departments: ['Engineering', 'IT Security'], health: 'At Risk', deadline: '2026-08-15' },
  { id: 4, name: 'SAMS Dashboard', progress: 65, status: 'Active', manager: 'Marcus Johnson', members: 12, departments: ['Engineering', 'Product'], health: 'Good', deadline: '2026-09-30' },
  { id: 5, name: 'Excel Sync Engine', progress: 40, status: 'Active', manager: 'Priya Patel', members: 15, departments: ['Engineering'], health: 'Needs Attention', deadline: '2026-10-15' },
  { id: 6, name: 'Global Onboarding', progress: 12, status: 'Planning', manager: 'Emma Watson', members: 8, departments: ['HR'], health: 'Good', deadline: '2027-01-01' },
];

export const ORG_INSIGHTS = [
  { id: 1, type: 'missing_manager', title: 'Missing Managers Detected', description: '4 departments have employees without a direct reporting manager.', count: 4, severity: 'high', affectedEntities: ['Sales NA', 'Customer Support', 'Legacy IT', 'Marketing EMEA'] },
  { id: 2, type: 'overloaded_manager', title: 'Overloaded Managers', description: 'David Chen and 3 others have more than 25 direct reports.', count: 4, severity: 'medium', affectedEntities: ['David Chen (Engineering)', 'Emma Watson (HR)', 'Sarah Jenkins (Exec)', 'Michael Chang (Design)'] },
  { id: 3, type: 'empty_department', title: 'Departments Without Employees', description: 'The "Legacy IT" department has 0 active employees.', count: 1, severity: 'low', affectedEntities: ['Legacy IT'] },
  { id: 4, type: 'idle_employee', title: 'Employees Without Projects', description: '156 employees are not assigned to any active projects.', count: 156, severity: 'medium', affectedEntities: ['View complete list in People Directory (Filtered by: Unassigned)'] },
  { id: 5, type: 'circular_report', title: 'Circular Reporting', description: 'No circular reporting detected in the current hierarchy.', count: 0, severity: 'success', affectedEntities: [] },
  { id: 6, type: 'depth', title: 'Hierarchy Depth', description: 'Maximum depth is 8 levels (Executive to Junior). Optimal is < 6.', count: 8, severity: 'warning', affectedEntities: ['Engineering (Backend Team)', 'Sales NA (Enterprise)'] },
];

export const AUDIT_LOGS = [
  { id: 'AL-9082', timestamp: '2026-07-04 14:32:01', user: 'Admin System', action: 'Hierarchy Edited', details: 'Auto-balanced Engineering department', ip: '10.0.0.1' },
  { id: 'AL-9081', timestamp: '2026-07-04 14:15:22', user: 'David Chen', action: 'Employee Moved', details: 'Moved Alex Smith to Cloud Migration', ip: '192.168.1.45' },
  { id: 'AL-9080', timestamp: '2026-07-04 13:45:00', user: 'Sarah Jenkins', action: 'Excel Uploaded', details: 'HR_Master_Q3.xlsx (14.2 MB)', ip: '192.168.1.12' },
  { id: 'AL-9079', timestamp: '2026-07-04 11:20:15', user: 'Marcus Johnson', action: 'Project Created', details: 'SAMS Dashboard initialized', ip: '192.168.1.88' },
  { id: 'AL-9078', timestamp: '2026-07-04 09:05:11', user: 'System', action: 'Version Restored', details: 'Rolled back to v2.1.4', ip: '10.0.0.1' },
  { id: 'AL-9077', timestamp: '2026-07-04 08:30:00', user: 'Priya Patel', action: 'Login', details: 'OTP Verified successfully', ip: '172.16.0.4' },
];

export const PEOPLE_DIRECTORY = [
  { 
    id: 'EMP-0001', name: 'Sarah Jenkins', role: 'Chief Executive Officer', department: 'Executive', location: 'San Francisco', status: 'Online', 
    employmentType: 'Full-time', workload: 85, healthScore: 98, assignedProjects: 12, directReports: 8, experience: '15 years', lastActive: 'Just now', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah',
    currentTeam: 'Executive Board',
    responsibilities: ['Strategic Direction', 'Board Relations', 'Global Operations'],
    skillsRadar: { technical: 65, leadership: 98, communication: 95, management: 90, innovation: 85, problemSolving: 92 },
    careerHistory: [
      { title: 'Chief Executive Officer', date: 'Jan 2024', desc: 'Promoted to CEO to lead global expansion.' },
      { title: 'Chief Operating Officer', date: 'Mar 2021', desc: 'Managed day-to-day operations and strategic scaling.' },
      { title: 'VP of Strategy', date: 'Jun 2018', desc: 'Led corporate strategy and acquisitions.' }
    ],
    sessionData: { os: 'macOS', browser: 'Chrome', ip: '10.0.0.12', location: 'San Francisco HQ (VPN)', loginTime: '08:15 AM', duration: '5h 42m', security: 'Verified' },
    aiPrediction: { eligiblePromotion: 'N/A', timeline: 'N/A', readiness: 100, missingSkills: [], suggestedTraining: ['Board Dynamics Masterclass'] },
    successors: [
      { name: 'David Chen', readiness: 85, gap: 'Cross-functional executive exposure' },
      { name: 'Elena Rodriguez', readiness: 78, gap: 'Financial operations' }
    ]
  },
  { 
    id: 'EMP-0012', name: 'David Chen', role: 'VP of Engineering', department: 'Engineering', location: 'Remote', status: 'Online', 
    employmentType: 'Full-time', workload: 92, healthScore: 82, assignedProjects: 4, directReports: 26, experience: '12 years', lastActive: '2 mins ago', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=David',
    currentTeam: 'Engineering Leadership',
    responsibilities: ['Technical Strategy', 'Architecture', 'Team Scaling', 'Infrastructure'],
    skillsRadar: { technical: 95, leadership: 88, communication: 82, management: 85, innovation: 90, problemSolving: 94 },
    careerHistory: [
      { title: 'VP of Engineering', date: 'Feb 2023', desc: 'Promoted from Director to lead all engineering.' },
      { title: 'Engineering Director', date: 'Aug 2020', desc: 'Managed Backend and Platform teams.' },
      { title: 'Senior Architect', date: 'Jan 2018', desc: 'Designed core microservices architecture.' }
    ],
    sessionData: { os: 'Linux (Ubuntu)', browser: 'Firefox', ip: '192.168.1.45', location: 'Seattle (Remote)', loginTime: '07:30 AM', duration: '6h 25m', security: 'Verified' },
    aiPrediction: { eligiblePromotion: 'Chief Technology Officer', timeline: '12-18 months', readiness: 85, missingSkills: ['Cross-department budgeting', 'Executive board communication'], suggestedTraining: ['Executive Presence', 'Enterprise Finance'] },
    successors: [
      { name: 'Marcus Johnson', readiness: 75, gap: 'Backend architecture experience' },
      { name: 'Priya Patel', readiness: 82, gap: 'Frontend and UI scaling' }
    ]
  },
  { 
    id: 'EMP-0045', name: 'Elena Rodriguez', role: 'VP of Product', department: 'Product', location: 'New York', status: 'Offline', 
    employmentType: 'Full-time', workload: 65, healthScore: 95, assignedProjects: 3, directReports: 14, experience: '10 years', lastActive: '4 hours ago', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena',
    currentTeam: 'Product Leadership',
    responsibilities: ['Product Roadmap', 'User Research', 'GTM Strategy'],
    skillsRadar: { technical: 60, leadership: 92, communication: 96, management: 88, innovation: 95, problemSolving: 85 },
    careerHistory: [
      { title: 'VP of Product', date: 'Oct 2023', desc: 'Leading global product strategy.' },
      { title: 'Product Director', date: 'Mar 2020', desc: 'Led Enterprise B2B product line.' }
    ],
    sessionData: { os: 'macOS', browser: 'Safari', ip: '172.16.2.14', location: 'New York Office', loginTime: '09:00 AM', duration: '0h 0m', security: 'Offline' },
    aiPrediction: { eligiblePromotion: 'Chief Product Officer', timeline: '24 months', readiness: 75, missingSkills: ['M&A Strategy'], suggestedTraining: ['Product Portfolio Management'] },
    successors: [
      { name: 'Sophia Lee', readiness: 65, gap: 'Technical architecture understanding' }
    ]
  },
  { 
    id: 'EMP-0182', name: 'Marcus Johnson', role: 'Frontend Manager', department: 'Engineering', location: 'San Francisco', status: 'Online', 
    employmentType: 'Full-time', workload: 78, healthScore: 88, assignedProjects: 2, directReports: 8, experience: '7 years', lastActive: 'Just now', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus',
    currentTeam: 'Frontend Platform',
    responsibilities: ['UI Architecture', 'Design System', 'Performance Optimization'],
    skillsRadar: { technical: 92, leadership: 75, communication: 85, management: 70, innovation: 80, problemSolving: 88 },
    careerHistory: [
      { title: 'Frontend Manager', date: 'Jan 2025', desc: 'Promoted to manage 8 UI developers.' },
      { title: 'Senior Frontend Engineer', date: 'May 2022', desc: 'Led migration to React 18.' }
    ],
    sessionData: { os: 'macOS', browser: 'Chrome', ip: '10.0.0.44', location: 'San Francisco HQ', loginTime: '09:15 AM', duration: '4h 40m', security: 'Verified' },
    aiPrediction: { eligiblePromotion: 'Engineering Director', timeline: '2-3 years', readiness: 60, missingSkills: ['Backend Architecture', 'Budgeting'], suggestedTraining: ['Full-stack System Design'] },
    successors: [
      { name: 'Alex Smith', readiness: 85, gap: 'People management' }
    ]
  },
  { 
    id: 'EMP-0199', name: 'Priya Patel', role: 'Backend Manager', department: 'Engineering', location: 'London', status: 'Busy', 
    employmentType: 'Full-time', workload: 95, healthScore: 75, assignedProjects: 5, directReports: 12, experience: '9 years', lastActive: 'In a meeting', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya',
    currentTeam: 'Core Services',
    responsibilities: ['API Development', 'Database Scaling', 'Microservices'],
    skillsRadar: { technical: 94, leadership: 82, communication: 78, management: 80, innovation: 85, problemSolving: 95 },
    careerHistory: [
      { title: 'Backend Manager', date: 'Aug 2024', desc: 'Managing 12 backend engineers.' },
      { title: 'Lead Backend Engineer', date: 'Nov 2021', desc: 'Architected payment processing gateway.' }
    ],
    sessionData: { os: 'Windows 11', browser: 'Edge', ip: '10.1.2.14', location: 'London Office', loginTime: '08:00 GMT', duration: '6h 15m', security: 'Verified' },
    aiPrediction: { eligiblePromotion: 'Engineering Director', timeline: '12-18 months', readiness: 82, missingSkills: ['Frontend/UI Strategy'], suggestedTraining: ['Product Strategy for Engineers'] },
    successors: [
      { name: 'James Wilson', readiness: 70, gap: 'Team leadership' }
    ]
  },
  { 
    id: 'EMP-0342', name: 'Michael Chang', role: 'Lead Designer', department: 'Design', location: 'Remote', status: 'Leave', 
    employmentType: 'Contractor', workload: 0, healthScore: 100, assignedProjects: 0, directReports: 0, experience: '6 years', lastActive: 'Yesterday', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Michael',
    currentTeam: 'Product Design',
    responsibilities: ['UI/UX Design', 'User Testing', 'Prototyping'],
    skillsRadar: { technical: 85, leadership: 60, communication: 88, management: 50, innovation: 95, problemSolving: 80 },
    careerHistory: [
      { title: 'Lead Designer', date: 'Feb 2024', desc: 'Promoted to Lead Designer.' }
    ],
    sessionData: { os: 'macOS', browser: 'Chrome', ip: '192.168.1.1', location: 'Remote', loginTime: 'N/A', duration: '0h 0m', security: 'Offline' },
    aiPrediction: { eligiblePromotion: 'Design Manager', timeline: 'N/A (Contractor)', readiness: 50, missingSkills: ['FTE Conversion'], suggestedTraining: [] },
    successors: []
  },
  { 
    id: 'EMP-0881', name: 'Alex Smith', role: 'Senior UI Developer', department: 'Engineering', location: 'Austin', status: 'Online', 
    employmentType: 'Full-time', workload: 60, healthScore: 92, assignedProjects: 2, directReports: 0, experience: '4 years', lastActive: '10 mins ago', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex',
    currentTeam: 'Frontend Platform',
    responsibilities: ['Component Library', 'Accessibility', 'React Development'],
    skillsRadar: { technical: 88, leadership: 50, communication: 75, management: 30, innovation: 82, problemSolving: 85 },
    careerHistory: [
      { title: 'Senior UI Developer', date: 'Jul 2025', desc: 'Promoted from Mid-level.' }
    ],
    sessionData: { os: 'macOS', browser: 'Chrome', ip: '10.2.0.15', location: 'Austin Office', loginTime: '08:45 AM', duration: '5h 10m', security: 'Verified' },
    aiPrediction: { eligiblePromotion: 'Frontend Manager', timeline: '12 months', readiness: 85, missingSkills: ['Conflict Resolution'], suggestedTraining: ['New Manager Bootcamp'] },
    successors: []
  },
  { 
    id: 'EMP-0922', name: 'Emma Watson', role: 'HR Director', department: 'HR & Admin', location: 'San Francisco', status: 'Busy', 
    employmentType: 'Full-time', workload: 82, healthScore: 96, assignedProjects: 3, directReports: 10, experience: '11 years', lastActive: 'Focus time', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Emma',
    currentTeam: 'People Ops',
    responsibilities: ['Talent Acquisition', 'Employee Relations', 'Benefits'],
    skillsRadar: { technical: 50, leadership: 90, communication: 95, management: 92, innovation: 75, problemSolving: 88 },
    careerHistory: [
      { title: 'HR Director', date: 'Jan 2023', desc: 'Leading global HR operations.' }
    ],
    sessionData: { os: 'macOS', browser: 'Safari', ip: '10.0.0.50', location: 'San Francisco HQ', loginTime: '09:00 AM', duration: '4h 55m', security: 'Verified' },
    aiPrediction: { eligiblePromotion: 'VP of HR', timeline: '24 months', readiness: 80, missingSkills: ['Executive Board Exposure'], suggestedTraining: ['Strategic HR Leadership'] },
    successors: []
  },
  { 
    id: 'EMP-1102', name: 'James Wilson', role: 'DevOps Engineer', department: 'Engineering', location: 'Remote', status: 'Online', 
    employmentType: 'Full-time', workload: 88, healthScore: 84, assignedProjects: 4, directReports: 0, experience: '5 years', lastActive: 'Just now', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=James',
    currentTeam: 'Platform Infrastructure',
    responsibilities: ['CI/CD Pipelines', 'AWS Management', 'Kubernetes'],
    skillsRadar: { technical: 92, leadership: 55, communication: 70, management: 40, innovation: 80, problemSolving: 90 },
    careerHistory: [
      { title: 'DevOps Engineer', date: 'May 2024', desc: 'Joined company.' }
    ],
    sessionData: { os: 'Linux (Arch)', browser: 'Firefox', ip: '192.168.1.100', location: 'Remote (Denver)', loginTime: '07:00 AM', duration: '6h 55m', security: 'Verified' },
    aiPrediction: { eligiblePromotion: 'Senior DevOps Engineer', timeline: '6 months', readiness: 95, missingSkills: [], suggestedTraining: ['Advanced Security Compliance'] },
    successors: []
  },
  { 
    id: 'EMP-1145', name: 'Sophia Lee', role: 'Product Marketing Manager', department: 'Marketing', location: 'New York', status: 'Offline', 
    employmentType: 'Full-time', workload: 45, healthScore: 98, assignedProjects: 1, directReports: 2, experience: '6 years', lastActive: '1 day ago', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sophia',
    currentTeam: 'Product Marketing',
    responsibilities: ['Go-to-Market', 'Positioning', 'Competitor Analysis'],
    skillsRadar: { technical: 65, leadership: 75, communication: 90, management: 60, innovation: 85, problemSolving: 78 },
    careerHistory: [
      { title: 'Product Marketing Manager', date: 'Aug 2025', desc: 'Promoted to manage product launches.' }
    ],
    sessionData: { os: 'macOS', browser: 'Chrome', ip: '172.16.2.22', location: 'New York Office', loginTime: 'N/A', duration: '0h 0m', security: 'Offline' },
    aiPrediction: { eligiblePromotion: 'Director of Product Marketing', timeline: '18 months', readiness: 70, missingSkills: ['Budget Management'], suggestedTraining: ['Marketing Analytics'] },
    successors: []
  }
];

export const DEPARTMENTS_DATA = [
  { id: 'D-01', name: 'Engineering', head: 'David Chen', employees: 4500, budget: '$24.5M', health: '98%' },
  { id: 'D-02', name: 'Sales', head: 'Robert Taylor', employees: 3200, budget: '$18.2M', health: '92%' },
  { id: 'D-03', name: 'Operations', head: 'Linda Martinez', employees: 2800, budget: '$12.0M', health: '85%' },
  { id: 'D-04', name: 'Product', head: 'Elena Rodriguez', employees: 1500, budget: '$8.5M', health: '95%' },
  { id: 'D-05', name: 'HR & Admin', head: 'Emma Watson', employees: 800, budget: '$4.2M', health: '99%' },
  { id: 'D-06', name: 'Executive', head: 'Sarah Jenkins', employees: 120, budget: '$6.8M', health: '100%' },
];

export const VERSIONS_DATA = [
  { id: 'v3.2.0', date: '2026-07-04', author: 'Sarah Jenkins', type: 'Excel Sync', changes: '+12 Employees, 3 Promotions, 1 Department Added', active: true },
  { id: 'v3.1.5', date: '2026-06-28', author: 'System Auto-Save', type: 'System', changes: 'Routine structural snapshot', active: false },
  { id: 'v3.1.0', date: '2026-06-15', author: 'David Chen', type: 'Manual Edit', parsed: true, changes: 'Engineering Reorg Phase 2', active: false },
  { id: 'v3.0.0', date: '2026-05-01', author: 'Emma Watson', type: 'Excel Sync', changes: 'Initial Q2 Master Upload', active: false },
];

// --- NEW DATA ---

export const ROLES_DATA = [
  { id: 'R-01', title: 'System Administrator', level: 'Level 1', users: 12, access: 'Full Platform Access' },
  { id: 'R-02', title: 'Organization Architect', level: 'Level 2', users: 45, access: 'Org Studio, Sync Center' },
  { id: 'R-03', title: 'HR Manager', level: 'Level 2', users: 120, access: 'People, Departments, Reports' },
  { id: 'R-04', title: 'Department Head', level: 'Level 3', users: 48, access: 'Department Scoped View' },
  { id: 'R-05', title: 'Standard Employee', level: 'Level 4', users: 14000, access: 'Read-only Profile View' },
];

export const INTELLIGENCE_LOGS = [
  {
    id: 'LOG-9001',
    timestamp: 'Just now',
    user: 'Sarah Jenkins',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah',
    action: 'Promotion',
    department: 'Engineering',
    project: 'Core Platform',
    details: 'Promoted David Chen from Manager to Director',
    impact: 'High',
    affectedEmployees: 12,
    version: 'v3.3.1',
    replayable: true,
    status: 'Success',
    ip: '192.168.1.12'
  },
  {
    id: 'LOG-9002',
    timestamp: '15 mins ago',
    user: 'System Bot',
    photo: null,
    action: 'Excel Sync',
    department: 'All',
    project: 'N/A',
    details: 'Imported HR_Master_Q3.xlsx. Updated 18 employees.',
    impact: 'Critical',
    affectedEmployees: 18,
    version: 'v3.3.0',
    replayable: true,
    status: 'Success',
    ip: '10.0.0.1'
  },
  {
    id: 'LOG-9003',
    timestamp: '1 hour ago',
    user: 'Emma Watson',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Emma',
    action: 'Transfer',
    department: 'Marketing',
    project: 'Rebranding',
    details: 'Moved 3 designers to Digital team',
    impact: 'Medium',
    affectedEmployees: 3,
    version: 'v3.2.9',
    replayable: true,
    status: 'Success',
    ip: '172.16.0.4'
  },
  {
    id: 'LOG-9004',
    timestamp: '3 hours ago',
    user: 'Kanishka Suthar',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kanishka',
    action: 'Hierarchy Update',
    department: 'Operations',
    project: 'N/A',
    details: 'Restructured reporting lines for QA division',
    impact: 'High',
    affectedEmployees: 8,
    version: 'v3.2.8',
    replayable: true,
    status: 'Warning',
    ip: '192.168.1.5'
  },
  {
    id: 'LOG-9005',
    timestamp: '5 hours ago',
    user: 'David Chen',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=David',
    action: 'Role Change',
    department: 'Engineering',
    project: 'Cloud Migration',
    details: 'Changed Alex Smith role to DevOps Lead',
    impact: 'Low',
    affectedEmployees: 1,
    version: 'v3.2.7',
    replayable: false,
    status: 'Success',
    ip: '192.168.1.45'
  },
  {
    id: 'LOG-9006',
    timestamp: '1 day ago',
    user: 'System Admin',
    photo: null,
    action: 'Version Restore',
    department: 'Global',
    project: 'N/A',
    details: 'Restored hierarchy to v3.1.0 backup',
    impact: 'Critical',
    affectedEmployees: 45,
    version: 'v3.2.6',
    replayable: true,
    status: 'Success',
    ip: '10.0.0.1'
  },
  {
    id: 'LOG-9007',
    timestamp: '1 day ago',
    user: 'Priya Patel',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya',
    action: 'Deletion',
    department: 'Sales',
    project: 'N/A',
    details: 'Removed obsolete contractor node',
    impact: 'Low',
    affectedEmployees: 0,
    version: 'v3.2.5',
    replayable: false,
    status: 'Success',
    ip: '172.16.1.18'
  },
  {
    id: 'LOG-9008',
    timestamp: '2 days ago',
    user: 'Sarah Jenkins',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah',
    action: 'Project Assignment',
    department: 'Product',
    project: 'Mobile App V2',
    details: 'Assigned 5 developers to Mobile App project',
    impact: 'Medium',
    affectedEmployees: 5,
    version: 'v3.2.4',
    replayable: false,
    status: 'Success',
    ip: '192.168.1.12'
  }
];


export const REPORTS_DATA = [
  { id: 'REP-102', name: 'Q3 Headcount Growth', type: 'PDF', date: '2026-07-01', size: '2.4 MB' },
  { id: 'REP-103', name: 'Department Budget Variance', type: 'XLSX', date: '2026-06-28', size: '1.1 MB' },
  { id: 'REP-104', name: 'Managerial Span of Control', type: 'PDF', date: '2026-06-15', size: '3.8 MB' },
  { id: 'REP-105', name: 'Cross-functional Projects', type: 'CSV', date: '2026-06-10', size: '0.4 MB' },
];

export const SESSIONS_REPLAY_DATA = [
  { 
    id: 'S-991', 
    user: 'Sarah Jenkins',
    role: 'Organization Architect',
    department: 'Executive',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah',
    device: 'MacBook Pro 16"', 
    browser: 'Chrome 114', 
    os: 'macOS Sonoma',
    ip: '192.168.1.12', 
    time: 'Active Now',
    loginTime: '10:01 AM',
    logoutTime: '-',
    duration: '17m',
    status: 'Active',
    events: [
      { id: 'E-01', time: '10:01 AM', action: 'Logged In', description: 'User authenticated successfully', page: 'Login', entity: 'System', type: 'auth' },
      { id: 'E-02', time: '10:02 AM', action: 'Dashboard Opened', description: 'Viewed KPI metrics', page: 'Dashboard', entity: 'Dashboard', type: 'nav' },
      { id: 'E-03', time: '10:03 AM', action: 'Organization Studio Opened', description: 'Loaded full hierarchy', page: 'Org Studio', entity: 'Hierarchy', type: 'nav' },
      { id: 'E-04', time: '10:05 AM', action: 'Employee Profile Viewed', description: 'Viewed profile', page: 'Org Studio', entity: 'David Chen', type: 'view' },
      { id: 'E-05', time: '10:07 AM', action: 'Promoted Employee', description: 'Changed role from Manager to Director', page: 'Org Studio', entity: 'David Chen', type: 'org_change' },
      { id: 'E-06', time: '10:10 AM', action: 'Excel Uploaded', description: 'Uploaded HR_Master.xlsx', page: 'Sync Center', entity: 'File', type: 'action' },
      { id: 'E-07', time: '10:12 AM', action: 'Excel Sync Applied', description: 'Synced 12 new employees', page: 'Sync Center', entity: 'System', type: 'org_change' },
      { id: 'E-08', time: '10:15 AM', action: 'Version Created', description: 'Saved state as v3.3.0', page: 'Sync Center', entity: 'Version History', type: 'action' },
    ]
  },
  { 
    id: 'S-992', 
    user: 'David Chen', 
    role: 'Department Head',
    department: 'Engineering',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=David',
    device: 'Windows PC', 
    browser: 'Edge 112', 
    os: 'Windows 11',
    ip: '192.168.1.45', 
    time: 'Active Now',
    loginTime: '08:30 AM',
    logoutTime: '-',
    duration: '1h 45m',
    status: 'Active',
    events: [
      { id: 'E-11', time: '08:30 AM', action: 'Logged In', description: 'OTP Verified', page: 'Login', entity: 'System', type: 'auth' },
      { id: 'E-12', time: '08:31 AM', action: 'Dashboard Opened', description: 'Viewed KPI metrics', page: 'Dashboard', entity: 'Dashboard', type: 'nav' },
      { id: 'E-13', time: '08:45 AM', action: 'Project Created', description: 'Created Cloud Migration Phase 2', page: 'Projects', entity: 'Project', type: 'action' },
      { id: 'E-14', time: '09:10 AM', action: 'Department Change', description: 'Moved 5 employees to new team', page: 'Org Studio', entity: 'Engineering', type: 'org_change' }
    ]
  },
  { 
    id: 'S-993', 
    user: 'Priya Patel', 
    role: 'HR Manager',
    department: 'HR & Admin',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya',
    device: 'iPhone 14 Pro', 
    browser: 'Safari iOS', 
    os: 'iOS 16',
    ip: '172.16.0.4', 
    time: '2 hours ago',
    loginTime: '07:15 AM',
    logoutTime: '08:15 AM',
    duration: '1h 00m',
    status: 'Completed',
    events: [
      { id: 'E-21', time: '07:15 AM', action: 'Logged In', description: 'Mobile login', page: 'Login', entity: 'System', type: 'auth' },
      { id: 'E-22', time: '07:20 AM', action: 'Viewed Employee Profile', description: 'Viewed Sarah Jenkins', page: 'People', entity: 'Sarah Jenkins', type: 'view' },
      { id: 'E-23', time: '07:45 AM', action: 'Responsibility Matrix Updated', description: 'Changed hiring flow', page: 'Matrix', entity: 'Responsibilities', type: 'action' },
      { id: 'E-24', time: '08:15 AM', action: 'Logged Out', description: 'Session ended manually', page: 'System', entity: 'System', type: 'auth' }
    ]
  }
];

export const DECISION_FLOWS_DATA = [
  { id: 'DF-01', name: 'Capital Expenditure > $50k', status: 'Active', nodes: 5 },
  { id: 'DF-02', name: 'New Hire Approval', status: 'Active', nodes: 3 },
  { id: 'DF-03', name: 'Cloud Provider Change', status: 'Draft', nodes: 8 },
];

export const RESPONSIBILITIES_DATA = [
  { id: 'RM-01', function: 'Budget Approval', owner: 'Finance', accountable: 'CEO', consulted: 'Department Heads', informed: 'All Managers' },
];

export const NOTIFICATIONS_DATA = [
  { id: 'N-01', title: 'System Update', message: 'Vite restarted successfully.', read: false, time: 'Just now' }
];

export const USERS_DATA = [
  { id: 'U-01', name: 'Sarah Jenkins', email: 'sarah@sams.com', role: 'Organization Architect', status: 'Active', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah' },
  { id: 'U-02', name: 'David Chen', email: 'david@sams.com', role: 'Department Head', status: 'Active', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=David' },
];

export const SCORECARD_DATA = {
  healthScore: 94,
  hierarchyStability: 98,
  departmentCoverage: 96,
  managerEfficiency: 89,
  employeeAllocation: 92,
  reportingAccuracy: 97
};

export const AI_SUMMARY_DATA = [
  { id: 'S1', text: 'Engineering hierarchy is healthy.', status: 'success' },
  { id: 'S2', text: 'HR has 4 employees without reporting managers.', status: 'warning' },
  { id: 'S3', text: 'Finance manager has exceeded the recommended reporting span.', status: 'warning' },
  { id: 'S4', text: 'No circular reporting detected.', status: 'success' },
  { id: 'S5', text: 'Excel synchronization completed successfully.', status: 'success' },
  { id: 'S6', text: 'Organization structure remains stable.', status: 'success' },
];

export const RECOMMENDATIONS_DATA = [
  { id: 'R1', priority: 'High', impact: 'Critical', action: 'Assign a manager to HR Department', actionType: 'assign_manager', target: 'HR' },
  { id: 'R2', priority: 'Medium', impact: 'High', action: 'Split Engineering into two reporting groups', actionType: 'split_dept', target: 'Engineering' },
  { id: 'R3', priority: 'High', impact: 'High', action: 'Reduce Finance manager\'s reporting span', actionType: 'reassign_reports', target: 'Finance' },
  { id: 'R4', priority: 'Medium', impact: 'Medium', action: 'Move 3 employees from Operations to Cloud Team', actionType: 'transfer', target: 'Operations' },
  { id: 'R5', priority: 'Low', impact: 'Medium', action: 'Archive inactive Legacy department', actionType: 'archive_dept', target: 'Legacy' },
  { id: 'R6', priority: 'Low', impact: 'Low', action: 'Merge duplicate reporting chains', actionType: 'merge_chains', target: 'Marketing' },
];

export const MANAGER_WORKLOAD_DATA = [
  { id: 'M1', name: 'David Chen', department: 'Engineering', directReports: 26, recommendedLimit: 12, workload: 216, risk: 'High', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=David' },
  { id: 'M2', name: 'Elena Rodriguez', department: 'Finance', directReports: 18, recommendedLimit: 12, workload: 150, risk: 'High', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena' },
  { id: 'M3', name: 'Marcus Johnson', department: 'Operations', directReports: 14, recommendedLimit: 15, workload: 93, risk: 'Low', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus' },
  { id: 'M4', name: 'Sarah Jenkins', department: 'HR', directReports: 5, recommendedLimit: 15, workload: 33, risk: 'Low', photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah' },
];

export const FORECAST_DATA = [
  { id: 'F1', title: 'Promotion Eligibility', description: '3 employees are likely to require promotion based on tenure and performance.', type: 'promotion' },
  { id: 'F2', title: 'Management Gap', description: 'Finance may require another manager by Q3.', type: 'gap' },
  { id: 'F3', title: 'Capacity Warning', description: 'Engineering hierarchy may exceed capacity next month.', type: 'capacity' },
  { id: 'F4', title: 'Consolidation Opportunity', description: 'HR team can be consolidated into Operations.', type: 'consolidation' },
];

export const DEPT_HEALTH_DATA = [
  { id: 'DH1', name: 'Engineering', healthScore: 92, employees: 142, projects: 8, manager: 'David Chen', avgSpan: 14, depth: 4, pendingIssues: 2, status: 'Healthy' },
  { id: 'DH2', name: 'Finance', healthScore: 76, employees: 45, projects: 3, manager: 'Elena Rodriguez', avgSpan: 18, depth: 3, pendingIssues: 5, status: 'Warning' },
  { id: 'DH3', name: 'Operations', healthScore: 98, employees: 86, projects: 5, manager: 'Marcus Johnson', avgSpan: 8, depth: 3, pendingIssues: 0, status: 'Excellent' },
];

export const PROJECT_IMPACT_DATA = [
  { id: 'P1', name: 'Project Atlas', employees: 42, departments: 4, newManagersRequired: 2, expectedCompletion: 'Oct 2026', hierarchyImpact: 'Medium' },
  { id: 'P2', name: 'Cloud Migration', employees: 18, departments: 2, newManagersRequired: 0, expectedCompletion: 'Dec 2026', hierarchyImpact: 'Low' },
];

export const QUALITY_CHECK_DATA = [
  { id: 'QC1', issue: 'Missing Managers', count: 4, severity: 'High', suggestedFix: 'Assign managers', type: 'missing_manager' },
  { id: 'QC2', issue: 'Duplicate Reporting', count: 1, severity: 'Medium', suggestedFix: 'Resolve chain', type: 'duplicate_report' },
  { id: 'QC3', issue: 'Circular Reporting', count: 0, severity: 'Low', suggestedFix: 'None', type: 'circular_report' },
  { id: 'QC4', issue: 'Hierarchy Depth', count: 6, severity: 'Medium', suggestedFix: 'Flatten structure', type: 'depth' },
  { id: 'QC5', issue: 'Orphan Employees', count: 2, severity: 'High', suggestedFix: 'Assign to active node', type: 'orphan' },
  { id: 'QC6', issue: 'Inactive Departments', count: 1, severity: 'Low', suggestedFix: 'Archive department', type: 'inactive_dept' },
];

export const SIMULATOR_DATA = {
  scenarios: ['Move Sarah Johnson to Engineering', 'Merge HR and Operations', 'Promote David Chen', 'Add New Department', 'Split Engineering Team'],
  results: {
    healthScoreDiff: '+2%',
    managerLoadDiff: '-14%',
    hierarchyDepthDiff: 'No change',
    reportingChanges: 12,
    affectedEmployees: 24,
    before: { health: 94, load: 85, employees: 240, depth: 4 },
    after: { health: 96, load: 71, employees: 240, depth: 4 }
  }
};

export const ANALYTICS_DATA = {
  growth: [30, 45, 60, 55, 85, 95],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
};


