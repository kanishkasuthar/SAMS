import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

export const exportToExcel = (nodes, edges) => {
  const data = prepareFlatData(nodes, edges);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Organization Chart');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(blob, `organization_export_${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportToCSV = (nodes, edges) => {
  const data = prepareFlatData(nodes, edges);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `organization_export_${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportToPNG = async (canvasSelector = '.react-flow') => {
  const element = document.querySelector(canvasSelector);
  if (!element) return;
  
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      useCORS: true,
      scale: 2 // Improve quality
    });
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `organization_chart_${new Date().toISOString().split('T')[0]}.png`);
      }
    });
  } catch (err) {
    console.error('Failed to export image', err);
  }
};

const prepareFlatData = (nodes, edges) => {
  const orgNodes = nodes.filter(n => n.type === 'orgNode');
  
  return orgNodes.map(node => {
    const managerEdge = edges.find(e => e.target === node.id);
    const managerNode = managerEdge ? orgNodes.find(n => n.id === managerEdge.source) : null;
    
    return {
      'Employee Name': node.data?.name || '',
      'Employee ID': node.id || '',
      'Department': node.data?.department || '',
      'Designation': node.data?.designation || '',
      'Manager ID': managerNode ? managerNode.id : '',
      'Manager Name': managerNode ? managerNode.data?.name : '',
      'Email': node.data?.email || '',
      'Phone': node.data?.phone || '',
      'Role': node.data?.role || 'Employee',
      'Status': node.data?.status || 'Active'
    };
  });
};
