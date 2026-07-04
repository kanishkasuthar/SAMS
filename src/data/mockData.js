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
  { id: 'EMP-0001', name: 'Sarah Jenkins', role: 'Chief Executive Officer', department: 'Executive', location: 'San Francisco', status: 'Online' },
  { id: 'EMP-0012', name: 'David Chen', role: 'VP of Engineering', department: 'Engineering', location: 'Remote', status: 'Online' },
  { id: 'EMP-0045', name: 'Elena Rodriguez', role: 'VP of Product', department: 'Product', location: 'New York', status: 'Offline' },
  { id: 'EMP-0182', name: 'Marcus Johnson', role: 'Frontend Manager', department: 'Engineering', location: 'San Francisco', status: 'Online' },
  { id: 'EMP-0199', name: 'Priya Patel', role: 'Backend Manager', department: 'Engineering', location: 'London', status: 'Busy' },
  { id: 'EMP-0342', name: 'Michael Chang', role: 'Lead Designer', department: 'Design', location: 'Remote', status: 'Offline' },
  { id: 'EMP-0881', name: 'Alex Smith', role: 'Senior UI Developer', department: 'Engineering', location: 'Austin', status: 'Online' },
  { id: 'EMP-0922', name: 'Emma Watson', role: 'HR Director', department: 'HR & Admin', location: 'San Francisco', status: 'Busy' },
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

export const REPORTS_DATA = [
  { id: 'REP-102', name: 'Q3 Headcount Growth', type: 'PDF', date: '2026-07-01', size: '2.4 MB' },
  { id: 'REP-103', name: 'Department Budget Variance', type: 'XLSX', date: '2026-06-28', size: '1.1 MB' },
  { id: 'REP-104', name: 'Managerial Span of Control', type: 'PDF', date: '2026-06-15', size: '3.8 MB' },
  { id: 'REP-105', name: 'Cross-functional Projects', type: 'CSV', date: '2026-06-10', size: '0.4 MB' },
];

export const SESSIONS_DATA = [
  { id: 'S-991', user: 'Sarah Jenkins', device: 'MacBook Pro 16"', browser: 'Chrome 114', ip: '192.168.1.12', time: 'Active Now' },
  { id: 'S-992', user: 'David Chen', device: 'Windows PC', browser: 'Edge 112', ip: '192.168.1.45', time: 'Active Now' },
  { id: 'S-993', user: 'Priya Patel', device: 'iPhone 14 Pro', browser: 'Safari iOS', ip: '172.16.0.4', time: '2 hours ago' },
  { id: 'S-994', user: 'System Sync Bot', device: 'AWS US-East', browser: 'API Agent', ip: '10.0.0.1', time: '5 hours ago' },
];

export const NOTIFICATIONS_DATA = [
  { id: 1, title: 'Excel Sync Completed', text: 'HR_Master_Q3.xlsx was successfully synced.', time: '10m ago', read: false },
  { id: 2, title: 'New Organization Insight', text: '4 Managers detected with >25 direct reports.', time: '1h ago', read: false },
  { id: 3, title: 'System Update', text: 'SAMS platform was updated to v3.2.0.', time: '4h ago', read: true },
  { id: 4, title: 'Project Health Warning', text: '"Cloud Migration" project marked as At Risk.', time: '1d ago', read: true },
];

export const USERS_DATA = [
  { id: 'U-001', name: 'Kanishka Suthar', email: 'kanishka@sams.corp', role: 'System Administrator', lastLogin: 'Just now' },
  { id: 'U-002', name: 'Sarah Jenkins', email: 's.jenkins@sams.corp', role: 'Organization Architect', lastLogin: 'Active' },
  { id: 'U-003', name: 'Emma Watson', email: 'e.watson@sams.corp', role: 'HR Manager', lastLogin: '2h ago' },
  { id: 'U-004', name: 'David Chen', email: 'd.chen@sams.corp', role: 'Department Head', lastLogin: 'Active' },
];
