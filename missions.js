var express = require('express');
var dbschemes = require('./dbschemes');
var router = express();

router.get('/', function(req, res) {
  dbschemes.Mission
  .find({})
  .sort({id: 1})
  .exec(function (err, r){
    res.type('application/json');
    res.send(r);
  });
});

router.get('/:id', function(req, res) {
  dbschemes.Mission
  .findOne({id: req.params.id})
  .exec(function (err, r){
    res.type('application/json');
    res.send(r);
  });
});

module.exports = router
