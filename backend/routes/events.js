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
const Event = require('../models/Event');

// DB設定
mongoose.connect('mongodb://localhost:27017/otokogiApp', {useNewUrlParser: true});

/**
 * イベント情報の全件取得
 * @request 
 * @response イベント情報
 */
router.get('/', async function (req, res) {
    let events = await Event.getAll();
    return res.json(events);
});

/**
 * 指定イベント情報の取得
 * @request 
 * @response イベント情報
 */
router.get('/:eventId', async function (req, res) {
  const events = await Event.getById(req.params.eventId);
  return res.json(events);
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

  const instance = new Event({
    no: req.body.no,
    name: req.body.name,
    destination: req.body.destination,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    participants: req.body.participants
  });

  instance.save( function (err) {
      if(!err) {
          return res.status(200).send('Event create success.');
      } else {
          return res.status(500).send('Event created faild.');
      }
  });
});

module.exports = router;
