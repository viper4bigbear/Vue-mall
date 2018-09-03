import Vue from 'vue'

import router from './tools/myRouter'
import store from './tools/vuex'
import './tools/libs'

import moment from 'moment'
import App from './App.vue'

Vue.filter(
  'filterDate',
  function (val, filter) {
    if (filter !== undefined) {
      return moment(val).format(filter)
    } else {
      return moment(val).format('YYYY年MM月DD日')
    }
  }
)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate () {
    this.$axios.get('site/account/islogin')
      .then(res => {
        if (res.data.code === 'logined') {
          store.state.isLogin = true
        }
      })
  }
}).$mount('#app')
