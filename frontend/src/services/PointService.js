import api from '../api/index';

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
   * ポイントの追加
   * @param {Object} point
   * @return {String} status
   */
  static registPoint (point) {
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
  static deletePointById (id) {
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
  static updatePoint (point) {
    return api.patch(`/point`, point).then(res => {
      console.log(res.status, `Success point update: ${point._id}`);
      return res.status;
    }).catch((err) => {
      console.error('ERR: Failed to patch specified event point information : ' + err);
      return err.status;
    });
  }
}
