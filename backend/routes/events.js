const express = require('express');
const router = express.Router();
const conf = require('config');
const dbUrl = conf.db.uri.replace('${USER}',conf.db.user).replace('${PASS}',conf.db.pass);

const bodyParser = require('body-parser');
const cors = require('cors'); // corsポリシー対策
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

// Body parser
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(cors());

// Model呼びだし
const Event = require('../models/Event');

const validation = [
  check('name', 'name is required and must be String').isString().exists(),
  check('dateFrom', 'dateFrom is required and must be Date format').matches(/\d{4}-\d{2}-d{2}.*/).exists(),
  check('dateTo', 'dateTo is required and must be Date format').matches(/\d{4}-\d{2}-\d{2}.*/).exists(),
  check('destinations.*', 'destination is must be String').isString(),
  check('participants.*.userId', 'participants.*.userId is required and must be String').isString().exists(),
  check('no', 'no is required and must be Number').matches(/\d+/).custom((no) => {
    return Event.findOne({no: no}).then(event => {
      if(event) {
        return Promise.reject('no is duplicated');
      }
      return Promise.resolve(no);
    });
  })
];

// DB設定
mongoose.connect(`${dbUrl}/otokogiApp?retryWrites=true&w=majority`, {useNewUrlParser: true});

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
 * 最大Noの取得
 * @response {maxNo: Number}
 */
router.get('/maxNo', async function (req, res) {
  const maxNo = await Event.getMaxNo();
  return res.json({'maxNo': maxNo});
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
    return res.status(422).send('reqest body empty.');
  }

  const instance = new Event({
    no: req.body.no,
    name: req.body.name,
    destinations: req.body.destinations,
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

router.patch('/:eventId', validation, async function (req, res) {
  // console.log(req.params.eventId, 'event id')
  // console.log(req.body, 'req.body')
  const errors = validationResult(req.body);
  if (!req.params.eventId || !errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Event.updateById(req.params.eventId, req.body).then(result => {
    console.log(result, 'patch');
    return res.status(200).json(result);
  }).catch(e => {
    console.log(result, 'patch');
    return res.status(500).json(e);
  });
});

router.delete('/:eventId', async function (req, res) {
  const result = await Event.deleteById(req.params.eventId);
  return res.json(result);
});
module.exports = router;
