var express = require('express');
var dbschemes = require('./dbschemes');
var router = express();


router.get('/', function(req, res) {
  dbschemes.Score
  .find({})
  .sort({id: 1})
  .populate('match')
  .populate('mission')
  .exec(function(err, r){
    res.type('application/json');
    res.send(r);
  });
})

router.get('/match/:matchId', function(req, res) {
  var matchId = req.params.matchId;

  dbschemes.Score
    .find({'match': matchId})
    .select({points:1})
    .exec(function(err, data) {
    var points = 0;
    for (item in data) {
      points += data[item].points;
    }
    res.type('application/json');
    res.send("points:"+points);
  })
});


router.get('/match/:matchId/mission/:missionId/points/:points', function(req, res) {
  var matchId = req.params.matchId;
  var missionId = req.params.missionId;
  var points = req.params.points;

  dbschemes.Score.findOneAndUpdate(
    {'match': matchId, 'mission': missionId},
    {'points': points},
    {upsert:true})
  .exec(function(err, score) {
    console.log("score "+score);
    res.type('application/json');
    res.send(score);
  })
});

router.get('/:id', function(req, res) {
  dbschemes.Match
  .find({table: req.params.id})
  .sort({id: 1})
  .populate('team')
  .exec(function (err, r){
    res.type('application/json');
    res.send(r);
  });
});

module.exports = router
