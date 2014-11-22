var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: ':memory'
})

module.exports = sequelize;

