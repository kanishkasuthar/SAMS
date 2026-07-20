export const generateMockPDF = (title, content) => {
  const fileContent = `
    =======================================
    ${title.toUpperCase()}
    =======================================
    Date: ${new Date().toLocaleDateString()}
    
    ${content || 'Detailed report data goes here...'}
    
    =======================================
    CONFIDENTIAL - DO NOT DISTRIBUTE
    =======================================
  `;
  
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}_${Date.now()}.txt`; // Fallback to txt for simplicity
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const generateMockCSV = (filename, dataArray) => {
  if (!dataArray || dataArray.length === 0) return;
  
  const headers = Object.keys(dataArray[0]).join(',');
  const rows = dataArray.map(obj => Object.values(obj).join(',')).join('\n');
  const csvContent = `${headers}\n${rows}`;
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/\s+/g, '_')}_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
