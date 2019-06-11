import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
// Bootstrap読み込み
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);
Vue.use(BootstrapVue);

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
