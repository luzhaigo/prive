import Vue from 'vue';
import Router from 'vue-router';
import PageList from '@/components/PageList.vue';
import Login from '@/components/Login.vue';
import LoginStatus from '@/components/LoginStatus.vue';
import PostList from '@/components/PostList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/page-list',
      component: PageList,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/login-status',
      component: LoginStatus,
    },
    {
      path: '/posts/:id',
      component: PostList,
    }
  ]
});