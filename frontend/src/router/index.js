import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
// Bootstrap読み込み
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BaseModal from '../components/parts/BaseModal';

Vue.use(Router);
Vue.use(BootstrapVue);

Vue.component('BaseModal', {
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
      component: HomePage
    }
    // {
    //   path: '/menber',
    //   name: 'menber',
    //   component: MenberList
    // }
  ]
});
