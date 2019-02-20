var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const expHandlebars = require('express-handlebars');
var port = 8080;

app.engine('handlebars', expHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));


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
  if (isNaN(req.body.lower) || isNaN(req.body.upper)) {
    res.render('lucky-number', {
      pageTitle: 'Lucky Number',
      errorMessage: 'Please Enter valid numbers :((('
    });
  } else {
    var lower = parseInt(req.body.lower);
    var upper = parseInt(req.body.upper);
    var number = Math.floor(Math.random() * (upper - lower + 1)) + lower;

    res.render('lucky-number', {
      pageTitle: 'Lucky Number',
      number: number,
      luckyNumActive: 'active'
    });
  }

});

app.get('*', function(req, res){
  res.render('404');
});

app.listen(port, () => console.log('Listening on port: ' + port));
