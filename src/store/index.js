import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
/* modules目录和其他同级的js文件，颗粒度级别不同 */
import app from './modules/app'
import user from './modules/user'
import router from './modules/router'
import visual from './modules/visual'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

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
  strict: debug, // 使 Vuex store 进入严格模式; 任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
})
