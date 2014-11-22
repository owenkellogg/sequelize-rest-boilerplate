
function Controller(model, singular, plural) {
  this.model = model; 
  this.singular = singular;
  this.plural = plural;
}

Controller.prototype.respondError = function(res, error, code) {
  res
    .status(code || 500)
    .send({ error: error }).end();
}

Controller.prototype.respond = function(res, value, plural) {
  var _this = this;
  var body = {};
  if (plural === true) {
    body[_this.plural] =  value
  } else {
    body[_this.singular] = value
  }
  res.status(200).send(body).end();
}

Controller.prototype.create = function(req, res, next) {
  var _this = this;
  _this.model.create(req.body)
  .then(function(instance) {
    _this.respond(res, instance);
  })
  .catch(function(error) {
    _this.respondError(res, error, 500);
  })
}

Controller.prototype.index = function(req, res, next) {
  var _this = this;
  _this.model.findAll({ where: req.body })
  .then(function(instances) {
    _this.respond(res, instances, true);
  })
  .catch(function(error) {
    _this.respondError(res, error, 500);
  })
}

Controller.prototype.show = function(req, res, next) {
  var _this = this;
  _this.model.find(req.params.id)
  .then(function(instance) {
    console.log('singular', _this.singular);
    _this.respond(res, instance);
  })
  .catch(function(error) {
    _this.respondError(res, error, 500);
  })
}

Controller.prototype.update = function(req, res, next) {
  var _this = this;
  _this.model.find(req.body)
  .then(function(instance) {
    if (instance) {
      var id = req.body.id;
      delete req.body.id;
      return _this.updateAttributes(req.body)
      .then(function() {
        return instance.find(id).then(function(instance) {
          _this.respond(res, instance);
        });
      })
    } else {
      _this.respondError(res, new Error('not found'), 404);
    }
  })
  .catch(function(error) {
    _this.respondError(res, error, 500);
  })
}

Controller.prototype.destroy = function(req, res, next) {
  var _this = this;
  _this.model.find(req.params.id)
  .then(function(instance) {
    if (instance) {
      instance.destroy()
        .then(function(){
          _this.respond(res, null, 200);
        })
        .catch(function(error) {
          _this.respondError(res, error, 500);
        });
    } else {
      _this.respondError(res, null, 404);
    }
  })
  .catch(function(error) {
    console.log('lower error');
    _this.respondError(res, error, 500);
  })
}

module.exports = Controller;

