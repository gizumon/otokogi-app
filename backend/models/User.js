const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// スキーマ定義
let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  winNum: {
    type: Number,
    default: 0
  },
  loseNum: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// User schena methods
UserSchema.static({
  getAll: function () {
    this.find().exec( (err, users) => {
      if (err) return handleError(err);
      return this.result = users;
    });    
    return this.result;
  }
});

UserSchema.method({
  getUserById: function (id) {
    return this.findById(id);
  },
  updateUserName: function (id, name) {
    return this.findById(id).update({name: name});
  },
  // Update the number of win
  updateWinNum: function (id) {
    const updateVal = this.findById(id).winNum + 1;
    return this.findById(id).update({winNum: updateVal});
  },
  // Update the number of lose
  updateLoseNum: function (id) {
    const updateVal = this.findById(id).loseNum + 1;
    return this.findById(id).update({loseNum: updateVal});
  }
});
//
// UserSchema.method('getAll', function () {
//   // this.find( function (err, result) {
//   return "getAll";
//   // });
// });
//Success
// UserSchema.methods.getAll = function () {
//   // this.find( function (err, result) {
//   return "getAll";
//   // });
// }
// UserSchema.method({
//   getAll: function () {
//       return "test";
//   }
// });

const User = mongoose.model('User', UserSchema);

module.exports = User;
