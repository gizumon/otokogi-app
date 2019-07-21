<template>
  <select id="selectUser" name="user" class="form-control">
    <option value='' disabled selected style='display:none;'>Select User</option>
    <option v-for="user in users" v-bind:key="user.name">
      {{ user.name }}
    </option>
  </select>
</template>

<script>
import UserService from '../../services/UserService';

export default {
  name: 'BaseSelectUser',
  data: function () {
    return {
      users: []
    };
  },
  async mounted () {
    // ユーザー取得
    const userService = new UserService();
    await userService.getAll();
    this.users = userService.users;
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
