import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// 组件库
import './plugins/element'
import './plugins/custom'
// CSS样式
import 'font-awesome/css/font-awesome.css'
import 'assets/styles/index.styl'

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
