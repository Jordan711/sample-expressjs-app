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
  if (isNaN(req.body.lower) || isNaN(req.body.upper) || req.body.upper.length === 0 || req.body.lower.length === 0) {
    res.render('lucky-number', {
      pageTitle: 'Lucky Number',
      errorMessage: 'Please Enter valid numbers',
      luckyNumActive: 'active'
    });
  } else if (parseInt(req.body.lower) > parseInt(req.body.upper)){
    res.render('lucky-number', {
      pageTitle: 'Lucky Number',
      errorMessage: 'Invalid Number Range',
      luckyNumActive: 'active'
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

app.use(function(req, res, next){
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error!');
});

app.listen(port, () => console.log('Listening on port: ' + port));
