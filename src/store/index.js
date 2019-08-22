/* modules目录和其他同级的js文件，颗粒度级别不同 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import app from './modules/app'
import user from './modules/user'
import router from './modules/router'
import visual from './modules/visual'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    app,
    user,
    router,
    visual,
  },
})
