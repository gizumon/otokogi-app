<template>
  <select id="selectEvent" name="event" class="form-control">
    <option value='' disabled selected style='display:none;'>Select Event</option>
    <option v-for="event in events" v-bind:key="event.no">
      {{ "【第" + event.no + "回】 " + event.name }}
    </option>
  </select>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'BaseSelectEvent',
  data: function () {
    return {
      events: []};
  },
  mounted () {
    const self = this;
    // CORS対応
    Axios.get('http://localhost:3000/api/v1/event', {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(function (response) {
        console.log(response);
        self.events = response.data;
      })
      .catch(function (error) {
        console.error('ERR: Failed to get events information : ' + error);
      });
  }
  // methods: {
  // }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
