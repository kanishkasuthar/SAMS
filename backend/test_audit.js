const { sequelize, AuditLog } = require('./src/models');
const auditService = require('./src/services/auditService');
const { logAudit } = require('./src/utils/auditLogger');

async function test() {
  await sequelize.sync({ force: true });
  
  console.log('Testing AuditLog.create directly:');
  try {
    await AuditLog.create({ action: 'Test' });
  } catch (err) {
    console.log('Direct create failed:', err.message);
  }

  console.log('Testing auditService.logAction:');
  const res1 = await auditService.logAction({ action: 'Login', module: 'System' });
  console.log('auditService returned:', res1);

  console.log('Testing utils logAudit:');
  const res2 = await logAudit('user1', 'Login', 'Details', '127.0.0.1');
  console.log('logAudit returned:', res2);

  process.exit(0);
}

test();
