const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');

const models = {};

// Read all files in this directory (except index.js) and import them
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    if (model.name) {
      models[model.name] = model;
    }
  });

// Call associate if it exists
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  ...models,
  sequelize
};
