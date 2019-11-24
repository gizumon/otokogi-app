const express = require('express');
const router = express.Router();
const conf = require('config');
const dbUrl = conf.db.uri.replace('${USER}',conf.db.user).replace('${PASS}',conf.db.pass);

const bodyParser = require('body-parser');
const cors = require('cors'); // corsポリシー対策
const mongoose = require('mongoose');

// Body parser
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(cors());

// Model呼びだし
const Category = require('../models/Category');

// DB設定
mongoose.connect(`${dbUrl}/otokogiApp?retryWrites=true&w=majority`, {useNewUrlParser: true});

/**
 * カテゴリ情報の全件取得
 * @request 
 * @response カテゴリ情報
 */
router.get('/', async (req, res) => {
    const result = await Category.getAll();
    return res.json(result);
});

/**
 * カテゴリ情報の登録
 * @request 
 * @response 
 */
router.post('/', function (req, res) {
  if (!req.body){
    return res.status(500).send('reqest body empty.');
  }

  console.log(req.body.name);
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

module.exports = router;
