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
    id: "EMP-0001",
    name: "Sarah Jenkins",
    role: "Chief Executive Officer",
    department: "Executive",
    location: "San Francisco",
    status: "Online",
    employmentType: "Full-time",
    workload: 85,
    healthScore: 98,
    assignedProjects: 12,
    directReports: 8,
    experience: "15 years",
    lastActive: "Just now",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah",
    currentTeam: "Executive Board",
    responsibilities: [
      "Strategic Direction",
      "Board Relations",
      "Global Operations"
    ],
    skillsRadar: {
      technical: 65,
      leadership: 98,
      communication: 95,
      management: 90,
      innovation: 85,
      problemSolving: 92
    },
    careerHistory: [
      {
        title: "Chief Executive Officer",
        date: "Jan 2024",
        desc: "Promoted to CEO to lead global expansion."
      },
      {
        title: "Chief Operating Officer",
        date: "Mar 2021",
        desc: "Managed day-to-day operations and strategic scaling."
      },
      {
        title: "VP of Strategy",
        date: "Jun 2018",
        desc: "Led corporate strategy and acquisitions."
      }
    ],
    sessionData: {
      os: "macOS",
      browser: "Chrome",
      ip: "10.0.0.12",
      location: "San Francisco HQ (VPN)",
      loginTime: "08:15 AM",
      duration: "5h 42m",
      security: "Verified"
    },
    aiPrediction: {
      eligiblePromotion: "N/A",
      timeline: "N/A",
      readiness: 100,
      missingSkills: [],
      suggestedTraining: [
        "Board Dynamics Masterclass"
      ]
    },
    successors: [
      {
        name: "David Chen",
        readiness: 85,
        gap: "Cross-functional executive exposure"
      },
      {
        name: "Elena Rodriguez",
        readiness: 78,
        gap: "Financial operations"
      }
    ],
    managerId: null,
    directReportIds: [
      "EMP-0012",
      "EMP-0045",
      "EMP-0922"
    ],
    peerIds: [],
    authorityScores: {
      reporting: 70,
      decision: 98,
      project: 89,
      crossTeam: 90,
      approval: 96
    },
    authorityType: "STRATEGIC DECISION MAKER",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: [
      {
        id: 1,
        name: "Q4 Reorg",
        role: "Executive Sponsor",
        authorityLevel: "DECISION MAKER",
        progress: 100,
        allocationPercentage: 10,
        health: "EXCELLENT",
        manager: "Sarah Jenkins",
        teamSize: 45,
        dueDate: "2026-07-01"
      }
    ]
  },
  {
    id: "EMP-0012",
    name: "David Chen",
    role: "VP of Engineering",
    department: "Engineering",
    location: "Remote",
    status: "Online",
    employmentType: "Full-time",
    workload: 92,
    healthScore: 82,
    assignedProjects: 4,
    directReports: 26,
    experience: "12 years",
    lastActive: "2 mins ago",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=David",
    currentTeam: "Engineering Leadership",
    responsibilities: [
      "Technical Strategy",
      "Architecture",
      "Team Scaling",
      "Infrastructure"
    ],
    skillsRadar: {
      technical: 95,
      leadership: 88,
      communication: 82,
      management: 85,
      innovation: 90,
      problemSolving: 94
    },
    careerHistory: [
      {
        title: "VP of Engineering",
        date: "Feb 2023",
        desc: "Promoted from Director to lead all engineering."
      },
      {
        title: "Engineering Director",
        date: "Aug 2020",
        desc: "Managed Backend and Platform teams."
      },
      {
        title: "Senior Architect",
        date: "Jan 2018",
        desc: "Designed core microservices architecture."
      }
    ],
    sessionData: {
      os: "Linux (Ubuntu)",
      browser: "Firefox",
      ip: "192.168.1.45",
      location: "Seattle (Remote)",
      loginTime: "07:30 AM",
      duration: "6h 25m",
      security: "Verified"
    },
    aiPrediction: {
      eligiblePromotion: "Chief Technology Officer",
      timeline: "12-18 months",
      readiness: 85,
      missingSkills: [
        "Cross-department budgeting",
        "Executive board communication"
      ],
      suggestedTraining: [
        "Executive Presence",
        "Enterprise Finance"
      ]
    },
    successors: [
      {
        name: "Marcus Johnson",
        readiness: 75,
        gap: "Backend architecture experience"
      },
      {
        name: "Priya Patel",
        readiness: 82,
        gap: "Frontend and UI scaling"
      }
    ],
    managerId: "EMP-0001",
    directReportIds: [
      "EMP-0182",
      "EMP-0199",
      "EMP-0881",
      "EMP-1102"
    ],
    peerIds: [
      "EMP-0045",
      "EMP-0922"
    ],
    authorityScores: {
      reporting: 94,
      decision: 82,
      project: 89,
      crossTeam: 90,
      approval: 96
    },
    authorityType: "TECHNICAL AUTHORITY",
    decisionFlowIds: [
      "DF-101",
      "DF-102",
      "DF-103",
      "DF-104",
      "DF-105"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports",
      "Architecture Review",
      "Engineering Budget Approval",
      "Technical Hiring Approval"
    ],
    projects: [
      {
        id: 1,
        name: "Cloud Migration",
        role: "Technical Authority",
        authorityLevel: "APPROVER",
        progress: 72,
        allocationPercentage: 40,
        health: "AT RISK",
        manager: "David Chen",
        teamSize: 18,
        dueDate: "2026-08-15"
      },
      {
        id: 2,
        name: "SAMS Dashboard",
        role: "Engineering Sponsor",
        authorityLevel: "PROJECT OWNER",
        progress: 65,
        allocationPercentage: 20,
        health: "GOOD",
        manager: "Marcus Johnson",
        teamSize: 12,
        dueDate: "2026-09-30"
      },
      {
        id: 3,
        name: "Excel Sync Engine",
        role: "Approval Authority",
        authorityLevel: "APPROVER",
        progress: 40,
        allocationPercentage: 15,
        health: "NEEDS ATTENTION",
        manager: "Priya Patel",
        teamSize: 15,
        dueDate: "2026-10-15"
      }
    ]
  },
  {
    id: "EMP-0045",
    name: "Elena Rodriguez",
    role: "VP of Product",
    department: "Product",
    location: "New York",
    status: "Offline",
    employmentType: "Full-time",
    workload: 65,
    healthScore: 95,
    assignedProjects: 3,
    directReports: 14,
    experience: "10 years",
    lastActive: "4 hours ago",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=Elena",
    currentTeam: "Product Leadership",
    responsibilities: [
      "Product Roadmap",
      "User Research",
      "GTM Strategy"
    ],
    skillsRadar: {
      technical: 60,
      leadership: 92,
      communication: 96,
      management: 88,
      innovation: 95,
      problemSolving: 85
    },
    careerHistory: [
      {
        title: "VP of Product",
        date: "Oct 2023",
        desc: "Leading global product strategy."
      },
      {
        title: "Product Director",
        date: "Mar 2020",
        desc: "Led Enterprise B2B product line."
      }
    ],
    sessionData: {
      os: "macOS",
      browser: "Safari",
      ip: "172.16.2.14",
      location: "New York Office",
      loginTime: "09:00 AM",
      duration: "0h 0m",
      security: "Offline"
    },
    aiPrediction: {
      eligiblePromotion: "Chief Product Officer",
      timeline: "24 months",
      readiness: 75,
      missingSkills: [
        "M&A Strategy"
      ],
      suggestedTraining: [
        "Product Portfolio Management"
      ]
    },
    successors: [
      {
        name: "Sophia Lee",
        readiness: 65,
        gap: "Technical architecture understanding"
      }
    ],
    managerId: "EMP-0001",
    directReportIds: [
      "EMP-0342",
      "EMP-1145"
    ],
    peerIds: [
      "EMP-0012",
      "EMP-0922"
    ],
    authorityScores: {
      reporting: 94,
      decision: 60,
      project: 50,
      crossTeam: 90,
      approval: 50
    },
    authorityType: "Operational Leader",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: []
  },
  {
    id: "EMP-0182",
    name: "Marcus Johnson",
    role: "Frontend Manager",
    department: "Engineering",
    location: "San Francisco",
    status: "Online",
    employmentType: "Full-time",
    workload: 78,
    healthScore: 88,
    assignedProjects: 2,
    directReports: 8,
    experience: "7 years",
    lastActive: "Just now",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=Marcus",
    currentTeam: "Frontend Platform",
    responsibilities: [
      "UI Architecture",
      "Design System",
      "Performance Optimization"
    ],
    skillsRadar: {
      technical: 92,
      leadership: 75,
      communication: 85,
      management: 70,
      innovation: 80,
      problemSolving: 88
    },
    careerHistory: [
      {
        title: "Frontend Manager",
        date: "Jan 2025",
        desc: "Promoted to manage 8 UI developers."
      },
      {
        title: "Senior Frontend Engineer",
        date: "May 2022",
        desc: "Led migration to React 18."
      }
    ],
    sessionData: {
      os: "macOS",
      browser: "Chrome",
      ip: "10.0.0.44",
      location: "San Francisco HQ",
      loginTime: "09:15 AM",
      duration: "4h 40m",
      security: "Verified"
    },
    aiPrediction: {
      eligiblePromotion: "Engineering Director",
      timeline: "2-3 years",
      readiness: 60,
      missingSkills: [
        "Backend Architecture",
        "Budgeting"
      ],
      suggestedTraining: [
        "Full-stack System Design"
      ]
    },
    successors: [
      {
        name: "Alex Smith",
        readiness: 85,
        gap: "People management"
      }
    ],
    managerId: "EMP-0012",
    directReportIds: [],
    peerIds: [
      "EMP-0199"
    ],
    authorityScores: {
      reporting: 70,
      decision: 60,
      project: 50,
      crossTeam: 60,
      approval: 50
    },
    authorityType: "People Manager",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: [
      {
        id: 2,
        name: "SAMS Dashboard",
        role: "Frontend Lead",
        authorityLevel: "CONTRIBUTOR",
        progress: 65,
        allocationPercentage: 80,
        health: "GOOD",
        manager: "Marcus Johnson",
        teamSize: 12,
        dueDate: "2026-09-30"
      }
    ]
  },
  {
    id: "EMP-0199",
    name: "Priya Patel",
    role: "Backend Manager",
    department: "Engineering",
    location: "London",
    status: "Busy",
    employmentType: "Full-time",
    workload: 95,
    healthScore: 75,
    assignedProjects: 5,
    directReports: 12,
    experience: "9 years",
    lastActive: "In a meeting",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya",
    currentTeam: "Core Services",
    responsibilities: [
      "API Development",
      "Database Scaling",
      "Microservices"
    ],
    skillsRadar: {
      technical: 94,
      leadership: 82,
      communication: 78,
      management: 80,
      innovation: 85,
      problemSolving: 95
    },
    careerHistory: [
      {
        title: "Backend Manager",
        date: "Aug 2024",
        desc: "Managing 12 backend engineers."
      },
      {
        title: "Lead Backend Engineer",
        date: "Nov 2021",
        desc: "Architected payment processing gateway."
      }
    ],
    sessionData: {
      os: "Windows 11",
      browser: "Edge",
      ip: "10.1.2.14",
      location: "London Office",
      loginTime: "08:00 GMT",
      duration: "6h 15m",
      security: "Verified"
    },
    aiPrediction: {
      eligiblePromotion: "Engineering Director",
      timeline: "12-18 months",
      readiness: 82,
      missingSkills: [
        "Frontend/UI Strategy"
      ],
      suggestedTraining: [
        "Product Strategy for Engineers"
      ]
    },
    successors: [
      {
        name: "James Wilson",
        readiness: 70,
        gap: "Team leadership"
      }
    ],
    managerId: "EMP-0012",
    directReportIds: [],
    peerIds: [
      "EMP-0182"
    ],
    authorityScores: {
      reporting: 94,
      decision: 60,
      project: 89,
      crossTeam: 60,
      approval: 50
    },
    authorityType: "People Manager",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: []
  },
  {
    id: "EMP-0342",
    name: "Michael Chang",
    role: "Lead Designer",
    department: "Design",
    location: "Remote",
    status: "Leave",
    employmentType: "Contractor",
    workload: 0,
    healthScore: 100,
    assignedProjects: 0,
    directReports: 0,
    experience: "6 years",
    lastActive: "Yesterday",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=Michael",
    currentTeam: "Product Design",
    responsibilities: [
      "UI/UX Design",
      "User Testing",
      "Prototyping"
    ],
    skillsRadar: {
      technical: 85,
      leadership: 60,
      communication: 88,
      management: 50,
      innovation: 95,
      problemSolving: 80
    },
    careerHistory: [
      {
        title: "Lead Designer",
        date: "Feb 2024",
        desc: "Promoted to Lead Designer."
      }
    ],
    sessionData: {
      os: "macOS",
      browser: "Chrome",
      ip: "192.168.1.1",
      location: "Remote",
      loginTime: "N/A",
      duration: "0h 0m",
      security: "Offline"
    },
    aiPrediction: {
      eligiblePromotion: "Design Manager",
      timeline: "N/A (Contractor)",
      readiness: 50,
      missingSkills: [
        "FTE Conversion"
      ],
      suggestedTraining: []
    },
    successors: [],
    managerId: null,
    directReportIds: [],
    peerIds: [],
    authorityScores: {
      reporting: 40,
      decision: 60,
      project: 50,
      crossTeam: 60,
      approval: 50
    },
    authorityType: "Standard Employee",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: []
  },
  {
    id: "EMP-0881",
    name: "Alex Smith",
    role: "Senior UI Developer",
    department: "Engineering",
    location: "Austin",
    status: "Online",
    employmentType: "Full-time",
    workload: 60,
    healthScore: 92,
    assignedProjects: 2,
    directReports: 0,
    experience: "4 years",
    lastActive: "10 mins ago",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex",
    currentTeam: "Frontend Platform",
    responsibilities: [
      "Component Library",
      "Accessibility",
      "React Development"
    ],
    skillsRadar: {
      technical: 88,
      leadership: 50,
      communication: 75,
      management: 30,
      innovation: 82,
      problemSolving: 85
    },
    careerHistory: [
      {
        title: "Senior UI Developer",
        date: "Jul 2025",
        desc: "Promoted from Mid-level."
      }
    ],
    sessionData: {
      os: "macOS",
      browser: "Chrome",
      ip: "10.2.0.15",
      location: "Austin Office",
      loginTime: "08:45 AM",
      duration: "5h 10m",
      security: "Verified"
    },
    aiPrediction: {
      eligiblePromotion: "Frontend Manager",
      timeline: "12 months",
      readiness: 85,
      missingSkills: [
        "Conflict Resolution"
      ],
      suggestedTraining: [
        "New Manager Bootcamp"
      ]
    },
    successors: [],
    managerId: "EMP-0182",
    directReportIds: [],
    peerIds: [],
    authorityScores: {
      reporting: 40,
      decision: 60,
      project: 50,
      crossTeam: 60,
      approval: 50
    },
    authorityType: "Standard Employee",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: []
  },
  {
    id: "EMP-0922",
    name: "Emma Watson",
    role: "HR Director",
    department: "HR & Admin",
    location: "San Francisco",
    status: "Busy",
    employmentType: "Full-time",
    workload: 82,
    healthScore: 96,
    assignedProjects: 3,
    directReports: 10,
    experience: "11 years",
    lastActive: "Focus time",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=Emma",
    currentTeam: "People Ops",
    responsibilities: [
      "Talent Acquisition",
      "Employee Relations",
      "Benefits"
    ],
    skillsRadar: {
      technical: 50,
      leadership: 90,
      communication: 95,
      management: 92,
      innovation: 75,
      problemSolving: 88
    },
    careerHistory: [
      {
        title: "HR Director",
        date: "Jan 2023",
        desc: "Leading global HR operations."
      }
    ],
    sessionData: {
      os: "macOS",
      browser: "Safari",
      ip: "10.0.0.50",
      location: "San Francisco HQ",
      loginTime: "09:00 AM",
      duration: "4h 55m",
      security: "Verified"
    },
    aiPrediction: {
      eligiblePromotion: "VP of HR",
      timeline: "24 months",
      readiness: 80,
      missingSkills: [
        "Executive Board Exposure"
      ],
      suggestedTraining: [
        "Strategic HR Leadership"
      ]
    },
    successors: [],
    managerId: "EMP-0001",
    directReportIds: [],
    peerIds: [
      "EMP-0012",
      "EMP-0045"
    ],
    authorityScores: {
      reporting: 70,
      decision: 60,
      project: 50,
      crossTeam: 60,
      approval: 96
    },
    authorityType: "Approval Gatekeeper",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: []
  },
  {
    id: "EMP-1102",
    name: "James Wilson",
    role: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    status: "Online",
    employmentType: "Full-time",
    workload: 88,
    healthScore: 84,
    assignedProjects: 4,
    directReports: 0,
    experience: "5 years",
    lastActive: "Just now",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=James",
    currentTeam: "Platform Infrastructure",
    responsibilities: [
      "CI/CD Pipelines",
      "AWS Management",
      "Kubernetes"
    ],
    skillsRadar: {
      technical: 92,
      leadership: 55,
      communication: 70,
      management: 40,
      innovation: 80,
      problemSolving: 90
    },
    careerHistory: [
      {
        title: "DevOps Engineer",
        date: "May 2024",
        desc: "Joined company."
      }
    ],
    sessionData: {
      os: "Linux (Arch)",
      browser: "Firefox",
      ip: "192.168.1.100",
      location: "Remote (Denver)",
      loginTime: "07:00 AM",
      duration: "6h 55m",
      security: "Verified"
    },
    aiPrediction: {
      eligiblePromotion: "Senior DevOps Engineer",
      timeline: "6 months",
      readiness: 95,
      missingSkills: [],
      suggestedTraining: [
        "Advanced Security Compliance"
      ]
    },
    successors: [],
    managerId: "EMP-0199",
    directReportIds: [],
    peerIds: [],
    authorityScores: {
      reporting: 40,
      decision: 60,
      project: 89,
      crossTeam: 60,
      approval: 50
    },
    authorityType: "Standard Employee",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: []
  },
  {
    id: "EMP-1145",
    name: "Sophia Lee",
    role: "Product Marketing Manager",
    department: "Marketing",
    location: "New York",
    status: "Offline",
    employmentType: "Full-time",
    workload: 45,
    healthScore: 98,
    assignedProjects: 1,
    directReports: 2,
    experience: "6 years",
    lastActive: "1 day ago",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=Sophia",
    currentTeam: "Product Marketing",
    responsibilities: [
      "Go-to-Market",
      "Positioning",
      "Competitor Analysis"
    ],
    skillsRadar: {
      technical: 65,
      leadership: 75,
      communication: 90,
      management: 60,
      innovation: 85,
      problemSolving: 78
    },
    careerHistory: [
      {
        title: "Product Marketing Manager",
        date: "Aug 2025",
        desc: "Promoted to manage product launches."
      }
    ],
    sessionData: {
      os: "macOS",
      browser: "Chrome",
      ip: "172.16.2.22",
      location: "New York Office",
      loginTime: "N/A",
      duration: "0h 0m",
      security: "Offline"
    },
    aiPrediction: {
      eligiblePromotion: "Director of Product Marketing",
      timeline: "18 months",
      readiness: 70,
      missingSkills: [
        "Budget Management"
      ],
      suggestedTraining: [
        "Marketing Analytics"
      ]
    },
    successors: [],
    managerId: null,
    directReportIds: [],
    peerIds: [],
    authorityScores: {
      reporting: 70,
      decision: 60,
      project: 50,
      crossTeam: 60,
      approval: 50
    },
    authorityType: "People Manager",
    decisionFlowIds: [
      "DF-101",
      "DF-102"
    ],
    approvalResponsibilities: [
      "Time Off",
      "Expense Reports"
    ],
    projects: []
  }
];

