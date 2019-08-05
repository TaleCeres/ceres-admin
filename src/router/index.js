import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'


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

router.beforeEach((to, from, next) => {
  // 路由发生变化时，修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
