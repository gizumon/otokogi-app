<template>
  <div id="homePointInputTable">
    <h3 class="table-title">Otokogi point</h3>
    <v-client-table :data="tableData" :columns="columns" :options="options" ></v-client-table>
  </div>
</template>

<script>
export default {
  name: 'HomePointInputTable',
  props: {
    participants: {type: Array, require: true},
    points: {type: Array, require: true}
  },
  data: function () {
    return {
      participantsData: this.participants,
      pointsData: this.points,
      columns: ['no'],
      tableData: [],
      options: {
        headings: {
          no: 'No.'
        },
        sortable: true,
        filterable: false
      }
    };
  },
  mounted () {
  },
  methods: {
    prepareColumns: function () {
      this.columns.length = 0;
      this.columns.push('no');
      this.options.headings.length = 0;
      this.options.headings['no'] = 'No.';
      console.log(this.participantsData, 'participants in prepareColumns');
      for (let participant of this.participantsData) {
        console.log(participant, 'in the loop');
        // カラム作成
        this.columns.push(participant._id);
        // ヘッダー作成
        this.$set(this.options.headings, participant._id, participant.name);
        console.log(this.columns, 'set column');
      }
      console.log('end of prepareColumn');
    },
    prepareTableData: async function () {
      this.tableData.length = 0;
      let no = 0;
      for (let point of this.pointsData) {
        no += 1;
        let data = await this.formatTableData();
        data['no'] = no;
        data[point.userId] = point.point;
        console.log(data, 'pushed data');
        this.tableData.push(data);
      }
      console.log('end of prepareTableData');
    },
    formatTableData: function () {
      let dataFormat = {};
      for (let column of this.columns) {
        console.log(column, 'column');
        dataFormat[column] = 0;
      }
      console.log(dataFormat, 'dataFormat');
      return dataFormat;
    }
  },
  watch: {
    // participantsData: async function () {
    //   await this.prepareColumns();
    // },
    pointsData: async function () {
      console.log(this.participantsData, 'participants');
      console.log(this.pointsData, 'points');
      await this.prepareColumns();
      await this.prepareTableData();
      // this.$forceUpdate();
    }
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
