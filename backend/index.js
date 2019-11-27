const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // corsポリシー対策
const mongoose = require('mongoose');
const conf = require('config');

const app = express();

// Load routes
const users = require('./routes/users');
const events = require('./routes/events');
const categories = require('./routes/categories');
const points = require('./routes/points');

// HTTP設定
const port = process.env.PORT || conf.api.port;

app.post('/test', function (req, res) {
  res.send({
    message: req.body.text
  });
});

// Use routes
// app.use(allowCrossDomain);
app.use('/api/v1/user', users);
app.use('/api/v1/event', events);
app.use('/api/v1/category', categories);
app.use('/api/v1/point', points);

process.on('SIGINT', function() {
  console.log("Disconnected...");
  mongoose.disconnect();
});

console.log(conf.env);
app.listen(port, () => console.log(`Listening on port ${port}`));
