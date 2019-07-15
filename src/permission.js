import router from './router'
import { getToken } from '@/utils/auth'

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (to.path === '/login') {
    next()
  } else if (hasToken) {
    // console.log('hasToken', hasToken)
    next()
  } else {
    next('/login')
  }
})
