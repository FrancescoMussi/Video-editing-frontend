import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'vue-awesome/icons'

import '@/assets/scss/style.scss'
import 'material-icons/iconfont/material-icons.scss'
import 'bulma/css/bulma.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = true

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if not logged in redirect to login page
    if (!store.getters.loggedIn) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitors)) {
    // when visiting login and register route redirect, if already logged-in, redirect to home
    if (store.getters.loggedIn) {
      next({
        name: 'home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
