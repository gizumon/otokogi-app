import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
// Bootstrap読み込み
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BaseModal from './parts/BaseModal';

Vue.use(Router);
Vue.use(BootstrapVue);

Vue.component('base-modal', {
  props: {
    // いるかわからないけど、一応。モーダルのコンテンツを定義したいだけ。
    content: String
  },
  template: BaseModal
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
    // {
    //   path: '/menber',
    //   name: 'menber',
    //   component: MenberList
    // }
  ]
});
