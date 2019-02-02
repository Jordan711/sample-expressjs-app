var http = require('http');
const express = require('express');
const app = express();
var port = 8080;

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, () => console.log('Listening on port: ' + port));
