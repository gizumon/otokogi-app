import api from '../api/index';

// export interface User {
//   _id?: String,
//   name?: String,
//   createdAt?: Number
// }

export default class CategoryService {
  /**
   * static variables
   */
  _categories = [];
  /**
   * コンストラクタ
   */
  // constructor () {
  //   CategoryService.getAll();
  // }
  /**
   * Getter / Setter
   */
  get categories () {
    return this._categories;
  }
  set categories (val) {
    this._categories = val;
  }
  /**
   * 初期化処理
   */
  static getAll () {
    return api.get('/category').then((res) => {
      this.categories = res.data;
      return res.status;
    }).catch(e => {
      console.error(`ERR: user api error: ${e}`);
      return e.status;
    });
  }
  static getCategories () {
    return this.categories;
  }
}
