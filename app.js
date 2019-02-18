var http = require('http');
const express = require('express');
const app = express();

const expHandlebars = require('express-handlebars');
var port = 8080;

app.engine('handlebars', expHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
  res.render('index', {pageTitle: 'HOMEPAGE'});
});

app.get('/lucky-number', function(req, res){
  var number = Math.floor(Math.random() * 1000);
  res.render('index', {pageTitle: number});
});

app.get('*', function(req, res){
  res.render('404');
});

app.listen(port, () => console.log('Listening on port: ' + port));
