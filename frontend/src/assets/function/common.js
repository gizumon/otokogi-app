
export default class Common {
  constructor () {
    /**
     * 数値の3桁カンマ区切り
     * 入力値をカンマ区切りにして返却
     * @param {number} numVal カンマ区切りにしたい文字列
     * @return {string} カンマ区切りされた文字列
     */
    this.addFigure = function (numVal) {
      if (!numVal) { return '0'; }
      numVal = numVal.toString().replace(/,/g, '').trim();
      if (!/^[+|-]?(\d*)(\.\d+)?$/.test(numVal)) {
        return numVal;
      }
      var numData = numVal.split('.');
      numData[0] = Number(numData[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return numData.join('.');
    };

    /**
     * 配列の指定したkey名を任意のkey名に変更する
     * @param {Array} array 対象の配列
     * @param {string} oldKey 変更対象のkey名
     * @param {string} newKey  変更後のkey名
     * @return {array} 変更後の配列
     */
    this.converArrayKeyName = function (array, oldKey, newKey) {
      let results = [];
      array.forEach(data => {
        results.push({[newKey]: data[oldKey]});
      });
      return results;
    };
    /**
     * 文字列を指定の文字でスプリット
     * @param {string} string
     * @param {string} spliteBy
     * @return {array}
     */
    this.splitArrayBy = function (string, splitBy) {
      if (!string) { return null; }
      if (string.indexOf(splitBy) < 0) { return string; }
      return string.split(splitBy).map(val => val.trim());
    };
    /**
     * ページ送り
     * @param {string} key
     * @param {string} page
     * @return {number}
     */
    this.flipPage = function (key, page) {
      switch (key) {
        case 'first':
          page = 1;
          break;
        case 'back':
          page += -1;
          break;
        case 'next':
          page += 1;
          break;
        case 'last':
          page = Math.ceil(this.eventsData.length / this.options.recordsNum);
          break;
      }
      return page;
    };
  }
}
