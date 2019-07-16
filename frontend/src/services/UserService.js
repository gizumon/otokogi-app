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
  users = [];
  eventParticipants = [];

  /**
   * コンストラクタ (全ユーザーを取得)
   */
  constructor () {
    const self = this;
    /**
     * 初期化処理
     */
    this.init = async function () {
      await api.get('/user').then((response) => {
        self.users = response.data;
        console.log(self.users, 'users');
      }).catch(e => {
        console.error(`ERR: user api error: ${e}`);
      });
    };
    /**
     * Eventで初期化
     * @param {String} userId
     */
    this.initEventParticipants = async function (eventId) {
      console.log(`initEventParticipants method is kicked with eventId: ${eventId}`);
      await api.get(`/event/${eventId}`).then(async (response) => {
        console.log(response, 'response');
        const participants = response.data.participants;
        for await (let participant of participants) {
          const data = await self.getUserById(participant.userId);
          self.eventParticipants.push(data);
        }
        console.log(self.eventParticipants, 'participants');
      }).catch((error) => {
        console.error('ERR: Failed to get event information : ' + error);
      });
    };
    /**
     * ユーザー名の取得
     * @param userId
     */
    this.getUserById = async function (userId) {
      let user;
      await api.get(`/user/${userId}`).then(response => {
        user = response.data;
      }).catch(function (e) {
        console.error(`ERR: Failed to get user information : ${e}`);
      });
      return user;
    };
  }
}
