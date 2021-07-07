<template>
  <div id="app">
    <base-header/>
    <router-view/>
    <div id="modals">
      <component v-for="(modal, i) in modals" :is="modal.component" :params="modal.params" :key=i ></component>
    </div>
  </div>
</template>

<script>
import BaseHeader from './components/parts/BaseHeader';

const store = require('./assets/store/').default;

export default {
  name: 'App',
  components: {
    'base-header': BaseHeader
  },
  computed: {
    modals: () => {
      return store.getters.modals;
    }
  },
  mounted: function () {
  },
  store
};

</script>

<style lang='scss'>
@import './assets/style/global.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.9rem;
}
</style>
