export default {
  path: '/redirect',
  component: undefined,
  hidden: true,
  children: [
    {
      path: '/redirect/:path(.*)',
      component: 'redirect/index'
    }
  ]
}
