const fs = require('fs');

const dataPath = './src/data/mockData.js';
let content = fs.readFileSync(dataPath, 'utf-8');

// The strategy is to parse the file or do a simple replace since it's just plain JS objects.
// Since it's ES module syntax, we can't easily `require` it. We can read the whole PEOPLE_DIRECTORY array, manipulate it using regex or evaluation, then write back.
// Since it's a bit risky to `eval`, we can use a simpler approach.
// I will just read the file, extract the PEOPLE_DIRECTORY array string, eval it (it's safe, we control it), modify it, and write it back.

// Extract PEOPLE_DIRECTORY array
const startIndex = content.indexOf('export const PEOPLE_DIRECTORY = [');
const startBracket = content.indexOf('[', startIndex);

let bracketCount = 1;
let endIndex = startBracket + 1;
let inString = false;
let stringChar = '';

while (bracketCount > 0 && endIndex < content.length) {
  const char = content[endIndex];
  if (!inString) {
    if (char === "'" || char === '"' || char === '`') {
      inString = true;
      stringChar = char;
    } else if (char === '[') {
      bracketCount++;
    } else if (char === ']') {
      bracketCount--;
    }
  } else {
    if (char === stringChar && content[endIndex-1] !== '\\') {
      inString = false;
    }
  }
  endIndex++;
}

const peopleArrayStr = content.substring(startBracket, endIndex);
let peopleArray;
try {
  peopleArray = eval('(' + peopleArrayStr + ')');
} catch (e) {
  console.error("Error evaling people array:", e);
  process.exit(1);
}

// Map the employees and add new fields
const enhancedPeople = peopleArray.map(emp => {
  // Add managerId, directReportIds, peerIds
  let managerId = null;
  let directReportIds = [];
  let peerIds = [];
  
  if (emp.id === 'EMP-0012') { // David Chen
    managerId = 'EMP-0001';
    directReportIds = ['EMP-0182', 'EMP-0199', 'EMP-0881', 'EMP-1102'];
    peerIds = ['EMP-0045', 'EMP-0922'];
  } else if (emp.id === 'EMP-0001') { // Sarah Jenkins
    directReportIds = ['EMP-0012', 'EMP-0045', 'EMP-0922'];
  } else if (emp.id === 'EMP-0045') { // Elena Rodriguez
    managerId = 'EMP-0001';
    directReportIds = ['EMP-0342', 'EMP-1145'];
    peerIds = ['EMP-0012', 'EMP-0922'];
  } else if (emp.id === 'EMP-0922') { // Emma Watson
    managerId = 'EMP-0001';
    peerIds = ['EMP-0012', 'EMP-0045'];
  } else if (emp.id === 'EMP-0182') { // Marcus Johnson
    managerId = 'EMP-0012';
    peerIds = ['EMP-0199'];
  } else if (emp.id === 'EMP-0199') { // Priya Patel
    managerId = 'EMP-0012';
    peerIds = ['EMP-0182'];
  } else if (emp.id === 'EMP-0881') { // Alex Smith
    managerId = 'EMP-0182';
  } else if (emp.id === 'EMP-1102') { // James Wilson
    managerId = 'EMP-0199';
  }

  // Add authorityScores, authorityType, decisionFlowIds, approvalResponsibilities
  const authorityScores = {
    reporting: emp.directReports > 10 ? 94 : (emp.directReports > 0 ? 70 : 40),
    decision: emp.id === 'EMP-0001' ? 98 : (emp.id === 'EMP-0012' ? 82 : 60),
    project: emp.assignedProjects > 3 ? 89 : 50,
    crossTeam: ['EMP-0001', 'EMP-0012', 'EMP-0045'].includes(emp.id) ? 90 : 60,
    approval: ['EMP-0001', 'EMP-0012', 'EMP-0922'].includes(emp.id) ? 96 : 50
  };

  let authorityType = 'Standard Employee';
  if (emp.id === 'EMP-0001') authorityType = 'STRATEGIC DECISION MAKER';
  else if (emp.id === 'EMP-0012') authorityType = 'TECHNICAL AUTHORITY';
  else if (emp.id === 'EMP-0045') authorityType = 'Operational Leader';
  else if (emp.id === 'EMP-0922') authorityType = 'Approval Gatekeeper';
  else if (emp.directReports > 0) authorityType = 'People Manager';

  const decisionFlowIds = ['DF-101', 'DF-102'];
  const approvalResponsibilities = ['Time Off', 'Expense Reports'];
  if (emp.id === 'EMP-0012') {
    approvalResponsibilities.push('Architecture Review', 'Engineering Budget Approval', 'Technical Hiring Approval');
    decisionFlowIds.push('DF-103', 'DF-104', 'DF-105');
  }

  // Enhance projects
  const enhancedProjects = [];
  if (emp.id === 'EMP-0012') {
    enhancedProjects.push({ id: 1, name: 'Cloud Migration', role: 'Technical Authority', authorityLevel: 'APPROVER', progress: 72, allocationPercentage: 40, health: 'AT RISK', manager: 'David Chen', teamSize: 18, dueDate: '2026-08-15' });
    enhancedProjects.push({ id: 2, name: 'SAMS Dashboard', role: 'Engineering Sponsor', authorityLevel: 'PROJECT OWNER', progress: 65, allocationPercentage: 20, health: 'GOOD', manager: 'Marcus Johnson', teamSize: 12, dueDate: '2026-09-30' });
    enhancedProjects.push({ id: 3, name: 'Excel Sync Engine', role: 'Approval Authority', authorityLevel: 'APPROVER', progress: 40, allocationPercentage: 15, health: 'NEEDS ATTENTION', manager: 'Priya Patel', teamSize: 15, dueDate: '2026-10-15' });
  } else if (emp.id === 'EMP-0001') {
    enhancedProjects.push({ id: 1, name: 'Q4 Reorg', role: 'Executive Sponsor', authorityLevel: 'DECISION MAKER', progress: 100, allocationPercentage: 10, health: 'EXCELLENT', manager: 'Sarah Jenkins', teamSize: 45, dueDate: '2026-07-01' });
  } else if (emp.id === 'EMP-0182') {
    enhancedProjects.push({ id: 2, name: 'SAMS Dashboard', role: 'Frontend Lead', authorityLevel: 'CONTRIBUTOR', progress: 65, allocationPercentage: 80, health: 'GOOD', manager: 'Marcus Johnson', teamSize: 12, dueDate: '2026-09-30' });
  }

  return {
    ...emp,
    managerId,
    directReportIds,
    peerIds,
    authorityScores,
    authorityType,
    decisionFlowIds,
    approvalResponsibilities,
    projects: enhancedProjects
  };
});

// Format the object nicely back to string
const newPeopleArrayStr = JSON.stringify(enhancedPeople, null, 2)
  // Clean up object keys quoting
  .replace(/"([a-zA-Z0-9_]+)":/g, '$1:');

const newContent = content.substring(0, startBracket) + newPeopleArrayStr + content.substring(endIndex);

fs.writeFileSync(dataPath, newContent, 'utf-8');
console.log('Successfully updated mockData.js');
