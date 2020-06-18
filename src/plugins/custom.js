import Vue from 'vue'
import FaIcon from 'comps/base/FaIcon'
import CeresTable from 'comps/base/CeresTable'
import color from 'assets/data/color'
import model from '@/models'

Vue.component(FaIcon.name, FaIcon)
Vue.component(CeresTable.name, CeresTable)
Vue.prototype.$color = color
Vue.prototype.$model = model // 将model挂载到vue的原型上
if (process.env.NODE_ENV !== 'production') {
  // mock数据的接口
  // eslint-disable-next-line
  const Mock = require('../../mock')
  Vue.prototype.$mockApi = Mock.default.$mockApi
}
