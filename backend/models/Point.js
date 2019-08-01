const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// スキーマ定義
let PointSchema = new Schema({
  no: {
    type: Number,
    unique: true,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  point: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User schena methods
// INFO: インスタンスを生成せずに呼び出す可能性がある場合、Staticメソッドとしている。
PointSchema.static({
  /**
   * Get all data from otokogi points
   */
  getAll: function() {
    return this.find().exec().then(results => {
      return results;
    });
  },
  /**
   * Get data from otokogi point by specified eventId
   * @param {String} eventId 
   */
  getByEventId: function (eventId) {
    return this.find({eventId: eventId}).exec().then(results => {
      return results;
    });
  },
  /**
   * Get max no value in 
   */
  getMaxNo: function () {
    return this.find().sort({no:-1}).limit(1).then(result => {
      return result[0].no;
    });
  },
  /**
   * Update otokogi point object
   * @param {String} id
   * @param {Object} updateData 
   */
  updateById: function (id, updateData) {
    return this.findById(id).update(updateData);
  },
  deleteById: function(id) {
    return this.findByIdAndRemove(id, function(err){
      if(err) throw err;
    });
  }
});

// INFO: インスタンスを生成して呼び出すと思われるもの。
PointSchema.method({
  getPointById: function (id) {
    return this.findById(id);
  },
  /**
   * Delete otokogi point by id
   * @param {Number} id 
   */
  deletePointById: function (id) {
    return this.findByIdAndRemove(id, function(err){
      if(err) throw err;
   });
  },
  /**
   * Delete otokogi point by No
   * @param {Number} no 
   */
  deleteOPoiintByNo: function (no) {
    return this.findOneAndRemove({ "no" : no }, function(err){
      if(err) throw err;
   });
  }
});

const Category = mongoose.model('Point', PointSchema);

module.exports = Category;
