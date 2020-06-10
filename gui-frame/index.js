import { CreateRouter } from './router'

export default class GUIFrame {
  // vue-router
  static routingInstance(VueRouter, store) {
    return CreateRouter(VueRouter, store)
  }

  // vuex
  static vuex(vuex) {
    return {}
  }
}
