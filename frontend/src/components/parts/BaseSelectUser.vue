<template>
  <select id="selectUser" name="user" class="form-control">
    <option value='' disabled selected style='display:none;'>Select User</option>
    <option v-for="user in users" v-bind:key="user.name">
      {{ user.name }}
    </option>
  </select>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'BaseSelectUser',
  data: function () {
    return {
      users: []};
  },
  mounted () {
    const self = this;
    // CORS対応
    Axios.get('http://localhost:3000/api/v1/user', {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(function (response) {
        console.log(response);
        self.users = response.data;
      })
      .catch(function (error) {
        console.error('ERR: Failed to get users information : ' + error);
      });
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
