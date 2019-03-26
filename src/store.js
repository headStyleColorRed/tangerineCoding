import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    key:{},

  },
  mutations: {
    changekey(state, key) {
      state.key = key;
    },
  },
  getters: {
    key: state => state.key,
  }
})
