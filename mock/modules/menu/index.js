import home from './routes/home'
import about from './routes/about'
import banner from './routes/banner'
import category from './routes/category'
import admin from './routes/admin'
import tools from './routes/tools'
import component from './routes/component'
import file from './routes/file'
import article from './routes/article'
export const getRouteTree = options => {
  // options为前端的 request信息
  const data = [
    home,
    about,
    banner,
    category,
    admin,
    tools,
    component,
    file,
    article
  ]
  return {
    data,
    error_code: 0,
    msg: '成功',
  }
}
