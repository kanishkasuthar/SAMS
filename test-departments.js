const axios = require('axios');

async function seedDepartments() {
  try {
    // 1. Create root (CEO / Exec)
    const execRes = await axios.post('http://localhost:3000/api/departments', {
      departmentName: 'Executive',
      departmentCode: 'EXEC',
      description: 'C-Suite and Executive team',
      budget: 5000000,
      color: '#4F46E5',
      icon: 'Network'
    });
    const rootId = execRes.data.data.department.id;
    console.log('Created Root:', execRes.data.data.department.departmentName);

    // 2. Create Engineering
    const engRes = await axios.post('http://localhost:3000/api/departments', {
      departmentName: 'Engineering',
      departmentCode: 'ENG',
      parentDepartmentId: rootId,
      budget: 2000000,
      color: '#10B981',
      icon: 'Activity'
    });
    const engId = engRes.data.data.department.id;
    console.log('Created Eng:', engRes.data.data.department.departmentName);

    // 3. Create Product
    const prodRes = await axios.post('http://localhost:3000/api/departments', {
      departmentName: 'Product',
      departmentCode: 'PROD',
      parentDepartmentId: rootId,
      budget: 1500000,
      color: '#F59E0B',
      icon: 'Activity'
    });
    console.log('Created Prod:', prodRes.data.data.department.departmentName);

    // 4. Create Frontend under Eng
    const feRes = await axios.post('http://localhost:3000/api/departments', {
      departmentName: 'Frontend',
      departmentCode: 'FE',
      parentDepartmentId: engId,
      budget: 500000,
      color: '#3b82f6',
      icon: 'Activity'
    });
    console.log('Created FE:', feRes.data.data.department.departmentName);

    // 5. Test Tree
    const treeRes = await axios.get('http://localhost:3000/api/departments/tree');
    console.log('Tree Depth:', JSON.stringify(treeRes.data.data.tree, null, 2).substring(0, 500) + '...');
    
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

seedDepartments();
