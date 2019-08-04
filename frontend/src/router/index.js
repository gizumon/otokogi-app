import Vue from 'vue';
// import Vuex from 'vuex';

import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import BaseModal from '@/components/parts/BaseModal';
// Bootstrap読み込み
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import {ClientTable} from 'vue-tables-2';
import ModalAlert from '../components/parts/BaseModalAlert';
import ModalPointInput from '../components/parts/HomePointInputModal';

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(ClientTable);
// Vue.use(Vuex);

Vue.component('BaseModal', {
  props: {
    // いるかわからないけど、一応。モーダルのコンテンツを定義したいだけ。
    content: String
  },
  template: BaseModal
});
Vue.component('modal-alert', ModalAlert);
Vue.component('modal-point-input', ModalPointInput);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    }
    // {
    //   path: '/menber',
    //   name: 'menber',
    //   component: MenberList
    // }
  ]
});