export const DEPARTMENTS_DATA = [
  { 
    id: 'D-01', name: 'Engineering', head: 'David Chen', headId: 'EMP-001', budget: '$24.5M', 
    signals: ['HIGH AUTHORITY', 'OVERLOADED MANAGER'],
    dnaScores: { people: 86, authority: 61, project: 94, decision: 89, connection: 78 },
    dnaType: 'STRATEGIC AUTHORITY HUB',
    description: 'Core product engineering and platform infrastructure.',
    authorityConcentration: 'HIGH',
    projectCount: 8,
    authorityScore: 92
  },
  { 
    id: 'D-02', name: 'Sales', head: 'Robert Taylor', headId: 'EMP-013', budget: '$18.2M', 
    signals: ['HIGH PROJECT LOAD'],
    dnaScores: { people: 92, authority: 45, project: 60, decision: 50, connection: 85 },
    dnaType: 'PEOPLE-HEAVY STRUCTURE',
    description: 'Global sales, business development and customer success.',
    authorityConcentration: 'LOW',
    projectCount: 3,
    authorityScore: 68
  },
  { 
    id: 'D-03', name: 'Operations', head: 'Linda Martinez', headId: 'EMP-007', budget: '$12.0M', 
    signals: ['CRITICAL DEPENDENCY'],
    dnaScores: { people: 70, authority: 80, project: 45, decision: 75, connection: 90 },
    dnaType: 'OPERATIONAL CORE',
    description: 'Day-to-day business operations and internal IT.',
    authorityConcentration: 'MEDIUM',
    projectCount: 5,
    authorityScore: 81
  },
  { 
    id: 'D-04', name: 'Product', head: 'Elena Rodriguez', headId: 'EMP-004', budget: '$8.5M', 
    signals: ['HEALTHY STRUCTURE'],
    dnaScores: { people: 55, authority: 88, project: 96, decision: 82, connection: 94 },
    dnaType: 'PROJECT POWERHOUSE',
    description: 'Product management, design, and user research.',
    authorityConcentration: 'MEDIUM',
    projectCount: 12,
    authorityScore: 89
  },
  { 
    id: 'D-05', name: 'HR & Admin', head: 'Emma Watson', headId: 'EMP-018', budget: '$4.2M', 
    signals: ['STRUCTURE STABLE'],
    dnaScores: { people: 80, authority: 40, project: 30, decision: 45, connection: 95 },
    dnaType: 'CROSS-FUNCTIONAL CONNECTOR',
    description: 'Human resources, talent acquisition and office administration.',
    authorityConcentration: 'LOW',
    projectCount: 2,
    authorityScore: 54
  },
  { 
    id: 'D-06', name: 'Executive', head: 'Sarah Jenkins', headId: 'EMP-005', budget: '$6.8M', 
    signals: ['CRITICAL AUTHORITY'],
    dnaScores: { people: 20, authority: 98, project: 85, decision: 99, connection: 60 },
    dnaType: 'DECISION BOTTLENECK',
    description: 'C-Suite and executive leadership team.',
    authorityConcentration: 'CRITICAL',
    projectCount: 4,
    authorityScore: 99
  },
];

