
export default class Common {
  constructor () {
    /**
     * 数値の3桁カンマ区切り
     * 入力値をカンマ区切りにして返却
     * [引数]   numVal: 入力数値
     * [返却値] String(): カンマ区切りされた文字列
     */
    this.addFigure = function (numVal) {
      if (numVal === '') {
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
  }
}
