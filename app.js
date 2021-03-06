var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/lego';
var initdb = require('./initdb');
var dbschemes = require('./dbschemes');
var tablesRouter = require('./tables.js');
var missionsRouter = require('./missions.js');
var scoresRouter = require('./livescore.js');

mongoose.connect(url);

app.use(function logger(req, res, next) {
  console.log(req.url);

  next();
  console.log(res.statusCode);
});

app.use(express.static(__dirname + '/public'));
app.use('/tables', tablesRouter)
app.use('/missions', missionsRouter)
app.use('/scores', scoresRouter)

app.get('/teams', function(req, res) {
  res.type('application/json'); // set content-type
  res.send(teamData); // send text response
});

app.get('/load', function(req, res) {
  initdb.loadDataToMongo();
  res.type('text/plain'); // set content-type
  res.send("ok");
});



app.get('/test/:id', function(req, res) {
  res.type('text/plain'); // set content-type
  res.send('i am a beautiful butterfly' + req.params.id); // send text response
});

app.get('/*', function(req, res) {
  res.status(404).send("Page Not found");
});

app.listen(8085);

