var express = require('express');
var bodyParser = require('body-parser');
var sequelize = require(__dirname+'/database');

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Model = require(__dirname+'/model');
var CrudRouter = require(__dirname+'/../lib/router');

var router = new CrudRouter(Model, 'model', 'models');

app.use('/models', router);

sequelize.sync({ force: true }).then(function() {

  var port = process.env.PORT || 5555;
  app.listen(port , function(error) {
    if (error) { throw new Error() }

    console.log('listening on port', port);
  });
});

