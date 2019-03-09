const games = require('express').Router();

games.get('/', function(req, res) {
  res.render('games', {
    pageTitle: 'Games Menu',
    gamesActive: 'active'
  });
});

games.get('/first-game', function(req, res) {
  res.render('games/first-game', {
    pageTitle: 'First Game',
    gamesActive: 'active'
  });
});

module.exports = games;
