import Vue from 'vue'

import {
  Table, TableColumn, Link, Input, Button, Select,
} from 'element-ui'

import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './plugins/element.js'

import 'assets/styles/index.styl'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Link)
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
