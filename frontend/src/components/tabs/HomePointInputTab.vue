<template>
  <div id="home-point-input">
    <h3 class="table-title">Otokogi point</h3>
    <div class="card m-3">
      <div class="card-header">
        <label class="sr-only" for="otokogiPoint">event</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text"><font-awesome-icon icon="external-link-alt" /></div>
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
            <button type="button" class="btn btn-primary float-right col-4" @click="addPoint">
              <font-awesome-icon icon="plus" />
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
    <home-point-input-table :participants="eventParticipants" :points="eventPoints" @isEdited="getPointInfo()" />
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

const eventService = new EventService();
const userService = new UserService();
const pointService = new PointService();
const categoryService = new CategoryService();

export default {
  name: 'PointInputTab',
  data: function () {
    return {
      showModal: false,
      events: [],
      selectedEvent: {},
      selectedParticipant: {},
      selectedCategory: {},
      inputPoint: null,
      eventParticipants: [],
      eventPoints: [],
      categories: []
    };
  },
  components: {
    'base-select': BaseSelect,
    'home-point-input-table': HomePointInputTable
  },
  async created () {
    this.getCategoryInfo();
    // イベント関連情報取得
    await this.getEventInfo();
    this.$set(this, 'selectedEvent', this.events[this.events.length - 1]);
  },
  methods: {
    addPoint: async function () {
      if (!(this.selectedEvent['_id'] && this.selectedParticipant['_id'] && this.inputPoint)) {
        console.log(this.selectedEvent['_id']);
        console.log(this.selectedParticipant['_id']);
        console.log(this.inputPoint);
        Modal.alert('Please fill out all input');
        return false;
      }
      const self = this;
      const point = {
        eventId: this.selectedEvent['_id'],
        userId: this.selectedParticipant['_id'],
        point: this.inputPoint
      };
      const status = await pointService.registPoint(point);
      if (status >= 200 && status <= 299) {
        Modal.alert('Success!');
        this.inputPoint = '';
        self.getPointInfo();
      } else {
        Modal.alert('Failed...');
      }
    },
    getCategoryInfo: async function () {
      await categoryService.getAll();
      await this.setArrayData(this.categories, categoryService.categories);
    },
    getEventInfo: async function () {
      await eventService.getAll();
      await this.setArrayData(this.events, eventService.events);
    },
    getParticipantInfo: async function () {
      await userService.getSelectedEventParticipants(this.selectedEvent._id);
      await this.setArrayData(this.eventParticipants, userService.eventParticipants);
    },
    getPointInfo: async function () {
      await pointService.getSelectedEvent(this.selectedEvent._id);
      await this.setArrayData(this.eventPoints, pointService.eventPoints);
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
    setArrayData: function (target, array) {
      // targetの初期化
      target.length = 0;
      for (let i = 0; i < array.length; i++) {
        this.$set(target, i, array[i]);
      }
    }
  },
  watch: {
    selectedEvent: async function () {
      console.log(this.selectedEvent, 'Watcher kicked: selected event');
      await this.getParticipantInfo();
      await this.getPointInfo();
    },
    isTableEdit: async function () {
      console.log('Watcher kicked: table is edited');
      await this.getPointInfo();
      if (this.isTableEdited) {
        this.isTableEdited = false;
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
</style>
