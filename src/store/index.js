/* eslint no-param-reassign: 0 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
