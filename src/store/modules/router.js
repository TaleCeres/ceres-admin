/* 路由权限配置 */
/* eslint-disable */
import RouteModel from '@/models/route'
// import { loadingComponent, initLayout, initComponent } from '@/router/routes'
import appStore from "@/store/modules/app"
import Midlayer from "comps/layout/midlayer"
const _import = file => () => import(`@/views/${file}.vue`)

/**
 * 处理router对应的组件(component)，包含三个级别的路由
 * 一级路由的模版目前有三种:
 *  1. 左右布局(Layout), 默认
 *  2. T型布局
 *  3. 上下布局
 * 如果三级路由存在，则其父级(二级)路由为 Midlayer；否则为具体的页面组件
 *
 * @param {object} rawRouter
 * @returns
 */
function loadingComponent(rawRouter) {
  let { ...router } = rawRouter
  initLayout(router) // 一级路由的模版为 Layout
  // 遍历一级路由的子路由
  if (router.hasOwnProperty('children')) {
    router.children.forEach(item => {
      initComponent(item)
    })
  }
  return router
}

/**
 * Layout有三种选择 default、t-type、vertical
 * @param {object} router
 */
function initLayout(router) {
  const _import_layout = file => () => import(`comps/layout/${file}/index.vue`)
  const layoutModeObj = {
    'default': _import_layout('default'),
    'vertical': _import_layout('vertical'),
    't-type': _import_layout('t-type'),
  }

  router.component = layoutModeObj[appStore.state.layout.mode]
}

/**
 * 二级路由开始
 *  - 1. 如果有子路由，载入「Midlayer」
 *  - 2. 如果无子路由，载入「router.component同名的组件」
 * @param {object} router
 */
function initComponent(router) {
  // 1
  if (router.hasOwnProperty('children') && router.children.length > 0) {
    router.component = Midlayer
    let { children: childrenRouter } = router
    childrenRouter.forEach(item => {
      initComponent(item)
    })
    return
  }
  if (typeof (router.component) === 'string') {
    router.component = _import(router.component)
  }
}


const state = {
  normalViewRouters: [],
  sidebarList: []
}

const getters = {
}

const mutations = {
  SET_ROUTES(state, data) {
    state.normalViewRouters = data
  },
  SET_SIDEBARLIST(state, data) {
    data.forEach(route => {
      if (route.children && route.children.length > 0) {
        route.children = route.children.filter(item => item.hidden !== true)
      }
    })
    state.sidebarList = data.filter(item => item.hidden !== true)
  },
}

const actions = {
  getRoutes({ commit }) {
    return new Promise(resolve => {
      RouteModel.getRouteTree().then(response =>{
        let routes = response.map(loadingComponent)
        let sidebarList = response.map(loadingComponent)
        commit('SET_ROUTES', routes)
        commit('SET_SIDEBARLIST', sidebarList)
        resolve(routes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
