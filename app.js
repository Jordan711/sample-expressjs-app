var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const expHandlebars = require('express-handlebars');
var port = 8080;

app.engine('handlebars', expHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  res.render('index', {
    pageTitle: 'HOMEPAGE',
    homePageActive: 'active'
  });
});

app.get('/lucky-number', function(req, res){
  var number = Math.floor(Math.random() * 1000);
  res.render('lucky-number', {
    pageTitle: 'Lucky Number',
    number: number,
    luckyNumActive: 'active'
  });
});

app.post('/lucky-number', function(req, res){
  if (isNaN(req.body.min) || isNaN(req.body.max) || req.body.max.length === 0 || req.body.min.length === 0) {
    res.render('lucky-number', {
      pageTitle: 'Lucky Number',
      errorMessage: 'Please Enter valid numbers',
      luckyNumActive: 'active'
    });
  } else if (parseInt(req.body.min) > parseInt(req.body.max)){
    res.render('lucky-number', {
      pageTitle: 'Lucky Number',
      errorMessage: 'Invalid Number Range',
      luckyNumActive: 'active'
    });
  } else {
    var min = parseInt(req.body.min);
    var max = parseInt(req.body.max);
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    res.render('lucky-number', {
      pageTitle: 'Lucky Number',
      number: number,
      luckyNumActive: 'active'
    });
  }

});

app.get('/about', function(req, res){
  res.render('about', {
    pageTitle: 'About',
    aboutActive: 'active'
  });
});

app.use(function(req, res, next){
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error!');
});

app.listen(port, () => console.log('Listening on port: ' + port));
