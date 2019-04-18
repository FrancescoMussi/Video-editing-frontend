import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { requiresVisitors: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
      meta: { requiresVisitors: true }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/adminArea',
      name: 'adminArea',
      component: () => import('./views/AdminArea.vue'),
      meta: { requiresAuth: true }
    }
  ]
})
