import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import routes, { errorViewRouters } from './routes'
import store from '../store'
import 'nprogress/nprogress.css' // progress bar style

import { getToken } from '@/utils/cookie'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active-link',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes,
})

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // 登录验证
  if (to.path === '/login') {
    next()
  } else if (to.path !== '/login' && !getToken()) {
    next({ path: '/login' })
  } else if (store.getters.normalViewRouters.length > 0) {
    next()
  } else {
    let accessRoutes = await store.dispatch('router/getRoutes')
    const result = accessRoutes.concat(errorViewRouters)
    router.addRoutes(result)
    router.options.routes = router.options.routes.concat(result)
    next({ ...to, replace: true })
  }
  // 权限验证

  // 路由发生变化时，修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
