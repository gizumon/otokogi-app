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
  destination: {
    type: Array,
    require: true,
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
  winner: {
    type: Number,
    default: 0,
  },
  loser: {
    type: Number,
    default: 0,
  },
  TotalPoint: {
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
  getAll: function () {
    this.find().exec( (err, events) => {
      if (err) return handleError(err);
      return this.result = events;
    });    
    return this.result;
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
