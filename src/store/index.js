import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  isTabbar:true
}
const mutations = {
  unTabbar: state => state.isTabbar = false,
  onTabbar: state => state.isTabbar = true
}

export default new Vuex.Store({
  state,
  mutations
})