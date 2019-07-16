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
  totalPoint: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User schena methods
UserSchema.static({
  getAll: function() {
    return this.find().exec().then(results => {
      return results;
    });
  },
  getById: function(id) {
    return this.findById(id).exec().then(result => {
      return result;
    });
  }
});

UserSchema.method({
  getById: function (id) {
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
  },
  deleteUserById: function (id) {
    return this.findByIdAndRemove(id, function(err){
      if(err) throw err;
   });
  },
  deleteUserByName: function (name) {
    return this.findOneAndRemove({ "name" : name }, function(err){
      if(err) throw err;
   });
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
