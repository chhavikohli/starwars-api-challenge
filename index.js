var express = require('express');
//var mongoose = require('mongoose');
var people = require('./router/people');
var planets = require('./router/planets');

var bodyParser = require('body-parser');

var app = express();
//mongoose.connect('mongodb://localhost/demo');

app.use(bodyParser.json());
app.use('/people', people);
app.use('/planets', planets);
app.listen('3000', function () {
    console.log('application started at 3000');
});


