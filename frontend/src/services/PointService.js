import api from '../api/index';
import EventService from './EventService';

// type Point = {
//   _id: String,
//   no: Number,
//   eventId: String,
//   userId: String,
//   point: Number,
//   createdAt: Date
// }

export default class PointService {
  _points;
  _eventPoints;
  // constructor () {
  //   this._points = [];
  //   this._eventPoints = [];
  // }
  get points () {
    return this._points;
  }
  set points (val) {
    this._points = val;
  }
  get eventPoints () {
    return this._eventPoints;
  }
  set eventPoints (val) {
    this._eventPoints = val;
  }
  /**
   * ポイントデータを全取得
   * @return {String} status
   */
  static getAll () {
    return api.get(`/point`).then(res => {
      this.points = res.data;
      return res.status;
    }).catch((err) => {
      console.error('ERR: Failed to get point information : ' + err);
      return err.status;
    });
  }
  /**
   * 指定したイベントにおけるポイントデータを取得
   * @param {String} userId
   * @return {String} status
   */
  static getSelectedEvent (eventId) {
    return api.get(`/point/${eventId}`).then(res => {
      this.eventPoints = res.data;
      return res.status;
    }).catch((err) => {
      console.error('ERR: Failed to get specified event point information : ' + err);
      return err.status;
    });
  }
  /**
   * 任意イベントにおけるポイントのユーザー合計を算出(eventIdを指定しない場合は全体)
   * @param {String} ?eventId
   */
  static getEventSummary (eventId) {
    return api.get(`/point/${eventId}`).then(res => {
      const results = [];
      const participants = EventService.events.find(event => event._id === eventId).participants;
      participants.forEach(participant => {
        const result = {
          userId: participant.userId,
          total: res.data.filter(data => data.userId === participant.userId)
          // eslint-disable-next-line indent
                         .reduce((prev, current) => prev.point + current.point).point
        };
        results.push(result);
      });
      console.log(results, 'summary results');
      return results;
    });
  }
  /**
   * ポイントの追加
   * @param {Object} point
   * @return {String} status
   */
  static regist (point) {
    return api.post(`/point`, point).then(res => {
      console.log(res.status, 'Success point regist');
      return res.status;
    }).catch(function (err) {
      console.error('ERR: Failed to post specified event point information : ' + err);
      return err.status;
    });
  }
  /**
   * ポイントの削除
   * @param {String} pointId
   * @return {String} status
   */
  static deleteById (id) {
    return api.delete(`/point/${id}`).then(res => {
      console.log(res.status, `Success point delete: ${id}`);
      return res.status;
    }).catch(function (err) {
      console.error('ERR: Failed to delete specified event point information : ' + err);
      return err.status;
    });
  }
  /**
   * ポイントの更新
   * @param {Object} point
   * @return {Srting} status
   */
  static update (id, point) {
    return api.patch(`/point/${id}`, point).then(res => {
      console.log(res.status, `Success point update: ${id}`);
      return res.status;
    }).catch((err) => {
      console.error('ERR: Failed to patch specified event point information : ' + err);
      return err.status;
    });
  }
}
