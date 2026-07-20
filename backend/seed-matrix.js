require('dotenv').config();
const { sequelize } = require('./src/config/database');
const Department = require('./src/models/Department');
const ResponsibilityMatrix = require('./src/models/ResponsibilityMatrix');
const ResponsibilityAssignment = require('./src/models/ResponsibilityAssignment');

async function seedMatrix() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Fetch Departments to use as columns/assignments
    const execDept = await Department.findOne({ where: { departmentCode: 'EXEC' } });
    const engDept = await Department.findOne({ where: { departmentCode: 'ENG' } });
    const prodDept = await Department.findOne({ where: { departmentCode: 'PROD' } });
    const feDept = await Department.findOne({ where: { departmentCode: 'FE' } });

    if (!execDept || !engDept || !prodDept || !feDept) {
      console.log('Please run seed-departments.js first.');
      process.exit(1);
    }

    // Clear existing
    await ResponsibilityAssignment.destroy({ where: {}, force: true });
    await ResponsibilityMatrix.destroy({ where: {}, force: true });

    // 1. Process: Annual Budget Approval
    const p1 = await ResponsibilityMatrix.create({
      matrixName: 'Annual Budget Approval',
      matrixCode: 'FIN-001',
      description: 'Annual budget strategy and approval',
      departmentId: execDept.id,
      status: 'Active'
    });

    await ResponsibilityAssignment.bulkCreate([
      { matrixId: p1.id, departmentId: execDept.id, responsibilityType: 'Accountable' },
      { matrixId: p1.id, departmentId: engDept.id, responsibilityType: 'Responsible' },
      { matrixId: p1.id, departmentId: prodDept.id, responsibilityType: 'Consulted' }
    ]);
    console.log('Created matrix:', p1.matrixName);

    // 2. Process: Cloud Infrastructure Pivot
    const p2 = await ResponsibilityMatrix.create({
      matrixName: 'Cloud Infrastructure Pivot',
      matrixCode: 'ENG-001',
      description: 'Cloud service migration and selection',
      departmentId: engDept.id,
      status: 'Active'
    });

    await ResponsibilityAssignment.bulkCreate([
      { matrixId: p2.id, departmentId: engDept.id, responsibilityType: 'Accountable' },
      { matrixId: p2.id, departmentId: execDept.id, responsibilityType: 'Informed' },
      { matrixId: p2.id, departmentId: prodDept.id, responsibilityType: 'Consulted' },
      { matrixId: p2.id, departmentId: feDept.id, responsibilityType: 'Responsible' }
    ]);
    console.log('Created matrix:', p2.matrixName);

    // 3. Process: Product Roadmap
    const p3 = await ResponsibilityMatrix.create({
      matrixName: 'Quarterly Product Roadmap',
      matrixCode: 'PROD-001',
      description: 'Roadmap planning and feature prioritization',
      departmentId: prodDept.id,
      status: 'Active'
    });

    await ResponsibilityAssignment.bulkCreate([
      { matrixId: p3.id, departmentId: prodDept.id, responsibilityType: 'Accountable' },
      { matrixId: p3.id, departmentId: engDept.id, responsibilityType: 'Consulted' },
      { matrixId: p3.id, departmentId: execDept.id, responsibilityType: 'Informed' }
    ]);
    console.log('Created matrix:', p3.matrixName);

    console.log('Responsibility Matrix seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding matrix:', err);
    process.exit(1);
  }
}

seedMatrix();
