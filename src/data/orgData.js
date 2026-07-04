export const initialNodes = [
  {
    id: '1',
    type: 'orgNode',
    position: { x: 500, y: 50 },
    data: {
      name: 'Sarah Jenkins',
      designation: 'Chief Executive Officer',
      department: 'Executive',
      type: 'ceo',
      teamSize: 120,
    },
  },
  {
    id: '2',
    type: 'orgNode',
    position: { x: 200, y: 250 },
    data: {
      name: 'David Chen',
      designation: 'VP of Engineering',
      department: 'Engineering',
      type: 'executive',
      teamSize: 45,
      project: 'Cloud Migration',
    },
  },
  {
    id: '3',
    type: 'orgNode',
    position: { x: 800, y: 250 },
    data: {
      name: 'Elena Rodriguez',
      designation: 'VP of Product',
      department: 'Product',
      type: 'executive',
      teamSize: 28,
    },
  },
  {
    id: '4',
    type: 'orgNode',
    position: { x: 50, y: 450 },
    data: {
      name: 'Marcus Johnson',
      designation: 'Frontend Manager',
      department: 'Engineering',
      type: 'manager',
      teamSize: 12,
      project: 'SAMS Dashboard',
    },
  },
  {
    id: '5',
    type: 'orgNode',
    position: { x: 350, y: 450 },
    data: {
      name: 'Priya Patel',
      designation: 'Backend Manager',
      department: 'Engineering',
      type: 'manager',
      teamSize: 15,
      project: 'Excel Sync Engine',
    },
  },
  {
    id: '6',
    type: 'orgNode',
    position: { x: 800, y: 450 },
    data: {
      name: 'Michael Chang',
      designation: 'Lead Designer',
      department: 'Product',
      type: 'manager',
      teamSize: 5,
    },
  },
  {
    id: '7',
    type: 'orgNode',
    position: { x: 50, y: 650 },
    data: {
      name: 'Alex Smith',
      designation: 'Senior UI Developer',
      department: 'Engineering',
      type: 'employee',
      teamSize: 0,
      project: 'SAMS Dashboard',
    },
  },
  {
    id: '8',
    type: 'orgNode',
    position: { x: 350, y: 650 },
    data: {
      name: 'Jordan Lee',
      designation: 'Systems Engineer',
      department: 'Engineering',
      type: 'employee',
      teamSize: 0,
      project: 'Excel Sync Engine',
    },
  }
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: { stroke: '#94A3B8', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', animated: true, style: { stroke: '#94A3B8', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', animated: true, style: { stroke: '#94A3B8', strokeWidth: 2 } },
  { id: 'e2-5', source: '2', target: '5', type: 'smoothstep', animated: true, style: { stroke: '#94A3B8', strokeWidth: 2 } },
  { id: 'e3-6', source: '3', target: '6', type: 'smoothstep', animated: true, style: { stroke: '#94A3B8', strokeWidth: 2 } },
  { id: 'e4-7', source: '4', target: '7', type: 'smoothstep', animated: true, style: { stroke: '#94A3B8', strokeWidth: 2 } },
  { id: 'e5-8', source: '5', target: '8', type: 'smoothstep', animated: true, style: { stroke: '#94A3B8', strokeWidth: 2 } },
];
