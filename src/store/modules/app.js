/* 页面配置 */
/* eslint-disable */
const state = {
  sidebar: {
    closed: false,
  },
}

const getters = {
  // sidebar: state => state.sidebar,
  // sidebarList: state => { },
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.closed = !state.sidebar.closed
  },
  CLOSE_SIDEBAR: state => {
    state.sidebar.closed = true
  },
  OPEN_SIDEBAR: state => {
    state.sidebar.closed = false
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
