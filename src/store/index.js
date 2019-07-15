/* eslint no-param-reassign: 0 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
  },
  state: {
    sidebar: {
      closed: false,
    },
  },
  getters: {
    sidebar: state => state.sidebar,
    sidebarList: state => { },
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.closed = !state.sidebar.closed
    },
    CLOSE_SIDEBAR: state => {
      state.sidebar.closed = true
    },
  },
  actions: {},
})
