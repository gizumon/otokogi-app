<template>
  <select id="selectCategory" name="category" class="form-control">
    <option value='' disabled selected style='display:none;'>Select Category</option>
    <option v-for="category in categories" v-bind:key="category.name">
      {{ category.name }}
    </option>
  </select>
</template>

<script>
import api from '../../api/index';

export default {
  name: 'BaseSelectCategory',
  data: function () {
    return {
      categories: []};
  },
  mounted () {
    const self = this;
    // CORS対応
    api.get('/category')
      .then(function (response) {
        self.categories = response.data;
      })
      .catch(function (error) {
        console.error('ERR: Failed to get categories information : ' + error);
      });
  }
  // methods: {
  // }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
