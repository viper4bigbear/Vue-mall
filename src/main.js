import Vue from 'vue'

import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import ProductZoomer from 'vue-product-zoomer' 

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueLazyload from 'vue-lazyload'

import moment from 'moment'
import App from './App.vue'

import Index from './components/index.vue'
import Detail from './components/detail.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('./assets/statics/886859.jpg'),
  attempt: 1
})
Vue.use(ProductZoomer)

Vue.filter(
  'filterDate', function (val) {
    return moment(val).format('YYYY年MM月DD日')
  }
)
Vue.config.productionTip = false

const routes = [
  {path: '/', redirect: '/index'},
  {path: '/index', component: Index},
  {path: '/detail/:goodsid', component: Detail}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
