import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Index from './components/index.vue'

Vue.use(VueRouter)

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
