const { sequelize } = require('./src/config/database');

async function checkSchema() {
  try {
    const [results] = await sequelize.query('DESCRIBE users');
    console.log(results);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkSchema();
