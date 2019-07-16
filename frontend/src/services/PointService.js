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
    this.init = async function () {
      await api.get(`/point`).then(async response => {
        self.points = response.data;
      }).catch(function (error) {
        console.error('ERR: Failed to get point information : ' + error);
      });
    };
    /**
     * 指定したイベントにおけるポイントデータを取得
     * @param {String} userId
     */
    this.initEventPoints = async function (eventId) {
      await api.get(`/point/${eventId}`).then(async response => {
        self.eventPoints = response.data;
      }).catch(function (error) {
        console.error('ERR: Failed to get specified event point information : ' + error);
      });
    };
  }
}
