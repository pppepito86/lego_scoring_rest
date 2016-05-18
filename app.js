var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/lego';
var initdb = require('./initdb');
var dbschemes = require('./dbschemes');

mongoose.connect(url);

app.get('/tables', function(req, res) {
  dbschemes.Match
  .find({})
  .sort({id: 1})
  .populate('team')
  .exec(function (err, r){
    res.type('application/json');
    res.send(r);
  });
});


app.get('/tables/:id', function(req, res) {
  dbschemes.Match
  .find({table: req.params.id})
  .sort({id: 1})
  .populate('team')
  .exec(function (err, r){
    res.type('application/json');
    res.send(r);
  });
});

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

