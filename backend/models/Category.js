const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// スキーマ定義
let CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
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
  getAll: function() {
    return this.find().exec().then(results => {
      return results;
    });
  },
  deleteById: function(id) {
    return this.findByIdAndRemove(id, function(err){
      if(err) throw err;
    });
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
   * Delete category by id
   * @param {Number} id 
   */
  deleteCategoryById: function (id) {
    return this.findByIdAndRemove(id, function(err){
      if(err) throw err;
   });
  },
  /**
   * Delete category by name
   * @param {Number} no 
   */
  deleteCategoryByNo: function (name) {
    return this.findOneAndRemove({ "name" : name }, function(err){
      if(err) throw err;
   });
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
