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
  points;
  eventPoints;

  constructor () {
    const self = this;
    /**
     * ポイントデータを全取得
     */
    this.getAll = function () {
      return api.get(`/point`).then(response => {
        self.points = response.data;
        return response.data;
      }).catch((err) => {
        console.error('ERR: Failed to get point information : ' + err);
        return err.status;
      });
    };
    /**
     * 指定したイベントにおけるポイントデータを取得
     * @param {String} userId
     */
    this.getSelectedEvent = function (eventId) {
      return api.get(`/point/${eventId}`).then(res => {
        self.eventPoints = res.data;
        return res.status;
      }).catch((err) => {
        console.error('ERR: Failed to get specified event point information : ' + err);
        return err.status;
      });
    };
    /**
     * ポイントの追加
     * @param {Object} point
     */
    this.registPoint = function (point) {
      return api.post(`/point`, point).then(async res => {
        console.log(res.status, 'Success point regist');
        return res.status;
      }).catch(function (err) {
        console.error('ERR: Failed to post specified event point information : ' + err);
        return err.status;
      });
    };
    /**
     * ポイントの削除
     * @param {String} pointId
     */
    this.deletePointById = function (id) {
      return api.delete(`/point/${id}`).then(res => {
        console.log(res.status, `Success point regist: ${id}`);
        return res.status;
      }).catch(function (err) {
        console.error('ERR: Failed to post specified event point information : ' + err);
        return err.status;
      });
    };
  }
}
