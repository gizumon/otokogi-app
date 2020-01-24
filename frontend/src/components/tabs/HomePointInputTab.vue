<template>
  <div id="home-point-input">
    <h3 class="table-title">Otokogi point&nbsp;&nbsp;<font-awesome-icon icon="edit" /></h3>
    <div class="card m-3">
      <div class="card-header">
        <label class="sr-only" for="otokogiPoint">event</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text"><font-awesome-icon icon="calendar-check" /></div>
          </div>
          <base-select name="event" :options="events" :selected="selectedEvent" @input="onUpdateSelectedEvent" />
        </div>
      </div>
      <div class="card-body">
        <form>
          <div class="form-row align-items-center">
          <div class="col-6 my-1">
            <label class="sr-only" for="otokogiPoint">participant</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text"><font-awesome-icon icon="user-alt" /></div>
              </div>
              <base-select name="participant" :options="eventParticipants" :selected=null @input="onUpdateSelectedParticipant" />            </div>
          </div>
          <div class="col-6 my-1">
            <label class="sr-only" for="otokogiPoint">Category</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text"><font-awesome-icon icon="question-circle" /></div>
              </div>
              <base-select name="category" :options="categories" :selected=null @input="onUpdateSelectedCategory"/>
            </div>
          </div>
          <div class="col-6 my-1">
              <label class="sr-only" for="otokogiPoint">Point</label>
              <div class="input-group">
              <div class="input-group-prepend">
                  <div class="input-group-text"><font-awesome-icon icon="yen-sign" /></div>
              </div>
              <input class="form-control" type="tel" name="point" placeholder="1000" v-model="inputPoint" >
              </div>
          </div>
          <div class="col-6 my-1">
            <button type="button" class="btn btn-primary float-right col-4" @click="addRecord">
              <font-awesome-icon icon="plus" />
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
    <home-point-input-table :participants="eventParticipants" :points="eventPoints" @isEdited="onUpdatedTable()" />
  </div>
</template>

<script>
import EventService from '../../services/EventService';
import UserService from '../../services/UserService';
import PointService from '../../services/PointService';
import CategoryService from '../../services/CategoryService';
import Modal from '../../services/function/modal';

import BaseSelect from '../parts/BaseSelect';
import HomePointInputTable from '../parts/HomePointInputTable';

// const eventService = new EventService();
// const userService = new UserService();
// const pointService = new PointService();
// const categoryService = new CategoryService();

export default {
  name: 'PointInputTab',
  data: function () {
    return {
      events: [],
      selectedEvent: {},
      selectedParticipant: {},
      selectedCategory: {},
      inputPoint: null,
      eventParticipants: [],
      eventPoints: [],
      categories: [],
      isInitialized: false
    };
  },
  components: {
    'base-select': BaseSelect,
    'home-point-input-table': HomePointInputTable
  },
  async created () {
    this.initCategoryInfo();
    // イベント関連情報取得
    await this.initEventInfo();
    this.$set(this, 'selectedEvent', this.events[this.events.length - 1]);
    this.isInitialized = true;
    console.log(this.eventParticipants, 'event patrticipants');
  },
  methods: {
    addRecord: async function () {
      if (!(this.selectedEvent['_id'] && this.selectedParticipant['_id'] && this.inputPoint)) {
        Modal.alert('Please fill out all input');
        return false;
      }
      const point = {
        eventId: this.selectedEvent['_id'],
        userId: this.selectedParticipant['_id'],
        categoryId: this.selectedCategory['_id'],
        point: this.inputPoint
      };
      const status = await PointService.regist(point);
      if (status >= 200 && status <= 299) {
        Modal.alert('Success!');
        this.inputPoint = '';
        this.isInitialized = false;
      } else {
        Modal.alert('Failed...');
      }
    },
    initCategoryInfo: async function () {
      await CategoryService.getAll();
      if (CategoryService.categories) {
        await this.setArrayData(this.categories, CategoryService.categories);
        console.log(CategoryService.categories, 'categories');
      } else {
        console.log('no category data');
      }
    },
    initEventInfo: async function () {
      await EventService.getAll();
      await this.setArrayData(this.events, EventService.events);
    },
    initParticipantInfo: async function () {
      if (!this.selectedEvent) { return; }
      await UserService.getSelectedEventParticipants(this.selectedEvent._id);
      await this.setArrayData(this.eventParticipants, UserService.eventParticipants);
    },
    initPointInfo: async function () {
      if (!this.selectedEvent) { return; }
      await PointService.getSelectedEvent(this.selectedEvent._id);
      // console.log(PointService.eventPoints, 'event point');
      await this.setArrayData(this.eventPoints, PointService.eventPoints);
      console.log(this.eventPoints, 'event point');
      this.$forceUpdate();
    },
    onUpdateSelectedEvent: function (selectedValue) {
      this.$set(this, 'selectedEvent', selectedValue);
    },
    onUpdateSelectedParticipant: function (selectedValue) {
      this.$set(this, 'selectedParticipant', selectedValue);
    },
    onUpdateSelectedCategory: function (selectedValue) {
      this.$set(this, 'selectedCategory', selectedValue);
    },
    onUpdatedTable: function () {
      this.isInitialized = true;
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
    }
  },
  watch: {
    selectedEvent: async function () {
      console.log(this.selectedEvent, 'Watcher kicked: selected event');
      await this.initParticipantInfo();
      await this.initPointInfo();
    },
    isInitialized: async function () {
      console.log('Watcher kicked: table is edited');
      if (!this.isInitialized) {
        await this.initPointInfo();
        this.isInitialized = true;
      }
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.input-group-text {
  width: 40px;
  text-align: center;
}
.flip-horizontal {
    transform: scale(-1, 1);
}
</style>
