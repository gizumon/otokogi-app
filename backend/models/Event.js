const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// スキーマ定義
let EventSchema = new Schema({
  no: {
    type: Number,
    required: true,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    default: 0,
  },
  destinations: {
    type: Array,
  },
  dateFrom: {
    type: Date,
    require: true,
    default: Date.now,
  },
  dateTo: {
    type: Date,
    require: true,
    default: Date.now,
  },
  participants: {
    type: Array,
    require: true
  },
  winner: {
    type: String,
    default: '-',
  },
  loser: {
    type: String,
    default: '-',
  },
  totalPoint: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Event schena methods
EventSchema.static({
  /**
   * Get all event 
   */
  getAll: function() {
    return this.find().exec().then(results => {
      return results;
    });
  },
  /**
   * Get event by id
   * @param {String} id 
   */
  getById: function(id) {
    return this.findById(id).exec().then(result => {
      return result;
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
  },
  /**
   * Get max no value in 
   */
  getMaxNo: function () {
    return this.find().sort({no:-1}).limit(1).then(result => {
      return result[0] ? result[0].no : 0;
    });
  }
});

EventSchema.method({
  /**
   * Get event data by id
   * @param {Number} id 
   */
  getEventById: function (id) {
    return this.findById(id);
  },
  /**
   * Update event name by id
   * @param {Number} id 
   * @param {String} name 
   */
  updateEventName: function (id, name) {
    return this.findById(id).update({name: name});
  },
  /**
   * Delete event by id
   * @param {Number} id 
   */
  deleteEventById: function (id) {
    return this.findByIdAndRemove(id, function(err){
      if(err) throw err;
   });
  },
  /**
   * Delete event by No
   * @param {Number} no 
   */
  deleteEventByNo: function (no) {
    return this.findOneAndRemove({ "no" : no }, function(err){
      if(err) throw err;
   });
  }
});
//
// EventSchema.method('getAll', function () {
//   // this.find( function (err, result) {
//   return "getAll";
//   // });
// });
//Success
// EventSchema.methods.getAll = function () {
//   // this.find( function (err, result) {
//   return "getAll";
//   // });
// }
// EventSchema.method({
//   getAll: function () {
//       return "test";
//   }
// });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
