var dbschemes = require('./dbschemes');
var fs = require('fs');

module.exports.loadDataToMongo = function () {
  var teamData = require('./data/teams.json');
  var saveMatch = function (currMatch, currentTeamId) {
    dbschemes.Team.findOne({id: currentTeamId}, function (err, currentTeam) {
     currMatch.team = currentTeam._id;
     currMatch.save(function (error, r){
       if(err) console.error(err)
       });
    });
  }

  var loadMatches = function() {
  fs.readFile('./data/schedule.txt', function(err, data) {
    if(err) console.error(err);

    var rows = data.toString().split('\n');

    for(var i = 0; i < rows.length; i++) {
      var values = rows[i].split(' ');
      if(values.length < 5) continue;
      for (var tableId = 1; tableId < values.length; tableId++) {
        if(values[tableId] == 0) continue;
        var currentTeamId = teamData[values[tableId]].id;
        var currMatch = new dbschemes.Match({
            id: i+1,
            table: tableId,
            round: values[0]
          });
        saveMatch(currMatch, currentTeamId);
      }
    }
  });
  }

  dbschemes.Team.remove({}, function() {
    dbschemes.Team.collection.insertMany(teamData, function() {
      dbschemes.Match.remove({}, function() {
          loadMatches();
      });
    });
  });

}


