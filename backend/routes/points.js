const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const cors = require('cors'); // corsポリシー対策
const mongoose = require('mongoose');

// Body parser
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(cors());

// Model呼びだし
const Point = require('../models/Point');

// DB設定
mongoose.connect('mongodb://localhost:27017/otokogiApp', {useNewUrlParser: true});

/**
 * 指定したイベントIDの漢気ポイント情報の全取得
 * @request
 * @response イベント情報
 */
router.get('/:eventId', async function (req, res) {
  const eventId = req.params.eventId;
  const points = await Point.getByEventId(eventId);
  return res.json(points);
});
  
/**
 * イベント情報の登録
 * @request 登録情報
 * @response 
 */
router.post('/', function (req, res) {
  if (!req.body){
    return res.status(500).send('reqest body empty.');
  }

  const instance = new Point({
    no: req.body.no,
    eventId: req.body.eventId,
    userId: req.body.userId,
    point: req.body.point
  });

  instance.save( function (err) {
      if(!err) {
          return res.status(200).send('Point create success.');
      } else {
          return res.status(500).send('Point created faild.');
      }
  });
});

module.exports = router;
