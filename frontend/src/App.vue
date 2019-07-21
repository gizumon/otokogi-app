<template>
  <div id="app">
    <base-header/>
    <router-view/>
  </div>
</template>

<script>
import BaseHeader from './components/parts/BaseHeader';

export default {
  name: 'App',
  components: {
    'base-header': BaseHeader
  }
};

</script>

<style lang='scss' scoped>
@import './assets/style/global.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
