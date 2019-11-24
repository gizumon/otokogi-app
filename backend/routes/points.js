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
const Point = require('../models/Point');

const validation = [
  check('eventId', 'eventId is required and must be String').isString().exists(),
  check('userId', 'userId is required and must be String').isString().exists(),
  check('point', 'point is required and must be Number').matches(/\d+/).exists(),
  check('categoryId', 'categoryId is required and must be String').isString().exists()
];

// const validationUpdate = [
//   check('eventId', 'eventId must be String').isString(),
//   check('userId', 'userId must be String').isString(),
//   check('point', 'point must be Number').matches(/\d+/),
//   check('category', 'category must be String').isString()
// ];

// DB設定
mongoose.connect(`${dbUrl}/otokogiApp?retryWrites=true&w=majority`, {useNewUrlParser: true});

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
router.post('/', validation, async function (req, res) {
  console.log('post in');
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const maxNo = await Point.getMaxNo();
  // console.log(maxNo, 'maxNo');
  const instance = new Point({
    no: maxNo + 1,
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

router.delete('/:pointId', async function (req, res) {
  Point.deleteById(req.params.pointId).then(result => {
    console.log(result, 'delete');
    return res.status(200).json(result);
  }).catch(e => {
    return res.status(500).json(e);
  });
});

router.patch('/:pointId', validation, async function (req, res) {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return Point.updateById(pointId, req.body).then(result=> {
    console.log(result, 'patch');
    return res.status(200).json(result);
  }).catch(e => {
    return res.status(500).json(e);
  });
});

module.exports = router;
