/* 用户配置 */
/* eslint-disable */

import { removeToken } from '@/utils/cookie'

const state = {
  logined: false, // 是否登录
  user: null, // 当前用户
}

const getters = {}

const mutations = {
  SET_LOGINED(state, isLogined) {
    state.logined = isLogined
  },
  SET_USER(state, data) {
    state.user = data
  },
  // SET_USER_AUTH(state, auth) {
  //   state.auth = auth
  // }
}

const actions = {
  setUser({ commit }, user) {
    // console.log('commit', commit)
    commit('SET_LOGINED', true)
    let { nick_name, wx_nick, email, modify_limit, auth } = user
    commit('SET_USER', { nick_name, wx_nick, email, modify_limit, auth })
    // commit('SET_USER_AUTH', user.auth)
  },
  logout({ commit }) {
    removeToken()
    commit('SET_LOGINED', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
