const axios = require('axios');

async function test() {
  try {
    const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'kanishkasuthar1005@gmail.com',
      password: 'kanishka@1005'
    }).catch(async (err) => {
      return axios.post('http://localhost:3000/api/auth/login', {
        email: 'testnew@example.com',
        password: 'mypassword123'
      });
    });
    console.log('Login success:', loginRes.data.status, loginRes.data.data.user.id);
    
    const treeRes = await axios.get('http://localhost:3000/api/departments/tree', {
      headers: { Authorization: `Bearer ${loginRes.data.token}` }
    });
    console.log('Tree API Status:', treeRes.data.status);
    console.log('Departments found:', treeRes.data.data.tree.length);
    console.log(JSON.stringify(treeRes.data.data.tree, null, 2));
  } catch (err) {
    console.error('Error:', err.response?.data);
  }
}

test();
