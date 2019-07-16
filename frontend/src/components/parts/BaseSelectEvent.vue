<template>
  <select id="selectEvent" name="event" class="form-control" >
    <slot :options="options"></slot>
    <option v-for="event in events" v-bind:key="event.no">
      {{ "【第" + event.no + "回】 " + event.name }}
    </option>
  </select>
</template>

<script>
import EventService from '../../services/EventService';

export default {
  name: 'BaseSelectEvent',
  data: function () {
    return {
      events: []};
  },
  async mounted () {
    const eventService = new EventService();
    await eventService.getAllEvent();
    this.events = eventService.events;
  },
  updated (e) {
    console.log('Vue updated...');
    let value = e.target.selectedOptions.length ? e.target.selectedOptions[0]._value : null;
    this.$emit('selectedEvent', value);
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
