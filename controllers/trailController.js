const db = require("../models");

// Defining methods for the trailController
module.exports = {
  findAll: function(req, res) {
    db.Trail.find(req.query)
      .then(dbTrail => res.json(dbTrail))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Trail.findById(req.params.id)
      .then(dbTrail => res.json(dbTrail))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Trail.create(req.body)
      .then(dbTrail => res.json(dbTrail))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Trail.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbTrail => res.json(dbTrail))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Trail.findById(req.params.id)
      .then(dbTrail => dbTrail.remove())
      .then(dbTrail => res.json(dbTrail))
      .catch(err => res.status(422).json(err));
  }
};
