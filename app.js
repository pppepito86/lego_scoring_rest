var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/lego';
var initdb = require('./initdb');
var dbschemes = require('./dbschemes');

mongoose.connect(url);

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
  var kasapin40 = new Team({id: "1000", name: "KASAPIN40"});
  kasapin40.save(function(err, tr) {
    if(err) res.send(err);
  });
  //res.type('text/plain'); // set content-type
  //res.send('i am a beautiful butterfly'); // send text response
});

app.listen(8085);

