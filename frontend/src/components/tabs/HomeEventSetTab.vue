<template>
  <div id="home-point-input">
    <h3 class="table-title">Event setting&nbsp;&nbsp;<font-awesome-icon icon="calendar" /></h3>
    <div class="card m-3">
      <div class="card-header">
        <div class="row">
          <div class="col-12">
            <div class="input-group">
                <div class="input-group-prepend" id="button-addon3">
                  <div class="input-group-text"><font-awesome-icon icon="plane" /></div>
                </div>
                <input type="text" class="form-control" placeholder="Pleasae input event title..." v-model="name">
              </div>
            </div>
        </div>
      </div>
      <div class="card-body">
        <form>
          <div class="row">
            <div class="col-6 my-1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text"><div class="text-icon">No</div></div>
                </div>
                <input readonly type="text" class="form-control" placeholder="1, 2, 3, ... etc. " v-model="no">
              </div>
            </div>
            <div class="col-6 my-1">
              <button type="button" class="btn btn-primary float-right col-4" @click="addRecord()">
                <font-awesome-icon icon="plus" />
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-12 my-1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text"><font-awesome-icon icon="calendar" /></div>
                </div>
                <input type="date" class="form-control sm-text" aria-label="from" v-model="dateFrom">
                <input type="date" class="form-control sm-text" aria-label="to" v-model="dateTo">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-6 my-1">
              <div class="input-group">
                <div class="input-group-prepend" id="button-addon3">
                  <div class="input-group-text"><font-awesome-icon icon="globe-asia" /></div>
                </div>
                <input type="text" class="form-control" placeholder="Pleasae input destinations with separated by [,] ..." v-model="destinations">
              </div>
            </div>
            <div class="col-12 col-sm-6 my-1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text"><font-awesome-icon icon="users" /></div>
                </div>
                <base-inline-check-btn :options="users" :selected="selected" @update="onSelectedUsers"/>
                <!-- <base-inline-check-btn :options="users" :selected="selected" /> -->
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <home-event-table v-if="events.length > 0" :events="events" @isEdited="onUpdated()" />
    <div v-else class="message">No data</div>
  </div>
</template>

<script>
import EventService from '../../services/EventService';
import UserService from '../../services/UserService';
import Modal from '../../services/function/modal';
import Common from '../../assets/function/common';
import moment from 'moment';

import HomeEventTable from '../parts/HomeEventTable';
import BaseInlineCheckBtn from '../parts/BaseInlineCheckBtn';

const common = new Common();

export default {
  name: 'EventSetTab',
  data: function () {
    return {
      events: [],
      users: [],
      selected: [],
      name: '',
      today: null,
      no: null,
      dateFrom: null,
      dateTo: null,
      destinations: ''
    };
  },
  components: {
    'base-inline-check-btn': BaseInlineCheckBtn,
    'home-event-table': HomeEventTable
  },
  async created () {
    let today = new Date();
    this.today = moment(today).format('YYYY-MM-DD');
    console.log(this.today);
    this.dateFrom = this.today;
    this.dateTo = this.today;

    const res = await EventService.getMaxNo();
    this.no = res.maxNo + 1;

    // ユーザー情報取得
    await UserService.getAll();
    await this.setArrayData(this.users, UserService.users);
    await this.setParticipantsArray(this.selected, UserService.users);
    console.log(this.users, 'this users');
    console.log(this.selected, 'this selected users');

    // イベント情報取得
    // await EventService.getAll();
    await this.setArrayData(this.events, EventService.events);
    console.log(this.events, 'events list');
    // this.$forceUpdate();
  },
  methods: {
    addRecord: async function () {
      if (!(this.name && this.no && this.dateFrom && this.dateTo && this.selected.length > 0)) {
        Modal.alert('Please fill out all input');
        return false;
      }

      const event = {
        no: this.no,
        name: this.name.trim(),
        destinations: common.splitArrayBy(this.destinations, ','),
        participants: common.converArrayKeyName(this.selected, '_id', 'userId'),
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        winner: '-',
        loser: '-',
        totalPoint: 0
      };
      const status = await EventService.regist(event);
      if (status >= 200 && status <= 299) {
        Modal.alert('Success!');
        this.name = '';
        this.destinations = '';
        this.dateFrom = this.today;
        this.dateTo = this.today;
        this.setParticipantsArray(this.selected, UserService.users);
        this.onUpdated();
      } else {
        Modal.alert('Failed...');
      }
    },
    onSelectedUsers: function (vals) {
      console.log(vals, 'on selected');
      console.log(this.selected, 'beforeUpdate');
      // this.setParticipantsArray(this.selected, vals);
    },
    onUpdated: async function () {
      await EventService.getAll();
      await this.setArrayData(this.events, EventService.events);
      const res = await EventService.getMaxNo();
      this.no = res.maxNo + 1;
    },
    setArrayData: function (target, array) {
      // targetの初期化
      target.length = 0;
      if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
          this.$set(target, i, array[i]);
        }
      } else {
        this.$forceUpdate();
      }
    },
    setParticipantsArray: function (target, array) {
      // targetの初期化
      target.length = 0;
      if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
          target.push({'_id': array[i]['_id']});
        }
      } else {
        this.$forceUpdate();
      }
    }
    // converArrayKeyName (array, oldKey, newKey) {
    //   let results = [];
    //   array.forEach(data => {
    //     results.push({[newKey]: data[oldKey]});
    //   });
    //   return results;
    // }
  }
  // },
  // methods: {
  //   // openModal: function () {
  //   //   this.showModal = true;
  //   // },
  //   // closeModal: function () {
  //   //   this.showModal = false;
  //   // }
  //   // DB参照 選択されたイベントの漢気ポイント一覧を表示
  //   // async get ()
  // }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.input-group {
  .input-group-text {
    width: 40px;
    text-align: center;
    .text-icon {
      font-size: 0.75rem;
      font-weight: bold;
    }
  }
  .sm-text {
    font-size: 0.9rem;
    letter-spacing: -1px;
  }
}
.flip-horizontal {
    transform: scale(-1, 1);
}
</style>
