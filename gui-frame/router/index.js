import routes, { errorViewRouters } from './routes'
import NProgress from 'nprogress'
import { getToken } from '../utils/cookie'

export function CreateRouter(VueRouter, store) {
  const router = new VueRouter({
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
      try {
        let accessRoutes = await store.dispatch('router/getRoutes')
        const result = accessRoutes.concat(errorViewRouters)
        router.addRoutes(result)
        router.options.routes = router.options.routes.concat(result)
        next({ ...to, replace: true })
      } catch (e) {
        console.log(e)
        next({ path: '/login' })
      }
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
  return router
}
