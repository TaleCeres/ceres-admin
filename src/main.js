import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
// 组件库
import './plugins/element'
import './plugins/custom'
import './assets/icons'
// CSS样式
import '../node_modules/font-awesome/css/font-awesome.css'
import 'assets/styles/index.styl'

import vueRouter from 'vue-router'
import GUIFrame from '../gui-frame/index'

Vue.use(vueRouter)

export const router = GUIFrame.routingInstance(vueRouter, store)

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  require('../mock')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
