const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // corsポリシー対策
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

// HTTP設定
const port = 3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// DB設定
mongoose.connect('mongodb://localhost/user');

app.use(bodyParser.json());
app.use(cors());

app.post('/test', function (req, res) {
  res.send({
    message: req.body.text
  });
});

/**
 * ユーザー情報の全件取得
 * @request
 * @response ユーザー情報
 */
app.get('/api/v1/user', function (req, res) {
  let user = User.getAll();
  return res.json(user);
});

app.post('/api/v1/user', function (req, res) {
  if (!req.body){
      return res.status(500).send('reqest body empty.');
  }

  // Requestを格納
  const instance = new User({
    name: req.body.name
  });

  // MongoDBに保存
  instance.save( function (err) {
      if(!err) {
          return res.status(200).send('user create success.');
      } else {
          return res.status(500).send('user create faild.');
      }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
