var Sequelize = require('sequelize');

var sequelize = require(__dirname+'/database'); 

var Model = sequelize.define('Model', {
  name: Sequelize.STRING,
  uid: Sequelize.INTEGER
});

module.exports = Model;

