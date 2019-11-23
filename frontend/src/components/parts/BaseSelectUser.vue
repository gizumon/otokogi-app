<template>
  <select id="selectUser" name="user" class="form-control" :multiple="isMultiSelectable">
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
  props: {
    isMultiSelectable: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      users: []
    };
  },
  async mounted () {
    console.log(this.isMultiSelectable, 'isMultiSelectable');
    // ユーザー取得
    await UserService.getAll();
    this.users = UserService.users;
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
