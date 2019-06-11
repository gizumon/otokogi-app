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
  </div>
</template>

<script>
import SelectName from './parts/SelectName';
import SelectCategory from './parts/SelectCategory';
import Methods from '@/api/methods';

// tmp
// let event = {
//   'id': '1',
//   'title': 'sample'
// }
// let id = '1'
// let title = '漢気旅行旅';

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      text: ''
    };
  },
  components: {
    SelectName,
    SelectCategory
  },
  methods: {
    async post () {
      let element = { text: this.text };
      let response = await Methods.testPosting(element);
      console.log(response.data.message);
    }
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
