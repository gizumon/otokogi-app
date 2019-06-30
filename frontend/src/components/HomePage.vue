<template>
  <div id="home" class="main">
    <div class="container">
      <div>
        <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger"
                active-tab-class="font-weight-bold"
                content-class="mt-3">
          <b-tab title="First" active>
            <template slot="title">
              Point
            </template>
            <point-input-tab />
          </b-tab>
          <b-tab title="Second">
            <template slot="title">
              Member
            </template>
            <member-set-tab />
          </b-tab>
          <b-tab title="Third">
            <template slot="title">
              Event
            </template>
            <event-set-tab />
          </b-tab>
          <b-tab title="Forth">
            <template slot="title">
              Powerword
            </template>
            <powerword-regist-tab />
          </b-tab>
          <b-tab title="Fifth" disabled>
            <template slot="title">
              Summary
            </template>
            <div class="container"><div class="card"><div>TBD</div></div></div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <base-modal v-if="showModal">
      <template v-slot:header>
        <h1>test title</h1>
      </template>
      <template v-slot:body>
        <p>こんてんつ</p>
        <p>Content</p>
        <p>コンテンツ</p>
      </template>
      <template v-slot:footer>
        <button @click="showModal = false">Close</button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import PointInputTab from './tabs/HomePointInputTab';
import MemberSetTab from './tabs/HomeMemberSetTab';
import EventSetTab from './tabs/HomeEventSetTab';
import PowerwordRegistTab from './tabs/HomePowerwordRegistTab';
import BaseModal from './parts/BaseModal';
// import Methods from '@/api/methods';

export default {
  name: 'HomePage',
  data: function () {
    return {
      msg: 'Title : Otokogi APP',
      text: 'Hello world',
      showModal: false
    };
  },
  components: {
    'point-input-tab': PointInputTab,
    'member-set-tab': MemberSetTab,
    'event-set-tab': EventSetTab,
    'powerword-regist-tab': PowerwordRegistTab,
    'base-modal': BaseModal
  }
  // },
  // methods: {
  //   // openModal: function () {
  //   //   this.showModal = true;
  //   // },
  //   // closeModal: function () {
  //   //   this.showModal = false;
  //   // }
  //   // DB参照 選択されたイベントの漢気ポイント一覧を表示
  //   // async get ()
  // }
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
