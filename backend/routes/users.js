const express = require('express');
const router = express.Router();
const conf = require('config');
const dbUrl = conf.db.uri.replace('${USER}',conf.db.user).replace('${PASS}',conf.db.pass);
console.log(dbUrl);

const bodyParser = require('body-parser');
const cors = require('cors'); // corsポリシー対策
const mongoose = require('mongoose');

// Body parser
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(cors());

// Model呼びだし
const User = require('../models/User');

// DB設定
mongoose.connect(`${dbUrl}/otokogiApp?retryWrites=true&w=majority`, {useNewUrlParser: true});

/**
 * ユーザー情報の全件取得
 * @request 
 * @response ユーザー情報
 */
router.get('/', async function (req, res) {
  const users = await User.getAll();
  console.log(users);
  return res.json(users);
});

/**
 * ユーザーリスト情報の全件取得
 * @request {Array} ボディ
 * @response ユーザー情報
 */
router.get('/:userId', async function (req, res) {
  const result = await User.getById(req.params.userId);
  return res.json(result);
});

// /**
//  * ユーザーリスト情報の全件取得
//  * @request {Array} ボディ
//  * @response ユーザー情報
//  */
// router.post('/list', async function (req, res) {
//   const result = [];
//   for (user in req.body.data) {
//     const id = user.id;
//     const name = await User.getById(user.id);
//     result.push({id: id, name: name});
//   }
//   return res.json(result);
// });

/**
 * ユーザー情報の登録
 * @request 
 * @response 
 */
router.post('/', function (req, res) {
  if (!req.body){
      return res.status(500).send('reqest body empty.');
  }

  const instance = new User({
    name: req.body.name,
    winNum: req.body.winNum,
    loseNum: req.body.loseNum
  });

  instance.save( function (err) {
      if(!err) {
          return res.status(200).send('User create success.');
      } else {
          return res.status(500).send('User create faild.');
      }
  });
});

module.exports = router;
