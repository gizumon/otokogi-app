
export default class Common {
  constructor () {
    /**
     * 数値の3桁カンマ区切り
     * 入力値をカンマ区切りにして返却
     * [引数]   numVal: 入力数値
     * [返却値] String(): カンマ区切りされた文字列
     */
    this.addFigure = function (numVal) {
      if (!numVal) {
        return '';
      }
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
     * [引数]   array: 対象の配列, oldKey: 変更対象のkey名, newKey: 変更後のkey名
     * [返却値] Array(): 変更後の配列
     */
    this.converArrayKeyName = function (array, oldKey, newKey) {
      let results = [];
      array.forEach(data => {
        results.push({[newKey]: data[oldKey]});
      });
      return results;
    };
    this.splitArrayBy = function (string, splitBy) {
      if (!string) { return null; }
      if (string.indexOf(splitBy) < 0) { return string; }
      return string.split(splitBy).map(val => val.trim());
    };
  }
}
