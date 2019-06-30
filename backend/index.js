const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // corsポリシー対策
const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Event = require('./models/Event');

const app = express();

// HTTP設定
const port = 3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// DB設定
mongoose.connect('mongodb://localhost/user', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/category', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/event', {useNewUrlParser: true});

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
  let users = User.getAll();
  return res.json(users);
});

/**
 * ユーザー情報の登録
 * @request 
 * @response 
 */
app.post('/api/v1/user', function (req, res) {
  if (!req.body){
      return res.status(500).send('reqest body empty.');
  }

  const instance = new User({
    name: req.body.name
  });

  instance.save( function (err) {
      if(!err) {
          return res.status(200).send('User create success.');
      } else {
          return res.status(500).send('User create faild.');
      }
  });
});

/**
 * カテゴリ情報の全件取得
 * @request 
 * @response カテゴリ情報
 */
app.get('/api/v1/category', function (req, res) {
  let categories = Category.getAll();
  return res.json(categories);
});

/**
 * カテゴリ情報の登録
 * @request 
 * @response 
 */
app.post('/api/v1/category', function (req, res) {
  if (!req.body){
    return res.status(500).send('reqest body empty.');
  }

  const instance = new Category({
    name: req.body.name
  });

  instance.save( function (err) {
      if(!err) {
          return res.status(200).send('Category create success.');
      } else {
          return res.status(500).send('Category create faild.');
      }
  });
});

/**
 * イベント情報の全件取得
 * @request 
 * @response イベント情報
 */
app.get('/api/v1/event', function (req, res) {
  let events = Event.getAll();
  return res.json(events);
});

/**
 * イベント情報の登録
 * @request 登録情報
 * @response 
 */
app.post('/api/v1/event', function (req, res) {
  if (!req.body){
    return res.status(500).send('reqest body empty.');
  }

  const instance = new Event({
    no: req.body.no,
    name: req.body.name,
    destination: req.body.destination,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
  });

  instance.save( function (err) {
      if(!err) {
          return res.status(200).send('Event create success.');
      } else {
          return res.status(500).send('Event created faild.');
      }
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
