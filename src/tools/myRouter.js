import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex'
import Index from '../components/index.vue'
import Detail from '../components/detail.vue'
import Cart from '../components/shoppingCart.vue'
import Login from '../components/login.vue'
import Order from '../components/fillOrder.vue'
import PayOrder from '../components/payOrder.vue'
import PaySuccess from '../components/paySuccess.vue'
import VipCenter from '../components/vipCenter.vue'
import OrderList from '../components/orderList.vue'
import OrderDetail from '../components/orderDetail.vue'

import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

Vue.use(VueRouter)
const routes = [{
  path: '/',
  redirect: '/index'
},
{
  path: '/index',
  component: Index
},
{
  path: '/detail/:goodsid',
  component: Detail
},
{
  path: '/cart',
  component: Cart
},
{
  path: '/login',
  component: Login
},
{
  path: '/order/:ids',
  component: Order,
  meta: {
    checkLogin: true
  }
},
{
  path: '/payOrder/:orderid',
  component: PayOrder,
  meta: {
    checkLogin: true
  }
},
{
  path: '/paySuccess/:orderid',
  component: PaySuccess,
  meta: {
    checkLogin: true
  }
},
{
  path: '/vipCenter',
  component: VipCenter,
  meta: {
    checkLogin: true
  }
},
{
  path: '/orderList',
  component: OrderList,
  meta: {
    checkLogin: true
  }
},
{
  path: '/orderDetail/:orderid',
  component: OrderDetail,
  meta: {
    checkLogin: true
  }
}
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  store.commit('setFromData', from.path)
  if (to.meta.checkLogin === true) {
    axios.get('site/account/islogin')
      .then(res => {
        if (res.data.code === 'nologin') {
          next('/login')
        } else {
          next()
        }
      })
  } else {
    next()
  }
})

export default router
