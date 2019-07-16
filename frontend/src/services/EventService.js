import api from '../api/index';

// export interface User {
//   _id?: String,
//   no?: Number,
//   name?: String,
//   destination: String[],
//   dateFrom: Date,
//   dateTo: Date,
//   paticipants: Object[]
//   winner?: String,
//   loser?: String,
//   totalPoint?: Number,
//   createdAt?: Date,
// }

export default class UserService {
  eventId = '';
  events = [];
  selectedEvent = {};

  /**
   * 全ユーザーを取得
   */
  constructor () {
    const self = this;
    /**
     * 初期化処理
     */
    this.getAllEvent = async function () {
      await api.get('/event').then((response) => {
        self.events = response.data;
        console.log(self.events, 'users');
      }).catch(e => {
        console.error(`ERR: user api error: ${e}`);
      });
      /**
     * イベントIDを設定
     */
      this.setSelectedEventId = function (eventId) {
        self.selectedEventId = eventId;
      };
      /**
     * Eventで初期化
     * @param {String} eventId
     */
      this.getSelectedEvent = async function (eventId) {
        await api.get(`/event/${eventId}`).then(async (response) => {
          self.selectedEvent = response.data;
        }).catch((error) => {
          console.error('ERR: Failed to get event information : ' + error);
        });
      };
      /**
     * ユーザー名の取得
     * @param userId
     */
      this.getEventParticipants = async function (eventId) {
        if (!self.selectedEvents) {
          await self.initSelectedEvent(eventId);
        }
        return self.selectedEvent.participants;
      };
    };
  }
}
