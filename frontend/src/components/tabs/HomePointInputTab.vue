<template>
  <div id="home-point-input">
    <div class="card m-3">
      <div class="card-header">
        <!-- <base-select-event /> -->
        <base-select name="event" :options="events" :selected="selectedEvent" @input="onUpdateSelectedEvent" />
      </div>
      <div class="card-body">
      <form>
        <div class="form-row align-items-center">
        <div class="col-6 my-1">
            <label class="sr-only" for="selectName">Winner</label>
            <base-select name="participant" :options="eventParticipants" :selected=null @input="onUpdateSelectedParticipant" />
        </div>
        <div class="col-6 my-1">
            <label class="sr-only" for="selectCategory">Category</label>
            <base-select name="category" :options="categories" :selected=null @input="onUpdateSelectedCategory"/>
        </div>
        <div class="col-6 my-1">
            <label class="sr-only" for="otokogiPoint">Point</label>
            <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">￥</div>
            </div>
            <input class="form-control" type="tel" name="point" placeholder="1000">
            </div>
        </div>
        <div class="col-6 my-1">
          <input type="button" class="btn btn-primary float-right" value="Add">
        </div>
      </div>
      </form>
      </div>
    </div>
    <home-point-input-table :participants="eventParticipants" :points="eventPoints" />
  </div>
</template>

<script>
import BaseSelect from '../parts/BaseSelect';
import EventService from '../../services/EventService';
import UserService from '../../services/UserService';
import PointService from '../../services/PointService';
import CategoryService from '../../services/CategoryService';

import HomePointInputTable from '../parts/HomePointInputTable';

export default {
  name: 'PointInputTab',
  data: function () {
    return {
      showModal: false,
      events: [],
      selectedEvent: {},
      selectedParticipant: {},
      selectedCategory: {},
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

    // this.selectedEvent = this.events[this.events.length - 1];
    this.$set(this, 'selectedEvent', this.events[this.events.length - 1]);
    // this.$forceUpdate();
  },
  methods: {
    getCategoryInfo: async function () {
      const categoryService = new CategoryService();
      await categoryService.getAll();
      await this.setArrayData(this.categories, categoryService.categories);
    },
    getEventInfo: async function () {
      const eventService = new EventService();
      await eventService.getAll();
      await this.setArrayData(this.events, eventService.events);
    },
    getParticipantInfo: async function () {
      const userService = new UserService();
      await userService.getSelectedEventParticipants(this.selectedEvent._id);
      await this.setArrayData(this.eventParticipants, userService.eventParticipants);
    },
    getPointInfo: async function () {
      const pointService = new PointService();
      await pointService.getSelectedEvent(this.selectedEvent._id);
      await this.setArrayData(this.eventPoints, pointService.eventPoints);
    },
    onUpdateSelectedEvent: function (selectedValue) {
      // this.selectedEvent = selectedValue;
      this.$set(this, 'selectedEvent', selectedValue);
    },
    onUpdateSelectedParticipant: function (selectedValue) {
      this.$set(this, 'selectedParticipant', selectedValue);
    },
    onUpdateSelectedCategory: function (selectedValue) {
      this.$set(this, 'selectedCategory', selectedValue);
      // this.selectedCategory = selectedValue;
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
      console.log(this.selectedEvent, 'watcher kicked');
      await this.getParticipantInfo();
      await this.getPointInfo();
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
</style>
