import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './plugins/element.js'
import './permission'

import 'assets/styles/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
