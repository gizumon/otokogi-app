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

export default class EventService {
  /**
   * static variables
   */
  _eventId = '';
  _events = [];
  _selectedEvent = {};
  /**
   * 全ユーザーを取得
   */
  // constructor () {
  // }
  get eventId () {
    return this._eventId;
  }
  get events () {
    return this._events;
  }
  get selectedEvent () {
    return this._selectedEvent;
  }
  set eventId (val) {
    this._eventId = val;
  }
  set events (val) {
    this._events = val;
  }
  set selectedEvent (val) {
    this._selectedEvent = val;
  }
  /**
   * 初期化処理
   * @return {Srting} status
   */
  static getAll () {
    return api.get('/event').then((res) => {
      this.events = res.data;
      return res.status;
    }).catch(e => {
      console.error(`ERR: user api error: ${e}`);
      return e.status;
    });
  }
  /**
   * Eventで初期化
   * @param {String} eventId
   * @return {String} status
   */
  static getSelectedEvent (eventId) {
    return api.get(`/event/${eventId}`).then((res) => {
      this.selectedEvent = res.data;
      return res.status;
    }).catch((e) => {
      console.error('ERR: Failed to get event information : ' + e);
      return e.status;
    });
  }
  /**
   * ユーザー名の取得
   * @param eventId
   * @return {Array} participants
   */
  static getEventParticipants (eventId) {
    if (!this.selectedEvents) {
      this.getSelectedEvent(eventId);
    }
    return this.selectedEvent.participants;
  }
}
