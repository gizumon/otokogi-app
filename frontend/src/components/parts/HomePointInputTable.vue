<template>
  <div id="homePointInputTable">
    <h3 class='vue-title'>{{selectedEvent.name}}</h3>
    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
import PointService from '../../services/PointService';
import UserService from '../../services/UserService';

export default {
  name: 'HomePointInputTable',
  data: function () {
    return {
      selectedEvent: {_id: '5d2d3c5538658b33d82633fb'},
      participants: [],
      columns: ['no'],
      tableData: [],
      options: {
        headings: {
          no: 'No.'
        },
        sortable: [
          'yes'
        ],
        texts: {
          filterPlaceholder: '検索する'
        }
      }
    };
  },
  async mounted () {
    const self = this;

    // サービス生成
    const userService = new UserService();
    const pointService = new PointService();

    // 各サービスを初期化
    await userService.initEventParticipants(self.selectedEvent._id);
    await pointService.initEventPoints(self.selectedEvent._id);

    // イベント情報を取得
    const participants = userService.eventParticipants;
    const points = pointService.eventPoints;

    for (let participant of participants) {
      // ヘッダーの作成
      // self.options.headings[participant._id] = participant.name;
      self.$set(self.options.headings, participant._id, participant.name);
      // カラム作成
      self.columns.push(participant._id);
      console.log(self.options.headings, 'self.options.headings');
      console.log(self.columns, 'self.columns');
    }

    // テーブルデータの作成
    let no = 0;
    for (let point of points) {
      no += 1;
      const data = await self.formatTableData();
      data['no'] = no;
      data[point.userId] = point.point;
      self.tableData.push(data);
    }
  },
  methods: {
    formatTableData () {
      let dataFormat = {};
      console.log(this.columns);
      for (let column of this.columns) {
        dataFormat[column] = 0;
      }
      console.log(dataFormat, 'data format');
      return dataFormat;
    }
  },
  watch: {
    // update table if data changes
    // tableData: {
    //   handler: function (newData) {
    //     this.tabulator.replaceData(newData);
    //   },
    //   deep: true
    // }
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
