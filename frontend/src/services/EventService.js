import api from '../api/index';

// import UserService from './UserService';
import PointService from './PointService';

// export interface User {
//   _id?: String,
//   no?: Number,
//   name?: String,
//   destinations: String[],
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
   * イベント情報取得処理(サービスに情報を格納)
   * @return {Srting} status
   */
  static getAll () {
    return api.get('/event').then((res) => {
      this.events = res.data;
      return res.status;
    }).catch(e => {
      console.error(`ERR: event api GET all error: ${e}`);
      return e.status;
    });
  }
  /**
   * イベントの最大値を取得
   * @return {maxNo: Number}
   */
  static getMaxNo () {
    return api.get('/event/maxNo').then(res => {
      return res.data;
    }).catch(e => {
      console.error(`ERR: event api GET max no error: ${e}`);
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
  /**
   * イベントの登録
   * @param {Object} event
   * @return {String} status
   */
  static regist (data) {
    return api.post(`/event`, data).then(res => {
      console.log(res.status, 'Success event regist');
      return res.status;
    }).catch(err => {
      console.error('ERR: Failed to POST event information : ' + err);
      return err.status;
    });
  }
  /**
   * ポイントの削除
   * @param {String} eventId
   * @return {String} status
   */
  static deleteById (id) {
    return api.delete(`/event/${id}`).then(res => {
      console.log(res.status, `Success event delete: ${id}`);
      return res.status;
    }).catch(err => {
      console.error('ERR: Failed to DELETE specified event information : ' + err);
      return err.status;
    });
  }
  /**
   * イベントの更新
   * @param {Object} data
   * @return {Srting} status
   */
  static update (id, data) {
    return api.patch(`/event/${id}`, data).then(res => {
      console.log(res.status, `Success event update: ${id}`);
      return res.status;
    }).catch((err) => {
      console.error('ERR: Failed to PATCH specified event information : ' + err);
      return err.status;
    });
  }
  /**
   * イベントサマリーの更新
   * TotalP, Winner, loserも更新
   * @param {String} eventId
   * @return {String} status
   */
  static async updateSummary (eventId) {
    const summaries = await PointService.getEventSummary(eventId);
    // const total = summaries.reduce((prev, current) => prev.total + current.total);
    // const winner = summaries.reduce((prev, current) => prev.total > current.total ? prev : current).userId;
    // const loser = summaries.reduce((prev, current) => prev.total < current.total ? prev : current).userId;
    if (!summaries) { console.error('ERR: Failed to GET event summaries'); return false; }
    const req = {
      totalPoint: summaries.reduce((prev, current) => prev.total + current.total).total,
      winner: summaries.reduce((prev, current) => prev.total > current.total ? prev : current).userId,
      loser: summaries.reduce((prev, current) => prev.total < current.total ? prev : current).userId
    };
    console.log(req, 'update val');
    return this.update(eventId, req);
  }
}
