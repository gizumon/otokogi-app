const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// スキーマ定義
let CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User schena methods
// INFO: インスタンスを生成せずに呼び出す可能性がある場合、Staticメソッドとしている。
CategorySchema.static({
  getAll: function () {
    this.find().exec( (err, categories) => {
      if (err) return handleError(err);
      return this.result = categories;
    });
    return this.result;
  }
});

// INFO: インスタンスを生成して呼び出すと思われるもの。
CategorySchema.method({
  getCategoryById: function (id) {
    return this.findById(id);
  },
  updateCategory: function (id, newName) {
    return this.findById(id).update({name: newName});
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
  deleteEventByNo: function (name) {
    return this.findOneAndRemove({ "name" : name }, function(err){
      if(err) throw err;
   });
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
