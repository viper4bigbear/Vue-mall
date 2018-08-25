import Vue from 'vue'

import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

import Index from './components/index.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.config.productionTip = false

const routes = [
  {path: '/', redirect: '/index'},
  {path: '/index', component: Index}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
