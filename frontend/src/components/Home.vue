<template>
  <div id="home" class="main">
    <div class="input-area">
      <div class="inline">
        <h3>【第 ID 回】タイトル</h3>
        <div>
          <button href="">設定</button>
          <button>結果反映</button>
        </div>
      </div>
      <div class="input-box">
        <SelectName />
        <SelectCategory />
        <input type="tel" name="point">
        <button class="btn">追加</button>
      </div>
    </div>
  <div>{{ msg }}</div>
  <input type='text' name='text' v-model='text'>
  <button @click='post'>click me</button>
  <button @click="openModal">開く</button>
  </div>
</template>

<script>
import HomeSelectName from './parts/HomeSelectName';
import HomeSelectCategory from './parts/HomeSelectCategory';
import Methods from '@/api/methods';

export default {
  name: 'Home',
  data: function () {
    return {
      msg: 'Welcome to Your Vue.js App',
      text: ''
    };
  },
  components: {
    'home-select-name': HomeSelectName,
    'home-select-category': HomeSelectCategory,
    'base-modal': BaseModal
  },
  methods: {
    openModal: function () {
      this.modal = true;
    },
    closeModal: function () {
      this.modal = false;
    }
    // DB参照 選択されたイベントの漢気ポイント一覧を表示
    // async get ()
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
