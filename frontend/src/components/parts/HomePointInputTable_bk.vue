<template>
  <div id="homePointInputTable">
  </div>
</template>

<script>
const Tabulator = require('tabulator-tables');

export default {
  name: 'HomePointInputTable',
  data () {
    return {
      // mountedでインスタンスを作成する
      tabulator: null,
      // テーブル1行目の見出しにあたる部分
      tableColumn: [
        {
          title: '部位',
          field: 'name',
          width: 150
        },
        {
          title: '痒みだした時期',
          field: 'from',
          align: 'center',
          width: 150
        },
        {
          title: '痒み具合',
          field: 'kayumi',
          align: 'left',
          formatter: 'star',
          formatterParams: {
            stars: 10
          }
        }
      ],
      // テーブルデータ
      tableData: [
        {id: 1, name: '肩', from: '12/15', kayumi: 4},
        {id: 2, name: '肘', from: '12/15', kayumi: 6},
        {id: 3, name: '背中', from: '12/11', kayumi: 3},
        {id: 4, name: '腰', from: '', kayumi: 0},
        {id: 5, name: '腹', from: '12/18', kayumi: 1},
        {id: 6, name: '腿', from: '12/10', kayumi: 10}
      ],
      addData: {id: null, name: null, from: null, kayumi: null}
    };
  },
  mounted () {
    // dataに用意したtabulaorにインスタンスを生成する
    this.tabulator = new Tabulator(this.$refs.table, {
      data: this.tableData,
      columns: this.tableColumn,
      // この辺はオプション
      height: 205,
      layout: 'fitColumns'
    });
  },
  methods: {
    addTabulator () {
      const obj = Object.assign({}, this.addData);
      obj.id = this.tableData.length;
      this.tableData.push(obj);
      Object.keys(this.addData).forEach(key => {
        this.addData[key] = null;
      });
    }
  },
  watch: {
    // update table if data changes
    tableData: {
      handler: function (newData) {
        this.tabulator.replaceData(newData);
      },
      deep: true
    }
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../node_modules/tabulator-tables/dist/css/tabulator.min.css';
</style>
