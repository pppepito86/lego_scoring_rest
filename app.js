var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/lego';

mongoose.connect(url);

var Schema = mongoose.Schema;
var teamSchema = Schema({
  id: { type: String, unique: true, required: true},
  name: { type: String, required: true},
  city: String,
  school: String
});

var matchScheme = Schema({
  id: Number,
  table: Number,
  team: {
    type: Schema.ObjectId,
    ref: 'teams'
  },
  round: Number
});

var Team = mongoose.model('Team', teamSchema);

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");

  db.collection('test').insert({"pesho" : "marin"});

  db.close();
});

app.get('/test/:id', function(req, res) {
  res.type('text/plain'); // set content-type
  res.send('i am a beautiful butterfly' + req.params.id); // send text response
});

app.get('/*', function(req, res) {
  var kasapin40 = new Team({id: "1000", name: "KASAPIN40"});
  kasapin40.save(function(err, tr) {
    if(err) res.send(err);
  });
  //res.type('text/plain'); // set content-type
  //res.send('i am a beautiful butterfly'); // send text response
});

app.listen(8085);

