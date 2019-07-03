/* eslint no-param-reassign: 0 */
const state =  {
  sidebar: {
    closed: false,
  }
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.closed = !state.sidebar.closed
  },
  CLOSE_SIDEBAR: state => {
    state.sidebar.closed = true
  },
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
