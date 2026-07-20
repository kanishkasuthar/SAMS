require('dotenv').config();
const Department = require('./src/models/Department');
const { sequelize } = require('./src/config/database');

async function seedDepartments() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // 1. Create root (CEO / Exec)
    const exec = await Department.create({
      departmentName: 'Executive',
      departmentCode: 'EXEC',
      description: 'C-Suite and Executive team',
      budget: 5000000,
      color: '#4F46E5',
      icon: 'Network'
    });
    console.log('Created Root:', exec.departmentName);

    // 2. Create Engineering
    const eng = await Department.create({
      departmentName: 'Engineering',
      departmentCode: 'ENG',
      parentDepartmentId: exec.id,
      budget: 2000000,
      color: '#10B981',
      icon: 'Activity'
    });
    console.log('Created Eng:', eng.departmentName);

    // 3. Create Product
    const prod = await Department.create({
      departmentName: 'Product',
      departmentCode: 'PROD',
      parentDepartmentId: exec.id,
      budget: 1500000,
      color: '#F59E0B',
      icon: 'Activity'
    });
    console.log('Created Prod:', prod.departmentName);

    // 4. Create Frontend under Eng
    const fe = await Department.create({
      departmentName: 'Frontend',
      departmentCode: 'FE',
      parentDepartmentId: eng.id,
      budget: 500000,
      color: '#3b82f6',
      icon: 'Activity'
    });
    console.log('Created FE:', fe.departmentName);

    console.log('All departments seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding departments:', err);
    process.exit(1);
  }
}

seedDepartments();
