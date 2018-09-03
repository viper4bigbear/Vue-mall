import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartData: JSON.parse(window.localStorage.getItem('goodKey')) || {},
    isLogin: false,
    fromData: ''
  },
  mutations: {
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
    deleteCart (state, goodId) {
      Vue.delete(state.cartData, goodId)
    },
    changeLogin (state, status) {
      state.isLogin = status
    },
    setFromData (state, path) {
      state.fromData = path
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

export default store
