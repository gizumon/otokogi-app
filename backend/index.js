const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // corsポリシー対策
const mongoose = require('mongoose');

const app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

// Load routes
const users = require('./routes/users');
const events = require('./routes/events');
const categories = require('./routes/categories');
const points = require('./routes/points');

// HTTP設定
const port = 3000;

app.post('/test', function (req, res) {
  res.send({
    message: req.body.text
  });
});

// Use routes
app.use(allowCrossDomain);
app.use('/api/v1/user', users);
app.use('/api/v1/event', events);
app.use('/api/v1/category', categories);
app.use('/api/v1/point', points);

process.on('SIGINT', function() {
  console.log("Disconnected...");
  mongoose.disconnect();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
