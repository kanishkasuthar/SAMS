const axios = require('axios');

async function seedDepartments() {
  try {
    // Login to get token
    const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'root@localhost',
      password: 'kanishka@1005'
    });
    const token = loginRes.data.token;
    
    const api = axios.create({
      baseURL: 'http://localhost:3000/api',
      headers: { Authorization: `Bearer ${token}` }
    });

    // 1. Create root (CEO / Exec)
    const execRes = await api.post('/departments', {
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
    const engRes = await api.post('/departments', {
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
    const prodRes = await api.post('/departments', {
      departmentName: 'Product',
      departmentCode: 'PROD',
      parentDepartmentId: rootId,
      budget: 1500000,
      color: '#F59E0B',
      icon: 'Activity'
    });
    console.log('Created Prod:', prodRes.data.data.department.departmentName);

    // 4. Create Frontend under Eng
    const feRes = await api.post('/departments', {
      departmentName: 'Frontend',
      departmentCode: 'FE',
      parentDepartmentId: engId,
      budget: 500000,
      color: '#3b82f6',
      icon: 'Activity'
    });
    console.log('Created FE:', feRes.data.data.department.departmentName);

    // 5. Test Tree
    const treeRes = await api.get('/departments/tree');
    console.log('Tree:', JSON.stringify(treeRes.data.data.tree, null, 2).substring(0, 500) + '...');
    
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

seedDepartments();
