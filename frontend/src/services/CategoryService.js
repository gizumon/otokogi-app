import api from '../api/index';

// export interface User {
//   _id?: String,
//   name?: String,
//   createdAt?: Number
// }

export default class UserService {
  categories = [];

  /**
   * コンストラクタ (全ユーザーを取得)
   */
  constructor () {
    const self = this;
    /**
     * 初期化処理
     */
    this.getAll = async function () {
      await api.get('/category').then((response) => {
        self.categories = response.data;
      }).catch(e => {
        console.error(`ERR: user api error: ${e}`);
      });
    };
  }
}
