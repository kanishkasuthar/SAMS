import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  ReactFlow, 
  Background,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  MousePointer2, Hand, Plus, Minus, Maximize, Share, Download, Monitor,
  MoreVertical, CheckCircle, Activity, AlertTriangle, Layers,
  GitCommit, CornerDownRight, ArrowDownUp, Mail, Phone, MapPin, 
  User, Shield, Users, Briefcase, FileText, Settings, Sparkles, Clock, Globe, ArrowLeft, Search, Filter, RefreshCw, X, Send, Compass, Edit
} from 'lucide-react';
import { useOrgStore } from '../store/orgStore';
import { useUIStore } from '../store/uiStore';
import dagre from 'dagre';
import api from '../services/api';

import OrgNode from '../components/OrgNode';
import PositionChangeModal from '../components/PositionChangeModal';
import ChangeSummaryModal from '../components/ChangeSummaryModal';
import AssignEmployeeModal from '../components/AssignEmployeeModal';
import AddEmployeeModal from '../components/AddEmployeeModal';
import OrgContextMenu from '../components/OrgContextMenu';
import ExcelImportModal from '../components/studio/ExcelImportModal';
import { exportToExcel, exportToCSV, exportToPNG } from '../components/studio/OrgExportUtils';

import './OrgStudio.css';

const TABS = ['Profile', 'Projects', 'Reports', 'Activity', 'Files', 'Permissions', 'History', 'AI Insights'];

const COLLABORATORS = [
  { name: 'Emma Stone', role: 'HR Admin', avatar: 'https://i.pravatar.cc/150?u=a1', color: '#10B981' },
  { name: 'Michael Chang', role: 'VP Operations', avatar: 'https://i.pravatar.cc/150?u=a2', color: '#3B82F6' },
  { name: 'Sara Watson', role: 'Talent Lead', avatar: 'https://i.pravatar.cc/150?u=a3', color: '#8B5CF6' }
];

const getAbsolutePosition = (n, allNodes) => {
  if (!n.parentId) return n.position || { x: 0, y: 0 };
  const parent = allNodes.find(p => p.id === n.parentId);
  const parentPos = parent ? getAbsolutePosition(parent, allNodes) : { x: 0, y: 0 };
  return {
    x: (n.position?.x ?? 0) + parentPos.x,
    y: (n.position?.y ?? 0) + parentPos.y
  };
};