export const VERSIONS_DATA = [
  { id: 'v3.2.0', date: '2026-07-04', author: 'Sarah Jenkins', type: 'Excel Sync', changes: '+12 Employees, 3 Promotions, 1 Department Added', active: true },
  { id: 'v3.1.5', date: '2026-06-28', author: 'System Auto-Save', type: 'System', changes: 'Routine structural snapshot', active: false },
  { id: 'v3.1.0', date: '2026-06-15', author: 'David Chen', type: 'Manual Edit', parsed: true, changes: 'Engineering Reorg Phase 2', active: false },
  { id: 'v3.0.0', date: '2026-05-01', author: 'Emma Watson', type: 'Excel Sync', changes: 'Initial Q2 Master Upload', active: false },
];

// --- NEW DATA ---

export const ALL_PERMISSIONS = [
  { key: 'organization.view', name: 'View Organization', module: 'Organization Studio', risk: 'LOW' },
  { key: 'organization.edit', name: 'Edit Hierarchy', module: 'Organization Studio', risk: 'HIGH' },
  { key: 'organization.move_employee', name: 'Move Employee', module: 'Organization Studio', risk: 'HIGH' },
  { key: 'organization.change_manager', name: 'Change Manager', module: 'Organization Studio', risk: 'HIGH' },
  { key: 'organization.create_node', name: 'Create Node', module: 'Organization Studio', risk: 'HIGH' },
  { key: 'organization.delete_node', name: 'Delete Node', module: 'Organization Studio', risk: 'CRITICAL' },
  { key: 'organization.restore_version', name: 'Restore Version', module: 'Organization Studio', risk: 'CRITICAL' },
  { key: 'organization.run_simulation', name: 'Run Simulation', module: 'Organization Studio', risk: 'MEDIUM' },
  { key: 'organization.apply_simulation', name: 'Apply Simulation', module: 'Organization Studio', risk: 'HIGH' },
  
  { key: 'sync.upload_excel', name: 'Upload Excel', module: 'Excel Sync', risk: 'HIGH' },
  { key: 'sync.connect_live', name: 'Connect Live Excel', module: 'Excel Sync', risk: 'HIGH' },
  { key: 'sync.sync', name: 'Sync Excel', module: 'Excel Sync', risk: 'HIGH' },
  { key: 'sync.resolve_conflicts', name: 'Resolve Conflicts', module: 'Excel Sync', risk: 'HIGH' },
  { key: 'sync.override', name: 'Override Sync', module: 'Excel Sync', risk: 'CRITICAL' },

  { key: 'projects.create', name: 'Create Project', module: 'Projects', risk: 'MEDIUM' },
  { key: 'projects.edit', name: 'Edit Project', module: 'Projects', risk: 'MEDIUM' },
  { key: 'projects.archive', name: 'Archive Project', module: 'Projects', risk: 'HIGH' },
  { key: 'projects.assign', name: 'Assign Employees', module: 'Projects', risk: 'MEDIUM' },
  { key: 'projects.change_lead', name: 'Change Project Lead', module: 'Projects', risk: 'HIGH' },

  { key: 'audit.view_logs', name: 'View Audit Logs', module: 'Audit & Security', risk: 'LOW' },
  { key: 'audit.export_logs', name: 'Export Audit Logs', module: 'Audit & Security', risk: 'MEDIUM' },
  { key: 'audit.view_sessions', name: 'View Sessions', module: 'Audit & Security', risk: 'MEDIUM' },
  { key: 'audit.revoke_sessions', name: 'Revoke Sessions', module: 'Audit & Security', risk: 'CRITICAL' },
  { key: 'audit.view_login_history', name: 'View Login History', module: 'Audit & Security', risk: 'LOW' },

  { key: 'people.view', name: 'People View', module: 'People', risk: 'LOW' },
  { key: 'people.edit', name: 'Edit Employee', module: 'People', risk: 'MEDIUM' },
  { key: 'people.history', name: 'Employee History', module: 'People', risk: 'MEDIUM' },

  { key: 'departments.view', name: 'Department View', module: 'Departments', risk: 'LOW' },
  { key: 'departments.staffing', name: 'Department Staffing', module: 'Departments', risk: 'MEDIUM' },
  
  { key: 'reports.view', name: 'Report View', module: 'Reports', risk: 'LOW' },
  { key: 'reports.hr', name: 'HR Reports', module: 'Reports', risk: 'MEDIUM' },
];

