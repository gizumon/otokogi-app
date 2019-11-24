import api from '../api/index';

// export interface User {
//   _id?: String,
//   name?: String,
//   winNum?: Number,
//   loseNum?: Number,
//   totalPoint?: Number,
//   createdAt?: Number
// }

export default class UserService {
  _users = [];
  _eventParticipants = [];
  /**
   * コンストラクタ (全ユーザーを取得)
   */
  // constructor () {
  // }
  /**
   * Getter / Setter
   */
  get users () {
    return this._users;
  }
  get eventParticipants () {
    return this._eventParticipants;
  }
  set users (val) {
    this._users = val;
  }
  set eventParticipants (val) {
    this._eventParticipants = val;
  }

  /**
   * ユーザーを全件取得
   * @return {String} http status
   */
  static getAll () {
    return api.get('/user').then(res => {
      this.users = res.data;
      return res.status;
    }).catch(e => {
      console.error(`ERR: user api error: ${e}`);
      return e.status;
    });
  }
  /**
   * Eventで初期化
   * @param {String} userId
   * @return {String} http status
   */
  static getSelectedEventParticipants (eventId) {
    const self = this;
    return api.get(`/event/${eventId}`).then(async (res) => {
      let array = [];
      for await (let participant of res.data.participants) {
        const data = await self.getUserById(participant.userId);
        array.push(data);
        self.eventParticipants = array;
      }
      return res.status;
    }).catch((e) => {
      console.error('ERR: Failed to get event information : ' + e);
      return e.status;
    });
  }
  /**
   * ユーザー名の取得
   * @param userId
   * @return {String} http status
   */
  static getUserById (userId) {
    if (this.users.length > 0) {
      return this.users.find((user) => {
        return user._id === userId;
      });
    } else {
      return api.get(`/user/${userId}`).then(res => {
        return res.data;
      }).catch(function (e) {
        console.error(`ERR: Failed to get user information : ${e}`);
        return e;
      });
    }
  }
}
