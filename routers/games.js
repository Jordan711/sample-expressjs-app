const games = require('express').Router();

games.get('/', function(req, res) {
  res.render('games', {
    pageTitle: 'Games Menu',
    gamesActive: 'active'
  });
});

module.exports = games;