export const ROLES_DATA = [
  { 
    id: 'R-01', 
    title: 'System Administrator', 
    level: 'Level 1', 
    users: 12, 
    access: 'Full Platform Access',
    classification: 'CRITICAL ACCESS',
    parentRoleId: null,
    directPermissions: ALL_PERMISSIONS.map(p => p.key),
    inheritedPermissions: [],
    accessRisks: [
      { id: 'RSK-1', type: 'EXCESSIVE_ADMIN', severity: 'CRITICAL', desc: '12 users currently hold System Administrator access. Recommended maximum: 5.' },
      { id: 'RSK-2', type: 'DORMANT_ACCESS', severity: 'HIGH', desc: '3 users have not used Level 1 administrative access in 60 days.' },
      { id: 'RSK-3', type: 'SUCCESSION', severity: 'MEDIUM', desc: 'No direct backup exists for Architecture Approval.' }
    ],
    history: [
      { id: 'EV-1', date: '15 JUL 2026', type: 'PERMISSION ADDED', title: 'Excel Override added', author: 'Kanishka Suthar', desc: 'Added to manage sync conflicts.' },
      { id: 'EV-2', date: '14 JUL 2026', type: 'USER ASSIGNED', title: 'David Chen assigned', author: 'Kanishka Suthar', desc: 'Added as backup admin.' }
    ]
  },
  { 
    id: 'R-02', 
    title: 'Organization Architect', 
    level: 'Level 2', 
    users: 45, 
    access: 'Org Studio, Sync Center',
    classification: 'STRATEGIC ACCESS',
    parentRoleId: 'R-03',
    directPermissions: [
      'organization.view', 'organization.edit', 'organization.move_employee', 'organization.change_manager', 
      'organization.create_node', 'organization.run_simulation', 'organization.apply_simulation',
      'sync.upload_excel', 'sync.connect_live', 'sync.sync', 'sync.resolve_conflicts'
    ],
    inheritedPermissions: ['people.view', 'departments.view', 'reports.view'],
    accessRisks: [
      { id: 'RSK-4', type: 'INHERITANCE_EXPANSION', severity: 'MEDIUM', desc: 'Role inherits unused people view permissions.' }
    ],
    history: []
  },
  { 
    id: 'R-03', 
    title: 'HR Manager', 
    level: 'Level 2', 
    users: 120, 
    access: 'People, Departments, Reports',
    classification: 'SENSITIVE ACCESS',
    parentRoleId: 'R-05',
    directPermissions: [
      'people.edit', 'people.history', 'departments.staffing', 'reports.hr', 'organization.move_employee'
    ],
    inheritedPermissions: ['people.view', 'departments.view', 'reports.view'],
    accessRisks: [],
    history: []
  },
  { 
    id: 'R-04', 
    title: 'Department Head', 
    level: 'Level 3', 
    users: 48, 
    access: 'Department Scoped View',
    classification: 'DEPARTMENT SCOPED',
    parentRoleId: 'R-05',
    directPermissions: [
      'projects.create', 'projects.edit', 'projects.assign', 'projects.change_lead'
    ],
    inheritedPermissions: ['people.view', 'departments.view', 'reports.view'],
    accessRisks: [],
    history: []
  },
  { 
    id: 'R-05', 
    title: 'Standard Employee', 
    level: 'Level 4', 
    users: 14000, 
    access: 'Read-only Profile View',
    classification: 'STANDARD ACCESS',
    parentRoleId: null,
    directPermissions: [
      'people.view', 'departments.view', 'reports.view'
    ],
    inheritedPermissions: [],
    accessRisks: [],
    history: []
  },
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
  {
    id: 'N-01',
    title: 'Missing Engineering Manager',
    message: 'The Engineering department currently has no assigned manager following the recent reorganization. This affects 42 employees.',
    type: 'Critical',
    category: 'Organization Changes',
    department: 'Engineering',
    user: 'System AI',
    timestamp: '2026-07-17T09:15:00',
    timeAgo: 'Just now',
    read: false,
    groupId: 'engineering',
    isPinned: true,
    isSnoozed: false,
    aiAnalysis: [
      'Approval workflow will stop',
      'Four employees lose reporting authority',
      'Two active projects become orphaned'
    ],
    quickActions: ['Assign Manager', 'View Hierarchy', 'Resolve'],
    details: 'Span of control and approval workflows are currently broken for the entire department.',
    affectedUsers: ['Alex Smith', 'Marcus Johnson', '40 others']
  },
  {
    id: 'N-02',
    title: 'Finance Budget Approval Required',
    message: 'A Q3 budget increase of $450k requires executive approval.',
    type: 'Approval Required',
    category: 'Approvals',
    department: 'Finance',
    user: 'Elena Rodriguez',
    timestamp: '2026-07-17T08:30:00',
    timeAgo: '45 mins ago',
    read: false,
    groupId: 'finance',
    isPinned: false,
    isSnoozed: false,
    aiAnalysis: [
      'Budget exceeds quarterly threshold by 12%',
      'Impacts projected cash flow runway',
      'Directly tied to hiring 3 data scientists'
    ],
    quickActions: ['Approve', 'Reject', 'View Request'],
    details: 'Budget increase covers new hires in the Data Science team.',
    affectedUsers: ['Sarah Jenkins (Approver)']
  },
  {
    id: 'N-03',
    title: 'AI Prediction: Management Gap',
    message: 'Based on current growth, the Design team will exceed optimal manager-to-employee ratio (1:15) within 3 months.',
    type: 'AI Suggestion',
    category: 'AI Insights',
    department: 'Design',
    user: 'SAMS Insight',
    timestamp: '2026-07-17T07:10:00',
    timeAgo: '2 hours ago',
    read: false,
    groupId: 'design',
    isPinned: false,
    isSnoozed: true,
    aiAnalysis: [
      'Current span: 1:12. Projected span: 1:18',
      'High risk of manager burnout detected',
      'Potential drop in employee satisfaction'
    ],
    quickActions: ['Open Requisition', 'View Forecast', 'Dismiss'],
    details: 'Consider opening a new requisition for a Design Manager.',
    affectedUsers: []
  },
  {
    id: 'N-04',
    title: 'Unusual Login Location',
    message: 'Admin account accessed from an unrecognized IP address (192.168.4.55).',
    type: 'Security Alert',
    category: 'Security',
    department: 'System',
    user: 'Admin',
    timestamp: '2026-07-17T05:00:00',
    timeAgo: '4 hours ago',
    read: false,
    groupId: 'security',
    isPinned: false,
    isSnoozed: false,
    aiAnalysis: [
      'IP address geolocates to unrecognized region',
      'Access occurred outside normal business hours'
    ],
    quickActions: ['Lock Account', 'View Audit Log', 'Resolve'],
    details: 'Location: Unknown. IP: 192.168.4.55. Device: Unknown browser.',
    affectedUsers: ['Admin']
  },
  {
    id: 'N-05',
    title: 'Excel Synchronization Successful',
    message: 'HR_Master_Q3.xlsx successfully mapped and synced with 0 errors.',
    type: 'Success',
    category: 'Sync',
    department: 'HR & Admin',
    user: 'Sarah Jenkins',
    timestamp: '2026-07-16T18:45:00',
    timeAgo: 'Yesterday',
    read: true,
    groupId: 'hr',
    isPinned: false,
    isSnoozed: false,
    aiAnalysis: null,
    quickActions: ['View Sync Log', 'Open Report'],
    details: 'Processed 14,205 rows in 4.2 seconds.',
    affectedUsers: []
  },
  {
    id: 'N-06',
    title: 'Decision Flow Modified',
    message: 'The technical hiring approval flow was modified by David Chen.',
    type: 'Warning',
    category: 'Decision Flow',
    department: 'Engineering',
    user: 'David Chen',
    timestamp: '2026-07-16T15:20:00',
    timeAgo: 'Yesterday',
    read: true,
    groupId: 'engineering',
    isPinned: false,
    isSnoozed: false,
    aiAnalysis: [
      'Security approval step was bypassed',
      'Hiring velocity increased by 2 days',
      'Slight increase in compliance risk'
    ],
    quickActions: ['View Workflow', 'Revert Change', 'Dismiss'],
    details: 'Removed one step in the approval chain to accelerate hiring.',
    affectedUsers: ['David Chen', 'Sarah Jenkins']
  },
  {
    id: 'N-07',
    title: 'System Update Completed',
    message: 'Vite rendering engine restarted and optimized successfully.',
    type: 'System Update',
    category: 'System',
    department: 'System',
    user: 'System Admin',
    timestamp: '2026-07-16T11:00:00',
    timeAgo: 'Yesterday',
    read: true,
    groupId: 'system',
    isPinned: false,
    isSnoozed: false,
    aiAnalysis: null,
    quickActions: ['View Release Notes'],
    details: 'Performance improved by ~12% on tree rendering.',
    affectedUsers: []
  },
  {
    id: 'N-08',
    title: 'Version Conflict Detected',
    message: 'Workspace changes conflict with baseline version 2.1.4.',
    type: 'Version Conflict',
    category: 'System',
    department: 'Cross-functional',
    user: 'System AI',
    timestamp: '2026-07-15T14:30:00',
    timeAgo: 'Last Week',
    read: true,
    groupId: 'system',
    isPinned: false,
    isSnoozed: false,
    aiAnalysis: [
      'Two competing edits on "Engineering"',
      'Potential data loss if force-merged'
    ],
    quickActions: ['Resolve Conflict', 'View Diff'],
    details: 'Simultaneous edits detected in the Engineering hierarchy.',
    affectedUsers: []
  },
  {
    id: 'N-09',
    title: 'Employee Onboarding Triggered',
    message: '12 new employees added to the Operations department.',
    type: 'Information',
    category: 'Users',
    department: 'Operations',
    user: 'HR Automation',
    timestamp: '2026-07-15T09:00:00',
    timeAgo: 'Last Week',
    read: true,
    groupId: 'operations',
    isPinned: false,
    isSnoozed: false,
    aiAnalysis: null,
    quickActions: ['View Directory'],
    details: 'Standard onboarding flow initiated.',
    affectedUsers: []
  },
  {
    id: 'N-10',
    title: 'Monthly Analytics Report',
    message: 'The organizational health report for June is now available.',
    type: 'Information',
    category: 'Reports',
    department: 'Executive',
    user: 'System AI',
    timestamp: '2026-07-10T08:00:00',
    timeAgo: 'Earlier',
    read: true,
    groupId: 'executive',
    isPinned: false,
    isSnoozed: false,
    aiAnalysis: null,
    quickActions: ['Download PDF', 'View Analytics'],
    details: 'Overall health score is 94%.',
    affectedUsers: []
  }
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


