var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var teamSchema = Schema({
  id: { type: String, unique: true, required: true},
  name: { type: String, required: true},
  city: String,
  school: String
});

var matchSchema = Schema({
  id: Number,
  table: Number,
  team: {
    type: Schema.ObjectId,
    ref: 'Team'
  },
  round: Number
});

var missionSchema = Schema({
  id: {type: Number, unique: true, required: true},
  name: String
});

module.exports.teamSchema = teamSchema;
module.exports.matchSchema = matchSchema;
module.exports.missionSchema = missionSchema;

module.exports.Team = mongoose.model('Team', teamSchema);
module.exports.Match = mongoose.model('Match', matchSchema);
module.exports.Mission = mongoose.model('Mission', missionSchema);

