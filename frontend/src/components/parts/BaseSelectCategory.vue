<template>
  <select id="selectCategory" name="category" class="form-control">
    <option value='' disabled selected style='display:none;'>Select Category</option>
    <option v-for="category in categories" v-bind:key="category.name">
      {{ category.name }}
    </option>
  </select>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'BaseSelectCategory',
  data: function () {
    return {
      categories: []};
  },
  mounted () {
    const self = this;
    // CORS対応
    Axios.get('http://localhost:3000/api/v1/category', {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(function (response) {
        console.log(response);
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
