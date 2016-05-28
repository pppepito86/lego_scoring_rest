var express = require('express');
var dbschemes = require('./dbschemes');
var router = express();

router.get('/', function(req, res) {
  dbschemes.Match
  .find({})
  .sort({id: 1})
  .populate('team')
  .exec(function (err, r){
    res.type('application/json');
    res.send(r);
  });
});


router.get('/:id', function(req, res) {
  dbschemes.Match
  .find({table: req.params.id})
  .sort({id: 1, table: 1})
  .populate('team')
  .exec(function (err, r){
    res.type('application/json');
    res.send(r);
  });
});

router.get('/match/:id', function(req, res) {
  dbschemes.Match
  .find({id: req.params.id})
  .sort({table: 1})
  .populate('team')
  .exec(function (err, r){
    res.type('application/json');
    res.send(r);
  });
});


module.exports = router
