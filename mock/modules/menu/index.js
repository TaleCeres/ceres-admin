export const getRouteTree = options => {
  const files = require.context('./routes', false, /\.js$/)
  let routes = []
  files.keys().forEach(key => {
    routes.push(files(key).default)
  })
  return {
    data: routes.sort((prev, next) => prev.order - next.order),
    error_code: 0,
    msg: '成功',
  }
}
