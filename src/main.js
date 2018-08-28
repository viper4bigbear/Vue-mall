import Vue from 'vue'

import VueRouter from 'vue-router'

import Vuex from 'vuex'

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
import Cart from './components/shoppingCart.vue'

import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
Vue.prototype.$axios = axios

Vue.use(VueRouter)
Vue.use(Vuex)
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
  {path: '/detail/:goodsid', component: Detail},
  {path: '/cart', component: Cart}
]

const store = new Vuex.Store({
  state: {
    // count: 998
    // cartData: {goodsid:goodsCount}
    cartData: JSON.parse(window.localStorage.getItem('goodKey')) || {}
  },
  mutations: {
    // increment (state) {
    //   state.count++
    // }
    addCart (state, goodInfo) {
      if (state.cartData[goodInfo.goodsId] === undefined) {
        Vue.set(state.cartData, goodInfo.goodsId, goodInfo.goodsCount)
      } else {
        state.cartData[goodInfo.goodsId] += goodInfo.goodsCount
      }
    },
    changeCart (state, goodInfo) {
      state.cartData[goodInfo.id] = goodInfo.goodsCount
    },
    deleteCart (state, goodInfo) {
      Vue.delete(state.cartData, goodInfo)
    }
  },
  getters: {
    buyCount: state => {
      let num = 0
      for (const key in state.cartData) {
        num += state.cartData[key]
      }
      return num
    }
  }
})
window.onbeforeunload = function () {
  window.localStorage.setItem('goodKey', JSON.stringify(store.state.cartData))
}

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
