import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './router/router'
import store from './store/'

Vue.use(VueRouter)


const router = new VueRouter({
  base:'/s-mall/',
  routes
})

const app = new Vue({
  router,
  store,
  
}).$mount('#app')
