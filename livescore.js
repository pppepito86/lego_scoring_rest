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
    if(err) {
      res.status(500);
      res.type('application/json');
      res.send(err);
    } else {
      res.status(200);
      res.type('application/json');
      res.send(r);
    }
  });
})

router.get('/match/:matchId', function(req, res) {
  var matchId = req.params.matchId;

  dbschemes.Score
    .find({'match': matchId})
    .populate('mission')
    .exec(function(err, data) {
    var points = 0;
    for (item in data) {
      points += data[item].points;
    }
    //data.points = points;
    responseJSON = {
      detailed: data,
      total: points
    };
    res.type('application/json');
    //res.send("points:"+points);
    res.send(responseJSON);
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
    if(err) {
      res.status(500);
      res.type('application/json');
      res.send(err);
    } else {
      console.log("score " + score);
      res.status(200);
      res.type('application/json');
      res.send(score);
    }
  })
});

router.get('/results', function(req, res) {
  dbschemes.Team
      .find({})
      .exec(function(teamErr, teamData) {
        var results = {};
        console.log(teamData);
        for (teamItem in teamData) {
          results[teamData[teamItem]._id] = {points:[]};
          results[teamData[teamItem]._id].name = teamData[teamItem].name;
        }

        dbschemes.Score
            .find({})
            .sort({id: 1})
            .populate('match')
            .exec(function (err, data){
              if(err) {
                res.status(500);
                res.type('application/json');
                res.send(err);
              } else {
                for (item in data) {
                  if (!results[data[item].match.team].points[parseInt(data[item].match.round)-1]) results[data[item].match.team].points[parseInt(data[item].match.round)-1]=0;
                  results[data[item].match.team].points[parseInt(data[item].match.round)-1] += parseInt(data[item].points);
                }

                resultsArray = [];
                for (entry in results) {
                  resultsArray.push(results[entry]);
                }
                res.status(200);
                res.type('application/json');
                res.send(resultsArray);
              }
            });
  });

});

router.get('/:id', function(req, res) {
  dbschemes.Match
  .find({table: req.params.id})
  .sort({id: 1})
  .populate('team')
  .exec(function (err, r){
    if(err) {
      res.status(500);
      res.type('application/json');
      res.send(err);
    } else {
      res.status(200);
      res.type('application/json');
      res.send(r);
    }
  });
});

module.exports = router