const OrgStudio = () => {
  const { 
    nodes: storeNodes, 
    edges: storeEdges, 
    fetchOrgChart, 
    moveEmployee,
    orgStats,
    fetchOrgStats,
    undo,
    redo,
    pastStates,
    futureStates,
    searchNodes,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useOrgStore();

  const { zoomIn, zoomOut, fitView, setCenter } = useReactFlow();

  const [nodes, originalSetNodes, onNodesChange] = useNodesState([]);
  const [edges, originalSetEdges, onEdgesChange] = useEdgesState([]);

  const setNodes = useCallback((n) => originalSetNodes(n), [originalSetNodes]);
  const setEdges = useCallback((e) => originalSetEdges(e), [originalSetEdges]);

  const [hasFitViewInitial, setHasFitViewInitial] = useState(false);

  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (storeNodes.length > 0) {
      setNodes(storeNodes);
      setEdges(storeEdges);
      
      // Update selected node reference to refresh details panel
      if (selectedNode) {
        const updated = storeNodes.find(n => n.id === selectedNode.id);
        if (updated) setSelectedNode(updated);
      }
      
      if (!hasFitViewInitial) {
        setTimeout(() => {
          fitView({ padding: 0.35, duration: 800 });
          setHasFitViewInitial(true);
        }, 300);
      }
    }
  }, [storeNodes, storeEdges, setNodes, setEdges, hasFitViewInitial, fitView, selectedNode]);

  const handleNodesChange = useCallback((changes) => onNodesChange(changes), [onNodesChange]);

  const [isPanMode, setIsPanMode] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  
  const [draggedNode, setDraggedNode] = useState(null);
  const [targetManager, setTargetManager] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');
  const [layoutDirection, setLayoutDirection] = useState('TB');

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', designation: '', department: '', email: '', phone: '', status: '', experience: '', skills: '' });
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetNode, setDeleteTargetNode] = useState(null);
  const [deleteStrategy, setDeleteStrategy] = useState('reassign');
  const [deleteReassignManagerId, setDeleteReassignManagerId] = useState('');

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [paletteSearchQuery, setPaletteSearchQuery] = useState('');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotMessages, setCopilotMessages] = useState([
    { sender: 'ai', text: 'Hi Kanishka, I am your SAMS Executive Copilot. Ask me to find employees, analyze direct reports, suggest promotions or structure teams.' }
  ]);
  const [copilotInput, setCopilotInput] = useState('');

  const nodeTypes = useMemo(() => ({ orgNode: OrgNode }), []);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setActiveTab('Profile');
  };
  const closePanel = () => setSelectedNode(null);

  const handleAssignConfirm = (employeeData) => {
    useOrgStore.getState().fillPosition(selectedNode.id, employeeData);
    setShowAssignModal(false);
    setSelectedNode(null);
    useUIStore.getState().addToast(`${employeeData.name} has been assigned.`, 'success');
  };

  const onNodeDragStop = useCallback(async (event, node) => {
    if (!node || !node.position) return;
    
    // Absolute position check to handle department grouping layouts
    const nodePos = getAbsolutePosition(node, nodes);
    const target = nodes.find(n => {
      if (n.id === node.id || n.type === 'group' || n.data.isVacant) return false;
      const nPos = getAbsolutePosition(n, nodes);
      return Math.abs(nPos.x - nodePos.x) < 180 && Math.abs(nPos.y - nodePos.y) < 120;
    });

    if (target) {
      // Circular reporting check (descendant traversal)
      const isDescendant = (childId, parentId) => {
        if (childId === parentId) return true;
        const edge = edges.find(e => e.target === childId);
        if (edge) {
          return isDescendant(edge.source, parentId);
        }
        return false;
      };

      if (isDescendant(target.id, node.id)) {
        useUIStore.getState().addToast("Circular reporting detected! A manager cannot report to their own subordinate.", "error");
        const originalNode = storeNodes.find(n => n.id === node.id);
        if (originalNode) {
          setNodes(nodes.map(n => n.id === node.id ? { ...n, position: originalNode.position } : n));
        }
        return;
      }

      setDraggedNode(node); 
      setTargetManager(target); 
      setShowChangeModal(true); 
    } else {
      // If no valid target manager, snap back to original position
      const originalNode = storeNodes.find(n => n.id === node.id);
      if (originalNode) {
        setNodes(nodes.map(n => n.id === node.id ? { ...n, position: originalNode.position } : n));
      }
    }
  }, [nodes, edges, storeNodes, setNodes]);

  const handleConfirmChange = async (reason, comments) => {
    try {
      const oldManagerEdge = edges.find(e => e.target === draggedNode.id);
      const oldManager = oldManagerEdge ? nodes.find(n => n.id === oldManagerEdge.source) : null;
      await moveEmployee(draggedNode.id, targetManager.id, reason, comments);
      setShowChangeModal(false);
      setSummaryData({
        employeeName: draggedNode.data.name, reason,
        oldPosition: draggedNode.data.designation, newPosition: draggedNode.data.designation,
        oldManager: oldManager ? oldManager.data.name : 'None', newManager: targetManager.data.name,
        version: 'v3.2.1'
      });
      setShowSummaryModal(true);
    } catch (err) {
      useUIStore.getState().addToast(`Move failed: ${err.message}`, 'error');
      // Snap back on failure
      const originalNode = storeNodes.find(n => n.id === draggedNode.id);
      if (originalNode) {
        setNodes(nodes.map(n => n.id === draggedNode.id ? { ...n, position: originalNode.position } : n));
      }
      setShowChangeModal(false);
    }
  };

  const handleCancelChange = () => {
    const originalNode = storeNodes.find(n => n.id === draggedNode.id);
    if (originalNode) {
      setNodes(nodes.map(n => n.id === draggedNode.id ? { ...n, position: originalNode.position } : n));
    }
    setShowChangeModal(false);
  };

  const applyLayout = useCallback((direction) => {
    setLayoutDirection(direction);
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 160 });

    nodes.filter(n => n.type !== 'group').forEach((node) => {
      dagreGraph.setNode(node.id, { width: 280, height: 120 });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const fallbackPosition = node.position ?? { x: 0, y: 0 };
      if (node.type === 'group') {
        return { ...node, position: fallbackPosition };
      }

      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        targetPosition: direction === 'TB' ? 'top' : 'left',
        sourcePosition: direction === 'TB' ? 'bottom' : 'right',
        position: {
          x: nodeWithPosition?.x ? (nodeWithPosition.x - 280 / 2) : fallbackPosition.x,
          y: nodeWithPosition?.y ? (nodeWithPosition.y - 120 / 2) : fallbackPosition.y,
        },
      };
    });

    layoutedNodes.filter(n => n.type === 'group').forEach(group => {
      const children = layoutedNodes.filter(n => n.parentId === group.id);
      if (children.length > 0) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        children.forEach(c => {
          const posX = c.position?.x ?? 0;
          const posY = c.position?.y ?? 0;
          if (posX < minX) minX = posX;
          if (posY < minY) minY = posY;
          if (posX + 280 > maxX) maxX = posX + 280;
          if (posY + 120 > maxY) maxY = posY + 120;
        });
        const padding = 40;
        group.position = { x: minX - padding, y: minY - padding - 40 };
        group.style = { ...group.style, width: maxX - minX + padding * 2, height: maxY - minY + padding * 2 + 40 };
        children.forEach(c => {
          if (c.position) {
            c.position.x -= group.position.x;
            c.position.y -= group.position.y;
          }
        });
      } else {
        group.position = group.position ?? { x: 0, y: 0 };
        group.style = { ...group.style, width: 300, height: 200 };
      }
    });

    setNodes(layoutedNodes);
    setTimeout(() => fitView({ padding: 0.25, duration: 800 }), 100);
  }, [nodes, edges, setNodes, fitView]);

  const handleExpandAll = () => {
    setNodes(nds => nds.map(n => n.type === 'orgNode' ? { ...n, data: { ...n.data, isExpanded: true } } : n));
  };

  const handleCollapseAll = () => {
    setNodes(nds => nds.map(n => n.type === 'orgNode' ? { ...n, data: { ...n.data, isExpanded: false } } : n));
  };

  const handleOpenEditModal = () => {
    if (!inspectorDetails) return;
    setEditFormData({
      name: inspectorDetails.name,
      designation: inspectorDetails.designation,
      department: inspectorDetails.department,
      email: inspectorDetails.email,
      phone: inspectorDetails.phone,
      status: inspectorDetails.status,
      experience: inspectorDetails.experience,
      skills: inspectorDetails.skills.join(', ')
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = editFormData.skills.split(',').map(s => s.trim()).filter(Boolean);
      await updateEmployee(selectedNode.id, {
        name: editFormData.name,
        designation: editFormData.designation,
        department: editFormData.department,
        email: editFormData.email,
        phone: editFormData.phone,
        status: editFormData.status,
        experience: editFormData.experience,
        skills: skillsArray
      });
      useUIStore.getState().addToast(`${editFormData.name} profile updated successfully!`, 'success');
      setShowEditModal(false);
      const refreshedNode = useOrgStore.getState().nodes.find(n => n.id === selectedNode.id);
      if (refreshedNode) setSelectedNode(refreshedNode);
    } catch (err) {
      useUIStore.getState().addToast(`Failed to update profile: ${err.message}`, 'error');
    }
  };

  const handleDeleteTrigger = (nodeId, nodeData) => {
    const directReportsCount = edges.filter(e => e.source === nodeId).length;
    setDeleteTargetNode({ id: nodeId, name: nodeData.name, hasChildren: directReportsCount > 0 });
    const possibleManagers = nodes.filter(n => n.type === 'orgNode' && n.id !== nodeId);
    if (possibleManagers.length > 0) {
      setDeleteReassignManagerId(possibleManagers[0].id);
    }
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetNode) return;
    try {
      await deleteEmployee(deleteTargetNode.id, deleteStrategy, deleteReassignManagerId);
      useUIStore.getState().addToast(`${deleteTargetNode.name} position deleted.`, 'success');
      setShowDeleteModal(false);
      setSelectedNode(null);
    } catch (err) {
      useUIStore.getState().addToast(`Delete failed: ${err.message}`, 'error');
    }
  };

  useEffect(() => { 
    fetchOrgChart(); 
    fetchOrgStats();
  }, [fetchOrgChart, fetchOrgStats]);

  useEffect(() => {
    const handler = (e) => setContextMenu(e.detail);
    window.addEventListener('orgnode-contextmenu', handler);
    return () => window.removeEventListener('orgnode-contextmenu', handler);
  }, []);

  useEffect(() => {
    const handleGlobalSearch = (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value;
        if (query) {
          const matches = searchNodes(query);
          if (matches.length > 0) {
            const matchNode = nodes.find(n => n.id === matches[0]);
            if (matchNode && matchNode.position) {
              setCenter(matchNode.position.x + 120, matchNode.position.y + 60, { zoom: 1.2, duration: 800 });
              setSelectedNode(matchNode);
            }
          }
        }
      }
    };

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('keydown', handleGlobalSearch);
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (searchInput) {
        searchInput.removeEventListener('keydown', handleGlobalSearch);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nodes, searchNodes, setCenter]);

  const inspectorDetails = useMemo(() => {
    if (!selectedNode || !selectedNode.data || selectedNode.data.isVacant) return null;
    
    const managerEdge = edges.find(e => e.target === selectedNode.id);
    const managerNode = managerEdge ? nodes.find(n => n.id === managerEdge.source) : null;
    
    const reportEdges = edges.filter(e => e.source === selectedNode.id);
    const directReports = reportEdges.map(e => nodes.find(n => n.id === e.target)).filter(Boolean);

    const name = selectedNode.data.name || '';
    const designation = selectedNode.data.designation || 'Specialist';
    const department = selectedNode.data.department || 'Operations';
    
    // Deterministic generators using simple charCode summing
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const locations = ['New York HQ, USA', 'San Francisco Office, USA', 'London Office, UK', 'Paris Office, France', 'Austin Hub, USA', 'Chicago Hub, USA'];
    const location = locations[hash % locations.length];
    
    const expYears = (hash % 10) + 3; // 3 to 12 years
    const joinYear = 2026 - expYears;
    const joinDate = `${(hash % 28) + 1} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][hash % 12]} ${joinYear}`;
    
    const employmentType = (hash % 5 === 0) ? 'Contract' : 'Full-time';
    
    let skills = ['Leadership', 'Strategic Planning', 'Management', 'Communication'];
    if (department.toLowerCase().includes('eng') || designation.toLowerCase().includes('tech') || designation.toLowerCase().includes('dev')) {
      skills = ['React', 'Node.js', 'MySQL', 'Architecture', 'TypeScript', 'Docker', 'Git', 'System Design'];
    } else if (department.toLowerCase().includes('hr') || department.toLowerCase().includes('people')) {
      skills = ['Recruitment', 'Conflict Resolution', 'Employee Relations', 'Strategic Hiring', 'HR Tools', 'Onboarding'];
    } else if (department.toLowerCase().includes('fin') || department.toLowerCase().includes('acc')) {
      skills = ['Financial Modeling', 'Audit Controls', 'MySQL', 'Accounting', 'Tax Compliance', 'Excel Forecasting'];
    } else if (department.toLowerCase().includes('mark') || department.toLowerCase().includes('sales')) {
      skills = ['Market Analysis', 'SEO Optimization', 'Growth Strategies', 'PR Planning', 'CRM Management', 'Campaign Execution'];
    }

    let bio = `Specializes in driving high-impact initiatives across the ${department} department. Committed to operational excellence and cross-functional team success at SAMS.`;
    if (designation.toLowerCase().includes('ceo') || designation.toLowerCase().includes('chief executive')) {
      bio = "Drives SAMS's long-term business vision, corporate structure decisions, and overall product and engineering expansion strategy.";
    } else if (designation.toLowerCase().includes('cto') || designation.toLowerCase().includes('technology')) {
      bio = "Leads technology decisions, architectural patterns, and engineering standards for all SAMS software applications.";
    } else if (designation.toLowerCase().includes('manager')) {
      bio = `Oversees operational deliverables, department budgets, and team productivity within the ${department} department.`;
    } else if (designation.toLowerCase().includes('lead')) {
      bio = `Leads a team of developers and professionals to deliver premium solutions, maintaining high quality standards.`;
    }

    const projectsList = [
      { name: 'SAMS Platform v3', role: 'Project Lead', completion: 85, status: 'Active' },
      { name: 'HR Management Suite', role: 'Contributor', completion: 100, status: 'Completed' },
      { name: 'Financial Audit 2026', role: 'Owner', completion: 40, status: 'Active' }
    ].filter((_, idx) => (hash + idx) % 2 === 0 || idx === 0);

    const reportsList = [
      { type: 'Performance', name: `Q2 Performance Evaluation - ${name}.pdf`, date: 'June 2026' },
      { type: 'Organization', name: `SAMS Structure Alignment Matrix.pdf`, date: 'April 2026' },
      { type: 'Audit', name: `Access Matrix Authorization Log - ${selectedNode.id}.xlsx`, date: 'July 2026' }
    ];

    const activityTimeline = [
      { event: 'Employee Created', date: joinDate },
      { event: 'Department Assigned', date: joinDate },
      { event: 'Promotion / Role Updated', date: `15 Jan 2026` },
      { event: 'Reporting Manager Updated', date: `10 May 2026` }
    ].filter((_, idx) => (hash + idx) % 2 === 0 || idx === 0);

    const documentsList = [
      { name: `signed_agreement_${selectedNode.id}.pdf`, size: '1.8 MB', date: joinDate },
      { name: `cv_resume_review.docx`, size: '940 KB', date: 'Oct 2025' }
    ];

    const permissionsList = ['org.read', 'users.manage', 'reports.view'].filter((_, idx) => (hash + idx) % 2 === 0);

    return {
      id: selectedNode.id,
      employeeId: selectedNode.data.employeeId || `EMP-${selectedNode.id.substring(0, 4).toUpperCase()}`,
      fullName: selectedNode.data.name,
      designation: designation,
      department: department,
      email: selectedNode.data.email || `${name.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      phone: selectedNode.data.phone || `+1 (555) 019-${(1000 + (hash % 9000))}`,
      extension: `${200 + (hash % 799)}`,
      location: location,
      experience: `${expYears} Years`,
      joinDate: joinDate,
      employmentType: employmentType,
      manager: managerNode ? {
        id: managerNode.id,
        name: managerNode.data.name,
        designation: managerNode.data.designation,
        photo: managerNode.data.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(managerNode.data.name)}&background=random`
      } : null,
      directReports: directReports.map(dr => ({
        id: dr.id,
        name: dr.data.name,
        designation: dr.data.designation,
        photo: dr.data.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(dr.data.name)}&background=random`
      })),
      skills: skills,
      projects: projectsList,
      reports: reportsList,
      activity: activityTimeline,
      documents: documentsList,
      permissions: permissionsList,
      status: selectedNode.data.status || 'Active',
      photo: selectedNode.data.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      bio: bio
    };
  }, [selectedNode, nodes, edges]);

  const handleCopilotSend = () => {
    if (!copilotInput.trim()) return;
    const userMsg = copilotInput.trim();
    setCopilotMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setCopilotInput('');
    setTimeout(() => {
      let reply = 'I processed your command, but no direct matching structure was resolved.';
      setCopilotMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  const paletteMatches = useMemo(() => {
    if (!paletteSearchQuery.trim()) return [];
    return nodes.filter(n => 
      n.type === 'orgNode' && 
      (n.data?.name?.toLowerCase().includes(paletteSearchQuery.toLowerCase()))
    );
  }, [paletteSearchQuery, nodes]);

  return (
    <div className="page-container">
      <div className="studio-header">
        <div>
          <h1 className="studio-title">Organization Studio</h1>
          <p className="studio-subtitle">Design, visualize and manage your organizational structure.</p>
        </div>
        
        <div className="studio-header-actions">
          <div className="collaborators-stack" style={{ marginRight: 16 }}>
            {COLLABORATORS.map((col, idx) => (
              <img key={idx} src={col.avatar} alt={col.name} className="collaborator-avatar" title={`${col.name} (${col.role}) is viewing`} style={{ borderColor: col.color }} />
            ))}
            <div className="collaboration-pulse-badge">Live</div>
          </div>

          <button className="studio-btn btn-purple" onClick={() => setIsImportOpen(true)}>
            <Share size={15} /> Import Excel
          </button>
          <div style={{ position: 'relative' }}>
            <button className="studio-btn btn-white" onClick={() => setShowExportMenu(!showExportMenu)}>
              <Download size={15} /> Export Menu
            </button>
            {showExportMenu && (
              <div className="export-menu-dropdown">
                <button className="dropdown-item" onClick={() => { setShowExportMenu(false); exportToExcel(nodes, edges); }}>Export Excel</button>
                <button className="dropdown-item" onClick={() => { setShowExportMenu(false); exportToCSV(nodes, edges); }}>Export CSV</button>
                <button className="dropdown-item" onClick={() => { setShowExportMenu(false); exportToPNG('.react-flow'); }}>Export PNG</button>
              </div>
            )}
          </div>
          <button className="studio-btn btn-white btn-icon" onClick={() => fitView({ padding: 0.2, duration: 600 })} title="Fit Workspace View">
            <Monitor size={15} />
          </button>
        </div>
      </div>

      <div className="studio-toolbar-bar">
        <div className="studio-toolbar-group">
          <button className={`toolbar-btn ${!isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(false)}>
            <MousePointer2 size={14} /> Select Mode
          </button>
          <button className={`toolbar-btn ${isPanMode ? 'active' : ''}`} onClick={() => setIsPanMode(true)}>
            <Hand size={14} /> Move Mode
          </button>
          <div className="toolbar-divider"></div>
          
          <button className="toolbar-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={14} /> Add Employee
          </button>
          <button className="toolbar-btn" onClick={() => setShowAddModal(true)}>
            <Layers size={14} /> Add Department
          </button>
          
          <div className="toolbar-divider"></div>
          
          <div className="layout-select-box" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Compass size={14} color="var(--color-text-secondary)" />
            <select 
              value={layoutDirection} 
              onChange={(e) => applyLayout(e.target.value)}
              className="toolbar-select-dropdown"
              style={{ border: 'none', background: 'transparent', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', cursor: 'pointer', outline: 'none' }}
            >
              <option value="TB">Top Down Layout</option>
              <option value="LR">Left Right Layout</option>
            </select>
          </div>

          <button className="toolbar-btn" onClick={handleExpandAll} title="Expand All Nodes">Expand All</button>
          <button className="toolbar-btn" onClick={handleCollapseAll} title="Collapse All Nodes">Collapse All</button>

          <div className="toolbar-divider"></div>
          
          <button className="toolbar-btn" onClick={undo} style={{ opacity: pastStates.length > 0 ? 1 : 0.5 }} disabled={pastStates.length === 0}>
            <ArrowDownUp size={14} style={{ transform: 'rotate(90deg)' }} /> Undo
          </button>
          <button className="toolbar-btn" onClick={redo} style={{ opacity: futureStates.length > 0 ? 1 : 0.5 }} disabled={futureStates.length === 0}>
            <ArrowDownUp size={14} style={{ transform: 'rotate(-90deg)' }} /> Redo
          </button>
          
          <div className="toolbar-divider"></div>
          
          <button className="toolbar-btn" onClick={() => setIsCommandPaletteOpen(true)} title="Command Palette (Cmd+K)">
            <Settings size={14} /> Palette Search
          </button>
        </div>
      </div>

      <div className="studio-workspace-row">
        <div className="studio-canvas-container">
          <div className="canvas-toolbar-overlay">
            <button className="canvas-tool-btn" onClick={() => zoomIn({ duration: 300 })} title="Zoom In"><Plus size={14} /></button>
            <button className="canvas-tool-btn" onClick={() => zoomOut({ duration: 300 })} title="Zoom Out"><Minus size={14} /></button>
            <button className="canvas-tool-btn" onClick={() => fitView({ padding: 0.2, duration: 600 })} title="Fit View"><Maximize size={14} /></button>
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onNodeDragStop={onNodeDragStop}
            panOnDrag={isPanMode}
            panOnScroll={!isPanMode}
            selectionOnDrag={!isPanMode}
            nodesDraggable={true}
            elevateNodesOnSelect={true}
            fitView
            minZoom={0.1}
            maxZoom={2}
          >
            <Background color="#CBD5E1" gap={24} size={1} variant="dots" style={{ backgroundColor: '#FFFFFF' }} />
            <MiniMap
              nodeColor="#E2E8F0"
              maskColor="rgba(248, 250, 252, 0.85)"
              style={{
                position: 'absolute', bottom: 24, left: 24,
                border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                width: 140, height: 90
              }}
            />
          </ReactFlow>
        </div>

        <div className="studio-inspector-panel">
          {!inspectorDetails ? (
            <div className="inspector-empty-state">
              <div className="empty-icon"><User size={24} /></div>
              <h3>No Employee Selected</h3>
            </div>
          ) : (
            <div className="inspector-loaded-state">
              <button className="inspector-close" onClick={closePanel}>✕</button>
              
              <div className="inspector-profile-header">
                <img src={inspectorDetails.photo} alt={inspectorDetails.name} className="inspector-avatar" />
                <div className="inspector-identity">
                  <div className="identity-name-row">
                    <h2>{inspectorDetails.name}</h2>
                    <span className="status-badge"><span className="dot"></span> {inspectorDetails.status}</span>
                  </div>
                  <p className="identity-desig">{inspectorDetails.designation}</p>
                  <p className="identity-dept">{inspectorDetails.department}</p>
                </div>
                
                <button className="edit-profile-action-btn" onClick={handleOpenEditModal} title="Edit Employee Information" style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}>
                  <Edit size={16} />
                </button>
              </div>

              <div className="inspector-tabs-bar">
                {TABS.map(t => (
                  <button key={t} className={`inspector-tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="inspector-tab-scroll-content">
                {activeTab === 'Profile' && (
                  <div className="tab-pane-profile">
                    {/* Biography */}
                    <div className="content-section">
                      <h4>About</h4>
                      <p className="about-text">{inspectorDetails.bio}</p>
                    </div>

                    {/* Contact Info */}
                    <div className="content-section">
                      <h4>Contact Information</h4>
                      <div className="contact-row"><Mail size={13} style={{ marginRight: 8 }} /> <span>Email: {inspectorDetails.email}</span></div>
                      <div className="contact-row"><Phone size={13} style={{ marginRight: 8 }} /> <span>Phone: {inspectorDetails.phone} (Ext. {inspectorDetails.extension})</span></div>
                      <div className="contact-row"><MapPin size={13} style={{ marginRight: 8 }} /> <span>Location: {inspectorDetails.location}</span></div>
                    </div>

                    {/* Key Information */}
                    <div className="content-section">
                      <h4>Key Information</h4>
                      <div className="meta-grid">
                        <div className="meta-item">
                          <span className="meta-label">Employee ID</span>
                          <span className="meta-val">{inspectorDetails.employeeId}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Department</span>
                          <span className="meta-val">{inspectorDetails.department}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Experience</span>
                          <span className="meta-val">{inspectorDetails.experience}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Join Date</span>
                          <span className="meta-val">{inspectorDetails.joinDate}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Employment Type</span>
                          <span className="meta-val">{inspectorDetails.employmentType}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Status</span>
                          <span className="meta-val">{inspectorDetails.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="content-section">
                      <h4>Skills</h4>
                      <div className="skills-tags">
                        {inspectorDetails.skills.map((s, idx) => (
                          <span key={idx} className="skill-tag">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Reporting */}
                    <div className="content-section">
                      <h4>Reporting Structure</h4>
                      
                      {/* Reports To */}
                      <div style={{ marginBottom: 16 }}>
                        <span className="meta-label" style={{ display: 'block', marginBottom: 8 }}>Reports To</span>
                        {inspectorDetails.manager ? (
                          <div 
                            className="manager-box" 
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '10px', border: '1px solid #E2E8F0', borderRadius: '8px' }}
                            onClick={() => {
                              const mgrNode = nodes.find(n => n.id === inspectorDetails.manager.id);
                              if (mgrNode) setSelectedNode(mgrNode);
                            }}
                          >
                            <img src={inspectorDetails.manager.photo} alt="manager" className="report-avatar-sm" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                            <div>
                              <div className="mgr-name" style={{ fontSize: '12px', fontWeight: 700 }}>{inspectorDetails.manager.name}</div>
                              <div className="mgr-sub" style={{ fontSize: '11px', color: '#64748B' }}>{inspectorDetails.manager.designation}</div>
                            </div>
                          </div>
                        ) : (
                          <p className="no-reports-text" style={{ fontStyle: 'italic', fontSize: '12px', color: '#94A3B8' }}>No reporting manager (Head of Hierarchy)</p>
                        )}
                      </div>

                      {/* Direct Reports */}
                      <div>
                        <span className="meta-label" style={{ display: 'block', marginBottom: 8 }}>Direct Reports ({inspectorDetails.directReports.length})</span>
                        {inspectorDetails.directReports.length === 0 ? (
                          <p className="no-reports-text" style={{ fontStyle: 'italic', fontSize: '12px', color: '#94A3B8' }}>No direct reports</p>
                        ) : (
                          <div className="reports-list" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {inspectorDetails.directReports.map((dr, idx) => (
                              <div 
                                key={idx} 
                                className="report-item-row" 
                                style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 8px', borderRadius: '8px', border: '1px solid #F1F5F9' }}
                                onClick={() => {
                                  const drNode = nodes.find(n => n.id === dr.id);
                                  if (drNode) setSelectedNode(drNode);
                                }}
                              >
                                <img src={dr.photo} alt={dr.name} className="report-avatar-sm" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                                <div>
                                  <div className="rpt-name" style={{ fontSize: '12px', fontWeight: 600 }}>{dr.name}</div>
                                  <div className="rpt-desig" style={{ fontSize: '11px', color: '#64748B' }}>{dr.designation}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Projects' && (
                  <div className="tab-pane-projects">
                    <div className="content-section">
                      <h4>Assigned Projects</h4>
                      <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {inspectorDetails.projects.map((proj, idx) => (
                          <div key={idx} className="project-item-row" style={{ border: '1px solid #E2E8F0', padding: 12, borderRadius: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontWeight: 600, fontSize: '13px' }}>{proj.name}</span>
                              <span className={`node-role-pill ${proj.status === 'Completed' ? 'manager' : 'employee'}`} style={{ fontSize: '10px' }}>{proj.status}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginBottom: 8 }}>
                              <span>Role: {proj.role}</span>
                              <span>{proj.completion}% Completed</span>
                            </div>
                            <div style={{ width: '100%', height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                              <div style={{ width: `${proj.completion}%`, height: '100%', backgroundColor: 'var(--color-primary, #6366F1)' }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Reports' && (
                  <div className="tab-pane-reports">
                    <div className="content-section">
                      <h4>Employee Reports</h4>
                      <div className="files-list" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {inspectorDetails.reports.map((rep, idx) => (
                          <div key={idx} className="file-item" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, border: '1px solid #E2E8F0', borderRadius: 8 }}>
                            <FileText size={20} color={rep.type === 'Performance' ? '#EF4444' : '#3B82F6'} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>{rep.name}</div>
                              <span style={{ fontSize: '11px', color: '#64748B' }}>{rep.type} Report • {rep.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Activity' && (
                  <div className="tab-pane-activity">
                    <div className="content-section">
                      <h4>Activity Timeline</h4>
                      <div className="activity-timeline" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {inspectorDetails.activity.map((act, idx) => (
                          <div key={idx} className="timeline-item" style={{ display: 'flex', gap: 12 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary, #6366F1)', marginTop: 4 }}></div>
                              {idx < inspectorDetails.activity.length - 1 && (
                                <div style={{ width: 2, flex: 1, backgroundColor: '#E2E8F0', margin: '4px 0' }}></div>
                              )}
                            </div>
                            <div>
                              <span style={{ fontSize: '11px', color: '#94A3B8' }}>{act.date}</span>
                              <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{act.event}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Files' && (
                  <div className="tab-pane-files">
                    <div className="content-section">
                      <h4>Uploaded Documents</h4>
                      <div className="files-list" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {inspectorDetails.documents.map((doc, idx) => (
                          <div key={idx} className="file-item" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, border: '1px solid #E2E8F0', borderRadius: 8 }}>
                            <FileText size={20} color="#10B981" />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>{doc.name}</div>
                              <span style={{ fontSize: '11px', color: '#64748B' }}>{doc.size} • Uploaded {doc.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Permissions' && (
                  <div className="tab-pane-permissions">
                    <div className="content-section">
                      <h4>Assigned Permissions</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {inspectorDetails.permissions.map((perm, idx) => (
                          <span key={idx} className="skill-tag" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', fontFamily: 'monospace' }}>
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Remaining Tabs fallback */}
                {['History', 'AI Insights'].includes(activeTab) && (
                  <div className="tab-pane-fallback" style={{ padding: 16, textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                    No additional data available for {activeTab}.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="palette-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="palette-modal-content" onClick={(e) => e.stopPropagation()} style={{ width: 500, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Edit Employee Profile</h2>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', fontSize: 16, cursor: 'pointer' }}>✕</button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="edit-form-container" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Full Name</label>
                <input style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 6 }} value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} required />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Designation</label>
                  <input style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 6 }} value={editFormData.designation} onChange={e => setEditFormData({...editFormData, designation: e.target.value})} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Department</label>
                  <input style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 6 }} value={editFormData.department} onChange={e => setEditFormData({...editFormData, department: e.target.value})} required />
                </div>
              </div>
              <button className="sync-btn" type="submit" style={{ marginTop: 12 }}>Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && deleteTargetNode && (
        <div className="palette-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="palette-modal-content" onClick={(e) => e.stopPropagation()} style={{ width: 480, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Delete Position</h2>
              <button onClick={() => setShowDeleteModal(false)} style={{ background: 'none', border: 'none', fontSize: 16, cursor: 'pointer' }}>✕</button>
            </div>
            <p>You are about to delete {deleteTargetNode.name}.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="studio-btn btn-white" onClick={() => setShowDeleteModal(false)} style={{ flex: 1 }}>Cancel</button>
              <button className="studio-btn btn-purple" onClick={handleConfirmDelete} style={{ flex: 1, backgroundColor: '#EF4444' }}>Execute Delete</button>
            </div>
          </div>
        </div>
      )}

      <PositionChangeModal 
        isOpen={showChangeModal} 
        onClose={handleCancelChange} 
        employeeNode={draggedNode} 
        newManagerNode={targetManager} 
        onConfirm={handleConfirmChange} 
      />
      <ChangeSummaryModal 
        isOpen={showSummaryModal} 
        onClose={() => setShowSummaryModal(false)} 
        summaryData={summaryData} 
      />
      <AssignEmployeeModal 
        isOpen={showAssignModal} 
        onClose={() => setShowAssignModal(false)} 
        onConfirm={handleAssignConfirm} 
        positionName={selectedNode?.data.designation} 
      />
      <AddEmployeeModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
      <ExcelImportModal 
        isOpen={isImportOpen} 
        onClose={() => setIsImportOpen(false)} 
      />

      {contextMenu && (
        <OrgContextMenu
          x={contextMenu.x} 
          y={contextMenu.y} 
          nodeData={contextMenu.nodeData} 
          nodeId={contextMenu.nodeId}
          onClose={() => setContextMenu(null)}
          onEditProfile={() => {
            const match = nodes.find(n => n.id === contextMenu.nodeId);
            setSelectedNode(match);
            handleOpenEditModal();
          }}
          onPromote={() => { setDraggedNode(nodes.find(n => n.id === contextMenu.nodeId)); setTargetManager(nodes.find(n => n.id === contextMenu.nodeId)); setShowChangeModal(true); }}
          onTransfer={() => { setDraggedNode(nodes.find(n => n.id === contextMenu.nodeId)); setTargetManager(nodes.find(n => n.id === contextMenu.nodeId)); setShowChangeModal(true); }}
          onDelete={handleDeleteTrigger}
        />
      )}
    </div>
  );
};

export default function OrgStudioWrapper() {
  return (
    <ReactFlowProvider>
      <OrgStudio />
    </ReactFlowProvider>
  );
}
